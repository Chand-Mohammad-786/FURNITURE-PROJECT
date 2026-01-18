import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

/* ================= STYLES (CENTRALIZED) ================= */

const styles = {
  page: {
    padding: "30px",
  },

  card: {
    background: "#ffffff",
    borderRadius: "18px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    padding: "26px 30px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },

  title: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "700",
    color: "#0f172a",
  },

  subtitle: {
    marginTop: "6px",
    fontSize: "14px",
    color: "#64748b",
  },

  addBtn: {
    padding: "10px 20px",
    background: "#22c55e",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(34,197,94,0.25)",
  },

  tableWrap: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "14px 10px",
    fontSize: "14px",
    color: "#334155",
    fontWeight: "600",
    borderBottom: "1px solid #e5e7eb",
  },

  tr: {
    borderBottom: "1px solid #f1f5f9",
  },

  td: {
    padding: "14px 10px",
    fontSize: "14px",
    color: "#334155",
    verticalAlign: "middle",
  },

  img: {
    width: "56px",
    height: "56px",
    objectFit: "cover",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
  },

  statusDraft: {
    padding: "5px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
    background: "#fee2e2",
    color: "#991b1b",
  },

  statusPublished: {
    padding: "5px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
    background: "#dcfce7",
    color: "#166534",
  },

  actions: {
    display: "flex",
    gap: "10px",
  },

  editBtn: {
    padding: "6px 14px",
    background: "#ecfdf5",
    color: "#047857",
    border: "1px solid #a7f3d0",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
  },

  deleteBtn: {
    padding: "6px 14px",
    background: "#fef2f2",
    color: "#b91c1c",
    border: "1px solid #fecaca",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
  },

  noData: {
    textAlign: "center",
    padding: "30px",
    color: "#64748b",
    fontSize: "14px",
  },
};

/* ================= COMPONENT ================= */

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  const loadBlogs = async () => {
    try {
      const res = await axios.get(
        "https://furniture-project-spox.onrender.com/admin/blogs",
      );
      setBlogs(res.data.blogs || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    await axios.delete(
      `https://furniture-project-spox.onrender.com/admin/blogs/${id}`,
    );
    loadBlogs();
  };

  useEffect(() => {
    loadBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* HEADER */}
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>Blogs</h2>
            <p style={styles.subtitle}>Manage all blog posts from here</p>
          </div>

          <Link to="/admin/blogs/add">
            <button style={styles.addBtn}>＋ Add Blog</button>
          </Link>
        </div>

        {/* TABLE */}
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Image</th>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Created</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {blogs.length ? (
                blogs.map((blog) => (
                  <tr key={blog._id} style={styles.tr}>
                    <td style={styles.td}>
                      <img
                        src={
                          blog.image?.startsWith("http")
                            ? blog.image
                            : blog.image
                              ? `https://furniture-project-spox.onrender.com/uploads/${blog.image}`
                              : "https://via.placeholder.com/60"
                        }
                        alt=""
                        style={styles.img}
                      />
                    </td>

                    <td style={{ ...styles.td, fontWeight: 500 }}>
                      {blog.title}
                    </td>

                    <td style={styles.td}>{blog.category || "N/A"}</td>

                    <td style={styles.td}>
                      <span
                        style={
                          blog.isPublished
                            ? styles.statusPublished
                            : styles.statusDraft
                        }
                      >
                        {blog.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>

                    <td style={styles.td}>
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>

                    <td style={styles.td}>
                      <div style={styles.actions}>
                        <Link to={`/admin/blogs/edit/${blog._id}`}>
                          <button style={styles.editBtn}>Edit</button>
                        </Link>

                        <button
                          style={styles.deleteBtn}
                          onClick={() => handleDelete(blog._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={styles.noData}>
                    No blogs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
