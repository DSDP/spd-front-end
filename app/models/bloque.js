import DS from 'ember-data';

export default DS.Model.extend({
  nombre: DS.attr('string'),
  tipocamara: DS.attr('string'),

});
