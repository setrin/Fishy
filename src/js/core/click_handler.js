'use strict';

/**
* Name: 'ClickHandler' class
* Desc: Contains click event handler
**/
export default class {
	constructor (settings) {
		this.settings = settings;
		this._canvas = settings.canvas;
		this._ctx = this._canvas.getContext("2d");
		this._channel = postal.channel("clickHandler");
		this._hitboxes = [];

		this.subscribe();
		this.clickEvent();
	}

	subscribe () {
		var that = this;

	    this._channel.subscribe("clickHandler.add", 
			function(data) {
	           	//that._hitboxes.push(data);
	           	that.addHitbox(data);
	        }
	    );
	}

	addHitbox (obj) {
		this._hitboxes.push(obj);
		this._ctx.rect(obj.top,obj.left,obj.width,obj.height);
		this._ctx.stroke();
	}

	clickEvent () {
		var that = this;
		this._canvas.addEventListener('click', function(event) {
		    var x = event.offsetX,
		        y = event.offsetY;

		    // Collision detection between clicked offset and element.
		    that._hitboxes.forEach(function(hitbox) {

		    	//
		    	// Problem Note: Solve how to get actuall calculated positions of hitboxes from Loading_view
		    	//

		        if (y > that.calcSize(hitbox.top) && y < that.calcSize(hitbox.top) + that.calcSize(hitbox.height) && x > that.calcSize(hitbox.left) && x < that.calcSize(hitbox.left) + that.calcSize(hitbox.width)) {
		            alert('clicked an element: ' + hitbox.id);
		        }
		    });

		    console.log(x + ':' + y);

		}, false);

	}

	calcSize (value) {
		return value * this.settings.canvas_scale;
	}
	
}