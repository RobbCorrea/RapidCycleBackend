const bcrypt = require("bcrypt-nodejs");
const User = require("../models/user");
//const jwt = require("")

async function signUp(req, res) {
  const user = new User();
  const { name, lastname, email, password, repeatPassword } = req.body;
  user.name = name;
  user.lastname = lastname;
  user.email = email;
  user.role = "admin";
  user.active = false;

  if (!password || !repeatPassword) {
    res.status(404).send({
      message:
        "Passwords are mandatory in order to provide you with a better service. Please take a moment to type in your password."
    });
  } else {
    if (password !== repeatPassword) {
      res.status(404).send({
        message:
          "Passwords don't match. Please carefully type in your password again."
      });
    } else {
      // BCRYPT Encrypting passwords.
      bcrypt.hash(password, null, null, function(err, hash) {
        if (err) {
          res.status(500).send({ message: "Error decrypting the password." });
        } else {
          //DELETE THIS console.log(hash)
          user.password = hash;

          user.save((err, userStored) => {
            if (err) {
              res.status(500).send({ message: "Server error." });
            } else {
              if (!userStored) {
                res
                  .status(404)
                  .send({ message: "Error while creating the user." });
              } else {
                res.status(200).send({ user: userStored });
              }
            }
          });
        }
      });
    }
  }
}

module.exports = {
  signUp
};
