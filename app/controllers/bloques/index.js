import Ember from 'ember';

export default Ember.ArrayController.extend({
// setup our query params 
  queryParams: ["page", "perPage", "nombre", 'tipo_camara'],
 
  // binding the property on the paged array  
  // to the query params on the controller 
  pageBinding: "content.page",
  perPageBinding: "content.perPage",
  totalPagesBinding: "content.totalPages",
  nombrePagesBinding: "content.nombre",
  tipo_camaraPagesBinding: "content.tipo_camara",
  
  // set default values, can cause problems if left out 
  // if value matches default, it won't display in the URL 
  page: 1,
  perPage: 5,
  nombre: '',
  tipo_camara: '',

  perPageChanged: function () {
    this.set('page', 1);
  }.observes('perPage'),

  pages: function () {
    return Math.ceil(this.get('totalPages') / this.get('perPage'));
  }.property('totalPages', 'total', 'perPage'),

});