"use strict";

var mongoose = require('mongoose');

var orderItemSchema = mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }
});
var OrderItemModel = mongoose.model("OrderItem", orderItemSchema);
module.exports = OrderItemModel;