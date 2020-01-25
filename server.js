const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

require("dotenv").config();

const UserRouter = require("./src/routes/UserRoutes");
const tokenParser = require("./src/middlwares/tokenParser");

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(tokenParser);
app.use("/api/v1/user", UserRouter);

mongoose
  .connect(
    `mongodb://${process.env.DB_LOGIN}:${process.env.DB_PASS}@ds253284.mlab.com:53284/flowup`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log("Connected to Mongo DB"));

app.listen(process.env.PORT, () =>
  console.log(`Server started at port ${process.env.PORT}`)
);
