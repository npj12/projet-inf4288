const express = require("express");
const router = express.Router();
const authenticateController = require("../controllers/authenticate");

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
 *        multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              - acte
 *            properties:
 *              acte:
 *                type: string
 *                format: binary
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
router.post("/", upload.single('acte'), authenticateController.post_authenticate);

module.exports = router;