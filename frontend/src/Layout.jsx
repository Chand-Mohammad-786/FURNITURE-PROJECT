import React from "react";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="site-wrap">
      {/* Furni template ka main wrapper */}

      <Header />

      <main className="content-wrapper">
        {/* Page content */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
