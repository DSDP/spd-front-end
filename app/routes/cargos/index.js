import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Route.extend(RouteMixin, {
  queryParams: {
    descripcion: {
      refreshModel: false
    },
    ordering: {
      refreshModel: true
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
    sortBy: function (newSortField){
      var previousSortBy = this.controller.get('ordering');

      if (newSortField === previousSortBy) {
        return this.controller.set('ordering', "-" + this.controller.get('ordering'));
      }else{
        return this.controller.set('ordering', newSortField);    
      }    
    },
  },

  model: function(params) {
    // params is {page: 1, name: "Adam"} 
    params.paramMapping = {page: "page", perPage: "page_size" };
    return this.findPaged("cargo", params);
    // server will receive params page=1, name=Adam 
  }  
});
