const { Client } = require('pg');
const { dbConfig, baseURL } = require("../constants");

exports.get_search = (req, res, next) => {
        const validKeys = ['region', 'departement', 'arrondissement', 'numeroActe', 'nomEnfant'];
        const client = new Client(dbConfig);
        client.connect()
            .then(() => {
                const conditions = [];
                const values = [];

                validKeys.forEach((key, index) => {
                    if (req.query[key] !== undefined && req.query[key].length > 0 ) {
                        conditions.push(`${key} ILIKE '%' || $${conditions.length + 1} || '%'`);
                        values.push(req.query[key]);
                    }
                });

                const query = `
                    SELECT *
                    FROM acte_de_naissance
                    ${conditions.length ? 'WHERE ' + conditions.join(' AND ') : ''}
                `;
            client.query(query, values)
                .then((resultat)=>{
                    resultat.rows.forEach(row => {
                        row.cheminversacte = `${baseURL}${row.cheminversacte}`;
                    });
                    const jsonResponse = {
                        nbActes: resultat.rowCount,
                        actes: resultat.rows
                    };    
                    console.log(jsonResponse);
                    return res.status(200).json(jsonResponse);
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
}