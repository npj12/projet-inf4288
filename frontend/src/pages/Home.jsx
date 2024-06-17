import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div >
            <div className="hero_area">
    {/* <!-- header section strats --> */}
    <div className="hero_bg_box" >
      <div className="img-box" >
        <img src="assets/images/hero-bg.jpg" alt=""/>
      </div>
    </div>

 
    {/* <!-- end header section --> */}
    {/* <!-- slider section --> */}
    <section className=" slider_section ">
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="container">
              <div className="row">
                <div className="col-md-7">
                  <div className="detail-box">
                    <h1>
                      Your Saftey <br/>
                      <span>
                        Our Responsibility
                      </span>
                    </h1>
                    <p>
                    Welcome to SANDO, your trusted partner in safeguarding the authenticity of birth certificates in Cameroon. Our cutting-edge technology ensures secure and tamper-proof digital records.

                   </p>
                    <div className="btn-box">
                    <Link to="/Login" className="btn-2">Get started</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item ">
            <div className="container">
              <div className="row">
                <div className="col-md-7">
                  <div className="detail-box">
                    <h1>
                      Your Saftey <br/>
                      <span>
                        Our Responsibility
                      </span>
                    </h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod magna aliqua. Ut enim ad minim veniam
                    </p>
                    <div className="btn-box">
                      <a href="" className="btn-1"> Read more </a>
                      <a href="" className="btn-2">Get A Quote</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item ">
            <div className="container">
              <div className="row">
                <div className="col-md-7">
                  <div className="detail-box">
                    <h1>
                      Your Saftey <br/>
                      <span>
                        Our Responsibility
                      </span>
                    </h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod magna aliqua. Ut enim ad minim veniam
                    </p>
                    <div className="btn-box">
                      <a href="" className="btn-1"> Read more </a>
                      <a href="" className="btn-2">Get A Quote</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container idicator_container">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
        </div>
      </div>
    </section>
    {/* <!-- end slider section --> */}
             </div>
      {/* <!-- about section --> */}

       <section className="about_section layout_padding">
    <div className="container">
      <div className="row">
        <div className="col-md-6 px-0">
          <div className="img_container">
            <div className="img-box">
              <img src="assets/images/our-mission.jpg" alt="/About" />
            </div>
          </div>
        </div>
        <div className="col-md-6 px-0">
          <div className="detail-box" >
            <div className="heading_container ">
              <h2>
              Our Mission
              </h2>
              </div>
                <p>
                  At SANDO, our mission is to combat birth certificate fraud and ensure every citizen in Cameroon has access to secure and authenticated identity documents. We strive to provide a reliable and efficient solution to safeguard your personal information.
                </p>
                <div className="heading_container">
                  <h2>Our Vision</h2>
                </div>
                <p>
                  Our vision is to create a transparent and trustworthy environment where every birth certificate in Cameroon is digitized and authenticated, paving the way for a fraud-free society.
                </p>
            <div className="btn-box">
              <a href="">
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
       </section>

  {/* <!-- end about section --> */}
 
      {/* <!-- services section --> */}
      <section className="services_section layout_padding">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>Our Services</h2>
            <p>Discover the range of services we offer to protect and authenticate birth certificates.</p>
          </div>
          <div className="row">
            <div className="col-md-4 col-sm-6">
              <div className="service-box">
                <div className="img-box">
                  <img src="assets/images/ourservice1.jpeg" alt="Service 1" className="img-fluid" />
                </div>
                <div className="detail-box">
                  <h5></h5>
                  <p>Secure birth certificate issuance.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="service-box">
                <div className="img-box">
                  <img src="assets/images/services2.jpg" alt="Service 2" className="img-fluid" />
                </div>
                <div className="detail-box">
                  <h5></h5>
                  <p>Verification of existing birth certificates.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="service-box">
                <div className="img-box">
                  <img src="assets/images/services3.jpg" alt="Service 3" className="img-fluid" />
                </div>
                <div className="detail-box">
                  <h5></h5>
                  <p>Online access to authenticated birth certificates.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- end services section --> */}

 
{/* <!-- client section --> */}

<section className="client_section layout_padding" style={{ background: 'black' }}>
        <div className="container">
          <div className="heading_container heading_center">
            <h2 style={{ color: 'white' }}>What is says our clients</h2>
          </div>
          <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="box">
                  <div className="img-box">
                    <img src="assets/images/client.png" alt="Client" />
                  </div>
                  <div className="detail-box">
                    <h4 style={{ color: 'white' }}>Serge Veniam</h4>
                    <p style={{ color: 'white' }}>
                      Secure your birth certificates and make them easier to access. SANDO combats fraud and offers you convenient and secure online management.
                    </p>
                  </div>
                </div>
              </div>
              {/* Ajoutez d'autres items de carrousel ici si nécessaire */}
            </div>
            <div className="carousel_btn-box">
              <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <i className="fa fa-angle-left" aria-hidden="true"></i>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <i className="fa fa-angle-right" aria-hidden="true"></i>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </section>

{/* <!-- end client section --> */}


{/* <!-- team section --> */}

<section className="team_section layout_padding">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>Highlight the advantages of SANDO</h2>
            <p>
              Our system ensures secure and tamper-proof digitization of birth certificates, protecting against fraud and unauthorized access. With government-backed authentication, you gain peace of mind knowing your identity documents are valid and trusted. Access your records anytime, anywhere with our user-friendly platform, and benefit from top-tier encryption to safeguard your data.
            </p>
          </div>
          <div className="row">
            <div className="col-md-4 col-sm-6 mx-auto">
              <div className="box">
                <div className="img-box">
                  <img src="assets/images/secure.jpg" alt="Enhanced security" />
                </div>
                <div className="detail-box">
                  <h5>Enhanced security:</h5>
                  <h6 className="">Reduce the risk of forgery and fraudulent use.</h6>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 mx-auto">
              <div className="box">
                <div className="img-box">
                  <img src="assets/images/improvee.png" alt="Improved efficiency" />
                </div>
                <div className="detail-box">
                  <h5>Improved efficiency:</h5>
                  <h6 className="">Faster verification and processing times.</h6>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 mx-auto">
              <div className="box">
                <div className="img-box">
                  <img src="assets/images/service.jpg" alt="Increased accessibility" />
                </div>
                <div className="detail-box">
                  <h5>Increased accessibility:</h5>
                  <h6 className="">Secure and convenient access to birth certificates online.</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="btn-box">
            <a href="/">View All</a>
          </div>
        </div>
      </section>

{/* <!-- end team section --> */}


    </div>
  );
}

export default Home;
