import Ember from 'ember';
import SaveModelMixin from '../../mixins/save-model-mixin';

export default Ember.Route.extend(SaveModelMixin, {
  model: function() {
    return this.store.createRecord('menu-item');
  },
  
  setupController: function  (controller, model) {
 	this._super(controller, model);
	controller.set('menuItems', this.store.find('menu-item'));
  },

});
