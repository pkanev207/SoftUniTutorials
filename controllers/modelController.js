const router = require('express').Router();

const courseServices = require('../services/modelServices');
const { parseError } = require('../util/errorParser');

router.get('/create', (req, res) => {

    res.render('create', { title: 'Create Page' });
});

router.post('/create', (req, res) => {
    console.log(req.body);
    try {
        const { title, description, imageUrl, duration } = req.body;

        if (title == '' || description == '' || imageUrl == '' || duration == '') {
            throw new Error('All fields are required!');
        }

        // console.log(new Date().toLocaleString(undefined, {dateStyle: 'short'}));
        const createdAt = Date.now();

        const course = courseServices.create({ ...req.body, createdAt });
        console.log(course);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        const errors = parseError(err);

        res.render('create', {
            title: 'Create Again Page',
            errors,
            // data: { username: req.body.username },
            data: { ...req.body }
        });
    }
});



module.exports = router;
