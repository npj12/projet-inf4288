const express = require("express");
const router = express.Router();

router.get("/", (req, res, next)=>{
    res.status(200).json({
        message: "Fecthing all individual users"
    });
});

router.delete("/", (req, res, next)=>{
    res.status(200).json({
        message: "all individual users deleted"
    });
});

router.get("/:id", (req, res, next)=>{
    const id = req.params.id;
    res.status(200).json({
        message: "Fecthing a specific individual user"
    });
});

router.patch("/:id", (req, res, next)=>{
    const id = req.params.id;
    res.status(200).json({
        message: "individual user updated"
    });
});

router.delete("/:id", (req, res, next)=>{
    const id = req.params.id;
    res.status(200).json({
        message: "individual user deleted"
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