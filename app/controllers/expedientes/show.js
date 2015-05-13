import Ember from 'ember';

export default Ember.ObjectController.extend({
  breadCrumb: function() {
    return "Ver " + this.get("model").attr('nombre');
  }.property("model"),
});
