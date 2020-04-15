const express = require("express");
const UserController = require("../controllers/user");

const api = express.Router();

//Whenever a post is made it will execute the function signUp by means of UserController
api.post("/sign-up", UserController.signUp);
api.post("/sign-in", UserController.signIn);

module.exports = api;
