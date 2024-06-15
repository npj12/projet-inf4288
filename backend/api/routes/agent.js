const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const agentController = require('../controllers/agent');

/**
 * @openapi
 * '/user/agent':
 *  get:
 *     tags:
 *     - Agent
 *     summary: Get all agent
 *     security:
 *      - bearerAuth: [] 
 *     responses:
 *      200:
 *        description: Fetched Successfully   
 *      401:
 *          description: Invalid Token          
 *      500:
 *        description: Server Error
 */
router.get("/", checkAuth, agentController.agents_get_all);

/**
 * @openapi
 * '/user/agent/region/{id}':
 *  get:
 *     tags:
 *     - Agent
 *     summary: Get all agent of a specific region
 *     security:
 *      - bearerAuth: [] 
 *     parameters:
 *      -   name: id
 *          in: path
 *          description: The id of the region
 *          required: true 
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      401:
 *          description: Invalid Token
 *      422:
 *        description: Invalid region id
 *      500:
 *        description: Server Error
 */
router.get("/region/:id", checkAuth, agentController.agents_get_all_agents_per_region);

/*router.delete("/", (req, res, next)=>{
    res.status(200).json({
        message: "all council officer users deleted"
    });
});*/

/**
 * @openapi
 * '/user/agent/{id}':
 *  get:
 *     tags:
 *     - Agent
 *     summary: Get a specific agent
 *     security:
 *      - bearerAuth: [] 
 *     parameters:
 *      -   name: id
 *          in: path
 *          description: The id of the agent
 *          required: true 
 *     responses:
 *      200:
 *          description: Fetched Successfully
 *      401:
 *          description: Invalid Token
 *      404:
 *          description: Agent Not Found
 *      422:
 *          description: Invalid Agent id
 *      500:
 *          description: Server Error
 */
router.get("/:id", checkAuth, agentController.agents_get_agent);

/**
 * @openapi
 * '/user/agent/{id}':
 *  patch:
 *     tags:
 *      - Agent
 *     summary: Modify an agent
 *     parameters:
 *      -   name: id
 *          in: path
 *          description: The id of the agent
 *          required: true 
 *     security:
 *      - bearerAuth: [] 
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - oldPassword
 *            properties:
 *              name:
 *                type: string
 *                default: null
 *              surname:
 *                type: string
 *                default: null
 *              email:
 *                type: string
 *                default: null
 *              phoneNumber:
 *                type: string
 *                default: null
 *              login:
 *                type: string
 *                default: null
 *              oldPassword:
 *                type: string
 *                default: ''
 *              newPassword:
 *                type: string
 *                default: null
 *              isAdmin:
 *                type: boolean
 *                default: null
 *              cityHallId:
 *                type: number
 *                default: 
 *              
 *     responses:
 *      200:
 *          description: Modified successfuly
 *      401:
 *          description: Invalid Token
 *      404:
 *          description: Agent Not Found
 *      409:
 *          description: Login Already Exists
 *      422:
 *          description: Invalid or Missing Parameters 
 *      500:
 *          description: Server Error
 */
router.patch("/:id", checkAuth, agentController.agents_patch_agent);

/**
 * @openapi
 * '/user/agent/{id}':
 *  delete:
 *     tags:
 *     - Agent
 *     summary: Delete agent by Id
 *     parameters:
 *      -   name: id
 *          in: path
 *          description: The id of the agent
 *          required: true 
 *     security:
 *      - bearerAuth: [] 
 *     responses:
 *      200:
 *        description: Agent removed successfuly
 *      401:
 *          description: Invalid Token
 *      404:
 *        description: Agent not found
 *      422:
 *          description: Invalid id parameter 
 *      500:
 *          description: Server Error
 */
router.delete("/:id", checkAuth, agentController.agents_delete_agent);   

/**
 * @openapi
 * '/user/agent/signup':
 *  post:
 *     tags:
 *     - Agent
 *     summary: Create an agent
 *     security:
 *      - bearerAuth: [] 
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - name
 *              - password
 *              - cityHallId
 *            properties:
 *              name:
 *                type: string
 *                default: johndoe 
 *              surname:
 *                type: string
 *                default: null 
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              phoneNumber:
 *                type: string
 *                default: null
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *              isAdmin:
 *                type: boolean
 *                default: false
 *              cityHallId:
 *                  type: nulber
 *                  default: 2
 *     responses:
 *      201:
 *        description: Agent successfuly created
 *      409:
 *          description: email (it's the default login) Already Exists
 *      422:
 *          description: Invalid or Missing Parameters 
 *      500:
 *          description: Server Error
 */
router.post("/signup", checkAuth, agentController.agents_signup);

/**
 * @openapi
 * '/user/agent/login':
 *  post:
 *     tags:
 *     - Agent
 *     summary: Sign in as an Agent
 *     security:
 *      - bearerAuth: [] 
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
 *          description: Invalid Token or invalid credentials
 *      422:
 *          description: Missing Parameters 
 *      500:
 *          description: Server Error
 */
router.post("/login", agentController.agents_login);

module.exports = router;