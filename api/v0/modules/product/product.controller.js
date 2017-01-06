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
        var idBusiness = Number(req.params.idBusiness);
        ProductModel.create(db, idBusiness, req.body, function(err, result, status) {
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
        var idBusiness = Number(req.params.idBusiness);
      ProductModel.retrieve(db, idBusiness, function(err, result, status) {
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
        var idBusiness = Number(req.params.idBusiness);
        var idProduct = Number(req.params.idProduct);
      ProductModel.detail(db, idBusiness, idProduct, function(err, result, status) {
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

          var idBusiness = Number(req.params.idBusiness);
          var idProduct = Number(req.params.idProduct);

            ProductModel.update(db, idBusiness, idProduct, req.body,function(err, result, status) {
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

          var idBusiness = Number(req.params.idBusiness);
          var idProduct = Number(req.params.idProduct);

          ProductModel.delete(db, idBusiness, idProduct, function(err, result, status) {
              assert.equal(err, null);
              db.close();
              Log.logEnd({ start : start , response: result});
              //response
              res.status(status).jsonp(result);
          });
    });
};

