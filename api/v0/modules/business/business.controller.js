var BusinessModel 	= require('./business.model'),
    assert      = require('assert'),
    Connection  = require('../../config/mongodb'),
    Log         = require('../../shared/log'),
    merge       = require('merge'),
    controller  = 'business',
    self        = module.exports;

self.create = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    Log.logStart({controller : controller, method:controller+'.create', d : d, body:req.body });
	Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
        BusinessModel.create(db, req.body, function(err, result, status) {
            assert.equal(err, null);
            db.close();
            Log.logEnd({ start : start , response: result});
            //response
            res.status(status).jsonp(result);
        });
    });
};

self.retrieve = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    Log.logStart({controller : controller, method:controller+'.retrieve', d : d });
    Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
      BusinessModel.retrieve(db, function(err, result, status) {
          db.close();
          Log.logEnd({ start : start , response: result});
          res.status(status).jsonp(result);
      });
    });
};

self.detail = function (req, res) {
    var d   = new Date();
        start   = d.getMilliseconds();
        Log.logStart({controller : controller, method:controller+'.detail', d : d, body: req.params.businessId});
    Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
         var businessId = Number(req.params.businessId);
      BusinessModel.detail(db, businessId, function(err,result,status) {
          db.close();
          Log.logEnd({ start : start , response: result});
          res.status(status).jsonp(result);
      });
    });
};

self.update = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    Log.logStart({controller : controller, method:controller+'.update', d : d, body:req.body });
  Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
          var businessId = Number(req.params.businessId);
          BusinessModel.update(db, businessId, req.body, function(err, result, status) {
              assert.equal(err, null);
              db.close();
              Log.logEnd({ start : start , response: result});
              //response
              res.status(status).jsonp(result);
          });
    });
};


self.delete = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    Log.logStart({controller : controller, method:controller+'.delete', d : d , body:req.params.businessId});
  Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
        var businessId = Number(req.params.businessId);
          BusinessModel.delete(db, businessId, function(err, result, status) {
              assert.equal(err, null);
              db.close();
              Log.logEnd({ start : start , response: result});
              //response
              res.status(status).jsonp(result);
          });
    });
};

