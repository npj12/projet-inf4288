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

router.get("/:bcID", checkAuth, checkIndividual, checkAuthenticateByBcID, authenticateController.post_authenticate_by_bcid);

router.post("/", checkAuth, checkIndividual, upload.single('birthCertificate'), authenticateController.post_authenticate_by_file);

router.get("/:id", (req, res, next) =>{
    const id = req.params.id;
    res.status(200).json({
        message: `Fetching authenticate. Id: '${id}'`
    });
});

module.exports = router;