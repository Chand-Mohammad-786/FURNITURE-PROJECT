import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getToken, removeToken } from "../utils/auth";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loggedIn, setLoggedIn] = useState(!!getToken());
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ---------------- CART COUNT ---------------- */
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    setCartCount(total);
  };

  /* ---------------- ROUTE CHANGE ---------------- */
  useEffect(() => {
    setLoggedIn(!!getToken());
    setMenuOpen(false);
  }, [location]);

  /* ---------------- CART SYNC ---------------- */
  useEffect(() => {
    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = () => {
    removeToken();
    toast.success("Logged out successfully");
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="custom-navbar navbar navbar-expand-md">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Furni<span>.</span>
        </Link>

        <button
          className="navbar-toggler"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="custom-navbar-nav navbar-nav ms-auto">
            {[
              ["Home", "/"],
              ["Shop", "/shop"],
              ["About us", "/aboutus"],
              ["Services", "/services"],
              ["Blog", "/blog"],
              ["Contact us", "/contact"],
            ].map(([label, path]) => (
              <li key={path}>
                <Link
                  to={path}
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}

            {loggedIn && (
              <li>
                <Link
                  to="/myorders"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  My Orders
                </Link>
              </li>
            )}
          </ul>

          {/* RIGHT SIDE */}
          <ul className="custom-navbar-cta navbar-nav ms-md-4">
            {/* LOGIN / SIGNUP / LOGOUT */}
            {!loggedIn ? (
              <>
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="nav-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/signup"
                    className="nav-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    Signup
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <span
                  onClick={handleLogout}
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </span>
              </li>
            )}

            {/* CART */}
            <li className="nav-item position-relative">
              <Link
                to="/cart"
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                <img src="/images/cart.svg" alt="cart" />
                {cartCount > 0 && (
                  <span className="badge bg-danger">{cartCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
