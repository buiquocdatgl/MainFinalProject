const Order = require('../model/order');
const OrderItem = require('../model/order-item');
const qr = require("qrcode");

const getOrder = async (req, res) => {
    const orderList = await Order.find().populate('user', 'name').sort({ 'dateOrdered': -1 });

    if (!orderList) {
        res.status(500).json({ success: false })
    }
    res.send(orderList);
}


const getSingleOrder = async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('user', 'name')
        .populate({ path: 'orderItems', populate: 'product' })

    if (!order) {
        res.status(500).json({ success: false })
    }
    res.send(order);

}

const createOrder = async (req, res) => {
    const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem) => {
        let newOrderItem = new OrderItem({
            amount: orderItem.amount,
            product: orderItem.product
        })

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }))
    const orderItemsIdsResolved = await orderItemsIds;

    const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId) => {
        
        const orderItem = await OrderItem.findById(orderItemId)
        const totalPrice = orderItem.amount * 1;
        return totalPrice
    }))

    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

    let order = new Order({
        orderItems: orderItemsIdsResolved,
        room: req.body.room,
        phone: req.body.phone,
        status: req.body.status,
        totalProduct: totalPrice,
        user: req.body.user,
        returnDate:req.body.returnDate
    })
    order = await order.save();

    // qr code generater
   const createQr = (filename, data) => {
       console.log('data');
       console.log(data);
       qr.toFile("./statics/qr/" + filename + ".png", data, {width: 500})
   }
   console.log(order._id);
   const id = String(order._id)
   createQr(id, id);

    if (!order)
        return res.status(400).send('the order cannot be created!')

    res.send(order);
}

const updateOrderStatus = async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        },
        { new: true }
    )

    if (!order)
        return res.status(400).send('the order cannot be update!')

    res.send(order);
}

const deleteOrder = (req, res) => {
    Order.findByIdAndRemove(req.params.id).then(async order => {
        if (order) {
            await order.orderItems.map(async orderItem => {
                await OrderItem.findByIdAndRemove(orderItem)
            })
            return res.status(200).json({ success: true, message: 'the order is deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "order not found!" })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
    })
}

const getCount = async (req,res)=>{
    const orderCount = await Order.countDocuments()
    if(!orderCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        orderCount: orderCount
    });
}


module.exports = {
    createOrder,
    getOrder,
    getSingleOrder,
    updateOrderStatus,
    deleteOrder,
    getCount
}