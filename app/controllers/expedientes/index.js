import Ember from 'ember';

export default Ember.ArrayController.extend({
// setup our query params 
  breadCrumb: "Listado",
  breadCrumbPath: null,
  
  queryParams: ["page", "perPage", "tipo_proy","fecha_desde","fecha_hasta","firm_orden","firm_cargo_pf_id","firm_apellido", "codigo_exp", "codigo_num", "codigo_origen", "codigo_anio", "sumario", "tipo_camara", "tipo", "fecha_caducidad", "fecha", "titulo", "voces", "firmantes", "giros", "resultados", "codigo_estado", "periodo"],
 
  // binding the property on the paged array  
  // to the query params on the controller 
  pageBinding: "content.page",
  perPageBinding: "content.perPage",
  totalPagesBinding: "content.totalPages",
  tipo_proyPagesBinding: "content.tipo_proy",
  fecha_desdePagesBinding: "content.fecha_desde",
  fecha_hastaPagesBinding: "content.fecha_hasta",
  firm_ordenPagesBinding: "content.firm_orden",
  firm_cargo_pf_idPagesBinding: "content.firm_cargo_pf_id",
  firm_apellidoPagesBinding: "content.firm_apellido",
  codigo_expPagesBinding: "content.codigo_exp",
  codigo_numPagesBinding: "content.codigo_num",
  codigo_origenPagesBinding: "content.codigo_origen",
  codigo_anioPagesBinding: "content.codigo_anio",
  sumarioPagesBinding: "content.sumario",
  tipo_camaraPagesBinding: "content.tipo_camara",
  tipoPagesBinding: "content.tipo",
  fecha_caducidadPagesBinding: "content.fecha_caducidad",
  fechaPagesBinding: "content.fecha",
  tituloPagesBinding: "content.titulo",
  vocesPagesBinding: "content.voces",
  firmantesPagesBinding: "content.firmantes",
  girosPagesBinding: "content.giros",
  resultadosPagesBinding: "content.resultados",
  codigo_estadoPagesBinding: "content.codigo_estado",
  periodoPagesBinding: "content.periodo",



  
  // set default values, can cause problems if left out 
  // if value matches default, it won't display in the URL 
  page: 1,
  perPage: 50,
  fecha_desde: '',
  tipo_proy: '',
  fecha_hasta: '',
  firm_orden: '',
  firm_cargo_pf_id: '',
  firm_apellido: '',
  codigo_exp: '',
  codigo_num: '',
  codigo_origen: '',
  codigo_anio: '',
  sumario: '',
  tipo_camara: '',
  tipo: '',
  fecha_caducidad: '',
  fecha: '',
  titulo: '',
  voces: '',
  firmantes: '',
  giros: '',
  resultados: '',
  codigo_estado: '',
  periodo: '',

  perPageChanged: function () {
    this.set('page', 1);
  }.observes('perPage'),

  pages: function () {
    return Math.ceil(this.get('totalPages') / this.get('perPage'));
  }.property('totalPages', 'total', 'perPage'),
  
});