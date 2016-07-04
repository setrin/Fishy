'use strict';
var $ = require("jquery");

export default class {

	constructor () {
		this._screen_ratio = 16 / 9;
		this._canvas_width = document.getElementById('gameCanvas').width || 800;
		this._canvas_scale = this._canvas_w / 800;
		this._sound_switch = true;
		this._quality = false;
		this._fullscreen = true;
		this._max_fps = 60;

		window.addEventListener('resize', this.resizeGame.bind(this), false);
		window.addEventListener('orientationchange', this.resizeGame.bind(this), false);
		this.resizeGame();
	}

	resizeGame () {
	    var newWidth = window.innerWidth,
	    	newHeight = window.innerHeight,
	    	newScreenRatio = newWidth / newHeight,
	    	gameCanvas = $('#gameCanvas');
	    
	    if (newScreenRatio > this.screen_ratio) {
	        newWidth = newHeight * this.screen_ratio;
	    } else {
	        newHeight = newWidth / this.screen_ratio;
	    }

	    this.canvas_width = newWidth;
	    gameCanvas.width(newWidth);
	    gameCanvas.height(newHeight);
	}

	get sound () {return this._sound_switch;}
	get fullscreen () {return this._fullscreen;}
	get screen_ratio () {return this._screen_ratio;}
	get canvas_scale () {return this._canvas_scale;}
	get canvas_width () {return this._canvas_width;}
	set canvas_width (width) {this._canvas_width = width;}
	get max_fps () {return this._max_fps;}
}