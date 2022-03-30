const userRouter = require('express').Router();
const { getUserMe } = require('../controller/user.controller')

userRouter.get('/me/:id', getUserMe);

module.exports = userRouter;