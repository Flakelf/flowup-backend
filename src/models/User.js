const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../constants");

const User = new mongoose.Schema(
  {
    login: {
      type: String,
      validate: value => {
        if (value.length <= 3) {
          return Promise.reject(new Error("FU001"));
        }
      }
    },
    password: {
      type: String,
      validate: value => {
        if (value.length <= 3) {
          return Promise.reject(new Error("FU002"));
        }
      }
    }
  },
  { versionKey: false }
);

User.statics.saveUserAndGetToken = async function(data) {
  let user;

  try {
    user = await this.create(data);
  } catch (err) {
    return Promise.reject(new Error(err.errors.login.message));
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(data.password, salt);

  user.password = hashedPassword;

  user.save();

  const token = jwt.sign({ login: user.login }, jwtSecret, {
    expiresIn: "30d"
  });

  return token;
};

User.statics.getUserByLogin = async function({ login, password }) {
  const user = await this.findOne({ login }).lean();

  if (!user) return Promise.reject(new Error("FU003"));

  const match = await bcrypt.compare(password, user.password);

  if (match)
    return jwt.sign({ login: user.login }, jwtSecret, { expiresIn: "30d" });

  return Promise.reject(new Error("FU004"));
};

module.exports = mongoose.model("User", User);
