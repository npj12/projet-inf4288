import React from 'react';
import { Link } from 'react-router-dom';

function Service2() {
  return (
    <div>
      <main>
        <section className="hero_section">
          <div className="container">
            <div className="hero_content">
              <h1>Digitization a new Birth Certificate</h1>
              <p>
              Create your birth certificate with SANDO for a seamless and secure process. Our platform guides you through the steps to generate a legitimate birth certificate, verified by government records.
              </p>
            </div>
          </div>
        </section>

        <section className="image_text_section layout_padding">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 order-md-2 text-center">
                <div className="imga-box animate">
                  <img src="assets/images/la-mairie-de-yaounde-vi-au-cameroun.jpg" alt="Service" className="responsive-img small-img" />
                </div>
              </div>
              <div className="col-md-6 order-md-1 center">
                <div className="text-box">
                  <h3 className="font-weight-bold">Computerization your Birth Certificate</h3>
                  <p>
                  Ensure your personal information is accurately recorded and protected with our advanced encryption technology, giving you a reliable and accessible digital document.
                  </p>
                  <Link to="/creation-acte" className="btn btn-primary">create a birth certificate</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Service2;
