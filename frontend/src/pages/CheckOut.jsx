import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { getToken } from "../utils/auth";
import { parseJwt } from "../utils/auth";
function CheckOut() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, [navigate]);

  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  console.log("CART ITEMS:", cartItems);

  const placeOrder = async () => {
    const token = getToken();
    const user = parseJwt(token);
    const userId = user?._id || user?.id;

    if (!userId) {
      Swal.fire("Error", "User not authenticated", "error");
      return;
    }

    if (!form.address || !form.phone || !form.email) {
      Swal.fire("Error", "Please fill all details", "warning");
      return;
    }

    const items = cartItems.map((item) => ({
      productId: item._id || null, // ✅ YAHAN

      productName: item.name,
      price: item.price,
      quantity: item.quantity || 1,
      productImage: item.image,

      // ✅ STATIC PRODUCT DATA (VERY IMPORTANT)
      description: item.description || "",

      dimensions: item.dimensions || {
        height: item.height || "",
        width: item.width || "",
        depth: item.depth || "",
      },

      seatHeight: item.seatHeight || "",
      material: item.material || "",
      color: item.color || "",
    }));

    try {
      await axios.post(
        "http://localhost:9696/user/orders",
        {
          userId, // ✅ REQUIRED BY BACKEND
          items,
          totalAmount: total,
          address: form.address,
          phone: form.phone,
          email: form.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));

      Swal.fire("Success", "Order placed successfully", "success");
      navigate("/thankyou");
    } catch (err) {
      console.log("ORDER ERROR:", err.response?.data || err.message);
      Swal.fire(
        "Error",
        err.response?.data?.message || "Order failed",
        "error"
      );
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4">Checkout</h2>

      <div className="row">
        {/* LEFT SIDE */}
        <div className="col-md-7">
          <h5 className="mb-3">Billing Details</h5>

          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                name="fname"
                value={form.fname}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                name="lname"
                value={form.lname}
                onChange={handleChange}
              />
            </div>
          </div>

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />

          <textarea
            className="form-control"
            rows="3"
            placeholder="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-5">
          <h5 className="mb-3">Your Order</h5>

          <ul className="list-group mb-3">
            {cartItems.map((item, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between"
              >
                <span>
                  {item.name} × {item.quantity || 1}
                </span>
                <strong>${item.price * (item.quantity || 1)}</strong>
              </li>
            ))}

            <li className="list-group-item d-flex justify-content-between">
              <strong>Total</strong>
              <strong>${total}</strong>
            </li>
          </ul>

          <button className="btn btn-dark w-100 mb-5" onClick={placeOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
