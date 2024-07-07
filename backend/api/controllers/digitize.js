const { Client } = require('pg');
const { dbConfig, baseURL } = require("../constants");
const getUUID = require('../utils/get-uuid');
const { extract } = require('../utils/extract-from-birthcertificate.js');
// const { createActe } = require('../utils/create-pdf');


exports.post_digitization = async (req, res, next)=>{
        const { 
            region, departement, arrondissement, numeroActe,
            nomEnfant, dateNaissanceEnfant, lieuNaissanceEnfant, sexe,
            nomPere, lieuNaissancePere, residencePere, professionPere,
            nomMere, lieuNaissanceMere, dateNaissanceMere, residenceMere, professionMere,
            dresseLe, surLaDeclarationDe1, surLaDeclarationDe2, parNous1, parNous2, etatCivilCentreDe, assisteDe
        } = req.body;
        return res.status(200).json({});
        const client = new Client(dbConfig);
        client.connect()
            .then(() => {
                const bcID = getUUID(region);
                const query = 'INSERT INTO birth_certificate \
                    (bc_uid, birth_date, name, surname, birth_place, sex,\
                        father_name, father_birth_date , father_birth_place, father_profession, father_residence,\
                        mother_name, mother_birth_date , mother_birth_place, mother_profession, mother_residence,\
                        drawn_on, declarant_name, declaration_attester_name, civil_status_registrar, \
                        agent_id)\
                    VALUES\
                    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)';
            const values = [
                bcID,
                birthDate,
                name,
                surname,
                birthPlace,
                sex,
                fatherName, fatherBirthDate, fatherBirthPlace, fatherProfession, fatherResidence,
                motherName, motherBirthDate, motherBirthPlace, motherProfession, motherResidence,
                drawnOn, declarantName, declarationAttesterName, civilStatusRegistrar, agentId
            ];
            client.query(query, values)
                .then(()=>{
                    const filpePath = 'uploads/digitize/' + new Date().toISOString() + '.pdf';
                    // createActe(bcID, surname, name, birthDate, region, birthPlace, sex,
                    //     fatherName, fatherBirthDate, fatherBirthPlace, fatherProfession, fatherResidence,
                    //     motherName, motherBirthDate, motherBirthPlace, motherProfession, motherResidence,
                    //     drawnOn, declarantName, declarationAttesterName, civilStatusRegistrar, filpePath);
                    client.query('UPDATE birth_certificate SET bc_file_path=$1 WHERE bc_uid=$2', [filpePath, bcID])
                        .then(()=>{
                            const jsonResponse = {message:"Birth certificate numerize successfully", bcID:bcID, birthCertificateLocation: baseURL + filpePath.substring('uploads/'.length)};
                            console.log(jsonResponse);
                            res.status(201).json(jsonResponse);
                            client.end()
                                .catch(error=>{ 
                                    const jsonResponse = {
                                    error: error
                                }
                                console.log(jsonResponse)
                                res.status(500).json(jsonResponse) 
                            });
                        })
                        .catch(error=>{ 
                            const jsonResponse = {
                                error: error
                            };
                            console.log(jsonResponse);
                            res.status(500).json(jsonResponse);
                        });
                    
                        
                })
                .catch(error=>{ 
                    const jsonResponse = {
                        error: error
                    };
                    console.log(jsonResponse);
                    res.status(500).json(jsonResponse);
                });
            })
            .catch(error=>{ 
                const jsonResponse = {
                    error: error
                };
                console.log(jsonResponse);
                res.status(500).json(jsonResponse);
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