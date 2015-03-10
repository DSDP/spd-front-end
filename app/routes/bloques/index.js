import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Route.extend(RouteMixin, {
  queryParams: {
    nombre: {
      refreshModel: false
    },
    tipo_camara: {
      refreshModel: false
    }
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
    return this.findPaged("bloque", params);
    // server will receive params page=1, name=Adam 
  }  
});
