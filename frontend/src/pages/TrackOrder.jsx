import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function TrackOrder() {
  const { trackingNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `https://furniture-project-spox.onrender.com/user/order/track/${trackingNumber}`
        );
        setOrder(res.data.order);
      } catch (err) {
        console.log("Error loading tracking info:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [trackingNumber]);

  if (loading) return <h3 className="text-center mt-5">Loading...</h3>;
  if (!order) return <h3 className="text-center mt-5">Tracking not found</h3>;

  const timeline = order.timeline || {};

  const steps = [
    { title: "Order Placed", time: timeline.orderedAt },
    { title: "Processed", time: timeline.processedAt },
    { title: "Shipped", time: timeline.shippedAt },
    { title: "Out For Delivery", time: timeline.outForDeliveryAt },
    { title: "Delivered", time: timeline.deliveredAt },
  ];

  return (
    <div className="container mt-5">
      <h2>Track Your Order</h2>
      <p>
        <strong>Tracking Number:</strong> {order.trackingNumber}
      </p>
      <p>
        <strong>Estimated Delivery:</strong>{" "}
        {new Date(order.estimatedDelivery).toDateString()}
      </p>

      <div className="mt-4">
        {steps.map((step, index) => (
          <div
            key={index}
            style={{
              padding: "15px",
              marginBottom: "10px",
              borderLeft: step.time ? "5px solid green" : "5px solid gray",
              background: "#f8f9fa",
              borderRadius: "4px",
            }}
          >
            <h5 style={{ margin: 0 }}>{step.title}</h5>
            <small>
              {step.time ? new Date(step.time).toLocaleString() : "Pending..."}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrackOrder;
