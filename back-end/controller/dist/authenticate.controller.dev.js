"use strict";

var User = require('../model/user');

var axios = require('axios');

var _require = require('./setting'),
    oauth = _require.oauth;

var qs = require('qs');

var Auth = require('../model/auth'); // nói số 4

/* 
    -back-end sẽ tạo ra một enpoint riêng cho client gửi authorization code và code verifier (nếu có). Sau đó back-end sử dụng các thông tin ứng dụng bao gồm : clientId, clientSecret.
    The back-end will create a separate endpoint for the client to send the authorization code and code verifier (if any). Then the back-end uses the application information including: clientId, clientSecret.

    - Mục đích của việc sử dụng back-end đóng vai trò là một BFF nhằm support một quy trình xác thực có tính bảo mật cao bởi các giải pháp sau:
    - The purpose of using the back-end as a BFF is to support a highly secure authentication process by the following solutions:
        * giúp lưu trữ client_secret khỏi client
        * help store client_secret from client

        * lưu trữ lại accesstoken và refreshtoken dưới database để thực việc truy vấn đến GAE App 
        * store the accesstoken and refreshtoken under the database to make queries to GAE App

        * -> mục đích là để các ứng dụng client chỉ nhận về thông tin là một id token đại diện cho row lưu trữ accesstoken và refreshtoken trong mongoDB. Điều này giúp tăng tinh bảo mật
        * -> purpose is for client applications to only receive information as an id token representing the row that stores the accesstoken and refreshtoken in mongoDB. This increases security
*/


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