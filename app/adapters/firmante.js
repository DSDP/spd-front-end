import DjangoAdapter from './django';

export default DjangoAdapter.extend({
	buildURL: function(type, id, record) {
		type = record._relationships.proyecto.key + "s/" + record._relationships.proyecto.canonicalState.id + "/" + type;
    var url = this._super(type, id, record);
    if (this.get('addTrailingSlashes')) {
      if (url.charAt(url.length - 1) !== '/') {
        url += '/';
      }
    }
    return url;
  },
});