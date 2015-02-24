import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Controller.extend(LoginControllerMixin, {
	errorMessage: null,
	errorDescription: null,
	
	authenticator: 'oauth-custom:oauth2-password-grant',
	actions: {
      authenticate: function() {
        var _this = this;
        this._super().then(null, function(error) {
			var message = error.error;
			var description = error.error_description;
			_this.set('errorMessage', message);
			_this.set('errorDescription', description);
        });
      }
    }	
});

