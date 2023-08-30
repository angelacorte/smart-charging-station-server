const db = require("../models");
const bcrypt = require("bcrypt");
const User = db.user; //password already with salt
let SALT_WORK_FACTOR = 10;

/**
 * User registration
 * @param req
 * @param res
 */
exports.signup = function(req, res) {
    User.findOne({
        $or:[{
            email: req.body.email
        }]
    }).then(async u => {
        if(u.email !== undefined){
            res.send({status: 409, description: "email or email already in use"})
        }else{
            let user = new User(await setUserFields(req.body, false))
            user.save(function (err) {
                if (err) {
                    res.send({status: 400, message: "Bad request"})
                    return err;
                }else{
                    return res.send({status: 200, message: "user added"});
                }
            })
        }
    })
};

async function setUserFields(body, isTemp) {
    let password = body.password
    if(isTemp) password = await hashPassword(password)
    return {
        name: body.name,
        email: body.email,
        password: password,
    };
}

async function hashPassword (password) {
    let salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    return await bcrypt.hash(password, salt);
}
