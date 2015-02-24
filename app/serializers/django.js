import DRFSerializer from './drf';

export default DRFSerializer.extend({
	normalizeId: function (hash) {
	    var primaryKey = 'entidad_' + this.get('primaryKey');

	    if (primaryKey === 'id') { return; }

	    hash.id = hash[primaryKey];
	    delete hash[primaryKey];
	},
});
