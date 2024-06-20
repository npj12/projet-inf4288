import React from 'react';
import { useNavigate } from 'react-router-dom';

function Authentification() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/Service');
  };

  return (
    <div className="authentification-page">
      <h1>Authenticated your Birth Certificate</h1>
      <form className="authentification-form">
        <div className="form-group">
          <label> Identification number:</label>
          <input type="text" className="form-control" placeholder="Entrez le numéro d'identification" />
        </div>
        <div className="form-group">
          <label>OR download a digital file:</label>
          <input type="file" className="form-control" />
        </div>
        <div className="button-container">
          <button type="submit" className="btn btn-primary">Validation</button>
          <button type="button" className="btn btn-secondary" onClick={handleBack}>Retour</button>
        </div>
      </form>
    </div>
  );
}

export default Authentification;