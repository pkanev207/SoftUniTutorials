const router = require("./homeController");

const userService = require('../services/authService');
const { parseError } = require("../util/errorParser");
const { isUser, isGuest } = require('../middleware/guards');
// const PASSWORD_PATTERN = /^[a-zA-Z0-9]{5,}$/;

router.get('/register', isGuest(), (req, res) => {
    res.render('register', { title: 'Register Page' });
});

router.post('/register', isGuest(), async (req, res) => {
    console.log(req.body);
    try {
        if (req.body.username.trim() == '' || req.body.password.trim() == '') {
            throw new Error('All fields are required!');
        }
        // let isValid = PASSWORD_PATTERN.test(req.body.password);
        if (!new RegExp('^[a-zA-Z0-9]{5,}$', 'i').test(req.body.password.trim())) {
            throw new Error('The password should be at least 5 characters long and should consist only english letters and digits!');
        }

        if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match!');
        }

        const token = await userService.register(req.body.username, req.body.password);

        res.cookie('token', token);
        res.redirect('/'); // TODO check for redirect requirement
    } catch (err) {
        console.error(err);
        const errors = parseError(err);

        // TODO add error display to actual template form assignment
        res.render('register', {
            title: 'Register Page',
            errors,
            // data: { username: req.body.username },
            data: { ...req.body }
        });
    }
});

router.get('/login', isGuest(), (req, res) => {
    res.render('login', { title: 'Login Page' });
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        if (req.body.username.trim() == '' || req.body.password.trim() == ''
        ) {
            throw new Error('All fields are required!');
        }

        const token = await userService.login(req.body.username, req.body.password);

        res.cookie('token', token, { httpOnly: true });
        res.redirect('/'); // TODO check for redirect requirement
    } catch (err) {
        console.error(err);
        const errors = parseError(err);

        // TODO add error display to actual template form assignment
        res.render('login', {
            title: 'Login Page',
            errors,
            // data: { username: req.body.username },
            data: req.body
        });
    }
});

router.get('/logout', isUser(), (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = router;
