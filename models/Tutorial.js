const { Schema, model, Types: { ObjectId } } = require('mongoose');

const URL_PATTERN = /^https?:\/\/.+$/;

const tutorialSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: [4, 'The title should be at least 4 characters!'],
    },
    description: {
        type: String,
        required: true,
        minlength: [20, 'The description should be at least 20 characters long!'],
        // maxlength: [50, 'Description should be no more than 50 symbols!'],
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator(value) {
                URL_PATTERN.test(value);
            },
            message: 'The imageUrl should starts with http or https!'
        }
    },
    duration: { type: String, required: true },
    createdAt: { type: String, required: true },
    participants: { type: [ObjectId], ref: 'User', default: [] },
});

tutorialSchema.index({ title: 1 }, {
    unique: true,
    collation: { locale: 'en', strength: 2 },
});

const Tutorial = model('Tutorial', tutorialSchema);

module.exports = Tutorial;

// • The title should be at least 4 characters
// • The description should be at least 20 characters long
// • The imageUrl should starts with http or https;

// • Title - string (required), unique
// • Description - string (required), max length of 50 symbols,
// • Image Url - string (required),
// • Duration - string (required),
// • Created at - Date or String, (required),
// • Users Enrolled - a collection of Users



// const mongoose = require('mongoose');

// const publicationSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     paintingTechnique: { type: String, required: true },
//     artPicture: { type: String, required: true },
//     certificate: { type: String, enum: ['Yes', 'No'], required: true },
//     author: { type: mongoose.Types.ObjectId, ref: 'User' },
//     usersShared: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
// });

// const Publication = mongoose.model('Publication', publicationSchema);

// module.exports = Publication;
