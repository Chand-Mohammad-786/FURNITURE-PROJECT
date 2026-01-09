import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EditOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= LOAD ORDER ================= */
  const loadOrder = async () => {
    try {
      const res = await axios.get(
        `https://furniture-project-spox.onrender.com/admin/orders/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setOrder(res.data.order);
      setStatus(res.data.order.status);
    } catch (err) {
      Swal.fire("Error", "Order load failed", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrder();
  }, [id]);

  /* ================= UPDATE ORDER ================= */
  const updateOrder = async () => {
    try {
      await axios.put(
        `https://furniture-project-spox.onrender.com/admin/orders/${id}`,
        { status }, // ❌ no cancel logic here
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Swal.fire("Success", "Order updated successfully", "success");
      navigate(".."); // go back safely
    } catch (err) {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  if (loading) return <h3>Loading...</h3>;
  if (!order) return <h3>Order not found</h3>;

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2>Edit Order</h2>

      {/* ================= STATUS ================= */}
      <label>Status</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "16px",
          borderRadius: "6px",
          border: "1px solid #d1d5db",
        }}
      >
        <option value="Pending">Pending</option>
        <option value="Processing">Processing</option>
        <option value="Shipped">Shipped</option>
        <option value="Delivered">Delivered</option>
        {/* ❌ Cancelled intentionally removed */}
      </select>

      <button className="btn btn-success" onClick={updateOrder}>
        Update Order
      </button>
    </div>
  );
};

export default EditOrder;
