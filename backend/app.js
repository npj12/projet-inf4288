const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

const authenticateRouter = require("./api/routes/authenticate");
const digitizationRouter = require("./api/routes/digitization");
const userRouter = require("./api/routes/user");

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/authenticate", authenticateRouter);
app.use("/digitization", digitizationRouter);
app.use("/user", userRouter);

app.use((req, res, next)=>{
    const error = new Error("Not found...");
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500)
        .json({
            error: {
                message: err.message
            }
        });
})

module.exports = app;