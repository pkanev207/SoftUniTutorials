function isUser() {
    return function (req, res, next) {
        if (req.user) {
            next();
        } else {
            res.redirect('/auth/login');
        }
    };
}

function isGuest() {
    return function (req, res, next) {
        if (req.user) {
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
