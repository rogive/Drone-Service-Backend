require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pilotRouter = require("./src/routes/pilot");
const mediaRouter = require("./src/routes/media");
const clientRouter = require("./src/routes/client");
const solicitudeRouter = require("./src/routes/solicitude");
const certificateRouter = require("./src/routes/certificate");
const serviceRouter = require("./src/routes/service");
const equipmentRouter = require("./src/routes/equipment");
const flightlogRouter = require("./src/routes/flightlog");
const otherRouter = require("./src/routes/other");
const { auth } = require("./src/utils/middlewares");

const db = require("./src/db");

const port = process.env.PORT || 8000;
const app = express();

db();
app.use(cors());
app.use(express.json());

app.use("/pilot", pilotRouter);
app.use("/media", mediaRouter);
app.use("/client", clientRouter);
app.use("/solicitudes", solicitudeRouter);
app.use("/certificates", certificateRouter);
app.use("/servicios", serviceRouter);
app.use("/equipments", equipmentRouter);
app.use("/flightlogs", flightlogRouter);
app.use("/others", otherRouter);

app.listen(port, () => console.log("App listening localhost:8000"));
