import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
  });

  const loadBlog = async () => {
    try {
      const res = await axios.get(
        `https://furniture-project-spox.onrender.com/admin/blogs/${id}`,
      );
      const blog = res.data.blog;

      setData({
        title: blog.title || "",
        category: blog.category || "",
        content: blog.content || "",
        image: blog.image || "",
      });
    } catch (err) {
      console.log("Load blog error:", err);
    }
  };

  useEffect(() => {
    loadBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `https://furniture-project-spox.onrender.com/admin/blogs/${id}`,
        {
          title: data.title,
          category: data.category,
          content: data.content,
          image: data.image, //  URL only
        },
      );

      navigate("/admin/blogs");
    } catch (err) {
      console.log("Update error:", err);
    }
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ marginBottom: "20px", fontWeight: "600" }}> Edit Blog</h2>

      <form onSubmit={handleSubmit}>
        {/* TITLE */}
        <div style={{ marginBottom: "18px" }}>
          <label style={{ fontWeight: "500" }}>Blog Title</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "6px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
            required
          />
        </div>

        {/* CATEGORY */}
        <div style={{ marginBottom: "18px" }}>
          <label style={{ fontWeight: "500" }}>Category</label>
          <input
            type="text"
            value={data.category}
            onChange={(e) => setData({ ...data, category: e.target.value })}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "6px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* CONTENT */}
        <div style={{ marginBottom: "18px" }}>
          <label style={{ fontWeight: "500" }}>Content</label>
          <textarea
            rows="6"
            value={data.content}
            onChange={(e) => setData({ ...data, content: e.target.value })}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "6px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              resize: "vertical",
            }}
          />
        </div>

        {/* IMAGE URL */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "500" }}>Image URL</label>
          <input
            type="text"
            placeholder="https://example.com/image.jpg"
            value={data.image}
            onChange={(e) => setData({ ...data, image: e.target.value })}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "6px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          {data.image && (
            <img
              src={data.image}
              alt="Preview"
              style={{
                marginTop: "12px",
                width: "220px",
                borderRadius: "8px",
                boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
              }}
            />
          )}
        </div>

        {/* ACTION BUTTON */}
        <button
          type="submit"
          style={{
            padding: "10px 24px",
            background: "#22c55e",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
