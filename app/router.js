import Ember from "ember";
import config from "./config/environment";

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('expedientes', function() {
    this.route('new');
    this.route('edit', { path: ':expedientes_id/edit' });
    this.route('show', { path: ':expedientes_id' });
  });
  this.resource('administrador', function () {
    this.resource('bloques', function() {
      this.route('new');
      this.route('edit', { path: ':bloque_id/edit' });
      this.route('show', { path: ':bloque_id' });
    });
    this.resource('cargos', function() {
      this.route('new');
      this.route('edit', { path: ':cargo_id/edit' });
      this.route('show', { path: ':cargo_id' });
    });    
    this.resource('menu-items', function() {
      this.route('new');
      this.route('edit', { path: ':menu-item_id/edit' });
      this.route('show', { path: ':menu-item_id' });
    });    
  });
  
  this.route("login");
  this.route("about");
});

export default Router;