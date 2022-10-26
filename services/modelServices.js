// TODO replace with actual model
const Tutorial = require('../models/Tutorial');
const User = require('../models/User');

async function getAll() {
    return Tutorial.find({}).lean();
}

async function getById(id) {
    return Tutorial.findById(id).lean();
}

async function getModelAndUsers(id) {
    // TODO replace with actual fields to be populated
    return Tutorial.findById(id).populate('owner').populate('participants').lean();
}

async function create(obj) {
    const result = new Tutorial(obj);
    await result.save();
    return result;
}

async function update(id, obj) {
    // TODO replace with actual fields
    const existing = await Tutorial.findById(id);
    existing.title = obj.title;
    existing.description = obj.description;
    existing.imageUrl = obj.imageUrl;
    existing.duration = obj.duration;

    return await existing.save();
}

async function join(modelId, userId) {
    // TODO replace with actual fields 
    const course = await Tutorial.findById(modelId);
    const user = await User.findById(userId);

    console.log(course);
    console.log(user);

    if (course.participants.includes(userId)) {
        throw new Error('User already is tripping!');
    }

    if (user.enrolled.includes(modelId)) {
        throw new Error('User has already enrolled!');
    }

    course.participants.push(userId);
    await course.save();

    user.enrolled.push(modelId);
    await user.save();

    return;

    // model.something.push(userId);
    // await model.save();
}

async function del(id) {
    await Tutorial.findByIdAndDelete(id);
}

// for joining two models
// async function createTrip(trip) {
//     const result = new Trip(trip);
//     await result.save();
//     // after creation in order to have id
//     const user = await User.findById(result.owner);
//     user.trips.push(result._id);
//     await user.save();

//     return result;
// }

module.exports = {
    getAll,
    getById,
    getModelAndUsers,
    create,
    update,
    join,
    del
};
