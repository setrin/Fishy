'use strict';
var $ = require("jquery");
import Settings from './core/Settings.js';
import World from './core/World.js';

$(function(){
	var settings = new Settings();
	var world = new World(settings);
});