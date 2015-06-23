import Ember from 'ember';

export default Ember.ArrayController.extend({
  breadCrumb: "Listado",
  breadCrumbPath: null,
  
  // setup our query params
  queryParams: ["search", "page", "page_size", "tipo_proy","fecha_desde","fecha_hasta","firm_orden","firm_cargo_pf_id","firm_apellido", "codigo_exp", "codigo_num", "codigo_origen", "codigo_anio", "sumario", "tipo_camara", "tipo", "fecha_caducidad", "fecha", "titulo", "voces", "firmantes", "giros", "resultados", "codigo_estado", "periodo", "ordering"],

  // binding the property on the paged array  
  // to the query params on the controller   
  pageBinding: "content.page",
  page_sizeBinding: "content.page_size",
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
  searchPagesBinding: "content.search",
  searchTextBinding: "content.searchText",

  // set default values, can cause problems if left out 
  // if value matches default, it won't display in the URL 
  next: '',
  previous: '',
  count: '',

  page: 1,
  page_size: 5,
  fecha_desde: '',
  tipo_proy: '',
  fecha_hasta: '',
  firm_orden: '',
  firm_cargo_pf_id: '',
  firm_apellido: '',
  ordering:'',

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
  search: '',

  codigo_expIcon: '',
  codigo_numIcon: '',
  codigo_origenIcon: '',
  codigo_anioIcon: '',
  sumarioIcon: '',
  tipo_camaraIcon: '',
  tipoIcon: '',
  fecha_caducidadIcon: '',
  fechaIcon: '',
  tituloIcon: '',
  vocesIcon: '',
  firmantesIcon: '',
  girosIcon: '',
  resultadosIcon: '',
  codigo_estadoIcon: '',
  periodoIcon: '',

  searchText: '',

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
  }.observes('page_size'),

  pages: function () {
    return Math.ceil(this.get('totalPages') / this.get('page_size'));
  }.property('totalPages', 'total', 'page_size'),

  contentFiltered: function(){
    return this.get('content');
  }.property('page','content.@each', 'next', 'previous'),
});