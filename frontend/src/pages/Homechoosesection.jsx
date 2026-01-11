import React from "react";
const Homechoosesection = () => {
  return (
    <section className="why-choose-section ">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-6">
            <h2 className="section-title">Why Choose Us</h2>
            <p>
              Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
              velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
            </p>

            <div className="row my-1">
              <div className="col-6 col-md-6">
                <div className="feature">
                  <div className="icon">
                    <img
                      src="/images/truck.svg"
                      alt="truck"
                      className="img-fluid"
                    />
                  </div>
                  <h3>Fast &amp; Free Shipping</h3>
                  <p>Donec vitae odio quis nisl dapibus malesuada.</p>
                </div>
              </div>

              <div className="col-6 col-md-6 my-1">
                <div className="feature">
                  <div className="icon">
                    <img
                      src="/images/bag.svg"
                      alt="bag"
                      className="img-fluid"
                    />
                  </div>
                  <h3>Easy to Shop</h3>
                  <p>Donec vitae odio quis nisl dapibus malesuada.</p>
                </div>
              </div>

              <div className="col-6 col-md-6">
                <div className="feature">
                  <div className="icon">
                    <img
                      src="/images/support.svg"
                      alt="support"
                      className="img-fluid"
                    />
                  </div>
                  <h3>24/7 Support</h3>
                  <p>Donec vitae odio quis nisl dapibus malesuada.</p>{" "}
                </div>
              </div>

              <div className="col-6 col-md-6">
                <div className="feature">
                  <div className="icon">
                    <img
                      src="/images/return.svg"
                      alt="return"
                      className="img-fluid"
                    />
                  </div>
                  <h3>Hassle Free Returns</h3>
                  <p>Donec vitae odio quis nisl dapibus malesuada.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="img-wrap">
              <img
                src="/images/why-choose-us-img.jpg"
                alt="feature"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Homechoosesection;
