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

    var roomData = [];

    try {
        const collection = client.db(dbname).collection("sensors");

        var distinctRoomNames = await collection.distinct("room");

        /*
        for each distinct room do:
            get distinct sensor types for this room
        */
        await Promise.all(distinctRoomNames.map(async (roomName) => {
            var roomSensorTypes = await collection.distinct("type", { room: roomName });
            var roomObject = {
                room: roomName,
                types: roomSensorTypes
            };
            console.log("roomObject", roomObject);
            roomData.push(roomObject);
        }));

    } catch (err) {
        console.log(err);
        response.status(500).send({ error: "GET ROOMNAME DATA FAILED" });
        return;
    } finally {
        client.close();
    }
    response.send(roomData);
});

module.exports = router;