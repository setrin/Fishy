'use strict';

var $ = require("jquery");

/**
* Name: 'Settings' class
* Desc: Contains all basic settings and handles window resize
**/
export default class {

	constructor () {
		// Basic settings
		this._screen_ratio = 16 / 9;
		this._sound_switch = true;
		this._quality = false;
		this._fullscreen = true;
		this._max_fps = 60;
		this._debug = true;
		this._show_fps = true;

		this._canvas = document.getElementById('gameCanvas');
		this._default_canvas_width = 800;
		this._default_canvas_height = 450;
		this._canvas_scale = (this._canvas.width || this._default_canvas_width) / this._default_canvas_width;

		window.addEventListener('resize', this.resizeGame.bind(this), false);
		window.addEventListener('orientationchange', this.resizeGame.bind(this), false);
		this.resizeGame();
	}

	//-------------------------------------------------------------
	//	Function that handles window resize and set Canvas size
	//-------------------------------------------------------------
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

	    this._canvas_width = newWidth;
	    this._canvas_scale = newWidth / 800;
	    gameCanvas.width(newWidth);
	    gameCanvas.height(newHeight);
	    this._canvas.width = newWidth;
	    this._canvas.height = newHeight;
	}

	get sound () {return this._sound_switch;}
	get fullscreen () {return this._fullscreen;}
	get screen_ratio () {return this._screen_ratio;}
	get canvas () {return this._canvas;}
	get canvas_scale () {return this._canvas_scale;}
	get max_fps () {return this._max_fps;}
}