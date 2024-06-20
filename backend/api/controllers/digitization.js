const { Client } = require('pg');
const { dbConfig } = require("../constants");
const { getUUID } = require('../utils/get-uuid');


exports.post_digitization = (req, res, next)=>{
    const { birthDate, name, surname, fatherName, motherName,  birthPlace, sex, agentId, region} = req.body;
    const client = new Client(dbConfig);
    client.connect()
        .then(() => {
            const bcID = getUUID(region);
            const query = 'INSERT INTO birth_certificate \
            (bc_uid, birth_date, name, surname, father_full_name, \
                mother_full_name, birth_place, sex, bc_file_path, agent_id)\
                VALUES\
                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
        const values = [
            bcID,
            birthDate,
            name,
            surname,
            fatherName,
            motherName,
            birthPlace,
            sex,
            req.file.filename,
            agentId
        ];
        client.query(query, values)
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
};