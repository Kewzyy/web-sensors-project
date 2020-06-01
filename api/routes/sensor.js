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
    response.json(result)
    console.log(result);

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
//  response.send('POST request to the homepage')

});

module.exports = router;
