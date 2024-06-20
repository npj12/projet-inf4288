const express = require("express");
const router = express.Router();
const cityHallController = require('../controllers/city-hall');

/**
 * @openapi
 * '/api/city-hall':
 *  get:
 *     tags:
 *     - City Hall
 *     summary: Get the list of city halls
 *     responses:
 *      200:
 *        description: Fetched Successfully  
 *      500:
 *          description: Server Error
 */
router.get('/', cityHallController.getAllCityHalls);


module.exports = router;