const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const { PDFImage } = require('pdf-image');
const { createWorker, PSM , OEM}  = require('tesseract.js');
const { correct, correctName }  = require('./test-auto-correct');
const { birth_certificate_coordinates, baseToBDFiles } = require('../constants');

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
  const outputPath = `${new Date().toISOString()}.${coordinates.name}.png`;
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  // Utiliser Tesseract.js pour lire l'image
  const worker = await createWorker(['fra'], OEM.DEFAULT, {
    // tessedit_char_whitelist: `${coordinates.char_whiteList}`,
    tessedit_pageseg_mode: PSM.SPARSE_TEXT,
    load_system_dawg: 0,
    load_freq_dawg: 0,
    user_words_suffix: 'none',
    user_patterns_suffix: 'none'
  });

  let { data: { text } } = await worker.recognize(outputPath);
  await worker.terminate();
  
  // On supprime l'image temporaire
    fs.unlinkSync(outputPath);
    text = text[text.length-1] === '\n' ? text.substring(0, text.length-1) : text;
    let { callback, pathToList } = coordinates.autoCorect;
    const corrige = pathToList === undefined || text.length == 0 ? text : await callback(text, pathToList);
    console.log(coordinates.name, text, corrige);
    return corrige;
  }

let extract = async (filePath) => {
  // Convertir la première page du PDF en image
  const imagePath = await pdfToImage(filePath);

  const region = await extractFromImage(imagePath, birth_certificate_coordinates.coordinates_region);
  const division = await extractFromImage(imagePath, birth_certificate_coordinates.coordinates_departement);
  const subdivision = await extractFromImage(imagePath, birth_certificate_coordinates.coordinates_arrondissement);
  const numero_acte = await extractFromImage(imagePath, birth_certificate_coordinates.coordinates_numero_acte);

  const name = await extractFromImage(imagePath, birth_certificate_coordinates.coordinates_nom_enfant);
  const birthDate = await extractFromImage(imagePath, birth_certificate_coordinates.coordinates_date_naissance_enfant);
  const birthPlace = await extractFromImage(imagePath, birth_certificate_coordinates.coordinates_lieu_naissance_enfant);
  const sex = await extractFromImage(imagePath, birth_certificate_coordinates.coordinates_sex);

  const fatherName = await extractFromImage(imagePath, birth_certificate_coordinates.coordinates_nom_pere);
  const fatherBirthPlace = await extractFromImage(imagePath, birth_certificate_coordinates.coordinates_lieu_naissance_pere);
  const fatherResidence = await extractFromImage(imagePath, birth_certificate_coordinates.coordinates_residence_pere);
  const fatherOccupation = await extractFromImage(imagePath, birth_certificate_coordinates.coordinates_profession_pere);

  const motherName = await extractFromImage(imagePath, birth_certificate_coordinates.coordinates_nom_mere);
  const motherBirthPlace = await extractFromImage(imagePath, birth_certificate_coordinates.coordinates_lieu_naissance_mere);
  const motherBirthDate = await extractFromImage(imagePath, birth_certificate_coordinates.coordinates_date_naissance_mere);
  const motherResidence = await extractFromImage(imagePath, birth_certificate_coordinates.coordinates_residence_mere);
  const motherOccupation = await extractFromImage(imagePath, birth_certificate_coordinates.coordinates_profession_mere);

  const drawnOn = await extractFromImage(imagePath, birth_certificate_coordinates.coordinates_dresse_le);
  const declarantName1 = await extractFromImage(imagePath, birth_certificate_coordinates.coordinates_sur_la_declaration_de1);
  const declarantName2 = await extractFromImage(imagePath, birth_certificate_coordinates.coordinates_sur_la_declaration_de2);
  const byUs1 = await extractFromImage(imagePath, birth_certificate_coordinates.coordinates_par_nous1);
  const byUs2 = await extractFromImage(imagePath, birth_certificate_coordinates.coordinates_par_nous2);
  const civilStatusRegister = await extractFromImage(imagePath, birth_certificate_coordinates.coordinates_etat_civil_centre_de);
  const inThePresenceOf = await extractFromImage(imagePath, birth_certificate_coordinates.coordinates_assiste_de);
  
  // const textes = await Promise.all([region, division, subdivision, numero_acte, 
  //                             name, birthDate, birthPlace, sex, 
  //                             fatherName, fatherBirthPlace, fatherResidence, fatherOccupation,
  //                             motherName, motherBirthPlace, motherBirthDate, motherResidence, motherOccupation,
  //                             drawnOn, declarantName1, declarantName2, byUs1, byUs2, civilStatusRegister, inThePresenceOf])
  fs.unlinkSync(imagePath);

  // return textes;
  return {
    region, division, subdivision, numero_acte, 
    name, birthDate, birthPlace, sex, 
    fatherName, fatherBirthPlace, fatherResidence, fatherOccupation,
    motherName, motherBirthPlace, motherBirthDate, motherResidence, motherOccupation, 
    drawnOn, declarantName1, declarantName2, byUs1, byUs2, civilStatusRegister, inThePresenceOf,
    chemin:filePath
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
