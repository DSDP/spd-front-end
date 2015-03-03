import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Route.extend(RouteMixin, {
  queryParams: {
    descripcion: {
      refreshModel: true
    },
  },

  actions: {
    remove: function(model) {
      if(confirm('Are you sure?')) {
        model.destroyRecord();
      }
    }
  },

  model: function(params) {
    // params is {page: 1, name: "Adam"} 
    params.paramMapping = {page: "page", perPage: "page_size" };
    return this.findPaged("cargo", params);
    // server will receive params page=1, name=Adam 
  }  
});
