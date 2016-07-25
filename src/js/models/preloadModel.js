'use strict';

/**
*	Name: 'PreloadModel' class
*	Desc: Basic class to simplify asset loading
**/
export default class {
	constructor (preload_data) {
		this._id = preload_data.id;
		this._callback = preload_data.callback;
		this._preloads = preload_data.preloads;
		this._channel = postal.channel("assetManager");

		postal.publish({
		    channel: "assetManager",
		    topic: "assetManager.add",
		    data: this
		});
	}

	get preloads () {return this._preloads;}
	get id () {return this._id;}
	get callback () {return this._callback;}
}