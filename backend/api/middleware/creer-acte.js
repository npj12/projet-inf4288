const { PDFDocument, rgb , StandardFonts} = require('pdf-lib');
const fs = require('fs');
const {birthCertificateTemplatePath, pathToCreatedBirthCertificate, birth_certificate_coordinates} = require('../constants');

module.exports = async (req, res, next)=>{
    // Charger le PDF existant
    const existingPdfBytes = fs.readFileSync(birthCertificateTemplatePath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Copier une page du PDF existant
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Ajouter du texte à une position spécifique
    for (const [key, coordinates] of Object.entries(birth_certificate_coordinates)) {
        const name = coordinates.name;
        if (req.body[name]) {
            await writeInFile(firstPage, req.body[name], coordinates);
        }
      }
    // Sauvegarder le PDF modifié
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(`${pathToCreatedBirthCertificate}/modified.pdf`, pdfBytes);
    next();
}

let writeInFile = async (page, textToWrite, coordinates)=>{
    const { width, height } = page.getSize();
    page.drawText(textToWrite, {
        x: coordinates.x + ( coordinates.offsetX==undefined ? 15 : coordinates.offsetX),
        y: height - (coordinates.y + (coordinates.offsetY==undefined ? 13 : coordinates.offsetY)),
        size: coordinates.size == undefined ? 15 : coordinates.size,
        // font: await pdfDoc.embedFont(StandardFonts.Helvetica),
        color: rgb(0, 0, 0)
    });
}