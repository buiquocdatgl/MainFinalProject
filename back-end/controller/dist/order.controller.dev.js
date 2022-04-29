"use strict";

var Order = require('../model/order');

var OrderItem = require('../model/order-item');

var qr = require("qrcode");

var getOrder = function getOrder(req, res) {
  var orderList;
  return regeneratorRuntime.async(function getOrder$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Order.find().populate('user', 'name').sort({
            'dateOrdered': -1
          }));

        case 2:
          orderList = _context.sent;

          if (!orderList) {
            res.status(500).json({
              success: false
            });
          }

          res.send(orderList);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

var getSingleOrder = function getSingleOrder(req, res) {
  var order;
  return regeneratorRuntime.async(function getSingleOrder$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Order.findById(req.params.id).populate('user', 'name').populate({
            path: 'orderItems',
            populate: 'product'
          }));

        case 2:
          order = _context2.sent;

          if (!order) {
            res.status(500).json({
              success: false
            });
          }

          res.send(order);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var createOrder = function createOrder(req, res) {
  var orderItemsIds, orderItemsIdsResolved, totalPrices, totalPrice, order, createQr, id;
  return regeneratorRuntime.async(function createOrder$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          orderItemsIds = Promise.all(req.body.orderItems.map(function _callee(orderItem) {
            var newOrderItem;
            return regeneratorRuntime.async(function _callee$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    newOrderItem = new OrderItem({
                      amount: orderItem.amount,
                      product: orderItem.product
                    });
                    _context3.next = 3;
                    return regeneratorRuntime.awrap(newOrderItem.save());

                  case 3:
                    newOrderItem = _context3.sent;
                    return _context3.abrupt("return", newOrderItem._id);

                  case 5:
                  case "end":
                    return _context3.stop();
                }
              }
            });
          }));
          _context5.next = 3;
          return regeneratorRuntime.awrap(orderItemsIds);

        case 3:
          orderItemsIdsResolved = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap(Promise.all(orderItemsIdsResolved.map(function _callee2(orderItemId) {
            var orderItem, totalPrice;
            return regeneratorRuntime.async(function _callee2$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return regeneratorRuntime.awrap(OrderItem.findById(orderItemId));

                  case 2:
                    orderItem = _context4.sent;
                    totalPrice = orderItem.amount * 1;
                    return _context4.abrupt("return", totalPrice);

                  case 5:
                  case "end":
                    return _context4.stop();
                }
              }
            });
          })));

        case 6:
          totalPrices = _context5.sent;
          totalPrice = totalPrices.reduce(function (a, b) {
            return a + b;
          }, 0);
          order = new Order({
            orderItems: orderItemsIdsResolved,
            room: req.body.room,
            phone: req.body.phone,
            status: req.body.status,
            totalProduct: totalPrice,
            user: req.body.user,
            returnDate: req.body.returnDate
          });
          _context5.next = 11;
          return regeneratorRuntime.awrap(order.save());

        case 11:
          order = _context5.sent;

          // qr code generater
          createQr = function createQr(filename, data) {
            console.log('data');
            console.log(data);
            qr.toFile("./statics/qr/" + filename + ".png", data, {
              width: 500
            });
          };

          console.log(order._id);
          id = String(order._id);
          createQr(id, id);

          if (order) {
            _context5.next = 18;
            break;
          }

          return _context5.abrupt("return", res.status(400).send('the order cannot be created!'));

        case 18:
          res.send(order);

        case 19:
        case "end":
          return _context5.stop();
      }
    }
  });
};

var updateOrderStatus = function updateOrderStatus(req, res) {
  var order;
  return regeneratorRuntime.async(function updateOrderStatus$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(Order.findByIdAndUpdate(req.params.id, {
            status: req.body.status
          }, {
            "new": true
          }));

        case 2:
          order = _context6.sent;

          if (order) {
            _context6.next = 5;
            break;
          }

          return _context6.abrupt("return", res.status(400).send('the order cannot be update!'));

        case 5:
          res.send(order);

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
};

var deleteOrder = function deleteOrder(req, res) {
  Order.findByIdAndRemove(req.params.id).then(function _callee4(order) {
    return regeneratorRuntime.async(function _callee4$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            if (!order) {
              _context8.next = 6;
              break;
            }

            _context8.next = 3;
            return regeneratorRuntime.awrap(order.orderItems.map(function _callee3(orderItem) {
              return regeneratorRuntime.async(function _callee3$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      _context7.next = 2;
                      return regeneratorRuntime.awrap(OrderItem.findByIdAndRemove(orderItem));

                    case 2:
                    case "end":
                      return _context7.stop();
                  }
                }
              });
            }));

          case 3:
            return _context8.abrupt("return", res.status(200).json({
              success: true,
              message: 'the order is deleted!'
            }));

          case 6:
            return _context8.abrupt("return", res.status(404).json({
              success: false,
              message: "order not found!"
            }));

          case 7:
          case "end":
            return _context8.stop();
        }
      }
    });
  })["catch"](function (err) {
    return res.status(500).json({
      success: false,
      error: err
    });
  });
};

var getCount = function getCount(req, res) {
  var orderCount;
  return regeneratorRuntime.async(function getCount$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(Order.countDocuments());

        case 2:
          orderCount = _context9.sent;

          if (!orderCount) {
            res.status(500).json({
              success: false
            });
          }

          res.send({
            orderCount: orderCount
          });

        case 5:
        case "end":
          return _context9.stop();
      }
    }
  });
};

module.exports = {
  createOrder: createOrder,
  getOrder: getOrder,
  getSingleOrder: getSingleOrder,
  updateOrderStatus: updateOrderStatus,
  deleteOrder: deleteOrder,
  getCount: getCount
};