const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required:true
    }],
    room: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Pending',
    },
    totalProduct: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    dateOrdered: {
        type: Date,
        default: Date.now,
    },
    returnDate:{
        type: Date
    }
})


orderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

orderSchema.set('toJSON', {
    virtuals: true,
});

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;