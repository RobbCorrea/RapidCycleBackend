const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: String,
  lastname: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  role: {
    type: String,
    enum: ["collector", "basic", "guest"],
    default: "guest"
  },
  active: Boolean
});

module.exports = mongoose.model("User", UserSchema);
