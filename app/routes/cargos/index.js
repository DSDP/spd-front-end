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
      this.controller.set('page',1);
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
    params.paramMapping = {page: "page", perPage: "page_size" };
    return this.findPaged("cargo", params);
  }  
});
