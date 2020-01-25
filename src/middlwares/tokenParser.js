const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../constants");

module.exports = async (req, res, next) => {
  const authToken = req.headers["x-authorization"];

  jwt.verify(authToken, jwtSecret, (err, data) => {
    if (err) return res.status(400).send({ err: "FU005" });

    req.userData = data;
  });

  next();
};
