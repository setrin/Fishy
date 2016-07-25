'use strict';

import Render from '../core/Render.js';

export default class extends Render {

	constructor (settings) {
		super(settings);
		this._preloadStatus = { success: 0, total: 0};
		this._preloadFinished = false;

		this.subscribe();
	}

	subscribe () {
		var that = this,

		preloadProgress = postal.subscribe({
			channel: "assetManager",
			topic : "assetManager.downloaded.*", 
			callback: function(data) {
				if (data.success === data.total) {
					preloadProgress.unsubscribe();
				}
	           	that._preloadStatus = data;
	        }
	    }),

	    preloadStarted = postal.subscribe({
			channel: "assetManager",
			topic : "assetManager.download.started", 
			callback: function(data) {
				preloadStarted.unsubscribe();
	           	that._preloadStatus = data;
	        }
	    }),

		preloadFinished = postal.subscribe({
			channel: "assetManager",
			topic : "assetManager.download.finished", 
			callback: function(data) {
				preloadFinished.unsubscribe();
	           	that._preloadStatus = data;
	           	that._preloadFinished = true;
	        }
	    });
	}

	loadingStatus () {
		this.ctx.font = this.calcSize(30) + "px serif";
		this.ctx.fillStyle = "#000";
		var text = this._preloadStatus.success + ' / ' + this._preloadStatus.total;
		this.ctx.fillText(text, this.calcSize(40), this.calcSize(35));
	}

	loadingFinished () {
		var text;
		this.ctx.font = this.calcSize(30) + "px serif";
		this.ctx.fillStyle = "#00AC0C";

		text = "Loading successful";
		this.ctx.fillText(text, this.calcSize(40), this.calcSize(35));

		setTimeout(function() {
			postal.publish({
			    channel: "world",
			    topic: "state.change",
			    data: {
			    	state: 1
			    }
			});
		}, 3000);
	}

	loadingError () {
		var text;
		this.ctx.font = this.calcSize(30) + "px serif";
		this.ctx.fillStyle = "#AC2601";

		text = "Loading failed!!!!";
		this.ctx.fillText(text, this.calcSize(40), this.calcSize(35));
		
	    postal.publish({
		    channel: "world",
		    topic: "gameloop.stop"
		});
	}

	render (fps) {
		super.render(fps);

		if (this._preloadFinished) {
			if (this.preloadSuccessful) {
				this.loadingFinished();
			} else {
				this.loadingError();
			}
		} else {
			this.loadingStatus();
		}
	}

	get preloadSuccessful () {return (this._preloadStatus.success === this._preloadStatus.total);}

}