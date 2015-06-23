import Ember from 'ember';
import PaginateMixin from "../mixins/paginate";

export default Ember.Component.extend(PaginateMixin, {
	sizes: [5, 10, 25, 50, 100],

	didInsertElement: function(){
		this.set('page_size', this.get('sizes.firstObject'));
	},
	actions:{
	  click: function(pageSize){
		var _self 				= this;
		var model 				= this.get('model');
		var options 			= this.get('content.query');

		this.set('page_size', pageSize);
		options.page_size = this.get('page_size');

		if(this.get('page_size')){
			var results = this.findContent('proyecto', options);

			results.then(function(response){
				_self.set('content.content', response.content);
				_self.set('meta', response.meta);
				_self.set('loading', false);
			});
		}
	  }.observes('page_size'),	
	},
});
