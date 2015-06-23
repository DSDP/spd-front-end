import Ember from 'ember';
import PaginateMixin from "../../mixins/paginate";

export default Ember.Route.extend(PaginateMixin, {
	queryParams: {
		search: {
			refreshModel: false
		},
		tipo_proy: {
			refreshModel: false
		},
		fecha_desde: {
			refreshModel: false
		},
		fecha_hasta: {
			refreshModel: false
		},
		firm_orden: {
			refreshModel: false
		},
		firm_cargo_pf_id: {
			refreshModel: false
		},
		firm_apellido: {
			refreshModel: false
		},
		codigo_exp: {
			refreshModel: false
		},
		codigo_num: {
			refreshModel: false
		},
		codigo_origen: {
			refreshModel: false
		},
		codigo_anio: {
			refreshModel: false
		},
		sumario: {
			refreshModel: false
		},
		tipo_camara: {
			refreshModel: false
		},
		tipo: {
			refreshModel: false
		},
		fecha_caducidad: {
			refreshModel: false
		},
		fecha: {
			refreshModel: false
		},
		titulo: {
			refreshModel: false
		},
		voces: {
			refreshModel: false
		},
		firmantes: {
			refreshModel: false
		},
		giros: {
			refreshModel: false
		},
		resultados: {
			refreshModel: false
		},
		codigo_estado: {
			refreshModel: false
		},
		periodo: {
			refreshModel: false
		},
		page: {
			refreshModel: false
		},
		page_size: {
			refreshModel: false
		},  
		ordering: {
			refreshModel: false
		},
	},
	actions: {
		remove: function(model) {
			if(confirm('Are you sure?')) {
				model.destroyRecord();
			}
		},
		refresh: function (){
			this.controller.set('page', 1);
			//this.controller.set('page_size', 1);

			this.searchContent();
		},

		sortBy: function (newSortField){
			var previousSortBy = this.controller.get('ordering');
			this.controller.set(previousSortBy.replace("-",'') + "Icon", "");

			if(newSortField === previousSortBy) {
				this.controller.set('ordering', "-" + this.controller.get('ordering'));
			}else{
				this.controller.set('ordering', newSortField);    
			} 

			this.searchContent();
		},

		queryParamsDidChange: function() {
			// opt into full refresh
			//this.refresh();
			/*
			if(this.get('controller')){	
				var _self 	= this;
				var params 	= this.get('controller.queryParams');

				// Check search params
				params.forEach(function(value){
					if(value != 'page' && value != 'page_size'){
					//if(value != 'page'){
						if(_self.controller[value]){
							_self.controller.set('searchText', true);
						}
					}else{
						_self.controller.set('searchText', false);
					}
				});
			}
			*/
		}																
	},
	searchContent: function(params){
		var _self = this;
		var model = 'proyecto';

		var options = this.currentModel.query;
		this.controller.queryParams.forEach(function(value){ options[value] = this.controller[value]; }, this);

		var query = this.findContent('proyecto', options);
		this.controller.set('loading', true);

		query.then(function(response){
				_self.controller.set('loading', false);
				_self.set('controller.content.content', response.content);
		});
	},
	afterModel: function(proyectos) {
	},

	model: function(params) {		
		return this.findContent('proyecto', params);
	},
});
