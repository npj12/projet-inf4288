const express = require("express");
const router = express.Router();
const digitizationController = require('../controllers/digitization');
const checkPostdigitization = require('../middleware/check-post-digitization');
const checkPostBirthCertificate = require('../middleware/check-post-birth-certificate');
const checkAuth = require('../middleware/check-auth');
const checkAgent = require('../middleware/check-agent');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/digitize/');
    },
    filename: (req, file, cb) =>{
        cb(null, new Date().toISOString() + '_' + file.originalname);
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
        message: "Fetching all digitization"
    });
});

/**
 * @openapi
 * '/api/digitization':
 *  post:
 *     tags:
 *     - Digitization
 *     summary: Digitize a birth certificate
 *     security:
 *      - bearerAuth: [] 
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - birthDate
 *              - name
 *              - surname
 *              - fatherName
 *              - motherName
 *              - birthPlace
 *              - sex
 *              - region
 *            properties:
 *              birthDate:
 *                type: date
 *                default: 01/01/1900 
 *              name:
 *                type: string
 *                default: john
 *              surname:
 *                type: string
 *                default: doe 
 *              fatherName:
 *                type: string
 *                default: johndoe father
 *              motherName:
 *                type: string
 *                default: johndoe mother
 *              birthPlace:
 *                type: string
 *                default: Yaoundé 
 *              sex:
 *                type: string
 *                default: M 
 *              region:
 *                type: string
 *                default: center
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
router.post("/", checkAuth, checkAgent,  checkPostdigitization, digitizationController.post_digitization);

/**
 * @openapi
 * '/api/digitization/birth-certificate':
 *  patch:
 *     tags:
 *     - Digitization
 *     summary: Digitize a birth certificate by adding the generate birth certificate
 *     security:
 *      - bearerAuth: [] 
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              bcID
 *            properties:
 *              bcID:
 *                type: string
 *                default: null
 *              birthCertificate: 
 *                  type: file
 *     responses:
 *      200:
 *        description: Birth certificate successfuly digitize
 *      401:
 *          description: Invalid Token or invalid credentials
 *      403:
 *          description: Operation not permitted
 *      422:
 *          description: Invalid or Missing Parameter
 *      500:
 *          description: Server Error
 */
router.patch("/birth-certificate", checkAuth, checkAgent, upload.single('birthCertificate'), checkPostBirthCertificate, digitizationController.post_birth_certificate);

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