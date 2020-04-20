const jwt = require("jwt-simple");
const moment = require("moment");
//The same as in jwt
const SECRET_KEY = "gR7cH9Svfj8JLe4c186Ghs48hheb3902nh5DsA";

exports.ensureAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    //this would mean the user hadn't sent any token or no authentication header.
    return res.status(403).send({
      message:
        "Your pettition lacks an authentication header. La peticion no tiene cabecera de autenticacion."
    });
  }
  //This replaces for emptiness.
  const token = req.headers.authorization.replace(/['"]+/g, "");
  //console.log(token);
  try {
    console.log(SECRET_KEY);
    var payload = jwt.decode(token, SECRET_KEY);
    console.log(payload);
    //If it's lesser than the moment, it means the token has expired.
    if (payload.exp <= moment().unix()) {
      return res.status(404).send({ message: "El token ha expirado." });
    }
  } catch (ex) {
    //This means it has sent a non valid token.
    console.log(ex);
    return res.status(404).send({ message: "Token invalido." });
  }
  //Payload is returning the right token.
  req.user = payload;
  next();
};
