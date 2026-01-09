import React, { useState } from "react";
import axios from "axios";

/* ================= STYLES (TOP – CLEAN & FORMAL) ================= */

const styles = {
  page: {
    minHeight: "85vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "60px",
    backgroundColor: "#f5f6f8",
  },

  card: {
    width: "100%",
    maxWidth: "480px",
    backgroundColor: "#ffffff",
    padding: "32px",
    borderRadius: "14px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
  },

  title: {
    fontSize: "26px",
    fontWeight: "600",
    marginBottom: "6px",
    color: "#111827",
  },

  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "24px",
  },

  message: {
    backgroundColor: "#eef2ff",
    color: "#1e40af",
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "14px",
    marginBottom: "20px",
  },

  field: {
    marginBottom: "18px",
  },

  label: {
    display: "block",
    fontSize: "13px",
    marginBottom: "6px",
    color: "#374151",
    fontWeight: "500",
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "13px",
    marginTop: "10px",
    backgroundColor: "#111827",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
  },
};

/* ================= COMPONENT ================= */

const AdminSettings = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await axios.put(
        "http://localhost:9696/admin/change-credentials",
        {
          currentPassword: oldPassword,
          newEmail,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      setMsg(res.data.message || "Updated successfully");

      if (res.data.success) {
        localStorage.removeItem("adminToken");
        setTimeout(() => {
          window.location.href = "/admin/login";
        }, 1500);
      }
    } catch (err) {
      setMsg(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Settings</h2>
        <p style={styles.subtitle}>Update your login credentials securely</p>

        {msg && <div style={styles.message}>{msg}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>New Email</label>
            <input
              type="email"
              placeholder="Enter new email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Updating..." : "Update Settings"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
