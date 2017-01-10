var autoIncrement     = require("mongodb-autoincrement"),
    Response           = require("../../shared/response").response,
    collection        = "business",
    sequenceBusiness  = "business.business",
    self              = module.exports;

// Schema
self.BussinessSchema = function(data){
  this.businessId;
  this.name;
  this.description;
  this.img;
  this.owner;
  this.address;
  this.status;
  this.products;
  this.menus;
  this.orders;
};

// parse
self.parseDataToBusiness = function(data, business){
  business = business || new self.BussinessSchema();
  business.businessId     = business.businessId || business.businessId;
  business.name           = data.name           || business.name;
  business.description    = data.description    || business.description;
  business.owner          = data.owner          || business.owner;
  business.img            = data.img            || business.img           || {};
  business.img.logo       = data.img.logo       || business.img.logo;
  business.img.wallpaper  = data.img.wallpaper  || business.img.wallpaper;
  business.address        = data.address        || business.address       || {};
  business.status         = data.status         || business.status        || false;
  business.address.desc   = data.address.desc   || business.address.desc;
  business.address.lat    = data.address.lat    || business.address.lat;
  business.address.lon    = data.address.lon    || business.address.lon;
  business.products       = data.products       || business.products      || [];
  business.menus          = data.menus          || business.menus         || [];
  business.orders         = data.orders         || business.orders        || [];
  business.date           = data.date           || business.date          || new Date();
  business.lastModified   = new Date();
  return business;
};

// C
self.create = function(db, data, callback) {
    var business = self.parseDataToBusiness(data);
    autoIncrement.getNextSequence(db, sequenceBusiness, function (err, businessId) {
    business.businessId = businessId;
    var handler = function(err, results){
      self.detail(db, businessId, function(err,result,status){
        var response = new Response(result);
        results.result.n ? response.successful(result) : response.failed(results.result);
          callback(err, response, status);
        });
    };
    db.collection(collection).insertOne(business, handler);
  });
};
// R
self.retrieve = function(db, callback) {
  var result = [];
  var status = 200;
  var cursor = db.collection(collection).find({},{ _id: false });
  cursor.each(function(err, doc) {
    if (doc != null) {
        result.push(doc);
    } else {
      !result.length && (function(){
        status = 202;
        result = [];
      })();
      callback(err,result,status);
    }
  });
};
// U
self.update = function(db, businessId, data, callback) {
  self.detail(db, businessId, function(err, business, status){
    business = self.parseDataToBusiness(data, business);
    var handler = function(err, results) {
        self.detail(db, businessId, function(err,result,status){
          var response = new Response();
          results.result.n ? response.successful(result) : response.failed(results.result);
          callback(err, response, status);
        });
      };
    db.collection(collection).updateOne( { businessId : businessId }, business, handler);
  });
};
// D
self.detail = function(db, businessId, callback) {
   var result = {};
   var status = 200;
   var cursor = db.collection(collection).findOne(
    { businessId : businessId },
    {
      _id:          false
    },function(err, result){
      !result && (function(){
        status = 202;
        result = {};
      })();
      callback(err,result,status);
    });
};
// D
self.delete = function(db, businessId, callback) {
  self.detail(db, businessId, function(err, result, status){
    var handler = function(err, results) {
            var response = new Response();
            results.result.n ? response.successful(result) : response.failed(results.result);
            callback(err, response, status);
        };
      db.collection(collection).deleteMany( { businessId : businessId }, handler);
    });
};