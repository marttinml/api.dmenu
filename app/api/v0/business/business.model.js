var ObjectId = require('mongodb').ObjectID;
var autoIncrement = require("mongodb-autoincrement");
var hex = /[0-9A-Fa-f]{6}/g;
var collection = "business";
var sequenceBusiness = "business";

module.exports.create = function(db, data, callback) {
  //var valid = Util.validateModel(data, { required:['key'], number:['key'], string:['name','description'] });
  var valid = true;
  if(valid){
    autoIncrement.getNextSequence(db, sequenceBusiness, function (err, idBusiness) {
      db.collection(collection).insertOne( {
          idBusiness : idBusiness,
          name :        data.name,
          description : data.description,
          img : {
            logo :      data.img.logo,
            wallpaper : data.img.wallpaper
          },
          owner : data.own,
          address : {
                  description : data.address.description,
                  lat : data.address.lat,
                  lon : data.address.lon
          },
          menus :   [],
          orders :  [],
          date :    new Date()
      }, function(err, result){
          delete result.ops[0]._id;
          callback(err, result.ops[0], 200);
      } );
      });
  }else{
    callback(null, 'Invalid Model', 201);
  }
};

module.exports.retrieve = function(db, callback) {
   var result = [];
   var cursor = db.collection(collection).find({},{
      idBusiness: true,
      name : true,
      description : true,
      img : true,
      owner : true,
      address : true,
      menus: true,
      _id:false
   });
   cursor.each(function(err, doc) {
      if (doc != null) {
          result.push(doc);
      } else {
         callback(err,result,200);
      }
   });
};

module.exports.detail = function(db, idBusiness, callback) {
   var result = {}; 
   console.log(idBusiness);
   var cursor = db.collection(collection).findOne(
    { idBusiness : idBusiness },
    {
      idBusiness:   true,
      name :        true,
      description : true,
      img :         true,
      owner :       true,
      address :     true,
      menus:        true,
      _id:          false
    },function(err, result){
      callback(err,result,200);
    });
};

module.exports.update = function(db, idBusiness, data, callback) {
  module.exports.detail(db, id, function(err, result, status){
  db.collection(collection).updateOne(
        { idBusiness : idBusiness },
        {
          $set: {
                name :        data.name || result.name,
                description : data.description || result.description,
              address : {
                          description : data.address.description || result.address.description,
                          lat : data.address.lat || result.address.lat,
                          lon : data.address.lon || result.address.lon
                        },
                own : {
                        email :     data.own.email    || result.own.email,
                        name :      data.own.name     || result.own.name,
                        lastName :  data.own.lastName || result.own.lastName,
                        phone :     data.own.phone    || result.own.phone,
                        password :  data.own.password || result.own.password
                      }
          },
          $currentDate: { "lastModified": true }
        },function(err, results) {
          module.exports.detail(db, id, function(err,result,status){
            callback(err, result, 200);
          });
        }
    );
  });
};

module.exports.delete = function(db, idBusiness, callback) {
  module.exports.detail(db, idBusiness, function(err, result, status){
      db.collection(collection).deleteMany(
        { idBusiness : idBusiness },
        function(err, results) {
            callback(err, result, 200);
        }
    );
  });
   
};