self = module.exports;

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