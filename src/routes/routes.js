const loginController = require('../controller/login')
const signupController = require('../controller/signup')

module.exports = function (app){

    app.route('/auth/login')
        .post(loginController.login);

    app.route('/auth/signup')
        .post(signupController.signup);

}