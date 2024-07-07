const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  ssl: process.env.IN_DEVELOPMENT ? null : {
    rejectUnauthorized: false
  },
  connectionString: process.env.DB_CONNECTION_STRING
};

const baseURL = process.env.IN_DEVELOPMENT ? 'http://localhost:3000/' : 'https://projet-inf4288.onrender.com/';

const coordinates_region = { x: 90, y: 48, width: 150, height: 20 }; 
const coordinates_departement = { x: 90, y: 92, width: 150, height: 17 }; 
const coordinates_arrondissement = { x: 90, y: 128, width: 150, height: 17 }; 
const coordinates_numero_acte = { x: 353, y: 176, width: 60, height: 21 }; 

const coordinates_nom_enfant = {x: 178, y: 216, width: 418, height: 25};
const coordinates_date_naissance_enfant = {x: 150, y: 240, width: 445, height: 25};
const coordinates_lieu_naissance_enfant = {x: 148, y: 265, width: 448, height: 25};
const coordinates_sex = {x: 183, y: 313, width: 410, height: 23};

const coordinates_nom_pere = {x: 133, y: 337, width: 450, height: 23};
const coordinates_lieu_naissance_pere = {x: 165, y: 361, width: 380, height: 22};
const coordinates_residence_pere = {x: 159, y: 384, width: 380, height: 23};
const coordinates_profession_pere = {x: 216, y: 410, width: 380, height: 23};

const coordinates_nom_mere = {x: 177, y: 433, width: 418, height: 22};
const coordinates_lieu_naissance_mere = {x: 164, y: 456, width: 430, height: 23};
const coordinates_date_naissance_mere = {x: 146, y: 481, width: 450, height: 23};
const coordinates_residence_mere = {x: 157, y: 504, width: 438, height: 23};
const coordinates_profession_mere = {x: 219, y: 528, width: 376, height: 23};

const coordinates_dresse_le = {x: 139, y: 550, width: 456, height: 23};
const coordinates_sur_la_declaration_de1 = {x: 196, y: 575, width: 399, height: 23};
const coordinates_sur_la_declaration_de2 =  {x: 95, y: 607, width: 500, height: 20};
const coordinates_par_nous1 = {x: 132, y: 654, width: 463, height: 17}; 
const coordinates_par_nous2 = {x: 92, y: 666, width: 365, height: 15};
const coordinates_etat_civil_centre_de = {x: 222, y: 678, width: 373, height: 16};
const coordinates_assiste_de = {x: 143, y: 703, width: 452, height: 17};

const birth_certificate_coordinates = {
  coordinates_region, coordinates_departement, coordinates_arrondissement, coordinates_numero_acte,
  coordinates_nom_enfant, coordinates_date_naissance_enfant, coordinates_lieu_naissance_enfant, coordinates_sex,
  coordinates_nom_pere, coordinates_lieu_naissance_pere, coordinates_residence_pere, coordinates_profession_pere,
  coordinates_nom_mere, coordinates_lieu_naissance_mere, coordinates_date_naissance_mere, coordinates_residence_mere, coordinates_profession_mere,
  coordinates_dresse_le, coordinates_sur_la_declaration_de1, coordinates_sur_la_declaration_de2, coordinates_par_nous1, coordinates_par_nous2, coordinates_etat_civil_centre_de, coordinates_assiste_de
}

const baseToBDFiles = `${__dirname}/bdFiles`;

module.exports = {
  emailRegex,
  dbConfig,
  baseURL,
  birth_certificate_coordinates,
  baseToBDFiles
}