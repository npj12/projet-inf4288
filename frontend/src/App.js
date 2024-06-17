import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import CreateAccount from './pages/CreateAccount';
import Login from './pages/Login'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Service from './pages/Service';
import Service2 from './pages/Service2';
import Authentification from './components/Authentification';
import CreationActe from './components/CreationActe';

function App() {
  return (
    <div>
      <Router>
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/About" element={<About />} />
        <Route path="/Service" element={<Service />} />
        <Route path="/authentification" element={<Authentification />} />
        <Route path="/Service2" element={<Service2 />} />
        <Route path="/creation-acte" element={<CreationActe />} />
        <Route path="/login" element={<Login />} />
        <Route path="Create-account" element={<CreateAccount/>}/>
        </Routes>
        <Footer/>
      </Router>
    
    </div>
  );
}

export default App;
