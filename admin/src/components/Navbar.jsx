import React from "react";
import { useNavigate } from "react-router-dom";
const Navbar = ({ onToggle }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };
  return (
    <header
      className="admin-navbar"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 20px",
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      {/* ☰ Menu Toggle */}
      <button
        className="menu-btn"
        onClick={onToggle}
        style={{
          fontSize: "20px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: "#111",
        }}
      >
        ☰
      </button>

      {/* PANEL-MATCHING LOGOUT */}
      <button
        className="logout-btn"
        onClick={handleLogout}
        style={{
          background: "#111827",
          color: "#ffffff",
          border: "1px solid #111827",
          padding: "8px 20px",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "500",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "#1f2933";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "#111827";
        }}
      >
        Logout
      </button>
    </header>
  );
};
export default Navbar;
