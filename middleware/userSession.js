const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
// const { verifyToken } = require('../services/authService');

module.exports = () => (req, res, next) => {
    const token = req.cookies.token;
    console.log('From userSession >>>');

    if (token && Object.keys(token).length > 0) {
        try {
            // const userData = verifyToken(token);
            const userData = jwt.verify(token, JWT_SECRET);
            console.log('Read successful, user >>>', userData);
            req.user = userData;
            res.locals.user = userData;
            res.locals.hasUser = true;
        } catch (err) {
            console.log('Invalid token');
            res.clearCookie('token');
            res.redirect('/auth/login');
            return;
        }
    }

    next();
};





// const jwt = require('jsonwebtoken');

// module.exports = (jwtSecret) => (req, res, next) => {
//     const token = req.cookies.jwt;
//     if (token) {
//         try {
//             const data = jwt.verify(token, jwtSecret);
//             req.user = data;
//         } catch (err) {
//             res.clearCookie('jwt');
//             return res.redirect('/login');
//         }
//     }

//     req.signJwt = (data) => jwt.sign(data, jwtSecret, { expiresIn: '4h' });

//     next();
// };
