import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_BASE from "../api.js";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const res = await axios.get(`${API_BASE}/user/orders/detail/${id}`);

        if (!res.data.success) return;

        setOrder(res.data.order);
      } catch (err) {
        console.log("Order detail load error:", err);
      }
    };

    loadOrder();
  }, [id]);

  if (!order) return <h4 className="mt-4">Loading…</h4>;

  return (
    <div className="container mt-4">
      <h2>Order Details</h2>
      <hr />

      <h4 className="mt-3">Items</h4>

      {order.items.map((item, i) => {
        // ✅ Direct snapshot from backend
        const product = item.productSnapshot || {};

        const hasHTML =
          typeof product.description === "string" &&
          product.description.includes("<");

        return (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "24px",
              padding: "18px",
              marginBottom: "20px",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              alignItems: "flex-start",
            }}
          >
            {/* IMAGE */}
            <div
              style={{
                width: "140px",
                height: "140px",
                background: "#f6f6f6",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={item.productImage}
                alt={item.productName}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* DETAILS */}
            <div style={{ flex: 1 }}>
              <h5 style={{ marginBottom: "6px" }}>{item.productName}</h5>
              <div>Qty: {item.quantity}</div>
              <div>
                <b>Order Price:</b> ₹{item.price}
              </div>

              {(product.description ||
                product.category ||
                product.material ||
                product.color) && (
                <>
                  <hr />

                  {/* DESCRIPTION */}
                  {product.description &&
                    (hasHTML ? (
                      <div
                        style={{ lineHeight: "1.6" }}
                        dangerouslySetInnerHTML={{
                          __html: product.description,
                        }}
                      />
                    ) : (
                      <p style={{ lineHeight: "1.6", whiteSpace: "pre-line" }}>
                        {product.description}
                      </p>
                    ))}

                  {product.category && (
                    <div>
                      <b>Category:</b> {product.category}
                    </div>
                  )}

                  {product.dimensions?.height && (
                    <div>
                      <b>Height:</b> {product.dimensions.height}
                    </div>
                  )}

                  {product.dimensions?.width && (
                    <div>
                      <b>Width:</b> {product.dimensions.width}
                    </div>
                  )}

                  {product.dimensions?.depth && (
                    <div>
                      <b>Depth:</b> {product.dimensions.depth}
                    </div>
                  )}

                  {product.material && (
                    <div>
                      <b>Material:</b> {product.material}
                    </div>
                  )}

                  {product.color && (
                    <div>
                      <b>Color:</b> {product.color}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderDetail;
