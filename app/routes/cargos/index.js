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

      
      if(this.controller.get(newSortField + "Type") === "numeric"){
        this.controller.set(newSortField + "Icon", "fa-sort-numeric");
      }else{
        this.controller.set(newSortField + "Icon", "fa-sort-alpha"); 
      }
      

      if (newSortField === previousSortBy) {
        this.controller.set(newSortField + "Icon", this.controller.get(newSortField + "Icon")  + "-desc");
        return this.controller.set('ordering', "-" + this.controller.get('ordering'));
      }else{
        this.controller.set(newSortField + "Icon",  this.controller.get(newSortField + "Icon") + "-asc");
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
