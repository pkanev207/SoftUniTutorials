// TODO replace with actual model
const Tutorial = require('../models/Tutorial');
// const User = require('../models/User');

async function getAll() {
    return Tutorial.find({}).lean();
}

async function getById(id) {
    return Tutorial.findById(id).lean();
}

async function getModelAndUsers(id) {
    // TODO replace with actual fields to be populated
    return Tutorial.findById(id).populate('field1').populate('field2').lean();
}

async function create(obj) {
    const result = new Tutorial(obj);
    await result.save();
    return result;
}

async function update(id, obj) {
    // TODO replace with actual fields
    const existing = await Tutorial.findById(id);
    existing.something = obj.something;

    await existing.save();
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
    del
};
