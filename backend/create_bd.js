const { Client } = require('pg');
const { dbConfig } = require("./api/constants");


const client = new Client(dbConfig);
client.connect()
            .then(() => {
                const query = `DROP TABLE IF EXISTS acte_de_naissance;
                                CREATE TABLE acte_de_naissance (
    region VARCHAR(255),
    departement VARCHAR(255),
    arrondissement VARCHAR(255),
    numeroActe VARCHAR(255),
    nomEnfant VARCHAR(255),
    dateNaissanceEnfant VARCHAR(255),
    lieuNaissanceEnfant VARCHAR(255),
    sexe VARCHAR(255),
    nomPere VARCHAR(255),
    lieuNaissancePere VARCHAR(255),
    residencePere VARCHAR(255),
    professionPere VARCHAR(255),
    nomMere VARCHAR(255),
    lieuNaissanceMere VARCHAR(255),
    dateNaissanceMere VARCHAR(255),
    residenceMere VARCHAR(255),
    professionMere VARCHAR(255),
    dresseLe VARCHAR(255),
    surLaDeclarationDe1 VARCHAR(255),
    surLaDeclarationDe2 VARCHAR(255),
    parNous1 VARCHAR(255),
    parNous2 VARCHAR(255),
    etatCivilCentreDe VARCHAR(255),
    assisteDe VARCHAR(255),
    cheminVersActe VARCHAR(255)
);
`;
            client.query(query, values)
                .then((resultat)=>{
                    console.log('Base de donnee cree');
                })
                .catch(error=>{ 
                    const jsonResponse = {
                        error: error
                    };
                    console.log(jsonResponse);
                });
            })
            .catch(error=>{ 
                const jsonResponse = {
                    error: error
                };
                console.log(jsonResponse);
            });