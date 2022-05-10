"use strict";

var User = require('../model/user');

var Auth = require('../model/auth');

var _require = require('./setting'),
    oauth = _require.oauth;

var axios = require('axios');

var e = require('express');

var getUsers = function getUsers(req, res) {
  var result;
  return regeneratorRuntime.async(function getUsers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.find({}));

        case 3:
          result = _context.sent;
          res.status(200).send(result);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(400).json({
            message: _context.t0.message,
            status: 400
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var getUserMe = function getUserMe(req, res) {
  var id, gaeUrl, findIdToken;
  return regeneratorRuntime.async(function getUserMe$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          gaeUrl = oauth.gaeUrl;
          console.log(gaeUrl);
          _context3.prev = 3;
          _context3.next = 6;
          return regeneratorRuntime.awrap(Auth.findById(id));

        case 6:
          findIdToken = _context3.sent;
          axios.get("".concat(gaeUrl, "/users/me"), {
            headers: {
              'content-type': 'application/json',
              "Authorization": "Bearer ".concat(findIdToken.accessToken)
            }
          }).then(function _callee(resp) {
            var user;
            return regeneratorRuntime.async(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return regeneratorRuntime.awrap(findOrCreateUser(resp.data));

                  case 2:
                    user = _context2.sent;
                    res.status(200).send(user);

                  case 4:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          })["catch"](function (err) {
            console.error('Error while requesting a token', err);
            res.status(500).json({
              error: err.message
            });
          });
          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](3);
          res.status(500).json({
            message: _context3.t0.message,
            status: 500
          });

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[3, 10]]);
};

function findOrCreateUser(data) {
  var findUser, newUser, user;
  return regeneratorRuntime.async(function findOrCreateUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            userId: parseInt(data.id)
          }));

        case 2:
          findUser = _context4.sent;

          if (!findUser) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", findUser);

        case 5:
          newUser = new User({
            userId: data.id,
            email: data.email,
            name: data.name,
            firstname: data.first_name,
            lastname: data.last_name,
            avatar: data.avatar,
            role: data.role
          });
          _context4.next = 8;
          return regeneratorRuntime.awrap(newUser.save());

        case 8:
          user = _context4.sent;
          return _context4.abrupt("return", user);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  });
}

module.exports = {
  getUserMe: getUserMe,
  getUsers: getUsers
};