var autoIncrement = require("mongodb-autoincrement"),
  Response        = require("../../shared/response").response,
  collection      = "business"
  sequenceProduct = "business.product",
  self            = module.exports;

// Schema
self.ProductSchema = function(){
  this.productId;
  this.name;
  this.description;
  this.price;
  this.soldOut;
  return this;
};

// parse
var parseDataToProduct = function(data, product){
  product = product || new self.ProductSchema();
  product.productId   = data.productId    || product.productId;
  product.name        = data.name         || product.name;
  product.description = data.description  || product.description;
  product.price       = data.price        || product.price;
  product.soldOut     = data.soldOut      || product.soldOut || false;
    return product;
};

// C
self.create = function(db, businessId, data,callback) {
    var product = parseDataToProduct(data),
      handler;
    autoIncrement.getNextSequence(db, sequenceProduct, function (err, productId) {
      product.productId = productId;
      handler = function(err, results) {
        module.exports.detail(db, businessId, productId, function(err,result,status){
          var response = new Response(result);
          results.result.n ? response.successful(result) : response.failed(results.result);
          callback(err, response, status);
        });
      };
      db.collection(collection).updateOne({ businessId : businessId },{ $addToSet: {products: product},$currentDate: { "lastModified": true }},handler);
    });
};
// R
self.retrieve = function(db, businessId, callback) {
   var result = [],
      status = 200;
   var cursor = db.collection(collection).findOne(
      {
        businessId:businessId
      },
      function(err, result) {
          result = result || { products: [] };
          result.products = result.products || [];
          !result.products.length && (function(){
            status = 202;
          })();
          callback(err, result.products, status);
        }
    );
};

// U
self.update = function(db, businessId, productId, data, callback) {
  var handler,response;
  self.detail(db, businessId, productId, function(err,product,status){
  product = parseDataToProduct(data,product);
  handler = function(err, results) {
      module.exports.detail(db, businessId, productId, function(err,result,status){
        response = new Response();
        results.result.n ? response.successful(result) : response.failed(results.result);
        callback(err, response, status);
      });
  };
  db.collection(collection).updateOne({ businessId : businessId, products : { $elemMatch: { productId :productId } } },{ $set: { "products.$": product }, $currentDate: { "lastModified": true } }, handler);
  });
};
// D
self.detail = function(db, businessId, productId, callback) {
  var result = {},
      status = 200,
      handler;
  handler = function(err, result) {
      result = result || { products: [{}] };
      result.products = result.products || [{}];
      !result.products[0] && (function(){
        status = 202;
      })();
      callback(err, result.products[0],status);
  };
  db.collection(collection).findOne({ businessId:businessId },{ products: { $elemMatch: { productId : productId } } },handler);
};
// D
self.delete = function(db, businessId, productId, callback) {
  var handler, response;
  self.detail(db, businessId, productId, function(err,result,status){
    handler = function(err, results) {
      response = new Response();
      results.result.n ? response.successful(result) : response.failed(results.result);
      callback(err, response, status);
    };
    db.collection(collection).updateOne({ businessId: businessId, products: { $elemMatch: { productId: productId } },},{ $pull: { products: { productId: productId } } },handler);
  });
   
};