const express = require("express");
const app = express();
const authenticateRouter = require("./api/routes/authenticate");

app.use("/authenticate", authenticateRouter)

module.exports = app;