import Ember from 'ember';

export default Ember.ObjectController.extend({
  breadCrumb: function() {
    return "Editar " + this.get("model").get('descripcion');
  }.property("model"),		
});
