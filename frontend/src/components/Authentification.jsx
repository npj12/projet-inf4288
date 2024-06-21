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
    setPdfUrl('');

    try {
      // Make API call to retrieve PDF link
      const response = await axios.get(`process.env.BASE_URLauthenticate/${identificationNumber}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      });

      // Extract PDF URL from response data
      const pdfUrl = response.data.birthCertificateLocation;
      setPdfUrl(pdfUrl);
    } catch (error) {
      console.error('Identification number invalide:', error);
      if (error.response && error.response.status === 404) {
        setError('PDF not found for that d\'identification number.');
      } else if (error.response && error.response.status === 401) {
        setError('Unauthorized. Please verify your token.');
      } else {
        setError('An error occurred while retrieving the PDF.');
      }
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
            placeholder="Entrez le numéro d'identification"
            value={identificationNumber}
            onChange={(e) => setIdentificationNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>OR download a digital file:</label>
          <input type="file" className="form-control" />
        </div>
        <div className="button-container">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Loading...' : 'Validation'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleBack}>
            Retour
          </button>
        </div>
      </form>

      {/* Display error message */}
      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {/* Display PDF if available */}
      {pdfUrl && (
        <div className="pdf-container mt-3">
          <h3>Birth Certificate PDF</h3>
          <embed src={pdfUrl} type="application/pdf" width="1000px" height="800px" style={{ border: '1px solid #ccc' }} />
        </div>
      )}
    </div>
  );
}

export default Authentification;
