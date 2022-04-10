const settings = {
    port: process.env.PORT || 5000,
    oauth: {
        tokenUrl: process.env.OAUTH_TOKEN_URL,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        redirectUri: process.env.OAUTH_REDIRECT_URI,
        //mobile
        mobile_clientId: process.env.OAUTH_CLIENT_ID_MOBILE,
        mobile_clientSecret: process.env.OAUTH_CLIENT_SECRET_MOBILE,
        mobile_redirectUri: process.env.OAUTH_REDIRECT_URI_MOBILE,

        gaeUrl: process.env.GAE_API_URL
    },
};

module.exports = settings;