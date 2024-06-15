const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const agentController = require('../controllers/agent');


router.get("/", agentController.agents_get_all);

/*router.delete("/", (req, res, next)=>{
    res.status(200).json({
        message: "all council officer users deleted"
    });
});*/

router.get("/:id", agentController.agents_get_agent);

router.patch("/:id", checkAuth, agentController.agents_patch_agent);

router.delete("/:id", checkAuth, agentController.agents_delete_agent);   

router.post("/signup", checkAuth, agentController.agents_signup);

router.post("/login", agentController.agents_login);

module.exports = router;