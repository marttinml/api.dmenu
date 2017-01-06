var autoIncrement = require("mongodb-autoincrement");
var collection    = "business";
var sequenceMenu  = "business.product",
self              = module.exports;


self.ProductSchema = function(){
  this.idProduct;
  this.name;
  this.description;
  this.price;
  this.soldOut;
  return this;
};

var parseDataToProduct = function(data, product){
  var product         = product           || new self.ProductSchema();
  product.idProduct   = data.idProduct    || product.idProduct;
  product.name        = data.name         || product.name;
  product.description = data.description  || product.description;
  product.price       = data.price        || product.price;
  product.soldOut     = data.soldOut      || product.soldOut;
    return product;
};


self.create = function(db, idBusiness, data,callback) {

    var menu = parseDatatoMenu(data);
    autoIncrement.getNextSequence(db, sequenceMenu, function (err, idMenu) {
      menu.idMenu = idMenu;
      db.collection(collection).updateOne( 
        { idBusiness : idBusiness },
        {
          $addToSet: {
            menus: menu
          },
          $currentDate: { "lastModified": true }
        },function(err, results) {
          module.exports.detail(db, idBusiness, idMenu, function(err,result,status){
            callback(err, result, 201);
          });
        }
      );
      
    });
};

self.retrieve = function(db, idBusiness, callback) {
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

self.detail = function(db, idBusiness, idMenu, callback) {
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

self.update = function(db, idBusiness, idMenu, data, callback) {
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

self.delete = function(db, idBusiness, idMenu, callback) {
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