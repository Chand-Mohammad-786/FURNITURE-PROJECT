import React from "react";
import { Link } from "react-router-dom";

import Homechoosesection from "./Homechoosesection";
import Hometestimonialsection from "./Hometestimonialsection";

const Aboutus = () => {
  return (
    <div>
      <>
        {/* Start Hero Section */}

        <div className="hero ">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-5">
                <div className="intro-excerpt">
                  <h1>About Us</h1>
                  <p className="mb-4">
                    Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                    aliquet velit. Aliquam vulputate velit imperdiet dolor
                    tempor tristique.
                  </p>
                  <p>
                    <Link to="/shop" className="btn btn-secondary me-2">
                      Shop Now
                    </Link>
                    <Link to="/blog" className="btn btn-white-outline">
                      Explore
                    </Link>
                  </p>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="hero-img-wrap">
                  <img
                    src="/images/couch.png"
                    className="img-fluid"
                    alt="couch"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Hero Section */}
        {/* Start Why Choose Us Section */}

        {/* // my added choose code */}
        <Homechoosesection />

        {/* End Why Choose Us Section */}
        {/* Start Team Section */}
        <div className="untree_co-section">
          <div className="container ">
            <div className="row mb-5 ">
              <div className="col-lg-5 mx-auto text-center">
                <h2 className="section-title">Our Team</h2>
              </div>
            </div>

            <div className="row team-row mx-auto">
              {/* Start Column 1 */}
              <div className="col-12 col-md-6 col-lg-3 mb-5 mb-md-0 team-card">
                <img
                  src="images/person_1.jpg"
                  className="img-fluid mb-4 team-img"
                  alt="Lawson Arnold"
                />
                <h3 className="team-name">
                  <Link to="#">
                    <span>Lawson</span> Arnold
                  </Link>
                </h3>
                <span className="d-block position mb-3 team-role">
                  CEO, Founder, Atty.
                </span>
                <p className="team-text">
                  Separated they live in. Separated they live in Bookmarksgrove
                  right at the coast of the Semantics.
                </p>
                <p className="mb-0">
                  <Link to="#" className="more dark team-link">
                    Learn More <span className="icon-arrow_forward" />
                  </Link>
                </p>
              </div>

              {/* Column 2 */}
              <div className="col-12 col-md-6 col-lg-3 mb-5 mb-md-0 team-card">
                <img
                  src="images/person_2.jpg"
                  className="img-fluid mb-4 team-img"
                />
                <h3 className="team-name">
                  <Link to="#">
                    <span>Jeremy</span> Walker
                  </Link>
                </h3>
                <span className="d-block position mb-3 team-role">
                  CEO, Founder, Atty.
                </span>
                <p className="team-text">
                  Separated they live in. Separated they live in Bookmarksgrove
                  right at the coast of the Semantics.
                </p>
                <p className="mb-0">
                  <Link to="#" className="more dark team-link">
                    Learn More <span className="icon-arrow_forward" />
                  </Link>
                </p>
              </div>

              {/* Column 3 */}
              <div className="col-12 col-md-6 col-lg-3 mb-5 mb-md-0 team-card">
                <img
                  src="images/person_3.jpg"
                  className="img-fluid mb-4 team-img"
                />
                <h3 className="team-name">
                  <Link to="#">
                    <span>Patrik</span> White
                  </Link>
                </h3>
                <span className="d-block position mb-3 team-role">
                  CEO, Founder, Atty.
                </span>
                <p className="team-text">
                  Separated they live in. Separated they live in Bookmarksgrove
                  right at the coast of the Semantics.
                </p>
                <p className="mb-0">
                  <Link to="#" className="more dark team-link">
                    Learn More <span className="icon-arrow_forward" />
                  </Link>
                </p>
              </div>

              {/* Column 4 */}
              <div className="col-12 col-md-6 col-lg-3 mb-5 mb-md-0 team-card">
                <img
                  src="images/person_4.jpg"
                  className="img-fluid mb-4 team-img"
                />
                <h3 className="team-name">
                  <Link to="#">
                    <span>Kathryn</span> Ryan
                  </Link>
                </h3>
                <span className="d-block position mb-3 team-role">
                  CEO, Founder, Atty.
                </span>
                <p className="team-text">
                  Separated they live in. Separated they live in Bookmarksgrove
                  right at the coast of the Semantics.
                </p>
                <p className="mb-0">
                  <Link to="#" className="more dark team-link">
                    Learn More <span className="icon-arrow_forward" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* End Team Section */}
        {/* Start Testimonial Slider */}

        {/* // added code  */}
        <Hometestimonialsection />
      </>
    </div>
  );
};

export default Aboutus;
