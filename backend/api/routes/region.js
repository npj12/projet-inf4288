const express = require("express");
const router = express.Router();
const regionController = require('../controllers/region');

/**
 * @openapi
 * '/api/region':
 *  get:
 *     tags:
 *     - Region
 *     summary: Get the list of regions
 *     responses:
 *      200:
 *        description: Fetched Successfully  
 */
router.get('/', regionController.getAllRegions);


module.exports = router;