import React from 'react'

function About() {
  return (
    <div className="sub_page">
            {/* <!-- about section --> */}

<section className="about_section layout_padding">
  <div className="container">
    <div className="row">
      <div className="col-md-6 px-0">
        <div className="img_container">
          <div className="img-box">
            <img src="assets/images/secure.jpg" alt="" />
          </div>
        </div>
      </div>
      <div className="col-md-6 px-0">
        <div className="detail-box">
          <div className="heading_container ">
            <h2>
            Secure Document Storage:
            </h2>
          </div>
          <p>
          We offer secure, encrypted storage solutions for your digitized birth certificates, ensuring your data is protected at all times.
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
<section className="about_section layout_padding">
  <div className="container">
    <div className="row">
      <div className="col-md-6 px-0">
        <div className="img_container">
          <div className="img-box">
            <img src="assets/images/who-are-we.png" alt="" />
          </div>
        </div>
      </div>
      <div className="col-md-6 px-0">
        <div className="detail-box">
          <div className="heading_container ">
            <h2>
              Who Are We?
            </h2>
          </div>
          <p>
          Founded in 2024, SANDO was established in response to the growing need for secure and reliable birth certificate authentication in Cameroon. With a team of dedicated experts in technology and security, we have developed a robust system that meets the highest standards of data protection and verification.
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
    </div>
  )
}

export default About
