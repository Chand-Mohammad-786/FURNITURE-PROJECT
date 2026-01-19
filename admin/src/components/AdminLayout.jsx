import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
const AdminLayout = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`admin-layout ${open ? "sidebar-open" : ""}`}>
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="content">
        <Navbar onToggle={() => setOpen(!open)} />
        <main className="main-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default AdminLayout;
