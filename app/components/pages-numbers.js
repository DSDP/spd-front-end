import Ember from 'ember';
import layout from '../templates/components/pages-numbers';
import PaginateMixin from "../mixins/paginate";

export default Ember.Component.extend(PaginateMixin, {
  layout: layout,
  contentBinding: "content",
	pageBinding: "content.page",
	page_sizeBinding: "content.page_size",
	loadingBinding: false,
	store: null,
	model: null,
	limitShowPages: 5,
	meta: null,

	actions:{	
	  changePage: function(page, pageSize){
			var _self 				= this;
			var model 				= this.get('model');
			var options 			= this.get('content.query');

			this.set('page', page);

			options.page = this.get('page');

			if(this.get('page_size')){
				options.page_size = this.get('page_size');
			}

			//if(this.get('page_size') || this.get('page')){
				var results = this.findContent('proyecto', options);

				results.then(function(response){
					_self.set('content.content', response.content);
					_self.set('meta', response.meta);
					_self.set('loading', false);
				});
			//}
	  },
  },
  nextPage: function(){
    return this.get('page') + 1;
  }.property('page'),
  previousPage: function(){
    return this.get('page') - 1;
  }.property('page'),

  canPreviousPage: function(){
  	return (this.get('meta.previous'))
  }.property('content', 'content.page', 'content.page_size', 'meta'),

  canNextPage: function(){
  	return (this.get('meta.next'))
  }.property('content', 'content.page', 'content.page_size', 'meta'),

  pagesLimit: function(){
  	return Math.round(Number(this.get('meta.total')) / Number(this.get('page_size')));
  }.property('page_size', 'meta'),

  pagesItems: function(){
  	var currentPage = Number(this.get('page'));
  	var countStart 	= this.get('page');  	
    var pages 			= [];

    for(var i = countStart; i < this.get('limitShowPages') + this.get('page'); i++){
    	if(this.get('pagesLimit') && i <= this.get('pagesLimit'))
    	{  		
	      pages.push({ number: i, current: currentPage === i, });
    	}
    }

    return pages;
  }.property('page', 'page_size', 'limitShowPages', 'content', 'loading'),

  showPages: function(){
		return ((this.get('meta.next') || this.get('meta.previous')) && this.get('pagesLimit') > 0)
  }.property('page', 'page_size', 'meta', 'loading', 'content'),

  changeMeta: function(){
  	if(!this.get('meta')){
  		this.set('meta', this.get('content.meta'))
  	}
  }.observes('content','page', 'page_size', 'meta')
});
