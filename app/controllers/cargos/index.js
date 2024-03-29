import Ember from 'ember';

export default Ember.ArrayController.extend({
  breadCrumb: "Listado",
  breadCrumbPath: null,
    
// setup our query params 
  queryParams: ["page", "perPage", "descripcion","ordering"],
 
  // binding the property on the paged array  
  // to the query params on the controller 
  pageBinding: "content.page",
  perPageBinding: "content.perPage",
  totalPagesBinding: "content.totalPages",
  descripcionPagesBinding: "content.descripcion",
  
  // set default values, can cause problems if left out 
  // if value matches default, it won't display in the URL 
  page: 1,
  perPage: 5,
  descripcion: '',
  ordering:'',
  descripcionIcon:'',

  orderingChanged: function() {
    var orderField = this.get('ordering');
    var orderConfig = '-asc';
    if(orderField.indexOf("-") >= 0){
      orderField = orderField.replace("-",'');
      orderConfig = '-desc';
    }

    if(this.get(orderField + "Type") === "numeric"){
      this.set(orderField + "Icon", "fa-sort-numeric");
    }else{
      this.set(orderField + "Icon", "fa-sort-alpha"); 
    }

    this.set(orderField + 'Icon', this.get(orderField + 'Icon') + orderConfig);
  }.observes('ordering'),

  perPageChanged: function () {
    this.set('page', 1);
  }.observes('perPage'),

  pages: function () {
    return Math.ceil(this.get('totalPages') / this.get('perPage'));
  }.property('totalPages', 'total', 'perPage'),

});