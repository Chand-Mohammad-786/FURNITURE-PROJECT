import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [data, setData] = useState({
    name: "",
    price: "",
    stock: "",
    // category: "",
    description: "",
    image: "",
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:9696/admin/products", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });

    navigate("/admin/products");
  };

  /* ================= STYLES ================= */

  const pageStyle = {
    padding: "30px",
    display: "flex",
    justifyContent: "center",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "800px",
    background: "#fff",
    borderRadius: "14px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    padding: "28px",
  };

  const titleStyle = {
    marginBottom: "22px",
    fontSize: "22px",
    fontWeight: "600",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "18px",
  };

  const fieldStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  };

  const labelStyle = {
    fontSize: "13px",
    fontWeight: "500",
    color: "#555",
  };

  const inputStyle = {
    padding: "10px 12px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: "110px",
    resize: "vertical",
  };

  const buttonStyle = {
    marginTop: "24px",
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: "600",
    background: "#1a73e8",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "fit-content",
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Add Product</h2>

        <form onSubmit={handleSubmit}>
          {/* ================= FORM GRID ================= */}
          <div style={gridStyle}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Product Name</label>
              <input
                name="name"
                value={data.name}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Price</label>
              <input
                name="price"
                value={data.price}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Stock</label>
              <input
                name="stock"
                value={data.stock}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            {/* <div style={fieldStyle}>
              <label style={labelStyle}>Category</label>
              <input
                name="category"
                value={data.category}
                onChange={handleChange}
                style={inputStyle}
              />
            </div> */}

            <div style={{ ...fieldStyle, gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Image URL</label>
              <input
                name="image"
                value={data.image}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            <div style={{ ...fieldStyle, gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Product Description</label>
              <textarea
                name="description"
                value={data.description}
                onChange={handleChange}
                style={textareaStyle}
              />
            </div>
          </div>

          {/* ================= SUBMIT ================= */}
          <button type="submit" style={buttonStyle}>
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
