const mongoose = require('mongoose');

const AuthSchema = mongoose.Schema({ 
    accessToken: {type: String, require: true},
    refreshToken: {type: String, require: true},
    scope: {type: String, required: true},
}, {collection: 'auth'})


            const AuthModel = mongoose.model('auth', AuthSchema)

module.exports = AuthModel;