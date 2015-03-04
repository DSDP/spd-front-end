import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
	renderTemplate: function(controller, model) {
    	this.render(); // all defaults apply

		this.render('nav', {  // the template name associated with 'post' Route
		  into: 'application', // the parent route to 'post' Route
		  outlet: 'nav',      // {{outlet}} and {{outlet 'main' are synonymous}},
		  view: 'nav',        // the view associated with the 'post' Route
		  controller: 'nav',  // the controller associated with the 'post' Route
		  model: model
		})    	
  	},

  	model: function() {
    	return this.store.find('menu-item');
  	},
});