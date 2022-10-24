const { hash, compare } = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const { JWT_SECRET, SALT_ROUNDS } = require('../config/env');


async function register(username, password) {
    const existing = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    // const existing = await User.findOne({ username: new RegExp(`^${username}$`, 'i') });

    if (existing) {
        throw new Error('Username is taken!');
    }

    const hashedPassword = await hash(password, SALT_ROUNDS);

    const user = await User.create({ username, hashedPassword });

    // TODO see assignment if registration creates user session;
    const payload = { id: user._id, username };
    const token = jwt.sign(payload, JWT_SECRET);

    return token;
}

async function login(username, password) {
    const user = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });

    if (!user) {
        throw new Error('Incorrect username  or password!');
    }

    const hasMatch = await compare(password, user.hashedPassword);

    if (!hasMatch) {
        throw new Error('Incorrect username or password!');
    }

    const payload = { id: user._id, username };
    const token = jwt.sign(payload, JWT_SECRET);

    return token;
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    register,
    login,
    verifyToken,
};


// _doc: {
//     username: 'zel',
//     email: 'zel@abv.bg',
//     hashedPassword: '$2b$10$OjQDxOcO1vm79Thhm4u1y.HmFYlUyLHD1MNJQKkloYk80/I3D85Om',
//     _id: new ObjectId("63554bca1d2cb94884e8f80d"),
//     __v: 0
//   },


// MySchemaModel.find({}).then(function (records) {

//     records.forEach(function (record) {

//         console.log(record._doc._id); // <-- I added ._doc
//     });

// });
