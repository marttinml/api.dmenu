var autoIncrement     = require("mongodb-autoincrement"),
    collection        = "business",
    sequenceBusiness  = "business";

var self = module.exports;

// Schema
self.BussinessSchema = function(data){
  this.idBusiness;
  this.name;
  this.description;
  this.img;
  this.owner;
  this.address;
  this.products;
  this.menus;
  this.orders;
};

// parse
self.parseDataToBusiness = function(data, business){
  business = business || new self.BussinessSchema();
  business.idBusiness     = business.idBusiness || business.idBusiness;
  business.name           = data.name           || business.name;
  business.description    = data.description    || business.description;
  business.owner          = data.owner          || business.owner;
  business.img            = data.img            || business.img           || {};
  business.img.logo       = data.img.logo       || business.img.logo;
  business.img.wallpaper  = data.img.wallpaper  || business.img.wallpaper;
  business.address        = data.address        || business.address       || {};
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

// response
self.response = function(){
  this.success;
  this.error = {};
  this.error.code;
  this.error.message;
  this.error.dbMessage;
  this.data;
  this.successful = function(data){
    this.success    = true;
    this.data       = data || {};
    delete this.error;
  }
  this.failed = function(dbMessage, code, message){
    this.success          = false;
    this.error.dbMessage  = dbMessage || {};
    this.error.code       = code      || "202";
    this.error.message    = message   || "Not fount";
    
  }
  return this;
};

// C
self.create = function(db, data, callback) {
    var business = self.parseDataToBusiness(data);
    autoIncrement.getNextSequence(db, sequenceBusiness, function (err, idBusiness) {
    business.idBusiness = idBusiness;
    var handler = function(err, results){
      self.detail(db, idBusiness, function(err,result,status){
        var response = new self.response(result);
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
      status = result ? status : 202;
      callback(err,result,status);
    }
  });
};
// U
self.update = function(db, idBusiness, data, callback) {
  self.detail(db, idBusiness, function(err, business, status){
    business = self.parseDataToBusiness(data, business);
    var handler = function(err, results) {
        self.detail(db, idBusiness, function(err,result,status){
          var response = new self.response();
          results.result.n ? response.successful(result) : response.failed(results.result);
          callback(err, response, status);
        });
      };
    db.collection(collection).updateOne( { idBusiness : idBusiness }, business, handler);
  });
};
// D
self.detail = function(db, idBusiness, callback) {
   var result = {};
   var status = 200;
   var cursor = db.collection(collection).findOne(
    { idBusiness : idBusiness },
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
self.delete = function(db, idBusiness, callback) {
  self.detail(db, idBusiness, function(err, result, status){
    var handler = function(err, results) {
            var response = new self.response();
            results.result.n ? response.successful(result) : response.failed(results.result);
            callback(err, response, status);
        };
      db.collection(collection).deleteMany( { idBusiness : idBusiness }, handler);
    });
};