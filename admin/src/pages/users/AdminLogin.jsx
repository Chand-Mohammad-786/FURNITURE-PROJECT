import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  // const [data, setData] = useState({ email: "", password: "" });
  const [data, setData] = useState({ email: "", password: "" });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      setError("Please enter email and password");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://furniture-project-spox.onrender.com/admin/auth/login",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.data.token) {
        localStorage.setItem("adminToken", res.data.token);
        navigate("/admin/dashboard", { replace: true });
      } else {
        setError("Invalid admin credentials");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#111",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
          color: "#fff",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "30px",
            fontWeight: "700",
            letterSpacing: "1px",
          }}
        >
          Admin Login
        </h2>

        {error && (
          <div
            style={{
              background: "#ff4d4d20",
              color: "#ff4d4d",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
              textAlign: "center",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            {error}
          </div>
        )}

        {/* 🔥 FULL AUTOFILL BLOCK */}
        <form onSubmit={handleSubmit} autoComplete="off">
          {/* 🧠 Chrome autofill traps */}
          <input
            type="text"
            name="username"
            autoComplete="username"
            style={{ display: "none" }}
          />
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            style={{ display: "none" }}
          />

          {/* EMAIL — MANUAL ONLY */}
          <input
            type="text"
            name="admin_identifier"
            placeholder="Admin Id"
            value={data.email}
            autoComplete="off"
            spellCheck="false"
            autoCapitalize="off"
            autoCorrect="off"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "16px",
              borderRadius: "8px",
              border: "1px solid #333",
              background: "#1c1c1c",
              color: "#fff",
              fontSize: "15px",
              outline: "none",
            }}
          />

          {/* PASSWORD — MANUAL ONLY */}
          <input
            type="password"
            name="admin_secret"
            placeholder="Password"
            value={data.password}
            autoComplete="new-password"
            spellCheck="false"
            autoCapitalize="off"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "24px",
              borderRadius: "8px",
              border: "1px solid #333",
              background: "#1c1c1c",
              color: "#fff",
              fontSize: "15px",
              outline: "none",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: loading ? "#555" : "#4b7bec",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "0.3s",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
