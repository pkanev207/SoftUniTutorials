const router = require('express').Router();


router.get('/', (req, res) => {
    console.log('From the homeController >>>');
    console.log(req.user);

    res.render('home', { title: 'Home Page' });
});



module.exports = router;
