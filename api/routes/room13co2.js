var express = require('express');
var router = express.Router();


router.get('', async(request, response) => {

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://192.168.99.100:27017/webapp";

MongoClient.connect(url, function(err, db) {
    
  if (err) throw err;
  var dbo = db.db("webapp");
  var query = { room: "13 telpa",
                type: "co2" };
  dbo.collection("sensors").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    response.json(result)
    db.close();
  });
});

});

module.exports = router;


 