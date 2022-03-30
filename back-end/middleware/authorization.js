// const passport = require('passport');
// const User = require('../model/user');
// // const OAuth2Strategy = require('passport-oauth2').Strategy;
// import OAuth2Strategy from 'passport-oauth2'

// passport.use(new OAuth2Strategy({
//     authorizationURL: 'https://www.example.com/oauth2/authorize',
//     tokenURL: 'https://gae-gw.systems/oauth/token/',
//     clientID: 'aO2RppYpxOjfqEotIW515ZmpNfmaPD2GhblnG7bA',
//     clientSecret: 'WIdGj4ppsDnVN0JPvKpdnh97O3PaiTigx4a3jgDbsSH4wVurNuL9GfoxFYOF2miDP8G6C0YQsoLMwDmGwUsCtG5MbD705klrJl89b1Ew84PRIDoSvB5SkXd0PfeGTdfP',
//     callbackURL: "http://localhost:3000/"
// },
//     function (accessToken, refreshToken, profile, cb) {
//         console.log(profile);
//         User.findOrCreate({ userID: profile.id }, function (err, user) {
//             return cb(err, user);
//         });
//     }
// ),
//     passport.serializeUser((user, cb) => {
//         console.log("Serializing user:", user);
//         cb(null, user.id);
//     }),

//     passport.deserializeUser(async (id, cb) => {
//         const user = await User.findOne({ where: { id } }).catch((err) => {
//             console.log("Error deserializing", err);
//             cb(err, null);
//         });

//         console.log("DeSerialized user", user);

//         if (user) cb(null, user);
//     });