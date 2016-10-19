var StructureModel 	= require('./structure.model'),
    assert      = require('assert'),
    Connection  = require('../../../config/mongodb'),
    Log         = require('../../../shared/log'),
    merge       = require('merge'),
    controller  = 'structure';

module.exports.create = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    Log.logStart({controller : controller, method:controller+'.create', d : d, body:req.body });
	Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
        var idBusiness = Number(req.params.idBusiness);
        var idMenu = Number(req.params.idMenu);
        StructureModel.create(db, idBusiness, idMenu, req.body, function(err, result, status) {
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
        var idMenu = Number(req.params.idMenu);
      StructureModel.retrieve(db, idBusiness, idMenu, function(err, result, status) {
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
        var idStructure = Number(req.params.idStructure);
      StructureModel.detail(db, idBusiness, idMenu, idStructure, function(err, result, status) {
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

          var idBusiness  = Number(req.params.idBusiness);
          var idMenu      = Number(req.params.idMenu);
          var idStructure = Number(req.params.idStructure);
            StructureModel.update(db, idBusiness, idMenu, idStructure, req.body,function(err, result, status) {
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
          var idStructure = Number(req.params.idStructure);
          StructureModel.delete(db, idBusiness, idMenu, idStructure, function(err, result, status) {
              assert.equal(err, null);
              db.close();
              Log.logEnd({ start : start , response: result});
              //response
              res.status(status).jsonp(result);
          });
    });
};

