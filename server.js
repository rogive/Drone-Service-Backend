require('dotenv').config()
const express = require("express");
const cors = require('cors');
const pilotRouter = require("./src/routes/pilot");
const mediaRouter = require("./src/routes/media");
const clientRouter = require("./src/routes/client");
const querieRouter = require("./src/routes/querie");

const certificateRouter = require("./src/routes/certificate");
const { auth } = require('./src/utils/middlewares')

const db = require("./src/db");

const port = process.env.PORT || 8000;
const app = express();

db();
app.use(cors());
app.use(express.json());

app.use("/pilotos", pilotRouter);
app.use("/media", mediaRouter);
app.use("/client", clientRouter);
app.use("/querie", querieRouter);

app.use("/certificados", certificateRouter);

app.listen(port, () => 
  console.log("App listening localhost:8000"));