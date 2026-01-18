import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { io as ioClient } from "socket.io-client";

const SOCKET_URL = "https://furniture-project-spox.onrender.com";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD PRODUCTS ================= */
  const loadProducts = async () => {
    try {
      const res = await axios.get(
        "https://furniture-project-spox.onrender.com/admin/products",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        },
      );
      setProducts(res.data.products || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE PRODUCT ================= */
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await axios.delete(
        `https://furniture-project-spox.onrender.com/admin/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        },
      );
    } catch (err) {
      console.log("Delete failed", err);
    }
  };

  useEffect(() => {
    loadProducts();

    const socket = ioClient(SOCKET_URL);
    socket.on("productChanged", loadProducts);

    return () => socket.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <p>Loading products...</p>;

  /* ================= STYLES ================= */

  const pageStyle = {
    padding: "20px",
  };

  const cardStyle = {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    padding: "20px",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  };

  const addBtnStyle = {
    background: "#1a73e8",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const thStyle = {
    textAlign: "left",
    fontSize: "13px",
    color: "#555",
    padding: "12px",
    borderBottom: "1px solid #eee",
  };

  const tdStyle = {
    padding: "12px",
    fontSize: "14px",
    borderBottom: "1px solid #f0f0f0",
    verticalAlign: "middle",
  };

  const imgStyle = {
    width: "60px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "8px",
    border: "1px solid #ddd",
  };

  const actionBtn = {
    padding: "6px 10px",
    fontSize: "13px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        {/* ================= HEADER ================= */}
        <div style={headerStyle}>
          <h2 style={{ margin: 0 }}>Products</h2>

          <Link to="/admin/products/add">
            <button style={addBtnStyle}>+ Add Product</button>
          </Link>
        </div>

        {/* ================= TABLE ================= */}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Image</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Price</th>
              {/* <th style={thStyle}>Stock</th> */}
              {/* <th style={thStyle}>Category</th> */}
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td style={tdStyle}>
                  <img
                    src={p.image || "/images/default.png"}
                    alt={p.name}
                    style={imgStyle}
                  />
                </td>

                <td style={tdStyle}>{p.name}</td>
                <td style={tdStyle}>${p.price}</td>
                {/* <td style={tdStyle}>{p.stock || 0}</td> */}
                {/* <td style={tdStyle}>{p.category || "—"}</td> */}

                <td style={tdStyle}>
                  <Link to={`/admin/products/edit/${p._id}`}>
                    <button
                      style={{
                        ...actionBtn,
                        background: "#e8f0fe",
                        color: "#1a73e8",
                        marginRight: "6px",
                      }}
                    >
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => deleteProduct(p._id)}
                    style={{
                      ...actionBtn,
                      background: "#fdecea",
                      color: "#d93025",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p style={{ textAlign: "center", padding: "20px", color: "#777" }}>
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
