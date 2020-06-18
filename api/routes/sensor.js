var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var assert = require('assert')
var User = require('./user_model.js');

router.get('', async(request, response) => {

// to JSON
const csvFilePath='poic.csv'
const csv=require('csvtojson')

csv().fromFile(csvFilePath).then((jsonObj)=>{
    console.log(jsonObj);
})

 // My function
const myfunction = async function(jsonArray) {
    return jsonArray=csv().fromFile(csvFilePath);
  }
  
  // Start function
  const start = async function() {

    const result = await myfunction()
    //response.json(result)
    //console.log(result);

    mongoose.connect(`${process.env.MONGODB_URI}webapp`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,}).then(() => console.log('DB Connected!'))
      .catch(err => {
      console.log("DB connection ERR");
      });

    User.collection.insertMany(result, function(err,r) {
        assert.equal(null, err);
         assert.equal(29249, r.insertedCount);
   
         mongoose.connection.close()
    })
  }
  
 start();
 response.json({ msg: "DATA INSERTED"});
});

router.post('/add', async(req,res) => {
  var MongoClient = require('mongodb').MongoClient;
  var url = process.env.MONGODB_URI;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("webapp");
  
  var date_created = new Date()
  var date_pretty = date_created.toLocaleDateString()
  var time_pretty = date_created.toLocaleTimeString()

  var sensorToInsert = {
      room: req.body.room,
      type: req.body.type,
      date: date_pretty,
      time: time_pretty,
      value: req.body.value
  };

  dbo.collection("sensors").insertOne(sensorToInsert, function(err,r) {
      if (err) throw err;
      //console.log(sensorToInsert);
      res.json(sensorToInsert)
      db.close();
    });

});
});

module.exports = router;
