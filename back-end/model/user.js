const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userId: { type: Number, require: true },
    email: { type: String },
    name: { type: String },
    firstname: { type: String },
    lastname: { type: String, },
    avatar: String,
    role: { type: String, required: true },
}, { collection: 'users' })

UserSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

UserSchema.set('toJSON', {
    virtuals: true,
});

const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel;