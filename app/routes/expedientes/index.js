import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Route.extend(RouteMixin, {
  queryParams: {
    tipo: {
      refreshModel: false
    },
    tipo_proy: {
      refreshModel: false
    },
    periodo: {
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
  },

  actions: {
    remove: function(model) {
      if(confirm('Are you sure?')) {
        model.destroyRecord();
      }
    },
    refresh: function ()  {
      this.refresh();
    },    
  },

  model: function(params) {
    // params is {page: 1, name: "Adam"} 
    params.paramMapping = {page: "page", perPage: "page_size" };
    return this.findPaged("expediente", params);
    // server will receive params page=1, name=Adam 
  }  
});
