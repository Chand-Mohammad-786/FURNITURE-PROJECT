import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [otp, setOtp] = useState("");

  // If user comes without email, send them back
  if (!state?.email) {
    navigate("/forgot-password");
    return null;
  }

  const handleVerify = async () => {
    if (!otp) {
      return toast.error("Please enter OTP");
    }

    if (otp.length !== 6) {
      return toast.error("OTP must be 6 digits");
    }

    try {
      const res = await axios.post("http://localhost:9696/user/verify-otp", {
        email: state.email,
        otp,
      });

      if (res.data.status === 400) {
        toast.error(res.data.message);
      } else {
        toast.success("OTP Verified");
        navigate("/reset-password", { state: { email: state.email } });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Enter OTP</h2>

      <input
        type="text"
        className="form-control"
        placeholder="Enter 6-digit OTP"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} // only digits
        style={{ marginBottom: "15px" }}
      />

      <button
        onClick={handleVerify}
        className="btn btn-primary"
        style={{ width: "100%" }}
      >
        Verify OTP
      </button>
    </div>
  );
};

export default VerifyOtp;
