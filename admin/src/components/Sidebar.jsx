import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBlog,
  FaBoxOpen,
  FaUsers,
  FaShoppingCart,
  FaImage,
  FaHome,
  FaCog,
  FaUserShield,
  FaEnvelope,
} from "react-icons/fa";

const Sidebar = ({ open, onClose }) => {
  const handleNavClick = () => {
    if (window.innerWidth <= 768) {
      onClose();
    }
  };

  /* ================== INLINE STYLES ================== */

  const navStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  };

  const linkStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 14px",
    fontSize: "14px",
    lineHeight: "1.2",
    textDecoration: "none",

    /* 🔥 FIX FOR SINGLE LINE */
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const iconStyle = {
    fontSize: "15px",
    minWidth: "16px",
  };

  /* ================== ADMIN HEADER ================== */

  const adminWrapper = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "10px",
    marginBottom: "18px",
  };

  const adminIconStyle = {
    fontSize: "72px",
    marginBottom: "6px",
  };

  const adminNameStyle = {
    fontSize: "15px",
    fontWeight: "600",
    margin: 0,
  };

  const adminRoleStyle = {
    fontSize: "12px",
    color: "#aaa",
  };

  return (
    <>
      {open && <div className="overlay" onClick={onClose} />}

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        {/* ================== ADMIN PROFILE ================== */}
        <div style={adminWrapper}>
          <FaUserShield style={adminIconStyle} />
          <p style={adminNameStyle}>Admin</p>
          <span style={adminRoleStyle}>System Administrator</span>
        </div>

        {/* ================== NAVIGATION ================== */}
        <nav className="sidebar-nav" onClick={handleNavClick} style={navStyle}>
          <NavLink to="dashboard" style={linkStyle}>
            <FaTachometerAlt style={iconStyle} />
            Dashboard
          </NavLink>

          <NavLink to="blogs" style={linkStyle}>
            <FaBlog style={iconStyle} />
            Blogs
          </NavLink>

          <NavLink to="products" style={linkStyle}>
            <FaBoxOpen style={iconStyle} />
            Products
          </NavLink>

          <NavLink to="users" style={linkStyle}>
            <FaUsers style={iconStyle} />
            Users
          </NavLink>

          <NavLink to="orders" style={linkStyle}>
            <FaShoppingCart style={iconStyle} />
            Orders
          </NavLink>

          <NavLink to="contact-messages" style={linkStyle}>
            <FaEnvelope style={iconStyle} />
            Contact Messages
          </NavLink>

          <NavLink to="/admin/settings" style={linkStyle}>
            <FaCog style={iconStyle} />
            Settings
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
