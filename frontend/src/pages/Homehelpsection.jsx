import React from "react";
import { Link } from "react-router-dom";

const Homehelpsection = () => {
  return (
    <section className="we-help-section mt-lg-5">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-7  mb-lg-0">
            <div className="imgs-grid">
              <div className="grid grid-1">
                <img
                  src="/images/img-grid-1.jpg"
                  alt="grid1"
                  className="img-fluid"
                />
              </div>
              <div className="grid grid-2">
                <img
                  src="/images/img-grid-2.jpg"
                  alt="grid2"
                  className="img-fluid"
                />
              </div>
              <div className="grid grid-3">
                <img
                  src="/images/img-grid-3.jpg"
                  alt="grid3"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>

          <div className="col-lg-5 ps-lg-5">
            <h2 className="section-title mb-4">
              We Help You Make Modern Interior Design
            </h2>
            <p>
              Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio
              quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam
              vulputate velit imperdiet dolor tempor tristique. Pellentesque
              habitant morbi tristique senectus et netus et malesuada.
            </p>

            <ul className="list-unstyled custom-list my-4">
              <li>Donec vitae odio quis nisl dapibus malesuada</li>
              <li>Donec vitae odio quis nisl dapibus malesuada</li>
              <li>Donec vitae odio quis nisl dapibus malesuada</li>
              <li>Donec vitae odio quis nisl dapibus malesuada</li>
            </ul>

            <p>
              <Link to="blog" className="explore-btn">
                Explore
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Homehelpsection;
