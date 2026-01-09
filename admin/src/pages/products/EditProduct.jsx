import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [data, setData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    image: "",
    description: "", // ✅ ADDED
  });

  const [loading, setLoading] = useState(true);

  /* ================= LOAD PRODUCT ================= */
  useEffect(() => {
    axios
      .get(`http://localhost:9696/admin/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setData(res.data.product);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  /* ================= UPDATE PRODUCT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.put(`http://localhost:9696/admin/products/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });

    navigate("/admin/products");
  };

  if (loading) return <p style={{ padding: 20 }}>Loading product...</p>;

  /* ================= STYLES ================= */

  const pageStyle = {
    padding: "40px 30px",
    display: "flex",
    justifyContent: "center",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "820px",
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    padding: "32px 36px",
  };

  const titleStyle = {
    marginBottom: "8px",
    fontSize: "26px",
    fontWeight: "700",
    color: "#111827",
  };

  const subtitleStyle = {
    marginBottom: "28px",
    fontSize: "14px",
    color: "#6b7280",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  };

  const fieldStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  };

  const labelStyle = {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
  };

  const inputStyle = {
    padding: "12px 14px",
    fontSize: "14px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    outline: "none",
    background: "#f9fafb",
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: "120px",
    resize: "vertical",
  };

  const buttonWrap = {
    marginTop: "32px",
    display: "flex",
    gap: "14px",
  };

  const primaryBtn = {
    padding: "11px 22px",
    fontSize: "14px",
    fontWeight: "600",
    background: "#111827",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  };

  const secondaryBtn = {
    padding: "11px 22px",
    fontSize: "14px",
    fontWeight: "600",
    background: "#f3f4f6",
    color: "#374151",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    cursor: "pointer",
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Edit Product</h2>
        <p style={subtitleStyle}>
          Update product information carefully before saving
        </p>

        <form onSubmit={handleSubmit}>
          {/* ================= FORM GRID ================= */}
          <div style={gridStyle}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Product Name</label>
              <input
                name="name"
                value={data.name}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Price</label>
              <input
                name="price"
                value={data.price}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Stock</label>
              <input
                name="stock"
                value={data.stock}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Category</label>
              <input
                name="category"
                value={data.category}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div style={{ ...fieldStyle, gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Image URL</label>
              <input
                name="image"
                value={data.image}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            {/* ✅ DESCRIPTION FIELD */}
            <div style={{ ...fieldStyle, gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Product Description</label>
              <textarea
                name="description"
                value={data.description}
                onChange={handleChange}
                placeholder="Enter detailed product description..."
                style={textareaStyle}
              />
            </div>
          </div>

          {/* ================= ACTION BUTTONS ================= */}
          <div style={buttonWrap}>
            <button type="submit" style={primaryBtn}>
              Update Product
            </button>

            <button
              type="button"
              style={secondaryBtn}
              onClick={() => navigate("/admin/products")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// const EditProduct = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   /* ================= STATE ================= */
//   const [data, setData] = useState({
//     name: "",
//     price: "",
//     stock: "",
//     category: "",
//     image: "",
//   });

//   const [loading, setLoading] = useState(true);

//   /* ================= LOAD PRODUCT ================= */
//   useEffect(() => {
//     axios
//       .get(`http://localhost:9696/admin/products/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//         },
//       })
//       .then((res) => {
//         if (res.data.success) {
//           setData(res.data.product);
//         }
//       })
//       .catch((err) => console.log(err))
//       .finally(() => setLoading(false));
//   }, [id]);

//   /* ================= HANDLE INPUT ================= */
//   const handleChange = (e) =>
//     setData({ ...data, [e.target.name]: e.target.value });

//   /* ================= UPDATE PRODUCT ================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     await axios.put(`http://localhost:9696/admin/products/${id}`, data, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//       },
//     });

//     navigate("/admin/products");
//   };

//   if (loading) return <p style={{ padding: 20 }}>Loading product...</p>;

//   /* ================= STYLES ================= */

//   const pageStyle = {
//     padding: "40px 30px",
//     display: "flex",
//     justifyContent: "center",
//   };

//   const cardStyle = {
//     width: "100%",
//     maxWidth: "820px",
//     background: "#ffffff",
//     borderRadius: "16px",
//     boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
//     padding: "32px 36px",
//   };

//   const titleStyle = {
//     marginBottom: "8px",
//     fontSize: "26px",
//     fontWeight: "700",
//     color: "#111827",
//   };

//   const subtitleStyle = {
//     marginBottom: "28px",
//     fontSize: "14px",
//     color: "#6b7280",
//   };

//   const gridStyle = {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: "20px",
//   };

//   const fieldStyle = {
//     display: "flex",
//     flexDirection: "column",
//     gap: "6px",
//   };

//   const labelStyle = {
//     fontSize: "13px",
//     fontWeight: "600",
//     color: "#374151",
//   };

//   const inputStyle = {
//     padding: "12px 14px",
//     fontSize: "14px",
//     borderRadius: "10px",
//     border: "1px solid #d1d5db",
//     outline: "none",
//     background: "#f9fafb",
//   };

//   const buttonWrap = {
//     marginTop: "32px",
//     display: "flex",
//     gap: "14px",
//   };

//   const primaryBtn = {
//     padding: "11px 22px",
//     fontSize: "14px",
//     fontWeight: "600",
//     background: "#111827",
//     color: "#ffffff",
//     border: "none",
//     borderRadius: "10px",
//     cursor: "pointer",
//   };

//   const secondaryBtn = {
//     padding: "11px 22px",
//     fontSize: "14px",
//     fontWeight: "600",
//     background: "#f3f4f6",
//     color: "#374151",
//     border: "1px solid #d1d5db",
//     borderRadius: "10px",
//     cursor: "pointer",
//   };

//   return (
//     <div style={pageStyle}>
//       <div style={cardStyle}>
//         <h2 style={titleStyle}>Edit Product</h2>
//         <p style={subtitleStyle}>
//           Update product information carefully before saving
//         </p>

//         <form onSubmit={handleSubmit}>
//           {/* ================= FORM GRID ================= */}
//           <div style={gridStyle}>
//             <div style={fieldStyle}>
//               <label style={labelStyle}>Product Name</label>
//               <input
//                 name="name"
//                 value={data.name}
//                 onChange={handleChange}
//                 placeholder="iPhone 17 Pro Max"
//                 style={inputStyle}
//                 required
//               />
//             </div>

//             <div style={fieldStyle}>
//               <label style={labelStyle}>Price</label>
//               <input
//                 name="price"
//                 value={data.price}
//                 onChange={handleChange}
//                 placeholder="45000"
//                 style={inputStyle}
//                 required
//               />
//             </div>

//             <div style={fieldStyle}>
//               <label style={labelStyle}>Stock</label>
//               <input
//                 name="stock"
//                 value={data.stock}
//                 onChange={handleChange}
//                 placeholder="0"
//                 style={inputStyle}
//               />
//             </div>

//             <div style={fieldStyle}>
//               <label style={labelStyle}>Category</label>
//               <input
//                 name="category"
//                 value={data.category}
//                 onChange={handleChange}
//                 placeholder="Smartphones"
//                 style={inputStyle}
//               />
//             </div>

//             <div style={{ ...fieldStyle, gridColumn: "1 / -1" }}>
//               <label style={labelStyle}>Image URL</label>
//               <input
//                 name="image"
//                 value={data.image}
//                 onChange={handleChange}
//                 placeholder="https://example.com/image.jpg"
//                 style={inputStyle}
//               />
//             </div>
//           </div>

//           {/* ================= ACTION BUTTONS ================= */}
//           <div style={buttonWrap}>
//             <button type="submit" style={primaryBtn}>
//               Update Product
//             </button>

//             <button
//               type="button"
//               style={secondaryBtn}
//               onClick={() => navigate("/admin/products")}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditProduct;

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useParams, useNavigate } from "react-router-dom";

// // const EditProduct = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();

// //   /* ================= STATE ================= */
// //   const [data, setData] = useState({
// //     name: "",
// //     price: "",
// //     stock: "",
// //     category: "",
// //     image: "",
// //   });

// //   const [loading, setLoading] = useState(true);

// //   /* ================= LOAD PRODUCT ================= */
// //   useEffect(() => {
// //     axios
// //       .get(`http://localhost:9696/admin/products/${id}`, {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
// //         },
// //       })
// //       .then((res) => {
// //         if (res.data.success) {
// //           setData(res.data.product);
// //         }
// //       })
// //       .catch(console.log)
// //       .finally(() => setLoading(false));
// //   }, [id]);

// //   const handleChange = (e) =>
// //     setData({ ...data, [e.target.name]: e.target.value });

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     await axios.put(`http://localhost:9696/admin/products/${id}`, data, {
// //       headers: {
// //         Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
// //       },
// //     });
// //     navigate("/admin/products");
// //   };

// //   if (loading) return <p style={{ padding: 20 }}>Loading product…</p>;

// //   /* ================= STRONG STYLES ================= */

// //   const page = {
// //     minHeight: "100vh",
// //     padding: "40px",
// //     display: "flex",
// //     justifyContent: "center",
// //     alignItems: "flex-start",
// //     background: "#f3f4f6",
// //     indicate: "center",
// //   };

// //   const card = {
// //     width: "100%",
// //     maxWidth: "900px",
// //     background: "#ffffff",
// //     borderRadius: "18px",
// //     boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
// //     padding: "36px 40px",
// //   };

// //   const title = {
// //     fontSize: "28px",
// //     fontWeight: "700",
// //     color: "#111827",
// //     marginBottom: "6px",
// //   };

// //   const subtitle = {
// //     fontSize: "14px",
// //     color: "#6b7280",
// //     marginBottom: "30px",
// //   };

// //   const grid = {
// //     display: "grid",
// //     gridTemplateColumns: "1fr 1fr",
// //     gap: "22px",
// //   };

// //   const field = {
// //     display: "flex",
// //     flexDirection: "column",
// //     gap: "8px",
// //   };

// //   const label = {
// //     fontSize: "13px",
// //     fontWeight: "600",
// //     color: "#374151",
// //   };

// //   const input = {
// //     height: "44px",
// //     padding: "0 14px",
// //     fontSize: "14px",
// //     borderRadius: "10px",
// //     border: "1.5px solid #cbd5e1",
// //     background: "#ffffff",
// //     outline: "none",
// //   };

// //   const actions = {
// //     marginTop: "36px",
// //     display: "flex",
// //     gap: "16px",
// //   };

// //   const primaryBtn = {
// //     padding: "12px 26px",
// //     fontSize: "14px",
// //     fontWeight: "600",
// //     background: "#111827",
// //     color: "#ffffff",
// //     border: "none",
// //     borderRadius: "10px",
// //     cursor: "pointer",
// //   };

// //   const secondaryBtn = {
// //     padding: "12px 26px",
// //     fontSize: "14px",
// //     fontWeight: "600",
// //     background: "#ffffff",
// //     color: "#374151",
// //     border: "1.5px solid #cbd5e1",
// //     borderRadius: "10px",
// //     cursor: "pointer",
// //   };

// //   return (
// //     <div style={page}>
// //       <div style={card}>
// //         <h2 style={title}>Edit Product</h2>
// //         <p style={subtitle}>
// //           Modify product details carefully and save changes
// //         </p>

// //         <form onSubmit={handleSubmit}>
// //           <div style={grid}>
// //             <div style={field}>
// //               <label style={label}>Product Name</label>
// //               <input
// //                 name="name"
// //                 value={data.name}
// //                 onChange={handleChange}
// //                 style={input}
// //                 required
// //               />
// //             </div>

// //             <div style={field}>
// //               <label style={label}>Price</label>
// //               <input
// //                 name="price"
// //                 value={data.price}
// //                 onChange={handleChange}
// //                 style={input}
// //                 required
// //               />
// //             </div>

// //             <div style={field}>
// //               <label style={label}>Stock</label>
// //               <input
// //                 name="stock"
// //                 value={data.stock}
// //                 onChange={handleChange}
// //                 style={input}
// //               />
// //             </div>

// //             <div style={field}>
// //               <label style={label}>Category</label>
// //               <input
// //                 name="category"
// //                 value={data.category}
// //                 onChange={handleChange}
// //                 style={input}
// //               />
// //             </div>

// //             <div style={{ ...field, gridColumn: "1 / -1" }}>
// //               <label style={label}>Image URL</label>
// //               <input
// //                 name="image"
// //                 value={data.image}
// //                 onChange={handleChange}
// //                 style={input}
// //               />
// //             </div>
// //           </div>

// //           <div style={actions}>
// //             <button type="submit" style={primaryBtn}>
// //               Update Product
// //             </button>

// //             <button
// //               type="button"
// //               style={secondaryBtn}
// //               onClick={() => navigate("/admin/products")}
// //             >
// //               Cancel
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default EditProduct;
