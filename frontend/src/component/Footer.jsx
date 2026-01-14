import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-section ">
      <div className="container position-relative">
        <div className="sofa-img">
          <img src="/images/sofa.png" alt="Sofa" className="img-fluid" />
        </div>

        <div className="row">
          <div className="col-lg-8">
            <div className="subscription-form">
              <h3 className="d-flex align-items-center mb-3">
                <span>Subscribe to Newsletter</span>
              </h3>
            </div>
          </div>
        </div>

        <div className="row g-5">
          <div className="col-lg-4">
            <div className="mb-4 footer-logo-wrap">
              <Link to="/" className="footer-logo">
                Furni<span>.</span>
              </Link>
            </div>
            <p className="mb-4">
              Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio
              quis nisl dapibus malesuada. Nullam ac aliquet velit.
            </p>

            <ul className="list-unstyled custom-social">
              <li>
                <Link to="#">
                  <span className="fa-brands fa-facebook-f"></span>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <span className="fa-brands fa-twitter"></span>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <span className="fa-brands fa-instagram"></span>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <span className="fa-brands fa-linkedin"></span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-8">
            <div className="row links-wrap">
              <div className="col-6 col-sm-6 col-md-3">
                <ul className="list-unstyled">
                  <li>
                    <Link to="/aboutus">About us</Link>
                  </li>
                  <li>
                    <Link to="/services">Services</Link>
                  </li>
                  <li>
                    <Link to="/blog">Blog</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact us</Link>
                  </li>
                </ul>
              </div>

              <div className="col-6 col-sm-6 col-md-3">
                <ul className="list-unstyled">
                  <li>
                    <Link to="#">Support</Link>
                  </li>
                  <li>
                    <Link to="#">Knowledge base</Link>
                  </li>
                  <li>
                    <Link to="#">Live chat</Link>
                  </li>
                </ul>
              </div>

              <div className="col-6 col-sm-6 col-md-3">
                <ul className="list-unstyled">
                  <li>
                    <Link to="#">Jobs</Link>
                  </li>
                  <li>
                    <Link to="#">Our team</Link>
                  </li>
                  <li>
                    <Link to="#">Leadership</Link>
                  </li>
                  <li>
                    <Link to="#">Privacy Policy</Link>
                  </li>
                </ul>
              </div>

              <div className="col-6 col-sm-6 col-md-3">
                <ul className="list-unstyled">
                  <li>
                    <Link to="#">Nordic Chair</Link>
                  </li>
                  <li>
                    <Link to="#">Kruzo Aero</Link>
                  </li>
                  <li>
                    <Link to="#">Ergonomic Chair</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Last Section  */}
        <div className="border-top copyright">
          <div className="row">
            <div className="col-lg-6">
              <p className=" text-center text-lg-start">
                © All Rights Reserved. — Designed with love by{" "}
                <a href="https://untree.co" target="_blank" rel="noreferrer">
                  Untree.co
                </a>{" "}
                Distributed By{" "}
                <a
                  href="https://themewagon.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  ThemeWagon
                </a>
              </p>
            </div>

            <div className="col-lg-6 text-center text-lg-end">
              <ul className="list-unstyled d-inline-flex ms-auto">
                <li className="me-4">
                  <Link to="#">Terms & Conditions</Link>
                </li>
                <li>
                  <Link to="#">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
