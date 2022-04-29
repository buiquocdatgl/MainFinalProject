"use strict";

var User = require('../model/user');

var axios = require('axios');

var _require = require('./setting'),
    oauth = _require.oauth;

var qs = require('qs');

var Auth = require('../model/auth');

var authenticateControler = {
  login: function login(req, res) {
    var code = req.body.code;
    var tokenUrl = oauth.tokenUrl,
        clientId = oauth.clientId,
        clientSecret = oauth.clientSecret,
        redirectUri = oauth.redirectUri;
    var payload = qs.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    });
    axios.post(tokenUrl, payload, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then(function _callee(resp) {
      var newAuth;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(createAuth(resp.data));

            case 2:
              newAuth = _context.sent;
              res.status(201).send(newAuth);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      });
    })["catch"](function (err) {
      console.error('Error while requesting a token', err.message);
      res.status(500).json({
        error: err.message
      });
    });
  },
  loginMobile: function loginMobile(req, res) {
    var _req$body = req.body,
        code = _req$body.code,
        code_verifier = _req$body.code_verifier;
    console.log(code_verifier);
    var tokenUrl = oauth.tokenUrl,
        mobile_clientId = oauth.mobile_clientId,
        mobile_clientSecret = oauth.mobile_clientSecret,
        mobile_redirectUri = oauth.mobile_redirectUri;
    var payload = qs.stringify({
      client_id: mobile_clientId,
      client_secret: mobile_clientSecret,
      code: code,
      code_verifier: code_verifier,
      redirect_uri: mobile_redirectUri,
      grant_type: 'authorization_code'
    });
    axios.post(tokenUrl, payload, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then(function _callee2(resp) {
      var newAuth;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(createAuth(resp.data));

            case 2:
              newAuth = _context2.sent;
              res.status(201).send(newAuth);

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
  }
};

function createAuth(data) {
  var auth, authNew;
  return regeneratorRuntime.async(function createAuth$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          auth = new Auth({
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            scope: data.scope
          });
          _context3.next = 3;
          return regeneratorRuntime.awrap(auth.save());

        case 3:
          authNew = _context3.sent;
          return _context3.abrupt("return", authNew);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}

module.exports = authenticateControler;