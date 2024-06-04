const express = require("express");
const router = express.Router();

router.get("/", (req, res, next)=>{
    res.status(200).json({
        message: "Fetching all digitization"
    });
});

router.post("/", (req, res, next)=>{
    res.status(201).json({
        message: "Digitization made successfully"
    });
});

router.delete("/", (req, res, next)=>{
    res.status(200).json({
        message: "Digitizations deleted successfully"
    });
});

router.get("/:id", (req, res, next)=>{
    const id = req.params.id;
    res.status(200).json({
        message: "Fetch a specific digitization"
    });
});

router.delete("/:id", (req, res, next)=>{
    const id = req.params.id;
    res.status(200).json({
        message: "Digitization deleted successfully"
    });
});

module.exports = router;