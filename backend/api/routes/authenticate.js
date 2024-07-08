const express = require("express");
const router = express.Router();
const authenticateController = require("../controllers/authenticate");
const digitizationController = require("../controllers/digitize");

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/authenticate/');
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname.replaceAll(' ', '_'));
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
 * '/api/authenticate/':
 *  post:
 *     tags:
 *     - Authenticate
 *     summary: Verifier l'authenticite d'un acte de naissance
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              chemin:
 *                type: string
 *              region:
 *                  type: string
 *              departement:
 *                  type: string
 *              arrondissement:
 *                  type: string
 *              numeroActe:
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
 *      200:
 *        description: La comparaison s'est bien passee
 *      422:
 *          description: Parametres invalides ou manquant
 *      500:
 *          description: Server Error
 */
router.post("/", authenticateController.post_authenticate);

/**
 * @openapi
 * '/api/authenticate/extract':
 *  post:
 *     tags:
 *     - Authenticate
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

module.exports = router;