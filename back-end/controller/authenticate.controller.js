
const User = require('../model/user');
const axios = require('axios');
const { oauth } = require('./setting');
const qs = require('qs');
const Auth = require('../model/auth')


const authenticateControler = {
    login: (req, res) => {
        const { code } = req.body;
        const { tokenUrl, clientId, clientSecret, redirectUri } = oauth;
        const payload = qs.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code',
        });
        axios.post(tokenUrl, payload, { headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' } })
            .then(async function (resp) {
                const newAuth = await createAuth(resp.data);
                res.status(201).send(newAuth);
            })
            .catch((err) => {
                console.error('Error while requesting a token', err);
                res.status(500).json({
                    error: err.message,
                });
            });
    },

}
async function createAuth(data) {
    const auth = new Auth({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        scope: data.scope,
    })
    const authNew = await auth.save();
    return authNew;
}
module.exports = authenticateControler;