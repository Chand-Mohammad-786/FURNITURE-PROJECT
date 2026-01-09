import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./components/AdminLayout";
import AdminDashBoard from "./pages/DashBoard/AdminDashBoard";
import AdminLogin from "./pages/users/AdminLogin";

// BLOGS
import BlogList from "./pages/Blogs/BlogList";
import AddBlog from "./pages/Blogs/AddBlog";
import EditBlog from "./pages/Blogs/EditBlog";

// PRODUCTS
import ProductList from "./pages/products/ProductList";
import AddProduct from "./pages/products/AddProduct";
import EditProduct from "./pages/products/EditProduct";

// USERS
import UserList from "./pages/users/UserList";
import UserDetail from "./pages/users/UserDetail";
import EditUser from "./pages/users/EditUser";

// ORDERS
import AdminOrders from "./pages/orders/AdminOrders";
import OrderDetail from "./pages/orders/OrderDetail";
import EditOrder from "./pages/orders/EditOrder";

// PROTECTED ROUTE
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminSettings from "./pages/AdminSettings";
// CONTACT MESSAGES
import ContactMessages from "./pages/ContactMessages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* START */}
        <Route path="/" element={<Navigate to="/admin/login" replace />} />

        {/* LOGIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashBoard />} />

          {/* BLOGS */}
          <Route path="blogs" element={<BlogList />} />
          <Route path="blogs/add" element={<AddBlog />} />
          <Route path="blogs/edit/:id" element={<EditBlog />} />

          {/* PRODUCTS */}
          <Route path="products" element={<ProductList />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />

          {/* USERS ✅ FIXED */}
          <Route path="users" element={<UserList />} />
          <Route path="users/edit/:id" element={<EditUser />} />
          <Route path="users/:id" element={<UserDetail />} />

          {/* ORDERS */}
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/edit/:id" element={<EditOrder />} />
          <Route path="orders/:id" element={<OrderDetail />} />

          {/* CONTACT MESSAGES */}
          <Route path="contact-messages" element={<ContactMessages />} />

          {/* SETTINGS */}
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
