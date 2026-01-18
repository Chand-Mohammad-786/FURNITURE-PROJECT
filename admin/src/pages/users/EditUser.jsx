import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);

  // 🔹 load user (SAFE)
  useEffect(() => {
    fetch(
      `https://furniture-project-spox.onrender.com/user/findByIdByParams/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      },
    )
      .then((res) => res.json())
      .then((res) => {
        if (res && res.success && res.body) {
          setData({
            name: res.body.name ?? "",
            email: res.body.email ?? "",
            phone: res.body.phone ?? "",
          });
        } else {
          // safety fallback
          setData({
            name: "",
            email: "",
            phone: "",
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("User load error:", err);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(
      `https://furniture-project-spox.onrender.com/user/userUpdate/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({
          id,
          ...data,
        }),
      },
    );

    navigate("/admin/users");
  };

  if (loading) return <p>Loading user...</p>;

  /* ===== INLINE STYLES (UNCHANGED) ===== */

  const pageStyle = {
    minHeight: "70vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "40px",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "420px",
    background: "#ffffff",
    padding: "24px",
    borderRadius: "14px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  };

  const headingStyle = {
    fontSize: "26px",
    fontWeight: "600",
    marginBottom: "18px",
  };

  const inputStyle = {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
  };

  const buttonStyle = {
    marginTop: "8px",
    padding: "12px",
    background: "#198754",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={headingStyle}>Edit User</h2>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <input
            name="name"
            placeholder="Full Name"
            value={data.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            name="email"
            placeholder="Email Address"
            value={data.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={data.phone}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
