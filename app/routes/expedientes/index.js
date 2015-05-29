import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Route.extend(RouteMixin, {
  queryParams: {
    tipo_proy: {
      refreshModel: false
    },
    fecha_desde: {
      refreshModel: false
    },
    fecha_hasta: {
      refreshModel: false
    },
    firm_orden: {
      refreshModel: false
    },
    firm_cargo_pf_id: {
      refreshModel: false
    },
    firm_apellido: {
      refreshModel: false
    },
    codigo_exp: {
      refreshModel: false
    },
    codigo_num: {
      refreshModel: false
    },
    codigo_origen: {
      refreshModel: false
    },
    codigo_anio: {
      refreshModel: false
    },
    sumario: {
      refreshModel: false
    },
    tipo_camara: {
      refreshModel: false
    },
    tipo: {
      refreshModel: false
    },
    fecha_caducidad: {
      refreshModel: false
    },
    fecha: {
      refreshModel: false
    },
    titulo: {
      refreshModel: false
    },
    voces: {
      refreshModel: false
    },
    firmantes: {
      refreshModel: false
    },
    giros: {
      refreshModel: false
    },
    resultados: {
      refreshModel: false
    },
    codigo_estado: {
      refreshModel: false
    },
    periodo: {
      refreshModel: false
    },
    ordering: {
      refreshModel: false
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
    return this.findPaged("expediente", params);
    // server will receive params page=1, name=Adam 
  }  
});