const express = require("express");
const router = express.Router();
const agentRouter = require("./agent");
const individualRouter = require("./individual");
const userController = require('../controllers/user');

router.use("/agent", agentRouter);
router.use("/individual", individualRouter);

router.get("/", (req, res, next)=>{
    res.status(200).json({
        message: "Fecthing all users (agents and individuals)"
    });
});

/**
 * @openapi
 * '/api/user/login':
 *  post:
 *     tags:
 *     - User
 *     summary: Sign in as an user(agent, individual)
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - login
 *              - password
 *            properties:
 *              login:
 *                type: string
 *                default: johndoe 
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      200:
 *        description: login successfuly
 *      401:
 *          description: Invalid credentials
 *      422:
 *          description: Missing Parameters 
 *      500:
 *          description: Server Error
 */
router.post("/login", userController.login);
module.exports = router;