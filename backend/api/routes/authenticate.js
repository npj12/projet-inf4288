const express = require("express");
const router = express.Router();

router.get("/", (req, res, next)=>{
    res.status(200).json({
        message: "Fecthing all authenticates"
    });
});

router.post("/",  (req, res, next)=>{
    res.status(201).json({
        message: "New authenticade made"
    });
});

router.get("/:id", (req, res, next) =>{
    const id = req.params.id;
    res.status(200).json({
        message: `Fetching authenticate. Id: '${id}'`
    });
});

module.exports = router;