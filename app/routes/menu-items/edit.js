import Ember from 'ember';
import SaveModelMixin from '../../mixins/save-model-mixin';

export default Ember.Route.extend(SaveModelMixin, {
	setupController: function  (controller, model) {
		this._super(controller, model);
		controller.set('menuItems', this.store.find('menu-item'));
	},
});
