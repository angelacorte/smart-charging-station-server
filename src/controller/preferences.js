const db = require("../models");
let ObjectId = require('mongodb').ObjectID;
let User = db.user;

exports.addFavourite = function (req,res) {
    User.updateOne({_id:new ObjectId(req.body.userId)},{$push:{chargingStations: req.body.chargingStationId}}).then(result=>{
        if(result.modifiedCount > 0 ){
            return res.send({status: 200})
        }else{
            return res.send({status: 400, message: "Bad request"});
        }
    }).catch(err=> {
        return res.send({status: 500, message: "an error occurred", error: err});
    });
}


exports.removeFavourite = function (req,res) {
    User.updateOne({_id:new ObjectId(req.body.userId)},{$pull:{chargingStations: req.body.chargingStationId}}).then(result=>{
        if(result.modifiedCount > 0 ){
            return res.send({status: 200})
        }else{
            return res.send({status: 400, message: "Bad request"});
        }
    }).catch(err=> {
        return res.send({status: 500, message: "an error occurred", error: err});
    });
}

