var express = require('express');
var router = express.Router();
var dburi = process.env.MONGODB_URI;
var dbname = "webapp"

router.get('', async(request, response) => {

    const MongoClient = require('mongodb').MongoClient;
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    var client = await MongoClient.connect(dburi, options).catch(err => {console.log(err);});

    if(!client){
        response.status(500).send({ error: "DB CONNECTION FAILED" });
        return;
    }

    var rooms = null;

    try {
        const collection = client.db(dbname).collection("sensors");
        rooms = await collection.distinct("room");
    } catch (err) {
        console.log(err);
        response.status(500).send({ error: "GET ROOMNAME DATA FAILED" });
        return;
    } finally {
        client.close();
    }
    response.send(rooms);
});

module.exports = router;