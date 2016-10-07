/*jslint node:true*/
var express         = require("express"),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    app             = express();

module.exports = function(){

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });

    var VERSIONS = {'Pre-Production': '/v0/'};
    app.get('/', function(req, res) {
        res.json(VERSIONS);
    });
    

    app.use(bodyParser.json());
    app.use(methodOverride());
    
    for (i in VERSIONS) {
        require('../api' + VERSIONS[i] + 'test/test.router')(app);
        require('../api' + VERSIONS[i] + 'business/business.router')(app);
        require('../api' + VERSIONS[i] + 'menu/menu.router')(app);
        require('../api' + VERSIONS[i] + 'structure/structure.router')(app);
    }

    return app;
};