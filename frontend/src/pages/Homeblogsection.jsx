import React from "react";
import { Link } from "react-router-dom";

const Homeblogsection = () => {
  return (
    <section className="blog-section">
      <div className="container">
        {/* Header */}
        <div className="row mb-5">
          <div className="col-md-6">
            <h2 className="section-title">Recent Blog</h2>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="row">
          {/* Post 1 */}
          <div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
            <div className="post-entry">
              <Link to="/post/1" className="post-thumbnail">
                <img
                  src="/images/post-1.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </Link>

              <div className="post-content-entry">
                <h3>
                  <Link to="/post/1">First Time Home Owner Ideas</Link>
                </h3>
                <div className="meta">
                  <span>
                    by <Link to="#">Kristin Watson</Link>
                  </span>
                  <span>
                    on <Link to="#">Dec 19, 2021</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Post 2 */}
          <div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
            <div className="post-entry">
              <Link to="/post/2" className="post-thumbnail">
                <img
                  src="/images/post-2.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </Link>

              <div className="post-content-entry">
                <h3>
                  <Link to="/post/2">How To Keep Your Furniture Clean</Link>
                </h3>
                <div className="meta">
                  <span>
                    by <Link to="#">Robert Fox</Link>
                  </span>
                  <span>
                    on <Link to="#">Dec 15, 2021</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Post 3 */}
          <div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
            <div className="post-entry">
              <Link to="/post/3" className="post-thumbnail">
                <img
                  src="/images/post-3.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </Link>

              <div className="post-content-entry">
                <h3>
                  <Link to="/post/3">
                    Small Space Furniture Apartment Ideas
                  </Link>
                </h3>
                <div className="meta">
                  <span>
                    by <Link to="#">Kristin Watson</Link>
                  </span>
                  <span>
                    on <Link to="#">Dec 12, 2021</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Homeblogsection;
