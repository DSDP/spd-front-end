import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

/**
* Application constructor
*
* @class App
* @constructor
*/

Ember.Inflector.inflector.irregular('perfil', 'perfiles');

var App = Ember.Application.extend({
	/**
	* @property modulePrefix
	* @type {Object}
	* @default config.modulePrefix
	*/	
	modulePrefix: config.modulePrefix,
	podModulePrefix: config.podModulePrefix,
	Resolver: Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
