import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken, parseJwt } from "../utils/auth";
import { Link } from "react-router-dom";
import socket from "../socket";
import OrderTimeline from "./OrderTimeline";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);

  // ✅ ONLY ONE FILTER (TIME)
  const [timeFilter, setTimeFilter] = useState("all");

  /* ================= LOAD ORDERS ================= */
  const loadOrders = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const user = parseJwt(token);
      const userId = user?._id || user?.id;
      if (!userId) return;

      const res = await axios.get(
        `https://furniture-project-spox.onrender.com/user/orders/${userId}`
      );

      setOrders(res.data.orders || []);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
    socket.on("orderPlaced", loadOrders);
    socket.on("orderStatusUpdated", loadOrders);

    return () => {
      socket.off("orderPlaced", loadOrders);
      socket.off("orderStatusUpdated", loadOrders);
    };
  }, []);

  /* ================= CANCEL ORDER ================= */
  const cancelOrder = async (id) => {
    if (!window.confirm("Cancel this order?")) return;
    setActionId(id);
    await axios.put(
      `https://furniture-project-spox.onrender.com/user/orders/cancel/${id}`
    );
    loadOrders();
    setActionId(null);
  };

  /* ================= DATE FILTER ================= */
  const isWithinRange = (date) => {
    const now = new Date();
    const orderDate = new Date(date);

    if (timeFilter === "today") {
      return now.toDateString() === orderDate.toDateString();
    }

    if (timeFilter === "all") return true;

    const diffDays = (now - orderDate) / (1000 * 60 * 60 * 24);

    if (timeFilter === "30d") return diffDays <= 30;
    if (timeFilter === "6m") return diffDays <= 180;
    if (timeFilter === "1y") return diffDays <= 365;
    if (timeFilter === "3y") return diffDays <= 1095;
    if (timeFilter === "5y") return diffDays <= 1825;

    return true;
  };

  const filteredOrders = orders.filter((o) => isWithinRange(o.createdAt));

  /* ================= STATUS BADGE COLOR ================= */
  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
      case "Ordered":
        return "bg-secondary";
      case "Processing":
        return "bg-warning text-dark";
      case "Shipped":
        return "bg-info text-dark";
      case "Delivered":
        return "bg-success";
      case "Cancelled":
        return "bg-danger";
      default:
        return "bg-dark";
    }
  };

  if (loading) return <h4>Loading orders…</h4>;

  return (
    <div className="container mt-4">
      <h3 className="mb-3">My Orders</h3>

      {/* TIME FILTER */}
      <div className="row mb-4">
        <div className="col-12 col-md-4">
          <select
            className="form-select"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="all">All Orders</option>
            <option value="today">Today</option>
            <option value="30d">Last 30 days</option>
            <option value="6m">Last 6 months</option>
            <option value="1y">Last 1 year</option>
            <option value="3y">Last 3 years</option>
            <option value="5y">Last 5 years</option>
          </select>
        </div>
      </div>

      {filteredOrders.map((order) => (
        <div
          key={order._id}
          className="mb-4 shadow-sm"
          style={{
            background: "#fff",
            borderRadius: "10px",
            padding: "15px",
          }}
        >
          {/* HEADER */}
          <div className="d-flex justify-content-between flex-wrap mb-2">
            <div>
              <b>Order ID:</b> {order._id}
              <div style={{ fontSize: "13px", color: "#666" }}>
                {new Date(order.createdAt).toLocaleString()}
              </div>
            </div>

            {/* ✅ STATUS BADGE (FIXED COLORS) */}
            <span
              className={`badge d-flex align-items-center justify-content-center ${getStatusBadge(
                order.status
              )}`}
              style={{ height: "30px", minWidth: "100px" }}
            >
              {order.status}
            </span>
          </div>

          {/* ITEMS */}
          {order.items.map((item, i) => (
            <div
              key={i}
              className="d-flex gap-3 py-2"
              style={{ borderBottom: "1px solid #eee" }}
            >
              <img
                src={item.productImage}
                alt=""
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
              <div>
                <b>{item.productName}</b>
                <div>Qty: {item.quantity}</div>
                <div>$ {item.price}</div>
              </div>
            </div>
          ))}

          {/* TIMELINE */}
          <div style={{ overflowX: "auto" }}>
            <OrderTimeline order={order} />
          </div>

          {order.status === "Cancelled" && (
            <div
              style={{
                background: "#fff3f3",
                border: "1px solid #f44336",
                padding: "8px",
                borderRadius: "6px",
                fontSize: "13px",
                marginTop: "8px",
              }}
            >
              Cancelled by{" "}
              <b>{order.cancelledBy === "admin" ? "Admin" : "You"}</b>
            </div>
          )}

          <div className="mt-2">
            <b>Total: $ {order.totalAmount}</b>
          </div>

          {/* ACTIONS */}
          <div className="row g-2 mt-3">
            {!["Delivered", "Cancelled"].includes(order.status) && (
              <div className="col-6 col-md-auto">
                <button
                  className="btn btn-danger btn-sm w-100"
                  onClick={() => cancelOrder(order._id)}
                  disabled={actionId === order._id}
                >
                  Cancel
                </button>
              </div>
            )}

            <div className="col-6 col-md-auto">
              <Link
                to={`/orders/${order._id}`}
                className="btn btn-primary btn-sm w-100"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
