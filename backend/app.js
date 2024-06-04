const express = require("express");
const app = express();
const authenticateRouter = require("./api/routes/authenticate");
const digitizationRouter = require("./api/routes/digitization");

app.use("/authenticate", authenticateRouter);
app.use("/digitization", digitizationRouter);
app.use((req, res, next)=>{
    res.status(404).json({
        error: "Not Found..."
    });
});

module.exports = app;