import Ember from 'ember';

export default Ember.Controller.extend({
  breadCrumb: function() {
    return "Ver " + this.get("model").get('nombre');
  }.property("model"),
});
