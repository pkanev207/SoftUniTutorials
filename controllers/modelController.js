const router = require('express').Router();

const courseServices = require('../services/modelServices');
const { parseError,  } = require('../util/errorParser');
const { isUser, isOwner } = require('../middleware/guards');


router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Page' });
});


router.post('/create', isUser(), (req, res) => {
    try {
        const { title, description, imageUrl, duration } = req.body;

        if (title == '' || description == '' || imageUrl == '' || duration == '') {
            throw new Error('All fields are required!');
        }

        const createdAt = Date.now();
        const owner = req.user.id;

        courseServices.create({ ...req.body, createdAt, owner });
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
    const course = await courseServices.getModelAndUsers(req.params.id);
    // console.log('From detailsController >>>');

    course.isParticipant = false;
    
    course.participants.forEach(obj => {
        if (obj._id == req.user.id) { course.isParticipant = true; }
    });

    if (course.owner?._id == req.user.id) {
        course.isAuthor = true;
    } else {
        course.isAuthor = false;
    }

    console.log(course);
    res.render('details', { title: 'Details Page', course });
});


router.get('/edit/:id', isUser(), async (req, res) => {
    const existing = await courseServices.getModelAndUsers(req.params.id);

    if (req.user.id != existing.owner._id) {
        res.clearCookie('token');
        return res.redirect('/auth/login');
    }

    res.render('edit', { title: 'Edit Page', ...existing });
});


router.post('/edit/:id', isUser(), isOwner(), async (req, res) => {
    const course = req.body;
    course._id = req.params.id;
    console.log('From postController >>>');
    console.log(course);

    try {
        await courseServices.update(req.params.id, req.body);

        res.redirect(`/course/details/${req.params.id}`);
    } catch (err) {
        console.error(err);
        const errors = parseError(err);
        // res.render('/edit/' + req.params.id, { title: 'EDIT AGAIN!', course, errors });
        res.render('edit', {
            title: 'EDIT AGAIN!',
            errors,
            // data: { username: req.body.username },
            ...req.body,
        });
    }
});


router.get('/enroll/:id', isUser(), async (req, res) => {
    console.log('From enrollController >>>');
    console.log(req.params.id);
    console.log(req.user);
    try {
        courseServices.join(req.params.id, req.user.id);
    } catch (err) {
        console.error(err);
    } finally {
        res.redirect('/course/details/' + req.params.id);
    }
});


























router.get('/delete/:id', isUser(), isOwner(), async (req, res) => {
    // const existing = await courseServices.getModelAndUsers(req.params.id);

    // if (req.user.id != existing.owner._id) {
    //     res.clearCookie('token');
    //     return res.redirect('/auth/login');
    // }

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
