import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Authentification() {
  const navigate = useNavigate();
  const [identificationNumber, setIdentificationNumber] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBack = () => {
    navigate('/Service');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
        `https://projet-inf4288.onrender.com/api/authenticate/${identificationNumber}`,
        {
          responseType: 'blob', // Important: Tell Axios to expect a blob response
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );

      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);
    } catch (error) {
      console.error('Error fetching PDF:', error);
      setError('Identification number incorrect or PDF not found.');
      setPdfUrl(''); // Clear previous pdfUrl if there was an error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authentification-page">
      <h1>Authenticate your Birth Certificate</h1>
      <form className="authentification-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Identification number:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter the identification number"
            value={identificationNumber}
            onChange={(e) => setIdentificationNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>OR upload a digital file:</label>
          <input type="file" className="form-control" />
        </div>
        <div className="button-container">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Loading...' : 'Validate'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleBack}>
            Back
          </button>
        </div>
      </form>

      {/* Display error message */}
      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {/* Display PDF if available */}
      {pdfUrl && (
        <div className="pdf-container mt-3">
          <h3>Birth Certificate PDF</h3>
          <embed src={pdfUrl} type="application/pdf" width="100%" height="600px" />
        </div>
      )}
    </div>
  );
}

export default Authentification;
