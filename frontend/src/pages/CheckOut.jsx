import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { getToken, parseJwt } from "../utils/auth";
import API_BASE from "../api.js";

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
    0,
  );

  const validateForm = () => {
    const nameRegex = /^[A-Za-z ]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!nameRegex.test(form.fname.trim())) {
      Swal.fire("Error", "Invalid First Name", "error");
      return false;
    }

    if (!nameRegex.test(form.lname.trim())) {
      Swal.fire("Error", "Invalid Last Name", "error");
      return false;
    }

    if (!emailRegex.test(form.email.trim())) {
      Swal.fire("Error", "Invalid Email", "error");
      return false;
    }

    if (!phoneRegex.test(form.phone.trim())) {
      Swal.fire("Error", "Phone must be 10 digits", "error");
      return false;
    }

    if (!form.address || form.address.trim().length < 5) {
      Swal.fire("Error", "Address is too short", "error");
      return false;
    }
    if ((form.email.match(/@/g) || []).length !== 1) {
      Swal.fire("Error", "Email must contain only one @", "error");
      return false;
    }
    // if (form.email.split(".").length > 3) {
    //   Swal.fire("Error", "Invalid email format", "error");
    //   return false;
    // }
    if (form.email.includes("..")) {
      Swal.fire("Error", "Email cannot contain consecutive dots", "error");
      return false;
    }
    // if (!form.email.includes(".com") && !form.email.includes(".in")) {
    //   Swal.fire("Error", "Invalid domain", "error");
    //   return false;
    // }

    return true;
  };

  const placeOrder = async () => {
    if (!validateForm()) {
      return;
    }
    const token = getToken();
    const user = parseJwt(token);
    const userId = user?._id || user?.id;
    console.log("EMAIL FROM FORM:", form.email);

    if (!userId) {
      Swal.fire("Error", "User not authenticated", "error");
      return;
    }

    // if (!form.address || !form.phone || !form.email) {
    //   Swal.fire("Error", "Please fill all details", "warning");
    //   return;
    // }

    const items = cartItems.map((item) => ({
      productId: item._id || null,
      productName: item.name,
      price: item.price,
      quantity: item.quantity || 1,
      productImage: item.image,

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
        `${API_BASE}/user/orders`,
        {
          userId,
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
        },
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
        "error",
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
              {/* <input
                type="text"
                className="form-control"
                placeholder="First Name"
                name="fname"
                value={form.fname}
                onChange={handleChange}
              /> */}
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                name="fname"
                value={form.fname}
                // onChange={handleChange}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^A-Za-z ]/g, "");
                  setForm({ ...form, fname: value });
                }}
                pattern="[A-Za-z ]+"
                title="Only letters allowed"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              {/* <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                name="lname"
                value={form.lname}
                onChange={handleChange}
              /> */}
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                name="lname"
                value={form.lname}
                // onChange={handleChange}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^A-Za-z ]/g, "");
                  setForm({ ...form, lname: value });
                }}
                pattern="[A-Za-z ]+"
                title="Only letters allowed"
                required
              />
            </div>
          </div>

          {/* <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          /> */}
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            name="email"
            value={form.email}
            // onChange={handleChange}
            onChange={(e) => {
              let value = e.target.value;

              // remove spaces
              value = value.replace(/\s/g, "");

              // allow only valid email characters
              value = value.replace(/[^a-zA-Z0-9@._]/g, "");

              // allow only ONE @
              const parts = value.split("@");
              if (parts.length > 2) {
                value = parts[0] + "@" + parts.slice(1).join("");
              }

              setForm({ ...form, email: value });
            }}
            required
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
            title="Enter a valid email (example: abc@gmail.com)"
          />

          {/* <input
            type="text"
            className="form-control mb-3"
            placeholder="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          /> */}
          <input
            type="tel"
            className="form-control mb-3"
            placeholder="Phone"
            name="phone"
            value={form.phone}
            // onChange={handleChange}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");
              setForm({ ...form, phone: value });
            }}
            pattern="[0-9]{10}"
            maxLength="10"
            title="Enter 10 digit number"
            required
          />

          {/* <textarea
            className="form-control"
            rows="3"
            placeholder="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
          /> */}
          <textarea
            className="form-control"
            rows="3"
            placeholder="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
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
