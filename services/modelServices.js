// TODO replace with actual model
const Model = require('../models/Model');
// const User = require('../models/User');

async function getAll() {
    return Model.find({}).lean();
}

async function getById(id) {
    return Model.findById(id).lean();
}

async function getModelAndUsers(id) {
    // TODO replace with actual fields to be populated
    return Model.findById(id).populate('field1').populate('field2').lean();
}

async function create(obj) {
    const result = new Model(obj);
    await result.save();
    return result;
}

async function update(id, obj) {
    // TODO replace with actual fields
    const existing = await Model.findById(id);
    existing.something = obj.something;

    await existing.save();
}

async function del(id) {
    await Model.findByIdAndDelete(id);
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