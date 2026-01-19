import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { saveToken } from "../utils/auth";
import API_BASE from "../api.js";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [data, setData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE}/user/login`, data);

      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }

      const token = response.data.token;
      if (!token) {
        toast.error("Token missing in response");
        return;
      }

      saveToken(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err?.response?.data?.message || "Login failed";
      toast.error(msg);
    }
  };

  return (
    /* ===== PAGE WRAPPER (FINAL GAP FIX) ===== */
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px 16px 0",
        marginBottom: "-16px",
      }}
    >
      {/* ===== LOGIN CARD ===== */}
      <div
        className="login-container"
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#fff",
        }}
      >
        <h2 style={{ marginBottom: "14px" }}>Login</h2>

        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          style={{ marginBottom: 0 }}
        >
          <div className="mb-2">
            <label>Email / Phone</label>
            <input
              name="identifier"
              className="form-control"
              value={data.identifier}
              onChange={handleChange}
              autoComplete="username"
            />
          </div>

          <div className="mb-2">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              value={data.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>

          {/* FORGOT PASSWORD */}
          <div style={{ textAlign: "right", marginTop: "4px" }}>
            <Link to="/forgot-password" style={{ fontSize: "13px" }}>
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ marginTop: "12px", marginBottom: 0 }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
