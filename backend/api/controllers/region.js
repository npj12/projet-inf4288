const { Client } = require('pg');
const { dbConfig } = require("../constants");


exports.getAllRegions = (req, res, next)=>{
    const client = new Client(dbConfig);
    client.connect()
        .then(()=>{
            const query = 'SELECT * FROM region';
            client.query(query)
                .then(result => {
                    const jsonResponse = result.rows;
                    console.log(jsonResponse);
                    return res.status(200).json(jsonResponse);
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