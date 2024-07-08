const { dbConfig, baseURL } = require("../constants");
const { Client } = require("pg");
const fs = require('fs');

exports.post_authenticate = (req, res, next)=>{
    if(req.file){
        // console.log(req.file.path);
        fs.unlinkSync(req.file.path);
        return res.status(200).json({
            pourcentageDeSimilarite: '80%',
            cheminVersFichierNumeriser: 'https://Un_chemin',
            estAuthentique: true
        })
    } else {
        const jsonResponse = {error:'Uploader un fichier dans le chanp \'acte\'', request_body: req.body};
        console.log(jsonResponse);
        return res.status(422).json(jsonResponse);
    }
}