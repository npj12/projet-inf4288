import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';
import sealImage from '../favicon1.png'; // Adjust the path according to your project structure

function CreationActe() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    surname: '',
    name: '',
    birthDate: '',
    region: '',
    birthPlace: '',
    sex: '',
    fatherName: '',
    fatherBirthDate: '',
    fatherBirthPlace: '',
    fatherProfession: '',
    fatherResidence: '',
    motherName: '',
    motherBirthDate: '',
    motherBirthPlace: '',
    motherProfession: '',
    motherResidence: '',
    drawnOn: new Date().toISOString().split('T')[0], // this field will be set to today's date and won't be modifiable
    declarantName: '',
    declarationAttesterName: '',
    civilStatusRegistrar: '',
  });
  const [regions, setRegions] = useState([]);
  const [identificationNumber, setIdentificationNumber] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get(process.env.BASE_URL + 'region');
        const regionNames = response.data.map(region => region.region_name);
        setRegions(regionNames);
      } catch (error) {
        console.error('Erreur lors de la récupération des régions:', error);
      }
    };
    fetchRegions();
  }, []);

  const handleBack = () => {
    navigate('/Service2');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'drawnOn') return;
    if (name === 'sex') {
      setFormData({
        ...formData,
        [name]: value === 'Male' ? 'M' : 'F',
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const generateStyledPDF = () => {
    const doc = new jsPDF();
    let y = 60; // Start further down to create space for the image

    // Republic of Cameroon header
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('REPUBLIC OF CAMEROON', 20, 10);
    doc.setFontSize(8);
    doc.text('Peace - Work - Fatherland', 20, 15);

    // Seal image
    doc.addImage(sealImage, 'JPEG', 70, 10, 30, 30); // Reduce image size

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
      doc.text('_____________________________', 105, y);
      doc.text(value, 110, y);
      y += 10;  // Adjust this value for spacing between lines
    };

    // Adding fields and values
    doc.setFontSize(12);
    addField('Surname(s):', formData.surname);
    addField('Given name(s):', formData.name);
    addField('Birth Date:', formData.birthDate);
    addField('Region:', formData.region);
    addField('Birth Place:', formData.birthPlace);
    addField('Sex:', formData.sex);
    addField("Father's Name:", formData.fatherName);
    addField("Father's Birth Date:", formData.fatherBirthDate);
    addField("Father's Birth Place:", formData.fatherBirthPlace);
    addField("Father's Profession:", formData.fatherProfession);
    addField("Father's Residence:", formData.fatherResidence);
    addField("Mother's Name:", formData.motherName);
    addField("Mother's Birth Date:", formData.motherBirthDate);
    addField("Mother's Birth Place:", formData.motherBirthPlace);
    addField("Mother's Profession:", formData.motherProfession);
    addField("Mother's Residence:", formData.motherResidence);
    addField('Drawn on the:', formData.drawnOn);
    addField('With accordance to the declaration of:', formData.declarantName);
    addField('Who attested to the truth of the declaration:', formData.declarationAttesterName);
    addField('By the civil statuts Registrar for:', formData.civilStatusRegistrar);

    // Add signature at the bottom right
    doc.text('Signature:', 150, 280);
    doc.line(170, 280, 200, 280);  // Create a line for the signature

    doc.save('birth_certificate.pdf');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(process.env.BASE_URL + 'digitization', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      });
      setIdentificationNumber(response.data.bcID); // bcID from the API
      generateStyledPDF();
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="creation-acte-page">
      <h1>Digitalize and Authenticate a Birth Certificate</h1>
      <form className="birth-certificate-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Surname(s):</label>
          <input
            type="text"
            className="form-control"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            placeholder="Enter surname(s)"
            required
          />
        </div>
        <div className="form-group">
          <label>Given name(s):</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter given name(s)"
            required
          />
        </div>
        <div className="form-group">
          <label>Birth Date:</label>
          <input
            type="date"
            className="form-control"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Born at:</label>
          <select
            className="form-control"
            name="region"
            value={formData.region}
            onChange={handleChange}
            required
          >
            <option value="">Select your birth region</option>
            {regions.map((region, index) => (
              <option key={index} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Birth place:</label>
          <input
            type="text"
            className="form-control"
            name="birthPlace"
            value={formData.birthPlace}
            onChange={handleChange}
            placeholder="Enter your place of birth"
            required
          />
        </div> 


        <div className="form-group">
          <label>Sexe:</label>
          <select
            className="form-control"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            required
          >
            <option value="">Select sex</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label>Father's Name:</label>
          <input
            type="text"
            className="form-control"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            placeholder="Enter father's name"
            required
          />
        </div>
        <div className="form-group">
          <label>Father's date of Birth:</label>
          <input
            type="date"
            className="form-control"
            name="fatherBirthDate"
            value={formData.fatherBirthDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Father's place of birth:</label>
          <input
            type="text"
            className="form-control"
            name="fatherBirthPlace"
            value={formData.fatherBirthPlace}
            onChange={handleChange}
            placeholder="Enter father's birth place"
            required
          />
        </div>
        <div className="form-group">
          <label>Father's Profession:</label>
          <input
            type="text"
            className="form-control"
            name="fatherProfession"
            value={formData.fatherProfession}
            onChange={handleChange}
            placeholder="Enter father's profession"
            required
          />
        </div>
        <div className="form-group">
          <label>Father's Residence:</label>
          <input
            type="text"
            className="form-control"
            name="fatherResidence"
            value={formData.fatherResidence}
            onChange={handleChange}
            placeholder="Enter father's resident"
            required
          />
        </div>
        <div className="form-group">
          <label>Mother's Name:</label>
          <input
            type="text"
            className="form-control"
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
            placeholder="Enter mother's name"
            required
          />
        </div>
        <div className="form-group">
          <label>Mother's date of birth:</label>
          <input
            type="date"
            className="form-control"
            name="motherBirthDate"
            value={formData.motherBirthDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Mother's place of birth:</label>
          <input
            type="text"
            className="form-control"
            name="motherBirthPlace"
            value={formData.motherBirthPlace}
            onChange={handleChange}
            placeholder="Enter mother's birth place"
            required
          />
        </div>
        <div className="form-group">
          <label>Mother's Profession:</label>
          <input
            type="text"
            className="form-control"
            name="motherProfession"
            value={formData.motherProfession}
            onChange={handleChange}
            placeholder="Enter mother's profession"
            required
          />
        </div>
        <div className="form-group">
          <label>Mother's Residence:</label>
          <input
            type="text"
            className="form-control"
            name="motherResidence"
            value={formData.motherResidence}
            onChange={handleChange}
            placeholder="Enter mother's resident"
            required
          />
        </div>
        <div className="form-group">
          <label>Drawn on the:</label>
          <input
            type="date"
            className="form-control"
            name="drawnOn"
            value={formData.drawnOn}
            onChange={handleChange}
            readOnly // make this field read-only
          />
        </div>
        <div className="form-group">
          <label>With accordance to the declaration of:</label>
          <input
            type="text"
            className="form-control"
            name="declarantName"
            value={formData.declarantName}
            onChange={handleChange}
            placeholder="Enter accordance"
            required
          />
         </div>
         <div className="form-group">
          <label>Who attested to the truth of the declaration:</label>
          <input
            type="text"
            className="form-control"
            name="declarationAttesterName"
            value={formData.declarationAttesterName}
            onChange={handleChange}
            placeholder="Enter attester"
            required
          />
        </div>
        <div className="form-group">
          <label>By the civil statuts Registrar for:</label>
          <input
            type="text"
            className="form-control"
            name="civilStatusRegistrar"
            value={formData.civilStatusRegistrar}
            onChange={handleChange}
            placeholder="Enter register"
            required
          />
        </div>
        <div className="button-container">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Submitting...' : 'Validate'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleBack} disabled={loading}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreationActe;
