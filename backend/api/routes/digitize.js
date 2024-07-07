const express = require("express");
const router = express.Router();
const digitizationController = require('../controllers/digitize');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/digitize/');
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



/**
 * @openapi
 * '/api/digitize/extract':
 *  post:
 *     tags:
 *     - Digitization
 *     summary: Digitize a birth certificate
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - birthCertificate
 *            properties:
 *              birthCertificate:
 *                type: file
 *     responses:
 *      201:
 *        description: Birth certificate successfuly digitize
 *      422:
 *          description: Invalid or Missing Parameters 
 *      500:
 *          description: Server Error
 */
router.post("/extract", upload.single('birthCertificate'), digitizationController.post_extract);


/**
 * @openapi
 * '/api/digitize/extract':
 *  post:
 *     tags:
 *     - Digitization
 *     summary: Digitize a birth certificate
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - birthCertificate
 *            properties:
 *              birthDate:
 *                type: file
 *                default: 01/01/1900 
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
router.post("/", digitizationController.post_digitization);

module.exports = router;