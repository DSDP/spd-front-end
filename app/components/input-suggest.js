import Ember from 'ember';
import layout from '../templates/components/input-suggest';

export default Ember.Component.extend({
  layout: layout,
  model: null,
  store: null,
  results: [],
  text: '',
  showResults: true,
  maxResults: 5,
  threshold: 3,
  typeAction: null,
  canEdit: false,
  placeholder: 'Ingrese el texto',

  didInsertElement: function(){
  	this.set('content', Ember.ArrayController.create());
  },

  actions:{
		addFirstItem: function(){
	  	if(this.get('text').length > this.get('threshold') && this.get('results.isFulfilled') === true)
	  	{
				var firstObject = this.get('results.firstObject');
				var item 				= this.get('content').findProperty('id', firstObject.id);

				if(!item && firstObject)
				{		
					this.get('content').addObject(firstObject);
				}

				this.clearSuggest();
			}
		},

		addItem: function(object){
			var item = this.get('content').findProperty('id', object.id);
			
			if(!item)
			{		
				this.get('content').addObject(object);
			}

			this.clearSuggest();
		},

		removeItem: function(object){
			var item = this.get('content').findProperty('id', object.id);

			if(item)
			{
				this.get('content').removeObject(object);
			}
		},
	},

  clearSuggest: function(){
		this.set('text', '');
		this.set('showResults', false);
  },
  
  changeText: function(){
		this.set('showResults', true);

  	if(this.get('text').length > this.get('threshold'))
  	{
  		this.findContent();
  	}
  	else
  	{		
			this.set('showResults', false);
  	}

  }.observes('text'),
  
  findContent: function(){
		var results = this.store.find(this.get('model'), {search: this.get('text')});

  	this.set('results', results);
  },

  listSelected: function(){
  	return this.get('content') ;
  }.property('content', 'content.@each')
});
