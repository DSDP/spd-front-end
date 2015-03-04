var proxyPath = '/api/sparl';
var apiPath = '/api';

var bodyParser = require('body-parser');
var globSync   = require('glob').sync;
var routes     = globSync('./routes/**/*.js', { cwd: __dirname }).map(require);

var proxy = require('./lib/fullNodeProxy.js').createProxyServer( { target: 'http://10.105.5.55:8000/apirest' } );
var path = require('path');



module.exports = function(app) {
  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({
    extended: true
  }));


  app.use(apiPath, function (req, res, next) {
  	if (req.headers.authorization ) {
  		var token = req.headers.authorization.split(' ')[1];
  		if (token) {
            require('request').get({
               	uri: 'http://10.105.5.55:9000/o/validate_token/' + token,
               	headers:{'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Credential 5FbzJ9oU=9Db0y7s92SvuhSixxfU3Ajcwly2jNbb 3KJtUIRd7=SgzpdTA?aeC5r9a8GkoF7rwCWufg5BXYTb9Pwlx_ef6NXbo.A3Fwn.1ok_8L8gSe_WDGJq_ZKn.D5y9MLAr9.T1j.IjT=exFT6q.3ox42g2RAjHle-KrHv'},
			}, 
			function(err,response,body) {
				if (err) {
					res.send(403);		
				}
                var data = JSON.parse(body);
                if (data.is_valid) {
            		next();	
                } else {
            		res.send(403);    	
                }
            });
  		} else {
  			res.send(403);
  		}
  	} else {
      if (req.url == "/menuItems")
        next();
      else
   		  res.send(403);
  	}
  });

  app.use(proxyPath, function(req, res, next) {
    proxy.web(req, res);
  });

  routes.forEach(function(route) { route(app); });
};

