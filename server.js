require('dotenv').config()
const express = require("express");
const cors = require('cors');
const Pilot = require("./src/models/pilot.model");
const pilotRouter = require("./src/routes/pilot")

const { auth } = require('./src/utils/middlewares')

const db = require("./src/db");

const port = process.env.PORT || 8000;
const app = express();

db();
app.use(cors());
app.use(express.json());

app.use("/pilotos", pilotRouter)

app.get('/', auth, (req, res) => {
  // console.log(req.user);
  // User.findById(req.user);
  res.status(200).send('hola mundo');
});

app.listen(port, () => 
  console.log("App listening localhost:8000"));