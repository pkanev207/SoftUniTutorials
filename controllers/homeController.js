const router = require('express').Router();

const { getAll } = require('../services/modelServices');

router.get('/', async (req, res) => {
    console.log('From the homeController >>>');
    // console.log(req.user);
    const tutorials = await getAll();
    // console.log(tutorials);
    let courses;

    if (req.user) {
        courses = tutorials.sort((a, b) => Number(a.createdAt) - Number(b.createdAt));

        for (const course of courses) {
            let timestamp = Number(course.createdAt);
            let date1 = new Date(timestamp).toDateString().slice(0, -5);
            let date2 = new Date(timestamp).toTimeString().slice(0, 8);

            course.toShow = date1 + ' ' + date2;
        }
    } else {
        courses = tutorials
            .sort((a, b) => b.participants.length - a.participants.length)
            .slice(0, 3);

        for (const course of courses) {
            course.toShow = course.participants.length;
        }
    }

    res.render('home', { title: 'Home Page', courses });
});



module.exports = router;
