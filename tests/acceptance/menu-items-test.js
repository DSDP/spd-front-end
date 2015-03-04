import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;
var originalConfirm;
var confirmCalledWith;

function defineFixturesFor(name, fixtures) {
  var modelClass = App.__container__.lookupFactory('model:' + name);
  modelClass.FIXTURES = fixtures;
}

module('Acceptance: MenuItem', {
  setup: function() {
    App = startApp();
    defineFixturesFor('menu-item', []);
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

test('visiting /menu-items without data', function() {
  visit('/menu-items');

  andThen(function() {
    equal(currentPath(), 'menu-items.index');
    equal(find('#blankslate').text().trim(), 'No Menuitems found');
  });
});

test('visiting /menu-items with data', function() {
  defineFixturesFor('menu-item', [{ id: 1, nombre: 'MyString', icono: 'MyString', link: 'MyString' }]);
  visit('/menu-items');

  andThen(function() {
    equal(currentPath(), 'menu-items.index');
    equal(find('#blankslate').length, 0);
    equal(find('table tbody tr').length, 1);
  });
});

test('create a new menu-item', function() {
  visit('/menu-items');
  click('a:contains(New Menuitem)');

  andThen(function() {
    equal(currentPath(), 'menu-items.new');

    fillIn('label:contains(Nombre) input', 'MyString');
    fillIn('label:contains(Icono) input', 'MyString');
    fillIn('label:contains(Link) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    equal(find('#blankslate').length, 0);
    equal(find('table tbody tr').length, 1);
  });
});

test('update an existing menu-item', function() {
  defineFixturesFor('menu-item', [{ id: 1 }]);
  visit('/menu-items');
  click('a:contains(Edit)');

  andThen(function() {
    equal(currentPath(), 'menu-items.edit');

    fillIn('label:contains(Nombre) input', 'MyString');
    fillIn('label:contains(Icono) input', 'MyString');
    fillIn('label:contains(Link) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    equal(find('#blankslate').length, 0);
    equal(find('table tbody tr').length, 1);
  });
});

test('show an existing menu-item', function() {
  defineFixturesFor('menu-item', [{ id: 1, nombre: 'MyString', icono: 'MyString', link: 'MyString' }]);
  visit('/users');
  click('a:contains(Show)');

  andThen(function() {
    equal(currentPath(), 'menu-items.show');

    equal(find('p strong:contains(Nombre:)').next().text(), 'MyString');
    equal(find('p strong:contains(Icono:)').next().text(), 'MyString');
    equal(find('p strong:contains(Link:)').next().text(), 'MyString');
  });
});

test('delete a menu-item', function() {
  defineFixturesFor('menu-item', [{ id: 1, nombre: 'MyString', icono: 'MyString', link: 'MyString' }]);
  visit('/menu-items');
  click('a:contains(Remove)');

  andThen(function() {
    equal(currentPath(), 'menu-items.index');
    deepEqual(confirmCalledWith, ['Are you sure?']);
    equal(find('#blankslate').length, 1);
  });
});
