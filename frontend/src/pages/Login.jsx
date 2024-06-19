import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const LoginFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f5f5f5;
  padding: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0.5rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 400px;
  }
`;

const FormContainer = styled.div`
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  input {
    width: calc(100% - 40px); /* Adjusted width for the input to accommodate the icon */
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;

    &:focus {
      border-color: #007bff;
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  background: #007bff;
  color: #fff;
  font-size: 1rem;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background 0.3s ease;
  margin-bottom: 1rem;
  opacity: ${({ disabled }) => (disabled ? '0.7' : '1')};

  &:hover {
    background: ${({ disabled }) => (disabled ? '#007bff' : '#0056b3')};
  }
`;

const SignUpButton = styled(Link)`
  width: 100%;
  display: block;
  text-align: center;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  background: #28a745;
  color: #fff;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #218838;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    img {
      height: 50vh;
    }
  }
`;

const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const { login: loginAuth } = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading indicator

    try {
      const response = await axios.post('https://projet-inf4288.onrender.com/api/user/login', { login, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.message === 'connected successdully') {
        const { isAgent, isIndividual, isAdmin, token } = response.data; // Extract user type and token from response

        localStorage.setItem('token', token); // Save token to localStorage or sessionStorage
        console.log('Token stored in localStorage:', token); // Debug log

        if (isAdmin) {
          loginAuth('Admin');
          navigate('/');
        } else if (isAgent) {
          loginAuth('Agent');
          navigate('/');
        } else if (isIndividual) {
          loginAuth('Individual');
          navigate('/');
        } else {
          navigate('/'); // Default redirect
        }
      } else {
        setErrorMessage(response.data.message || 'Erreur lors de la connexion');
      }
    } catch (error) {
      console.error('Erreur de connexion à l\'API:', error);
      setErrorMessage('Login or password incorrect');
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  };

  return (
    <LoginFormContainer>
      <ContentContainer>
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#007bff' }}
                />
              </div>
            </FormGroup>
            <ButtonContainer>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
              <SignUpButton to="/create-account">
                Create Account
              </SignUpButton>
            </ButtonContainer>
          </form>
        </FormContainer>
        <ImageContainer>
          <img src='assets/images/la-mairie-de-yaounde-vi-au-cameroun.jpg' alt="Login" />
        </ImageContainer>
      </ContentContainer>
    </LoginFormContainer>
  );
};

export default LoginForm;
