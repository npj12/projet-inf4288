import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const SignupFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Form = styled.form`
  background: #fff;
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  transition: all 0.3s ease-in-out;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  &:hover {
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #333;
    font-size: 1rem;
    transition: color 0.3s ease;
  }

  input, select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    transition: border-color 0.3s ease;

    @media (max-width: 768px) {
      padding: 0.5rem;
    }

    &:focus {
      border-color: #007bff;
      outline: none;
    }
  }

  .password-toggle {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #007bff;
    user-select: none;
    transition: color 0.3s ease;

    &:hover {
      color: #0056b3;
    }
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  background: ${({ disabled }) => (disabled ? '#ccc' : '#28a745')};
  color: #fff;
  font-size: 1.1rem;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background 0.3s ease, transform 0.2s ease;
  margin-bottom: 0.5rem;

  &:hover {
    background: ${({ disabled }) => (disabled ? '#ccc' : '#218838')};
    transform: ${({ disabled }) => (disabled ? 'none' : 'translateY(-2px)')};
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
`;

const LoginButton = styled(Link)`
  display: block;
  width: 100%;
  text-align: center;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  background: #007bff;
  color: #fff;
  font-size: 1.1rem;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: #0056b3;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  color: #333;
  font-size: 2rem;
  text-align: center;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [login, setLogin] = useState('');
  const [mairie, setMairie] = useState('');
  const [mairies, setMairies] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMairies = async () => {
      try {
        const response = await axios.get(process.env.BASE_URL + 'city-hall');
        setMairies(response.data);
      } catch (error) {
        console.error('Error fetching mairies:', error);
      }
    };

    fetchMairies();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas');
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const response = await axios.post(
        process.env.BASE_URL + 'user/agent/signup',
        {
          name,
          surname,
          phoneNumber,
          email,
          password,
          login,
          mairie,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.status === 500) {
        setSuccessMessage('Fetched Successfully');
        setTimeout(() => navigate('/login'), 1000); // Redirection après 1 seconde
      } else {
        setErrorMessage('Server error');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Erreur lors de la connexion à l\'API');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <SignupFormContainer>
      <Form onSubmit={handleSubmit}>
        <Title>Create Agent</Title>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <FormGroup>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="login">Login</label>
          <input
            type="text"
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </FormGroup>

<FormGroup>
  <label htmlFor="mairie">Mairie</label>
  <select
    id="mairie"
    name="cityHallId"
    value={mairie}
    onChange={(e) => setMairie(e.target.value)}
    required
  >
    <option value="">Select a council</option>
    {mairies.map((mairie) => (
      <option key={mairie.id} value={mairie.id}>
        {mairie.city_hall_name}
      </option>
    ))}
  </select>
</FormGroup>
        
        <FormGroup>
          <label htmlFor="password">Password</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
              size="1x"
              className="password-toggle"
            />
          </div>
        </FormGroup>
        <FormGroup>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              onClick={toggleConfirmPasswordVisibility}
              size="1x"
              className="password-toggle"
            />
          </div>
        </FormGroup>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Create Account'}
        </Button>
      </Form>
    </SignupFormContainer>
  );
};

export default SignupForm;
