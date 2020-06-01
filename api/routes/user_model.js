var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var Schema = mongoose.Schema
var clubSchema = new Schema({
    name: {
        type: String,
        validate: {
          validator: function(v, cb) {
            User.find({name: 'sensors'}, function(err,docs){
               cb(docs.length == 0);
            });
          },
          message: 'User already exists!'
        }
      }
})

module.exports = mongoose.model('sensors', clubSchema);   