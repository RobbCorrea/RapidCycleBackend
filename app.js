const express = require("express");
const bodyParser = require("body-parser");

//Express initialization
const app = express();
const { API_VERSION } = require("./config");

// Load routings
const userRoutes = require("./routers/user");

//Body parser configuration
app.use(bodyParser.urlencoded({ extend: false }));
app.use(bodyParser.json());

//Configuration for HTTP Headers

//Basic Routes from "./routers"
app.use(`/api/${API_VERSION}`, userRoutes);

module.exports = app;
