"use strict";
exports.__esModule = true;
//import modules
var express = require("express");
var mongodb = require("mongodb");
var cors = require("cors");
var bodyparser = require("body-parser");
// create the rest object
var app = express();
//where "app" object, used to develop the rest services, GET,POST, PUT, DELETE...
//enable the cors policy 
app.use(cors());
//set the json as MIME Type
app.use(bodyparser.json());
//parse the json
app.use(bodyparser.urlencoded({ extended: false }));
//create the refrence variable
var mernClient = mongodb.MongoClient;
//create the get request 
app.get("/api/products", function (req, res) {
    mernClient.connect("mongodb+srv://admin:admin@miniprojectdb.nzphu.mongodb.net/mern?retryWrites=true&w=majority", function (err, conn) {
        if (err)
            throw err;
        else {
            var db = conn.db("mern");
            db.collection("products").find().toArray(function (err, array) {
                if (err)
                    throw err;
                else {
                    res.send(array);
                }
            });
        }
    });
});
var ObjectId = mongodb.ObjectId;
//get the product based on id
app.get("/api/products/:id", function (req, res) {
    try {
        mernClient.connect("mongodb+srv://admin:admin@miniprojectdb.nzphu.mongodb.net/mern?retryWrites=true&w=majority", function (err, conn) {
            var db = conn.db("mern");
            db.collection("products").find({ "_id": new ObjectId(req.params.id) }).toArray(function (err, array) {
                if (array.length > 0) {
                    res.send(array[0]);
                }
                else {
                    res.send({ message: "product not available" });
                }
            });
        });
    }
    catch (error) {
        res.send({ message: "invalid product id" });
    }
});
//port
var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log("server started successfully");
});
