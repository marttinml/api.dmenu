var ObjectId = require('mongodb').ObjectID;
var hex = /[0-9A-Fa-f]{6}/g;

module.exports.create = function(db, data, callback) {
  //var valid = Util.validateModel(data, { required:['key'], number:['key'], string:['name','description'] });
  var valid = true;
  if(valid){
      db.collection('test').insertOne( {
          title            : data.title,
          description     : data.description,
          date            : new Date(),
      }, function(err, result){
          result.ops[0].id = result.ops[0]._id;
          delete result.ops[0]._id;
          delete result.ops[0].date;
          callback(err, result.ops[0], 200);
      } );
  }else{
    callback(null, 'Invalid Model', 201);
  }
};

module.exports.retrieve = function(db, callback) {
   var result = [];
   var cursor = db.collection('test').find({});
   cursor.each(function(err, doc) {
      if (doc != null) {
          doc.id = doc._id;
          delete doc._id;
          delete doc.date;
          result.push(doc);
      } else {
         callback(result);
      }
   });
};

module.exports.detail = function(db, id, callback) {
   var result = {}; 
   id = (hex.test(id))? ObjectId(id) : id;
   var cursor = db.collection('test').find({ _id : id });
   cursor.each(function(err, doc) {
      if (doc != null) {
          doc.id = doc._id;
          delete doc._id;
          delete doc.date;
          result = doc;
      } else {
         callback(result);
      }
   });
};

module.exports.update = function(db, id, data, callback) {
  id = (hex.test(id))? ObjectId(id) : id;
  db.collection('test').updateOne(
        { _id : id },
        {
          $set: {
            title:data.title,
            description:data.description
          },
          $currentDate: { "lastModified": true }
        },function(err, results) {
            callback(err, data, 200);
        }
    );
};

module.exports.replace = function(db, id, data, callback) {
   db.collection('test').replaceOne(
        { _id : ObjectId(id) },
        data
        ,function(err, results) {
            data.id = id;
            callback(err, data, 200);
        }
    );
};

module.exports.delete = function(db, id, callback) {
  id = (hex.test(id))? ObjectId(id) : id;
  module.exports.detail(db, id, function(result){
      db.collection('test').deleteMany(
        { _id : id },
        function(err, results) {
            callback(err, result, 200);
        }
    );
  });
   
};