"use strict";

var dotenv = require("dotenv");

dotenv.config();

var app = require('./app');

var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("listening on port: ".concat(PORT));
});