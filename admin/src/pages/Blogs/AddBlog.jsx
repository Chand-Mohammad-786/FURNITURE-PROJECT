import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

    await axios.post("http://localhost:9696/admin/blogs", {
      ...data,
      isPublished: true, // ✅ auto publish
    });

    navigate("/admin/blogs");
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

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// /* ================= STYLES ================= */
// const styles = {
//   page: { padding: "30px", display: "flex", justifyContent: "center" },
//   card: {
//     width: "100%",
//     maxWidth: "720px",
//     background: "#fff",
//     borderRadius: "18px",
//     boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
//     padding: "26px 30px",
//   },
//   title: { marginBottom: "22px", fontSize: "26px", fontWeight: "700" },
//   group: { display: "flex", flexDirection: "column", marginBottom: "18px" },
//   label: { marginBottom: "6px", fontSize: "13px", fontWeight: "600" },
//   input: {
//     padding: "11px 12px",
//     border: "1px solid #d1d5db",
//     borderRadius: "10px",
//     fontSize: "14px",
//   },
//   textarea: {
//     padding: "11px 12px",
//     border: "1px solid #d1d5db",
//     borderRadius: "10px",
//     minHeight: "120px",
//   },
//   btn: {
//     padding: "12px 24px",
//     background: "#22c55e",
//     color: "#fff",
//     border: "none",
//     borderRadius: "12px",
//     fontWeight: "600",
//     cursor: "pointer",
//   },
// };

// /* ================= COMPONENT ================= */
// const AddBlog = () => {
//   const navigate = useNavigate();

//   const [data, setData] = useState({
//     title: "",
//     category: "",
//     content: "",
//     image: "", // ✅ IMAGE URL
//   });

//   const handleChange = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post("http://localhost:9696/admin/blogs", {
//         title: data.title,
//         category: data.category,
//         content: data.content,
//         image: data.image, // ✅ URL directly save
//       });

//       navigate("/admin/blogs");
//     } catch (err) {
//       console.log("Add blog error:", err);
//     }
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.card}>
//         <h2 style={styles.title}>Add New Blog</h2>

//         <form onSubmit={handleSubmit}>
//           <div style={styles.group}>
//             <label style={styles.label}>Blog Title</label>
//             <input
//               name="title"
//               value={data.title}
//               onChange={handleChange}
//               style={styles.input}
//               required
//             />
//           </div>

//           <div style={styles.group}>
//             <label style={styles.label}>Category</label>
//             <input
//               name="category"
//               value={data.category}
//               onChange={handleChange}
//               style={styles.input}
//             />
//           </div>

//           <div style={styles.group}>
//             <label style={styles.label}>Content</label>
//             <textarea
//               name="content"
//               value={data.content}
//               onChange={handleChange}
//               style={styles.textarea}
//             />
//           </div>

//           {/* ✅ IMAGE URL INPUT */}
//           <div style={styles.group}>
//             <label style={styles.label}>Image URL</label>
//             <input
//               name="image"
//               value={data.image}
//               onChange={handleChange}
//               placeholder="https://example.com/image.jpg"
//               style={styles.input}
//             />
//           </div>

//           <button type="submit" style={styles.btn}>
//             Add Blog
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddBlog;
