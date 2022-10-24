const { Schema, model, Types: { ObjectId } } = require('mongoose');

const USERNAME_PATTERN = /^[a-zA-Z0-9]{5,}$/;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator(value) {
                return USERNAME_PATTERN.test(value);
            },
            message: 'The username should be at least 5 characters long and should consist only english letters and digits!',
        },
    },
    hashedPassword: { type: String, required: true },
    enrolled: { type: [ObjectId], ref: 'Tutorial', default: [] },

});

userSchema.index({ username: 1 }, {
    unique: true,
    collation: { locale: 'en', strength: 2 },
});


const User = model('User', userSchema);

module.exports = User;

// • The username should be at least 5 characters long and should consist only english letters and digits
// • The password should be at least 5 characters long and should consist only english letters and digits
// • The repeat password should be equal to the password



// const userSchema = new Schema({
//     email: {
//         type: String,
//         required: true,
//         validate: {
//             validator(value) {
//                 return EMAIL_PATTERN.test(value);
//             },
//             message: 'Email must be valid!'
//         }
//     },
//     hashedPassword: { type: String, required: true },
//     gender: { type: String, required: true, enum: ['male', 'female'] },
//     trips: { type: [ObjectId], ref: 'Trip', default: [] },
// });

// userSchema.index({ email: 1 }, {
//     unique: true,
//     collation: { locale: 'en', strength: 2 },
// });





// Papazov

// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const { SALT_ROUNDS } = require('../config/env');

// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true, },
//     address: { type: String, required: true },
//     publications: [{ type: mongoose.Types.ObjectId, ref: 'Publication' }],
//     shares: [{ type: mongoose.Types.ObjectId, ref: 'Publication' }]
// });

// userSchema.pre('save', function (next) {
//     bcrypt.hash(this.password, SALT_ROUNDS)
//         .then(hashedPassword => {
//             this.password = hashedPassword;
//             next();
//         });
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;
