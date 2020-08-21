const express = require("express");
const app = express();
const cors = require('cors');
const Pilot = require("./src/models/pilot.model");
const db = require("./src/db");
const pilotRouter = require("./src/routes/pilot")

const port = 8000;

//db();

app.use(cors());
app.use(express.json());

app.use("/pilots", pilotRouter)

app.listen(port, () => 
  console.log("App listening localhost:8000"));