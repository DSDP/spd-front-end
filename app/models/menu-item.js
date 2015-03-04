import DS from 'ember-data';

export default DS.Model.extend({
  nombre: DS.attr('string'),
  icono: DS.attr('string'),
  link: DS.attr('string'),
  orden: DS.attr('number'),
  
  parent: DS.belongsTo('menu-item', {inverse: 'childs'}),
  childs: DS.hasMany('menu-item', { async: false}),
});
