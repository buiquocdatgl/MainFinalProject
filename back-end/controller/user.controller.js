const User = require('../model/user')
const Auth = require('../model/auth')
const { oauth } = require('./setting');
const axios = require('axios');
const e = require('express');

const getUserMe = async (req, res) => {
    const { id } = req.params;
    const { gaeUrl } = oauth;
    console.log(gaeUrl);
    try {
        const findIdToken = await Auth.findById(id);
        axios.get(`${gaeUrl}/users/me`,
            {
                headers: {
                    'content-type': 'application/json',
                    "Authorization": `Bearer ${findIdToken.accessToken}`
                }
            })
            .then(async function (resp) {
                const user = await findOrCreateUser(resp.data);
                res.status(200).send(user);
            })
            .catch((err) => {
                console.error('Error while requesting a token', err);
                res.status(500).json({
                    error: err.message,
                });
            });
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 });
    }
}
async function findOrCreateUser(data) {
    const findUser = await User.findOne({userId: parseInt(data.id)});
    if(findUser){
        return findUser;
    }
    const newUser = new User({
        userId: data.id,
        email: data.email,
        name: data.name,
        firstname: data.first_name,
        lastname: data.last_name,
        avatar: data.avatar,
        role: data.role,
    })
    const user = await newUser.save();
    return user;
}
module.exports = {
    getUserMe
}