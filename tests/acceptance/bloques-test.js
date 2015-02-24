import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;
var originalConfirm;
var confirmCalledWith;

function defineFixturesFor(name, fixtures) {
  var modelClass = App.__container__.lookupFactory('model:' + name);
  modelClass.FIXTURES = fixtures;
}

module('Acceptance: Bloque', {
  setup: function() {
    App = startApp();
    defineFixturesFor('bloque', []);
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

test('visiting /bloques without data', function() {
  visit('/bloques');

  andThen(function() {
    equal(currentPath(), 'bloques.index');
    equal(find('#blankslate').text().trim(), 'No Bloques found');
  });
});

test('visiting /bloques with data', function() {
  defineFixturesFor('bloque', [{ id: 1, finombre: 'MyString' }]);
  visit('/bloques');

  andThen(function() {
    equal(currentPath(), 'bloques.index');
    equal(find('#blankslate').length, 0);
    equal(find('table tbody tr').length, 1);
  });
});

test('create a new bloque', function() {
  visit('/bloques');
  click('a:contains(New Bloque)');

  andThen(function() {
    equal(currentPath(), 'bloques.new');

    fillIn('label:contains(Finombre) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    equal(find('#blankslate').length, 0);
    equal(find('table tbody tr').length, 1);
  });
});

test('update an existing bloque', function() {
  defineFixturesFor('bloque', [{ id: 1 }]);
  visit('/bloques');
  click('a:contains(Edit)');

  andThen(function() {
    equal(currentPath(), 'bloques.edit');

    fillIn('label:contains(Finombre) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    equal(find('#blankslate').length, 0);
    equal(find('table tbody tr').length, 1);
  });
});

test('show an existing bloque', function() {
  defineFixturesFor('bloque', [{ id: 1, finombre: 'MyString' }]);
  visit('/users');
  click('a:contains(Show)');

  andThen(function() {
    equal(currentPath(), 'bloques.show');

    equal(find('p strong:contains(Finombre:)').next().text(), 'MyString');
  });
});

test('delete a bloque', function() {
  defineFixturesFor('bloque', [{ id: 1, finombre: 'MyString' }]);
  visit('/bloques');
  click('a:contains(Remove)');

  andThen(function() {
    equal(currentPath(), 'bloques.index');
    deepEqual(confirmCalledWith, ['Are you sure?']);
    equal(find('#blankslate').length, 1);
  });
});
