import React from "react";
import { Link } from "react-router-dom";
import Hometestimonialsection from "./Hometestimonialsection";

const Service = () => {
  return (
    <>
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5 align-items-start">
              <div className="intro-excerpt">
                <h1>Services</h1>
                <p className="mb-4">
                  Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                  aliquet velit. Aliquam vulputate velit imperdiet dolor tempor
                  tristique.
                </p>

                <p>
                  <Link to="/Shop" className="btn btn-secondary me-2">
                    Shop Now
                  </Link>

                  <Link to="/blog" className="btn btn-white-outline">
                    Explore
                  </Link>
                </p>
              </div>
            </div>

            <div className="col-lg-7 align-items-start">
              <div className="hero-img-wrap">
                <img src="images/couch.png" className="img-fluid" alt="Couch" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Hero Section */}
      {/* Start Why Choose Us Section */}

      <div className="why-choose-section">
        <div className="container">
          <div className="row">
            <div className="col-6 col-md-6 col-lg-3 mb-4">
              <div className="feature">
                <div className="icon">
                  <img
                    src="images/truck.svg"
                    alt="Fast Shipping"
                    className="img-fluid"
                  />
                </div>
                <h3>Fast & Free Shipping</h3>
                <p>
                  Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                  aliquet velit. Aliquam vulputate.
                </p>
              </div>
            </div>

            <div className="col-6 col-md-6 col-lg-3  mb-4">
              <div className="feature">
                <div className="icon">
                  <img
                    src="images/bag.svg"
                    alt="Easy Shopping"
                    className="img-fluid"
                  />
                </div>
                <h3>Easy to Shop</h3>
                <p>
                  Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                  aliquet velit. Aliquam vulputate.
                </p>
              </div>
            </div>

            <div className="col-6 col-md-6 col-lg-3 mb-4">
              <div className="feature">
                <div className="icon mb-1">
                  <img
                    src="images/support.svg"
                    alt="Support"
                    className="img-fluid"
                  />
                </div>
                <h3>24/7 Support</h3>
                <p>
                  Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                  aliquet velit. Aliquam vulputate.
                </p>
              </div>
            </div>

            <div className="col-6 col-md-6 col-lg-3 mb-4">
              <div className="feature">
                <div className="icon">
                  <img
                    src="images/return.svg"
                    alt="Returns"
                    className="img-fluid"
                  />
                </div>
                <h3>Hassle Free Returns</h3>
                <p>
                  Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                  aliquet velit. Aliquam vulputate.
                </p>
              </div>
            </div>

            {/* Duplicate set */}
            <div className="col-6 col-md-6 col-lg-3">
              <div className="feature">
                <div className="icon">
                  <img
                    src="images/truck.svg"
                    alt="Fast Shipping"
                    className="img-fluid"
                  />
                </div>
                <h3>Fast & Free Shipping</h3>
                <p>
                  Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                  aliquet velit. Aliquam vulputate.
                </p>
              </div>
            </div>

            <div className="col-6 col-md-6 col-lg-3">
              <div className="feature">
                <div className="icon">
                  <img
                    src="images/bag.svg"
                    alt="Easy Shopping"
                    className="img-fluid"
                  />
                </div>
                <h3>Easy to Shop</h3>
                <p>
                  Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                  aliquet velit. Aliquam vulputate.
                </p>
              </div>
            </div>

            <div className="col-6 col-md-6 col-lg-3">
              <div className="feature">
                <div className="icon">
                  <img
                    src="images/support.svg"
                    alt="Support"
                    className="img-fluid"
                  />
                </div>
                <h3>24/7 Support</h3>
                <p>
                  Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                  aliquet velit. Aliquam vulputate.
                </p>
              </div>
            </div>

            <div className="col-6 col-md-6 col-lg-3">
              <div className="feature">
                <div className="icon">
                  <img
                    src="images/return.svg"
                    alt="Returns"
                    className="img-fluid"
                  />
                </div>
                <h3>Hassle Free Returns</h3>
                <p>
                  Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                  aliquet velit. Aliquam vulputate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* // added code  */}

      <Hometestimonialsection />
    </>
  );
};

export default Service;
