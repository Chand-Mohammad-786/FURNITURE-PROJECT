import React from "react";
import Homeproductsection from "./Homeproductsection";
import Hometestimonialsection from "./Hometestimonialsection";
const Shop = () => {
  return (
    <>
      {/*  HERO SECTION — Shop banner */}
      <div className="hero">
        <div className="container">
          <h1>Shop</h1>
        </div>
      </div>

      {/*  PRODUCT SECTION — Reusable component */}
      {/* <Homeproductsection  /> */}
      <Homeproductsection showDynamic={true} />
      <Hometestimonialsection />
    </>
  );
};

export default Shop;
