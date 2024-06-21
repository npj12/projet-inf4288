const { jsPDF } = require('jspdf');
const fs = require('fs');

let createActe = (identificationNumber, surname, name, birthDate, region, birthPlace, sex,
    fatherName, fatherBirthDate, fatherBirthPlace, fatherProfession, fatherResidence,
    motherName, motherBirthDate, motherBirthPlace, motherProfession, motherResidence,
    drawnOn, declarantName, declarationAttesterName, civilStatusRegistrar, path) => {
    
    const doc = new jsPDF();
    let y = 60; // Start further down to create space for the image

    // Read the image file and convert it to Base64
    const imagePath = '../favicon1.png';
    const imageData = fs.readFileSync(imagePath).toString('base64');
    const imageBase64 = `data:image/png;base64,${imageData}`;

    // Republic of Cameroon header
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('REPUBLIC OF CAMEROON', 20, 10);
    doc.setFontSize(8);
    doc.text('Peace - Work - Fatherland', 20, 15);

    // Seal image
    doc.addImage(imageBase64, 'PNG', 70, 10, 30, 30); // Use the Base64 string

    // Republic of Cameroon header (French)
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('REPUBLIQUE DU CAMEROUN', 130, 10);
    doc.setFontSize(8);
    doc.text('Paix – Travail – Patrie', 130, 15);

    // Birth Certificate title and Identification Number
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Birth Certificate', 70, y);
    y += 20;

    if (identificationNumber) {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(`Identification Number: ${identificationNumber}`, 130, y - 10);
    }

    // Function to add field and value
    const addField = (label, value) => {
        doc.setFont('helvetica', 'bold');
        doc.text(label, 15, y);
        doc.setFont('helvetica', 'normal');
        doc.text('______________', 105, y);
        doc.text(value, 110, y);
        y += 10;  // Adjust this value for spacing between lines
    };

    // Adding fields and values
    doc.setFontSize(12);
    addField('Surname(s):', surname);
    addField('Given name(s):', name);
    addField('Birth Date:', birthDate);
    addField('Region:', region);
    addField('Birth Place:', birthPlace);
    addField('Sex:', sex);
    addField("Father's Name:", fatherName);
    addField("Father's Birth Date:", fatherBirthDate);
    addField("Father's Birth Place:", fatherBirthPlace);
    addField("Father's Profession:", fatherProfession);
    addField("Father's Residence:", fatherResidence);
    addField("Mother's Name:", motherName);
    addField("Mother's Birth Date:", motherBirthDate);
    addField("Mother's Birth Place:", motherBirthPlace);
    addField("Mother's Profession:", motherProfession);
    addField("Mother's Residence:", motherResidence);
    addField('Drawn on the:', drawnOn);
    addField('With accordance to the declaration of:', declarantName);
    addField('Who attested to the truth of the declaration:', declarationAttesterName);
    addField('By the civil status Registrar for:', civilStatusRegistrar);

    // Add signature at the bottom right
    doc.text('Signature:', 150, 280);
    doc.line(170, 280, 200, 280);  // Create a line for the signature

    doc.save(path);
};

module.exports = {
    createActe
}
