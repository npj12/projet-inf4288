import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Footer() {
  const { isAuthenticated, logout, userType } = useAuth();

  return (
    <div className="sub_page">
      {/* <!-- info section --> */}
      <section className="info_section">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="info_logo">
                <Link className="navbar-brand" to="/">
                  <span>SHAJ</span>
                </Link>
                <p>
                  Birth certificate digitization and authentication to prevent fraud in Cameroon
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="info_links">
                <h5>Useful Links</h5>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  {isAuthenticated && (
                    <>
                      <li>
                        <Link to="/about">About</Link>
                      </li>
                      <li>
                        <Link to={userType === 'Individual' ? '/service' : '/service2'}>
                          {userType === 'Individual' ? 'Service' : 'Service2'}
                        </Link>
                      </li>
                    </>
                  )}
                  {!isAuthenticated ? (
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                  ) : (
                    <li>
                      <Link to="/" onClick={logout}>Logout</Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <div className="info_info">
                <h5>Contact Us</h5>
              </div>
              <div className="info_contact">
                <a href="#" className="">
                  <i className="fa fa-map-marker" aria-hidden="true"></i>
                  <span>University of Yaoundé 1,</span>
                </a>
                <a href="#" className="">
                  <i className="fa fa-phone" aria-hidden="true"></i>
                  <span>Call : +237 690729455</span>
                </a>
                <a href="#" className="">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                  <span>shaj@gmail.com</span>
                </a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="info_form">
                <h5>Newsletter</h5>
                <form action="#">
                  <input type="email" placeholder="Enter your email" />
                  <button>Subscribe</button>
                </form>
                <div className="social_box">
                  <a href="#">
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-youtube" aria-hidden="true"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- end info section --> */}

      {/* <!-- footer section --> */}
      <footer className="container-fluid footer_section">
        <p>
          &copy; <span id="currentYear"></span> All Rights Reserved. Design by
          <a href="https://html.design/">HTML Design</a>
        </p>
      </footer>
      {/* <!-- footer section --> */}
    </div>
  );
}

export default Footer;
