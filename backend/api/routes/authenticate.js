const express = require("express");
const router = express.Router();
const authenticateController = require("../controllers/authenticate");

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
router.post("/", upload.single('birthCertificate'), authenticateController.post_authenticate);

module.exports = router;