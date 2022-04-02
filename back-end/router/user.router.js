const userRouter = require('express').Router();
const { getUserMe, getUsers } = require('../controller/user.controller')

userRouter.get('/me/:id', getUserMe);
userRouter.get('/', getUsers);

module.exports = userRouter;