var ObjectId = require('mongodb').ObjectID;
var autoIncrement = require("mongodb-autoincrement");
var hex = /[0-9A-Fa-f]{6}/g;
var collection = "business";
var sequenceMenu = "business.menu";

module.exports.create = function(db, idBusiness, data,callback) {
  var valid = true;
  if(valid){

    autoIncrement.getNextSequence(db, sequenceMenu, function (err, idMenu) {
      db.collection(collection).updateOne( 
        { idBusiness : idBusiness },
        {
          $addToSet: {
            menus: 
              {
                idMenu:       idMenu,
                name:         data.name,
                description:  data.description,
                structures:     []  
              }
          },
          $currentDate: { "lastModified": true }
        },function(err, results) {
          module.exports.detail(db, idBusiness, idMenu, function(err,result,status){
            callback(err, result, 201);
          });
        }
      );
      
    });

  }else{
    callback(null, 'Invalid Model', 205);
  }



};

module.exports.retrieve = function(db, idBusiness, callback) {
  idBusiness = (hex.test(idBusiness))? ObjectId(idBusiness) : idBusiness;
   var result = [];
   console.log(idBusiness);
   var cursor = db.collection(collection).findOne(
      {
        idBusiness:idBusiness
      },
      { 
        "menus.structures" : 0
      },function(err, result) {
          var status = 204;
          var r = [];
          result &&
          result.menus && 
          (function(){
            r = result.menus;
            status = 200;
          })(); 
          callback(err, r, status);
        }
    );
};

module.exports.detail = function(db, idBusiness, idMenu, callback) {
   idBusiness = (hex.test(idBusiness))? ObjectId(idBusiness) : idBusiness;
   db.collection(collection).findOne(
      {
        idBusiness:idBusiness
      },
      {
        menus : { $elemMatch: { idMenu :idMenu } }
      }
      ,function(err, result) {
        var r = {};
        var status = 204;
          result && 
          result.menus && 
          result.menus[0] && 
          (function(){
            r = result.menus[0];
            status = 200;
          })();
          callback(err, r,status);
        }
    );
};

module.exports.update = function(db, idBusiness, idMenu, data, callback) {
  idBusiness = (hex.test(idBusiness))? ObjectId(idBusiness) : idBusiness;
  module.exports.detail(db, idBusiness, idMenu, function(err,result,status){
  db.collection(collection).updateOne(
        { idBusiness : idBusiness,
          menus : { $elemMatch: { idMenu :idMenu } },
        },
        {
          $set: {
            "menus.$": {
                idMenu:       idMenu,
                structures:   result.products,
                name:         data.name         || result.name,
                description:  data.description  || result.description
            }
          },
          $currentDate: { "lastModified": true }
        },function(err, results) {
          console.log(results);
            module.exports.detail(db, idBusiness, idMenu, function(err,result,status){
              callback(err, result, 200);
            });
        }
    );
  });
};

module.exports.delete = function(db, idBusiness, idMenu, callback) {
  idBusiness = (hex.test(idBusiness))? ObjectId(idBusiness) : idBusiness;
  module.exports.detail(db, idBusiness, idMenu, function(err,result,status){
    db.collection(collection).updateOne(
          { idBusiness : idBusiness,
            menus : { $elemMatch: { idMenu :idMenu } },
          },
          {
            $pull: {
              menus: { idMenu: idMenu}
            }
          },function(err, results) {
                callback(err, result, 200);
          }
      );
  });
   
};