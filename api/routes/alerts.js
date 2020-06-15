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
        var dateFromTimeString = '';
        var dateToISOString = '';
        var dateToTimeString = '';

        var thresholdCondition = '';
        var conditionValue = '';
        var thresholdQuery = {};

        if(request.query.dateFrom){
            dateFromISOString = request.query.dateFrom.replace(/["']/g, "");
            dateFromISOString = new Date(dateFromISOString).toISOString();
            console.log("dateFromISOString", dateFromISOString);
        }

        if(request.query.dateTo){
            dateToISOString = request.query.dateTo.replace(/["']/g, "");
            dateToISOString = new Date(dateToISOString).toISOString();
            console.log("dateToISOString", dateToISOString);
        }

        if(request.query.room){
            console.log("room", request.query.room);
        }

        if(request.query.type){
            console.log("type", request.query.type);
        }

        if(request.query.condition){
            var thresholdCondition = request.query.condition.split("-")[0];
            var conditionValue = request.query.condition.split("-")[1];
            console.log("thresholdCondition", thresholdCondition);
            console.log("conditionValue", conditionValue);

            if(thresholdCondition === "eq"){
                var thresholdQuery =  { "$eq": [ "$value", conditionValue ] };
            } else if (thresholdCondition === "lt"){
                var thresholdQuery =  { "$lt": [ "$value", conditionValue ] };
            } else if (thresholdCondition === "gt"){
                var thresholdQuery =  { "$gt": [ "$value", conditionValue ] };
            }
        }

        //INFO: in db month is first (mm/dd/yyyy)
        // 2020-01-17T00:00:00.000Z == 01/17/2020

        //INFO: Time in db is in format: 10:45:29 AM

        alertData = await collection.aggregate([
            {
                "$match": {
                    "$expr": {
                        "$and": [
                            {
                                "$gte": [
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
                                "$lt": [
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
                            },
                            thresholdQuery
                        ]
                    }
                }
            }
        ]).toArray();
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