import Authenticator from 'simple-auth-oauth2/authenticators/oauth2';

export default Authenticator.extend({
    makeRequest: function(url, data) {
        data.client_id = "K2io5Bw;3B5wCYhRoRbz5ifsx@;WR-LfMqkdHfa?";
        data.client_secret = "p!fY;iymLsP0IolSnkCAz6Tj;2:S?S6:od.q2ID7P.LaS87YBpWrmnUILE9u6gYwxvNuuX4dK8O=3L5cIHR5Xv.D=IXa3cmjl!S5aoNpskj.5puRWwAB7Rq97H@4o.@S";
        return this._super(url, data);
    }
});