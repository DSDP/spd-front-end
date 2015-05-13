import DS from 'ember-data';

export default DS.Model.extend({
	codigoexp: DS.attr('string'),
	codigonum: DS.attr('string'),
	codigoorigen: DS.attr('string'),
	codigoanio: DS.attr('string'),
	sumario: DS.attr('string'),
	tipocamara: DS.attr('string'),
	tipo: DS.attr('string'),
	fechacaducidad: DS.attr('date'),
	fecha: DS.attr('date'),
	titulo: DS.attr('string'),
	voces: DS.attr('string'),
	firmantes: DS.attr('string'),
	giros: DS.attr('string'),
	resultados: DS.attr('string'),
	codigoestado: DS.attr(),
	periodo: DS.attr(),
});
