const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const courseController = require('../controllers/modelController');


module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/course', courseController);

    // app.use('/model', modelController);
    // app.use('/profile', profileController);
};
