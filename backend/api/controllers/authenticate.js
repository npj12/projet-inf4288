const { dbConfig, baseURL } = require("../constants");
const { Client } = require("pg");
const fs = require('fs');
const { importLeven } = require('../utils/test-auto-correct');
exports.post_authenticate = async (req, res, next)=>{
    if(req.file){
        const client = new Client(dbConfig);
        client.connect()
            .then(() => {
                const query = 'SELECT * FROM acte_de_naissance';
                client.query(query)
                .then(async (resultat)=>{
                    let acteNumerise = undefined;
                    resultat.rows.forEach(row => {
                        console.log(req.file.path.replaceAll('authenticate', 'digitize'), row.cheminversacte);
                        if(req.file.path.replaceAll('authenticate', 'digitize') == row.cheminversacte){
                            acteNumerise = row;
                        }
                    }); 
                    if(acteNumerise == undefined){
                        jsonResponse = {
                            error: 'Cet Acte n\'a pas encore ete numerise'
                        };
                        console.log(jsonResponse);
                        return res.status(422).json(jsonResponse);
                    }
                    
                    fs.unlinkSync(req.file.path);
                    const diffence = await diff(req.body, acteNumerise);
                    const pourcentageDeSimilarite = 100 - diffence.total; 
                    return res.status(200).json({
                        pourcentageDeSimilarite: `${pourcentageDeSimilarite}%`,
                        cheminVersFichierNumeriser: `${baseURL}${acteNumerise.cheminversacte}`,
                        estAuthentique: pourcentageDeSimilarite >= 80,
                        diffence
                    })
                })
                .catch(error=>{ 
                    const jsonResponse = {
                        error: error
                    };
                    console.log(jsonResponse);
                    return res.status(500).json(jsonResponse);
                });
            })
            .catch(error=>{ 
                const jsonResponse = {
                    error: error
                };
                console.log(jsonResponse);
                return res.status(500).json(jsonResponse);
            });
        console.log(req.file);
    } else {
        const jsonResponse = {error:'Uploader un fichier dans le chanp \'acte\'', request_body: req.body};
        console.log(jsonResponse);
        return res.status(422).json(jsonResponse);
    }
}

let diff = async (body, acteNumerise)=>{
    const leven = await importLeven();
    let attributes = [
        "region", "departement", "arrondissement", "numeroActe", 
        "nomEnfant", "dateNaissanceEnfant", "lieuNaissanceEnfant", "sexe", 
        "nomPere", "lieuNaissancePere", "residencePere", "professionPere",
        "nomMere", "lieuNaissanceMere", "dateNaissanceMere", "residenceMere", "professionMere", 
        "dresseLe", "surLaDeclarationDe1", "surLaDeclarationDe2", "parNous1", "parNous2", "etatCivilCentreDe", "assisteDe"
    ];

    let pourcentageDeDifference = {};
    let diffence, sommeDifference=0;
    attributes.forEach(attribut => {
        diffence = leven(body[attribut], acteNumerise[attribut.toLowerCase()]);
        sommeDifference += diffence;
        pourcentageDeDifference[attribut] = diffence; 
    });

    pourcentageDeDifference['total'] = (sommeDifference/attributes.length)*100;
    return pourcentageDeDifference;
}