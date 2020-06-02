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
        const collection = client.db(dbname).collection("sensors");

        var dateFromISOString = '';
        var dateToISOString = '';

        if(request.query.dateFrom){
            dateFromISOString = new Date(request.query.dateFrom).toISOString();
            console.log("dateFromISOString", dateFromISOString);
        }

        if(request.query.dateTo){
            dateToISOString = new Date(request.query.dateTo).toISOString();
            console.log("dateToISOString", dateToISOString);
        }

        if(request.query.room){
            console.log("room", request.query.room);
        }

        if(request.query.type){
            console.log("sensor", request.query.sensor);
        }

        if(request.query.condition){
            console.log("condition", request.query.condition);
        }

        //in db month is first (mm/dd/yyyy)
        // 2020-01-17T00:00:00.000Z == 01/17/2020

        alertData = await collection.aggregate([
            {
                "$match": {
                    "$expr": {
                        "$and": [
                            {
                                "$gt": [
                                    {
                                        "$dateFromString": {
                                            "dateString": "$date"
                                        }
                                    },
									{
                                        "$dateFromString": {
                                            "dateString": dateFromISOString,
                                            "onError": "$date"
                                        }
                                    },
                                ]
                            },
                            {
                                "$lte": [
                                    {
                                        "$dateFromString": {
                                            "dateString": "$date"
                                        }
                                    },
									{
                                        "$dateFromString": {
                                            "dateString": dateToISOString,
                                            "onError": "$date"
                                        }
                                    },
                                ]
                            },
                            {
                                "$eq": [
                                    "$room",
                                    request.query.room
                                ]
                            },
                            {
                                "$eq": [
                                    "$type",
                                    request.query.type
                                ]
                            }
                        ]
                    }
                }
            }
        ]).toArray();

        //console.log("alertData_3: ", alertData);
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