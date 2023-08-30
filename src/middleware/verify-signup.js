const db = require('../models');
const User = db.user;

checkDuplicateEmail = (req, res, next) => {

    //with email
    User.findOne({
        email:req.body.email
    }).exec((err,user) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }

        if(user){
            res.status(400).send({message: "Failed: email is already in use"});
            return;
        }

        next();
    })
}

const verifySignup = {
    checkDuplicateEmail: checkDuplicateEmail
};

module.exports = verifySignup;
