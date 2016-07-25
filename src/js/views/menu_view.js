'use strict';

import Render from '../core/Render.js';
import PreloadModel from '../models/PreloadModel.js';
import ClickHandler from '../core/Click_handler.js';

export default class extends Render {

	constructor (settings) {
		super(settings);
		this._assets_parent = 'menuView';
		this._clickHandler = new ClickHandler(settings);

		this._clickHandler.addHitbox({ // testing click_handler
			top: 0,
			left: 0,
			width: 400,
			height: 225,
			id: "testHitbox1"
		});

		this.preload();
		//this.subscribe();
	}

	preload () {
		this._preloadModel = new PreloadModel({
			id: this._assets_parent,
			preloads: [{
				prefix: 'canvas1',
				path: 'https://www.socialmediaexplorer.com/wp-content/uploads/2013/04/Technology-is-a-canvas.jpg'
			},
			{
				prefix: 'canvas2',
				path: 'http://data.whicdn.com/images/197391582/superthumb.png'
			}],
			callback: this.setCache.bind(this)
		});
	}

	render (fps) {
		super.render(fps);

		this.ctx.font = this.calcSize(30) + "px serif";
		this.ctx.fillStyle = "#00AC0C";

		var text = "Play!";
		this.ctx.fillText(text, this.calcSize(40), this.calcSize(35));

		var canvas = this._cache['canvas1'];
		var hovno = this._cache['canvas2'];
		this.ctx.drawImage(canvas, this.calcSize(50), this.calcSize(50), this.calcSize(200), this.calcSize(400));
		this.ctx.drawImage(hovno, this.calcSize(250), this.calcSize(50), this.calcSize(200), this.calcSize(400));
		this.ctx.drawImage(canvas, this.calcSize(450), this.calcSize(50), this.calcSize(200), this.calcSize(400));
		this.ctx.drawImage(hovno, this.calcSize(650), this.calcSize(50), this.calcSize(200), this.calcSize(400));
	}

}