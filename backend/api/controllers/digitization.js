const { Client } = require('pg');
const { dbConfig } = require("../constants");
const { getUUID } = require('../utils/get-uuid');
//const { createActe } = require('../utils/create-pdf');


exports.post_digitization = (req, res, next)=>{
    const { 
            birthDate, name, surname, birthPlace,region, sex,
            fatherName, fatherBirthDate, fatherBirthPlace, fatherProfession, fatherResidence, 
            motherName, motherBirthDate, motherBirthPlace, motherProfession, motherResidence, 
            drawnOn, declarantName, declarationAttesterName, civilStatusRegistrar
        } = req.body;
    const client = new Client(dbConfig);
    const agentId = req.userData.id;
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
                createActe(bcID, surname, name, birthDate, region, birthPlace, sex,
                    fatherName, fatherBirthDate, fatherBirthPlace, fatherProfession, fatherResidence,
                    motherName, motherBirthDate, motherBirthPlace, motherProfession, motherResidence,
                    drawnOn, declarantName, declarationAttesterName, civilStatusRegistrar, filpePath);
                client.query('UPDATE birth_certificate SET bc_file_path=$1 WHERE bc_uid=$2', [filpePath, bcID])
                    .then(()=>{
                        const jsonResponse = {message:"Birth certificate numerize successfully", bcID: bcID};
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

exports.post_birth_certificate = (req, res, next)=>{
    const client = new Client(dbConfig);
    const agentId = req.userData.id;
    client.connect()
        .then(() => {
            client.query('UPDATE birth_certificate SET bc_file_path=$1', [req.file.path])
                .then(()=>{
                    const jsonResponse = {
                        error: 'birth certtificate updated successfully'
                    };
                    console.log(jsonResponse);
                    res.status(200).json(jsonResponse);
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
}