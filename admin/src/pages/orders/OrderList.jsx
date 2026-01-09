import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD ORDERS ================= */
  const loadOrders = async () => {
    try {
      const res = await axios.get(
        "https://furniture-project-spox.onrender.com/admin/orders",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      setOrders(res.data.orders || []);
    } catch (err) {
      console.log("Orders load error:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `https://furniture-project-spox.onrender.com/admin/orders/update-status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      loadOrders();
    } catch (err) {
      console.log("Status update failed:", err);
    }
  };

  /* ================= DELETE ORDER ================= */
  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await axios.delete(
        `https://furniture-project-spox.onrender.com/admin/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      loadOrders();
    } catch (err) {
      console.log("Delete failed:", err);
    }
  };

  const statusOptions = [
    "Pending",
    "Processing",
    "Shipped",
    "OutForDelivery",
    "Delivered",
    "Cancelled",
  ];

  /* ================= INLINE STYLES (ONE PLACE) ================= */
  const styles = {
    page: {
      padding: "10px",
    },
    title: {
      fontSize: "22px",
      fontWeight: "600",
      marginBottom: "16px",
    },
    tableWrap: {
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
      overflow: "hidden",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      padding: "14px",
      background: "#f9fafb",
      textAlign: "left",
      fontSize: "14px",
      fontWeight: "600",
      borderBottom: "1px solid #e5e7eb",
    },
    td: {
      padding: "14px",
      fontSize: "14px",
      borderBottom: "1px solid #f1f5f9",
    },
    badge: (status) => ({
      padding: "6px 12px",
      borderRadius: "999px",
      color: "#fff",
      fontSize: "12px",
      fontWeight: "600",
      background:
        {
          Pending: "#f59e0b",
          Processing: "#3b82f6",
          Shipped: "#6366f1",
          OutForDelivery: "#f97316",
          Delivered: "#10b981",
          Cancelled: "#ef4444",
        }[status] || "#9ca3af",
    }),
    select: {
      padding: "6px 10px",
      borderRadius: "8px",
      border: "1px solid #d1d5db",
    },
    deleteBtn: {
      padding: "6px 14px",
      borderRadius: "8px",
      border: "none",
      background: "#fee2e2",
      color: "#b91c1c",
      cursor: "pointer",
    },
    viewBtn: {
      padding: "6px 14px",
      borderRadius: "8px",
      background: "#eff6ff",
      color: "#1d4ed8",
      textDecoration: "none",
      fontWeight: "500",
    },
    empty: {
      padding: "20px",
      textAlign: "center",
      color: "#6b7280",
    },
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Orders</h2>

      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Order ID</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Update</th>
              <th style={styles.th}>Delete</th>
              <th style={styles.th}>View</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td style={styles.td}>{o._id}</td>
                <td style={styles.td}>₹{o.totalAmount}</td>

                <td style={styles.td}>
                  <span style={styles.badge(o.status)}>{o.status}</span>
                </td>

                <td style={styles.td}>
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o._id, e.target.value)}
                    style={styles.select}
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>

                <td style={styles.td}>
                  <button
                    onClick={() => deleteOrder(o._id)}
                    style={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </td>

                <td style={styles.td}>
                  <Link to={`/admin/orders/${o._id}`} style={styles.viewBtn}>
                    View
                  </Link>
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan="6" style={styles.empty}>
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
