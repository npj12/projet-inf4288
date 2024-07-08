const {correct, correctNom} = require('./utils/test-auto-correct');

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

const baseToBDFiles = `${__dirname}/static/bdFiles`;
const birthCertificateTemplatePath = `${__dirname}/static/template_acte.pdf`;
const pathToCreatedBirthCertificate = `${__dirname}/static/digirizedBirthCertificate`;

const lettresMiniscules = 'abcdefghijklmnopqrstuvwxyz';
const lettresMajuscules = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lettres = `${lettresMiniscules}${lettresMajuscules}`;
const chiffres = '1234567890';


const coordinates_region = { x: 90, y: 47, width: 150, height: 19, offsetY: 10, name:'region', char_whiteList: `${lettres}${chiffres}-' `, autoCorect : {callback: correct, pathToList: `${baseToBDFiles}/regions.csv` }}; 
const coordinates_departement = { x: 90, y: 92, width: 150, height: 16, offsetY: 10, name:'departement', char_whiteList: `${lettres}${chiffres}-' `, autoCorect : {callback: correct, pathToList: `${baseToBDFiles}/departements.csv` }}; 
const coordinates_arrondissement = { x: 90, y: 127, width: 150, height: 15, offsetY: 8, name:'arrondissement', char_whiteList: `${lettres}${chiffres}-' `, autoCorect : {callback: correct, pathToList: `${baseToBDFiles}/arrondissements.csv` }}; 
const coordinates_numero_acte = { x: 353, y: 178, width: 60, height: 19, offsetX: 0, name:'numeroActe', char_whiteList: chiffres, autoCorect : {callback: correct, pathToList: undefined }}; 

const coordinates_nom_enfant = {x: 178, y: 216, width: 418, height: 25, name:'nomEnfant', char_whiteList: `${lettres}${chiffres}-' `, autoCorect : {callback: correctNom, pathToList: `${baseToBDFiles}/noms.csv` }};
const coordinates_nom_enfant2 = {x: 178, y: 290, width: 418, height: 25, name:'nomEnfant', autoCorect : {callback: correctNom, pathToList: `${baseToBDFiles}/noms.csv` }};
const coordinates_date_naissance_enfant = {x: 150, y: 240, width: 445, height: 25, offsetX: 40, name:'dateNaissanceEnfant', char_whiteList: `${lettres}${chiffres}- `, autoCorect : {callback: correct, pathToList: `${baseToBDFiles}/dates.csv` }};
const coordinates_lieu_naissance_enfant = {x: 148, y: 265, width: 448, height: 25, name:'lieuNaissanceEnfant', char_whiteList: `${lettres}${chiffres}-' `, autoCorect : {callback: correct, pathToList: `${baseToBDFiles}/lieu_naissance.csv` }};
const coordinates_sex = {x: 183, y: 313, width: 410, height: 23, name:'sexe', char_whiteList: `masculinfeMASCULINFE`, autoCorect : {callback: correct, pathToList: `${baseToBDFiles}/sex.csv` }};

const coordinates_nom_pere = {x: 133, y: 337, width: 450, height: 23, name:'nomPere', char_whiteList: `${lettres}${chiffres}-' `, autoCorect : {callback: correctNom, pathToList: `${baseToBDFiles}/noms.csv` }};
const coordinates_lieu_naissance_pere = {x: 165, y: 361, width: 380, height: 22, name:'lieuNaissancePere', char_whiteList: `${lettres}${chiffres}-' `, autoCorect : {callback: correct, pathToList: `${baseToBDFiles}/lieu_naissance.csv` }};
const coordinates_residence_pere = {x: 159, y: 384, width: 380, height: 23, name:'residencePere', char_whiteList: `${lettres}${chiffres}-' `, autoCorect : {callback: correct, pathToList: `${baseToBDFiles}/residences.csv` }};
const coordinates_profession_pere = {x: 216, y: 410, width: 380, height: 20, offsetY: 10, name:'professionPere', char_whiteList: `${lettres}${chiffres}-' `, autoCorect : {callback: correct, pathToList: `${baseToBDFiles}/metiers.csv` }};

const coordinates_nom_mere = {x: 177, y: 431, width: 418, height: 22, offsetY: 10, name:'nomMere', char_whiteList: `${lettres}${chiffres}-' `, autoCorect : {callback: correctNom, pathToList: `${baseToBDFiles}/noms.csv` }};
const coordinates_lieu_naissance_mere = {x: 164, y: 454, width: 430, height: 23, offsetY: 10, name:'lieuNaissanceMere', char_whiteList: `${lettres}${chiffres}-' `, autoCorect : {callback: correct, pathToList: `${baseToBDFiles}/lieu_naissance.csv` }};
const coordinates_date_naissance_mere = {x: 146, y: 479, width: 450, height: 23, offsetY: 10, name:'dateNaissanceMere', char_whiteList: `${lettres}${chiffres}-' `, autoCorect : {callback: correct, pathToList: `${baseToBDFiles}/dates.csv` }};
const coordinates_residence_mere = {x: 157, y: 503, width: 438, height: 21, offsetY: 10, name:'residenceMere', char_whiteList: `${lettres}${chiffres}-' `, autoCorect : {callback: correct, pathToList: `${baseToBDFiles}/residences.csv` }};
const coordinates_profession_mere = {x: 219, y: 528, width: 376, height: 21, offsetY: 10, name:'professionMere', char_whiteList: `${lettres}${chiffres}-' `, autoCorect : {callback: correct, pathToList: `${baseToBDFiles}/metiers.csv` }};

const coordinates_dresse_le = {x: 139, y: 552, width: 456, height: 21, offsetY: 10, name:'dresseLe', char_whiteList: `${lettres}${chiffres}- `, autoCorect : {callback: correct, pathToList: `${baseToBDFiles}/dates.csv` }};
const coordinates_sur_la_declaration_de1 = {x: 196, y: 573, width: 399, height: 23,  offsetY: 10, name:'surLaDeclarationDe1', char_whiteList: `${lettres}${chiffres}-' `, autoCorect : {callback: correct, pathToList: `${baseToBDFiles}/declareurs.csv` }};
const coordinates_sur_la_declaration_de2 =  {x: 95, y: 607, width: 500, height: 20,  offsetY: 3, size:12, name:'surLaDeclarationDe2', char_whiteList: `${lettres}${chiffres}-' `, autoCorect : {callback: correct, pathToList: `${baseToBDFiles}/declareurs.csv` }};
const coordinates_par_nous1 = {x: 132, y: 654, width: 463, height: 17,  offsetY: 1, size:12, name:'parNous1', char_whiteList: `${lettres}${chiffres}-' `, autoCorect : {callback: correct, pathToList: `${baseToBDFiles}/declarants.csv` }}; 
const coordinates_par_nous2 = {x: 92, y: 666, width: 365, height: 15,  offsetY: 1, size:12, name:'parNous2', char_whiteList: `${lettres}${chiffres}-' `, autoCorect : {callback: correct, pathToList: `${baseToBDFiles}/declarants.csv` }};
const coordinates_etat_civil_centre_de = {x: 222, y: 678, width: 373, height: 16,  offsetY: 1,size:12, name:'etatCivilCentreDe', char_whiteList: `${lettres}${chiffres}-' `, autoCorect : {callback: correct, pathToList: `${baseToBDFiles}/centres.csv` }};
const coordinates_assiste_de = {x: 143, y: 703, width: 452, height: 17,  offsetY: 3, name:'assisteDe', char_whiteList: `${lettres}${chiffres}-_' `, autoCorect : {callback: correct, pathToList: `${baseToBDFiles}/declarants.csv` }};

const birth_certificate_coordinates = {
  coordinates_region, coordinates_departement, coordinates_arrondissement, coordinates_numero_acte,
  coordinates_nom_enfant, coordinates_date_naissance_enfant, coordinates_lieu_naissance_enfant, coordinates_sex,
  coordinates_nom_enfant2, 
  coordinates_nom_pere, coordinates_lieu_naissance_pere, coordinates_residence_pere, coordinates_profession_pere,
  coordinates_nom_mere, coordinates_lieu_naissance_mere, coordinates_date_naissance_mere, coordinates_residence_mere, coordinates_profession_mere,
  coordinates_dresse_le, coordinates_sur_la_declaration_de1, coordinates_sur_la_declaration_de2, coordinates_par_nous1, coordinates_par_nous2, coordinates_etat_civil_centre_de, coordinates_assiste_de
}



module.exports = {
  emailRegex,
  dbConfig,
  baseURL,
  birth_certificate_coordinates,
  baseToBDFiles,
  birthCertificateTemplatePath,
  pathToCreatedBirthCertificate
}