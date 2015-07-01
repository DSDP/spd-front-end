import Ember from 'ember';
import layout from '../templates/components/multi-select';

export default Ember.Component.extend({
  layout: layout,
  modelName: null,
  store: null,
  canEdit: false,
  filterText: '',
  filterTextSelect: '',
  maxResults: 5,
  threshold: 2,
  placeholder: '',
  showArrows: true,
  controllerContent: null,

  didInsertElement: function(){
  	this.set('placeholder', 'Filtrar '+ this.get('placeholder'));

  	this.set('controllerContent', Ember.ArrayController.create({
  		sortProperties: ['oldOrder'],
  		sortAscending: false,
  		content: null,
  	}));  	

		this.findContent();
  },

  actions:{  	
		clickItem: function(object){
			var list = this.get('listFiltered');

			if(list.length > 0){			
				var item = (!object) ? list.get('firstObject') : object;
				this.selectItem(item);
			}
		},

		clickItemSelected: function(object){
			var list = this.get('listFilteredSelected');

			if(list.length > 0){			
				var item = (!object) ? list.get('firstObject') : object;
				this.selectItem(item);
			}
		},

		upItem: function(object){
			this.moveItem(object, -1);
		},

		downItem: function(object){
			this.moveItem(object, 1);
		},
	},  
	selectItem: function(object){
		var listSelectedCount = this.get('listFilteredSelected').length + 1;
		var newOrder 					= (object.get('selected') === false) ? listSelectedCount : 0;

		object.set('newOrder', newOrder);

		object.set('selected', !object.get('selected'));
	},

	moveItem: function(object, direction){
		var content 			= this.get('controllerContent.content');
		var order 				= (object && object.get('selected') === true) ? 'newOrder' : 'oldOrder';
		var nextPrevItem 	= content.findProperty(order, object.get(order) + parseInt(direction));
		
		if(nextPrevItem)
		{
			nextPrevItem.set(order, object.get(order));
			object.set(order, object.get(order) + parseInt(direction));
		}
		
		//this.sortContent();
	},

  findContent: function(){
		var results 		= this.store.find(this.get('modelName'));
		var controller 	= this.get('controllerContent');
		var countItem 	= 0;

		results.then(function(xhr){
			controller.set('content', xhr.content);

			results.forEach(function(item){
				countItem++;

				item.set('newOrder', 0);
				item.set('oldOrder', countItem);
				item.set('selected', false);
			});
		});

		//controller.set('content', results);
  },

  sortContent: function(data, fieldOrder){
  	if(data)
  	{		
	    return data.sort( function(a,b){
	        return a.get(fieldOrder) - b.get(fieldOrder);
	    });  	
  	}
  },

  listFiltered: function(){
		var regex 			= new RegExp(this.get('filterText').toString().toLowerCase());
		var filtered 		= [];
		var controller 	= this.get('controllerContent');
		var inputFilter = this.get('filterText');

		if(controller && controller.get('content'))
		{
			var items = controller.get('content').filterBy('selected', false);
	
			if(items && inputFilter.length >= this.get('threshold'))
			{
				filtered = items.filter(function(item){
					return regex.test((item.get('label')).toLowerCase());
				});
			}
			else
			{
				filtered = items;
			}	
		}

		filtered = this.sortContent(filtered, 'oldOrder');

		return filtered;
  }.property('controllerContent.content.@each', 'controllerContent.content.@each.oldOrder', 'controllerContent.content.@each.selected', 'filterText'), 

  listFilteredSelected: function(){
		var regex 			= new RegExp(this.get('filterTextSelect').toString().toLowerCase());
		var filtered 		= [];
		var controller 	= this.get('controllerContent');
		var inputFilter = this.get('filterTextSelect');

		if(controller && controller.get('content'))
		{
			var items = controller.get('content').filterBy('selected', true);

			if(items && inputFilter.length >= this.get('threshold'))
			{			
				filtered = items.filter(function(item) {
					return regex.test((item.get('label')).toLowerCase());
				});
			}
			else
			{
				filtered = items;
			}
		}

		filtered = this.sortContent(filtered, 'newOrder');

		return filtered;
  }.property('controllerContent.content.@each.selected', 'controllerContent.content.@each.newOrder', 'filterTextSelect'), 
});
