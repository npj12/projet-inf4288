import React from 'react';
import { Link } from 'react-router-dom';

function Service() {
  return (
    <div>
      {/* Main content section */}
      <main>
        {/* Hero section */}
        <section className="hero_section">
          <div className="container">
            <div className="hero_content">
              <h1>Authenticated your Birth Certificate</h1>
              <p>Authenticate your birth certificate with SANDO to ensure its validity and protect against fraud.</p>
            </div>
          </div>
        </section>

        {/* Image Left, Text Right with Button section */}
        <section className="image_text_section layout_padding">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 text-center">
                <div className="imga-box animate">
                  <img src="assets/images/authenticatedservices.jpg" alt="Left Image" className="responsive-img small-img" />
                </div>
              </div>
              <div className="col-md-6 center">
                <div className="text-box">
                  <h3 className="font-weight-bold">Verify your Birth Certificate</h3>
                  <p>
                  Our secure system verifies your document with government records, providing you with a trusted and tamper-proof digital version. Enjoy peace of mind knowing your identity is safeguarded with the highest level of security.
                  </p>
                  <Link to="/authentification" className="btn btn-primary">Authentification</Link>
                </div>
              </div>
            </div>
          </div>
        </section>


      </main>
    </div>
  );
}

export default Service;
