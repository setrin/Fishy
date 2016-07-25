'use strict';

import AssetManager from './Asset_manager.js';
import Settings from './Settings.js';
import LoadingView from '../views/Loading_view.js';
import MenuView from '../views/Menu_view.js';

/**
*	Name: 'World' class
*	Desc: Handle all Game states and manage everything
**/
export default class {
	constructor () {
		this._assetManager = new AssetManager();
		this._settings = new Settings();
		this._canvas = this._settings.canvas;
		this._channel = postal.channel("world");
		this._gameloop_run = true;
		this._game_state = 0; //0 - Loading, 1 - Menu, 2 - Playing, 3 - Game over
		//this._entities_index = 0;
		//this._entities = {}; // {this._entities_index: new Entity(this._entities_index), ...}

		this.subscribe();

		this._loadingView = new LoadingView(this._settings);
		this._menuView = new MenuView(this._settings);

		this.startGame();

		this._assetManager.startDownload();
	}

	/*-------------------------------------------------------------
	*	Function that handles all subscribes and callbacks
	*-------------------------------------------------------------*/
	subscribe () {
		var that = this;

	    this._channel.subscribe("state.change", 
			function(data) {
	           	that._game_state = data.state;
	        }
	    );

	    this._channel.subscribe("gameloop.stop", 
			function() {
	           	that._gameloop_run = false;
	        }
	    );
	}

	/*-------------------------------------------------------------
	*	Function to start GameLoop - Main loop
	*-------------------------------------------------------------*/
	startGame () {
		var that = this;
		this.GameLoop(function(fps){
			switch (that._game_state) {
				case 0: // Loading
			    	that._loadingView.render(fps);
			    	break;
			    case 1: // Menu
			    	that._menuView.render(fps);
			    	break;
			    case 2: //  Game Play
			    	
			    	break;
			    case 3: //  Game Over
			    	
			    	break;
			}
		}, this._settings.max_fps);
	}

	/*-------------------------------------------------------------
	*	Main GameLoop function to control FPS
	*-------------------------------------------------------------*/
	GameLoop (fn, fps) {
	    var max_fps = fps || 60,
	    	now,
	    	delta,
	    	interval,
	    	then = performance.now(),

	    	frames,
	    	oldtime = 0,
	    	that = this;

	    return (function loop(time){
	        if (that._gameloop_run) {
	        	requestAnimationFrame(loop);
	        }

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

	get ctx () {return this._ctx;}
}