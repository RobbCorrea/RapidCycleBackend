const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
const User = require("../models/user");

function signUp(req, res) {
  const user = new User();
  const { name, lastname, email, password, repeatPassword, role } = req.body;
  user.name = name;
  user.lastname = lastname;
  user.email = email.toLowerCase();
  user.role = role; //Or it could be "'admin'" here.
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
          "Passwords don't match. Please carefully type in your password again./Las contraseñas no son iguales. Por favor anote la contraseña nuevamente."
      });
    } else {
      // BCRYPT Encrypting passwords.
      bcrypt.hash(password, null, null, function(err, hash) {
        if (err) {
          res.status(500).send({
            message:
              "Error encrypting the password./Error al encriptar la contraseña."
          });
        } else {
          user.password = hash;

          user.save((err, userStored) => {
            if (err) {
              res.status(500).send({
                message:
                  "Server error. User already exists. /Error del servidor. El usuario ya existe."
              });
            } else {
              if (!userStored) {
                res.status(404).send({
                  message:
                    "Error while creating the user./Error al crear el usuario."
                });
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

function signIn(req, res) {
  const params = req.body;
  const email = params.email.toLowerCase();
  const password = params.password;

  User.findOne({ email }, (err, userStored) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!userStored) {
        res.status(404).send({ message: "Usuario no encontrado." });
      } else {
        bcrypt.compare(password, userStored.password, (err, check) => {
          if (err) {
            res.status(500).send({ message: "Error del servidor." });
          } else if (!check) {
            res.status(404).send({ message: "La contraseña es incorrecta." });
          } else {
            if (!userStored.active) {
              res
                .status(200)
                .send({ code: 200, message: "El usuario no se ha activado." });
            } else {
              res.status(200).send({
                accessToken: jwt.createAccessToken(userStored),
                refreshToken: jwt.createRefreshToken(userStored)
              });
            }
          }
        });
      }
    }
  });
}

function getUsers(req, res) {
  User.find().then(users => {
    if (!users) {
      res.status(404).send({ message: "No se ha encontrado ningun usuario." });
    } else {
      res.status(200).send({ users });
    }
  });
}

function getUsersActive(req, res) {
  console.log(req);
  const query = req.query;

  User.find({ active: query.active }).then(users => {
    if (!users) {
      res.status(404).send({ message: "No se ha encontrado ningun usuario." });
    } else {
      res.status(200).send({ users });
    }
  });
}

module.exports = {
  signUp,
  signIn,
  getUsers,
  getUsersActive
};
