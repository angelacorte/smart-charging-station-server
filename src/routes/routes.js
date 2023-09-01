const loginController = require('../controller/login')
const signupController = require('../controller/signup')
const preferencesController = require('../controller/preferences')

module.exports = function (app){

    app.route('/auth/login')
        .post(loginController.login);

    app.route('/auth/signup')
        .post(signupController.signup);

    app.route('/addFavourite')
        .post(preferencesController.addFavourite)

    app.route('/removeFavourite')
        .post(preferencesController.removeFavourite)
}