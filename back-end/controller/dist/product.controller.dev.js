"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Product = require("../model/product");

var createProduct = function createProduct(req, res) {
  var name, filename, checkProductInDB, newProduct;
  return regeneratorRuntime.async(function createProduct$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          name = req.body.name;
          filename = req.file.filename;
          console.log(req.body);

          if (!(name === "")) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "Name of product must be required"
          }));

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(Product.findOne({
            name: name
          }));

        case 7:
          checkProductInDB = _context.sent;

          if (!checkProductInDB) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "Product already exists"
          }));

        case 12:
          newProduct = new Product(_objectSpread({}, req.body, {
            imageLink: "/statics/properties/".concat(filename)
          }));
          _context.next = 15;
          return regeneratorRuntime.awrap(newProduct.save());

        case 15:
          if (newProduct) {
            _context.next = 17;
            break;
          }

          return _context.abrupt("return", res.status(400).send("The product cannot be created!"));

        case 17:
          res.send(newProduct);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  });
};

var updateProduct = function updateProduct(req, res) {
  var id, description, quantity;
  return regeneratorRuntime.async(function updateProduct$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          description = req.body.description;
          quantity = req.body.quantity;
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(Product.findByIdAndUpdate(id, {
            description: description,
            quantity: quantity
          }));

        case 6:
          res.status(200).json({
            message: "Update Product Successfully."
          });
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](3);
          res.status(400).json({
            message: _context2.t0.message,
            status: 400
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 9]]);
};

var getProducts = function getProducts(req, res) {
  var result;
  return regeneratorRuntime.async(function getProducts$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Product.find({}));

        case 3:
          result = _context3.sent;
          res.status(200).send(result);
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.status(400).json({
            message: _context3.t0.message,
            status: 400
          });

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var getSingleProduct = function getSingleProduct(req, res) {
  var product;
  return regeneratorRuntime.async(function getSingleProduct$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Product.findById(req.params.id));

        case 2:
          product = _context4.sent;

          if (!product) {
            res.status(500).json({
              success: false
            });
          }

          res.send(product);

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var deleteProduct = function deleteProduct(req, res) {
  var id;
  return regeneratorRuntime.async(function deleteProduct$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Product.findByIdAndDelete(id));

        case 4:
          res.status(200).json({
            message: "Delete Product Successfully."
          });
          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](1);
          res.status(400).json({
            message: _context5.t0.message,
            status: 400
          });

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 7]]);
};

module.exports = {
  createProduct: createProduct,
  updateProduct: updateProduct,
  getProducts: getProducts,
  deleteProduct: deleteProduct,
  getSingleProduct: getSingleProduct
};