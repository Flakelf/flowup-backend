const UserSchema = require("../models/User");

module.exports = {
  reg: async (req, res) => {
    console.log(req.body);

    const { login, password } = req.body;

    let token;

    try {
      token = await UserSchema.saveUserAndGetToken({ login, password });
    } catch (err) {
      res.status(400).send({ err: err.message });
    }

    res.status(201).send({ token });
  },
  auth: async (req, res) => {
    try {
      const token = await UserSchema.getUserByLogin(req.body);
      res.status(200).send({ token });
    } catch (err) {
      return res.status(400).send({ err: err.message });
    }

    res.status(200).end();
  }
};
