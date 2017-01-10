var ProductModel 	= require('./product.model'),
    assert      = require('assert'),
    Connection  = require('../../config/mongodb'),
    Log         = require('../../shared/log'),
    merge       = require('merge'),
    controller  = 'product',
    self        = module.exports;

self.create = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    Log.logStart({controller : controller, method:controller+'.create', d : d, body:req.body });
	Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
        var businessId = Number(req.params.businessId);
        ProductModel.create(db, businessId, req.body, function(err, result, status) {
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
        var businessId = Number(req.params.businessId);
      ProductModel.retrieve(db, businessId, function(err, result, status) {
          db.close();
          Log.logEnd({ start : start , response: result});
          res.status(status).jsonp(result);
      });
    });
};

self.detail = function (req, res) {
    var d   = new Date();
        start   = d.getMilliseconds();
        Log.logStart({controller : controller, method:controller+'.detail', d : d, body: req.params.id});
    Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
        var businessId = Number(req.params.businessId);
        var productId = Number(req.params.productId);
      ProductModel.detail(db, businessId, productId, function(err, result, status) {
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
          var productId = Number(req.params.productId);

            ProductModel.update(db, businessId, productId, req.body,function(err, result, status) {
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
    Log.logStart({controller : controller, method:controller+'.delete', d : d });
  Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query

          var businessId = Number(req.params.businessId);
          var productId = Number(req.params.productId);

          ProductModel.delete(db, businessId, productId, function(err, result, status) {
              assert.equal(err, null);
              db.close();
              Log.logEnd({ start : start , response: result});
              //response
              res.status(status).jsonp(result);
          });
    });
};

