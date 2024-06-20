const { Client } = require('pg');
const { dbConfig } = require("../constants");
const { deleteFile } = require('../utils/delete-file');

module.exports = (req, res, next) => {
    const { birthDate, name, surname, motherName, fatherName, birthPlace, sex, region} = req.body;
    const filePath = req.file ? req.file.path : null;
    if(!req.file && false){
        const jsonResponse = {
            error: 'Provide the file'
        };
        console.log(jsonResponse);
        return res.status(422).json(jsonResponse);
    } else if(birthDate === undefined){
        deleteFile(filePath);
        const jsonResponse = {error:"'birthDate' is a required parameter", request_body: req.body};
        console.log(jsonResponse);
        return res.status(422).json(jsonResponse);
    } else if(name === undefined){
        deleteFile(filePath);
        const jsonResponse = {error:"'name' is a required parameter", request_body: req.body};
        console.log(jsonResponse);
        return res.status(422).json(jsonResponse);
    }  else if(surname === undefined){
        deleteFile(filePath);
        const jsonResponse = {error:"'surname' is a required parameter", request_body: req.body};
        console.log(jsonResponse);
        return res.status(422).json(jsonResponse);
    } else if(motherName === undefined){
        deleteFile(filePath);
        const jsonResponse = {error:"'motherName' is a required parameter", request_body: req.body};
        console.log(jsonResponse);
        return res.status(422).json(jsonResponse);
    } else if(fatherName === undefined){
        deleteFile(filePath);
        const jsonResponse = {error:"'fatherName' is a required parameter", request_body: req.body};
        console.log(jsonResponse);
        return res.status(422).json(jsonResponse);
    } else if(birthPlace === undefined){
        deleteFile(filePath);
        const jsonResponse = {error:"'birthPlace' is a required parameter", request_body: req.body};
        console.log(jsonResponse);
        return res.status(422).json(jsonResponse);
    } else if(sex === undefined){
        deleteFile(filePath);
        const jsonResponse = {error:"'sex' is a required parameter", request_body: req.body};
        console.log(jsonResponse);
        return res.status(422).json(jsonResponse);
    }  else if(sex && sex.length != 1){
        deleteFile(filePath);
        const jsonResponse = {error:"the value of 'sex' parameter must be 'F' or 'M'", request_body: req.body};
        console.log(jsonResponse);
        return res.status(422).json(jsonResponse);
    }  else if(region === undefined){
        deleteFile(filePath);
        const jsonResponse = {error:"'region' is a required parameter", request_body: req.body};
        console.log(jsonResponse);
        return res.status(422).json(jsonResponse);
    } else {
        return next();
    }
}