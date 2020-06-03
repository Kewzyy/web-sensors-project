var express = require('express');
var router = express.Router();
var dburi = process.env.MONGODB_URI;
var dbname = "webapp"

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    return strTime;
}

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
        var thresholdQuery = null;

        if(request.query.dateFrom){
            dateFromISOString = new Date(request.query.dateFrom).toISOString();
            console.log("dateFromISOString", dateFromISOString);
            dateFromTimeString = formatAMPM(new Date(request.query.dateFrom));
            console.log("formatAMPM(date)", dateFromTimeString);
        }

        if(request.query.dateTo){
            dateToISOString = new Date(request.query.dateTo).toISOString();
            console.log("dateToISOString", dateToISOString);
            dateToTimeString = formatAMPM(new Date(request.query.dateTo));
            console.log("formatAMPM(date)", dateToTimeString);
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
            } else {
                thresholdQuery = {};
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