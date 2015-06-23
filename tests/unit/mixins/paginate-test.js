import Ember from 'ember';
import PaginateMixin from '../../../mixins/paginate';
import { module, test } from 'qunit';

module('PaginateMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var PaginateObject = Ember.Object.extend(PaginateMixin);
  var subject = PaginateObject.create();
  assert.ok(subject);
});
