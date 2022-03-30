const orderRouter = require('express').Router();
const {
    getSingleOrder,
    getOrder,
    createOrder,
    updateOrderStatus,
    deleteOrder,
    getCount
} = require("../controller/order.controller");

orderRouter.get('/', getOrder)
orderRouter.get('/:id', getSingleOrder)
orderRouter.post('/', createOrder);
orderRouter.put('/:id', updateOrderStatus)
orderRouter.delete('/:id', deleteOrder)
orderRouter.get('/get/count', getCount)




module.exports = orderRouter;