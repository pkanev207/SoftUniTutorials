const router = require('express').Router();

const courseServices = require('../services/modelServices');
const { parseError } = require('../util/errorParser');
const { isUser } = require('../middleware/guards');

router.get('/create', isUser(), (req, res) => {

    res.render('create', { title: 'Create Page' });
});

router.post('/create', isUser(), (req, res) => {
    // console.log('From model controller >>>');
    // console.log(req.user);
    // console.log(req.body);
    try {
        const { title, description, imageUrl, duration } = req.body;

        if (title == '' || description == '' || imageUrl == '' || duration == '') {
            throw new Error('All fields are required!');
        }

        const createdAt = Date.now();
        const owner = req.user.id;

        const course = courseServices.create({ ...req.body, createdAt, owner });
        // console.log(course);
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

router.get('/details/:id', isUser(), async (req, res) => {
    console.log('From detailsController >>>');
    console.log(req.params.id);

    const course = await courseServices.getModelAndUsers(req.params.id);
    // console.log(course.owner._id);
    // console.log(req.user.id);

    if (course.owner._id == req.user.id) {
        // console.log('Gatcha!');
        course.isAuthor = true;
    } else {
        course.isAuthor = false;
    }

    console.log(course);
    res.render('details', { title: 'Details Page', course });
});

router.get('/edit/:id', isUser(), (req, res) => {

    res.render('edit', { title: 'Edit Page' });
});

router.get('/delete/:id', isUser(), async (req, res) => {
    console.log('From deleteController >>>');
    const existing = await courseServices.getModelAndUsers(req.params.id);

    if (req.user.id != existing.owner._id) {
        res.clearCookie('token');
        return res.redirect('/auth/login');
    }

    try {
        await courseServices.del(req.params.id);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        const errors = parseError(err);
        res.render('details', { title: existing.title, errors });
    }
});


module.exports = router;
