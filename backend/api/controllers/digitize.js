const { Client } = require('pg');
const { dbConfig, baseURL } = require("../constants");
const { extract } = require('../utils/extract-from-birthcertificate.js');
const { addToDict } = require('../utils/test-auto-correct.js');


exports.post_digitization = async (req, res, next)=>{
        const body = req.body;
        const client = new Client(dbConfig);
        client.connect()
            .then(() => {
                const query = 'INSERT INTO acte_de_naissance \
                    VALUES\
                    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)';
            const values = [
                body['region'], body['departement'], body['arrondissement'], body['numeroActe'],
                body['nomEnfant'], body['dateNaissanceEnfant'], body['lieuNaissanceEnfant'], body['sexe'],
                body['nomPere'], body['lieuNaissancePere'], body['residencePere'], body['professionPere'],
                body['nomMere'], body['lieuNaissanceMere'], body['dateNaissanceMere'], body['residenceMere'], body['professionMere'],
                body['dresseLe'], body['surLaDeclarationDe1'], body['surLaDeclarationDe2'], body['parNous1'], body['parNous2'], body['etatCivilCentreDe'], body['assisteDe'], body['chemin']
            ];
            client.query(query, values)
                .then(()=>{
                    const jsonResponse = {
                        message: 'Acte de naissance numerise avec success'
                    };    
                    console.log(jsonResponse);
                    return res.status(201).json(jsonResponse);
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
};


exports.post_extract = async (req, res, next)=>{
    if(req.file){
        const informations = await extract(req.file.path);
        res.status(200).json(informations);
    } else {
        const message = 'Uploader un fichier PDF dans le champ \'acte\'';
        console.log(message);
        return res.status(422).json({
            error: message
        });
    }
}