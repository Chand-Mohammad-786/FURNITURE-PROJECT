import React, { useEffect, useState } from "react";
import Hometestimonialsection from "./Hometestimonialsection";
import { Link } from "react-router-dom";
import axios from "axios";
import socket from "../socket";
import API_BASE from "../api";

const Blog = () => {
  /* ================= STATIC BLOGS ================= */
  const baseStaticBlogs = [
    {
      title: "First Time Home Owner Ideas",
      author: "Kristin Watson",
      date: "Dec 19, 2021",
      image: "/images/post-1.jpg",
      content:
        "Buying furniture for your first home is an exciting experience.",
    },
    {
      title: "How To Keep Your Furniture Clean",
      author: "Robert Fox",
      date: "Dec 15, 2021",
      image: "/images/post-2.jpg",
      content:
        "Keeping your furniture clean helps maintain its beauty and life.",
    },
    {
      title: "Small Space Furniture Apartment Ideas",
      author: "Kristin Watson",
      date: "Dec 12, 2021",
      image: "/images/post-3.jpg",
      content: "Smart furniture ideas can transform small apartments easily.",
    },
  ];

  const STATIC_REPEAT_COUNT = 3;

  const staticBlogs = Array(STATIC_REPEAT_COUNT)
    .fill(baseStaticBlogs)
    .flat()
    .map((blog, index) => ({
      ...blog,
      _id: `static-${index}`,
    }));

  /* ================= ADMIN BLOGS ================= */
  const [adminBlogs, setAdminBlogs] = useState([]);

  useEffect(() => {
    const loadBlogs = () => {
      axios
        .get(`${API_BASE}/admin/blogs/public`)
        .then((res) => setAdminBlogs(res.data.blogs || []))
        .catch((err) => console.log(err));
    };

    loadBlogs();
    socket.on("blog-updated", loadBlogs);

    return () => socket.off("blog-updated", loadBlogs);
  }, []);

  /* ================= MERGE BLOGS ================= */
  const allBlogs = [
    ...staticBlogs,
    ...[...adminBlogs].reverse().map((b, index) => ({
      _id: b._id || `dynamic-${index}`,
      title: b.title,
      author: b.author || "Admin",
      date: new Date(b.createdAt).toLocaleDateString(),
      content: b.content || "",
      image: b.image
        ? b.image.startsWith("http")
          ? b.image
          : `${API_BASE}/uploads/${b.image}`
        : "/images/post-1.jpg",
    })),
  ];

  return (
    <>
      {/* HERO SECTION */}
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5 align-items-start">
              <div className="intro-excerpt">
                <h1>Blog</h1>
                <p className="mb-4">
                  Donec vitae odio quis nisl dapibus malesuada.
                </p>
                <p>
                  <Link to="/shop" className="btn btn-secondary me-2">
                    Shop Now
                  </Link>
                  {/* <Link to="/shop" className="btn btn-white-outline">
                    Explore
                  </Link> */}
                </p>
              </div>
            </div>

            <div className="col-lg-7 align-items-start">
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

      {/* BLOG SECTION */}
      <div className="blog-section">
        <div className="container">
          <div className="row">
            {allBlogs.map((blog) => (
              <div key={blog._id} className="col-12 col-sm-6 col-md-4 mb-5">
                <div
                  className="post-entry"
                  style={{ transition: "transform 0.3s ease" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.03)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <Link to="#" className="post-thumbnail">
                    <img src={blog.image} alt="blog" className="img-fluid" />
                  </Link>

                  <div className="post-content-entry">
                    <h3>
                      <Link to="#">{blog.title}</Link>
                    </h3>

                    {/* Reduced spacing here */}
                    <p
                      className="blog-content"
                      style={{
                        marginBottom: "0px",
                        lineHeight: "1.4",
                      }}
                    >
                      {blog.content
                        ? blog.content.slice(0, 90)
                        : "No description"}
                      ...
                    </p>

                    {/* Reduced top margin here */}
                    <div
                      className="meta"
                      style={{
                        marginTop: "0px",
                        fontSize: "14px",
                      }}
                    >
                      <span>
                        by <Link to="#">{blog.author}</Link>
                      </span>
                      <span>
                        {" "}
                        on <Link to="#">{blog.date}</Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Hometestimonialsection />
    </>
  );
};

export default Blog;
