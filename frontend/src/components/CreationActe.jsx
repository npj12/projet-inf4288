import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function CreationActe() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/Service2');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for form submission
  };

  return (
    <div className="creation-acte-page">
      <h1>Digitalize and Authenticate a Birth Certificate</h1>
      <form className="birth-certificate-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Surname(s):</label>
          <input type="text" className="form-control" placeholder="Enter surname(s)" />
        </div>
        <div className="form-group">
          <label>Given name(s):</label>
          <input type="text" className="form-control" placeholder="Enter given name(s)" />
        </div>
        <div className="form-group">
          <label>Birth Date:</label>
          <input type="date" className="form-control" />
        </div>
        <div className="form-group">
          <label>Born in/at:</label>
          <input type="text" className="form-control" placeholder="Enter place of birth" />
        </div>
        <div className="form-group">
          <label>Sexe:</label>
          <select className="form-control">
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div className="form-group">
          <label>Father's Name:</label>
          <input type="text" className="form-control" placeholder="Enter father's name" />
        </div>
        <div className="form-group">
          <label>Mother's Name:</label>
          <input type="text" className="form-control" placeholder="Enter mother's name" />
        </div>
        <div className="form-group">
          <label>Download a digital file:</label>
          <input type="file" className="form-control" />
        </div>
        <div className="button-container">
          <button type="submit" className="btn btn-primary">Validate</button>
          <button type="button" className="btn btn-secondary" onClick={handleBack}>Back</button>
        </div>
      </form>
    </div>
  );
}

export default CreationActe;
