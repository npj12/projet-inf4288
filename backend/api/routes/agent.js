const express = require("express");
const router = express.Router();

router.get("/", (req, res, next)=>{
    res.status(200).json({
        message: "Fecthing all council officer users"
    });
});

router.delete("/", (req, res, next)=>{
    res.status(200).json({
        message: "all council officer users deleted"
    });
});

router.get("/:id", (req, res, next)=>{
    const id = req.params.id;
    res.status(200).json({
        message: "Fecthing a specific council officer user"
    });
});

router.patch("/:id", (req, res, next)=>{
    const id = req.params.id;
    res.status(200).json({
        message: "council officer user updated"
    });
});

router.delete("/:id", (req, res, next)=>{
    const id = req.params.id;
    res.status(200).json({
        message: "council officer user deleted"
    });
});

router.post("/signup", (req, res, next)=>{
    res.status(200).json({
        message: "sign up"
    });
});

router.post("/login", (req, res, next)=>{
    res.status(200).json({
        message: "login"
    });
});

module.exports = router;