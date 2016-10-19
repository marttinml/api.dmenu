var ObjectId = require('mongodb').ObjectID;
var autoIncrement = require("mongodb-autoincrement");
var hex = /[0-9A-Fa-f]{6}/g;
var collection = "business";
var sequenceMenu = "business.menu.structure";

module.exports.create = function(db, idBusiness, idMenu, data,callback) {
  var valid = true;
  if(valid){

    autoIncrement.getNextSequence(db, sequenceMenu, function (err, idStructure) {
      db.collection(collection).updateOne( 
        { idBusiness : idBusiness,
          menus : { $elemMatch: { idMenu :idMenu } } 
        },
        {
          $addToSet: {
            "menus.$.structures": 
              {
                idStructure:  idStructure,
                name:         data.name,
                description:  data.description,
                price:        data.price,
                products:     []
              }
          },
          $currentDate: { "lastModified": true }
        },function(err, results) {
          module.exports.detail(db, idBusiness, idMenu, idStructure, function(err,result,status){
            callback(err, result, 200);
          });
        }
      );
      
    });

  }else{
    callback(null, 'Invalid Model', 201);
  }



};

module.exports.retrieve = function(db, idBusiness, idMenu, callback) {
   var result = [];
   console.log(idBusiness);
   var cursor = db.collection(collection).findOne(
      {
        idBusiness:idBusiness,
        menus : { $elemMatch: { idMenu :idMenu } }
      },
      { 
        "menus.structures.products" : 0
      },function(err, result) {
          result.menus = result.menus || [{}];
          result.menus.structures = result.menus[0].structures || [{}];
          callback(err, result.menus.structures, 200);
        }
    );
};

module.exports.detail = function(db, idBusiness, idMenu, idStructure, callback) {

db.collection(collection).aggregate([
      {
         "$match":{ "idBusiness" :idBusiness}
      },
      {
        "$unwind": "$menus"
      },
      {
         "$match": { "menus.idMenu": idMenu }
      },
      {
        "$unwind": "$menus.structures"
      },
      {
         "$match": { "menus.structures.idStructure": idStructure }
      }]
      ,function(err, result) {
        var r = {};
        var status = 204;
        result &&
        result[0] && 
        result[0].menus &&
        result[0].menus.structures &&
        (function(){
          r = result[0].menus.structures;
          status = 200;
        })();
          callback(err, result, 200);
    });
};

module.exports.update = function(db, idBusiness, idMenu, idStructure, data, callback) {
  module.exports.detail(db, idBusiness, idMenu, idStructure, function(err,result,status){
  db.collection(collection).updateOne(
        { idBusiness : idBusiness,
          menus : { $elemMatch: { idMenu :idMenu } },
          "menus.structures" : { $elemMatch: { idStructure :idStructure } }
        },
        {
          $set: {
            "menus.0.structures.$": {
                idStructure:  idStructure,
                products:     result.products,
                name:         data.name         || result.name,
                description:  data.description  || result.description,
                price:        data.price        || result.price
            }
          },
          $currentDate: { "lastModified": true }
        },function(err, results) {
            module.exports.detail(db, idBusiness, idMenu, idStructure, function(err,result,status){
                callback(err, result, 200);
            });
            
        }
    );
  });
};

module.exports.delete = function(db, idBusiness, idMenu, idStructure, callback) {

  module.exports.detail(db, idBusiness, idMenu, idStructure, function(err,result,status){
    db.collection(collection).updateOne(
          { idBusiness : idBusiness,
            menus : { $elemMatch: { idMenu :idMenu } },
            "menus.structures" : { $elemMatch: { idStructure :idStructure } }
          },
          {
            $pull: {
              "menus.$.structures.$": { idStructure: idStructure}
            }
          },function(err, results) {
                callback(err, result, 200);
          }
      );
  });
   
};