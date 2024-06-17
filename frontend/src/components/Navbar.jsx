import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      const link = item.querySelector('a');
      if (link.getAttribute('href') === location.pathname) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="sub_page">
      <div className="hero_area">
        <div className="hero_bg_box"></div>
        <header className="header_section">
          <div className="header_top">
            <div className="container-fluid">
              <div className="contact_link-container">
                <a href="" className="contact_link1">
                  <i className="fa fa-map-marker" aria-hidden="true"></i>
                  <span>University of yaounde 1,</span>
                </a>
                <a href="" className="contact_link2">
                  <i className="fa fa-phone" aria-hidden="true"></i>
                  <span>Call : +237 690729455</span>
                </a>
                <a href="" className="contact_link3">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                  <span>sando@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
          <div className="header_bottom">
            <div className="container-fluid">
              <nav className="navbar navbar-expand-lg custom_nav-container">
                <a className="navbar-brand" href="index.html">
                  <span>SANDO</span>
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded={menuOpen ? 'true' : 'false'}
                  aria-label="Toggle navigation"
                  onClick={toggleMenu}
                >
                  <span className=""></span>
                </button>
                <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarSupportedContent">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/About">About</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/Service">Services</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/Contact">Contact us</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/Login">Login</a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Navbar;