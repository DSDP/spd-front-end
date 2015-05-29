import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'sparl-core/tests/helpers/start-app';

var application;

module('Acceptance: Index', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /index', function(assert) {
  //startApp();
  visit('/probloques');

  andThen(function() {
    //assert.equal(currentPath(), 'bloques');
    equal(currentPath(), 'bloques.index');
  });
});
