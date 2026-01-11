import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import API_BASE from "../api.js";

/* ---------------- CART ---------------- */
const addToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const exist = cart.find((i) => i._id === product._id);

  exist ? exist.quantity++ : cart.push({ ...product, quantity: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
  toast.success(`${product.name} added`);
};

const BASE_URL = window.location.origin;

/* ---------------- STATIC PRODUCTS ---------------- */
const staticProducts = [
  {
    _id: "static1",
    name: "Nordic Chair",
    price: 50,
    image: `${BASE_URL}/images/product-1.png`,
    description:
      "Nordic Chair crafted with premium materials for everyday comfort.",
    dimensions: {
      height: "34 inches",
      width: "22 inches",
      depth: "24 inches",
    },
    seatHeight: "18 inches",
    material: "Solid Wood & Fabric",
    color: "Natural",
    specs: [
      "Height: 34 inches",
      "Seat Height: 18 inches",
      "Width: 22 inches",
      "Depth: 24 inches",
    ],
  },
  {
    _id: "static2",
    name: "Kruzo Aero Chair",
    price: 78,
    image: `${BASE_URL}/images/product-2.png`,
    description:
      "Kruzo Aero Chair designed for modern interiors and ergonomic support.",
    dimensions: {
      height: "36 inches",
      width: "23 inches",
      depth: "25 inches",
    },
    seatHeight: "19 inches",
    material: "Premium Wood & Cushion",
    color: "Brown",
    specs: [
      "Height: 36 inches",
      "Seat Height: 19 inches",
      "Width: 23 inches",
      "Depth: 25 inches",
    ],
  },
  {
    _id: "static3",
    name: "Ergonomic Chair",
    price: 43,
    image: `${BASE_URL}/images/product-3.png`,
    description:
      "Ergonomic Chair designed to provide comfort and proper posture support.",
    dimensions: {
      height: "33 inches",
      width: "21 inches",
      depth: "22 inches",
    },
    seatHeight: "17 inches",
    material: "Engineered Wood & Foam",
    color: "Green",
    specs: [
      "Height: 33 inches",
      "Seat Height: 17 inches",
      "Width: 21 inches",
      "Depth: 22 inches",
    ],
  },
];

const Homeproductsection = ({ showDynamic = false }) => {
  const [dynamicProducts, setDynamicProducts] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null);

  /* ================= LOAD DYNAMIC PRODUCTS ================= */
  const loadProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/products`);
      setDynamicProducts(res.data?.products || []);
    } catch {
      setDynamicProducts([]);
    }
  };

  useEffect(() => {
    if (!showDynamic) return;

    loadProducts();
    socket.on("productChanged", loadProducts);

    return () => socket.off("productChanged", loadProducts);
  }, [showDynamic]);

  const handleProductClick = (id) => {
    setActiveProduct((prev) => (prev === id ? null : id));
  };

  return (
    <section className="product-section">
      <div className="container">
        <div className="row align-items-start">
          {/* LEFT CONTENT */}
          <div className="col-lg-4">
            <h2>Crafted with excellent material.</h2>
            <p>
              Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
              velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
            </p>
            <Link to="/blog" className="explore-btn">
              Explore
            </Link>
          </div>

          {/* STATIC PRODUCTS */}
          <div className="col-lg-8 static-products">
            <div className="row">
              {staticProducts.map((p) => (
                <div key={p._id} className="col-md-4">
                  <div
                    className={`product-item ${
                      activeProduct === p._id ? "active" : ""
                    }`}
                    onClick={() => handleProductClick(p._id)}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="product-thumbnail"
                    />

                    <div className="mobile-product-info">
                      <h3>{p.name}</h3>
                      <strong>₹{p.price}.00</strong>
                    </div>

                    <div className="product-bg">
                      <div className="product-desc">
                        <ul>
                          {p.specs.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>
                      <h3>{p.name}</h3>
                      <strong>₹{p.price}.00</strong>
                    </div>

                    <span
                      className="icon-cross"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(p);
                      }}
                    >
                      +
                    </span>

                    <div
                      className="add-to-cart-text"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(p);
                      }}
                    >
                      Add to Cart
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DYNAMIC PRODUCTS */}
        {showDynamic && dynamicProducts.length > 0 && (
          <div className="row dynamic-row g-0">
            {dynamicProducts.map((p) => (
              <div key={p._id} className="col-lg-3 col-md-4 col-sm-6">
                <div
                  className={`product-item compact-product ${
                    activeProduct === p._id ? "active" : ""
                  }`}
                  onClick={() => handleProductClick(p._id)}
                >
                  <div className="img-box">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="product-thumbnail"
                    />
                  </div>

                  <div className="mobile-product-info">
                    <h3>{p.name}</h3>
                    <strong>₹{p.price}.00</strong>
                  </div>

                  <div className="product-bg">
                    {p.specs?.length > 0 && (
                      <div className="product-desc">
                        <ul>
                          {p.specs.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <h3>{p.name}</h3>
                    <strong>₹{p.price}.00</strong>
                  </div>

                  <span
                    className="icon-cross"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(p);
                    }}
                  >
                    +
                  </span>

                  <div
                    className="add-to-cart-text"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(p);
                    }}
                  >
                    Add to Cart
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Homeproductsection;
