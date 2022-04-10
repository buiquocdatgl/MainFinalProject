"use strict";

var authenticateRouter = require('express').Router();

var passport = require('passport');

var authenticateController = require('../controller/authenticate.controller');

authenticateRouter.post('/oauth/token', authenticateController.login);
authenticateRouter.post('/mobile/token', authenticateController.loginMobile);
module.exports = authenticateRouter;