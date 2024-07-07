const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const { PDFImage } = require('pdf-image');
const { createWorker }  = require('tesseract.js');
const { correct, correctName }  = require('./test-auto-correct');

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

const baseToBDFiles = '/home/user/Downloads';

let pdfToImage = async (filePath) => {
  const pdfImage = new PDFImage(filePath, { combinedImage: true });
  const imagePath = await pdfImage.convertPage(0);

  return imagePath;
}

let extractFromImage = async (imagePath, coordinates) => {
  // On charge l'image générée
  const image = await loadImage(imagePath);

  // On extrait la zone spécifiée de l'image
  const { x, y, width, height } = coordinates;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');
  context.drawImage(image, x, y, width, height, 0, 0, width, height);

  // Sauvegarder l'image temporairement pour traitement OCR
  const outputPath = 'output.png';
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);

  // Utiliser Tesseract.js pour lire l'image
  const worker = await createWorker(['fra', 'eng']);
  const { data: { text } } = await worker.recognize(outputPath);
  await worker.terminate();

  // On supprime l'image temporaire
    fs.unlinkSync(outputPath);
    return  text[text.length-1] === '\n' ? text.substring(0, text.length-1) : text;
  }

let extract = async (filePath) => {
  // Convertir la première page du PDF en image
  const imagePath = await pdfToImage(filePath);

  const region = await correct(await extractFromImage(imagePath, coordinates_region), `${baseToBDFiles}/regions.csv`);
  const division = await correct(await extractFromImage(imagePath, coordinates_departement), `${baseToBDFiles}/departements.csv`);
  const subdivision = await correct(await extractFromImage(imagePath, coordinates_arrondissement), `${baseToBDFiles}/arrondissements.csv`);
  const numero_acte = await extractFromImage(imagePath, coordinates_numero_acte);

  const name = await correctName(await extractFromImage(imagePath, coordinates_nom_enfant), `${baseToBDFiles}/noms.csv`);
  const birthDate = await extractFromImage(imagePath, coordinates_date_naissance_enfant);
  const birthPlace = await extractFromImage(imagePath, coordinates_lieu_naissance_enfant);
  const sex = await extractFromImage(imagePath, coordinates_sex);

  const fatherName = await extractFromImage(imagePath, coordinates_nom_pere);
  const fatherBirthPlace = await extractFromImage(imagePath, coordinates_lieu_naissance_pere);
  const fatherResidence = await extractFromImage(imagePath, coordinates_residence_pere);
  const fatherOccupation = await extractFromImage(imagePath, coordinates_profession_pere);

  const motherName = await extractFromImage(imagePath, coordinates_nom_mere);
  const motherBirthPlace = await extractFromImage(imagePath, coordinates_lieu_naissance_mere);
  const motherBirthDate = await extractFromImage(imagePath, coordinates_date_naissance_mere);
  const motherResidence = await extractFromImage(imagePath, coordinates_residence_mere);
  const motherOccupation = await extractFromImage(imagePath, coordinates_profession_mere);

  const drawnOn = await extractFromImage(imagePath, coordinates_dresse_le);
  const declarantName1 = await extractFromImage(imagePath, coordinates_sur_la_declaration_de1);
  const declarantName2 = await extractFromImage(imagePath, coordinates_sur_la_declaration_de2);
  const byUs1 = await extractFromImage(imagePath, coordinates_par_nous1);
  const byUs2 = await extractFromImage(imagePath, coordinates_par_nous2);
  const civilStatusRegister = await extractFromImage(imagePath, coordinates_etat_civil_centre_de);
  const inThePresenceOf = await extractFromImage(imagePath, coordinates_assiste_de);
  
  fs.unlinkSync(imagePath);

  return {
    region, division, subdivision, numero_acte, 
    name, birthDate, birthPlace, sex, 
    fatherName, fatherBirthPlace, fatherResidence, fatherOccupation,
    motherName, motherBirthPlace, motherBirthDate, motherResidence, motherOccupation, 
    drawnOn, declarantName1, declarantName2, byUs1, byUs2, civilStatusRegister, inThePresenceOf
  };
}

// const filePath = __dirname + '/acte.pdf';
// extract(filePath, coordinates_numero_acte).then(text => {
//   // correct(text, '/home/user/Downloads/regions.csv').then(corrected => { 
//     console.log(`${text}`);
    // console.log(`${text} - ${corrected}`);
//   // }).catch(error => console.error(error));
// }).catch(error => {
//     console.error(error);
// });

module.exports =  {
  extract
};
