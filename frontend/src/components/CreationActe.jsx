import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function CreationActe() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    surname: '',
    name: '',
    birthDate: '',
    region: '',
    birthPlace:'',
    sex: '',
    fatherName: '',
    fatherBornOn: '',
    fatherBornAt: '',
    fatherProfession: '',
    fatherResident: '',
    motherName: '',
    motherBornOn: '',
    motherBornAt: '',
    motherProfession: '',
    motherResident: '',
    drawnOnThe: new Date().toISOString().split('T')[0], // this field will be set to today's date and won't be modifiable
    withAccordance: '',
    whoAttested: '',
    civilStatutsRegister: '',
  });
  const [regions, setRegions] = useState([]);
  const [identificationNumber, setIdentificationNumber] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get('https://projet-inf4288.onrender.com/api/region');
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
    if (name === 'drawnOnThe') return;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://projet-inf4288.onrender.com/api/digitization', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      });
      setIdentificationNumber(response.data.identificationNumber);
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
            name="fatherBornOn"
            value={formData.fatherBornOn}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Father's place of birth:</label>
          <input
            type="text"
            className="form-control"
            name="fatherBornAt"
            value={formData.fatherBornAt}
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
            name="fatherResident"
            value={formData.fatherResident}
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
            name="motherBornOn"
            value={formData.motherBornOn}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Mother's place of birth:</label>
          <input
            type="text"
            className="form-control"
            name="motherBornAt"
            value={formData.motherBornAt}
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
            name="motherResident"
            value={formData.motherResident}
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
            name="drawnOnThe"
            value={formData.drawnOnThe}
            onChange={handleChange}
            readOnly // make this field read-only
          />
        </div>
        <div className="form-group">
          <label>With accordance to the declaration of:</label>
          <input
            type="text"
            className="form-control"
            name="withAccordance"
            value={formData.withAccordance}
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
            name="whoAttested"
            value={formData.whoAttested}
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
            name="civilStatutsRegister"
            value={formData.civilStatutsRegister}
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
