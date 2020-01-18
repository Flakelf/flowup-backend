const mongoose = require("mongoose");
const shajs = require("sha.js");

const User = new mongoose.Schema(
  {
    login: {
      type: String,
      validate: value => {
        console.log(value.length <= 3);
        if (value.length <= 3) {
          console.log("here we are");
          return Promise.reject(
            new Error("login must contains at least a 3 characters")
          );
        }
      }
    },
    password: {
      type: String,
      validate: value => {
        if (value.length <= 3) {
          return Promise.reject(
            new Error("password must contains at least a 3 characters")
          );
        }
      }
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", User);
