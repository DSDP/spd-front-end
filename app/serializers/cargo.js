import DjangoSerializer from './django';

export default DjangoSerializer.extend({
	normalizeId: function (hash) {
	    var primaryKey = 'cargo_' + this.get('primaryKey');

	    if (primaryKey === 'id') { return; }

	    hash.id = hash[primaryKey];
	    delete hash[primaryKey];
	},
});
