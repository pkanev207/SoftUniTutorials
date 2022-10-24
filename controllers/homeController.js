const router = require('express').Router();

const { isUser } = require('../middleware/guards');

router.get('/', (req, res) => {
    console.log('From the homeController >>>');
    console.log(req.user);

    res.render('home', { title: 'Home Page' });
});


router.get('/profile', isUser(), (req, res) => {
    res.render('profile', { title: 'Profile Page' });
});

module.exports = router;
