import Ember from 'ember';

export default Ember.ArrayController.extend({
// setup our query params 
  queryParams: ["page", "perPage", "descripcion"],
 
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
  

  perPageChanged: function () {
    this.set('page', 1);
  }.observes('perPage'),

  pages: function () {
    return Math.ceil(this.get('totalPages') / this.get('perPage'));
  }.property('totalPages', 'total', 'perPage'),

});