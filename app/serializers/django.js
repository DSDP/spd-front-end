import DRFSerializer from './drf';

export default DRFSerializer.extend({
	serializeIntoHash: function(hash, type, record, options) {
		hash.id = record.get('id');
		Ember.merge(hash, this.serialize(record, options));
	},

	extractMeta: function (store, type, payload) {
		if (payload && payload.results) {
	      // Sets the metadata for the type.
	      store.metaForType(type, {
	        total: payload.count,
	        next: payload.next,
	        previous: payload.previous,
	        total_pages: payload.count
	      });

	      // Keep ember data from trying to parse the metadata as a records
	      delete payload.count;
	      delete payload.next;
	      delete payload.previous;
	    }
	},
});
