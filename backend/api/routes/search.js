const express = require("express");
const router = express.Router();
const searchController = require('../controllers/search');


/**
 * @openapi
 * '/api/search':
 *  get:
 *     tags:
 *     - search
 *     summary: rechercher un acte de naissance
 *     parameters:
*           - in : query      
*             name: region
*             schema:
*                type: string
*                description: La region 
*           - in : query      
*             name: departement
*             schema:
*                type: string
*                description: Le departement
*           - in : query      
*             name: arrondissement
*             schema:
*                type: string
*                description: L'arrondissement 
*           - in : query      
*             name: nom
*             schema:
*                type: string
*                description: Le nom de l'enfant
 *     responses:
 *      200:
 *        description: Les resultats de cherche sont bien retournes
 *      500:
 *          description: Server Error
 */
router.get("/", searchController.get_search);

module.exports = router;