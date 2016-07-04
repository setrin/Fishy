'use strict';

export default class {
	constructor (settings) {
		this._settings = settings;
		/*this.GameLoop(function(fps){
		    console.log(fps);
		}, this._settings.max_fps);*/
	}

	GameLoop (fn, fps){
	    var max_fps = fps || 60,
	    	now,
	    	delta,
	    	interval,
	    	then = performance.now(),

	    	frames,
	    	oldtime = 0;

	    return (function loop(time){
	        requestAnimationFrame(loop);

	        interval = 1000 / (max_fps);
	        now = performance.now();
	        delta = now - then;

	        if (delta > interval) {
	            // update time stuffs
	            then = now - (delta % interval);

	            // calculate the frames per second
	            frames = 1000 / (time - oldtime);
	            oldtime = time;

	            // call the fn
	            // and pass current fps to it
	            fn(frames);
	        }
	    }(0));
	}
}