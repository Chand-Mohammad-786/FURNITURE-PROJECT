import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API_BASE from "../api";

const Signup = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(`${API_BASE}/user/signup`, data);

      if (response.data.status === 400) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  return (
    /* ===== PAGE WRAPPER (FINAL GAP KILL) ===== */
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px 16px 0",
        marginBottom: "-40px", //  stronger neutralization (safe)
      }}
    >
      {/* ===== SIGNUP CARD ===== */}
      <div
        className="signup-container"
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
          borderRadius: "8px",
          background: "#f8f9fa",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          marginBottom: 0, //  no internal gap
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "14px" }}>Signup</h2>

        <form onSubmit={handleSubmit} style={{ marginBottom: 0 }}>
          <div className="form-group mb-2">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={data.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group mb-2">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group mb-2">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={data.phone}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={data.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ padding: "10px", marginBottom: 0 }}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
