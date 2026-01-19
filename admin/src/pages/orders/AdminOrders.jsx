import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import socket from "../../socket";
import API_BASE from "../../api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filterRange, setFilterRange] = useState("30");
  const [statusFilter, setStatusFilter] = useState("all");

  /* ================= LOAD ORDERS ================= */
  const loadOrders = async () => {
    try {
      const res = await axios.get(`${API_BASE}/admin/orders`, {
        params: { range: filterRange },
      });
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Load orders error:", err);
      setOrders([]);
    }
  };

  useEffect(() => {
    loadOrders();

    socket.on("orderPlaced", loadOrders);
    socket.on("orderStatusUpdated", loadOrders);
    socket.on("orderRemoved", loadOrders);

    return () => {
      socket.off("orderPlaced", loadOrders);
      socket.off("orderStatusUpdated", loadOrders);
      socket.off("orderRemoved", loadOrders);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterRange]);

  /* ================= CANCEL ORDER ================= */
  const cancelOrder = async (id) => {
    const { value: reason } = await Swal.fire({
      title: "Cancel Order",
      input: "textarea",
      inputLabel: "Cancel Reason",
      showCancelButton: true,
      confirmButtonText: "Confirm Cancel",
      confirmButtonColor: "#dc2626",
    });

    if (!reason) return;

    await axios.put(
      `${API_BASE}/admin/orders/${id}`,
      {
        status: "Cancelled",
        reason,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      },
    );

    Swal.fire("Cancelled!", "Order cancelled successfully", "success");
    loadOrders();
  };

  /* ================= STATUS COLOR ================= */
  const statusColor = (status) => {
    const map = {
      Pending: "#f59e0b",
      Processing: "#2563eb",
      Shipped: "#7c3aed",
      Delivered: "#16a34a",
      Cancelled: "#dc2626",
      Returned: "#6b7280",
    };
    return map[status] || "#6b7280";
  };

  /* ================= FINAL FILTER ================= */
  const filteredOrders = orders.filter((order) => {
    if (statusFilter === "all") return true;
    return order.status === statusFilter;
  });

  return (
    <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
      <h2>Manage Orders</h2>

      {/* ================= FILTER BAR ================= */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
        {/* DATE FILTER */}
        <select
          value={filterRange}
          onChange={(e) => setFilterRange(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px" }}
        >
          <option value="today">Current Day Orders</option>
          <option value="all">All Orders</option>
          <option value="30">Last 30 days</option>
          <option value="6m">Last 6 months</option>
          <option value="1y">Last 1 year</option>
          <option value="3y">Last 3 years</option>
          <option value="5y">Last 5 years</option>
        </select>

        {/* STATUS FILTER */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px" }}
        >
          <option value="all">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Returned">Returned</option>
          <option value="Returned">Shipped</option>
        </select>
      </div>

      {/* ================= ORDERS LIST ================= */}
      {filteredOrders.map((order) => (
        <div
          key={order._id}
          style={{
            background: "#fff",
            borderRadius: "14px",
            padding: "22px",
            marginBottom: "22px",
            boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <b>Order ID:</b> {order._id}
            </div>

            <span
              style={{
                padding: "6px 14px",
                borderRadius: "999px",
                color: "#fff",
                background: statusColor(order.status),
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              {order.status}
            </span>
          </div>

          <hr />

          {order.items.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "16px" }}>
              <img
                src={item.productImage}
                alt=""
                style={{ width: "70px", borderRadius: "8px" }}
              />
              <div>
                <b>{item.productName}</b>
                <div>Qty: {item.quantity}</div>
              </div>
            </div>
          ))}

          {/* ================= ACTION BUTTONS ================= */}
          <div style={{ marginTop: "14px", display: "flex", gap: "10px" }}>
            <Link to={`${order._id}`} className="btn btn-outline-primary">
              View
            </Link>

            {/* ✅ EDIT BUTTON (RESTORED – SAFE) */}
            {order.status !== "Cancelled" && (
              <Link
                to={`edit/${order._id}`}
                className="btn btn-outline-success"
              >
                Edit
              </Link>
            )}

            {order.status !== "Cancelled" && (
              <button
                onClick={() => cancelOrder(order._id)}
                className="btn btn-outline-danger"
              >
                Cancel
              </button>
            )}
            <button
              className="btn btn-outline-danger"
              onClick={async () => {
                if (!window.confirm("Remove this order history?")) return;

                await axios.delete(`${API_BASE}/admin/orders/${order._id}`, {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                  },
                });

                loadOrders();
              }}
            >
              Remove History
            </button>
          </div>
        </div>
      ))}

      {/* ================= EMPTY STATE ================= */}
      {filteredOrders.length === 0 && (
        <p style={{ color: "#6b7280" }}>No orders found</p>
      )}
    </div>
  );
};

export default AdminOrders;
