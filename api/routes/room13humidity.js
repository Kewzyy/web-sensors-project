var express = require('express');
var router = express.Router();


router.get('', async(request, response) => {

    var MongoClient = require('mongodb').MongoClient;
    var url = process.env.MONGODB_URI;

MongoClient.connect(url, function(err, db) {
    
  if (err) throw err;
  var dbo = db.db("webapp");
  var query = { room: "13telpa",
                type: "humidity" };
  dbo.collection("sensors").find(query).toArray(function(err, result) {
    if (err) throw err;
    //console.log(result);
    response.json(result)
    db.close();
  });
});

});

module.exports = router;


 