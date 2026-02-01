import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";
import Hometestimonialsection from "./Hometestimonialsection";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // 🔥 BULLETPROOF CART SYNC
  useEffect(() => {
    const loadCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(storedCart);
    };

    loadCart();

    window.addEventListener("cartUpdated", loadCart);
    window.addEventListener("storage", loadCart);

    const interval = setInterval(loadCart, 500);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
      window.removeEventListener("storage", loadCart);
      clearInterval(interval);
    };
  }, []);

  const updateCart = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  //  FIXED: use _id
  const increase = (id) => {
    updateCart(
      cartItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrease = (id) => {
    updateCart(
      cartItems.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            }
          : item,
      ),
    );
  };

  const removeItem = (id) => {
    updateCart(cartItems.filter((item) => item._id !== id));
  };

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const handleProceedCheckout = () => {
    const token = getToken();

    if (!token) {
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }

    navigate("/checkout");
  };

  return (
    <>
      {/* HERO */}
      <div className="hero">
        <div className="container">
          <h1 className="intro-excerpt">Cart</h1>
        </div>
      </div>

      {/* CART SECTION */}
      <div className="untree_co-section before-footer-section cart-page">
        <div className="container">
          {cartItems.length === 0 ? (
            <div className="text-center">
              <h2>Your Cart is Empty</h2>
              <p>Looks like you haven't added anything yet.</p>
              <Link to="/shop" className="btn-normal mt-3">
                Go to Shop
              </Link>
            </div>
          ) : (
            <>
              <div className="row mb-5">
                <div className="col-md-12">
                  <table className="table cart-table-custom">
                    <thead>
                      <tr>
                        <th>IMAGE</th>
                        <th>PRODUCT</th>
                        <th>PRICE</th>
                        <th>QUANTITY</th>
                        <th>TOTAL</th>
                        <th>REMOVE</th>
                      </tr>
                    </thead>

                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item._id}>
                          <td>
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{ width: "70px" }}
                            />
                          </td>
                          <td>{item.name}</td>
                          <td>${item.price.toFixed(2)}</td>
                          <td>
                            <div className="qty-box">
                              <button onClick={() => decrease(item._id)}>
                                -
                              </button>
                              <div className="qty-number">{item.quantity}</div>
                              <button onClick={() => increase(item._id)}>
                                +
                              </button>
                            </div>
                          </td>
                          <td>${(item.price * item.quantity).toFixed(2)}</td>
                          <td>
                            <button
                              className="remove-btn"
                              onClick={() => removeItem(item._id)}
                            >
                              x
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-4">
                  <Link to="/shop" className="btn-normal">
                    Continue Shopping
                  </Link>
                </div>

                <div className="col-md-6">
                  <div className="cart-total-box">
                    <h4>Cart Totals</h4>

                    <div className="row mb-2">
                      <div className="col-6">Subtotal</div>
                      <div className="col-6 text-end">
                        <strong>${totalPrice.toFixed(2)}</strong>
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="col-6">Total</div>
                      <div className="col-6 text-end">
                        <strong>${totalPrice.toFixed(2)}</strong>
                      </div>
                    </div>

                    <button
                      onClick={handleProceedCheckout}
                      className="btn-normal w-100 text-center"
                    >
                      Proceed To Checkout
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Hometestimonialsection />
    </>
  );
}

export default Cart;
