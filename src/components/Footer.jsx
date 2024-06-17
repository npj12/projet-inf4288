import React from 'react'

function Footer() {
  return (
    <div className="sub_page">
          {/* <!-- info section --> */}
  <section className="info_section ">
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="info_logo">
            <a className="navbar-brand" href="index.html">
              <span>
                SHAJ
              </span>
            </a>
            <p>
              Birth certificate digitilization and authentification to prevent fraud in cameroon
            </p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="info_links">
            <h5>
              Useful Link
            </h5>
            <ul>
              <li>
                <a href="/">
                  Home
                </a>
              </li>
              <li>
                <a href="/About">
                  About
                </a>
              </li>
              <li>
                <a href="/Service">
                  Service
                </a>
              </li>
              <li>
                <a href="/Login">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-3">
          <div className="info_info">
            <h5>
              Contact Us
            </h5>
          </div>
          <div className="info_contact">
            <a href="" className="">
              <i className="fa fa-map-marker" aria-hidden="true"></i>
              <span>
               University of yaounde 1,
              </span>
            </a>
            <a href="" className="">
              <i className="fa fa-phone" aria-hidden="true"></i>
              <span>
                Call : +237 690729455
              </span>
            </a>
            <a href="" className="">
              <i className="fa fa-envelope" aria-hidden="true"></i>
              <span>
              shaj@gmail.com
              </span>
            </a>
          </div>
        </div>
        <div className="col-md-3">
          <div className="info_form ">
            <h5>
              Newsletter
            </h5>
            <form action="#">
              <input type="email" placeholder="Enter your email"/>
              <button>
                Subscribe
              </button>
            </form>
            <div className="social_box">
              <a href="">
                <i className="fa fa-facebook" aria-hidden="true"></i>
              </a>
              <a href="">
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </a>
              <a href="">
                <i className="fa fa-youtube" aria-hidden="true"></i>
              </a>
              <a href="">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* <!-- end info_section --> */}

  {/* <!-- footer section --> */}
  <footer className="container-fluid footer_section">
    <p>
      &copy; <span id="currentYear"></span> All Rights Reserved. Design by
      
    </p>
  </footer>
  {/* <!-- footer section --> */}
    </div>
  );
}

export default Footer
