'use strict';

/**
* Name: 'Render' class
* Desc: Contains all basic render functions
**/
export default class {
	constructor (settings) {
		this.settings = settings;
		this.canvas = settings.canvas;
		this.canvas_scale = settings.canvas_scale;
		this.ctx = this.canvas.getContext("2d");
		this._channel = postal.channel("render");
		this._cache = {};
	}

	/*-------------------------------------------------------------
	*	Function to draw FPS into Canvas
	*-------------------------------------------------------------*/
	drawFps (fps) {
		this.ctx.font = this.calcSize(30) + "px serif";
		this.ctx.fillStyle = "#E5E000";
		this.ctx.fillText(Math.round(fps), this.canvas.width - this.calcSize(40), this.calcSize(35));
	}

	/*-------------------------------------------------------------
	*	Function to clear Canvas
	*-------------------------------------------------------------*/
	clearCanvas () {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	/*-------------------------------------------------------------
	*	Basic render function
	*-------------------------------------------------------------*/
	render (fps) {
		this.clearCanvas ();
		if (this.settings._show_fps) {
			this.drawFps(fps);
		}
	}

	calcSize (value) {
		return value * this.settings.canvas_scale;
	}

	setCache (data) {this._cache = data;}
}