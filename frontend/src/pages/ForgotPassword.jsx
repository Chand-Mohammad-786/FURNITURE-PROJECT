import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      return toast.error("Please enter your email");
    }

    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      return toast.error("Invalid email format");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://furniture-project-spox.onrender.com/user/forgot-password",
        { email: trimmedEmail }
      );

      if (res.data.status === 400) {
        toast.error(res.data.message);
      } else {
        toast.success("OTP sent to your email");
        navigate("/verify-otp", { state: { email: trimmedEmail } });
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Forgot Password</h2>

      <form onSubmit={handleSubmit}>
        <label>Enter your Email</label>

        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginTop: "15px", width: "100%" }}
          disabled={loading}
        >
          {loading ? "Sending OTP..." : "Send OTP to Email"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
