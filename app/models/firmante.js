import DS from 'ember-data';

export default DS.Model.extend({
	proyecto: DS.belongsTo('proyecto'),
	persona_fisica_id: DS.attr(),
	cargo_persona_fisica_id: DS.attr(),
	codigo_exp: DS.attr('string'),
	nombre_leg_func: DS.attr('string'),
	tipo_camara: DS.attr('string'),
	cargo: DS.attr('string'),
	orden: DS.attr(),
	distrito: DS.attr('string'),
	nombre_del_bloque: DS.attr('string'),
});