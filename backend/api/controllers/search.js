const { Client } = require('pg');
const { dbConfig, baseURL } = require("../constants");

exports.get_search = (req, res, next) => {
    const { region, departement, arrondissement, numeroActe, nom } = req.query;
    const client = new Client(dbConfig);
        client.connect()
            .then(() => {
                const values = [region, departement, arrondissement, numeroActe, nom].map(elt => elt==undefined? '':elt);
                const query = `
                    SELECT *
                    FROM acte_de_naissance
                    WHERE region ILIKE '%' || $1 || '%'
                    AND departement ILIKE '%' || $2 || '%'
                    AND arrondissement ILIKE '%' || $3 || '%'
                    AND numeroActe ILIKE '%' || $4 || '%'
                    AND nomEnfant ILIKE '%' || $5 || '%';
                `;
            client.query(query, values)
                .then((resultat)=>{
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