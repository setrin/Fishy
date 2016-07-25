'use strict';

/**
* Name: 'AssetManager' class
* Desc: Handels all assetManager of assets
* 		- assetManager.add <- [preloadModel()]		 				// add new asset
*		- assetManager.download.start 								// start downloading
*		+ assetManager.download.finished -> {success, total} 		// finished download, return status
*		+ assetManager.downloaded.[prefix] -> {success, total}		// finished download of [prefix], return status
*		+ assetManager.failed.[prefix]								// failed downloading of [prefix]
**/
export default class {
	constructor () {
		this._downloadQueue = {};
		this._cache = {};
		this._successCount = 0;
    	this._errorCount = 0;
    	this._totalCount = 0;
		this._channel = postal.channel("assetManager");
		this.subscribe();
	}

	/*-------------------------------------------------------------
	*	Function that handles all subscribes and callbacks
	*-------------------------------------------------------------*/
	subscribe () {
		var that = this;
		this._addSub = this._channel.subscribe("assetManager.add", 
			function(data) {
	           	that._totalCount += data.preloads.length;
	           	that._downloadQueue[data.id] = data;
	        }
	    );
	}

	/*-------------------------------------------------------------
	*	Function for downloading all assets
	*-------------------------------------------------------------*/
	startDownload () {
		var that = this;

		this._channel.publish('assetManager.download.started', {
			success: this._successCount,
		    total: Object.keys(this._downloadQueue).length
		});

		for (let preloadModel in this._downloadQueue) {
			preloadModel = this._downloadQueue[preloadModel];

			var parent_id = preloadModel.id;

			for (let preload in preloadModel.preloads) {
				preload = preloadModel.preloads[preload];

				var path = preload.path,
			    	img = new Image();

			    // if download is successful
			    img.addEventListener("load", function() {
			        that._successCount += 1;
			        that._channel.publish("assetManager.downloaded." + preload.prefix, {
			        	success: that._successCount,
			        	total: that._totalCount
			        });

				    console.log('assetManager > success.' + preload.prefix);

				    if (that.isDone()) {
				        that.downloadFinished();
				    }
			    }, false);
			    
			    // if download fails
			    img.addEventListener("error", function() {
			        that._errorCount += 1;
			        that._channel.publish("assetManager.failed." + preload.prefix);

				    console.log('assetManager > failed.' + preload.prefix);

				    if (that.isDone()) {
				        that.downloadFinished();
				    }
			    }, false);
			    
			    // start downloading
			    console.log('assetManager > downloading.' + preload.prefix);
			    img.src = path;		

			    // save image into cache
			    if (!this._cache.hasOwnProperty(parent_id)) {
					this._cache[parent_id] = {};
				}
			    this._cache[parent_id][preload.prefix] = img;
			}
		}

		if (this._totalCount === 0) {
			that.downloadFinished();
		}
	}

	/*-------------------------------------------------------------
	*	Function for callback when download is finished
	*-------------------------------------------------------------*/
	downloadFinished () {
		var that = this;

		console.log("assetManager > finished download");
		this._addSub.unsubscribe();

		this._channel.publish('assetManager.download.finished', {
			success: that._successCount,
		    total: that._totalCount
		});

		for (let preloadModel in this._downloadQueue) { // call individual callbacks
			this._downloadQueue[preloadModel].callback(this._cache[preloadModel]);
		}
	}

	/*-------------------------------------------------------------
	*	Function that returns true if download is finished or false if not
	*-------------------------------------------------------------*/
	isDone () {
	    return (this._totalCount === this._successCount + this._errorCount);
	}

	get cache () {return this._cache;}

}