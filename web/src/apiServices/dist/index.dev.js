"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = exports.deleteProduct = exports.updateProduct = exports.getSingleProduct = exports.getOrder = exports.getProduct = exports.createProduct = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var apiInstance = _axios["default"].create({
  baseURL: 'http://localhost:12000/api',
  validateStatus: function validateStatus(status) {
    return status <= 500;
  }
});

apiInstance.interceptors.request.use(function (request) {
  return request;
}); //Product

var createProduct = function createProduct(formData) {
  return apiInstance.post("/product/", formData);
};

exports.createProduct = createProduct;

var getProduct = function getProduct() {
  return apiInstance.get("/product/");
};

exports.getProduct = getProduct;

var getOrder = function getOrder() {
  return apiInstance.get("/orders/");
};

exports.getOrder = getOrder;

var getSingleProduct = function getSingleProduct(id) {
  return apiInstance.get("/product/".concat(id));
};

exports.getSingleProduct = getSingleProduct;

var updateProduct = function updateProduct(id, formData) {
  return apiInstance.put("/product/".concat(id), formData);
};

exports.updateProduct = updateProduct;

var deleteProduct = function deleteProduct(id) {
  return apiInstance["delete"]("/product/".concat(id));
}; //Users


exports.deleteProduct = deleteProduct;

var getUser = function getUser() {
  return apiInstance.get("/users/");
};

exports.getUser = getUser;