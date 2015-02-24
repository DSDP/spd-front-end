import Authenticator from 'simple-auth-oauth2/authenticators/oauth2';

export default Authenticator.extend({
    makeRequest: function(url, data) {
        data.client_id = "5FbzJ9oU=9Db0y7s92SvuhSixxfU3Ajcwly2jNbb";
        data.client_secret = "3KJtUIRd7=SgzpdTA?aeC5r9a8GkoF7rwCWufg5BXYTb9Pwlx_ef6NXbo.A3Fwn.1ok_8L8gSe_WDGJq_ZKn.D5y9MLAr9.T1j.IjT=exFT6q.3ox42g2RAjHle-KrHv";
        return this._super(url, data);
    }
});