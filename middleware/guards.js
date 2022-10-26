function isUser() {
    return function (req, res, next) {
        if (req.user && Object.keys(req.user).length > 0) {
            next();
        } else {
            res.redirect('/auth/login');
        }
    };
}

function isGuest() {
    return function (req, res, next) {
        console.log('From Guards isGuest >>>');
        console.log(req.body);
        if (req.user && Object.keys(req.user).length == 0) {
            res.redirect('/'); // TODO check redirect requirements
        } else {
            next();
        }
    };
}



function isOwner() {
    // return function (req, res, next) {
    //     // TODO change property name to match collection
    //     const userId = req.session.user?._id;
    //     if (res.locals.data.owner == userId) {
    //         next();
    //     } else {
    //         res.redirect('/login');
    //     }
    // };
}

module.exports = {
    isUser,
    isGuest,
    isOwner
};
