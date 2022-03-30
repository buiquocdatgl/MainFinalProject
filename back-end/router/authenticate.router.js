const authenticateRouter = require('express').Router();
const passport = require('passport');
const authenticateController = require('../controller/authenticate.controller');

authenticateRouter.post('/oauth/token', authenticateController.login);

module.exports = authenticateRouter;