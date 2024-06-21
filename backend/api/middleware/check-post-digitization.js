const { Client } = require('pg');
const { dbConfig } = require("../constants");
const { deleteFile } = require('../utils/delete-file');

module.exports = (req, res, next) => {
    const params = [
        'birthDate', 'name', 'surname', 'birthPlace', 'region', 'sex',
        'fatherName', 'fatherBirthDate', 'fatherBirthPlace', 'fatherProfession', 'fatherResidence',
        'motherName', 'motherBirthDate', 'motherBirthPlace', 'motherProfession', 'motherResidence',
        'drawnOn', 'declarantName', 'declarationAttesterName', 'civilStatusRegistrar'
    ];

    const undefinedVars = [];
    params.forEach(param => {
        if (req.body[param] === undefined) {
            undefinedVars.push(param);
        }
    });
    
    if (undefinedVars.length > 0) {
        const jsonResponse = {error:`The following parameters are required: ${undefinedVars.join(', ')}`, request_body: req.body};
        console.log(jsonResponse);
        return res.status(422).json(jsonResponse);
    } else {
        if(req.body.sex.length != 1){
            const jsonResponse = {error:"the value of 'sex' parameter must be 'F' or 'M'", request_body: req.body};
            console.log(jsonResponse);
            return res.status(422).json(jsonResponse);
        } else {
            return next();
        }
    }
}