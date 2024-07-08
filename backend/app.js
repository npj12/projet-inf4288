const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const swaggerDocs = require("./swagger.js");
const cors = require('cors');

require('./create_bd.js');

const authenticateRouter = require("./api/routes/authenticate");
const digitizationRouter = require("./api/routes/digitize");
const searchRouter = require("./api/routes/search");

app.disable('x-powered-by'); 
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./uploads'))

app.use("/api/authenticate", authenticateRouter);
app.use("/api/digitize", digitizationRouter);
app.use("/api/search", searchRouter);
swaggerDocs(app);

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