import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Thankyou() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("lastOrder"));
    setOrder(saved);
  }, []);

  if (!order) {
    return (
      <div className="text-center mt-5">
        <h2>No recent order found.</h2>
        <Link to="/shop" className="btn btn-black mt-3">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="untree_co-section mb-5">
      <div className="container text-center mb-5">
        <h1 className="mb-4">
          Thank You, {order.customer?.fname || "Customer"}!
        </h1>

        <p className="lead">Your order has been successfully completed.</p>

        <h3 className="mt-5 mb-3">Order Summary</h3>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {order.items?.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}

            <tr>
              <td colSpan="2" className="text-end fw-bold">
                Grand Total:
              </td>
              <td className="fw-bold">${order.total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <Link to="/shop" className="btn btn-black mt-4">
          Back to Shop
        </Link>
      </div>
    </div>
  );
}

export default Thankyou;
