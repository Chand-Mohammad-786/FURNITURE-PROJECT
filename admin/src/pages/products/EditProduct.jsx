import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [data, setData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    image: "",
    description: "", // ✅ ADDED
  });

  const [loading, setLoading] = useState(true);

  /* ================= LOAD PRODUCT ================= */
  useEffect(() => {
    axios
      .get(`https://furniture-project-spox.onrender.com/admin/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setData(res.data.product);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  /* ================= UPDATE PRODUCT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.put(
      `https://furniture-project-spox.onrender.com/admin/products/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      },
    );

    navigate("/admin/products");
  };

  if (loading) return <p style={{ padding: 20 }}>Loading product...</p>;

  /* ================= STYLES ================= */

  const pageStyle = {
    padding: "40px 30px",
    display: "flex",
    justifyContent: "center",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "820px",
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    padding: "32px 36px",
  };

  const titleStyle = {
    marginBottom: "8px",
    fontSize: "26px",
    fontWeight: "700",
    color: "#111827",
  };

  const subtitleStyle = {
    marginBottom: "28px",
    fontSize: "14px",
    color: "#6b7280",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  };

  const fieldStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  };

  const labelStyle = {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
  };

  const inputStyle = {
    padding: "12px 14px",
    fontSize: "14px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    outline: "none",
    background: "#f9fafb",
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: "120px",
    resize: "vertical",
  };

  const buttonWrap = {
    marginTop: "32px",
    display: "flex",
    gap: "14px",
  };

  const primaryBtn = {
    padding: "11px 22px",
    fontSize: "14px",
    fontWeight: "600",
    background: "#111827",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  };

  const secondaryBtn = {
    padding: "11px 22px",
    fontSize: "14px",
    fontWeight: "600",
    background: "#f3f4f6",
    color: "#374151",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    cursor: "pointer",
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Edit Product</h2>
        <p style={subtitleStyle}>
          Update product information carefully before saving
        </p>

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

            <div style={fieldStyle}>
              <label style={labelStyle}>Category</label>
              <input
                name="category"
                value={data.category}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div style={{ ...fieldStyle, gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Image URL</label>
              <input
                name="image"
                value={data.image}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            {/* ✅ DESCRIPTION FIELD */}
            <div style={{ ...fieldStyle, gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Product Description</label>
              <textarea
                name="description"
                value={data.description}
                onChange={handleChange}
                placeholder="Enter detailed product description..."
                style={textareaStyle}
              />
            </div>
          </div>

          {/* ================= ACTION BUTTONS ================= */}
          <div style={buttonWrap}>
            <button type="submit" style={primaryBtn}>
              Update Product
            </button>

            <button
              type="button"
              style={secondaryBtn}
              onClick={() => navigate("/admin/products")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
