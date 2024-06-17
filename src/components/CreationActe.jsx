import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function CreationActe() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleBack = () => {
    navigate('/Service2');
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleShowModal();
  };

  return (
    <div className="creation-acte-page">
      <h1>Digitalize a new birth certificate</h1>
      <form className="birth-certificate-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Uploader un document numérique:</label>
          <input type="file" className="form-control" />
        </div>
        <div className="button-container">
          <button type="submit" className="btn btn-primary">Validation</button>
          <button type="button" className="btn btn-secondary" onClick={handleBack}>Retour</button>
        </div>
      </form>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Information of the Birth Certificate </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Surame(s)</Form.Label>
              <Form.Control type="text" placeholder="Entrez le nom" />
            </Form.Group>
            <Form.Group controlId="formSurname">
              <Form.Label>Given name(s)</Form.Label>
              <Form.Control type="text" placeholder="Entrez le prénom" />
            </Form.Group>
            <Form.Group controlId="formDateOfBirth">
              <Form.Label>Birth Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group controlId="formPlaceOfBirth">
              <Form.Label>Born in/at</Form.Label>
              <Form.Control type="text" placeholder="Entrez le lieu de naissance" />
            </Form.Group>
            <Form.Group controlId="formGender">
              <Form.Label>Sexe</Form.Label>
              <Form.Control as="select">
                <option>Male</option>
                <option>Female</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formFatherName">
              <Form.Label>Father Name</Form.Label>
              <Form.Control type="text" placeholder="Entrez le nom du père" />
            </Form.Group>
            <Form.Group controlId="formMotherName">
              <Form.Label>Mother name</Form.Label>
              <Form.Control type="text" placeholder="Entrez le nom de la mère" />
            </Form.Group>
            <Form.Group controlId="formIdNumber">
              <Form.Label>Identification number</Form.Label>
              <Form.Control type="text" placeholder="Entrez le numéro d'identification" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Valider
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreationActe;
