const express = require("express");
const bodyParser = require("body-parser");

//Express initialization
const app = express();
const { API_VERSION } = require("./config");

// Load routings

//Body parser configuration
app.use(bodyParser.urlencoded({ extend: false }));
app.use(bodyParser.json());

//Configuration for HTTP Headers

//Basic Routes from "./routers"

module.exports = app;
