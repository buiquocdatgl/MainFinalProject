// const authenticateRouter = require('./authenticate.router');
const rootRouter = require('express').Router();
const productRouter = require('./product.router')
const authenticateRouter = require('./authenticate.router')
const userRouter = require('./user.router')
const orderRouter = require('./order.router')

// rootRouter.use(`/auth`,authenticateRouter);
rootRouter.use(`/auth`,authenticateRouter);
rootRouter.use(`/product`,productRouter);
rootRouter.use(`/users`,userRouter);
rootRouter.use(`/orders`,orderRouter);


module.exports = rootRouter;