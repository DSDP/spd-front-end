import OAuthCustomAuthenticator from '../authenticators/oauth-custom';

export default {
    name: 'oauth-custom',

    initialize: function(container) {
        container.register(
            'oauth-custom:oauth2-password-grant',
            OAuthCustomAuthenticator);
    }
};