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

    var alertData = null;

    try {
        var query = {};
        const collection = client.db(dbname).collection("sensors");

        if(request.query.dateFrom){
            console.log("dateFrom", request.query.dateFrom);
        }

        if(request.query.dateTo){
            console.log("dateTo", request.query.dateTo);
        }

        if(request.query.room){
            console.log("room", request.query.room);
        }

        if(request.query.sensor){
            console.log("sensor", request.query.sensor);
        }

        if(request.query.condition){
            console.log("condition", request.query.condition);
        }

        //alertData = await collection.find(query).toArray();

    } catch (err) {
        console.log(err);
        response.status(500).send({ error: "GET ALERT DATA FAILED" });
        return;
    } finally {
        client.close();
    }
    response.send(alertData);
});

module.exports = router;