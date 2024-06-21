const express = require("express");
const router = express.Router();
const authenticateController = require("../controllers/authenticate")
const checkAuth = require('../middleware/check-auth');
const checkIndividual = require('../middleware/check-individual');
const checkAuthenticateByBcID = require('../middleware/check-authenticate-by-id');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/authenticate/');
    },
    filename: (req, file, cb) =>{
        cb(null, new Date().toISOString() + '_' + file.originalname.replaceAll(' ', '_'));
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'application/pdf')
        cb(null, true);
    else
        cb(new Error('Provide a PDF file'), false);
}
const upload = multer({
    storage: storage, 
    limits: {
        fileSize:   5 * 1024 * 1024 // 5Mo
    },
    fileFilter: fileFilter
});

router.get("/", (req, res, next)=>{
    res.status(200).json({
        message: "Fecthing all authenticates"
    });
});

/**
 * @openapi
 * '/api/authenticate/{bcID}':
 *  get:
 *     tags:
 *     - Authenticate
 *     summary: Authenticate a birth certificate by his ID
 *     security:
 *      - bearerAuth: [] 
 *     parameters:
 *      -   name: bcID
 *          in: path
 *          description: The birth certificate id 
 *          required: true 
 *     responses:
 *      200:
 *          description: Fetched Successfully
 *      401:
 *          description: Invalid Token
 *      403:
 *          description: Operation not permitted
 *      422:
 *          description: Invalid individual id
 *      500:
 *          description: Server Error
 */
router.get("/:bcID", checkAuth, checkIndividual, checkAuthenticateByBcID, authenticateController.post_authenticate_by_bcid);

/**
 * @openapi
 * /api/authenticate:
 *  post:
 *     tags:
 *     - Authenticate
 *     summary: Authenticate a birth certificate with a physical copy
 *     security:
 *      - bearerAuth: [] 
 *     requestBody:
 *      required: true
 *     responses:
 *      201:
 *        description: Birth certificate successfuly digitize
 *      401:
 *          description: Invalid Token or invalid credentials
 *      403:
 *          description: Operation not permitted
 *      422:
 *          description: Invalid or Missing Parameters 
 *      500:
 *          description: Server Error
 */
router.post("/", checkAuth, checkIndividual, upload.single('birthCertificate'), authenticateController.post_authenticate_by_file);

router.get("/:id", (req, res, next) =>{
    const id = req.params.id;
    res.status(200).json({
        message: `Fetching authenticate. Id: '${id}'`
    });
});

module.exports = router;