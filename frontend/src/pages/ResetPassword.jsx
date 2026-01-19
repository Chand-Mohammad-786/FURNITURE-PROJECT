import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import API_BASE from "../api.js";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // New states for show/hide functionality
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!state?.email) {
      navigate("/forgot-password");
    }
  }, [state, navigate]);

  const handleReset = async () => {
    const pass = password.trim();
    const cpass = confirmPassword.trim();

    if (!pass || !cpass) return toast.error("Please fill all fields");
    if (pass !== cpass) return toast.error("Passwords do not match");
    if (pass.length < 6)
      return toast.error("Password must be at least 6 characters");

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/user/reset-password`, {
        email: state.email,
        password: pass,
      });
      if (res.data.status === 400) {
        toast.error(res.data.message);
      } else {
        toast.success("Password updated successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Reset Password</h2>

      {/* Password Input */}
      <div style={{ position: "relative", marginBottom: "10px" }}>
        <input
          type={showPassword ? "text" : "password"}
          className="form-control"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <span
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          {showPassword ? "👁️" : "👁️‍🗨️"}
        </span>
      </div>

      {/* Confirm Password Input */}
      <div style={{ position: "relative", marginBottom: "15px" }}>
        <input
          type={showConfirmPassword ? "text" : "password"}
          className="form-control"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <span
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
        </span>
      </div>

      <button
        onClick={handleReset}
        className="btn btn-primary"
        style={{ width: "100%" }}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </div>
  );
};

export default ResetPassword;
