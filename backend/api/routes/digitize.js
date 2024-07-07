const express = require("express");
const router = express.Router();
const digitizationController = require('../controllers/digitize');
const checkPostDigitization = require('../middleware/check-post-digitization');
const creerActe = require('../middleware/creer-acte');

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
 *     summary: extraire les informations d'un acte de naissance
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              - acte
 *            properties:
 *              acte:
 *                type: string
 *                format: binary
 *     responses:
 *      200:
 *        description: Les informations ont ete extraits avec succes
 *      422:
 *          description: Parametres invalides ou manquant
 *      500:
 *          description: Server Error
 */
router.post("/extract", upload.single('acte'), digitizationController.post_extract);


/**
 * @openapi
 * '/api/digitize/':
 *  post:
 *     tags:
 *     - Digitization
 *     summary: stocke les informations d'un acte de naissance sur le serveur
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - birthCertificate
 *            properties:
 *              region:
 *                  type: string
 *              departement:
 *                  type: string
 *              arrondissement:
 *                  type: string
 *              numeroAacte:
 *                  type: string
 *              nomEnfant:
 *                  type: string 
 *              dateNaissanceEnfant:
 *                  type: string 
 *              lieuNaissanceEnfant:
 *                  type: string
 *              sexe:
 *                  type: string
 *              nomPere:
 *                  type: string
 *              lieuNaissancePere:
 *                  type: string
 *              residencePere:
 *                  type: string
 *              professionPere:
 *                  type: string
 *              nomMere:
 *                  type: string 
 *              lieuNaissanceMere:
 *                  type: string
 *              dateNaissanceMere:
 *                  type: string
 *              residenceMere:
 *                  type: string
 *              professionMere:
 *                  type: string
 *              dresseLe:
 *                  type: string 
 *              surLaDeclarationDe1:
 *                  type: string
 *              surLaDeclarationDe2:
 *                  type: string
 *              parNous1:
 *                  type: string
 *              parNous2:
 *                  type: string 
 *              etatCivilCentreDe:
 *                  type: string
 *              assisteDe:
 *                  type: string
    
 *     responses:
 *      201:
 *        description: Acte de naissance numerisee avec succes
 *      422:
 *          description: Invalid or Missing Parameters 
 *      500:
 *          description: Server Error
 */
router.post("/", checkPostDigitization, creerActe, digitizationController.post_digitization);

module.exports = router;