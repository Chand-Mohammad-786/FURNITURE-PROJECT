import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OrderDetail = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState({});

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9696/user/orders/detail/${id}`
        );

        if (!res.data.success) return;

        const orderData = res.data.order;
        setOrder(orderData);

        // fallback for old / static products
        const productMap = {};
        await Promise.all(
          orderData.items.map(async (item) => {
            if (!item.productSnapshot && item.productId) {
              const p = await axios.get(
                `http://localhost:9696/product/${item.productId}`
              );
              productMap[item.productId] = p.data.product || p.data;
            }
          })
        );

        setProducts(productMap);
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
        // ✅ ONE normalized product source
        const product = item.productSnapshot || products[item.productId] || {};

        // ✅ description detection
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
            {/* ✅ IMAGE – SAME FEEL AS PRODUCT PAGE */}
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

                  {/* ✅ DESCRIPTION – STATIC + DYNAMIC SAFE */}
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

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const OrderDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [order, setOrder] = useState(null);
//   const [products, setProducts] = useState({});

//   useEffect(() => {
//     const loadOrder = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:9696/user/orders/detail/${id}`
//         );

//         if (!res.data.success) return;

//         const orderData = res.data.order;
//         setOrder(orderData);

//         // 🔁 fallback only for old orders
//         const productMap = {};
//         await Promise.all(
//           orderData.items.map(async (item) => {
//             if (!item.productSnapshot && item.productId) {
//               const p = await axios.get(
//                 `http://localhost:9696/product/${item.productId}`
//               );
//               productMap[item.productId] = p.data.product || p.data;
//             }
//           })
//         );

//         setProducts(productMap);
//       } catch (err) {
//         console.log("Order detail load error:", err);
//       }
//     };

//     loadOrder();
//   }, [id]);

//   if (!order) return <h4 className="mt-4">Loading…</h4>;

//   return (
//     <div className="container mt-4">
//       <h2>Order Details</h2>
//       <hr />

//       <h4 className="mt-3">Items</h4>

//       {order.items.map((item, i) => {
//         const product = item.productSnapshot || products[item.productId];

//         return (
//           <div
//             key={i}
//             style={{
//               display: "flex",
//               gap: "16px",
//               padding: "16px",
//               marginBottom: "16px",
//               background: "#fff",
//               borderRadius: "10px",
//               boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
//             }}
//           >
//             {/* ✅ IMAGE FIX (same as product page) */}
//             <img
//               src={item.productImage}
//               alt={item.productName}
//               style={{
//                 width: "100px",
//                 height: "100px",
//                 objectFit: "contain",
//                 background: "#f5f5f5",
//                 borderRadius: "8px",
//               }}
//             />

//             <div style={{ flex: 1 }}>
//               <h5>{item.productName}</h5>
//               <div>Qty: {item.quantity}</div>
//               <div>
//                 <b>Order Price:</b> ₹{item.price}
//               </div>

//               {product && (
//                 <>
//                   <hr />

//                   {/* ✅ Description */}
//                   {product.description?.trim() && (
//                     <div>
//                       <b>Description:</b> {product.description}
//                     </div>
//                   )}

//                   {/* ✅ Category */}
//                   {product.category?.trim() && (
//                     <div>
//                       <b>Category:</b> {product.category}
//                     </div>
//                   )}

//                   {/* ✅ Dimensions */}
//                   {product.dimensions?.height?.trim() && (
//                     <div>
//                       <b>Height:</b> {product.dimensions.height}
//                     </div>
//                   )}

//                   {product.dimensions?.width?.trim() && (
//                     <div>
//                       <b>Width:</b> {product.dimensions.width}
//                     </div>
//                   )}

//                   {product.dimensions?.depth?.trim() && (
//                     <div>
//                       <b>Depth:</b> {product.dimensions.depth}
//                     </div>
//                   )}

//                   {/* ✅ Optional fields */}
//                   {product.seatHeight?.trim() && (
//                     <div>
//                       <b>Seat Height:</b> {product.seatHeight}
//                     </div>
//                   )}

//                   {product.material?.trim() && (
//                     <div>
//                       <b>Material:</b> {product.material}
//                     </div>
//                   )}

//                   {product.color?.trim() && (
//                     <div>
//                       <b>Color:</b> {product.color}
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default OrderDetail;

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const OrderDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [order, setOrder] = useState(null);
//   const [products, setProducts] = useState({});

//   useEffect(() => {
//     const loadOrder = async () => {
//       try {
//         // ✅ USER ORDER DETAIL API (FIXED)
//         const res = await axios.get(
//           `http://localhost:9696/user/orders/detail/${id}`
//         );

//         if (!res.data.success) return;

//         const orderData = res.data.order;
//         setOrder(orderData);

//         // ✅ Load product info safely
//         const productMap = {};
//         await Promise.all(
//           orderData.items.map(async (item) => {
//             if (item.productId) {
//               const p = await axios.get(
//                 `http://localhost:9696/product/${item.productId}`
//               );
//               productMap[item.productId] = p.data.product;
//             }
//           })
//         );

//         setProducts(productMap);
//       } catch (err) {
//         console.log("Order detail load error:", err);
//       }
//     };

//     loadOrder();
//   }, [id]);

//   if (!order) return <h4 className="mt-4">Loading…</h4>;

//   return (
//     <div className="container mt-4">
//       <h2>Order Details</h2>

//       <hr />

//       <h4 className="mt-3">Items</h4>

//       {order.items.map((item, i) => {
//         const product = products[item.productId];

//         return (
//           <div
//             key={i}
//             style={{
//               display: "flex",
//               gap: "16px",
//               padding: "12px",
//               marginBottom: "14px",
//               background: "#fff",
//               borderRadius: "8px",
//               boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//             }}
//           >
//             <img
//               src={item.productImage || "/images/default.png"}
//               alt={item.productName}
//               style={{
//                 width: "90px",
//                 height: "90px",
//                 objectFit: "cover",
//                 borderRadius: "6px",
//               }}
//             />

//             <div>
//               <h5>{item.productName}</h5>
//               <div>Qty: {item.quantity}</div>
//               <div>Order Price: ₹{item.price}</div>

//               {product && (
//                 <>
//                   <hr />
//                   <div>
//                     <b>Current Price:</b> ₹{product.price}
//                   </div>
//                   <div>
//                     <b>Stock:</b> {product.stock}
//                   </div>
//                   <div>
//                     <b>Category:</b> {product.category || "—"}
//                   </div>
//                   <div>
//                     <b>Description:</b> {product.description || "—"}
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         );
//       })}

//       {/* ✅ BACK BUTTON AT BOTTOM */}
//     </div>
//   );
// };

// export default OrderDetail;
