import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_BASE from "../../api";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  /* ================= LOAD ORDER ================= */
  const loadOrder = async () => {
    try {
      const res = await axios.get(`${API_BASE}/admin/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setOrder(res.data.order);
    } catch (err) {
      console.log("Admin order detail error:", err);
    }
  };

  useEffect(() => {
    loadOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!order) return <h4>Loading…</h4>;

  return (
    <div className="container mt-4">
      <h2>Order Details (Admin)</h2>

      <hr />

      {/* ================= ORDER STATUS (VIEW ONLY) ================= */}
      <div
        style={{
          background: "#f8f9fa",
          padding: "16px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <b>Status:</b>{" "}
        <span
          style={{
            color: order.status === "Cancelled" ? "#c62828" : "#e53935",
            fontWeight: "600",
          }}
        >
          {order.status}
        </span>
        {order.status === "Cancelled" && order.cancelReason && (
          <div
            style={{
              marginTop: "12px",
              background: "#fdecea",
              color: "#c62828",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            <b>Cancelled Reason:</b>
            <div>{order.cancelReason}</div>
          </div>
        )}
      </div>

      {/* ================= ITEMS ================= */}
      <h4 className="mt-3">Items</h4>

      {order.items.map((item, i) => {
        return (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "16px",
              padding: "14px",
              marginBottom: "16px",
              background: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
            }}
          >
            <img
              src={item.productImage || "/images/default.png"}
              alt={item.productName}
              style={{
                width: "90px",
                height: "90px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />

            <div>
              <h5 style={{ marginBottom: "6px" }}>{item.productName}</h5>
              <div>Qty: {item.quantity}</div>
              <div>
                <b>Order Price:</b> ${item.price}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderDetail;
