
const User = require('../model/user');
const axios = require('axios');
const { oauth } = require('./setting');
const qs = require('qs');
const Auth = require('../model/auth')

// nói số 4
/* 
    -back-end sẽ tạo ra một enpoint riêng cho client gửi authorization code và code verifier (nếu có). Sau đó back-end sử dụng các thông tin ứng dụng bao gồm : clientId, clientSecret.
    The back-end will create a separate endpoint for the client to send the authorization code and code verifier (if any). Then the back-end uses the application information including: clientId, clientSecret.

    - Mục đích của việc sử dụng back-end đóng vai trò là một BFF nhằm support một quy trình xác thực có tính bảo mật cao bởi các giải pháp sau:
    - The purpose of using the back-end as a BFF is to support a highly secure authentication process by the following solutions:
        * giúp lưu trữ client_secret khỏi client
        * help store client_secret from client

        * lưu trữ lại accesstoken và refreshtoken dưới database để thực việc truy vấn đến GAE App 
        * store the accesstoken and refreshtoken under the database to make queries to GAE App

        * -> mục đích là để các ứng dụng client chỉ nhận về thông tin là một id token đại diện cho row lưu trữ accesstoken và refreshtoken trong mongoDB. Điều này giúp tăng tinh bảo mật
        * -> purpose is for client applications to only receive information as an id token representing the row that stores the accesstoken and refreshtoken in mongoDB. This increases security
*/
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
                console.error('Error while requesting a token', err.message);
                res.status(500).json({
                    error: err.message,
                });
            });
    },

    loginMobile: (req, res) => {
        const { code, code_verifier } = req.body;
        console.log(code_verifier);
        const { tokenUrl, mobile_clientId, mobile_clientSecret, mobile_redirectUri } = oauth;
        const payload = qs.stringify({
            client_id: mobile_clientId,
            client_secret: mobile_clientSecret,
            code,
            code_verifier,
            redirect_uri: mobile_redirectUri,
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