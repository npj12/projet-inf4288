const { PDFDocument } = require('pdf-lib');
const Tesseract = require('tesseract.js');
const { fromPath } = require('pdf2pic');
const fs = require('fs');
const path = require('path');

// Function to extract the "Identification Number" from a PDF document
async function extractIdentificationNumber(pdfPath) {
    try {
        // Convert PDF page to an image
        const output = await fromPath(pdfPath, {
            density: 300,
            saveFilename: 'page',
            savePath: './',
            format: 'png',
        }).bulk(-1, false);

        // Load the first page image (assuming the identification number is on the first page)
        const imagePath = path.resolve(output[0].path);

        // Perform OCR on the image
        const { data: { text } } = await Tesseract.recognize(imagePath, 'eng', {
            logger: m => console.log(m)
        });

        // Clean up the temporary image file
        fs.unlinkSync(imagePath);

        // Extract the "Identification Number" using a regular expression
        const idNumberMatch = text.match(/Identification Number:\s*([A-Za-z0-9]+)/);
        const idNumber = idNumberMatch ? idNumberMatch[1] : 'Not found';

        return idNumber;
    } catch (error) {
        console.error('Error in extractIdentificationNumber:', error);
        throw error;
    }
}

// Main function to execute the extraction
async function main() {
    const pdfPath = '/home/protect/Documents/projet-inf4288/backend/uploads/digitize/2024-06-21T08%3A32%3A33.001Z.pdf'; // Update with the correct path if needed
    try {
        const identificationNumber = await extractIdentificationNumber(pdfPath);
        console.log('Identification Number:', identificationNumber);
    } catch (error) {
        console.error('Error in main:', error);
    }
}

main();
