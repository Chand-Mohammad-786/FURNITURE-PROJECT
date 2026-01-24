import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";

// Pages
import Aboutus from "./pages/Aboutus";
import Blog from "./pages/Blog";
import Cart from "./pages/Cart";
import Services from "./pages/Service";
import Shop from "./pages/Shop";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
import MyOrders from "./pages/MyOrders";
import CheckOut from "./pages/CheckOut";
import Thankyou from "./pages/Thankyou";
import OrderDetails from "./pages/OrderDetails";

// ⭐ ADD THIS NEW IMPORT
import TrackOrder from "./pages/TrackOrder";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Protected Route
import ProtectedRoute from "./component/ProtectedRoute";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* PUBLIC ROUTES */}
            <Route index element={<Home />} />
            <Route path="aboutus" element={<Aboutus />} />
            <Route path="shop" element={<Shop />} />
            <Route path="services" element={<Services />} />
            <Route path="blog" element={<Blog />} />
            <Route path="contact" element={<Contact />} />

            {/* CART */}
            <Route path="cart" element={<Cart />} />

            {/* PROTECTED ROUTES */}
            <Route
              path="checkout"
              element={
                <ProtectedRoute>
                  <CheckOut />
                </ProtectedRoute>
              }
            />

            <Route
              path="myorders"
              element={
                <ProtectedRoute>
                  <MyOrders />
                </ProtectedRoute>
              }
            />

            <Route
              path="orders/:id"
              z
              element={
                <ProtectedRoute>
                  <OrderDetails />
                </ProtectedRoute>
              }
            />

            {/* ⭐ NEW — TRACK ORDER PAGE */}
            <Route path="track/:trackingNumber" element={<TrackOrder />} />

            {/* AUTH ROUTES */}
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="verify-otp" element={<VerifyOtp />} />
            <Route path="reset-password" element={<ResetPassword />} />

            {/* THANK YOU */}
            <Route path="thankyou" element={<Thankyou />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer autoClose={1000} />
    </>
  );
};

export default App;
