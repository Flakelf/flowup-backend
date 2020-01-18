const UserShema = require("../models/User");

module.exports = {
  test: (req, res) => {
    const randomUsers = [
      "Ivan Ivanov",
      "Petr Petrov",
      "Another ruSSnya",
      "Another ruSSnya 2"
    ];

    res.status(200).json({
      randomUser: randomUsers[Math.floor(Math.random() * randomUsers.length)]
    });
  },
  reg: async (req, res) => {
    const { login, password } = req.body;

    try {
      await UserShema.create({ login, password });
    } catch (err) {
      console.log(err.message); // err.message from model
    }

    res.status(201).end();
  },
  auth: (req, res) => {
    const { login, password } = req.body;

    if (login === "flowup" && password === "gfhjkm")
      res.status(200).send({ token: "abcxyz" });

    res.status(400).end();
  }
};
