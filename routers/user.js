const express = require("express");
const UserController = require("../controllers/user");
const md_auth = require("../middleware/authenticated");

const api = express.Router();

//Whenever a post is made it will execute the function signUp by means of UserController
api.post("/sign-up", UserController.signUp);
api.post("/sign-in", UserController.signIn);
api.get("/users", [md_auth.ensureAuth], UserController.getUsers);
api.get("/users-active", [md_auth.ensureAuth], UserController.getUsersActive);
//api.post("/get-users")

module.exports = api;
