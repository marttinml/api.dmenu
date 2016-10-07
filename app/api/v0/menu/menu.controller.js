var MenuModel 	= require('./menu.model'),
    assert      = require('assert'),
    Connection  = require('../../../config/mongodb'),
    Log         = require('../../../shared/log'),
    merge       = require('merge'),
    controller  = 'menu';

module.exports.create = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    Log.logStart({controller : controller, method:controller+'.create', d : d, body:req.body });
	Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
        var idBusiness = Number(req.params.idBusiness);
        MenuModel.create(db, idBusiness, req.body, function(err, result, status) {
            assert.equal(err, null);
            db.close();
            Log.logEnd({ start : start , response: result});
            //response
            res.status(status).jsonp(result);
        });
    });
};

module.exports.retrieve = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    Log.logStart({controller : controller, method:controller+'.retrieve', d : d });
    Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
        var idBusiness = Number(req.params.idBusiness);
      MenuModel.retrieve(db, idBusiness, function(err, result, status) {
          db.close();
          Log.logEnd({ start : start , response: result});
          res.status(status).jsonp(result);
      });
    });
};

module.exports.detail = function (req, res) {
    var d   = new Date();
        start   = d.getMilliseconds();
        Log.logStart({controller : controller, method:controller+'.detail', d : d, body: req.params.id});
    Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
        var idBusiness = Number(req.params.idBusiness);
        var idMenu = Number(req.params.idMenu);
      MenuModel.detail(db, idBusiness, idMenu, function(err, result, status) {
          db.close();
          Log.logEnd({ start : start , response: result});
          res.status(status).jsonp(result);
      });
    });
};

module.exports.update = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    Log.logStart({controller : controller, method:controller+'.update', d : d, body:req.body });
    Connection.ejecute(function(err, db){
          assert.equal(null, err);
          //ejecute query

          var idBusiness = Number(req.params.idBusiness);
          var idMenu = Number(req.params.idMenu);

            MenuModel.update(db, idBusiness, idMenu, req.body,function(err, result, status) {
                assert.equal(err, null);
                db.close();
                Log.logEnd({ start : start , response: result});
                //response
                res.status(status).jsonp(result);
            });
      });
};


module.exports.delete = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    Log.logStart({controller : controller, method:controller+'.delete', d : d });
  Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query

          var idBusiness = Number(req.params.idBusiness);
          var idMenu = Number(req.params.idMenu);

          MenuModel.delete(db, idBusiness, idMenu, function(err, result, status) {
              assert.equal(err, null);
              db.close();
              Log.logEnd({ start : start , response: result});
              //response
              res.status(status).jsonp(result);
          });
    });
};

