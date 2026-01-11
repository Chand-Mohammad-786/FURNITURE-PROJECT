import React from "react";
import { Link } from "react-router-dom";

const Homeherosection = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="row justify-content-between ">
          <div className="col-lg-5">
            <div className="intro-excerpt">
              <h1>
                Modern Interior <span className="d-block">Design Studio</span>
              </h1>
              <p className="mb-4">
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
                velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
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

          <div className="col-lg-7 align-items-start">
            <div className="hero-img-wrap">
              <img
                src="/images/couch.png"
                className="img-fluid"
                alt="couch"
                width="780"
                height="520"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Homeherosection;
