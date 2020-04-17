const express = require("express");
const AuthController = require("../controllers/auth");

//In order to create routes.
const api = express.Router();

//This creates our end point in order to refresh our access token.
api.post("/refresh-access-token", AuthController.refreshAccessToken);

module.exports = api;
