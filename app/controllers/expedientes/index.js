import Ember from 'ember';

export default Ember.ArrayController.extend({
// setup our query params 
  breadCrumb: "Listado",
  breadCrumbPath: null,
  
  queryParams: ["page", "perPage", "tipo", "tipo_proy","periodo","fecha_desde","fecha_hasta","firm_orden","firm_cargo_pf_id","firm_apellido"],
 
  // binding the property on the paged array  
  // to the query params on the controller 
  pageBinding: "content.page",
  perPageBinding: "content.perPage",
  totalPagesBinding: "content.totalPages",
  tipoPagesBinding: "content.tipo",
  tipo_proyPagesBinding: "content.tipo_proy",
  periodoPagesBinding: "content.periodo",
  fecha_desdePagesBinding: "content.fecha_desde",
  fecha_hastaPagesBinding: "content.fecha_hasta",
  firm_ordenPagesBinding: "content.firm_orden",
  firm_cargo_pf_idPagesBinding: "content.firm_cargo_pf_id",
  firm_apellidoPagesBinding: "content.firm_apellido",
  
  // set default values, can cause problems if left out 
  // if value matches default, it won't display in the URL 
  page: 1,
  perPage: 5,
  tipo: '',
  periodo: '',
  fecha_desde: '',
  tipo_proy: '',
  fecha_hasta: '',
  firm_orden: '',
  firm_cargo_pf_id: '',
  firm_apellido: '',

  perPageChanged: function () {
    this.set('page', 1);
  }.observes('perPage'),

  pages: function () {
    return Math.ceil(this.get('totalPages') / this.get('perPage'));
  }.property('totalPages', 'total', 'perPage'),

});