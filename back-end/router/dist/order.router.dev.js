"use strict";

var orderRouter = require('express').Router();

var _require = require("../controller/order.controller"),
    getSingleOrder = _require.getSingleOrder,
    getOrder = _require.getOrder,
    createOrder = _require.createOrder,
    updateOrderStatus = _require.updateOrderStatus,
    deleteOrder = _require.deleteOrder,
    getCount = _require.getCount;

orderRouter.get('/', getOrder);
orderRouter.get('/:id', getSingleOrder);
orderRouter.post('/', createOrder);
orderRouter.put('/:id', updateOrderStatus);
orderRouter["delete"]('/:id', deleteOrder);
orderRouter.get('/get/count', getCount);
module.exports = orderRouter;