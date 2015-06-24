import DS from 'ember-data';

export default DS.Model.extend({
	codigo_exp: DS.attr('string'),
	codigo_num: DS.attr('string'),
	codigo_origen: DS.attr('string'),
	codigo_anio: DS.attr('string'),
	sumario: DS.attr('string'),
	tipo_camara: DS.attr('string'),
	tipo: DS.attr('string'),
	fecha_caducidad: DS.attr('date'),
	fecha: DS.attr('date'),
	titulo: DS.attr('string'),
	voces: DS.attr('string'),
	//firmantes: DS.hasMany('firmantes', {async: true}),
	giros: DS.attr('string'),
	resultados: DS.attr('string'),
	codigo_estado: DS.attr(),
	periodo: DS.attr(),
	search: DS.attr('string'),
	ordering: DS.attr('string'),

	label: function(){
		return this.get('codigo_exp');
	}.property('codigo_exp')
});