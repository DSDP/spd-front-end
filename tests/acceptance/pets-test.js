import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;
var originalConfirm;
var confirmCalledWith;

function defineFixturesFor(name, fixtures) {
  var modelClass = App.__container__.lookupFactory('model:' + name);
  modelClass.FIXTURES = fixtures;
}

module('Acceptance: Pet', {
  setup: function() {
    App = startApp();
    defineFixturesFor('pet', []);
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

test('visiting /pets without data', function() {
  visit('/pets');

  andThen(function() {
    equal(currentPath(), 'pets.index');
    equal(find('#blankslate').text().trim(), 'No Pets found');
  });
});

test('visiting /pets with data', function() {
  defineFixturesFor('pet', [{ id: 1, firstName: 'MyString', lastName: 'MyString', age: 42 }]);
  visit('/pets');

  andThen(function() {
    equal(currentPath(), 'pets.index');
    equal(find('#blankslate').length, 0);
    equal(find('table tbody tr').length, 1);
  });
});

test('create a new pet', function() {
  visit('/pets');
  click('a:contains(New Pet)');

  andThen(function() {
    equal(currentPath(), 'pets.new');

    fillIn('label:contains(First name) input', 'MyString');
    fillIn('label:contains(Last name) input', 'MyString');
    fillIn('label:contains(Age) input', 42);

    click('input:submit');
  });

  andThen(function() {
    equal(find('#blankslate').length, 0);
    equal(find('table tbody tr').length, 1);
  });
});

test('update an existing pet', function() {
  defineFixturesFor('pet', [{ id: 1 }]);
  visit('/pets');
  click('a:contains(Edit)');

  andThen(function() {
    equal(currentPath(), 'pets.edit');

    fillIn('label:contains(First name) input', 'MyString');
    fillIn('label:contains(Last name) input', 'MyString');
    fillIn('label:contains(Age) input', 42);

    click('input:submit');
  });

  andThen(function() {
    equal(find('#blankslate').length, 0);
    equal(find('table tbody tr').length, 1);
  });
});

test('show an existing pet', function() {
  defineFixturesFor('pet', [{ id: 1, firstName: 'MyString', lastName: 'MyString', age: 42 }]);
  visit('/users');
  click('a:contains(Show)');

  andThen(function() {
    equal(currentPath(), 'pets.show');

    equal(find('p strong:contains(First name:)').next().text(), 'MyString');
    equal(find('p strong:contains(Last name:)').next().text(), 'MyString');
    equal(find('p strong:contains(Age:)').next().text(), 42);
  });
});

test('delete a pet', function() {
  defineFixturesFor('pet', [{ id: 1, firstName: 'MyString', lastName: 'MyString', age: 42 }]);
  visit('/pets');
  click('a:contains(Remove)');

  andThen(function() {
    equal(currentPath(), 'pets.index');
    deepEqual(confirmCalledWith, ['Are you sure?']);
    equal(find('#blankslate').length, 1);
  });
});
