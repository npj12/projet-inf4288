const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');
const individualController = require('../controllers/individual');


/**
 * @openapi
 * '/api/user/individual':
 *  get:
 *     tags:
 *     - Individual
 *     summary: Get all individuals
 *     security:
 *      - bearerAuth: [] 
 *     responses:
 *      200:
 *        description: Fetched Successfully    
 *      401:
 *          description: Invalid Token  
 *      403:
 *          description: Operation not permitted       
 *      500:
 *        description: Server Error
 */
router.get("/", checkAuth, checkAdmin, individualController.get_all_individuals);

/*router.delete("/", (req, res, next)=>{
    res.status(200).json({
        message: "all individual users deleted"
    });
});*/

/**
 * @openapi
 * '/api/user/individual/{id}':
 *  get:
 *     tags:
 *     - Individual
 *     summary: Get a specific Individual
 *     security:
 *      - bearerAuth: [] 
 *     parameters:
 *      -   name: id
 *          in: path
 *          description: The id of the individual
 *          required: true 
 *     responses:
 *      200:
 *          description: Fetched Successfully
 *      401:
 *          description: Invalid Token
 *      403:
 *          description: Operation not permitted
 *      404:
 *          description: Agent Not Found
 *      422:
 *          description: Invalid individual id
 *      500:
 *          description: Server Error
 */
router.get("/:id", checkAuth, checkAdmin, individualController.get_individual);

/**
 * @openapi
 * '/api/user/individual/{id}':
 *  patch:
 *     tags:
 *      - Individual
 *     summary: Modify an individual
 *     parameters:
 *      -   name: id
 *          in: path
 *          description: The id of the individual
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
 *              
 *     responses:
 *      200:
 *          description: Modified successfuly
 *      401:
 *          description: Invalid Token
 *      404:
 *          description: Individual Not Found
 *      409:
 *          description: Login Already Exists
 *      422:
 *          description: Invalid or Missing Parameters 
 *      500:
 *          description: Server Error
 */
router.patch("/:id", checkAuth, individualController.patch_individual);

/**
 * @openapi
 * '/api/user/individual/{id}':
 *  delete:
 *     tags:
 *     - Individual
 *     summary: Delete Individual by Id
 *     parameters:
 *      -   name: id
 *          in: path
 *          description: The id of the Individual
 *          required: true 
 *     security:
 *      - bearerAuth: [] 
 *     responses:
 *      200:
 *        description: Agent removed successfuly
 *      401:
 *          description: Invalid Token
 *      403:
 *          description: Operation not permitted
 *      404:
 *        description: Agent not found
 *      422:
 *          description: Invalid id parameter 
 *      500:
 *          description: Server Error
 */
router.delete("/:id", checkAuth, checkAdmin, individualController.delete_individual);

/**
 * @openapi
 * '/api/user/individual/signup':
 *  post:
 *     tags:
 *     - Individual
 *     summary: Create an individual
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - login
 *              - password
 *            properties:
 *              name:
 *                type: string
 *                default: johndoe 
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
 *                default: johndoe
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      201:
 *        description: Individual successfuly created
 *      409:
 *          description: Login Already Exists
 *      422:
 *          description: Invalid or Missing Parameters 
 *      500:
 *          description: Server Error
 */
router.post("/signup", individualController.sign_up);


module.exports = router;