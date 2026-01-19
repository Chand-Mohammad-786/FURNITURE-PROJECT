import React from "react";
const OrderTimeline = ({ order }) => {
  const isCancelled = order.status === "Cancelled";
  const steps = isCancelled
    ? ["Ordered", "Cancelled"]
    : ["Ordered", "Processing", "Shipped", "Delivered"];

  const icons = {
    Ordered: "📝",
    Processing: "⚙️",
    Shipped: "🚚",
    Delivered: "📦",
    Cancelled: "❌",
  };

  const currentIndex = steps.indexOf(order.status);

  const getDotColor = (i) => {
    if (isCancelled) {
      return steps[i] === "Cancelled" ? "#dc3545" : "#ccc";
    }
    return i <= currentIndex ? "#198754" : "#ccc";
  };

  const getTextStyle = (i) => {
    if (isCancelled) {
      if (steps[i] === "Cancelled") {
        return { color: "#dc3545", fontWeight: "600" };
      }
      return { color: "#777" };
    }

    if (i === currentIndex) {
      return { color: "#198754", fontWeight: "600" };
    }

    if (i < currentIndex) {
      return { color: "#198754" };
    }

    return { color: "#777" };
  };

  const cancelledDate = order.timeline?.cancelledAt || order.updatedAt || null;

  return (
    <div
      style={{
        display: "flex",
        gap: "28px",
        overflowX: "auto",
        padding: "14px 0",
        marginBottom: "10px",
        scrollBehavior: "smooth",
      }}
    >
      {steps.map((step, i) => (
        <div
          key={step}
          style={{
            minWidth: "90px",
            textAlign: "center",
            fontSize: "13px",
            flexShrink: 0,
            transition: "all 0.3s ease",
            transform:
              i === currentIndex && !isCancelled ? "scale(1.05)" : "scale(1)",
          }}
        >
          {/* ICON */}
          <div
            style={{
              fontSize: "18px",
              marginBottom: "4px",
            }}
          >
            {icons[step]}
          </div>

          {/* DOT */}
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: getDotColor(i),
              margin: "0 auto 6px",
              transition: "background 0.3s ease",
            }}
          />

          {/* TEXT */}
          <div style={getTextStyle(i)}>{step}</div>

          {/* CANCELLED DATE */}
          {step === "Cancelled" && cancelledDate && (
            <div
              style={{
                fontSize: "11px",
                color: "#dc3545",
                marginTop: "4px",
              }}
            >
              {new Date(cancelledDate).toLocaleDateString()}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderTimeline;
