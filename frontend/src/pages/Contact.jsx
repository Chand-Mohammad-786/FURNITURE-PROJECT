import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Hometestimonialsection from "./Hometestimonialsection";
import API_BASE from "../api.js";

/* ===== INFO ITEM ===== */
const InfoItem = ({ icon, text }) => (
  <div className="d-flex align-items-start gap-3">
    <div
      style={{
        width: 38,
        height: 38,
        background: "#3b5d50",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
    <div style={{ fontSize: "14px", lineHeight: "1.5" }}>{text}</div>
  </div>
);

const Contact = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.message) {
      alert("Email and message are required");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API_BASE}/api/contact`, form);

      alert("Message sent successfully");

      setForm({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch {
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================= HERO ================= */}
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between align-items-start">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>Contact</h1>
                <p className="mb-4">
                  Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                  aliquet velit. Aliquam vulputate velit imperdiet dolor tempor
                  tristique.
                </p>
                <p>
                  <Link to="/shop" className="btn btn-secondary me-2">
                    Shop Now
                  </Link>
                  <Link to="/shop" className="btn btn-white-outline">
                    Explore
                  </Link>
                </p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="hero-img-wrap">
                <img
                  src="/images/couch.png"
                  className="img-fluid"
                  alt="couch"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CONTACT SECTION ================= */}
      <div
        style={{
          background: "#f3f6f4",
          paddingTop: "60px",
          paddingBottom: "20px",
        }}
      >
        <div className="container">
          <div style={{ maxWidth: "650px", margin: "0 auto" }}>
            {/* INFO STRIP */}
            <div className="row g-4 mb-4">
              <div className="col-12 col-md-6 col-lg-4">
                <InfoItem
                  text={
                    <>
                      43 Raymouth Rd.
                      <br />
                      Baltemoer, London 3910
                    </>
                  }
                  icon={
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    </svg>
                  }
                />
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <InfoItem
                  text="info@yourdomain.com"
                  icon={
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d="M20 4H4v16h16V4zm-8 9L4 6h16l-8 7z" />
                    </svg>
                  }
                />
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <InfoItem
                  text="+1 294 3925 3939"
                  icon={
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.2 11 11 0 003.6.6v3.6A1 1 0 0119 21C10 21 3 14 3 5a1 1 0 011-1h3.6a11 11 0 00.6 3.6 1 1 0 01-.2 1z" />
                    </svg>
                  }
                />
              </div>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} style={{ marginBottom: "0" }}>
              <div className="row mb-2">
                <div className="col-md-6 mb-2">
                  <label>First name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-2">
                  <label>Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-2">
                <label>Phone number</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-2">
                <label>Message</label>
                <textarea
                  className="form-control"
                  rows="3"
                  id="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn"
                style={{
                  background: "#2f2f2f",
                  color: "#fff",
                  padding: "10px 28px",
                  borderRadius: "30px",
                  marginBottom: "0",
                }}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Hometestimonialsection />
    </>
  );
};

export default Contact;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Hometestimonialsection from "./Hometestimonialsection";

// /* ===== INFO ITEM ===== */
// const InfoItem = ({ icon, text }) => (
//   <div className="d-flex align-items-start gap-3">
//     <div
//       style={{
//         width: 38,
//         height: 38,
//         background: "#3b5d50",
//         borderRadius: "10px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         flexShrink: 0,
//       }}
//     >
//       {icon}
//     </div>
//     <div style={{ fontSize: "14px", lineHeight: "1.5" }}>{text}</div>
//   </div>
// );

// const Contact = () => {
//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     phone: "",
//     email: "",
//     message: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.email || !form.message) {
//       alert("Email and message are required");
//       return;
//     }

//     try {
//       setLoading(true);
//       await axios.post(
//         "https://furniture-project-spox.onrender.com/api/contact",
//         form
//       );
//       alert("Message sent successfully");

//       setForm({
//         firstName: "",
//         lastName: "",
//         phone: "",
//         email: "",
//         message: "",
//       });
//     } catch {
//       alert("Failed to send message");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* ================= HERO ================= */}
//       <div className="hero">
//         <div className="container">
//           <div className="row justify-content-between align-items-start">
//             <div className="col-lg-5">
//               <div className="intro-excerpt">
//                 <h1>Contact</h1>
//                 <p className="mb-4">
//                   Donec vitae odio quis nisl dapibus malesuada. Nullam ac
//                   aliquet velit. Aliquam vulputate velit imperdiet dolor tempor
//                   tristique.
//                 </p>
//                 <p>
//                   <Link to="/shop" className="btn btn-secondary me-2">
//                     Shop Now
//                   </Link>
//                   <Link to="/shop" className="btn btn-white-outline">
//                     Explore
//                   </Link>
//                 </p>
//               </div>
//             </div>
//             <div className="col-lg-7">
//               <div className="hero-img-wrap">
//                 <img
//                   src="/images/couch.png"
//                   className="img-fluid"
//                   alt="couch"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= CONTACT SECTION ================= */}
//       <div
//         style={{
//           background: "#f3f6f4",
//           paddingTop: "60px",
//           paddingBottom: "20px",
//         }}
//       >
//         <div className="container">
//           <div style={{ maxWidth: "650px", margin: "0 auto" }}>
//             {/* INFO STRIP */}
//             <div className="row g-4 mb-4">
//               <div className="col-12 col-md-6 col-lg-4">
//                 <InfoItem
//                   text={
//                     <>
//                       43 Raymouth Rd.
//                       <br />
//                       Baltemoer, London 3910
//                     </>
//                   }
//                   icon={
//                     <svg
//                       width="18"
//                       height="18"
//                       viewBox="0 0 24 24"
//                       fill="white"
//                     >
//                       <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
//                     </svg>
//                   }
//                 />
//               </div>

//               <div className="col-12 col-md-6 col-lg-4">
//                 <InfoItem
//                   text="info@yourdomain.com"
//                   icon={
//                     <svg
//                       width="18"
//                       height="18"
//                       viewBox="0 0 24 24"
//                       fill="white"
//                     >
//                       <path d="M20 4H4v16h16V4zm-8 9L4 6h16l-8 7z" />
//                     </svg>
//                   }
//                 />
//               </div>

//               <div className="col-12 col-md-6 col-lg-4">
//                 <InfoItem
//                   text="+1 294 3925 3939"
//                   icon={
//                     <svg
//                       width="18"
//                       height="18"
//                       viewBox="0 0 24 24"
//                       fill="white"
//                     >
//                       <path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.2 11 11 0 003.6.6v3.6A1 1 0 0119 21C10 21 3 14 3 5a1 1 0 011-1h3.6a11 11 0 00.6 3.6 1 1 0 01-.2 1z" />
//                     </svg>
//                   }
//                 />
//               </div>
//             </div>

//             {/* FORM */}
//             <form onSubmit={handleSubmit} style={{ marginBottom: "0" }}>
//               <div className="row mb-2">
//                 <div className="col-md-6 mb-2">
//                   <label>First name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="firstName"
//                     value={form.firstName}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="col-md-6 mb-2">
//                   <label>Last name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="lastName"
//                     value={form.lastName}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>

//               <div className="mb-2">
//                 <label>Phone number</label>
//                 <input
//                   type="tel"
//                   className="form-control"
//                   id="phone"
//                   value={form.phone}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="mb-2">
//                 <label>Email address</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   id="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="mb-2">
//                 <label>Message</label>
//                 <textarea
//                   className="form-control"
//                   rows="3"
//                   id="message"
//                   value={form.message}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="btn"
//                 style={{
//                   background: "#2f2f2f",
//                   color: "#fff",
//                   padding: "10px 28px",
//                   borderRadius: "30px",
//                   marginBottom: "0", // ✅ gap kill
//                 }}
//               >
//                 {loading ? "Sending..." : "Send Message"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//       <Hometestimonialsection />
//     </>
//   );
// };

// export default Contact;
