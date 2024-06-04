const express = require("express");
const router = express.Router();
const agentRouter = require("./agent");
const individualRouter = require("./individual");

router.use("/agent", agentRouter);
router.use("/individual", individualRouter);

router.get("/", (req, res, next)=>{
    res.status(200).json({
        message: "Fecthing all users (agents and individuals)"
    });
});

module.exports = router;