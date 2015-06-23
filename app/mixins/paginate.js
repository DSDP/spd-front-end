import Ember from 'ember';

export default Ember.Mixin.create({
	findContent: function(model, params, controller){	
		var _self = this;
		this.set('loading', true);

		var options = (params) ? params : {page: this.get('page'), page_size: this.get('page_size')};

		if(!params.page){
			options.page = 1;
		}

		return this.store.find(model, options);
	},	

});
