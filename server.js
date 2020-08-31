require('dotenv').config()
const express = require("express");
const cors = require('cors');
const pilotRouter = require("./src/routes/pilot");
const mediaRouter = require("./src/routes/media");
const requestRouter = require("./src/routes/request");

const { auth } = require('./src/utils/middlewares')

const db = require("./src/db");

const port = process.env.PORT || 8000;
const app = express();

db();
app.use(cors());
app.use(express.json());

app.use("/pilotos", pilotRouter);
app.use("/media", mediaRouter);
app.use("/solicitud", requestRouter);

app.listen(port, () => 
  console.log("App listening localhost:8000"));