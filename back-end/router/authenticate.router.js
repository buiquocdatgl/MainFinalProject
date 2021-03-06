const authenticateRouter = require('express').Router();
const passport = require('passport');
const authenticateController = require('../controller/authenticate.controller');

authenticateRouter.post('/oauth/token', authenticateController.login);
authenticateRouter.post('/mobile/token', authenticateController.loginMobile);

module.exports = authenticateRouter;