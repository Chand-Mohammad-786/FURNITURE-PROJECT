import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const AddBlog = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://furniture-project-spox.onrender.com/admin/blogs",
        {
          ...data,
          isPublished: true,
        },
      );

      Swal.fire({
        icon: "success",
        title: "Blog Published!",
        text: "New blog added successfully",
        confirmButtonColor: "#1e40af",
      }).then(() => {
        navigate("/admin/blogs");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Something went wrong. Try again.",
      });
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Add New Blog</h2>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div style={styles.field}>
            <label style={styles.label}>Blog Title</label>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              required
              style={styles.input}
            />
          </div>

          {/* Category */}
          <div style={styles.field}>
            <label style={styles.label}>Category</label>
            <input
              type="text"
              name="category"
              value={data.category}
              onChange={handleChange}
              placeholder="e.g. Furniture, Interior"
              style={styles.input}
            />
          </div>

          {/* Content */}
          <div style={styles.field}>
            <label style={styles.label}>Blog Content</label>
            <textarea
              name="content"
              value={data.content}
              onChange={handleChange}
              placeholder="Write blog content here..."
              rows="6"
              style={styles.textarea}
            />
          </div>

          {/* Image */}
          <div style={styles.field}>
            <label style={styles.label}>Image URL</label>
            <input
              type="text"
              name="image"
              value={data.image}
              onChange={handleChange}
              placeholder="https://image-url.com/image.jpg"
              style={styles.input}
            />
          </div>

          {/* Button */}
          <button type="submit" style={styles.button}>
            Publish Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "600px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#333",
  },
  field: {
    marginBottom: "18px",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontWeight: "600",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
  },
  textarea: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
    resize: "vertical",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#1e40af",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
};
