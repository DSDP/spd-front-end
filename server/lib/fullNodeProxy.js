// Constructor
var fullNodeProxy = function() {
    
    this.target = null;

}

fullNodeProxy.prototype.createProxyServer = function(options) {

	if(options.target) this.target = options.target;

    function clone(obj){
        if(obj == null || typeof(obj) != 'object')
            return obj;

        var temp = new obj.constructor(); 
        for(var key in obj)
            temp[key] = clone(obj[key]);

        return temp;
    }
    
    return clone(this);

}

fullNodeProxy.prototype.web = function(req, res) {

	if(this.target) {
        var headers = {'content-type': 'application/x-www-form-urlencoded', 'Authorization': req.headers.authorization};

        if(req.method=='GET'){
            require('request').get({
                uri:this.target+req.url,
                headers:headers,
                },function(err,response,body){
            }).pipe(res);
            
        } else {
            if (req.method=='POST') {
                require('request').post({
                    uri:this.target+req.url,
                    headers:{'content-type': 'application/x-www-form-urlencoded'},
                    form:req.body
                    },function(err,response,body){
                }).pipe(res);
            } else {
                if (req.method =="PUT") {
                    require('request').put({
                        uri:this.target+req.url,
                        headers:{'content-type': 'application/x-www-form-urlencoded'},
                        form:req.body
                        },function(err,response,body){
                    }).pipe(res);                    
                } else {
                    if (req.method =="DELETE") {
                        require('request').del({
                            uri:this.target+req.url,
                            headers:{'content-type': 'application/x-www-form-urlencoded'},
                            form:req.body
                            },function(err,response,body){
                        }).pipe(res);                    
                    }                    
                }
            }
        }
    }
}

module.exports = new fullNodeProxy();