import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout, userType } = useAuth();

  useEffect(() => {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      const link = item.querySelector('a');
      if (link && link.getAttribute('href') === location.pathname) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logout();
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
                  <span>University of Yaounde 1,</span>
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
                <Link className="navbar-brand" to="/">
                  <span>SANDO</span>
                </Link>
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
                      <Link className="nav-link" to="/">Home</Link>
                    </li>
                    {isAuthenticated && (
                      <>
                        <li className="nav-item">
                          <Link className="nav-link" to="/about">About</Link>
                        </li>
                        {userType === 'Individual' && (
                          <li className="nav-item">
                            <Link className="nav-link" to="/service">Service</Link>
                          </li>
                        )}
                        {(userType === 'Agent' || userType === 'Admin') && (
                          <li className="nav-item">
                            <Link className="nav-link" to="/service2">Service</Link>
                          </li>
                        )}
                        {userType === 'Admin' && (
                          <li className="nav-item">
                            <Link className="nav-link" to="/admin">Administrateur</Link>
                          </li>
                        )}
                        <li className="nav-item">
                          <Link className="nav-link" to="/contact">Contact us</Link>
                        </li>
                      </>
                    )}
                    {!isAuthenticated ? (
                      <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                      </li>
                    ) : (
                      <li className="nav-item">
                        <a className="nav-link" href="#" onClick={handleLogout}>Logout</a>
                      </li>
                    )}
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
