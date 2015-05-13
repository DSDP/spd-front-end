import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;
var originalConfirm;
var confirmCalledWith;

function defineFixturesFor(name, fixtures) {
  var modelClass = App.__container__.lookupFactory('model:' + name);
  modelClass.FIXTURES = fixtures;
}

module('Acceptance: Expedientes', {
  setup: function() {
    App = startApp();
    defineFixturesFor('expedientes', []);
    originalConfirm = window.confirm;
    window.confirm = function() {
      confirmCalledWith = [].slice.call(arguments);
      return true;
    };
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    window.confirm = originalConfirm;
    confirmCalledWith = null;
  }
});

test('visiting /expedientes without data', function() {
  visit('/expedientes');

  andThen(function() {
    equal(currentPath(), 'expedientes.index');
    equal(find('#blankslate').text().trim(), 'No Expedientes found');
  });
});

test('visiting /expedientes with data', function() {
  defineFixturesFor('expedientes', [{ id: 1 }]);
  visit('/expedientes');

  andThen(function() {
    equal(currentPath(), 'expedientes.index');
    equal(find('#blankslate').length, 0);
    equal(find('table tbody tr').length, 1);
  });
});

test('create a new expedientes', function() {
  visit('/expedientes');
  click('a:contains(New Expedientes)');

  andThen(function() {
    equal(currentPath(), 'expedientes.new');


    click('input:submit');
  });

  andThen(function() {
    equal(find('#blankslate').length, 0);
    equal(find('table tbody tr').length, 1);
  });
});

test('update an existing expedientes', function() {
  defineFixturesFor('expedientes', [{ id: 1 }]);
  visit('/expedientes');
  click('a:contains(Edit)');

  andThen(function() {
    equal(currentPath(), 'expedientes.edit');


    click('input:submit');
  });

  andThen(function() {
    equal(find('#blankslate').length, 0);
    equal(find('table tbody tr').length, 1);
  });
});

test('show an existing expedientes', function() {
  defineFixturesFor('expedientes', [{ id: 1 }]);
  visit('/users');
  click('a:contains(Show)');

  andThen(function() {
    equal(currentPath(), 'expedientes.show');

  });
});

test('delete a expedientes', function() {
  defineFixturesFor('expedientes', [{ id: 1 }]);
  visit('/expedientes');
  click('a:contains(Remove)');

  andThen(function() {
    equal(currentPath(), 'expedientes.index');
    deepEqual(confirmCalledWith, ['Are you sure?']);
    equal(find('#blankslate').length, 1);
  });
});
