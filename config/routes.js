const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');


module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);

    // app.use('/auth', authController);
    // app.use('/model', modelController);
    // app.use('/profile', profileController);
};