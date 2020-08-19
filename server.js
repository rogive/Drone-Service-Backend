const express = require("express");
const app = express();
const Pilot = require("./src/models/pilot.model");
app.use(express.json());
const db = require("./src/db");
const pilotRouter = require("./src/routes/pilot")

db();
// app.use(cors());
app.use(express.json());

app.use("/pilots", pilotRouter)

app.listen(8000, () => console.log("App listening localhost:8000"));