import userDataSchema from "../model/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";

/* ===================== SIGNUP ===================== */
export const signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const findEmail = await userDataSchema.findOne({ email });
    if (findEmail) {
      return res.json({
        success: false,
        status: 400,
        message: "Email already registered",
        body: {},
      });
    }

    const findPhone = await userDataSchema.findOne({ phone });
    if (findPhone) {
      return res.json({
        success: false,
        status: 400,
        message: "Phone number already registered",
        body: {},
      });
    }

    const encPass = await bcrypt.hash(password, 10);

    const data = await userDataSchema.create({
      name,
      email,
      phone,
      password: encPass,
    });

    // 🔌 SOCKET EMIT
    const io = req.app.get("io");
    io.emit("user_created", data);

    return res.json({
      success: true,
      status: 200,
      message: "Account created successfully",
      body: data,
    });
  } catch (error) {
    return res.json({
      success: false,
      status: 400,
      message: "Signup failed",
      body: {},
    });
  }
};

/* ===================== LOGIN ===================== */
export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.json({
        success: false,
        status: 400,
        message: "Credentials required",
        body: {},
      });
    }

    const user = await userDataSchema.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (!user) {
      return res.json({
        success: false,
        status: 400,
        message: "Invalid email or phone",
        body: {},
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({
        success: false,
        status: 400,
        message: "Incorrect password",
        body: {},
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.json({
      success: true,
      status: 200,
      message: "Login successful",
      token,
      body: user,
    });
  } catch (error) {
    return res.json({
      success: false,
      status: 400,
      message: error.message,
      body: {},
    });
  }
};

/* ===================== FIND USERS ===================== */
export const findUser = async (req, res) => {
  try {
    const data = await userDataSchema.find();
    const count = await userDataSchema.countDocuments();

    return res.json({
      success: true,
      status: 200,
      message: "All users data",
      body: data,
      count,
    });
  } catch (error) {
    return res.json({
      success: false,
      status: 400,
      message: "Error fetching users",
      body: {},
    });
  }
};

export const findByIdByBody = async (req, res) => {
  try {
    const data = await userDataSchema.findById(req.body.id);

    return res.json({
      success: true,
      status: 200,
      message: "User found",
      body: data,
    });
  } catch {
    return res.json({
      success: false,
      status: 400,
      message: "User not found",
      body: {},
    });
  }
};

export const findByIdByParams = async (req, res) => {
  try {
    const data = await userDataSchema.findById(req.params.id);

    return res.json({
      success: true,
      status: 200,
      message: "User found",
      body: data,
    });
  } catch {
    return res.json({
      success: false,
      status: 400,
      message: "User not found",
      body: {},
    });
  }
};

/* ===================== DELETE USER ===================== */
export const dataDelete = async (req, res) => {
  try {
    const data = await userDataSchema.findByIdAndDelete(req.params.id);

    return res.json({
      success: true,
      status: 200,
      message: "User deleted",
      body: data,
    });
  } catch {
    return res.json({
      success: false,
      status: 400,
      message: "Delete failed",
      body: {},
    });
  }
};

/* ===================== UPDATE USER ===================== */
export const userUpdate = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.body.password) {
      updateData.password = await bcrypt.hash(req.body.password, 10);
    }

    const data = await userDataSchema.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true },
    );

    if (!data) {
      return res.json({
        success: false,
        status: 404,
        message: "User not found",
        body: {},
      });
    }

    // ✉️ EMAIL (SendGrid)
    if (req.body.password) {
      await sendEmail({
        to: data.email,
        subject: "Password Changed Successfully",
        html: `
          <h3>Hello ${data.name || "User"},</h3>
          <p>Your account password has been changed successfully.</p>
        `,
      });
    }

    return res.json({
      success: true,
      status: 200,
      message: "Data updated",
      body: data,
    });
  } catch (error) {
    return res.json({
      success: false,
      status: 400,
      message: "Update failed",
      body: {},
    });
  }
};

/* ===================== FORGOT PASSWORD ===================== */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({
        success: false,
        status: 400,
        message: "Email is required",
        body: {},
      });
    }

    const user = await userDataSchema.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        status: 400,
        message: "Email not found",
        body: {},
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpire = Date.now() + 5 * 60 * 1000;

    await userDataSchema.updateOne({ email }, { otp, otpExpire });

    await sendEmail({
      to: email,
      subject: "Password Reset OTP (Valid for 5 minutes)",
      html: `
        <h2>Your OTP is:</h2>
        <h1>${otp}</h1>
        <p>This OTP is valid for <b>5 minutes only</b>.</p>
      `,
    });

    return res.json({
      success: true,
      status: 200,
      message: "OTP sent to your email",
      body: {},
    });
  } catch {
    return res.json({
      success: false,
      status: 500,
      message: "Failed to send OTP",
      body: {},
    });
  }
};

/* ===================== VERIFY OTP ===================== */
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await userDataSchema.findOne({ email, otp });
    if (!user) {
      return res.json({
        success: false,
        status: 400,
        message: "Invalid OTP",
        body: {},
      });
    }

    if (user.otpExpire < Date.now()) {
      return res.json({
        success: false,
        status: 400,
        message: "OTP expired",
        body: {},
      });
    }

    await userDataSchema.updateOne({ email }, { otp: null, otpExpire: null });

    return res.json({
      success: true,
      status: 200,
      message: "OTP verified successfully",
      body: {},
    });
  } catch {
    return res.json({
      success: false,
      status: 400,
      message: "OTP verification failed",
      body: {},
    });
  }
};

/* ===================== RESET PASSWORD ===================== */
export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const encPass = await bcrypt.hash(password, 10);

    const user = await userDataSchema.findOneAndUpdate(
      { email },
      { password: encPass },
      { new: true },
    );

    if (!user) {
      return res.json({
        success: false,
        status: 404,
        message: "User not found",
        body: {},
      });
    }

    await sendEmail({
      to: email,
      subject: "Password Reset Successful",
      html: `
        <p>Your password has been reset successfully.</p>
        <p>If this was not you, please contact support immediately.</p>
      `,
    });

    return res.json({
      success: true,
      status: 200,
      message: "Password reset successful",
      body: {},
    });
  } catch {
    return res.json({
      success: false,
      status: 400,
      message: "Password update failed",
      body: {},
    });
  }
};

/* ===================== SEND WELCOME MAIL ===================== */
export const sendWelcomeMail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    await sendEmail({
      to: email,
      subject: "Welcome to Furniture Store",
      html: `
        <h2>Welcome 🎉</h2>
        <p>Your account has been created successfully.</p>
      `,
    });

    return res.status(200).json({ message: "Welcome email sent" });
  } catch {
    return res.status(500).json({
      message: "Failed to send welcome email",
    });
  }
};

// import userDataSchema from "../model/userSchema.js";
// import bcrypt from "bcrypt";
// // import transporter, { EMAIL_FROM } from "../config/emailConfig.js";
// import jwt from "jsonwebtoken";
// import { sendEmail } from "../utils/sendEmail.js";
// export const signup = async (req, res) => {
//   try {
//     const { name, email, phone, password } = req.body;

//     const findEmail = await userDataSchema.findOne({ email });
//     if (findEmail) {
//       return res.json({
//         success: false,
//         status: 400,
//         message: "Email already registered",
//         body: {},
//       });
//     }

//     const findPhone = await userDataSchema.findOne({ phone });
//     if (findPhone) {
//       return res.json({
//         success: false,
//         status: 400,
//         message: "Phone number already registered",
//         body: {},
//       });
//     }

//     const encPass = await bcrypt.hash(password, 10);

//     const data = await userDataSchema.create({
//       name,
//       email,
//       phone,
//       password: encPass,
//     });

//     // 🔥 SAFE SOCKET EMIT (NO IMPORT)
//     const io = req.app.get("io");
//     io.emit("user_created", data);

//     return res.json({
//       success: true,
//       status: 200,
//       message: "Account created successfully",
//       body: data,
//     });
//   } catch (error) {
//     return res.json({
//       success: false,
//       status: 400,
//       message: "Signup failed",
//       body: {},
//     });
//   }
// };
// export const login = async (req, res) => {
//   try {
//     const { identifier, password } = req.body;

//     if (!identifier || !password) {
//       return res.json({
//         success: false,
//         status: 400,
//         message: "Credentials required",
//         body: {},
//       });
//     }

//     const user = await userDataSchema.findOne({
//       $or: [{ email: identifier }, { phone: identifier }],
//     });

//     if (!user) {
//       return res.json({
//         success: false,
//         status: 400,
//         message: "Invalid email or phone",
//         body: {},
//       });
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res.json({
//         success: false,
//         status: 400,
//         message: "Incorrect password",
//         body: {},
//       });
//     }

//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET, // ✅ FIX (no logic change)
//       { expiresIn: "7d" }
//     );

//     return res.json({
//       success: true,
//       status: 200,
//       message: "Login successful",
//       token,
//       body: user,
//     });
//   } catch (error) {
//     return res.json({
//       success: false,
//       status: 400,
//       message: error.message,
//       body: {},
//     });
//   }
// };
// //  FIND ALL USERS
// export const findUser = async (req, res) => {
//   try {
//     const data = await userDataSchema.find();
//     const count = await userDataSchema.countDocuments();

//     return res.json({
//       success: true,
//       status: 200,
//       message: "All users data",
//       body: data,
//       count,
//     });
//   } catch (error) {
//     return res.json({
//       success: false,
//       status: 400,
//       message: "Error fetching users",
//       body: {},
//     });
//   }
// };

// //  FIND USER BY ID (BODY)
// export const findByIdByBody = async (req, res) => {
//   try {
//     const data = await userDataSchema.findById(req.body.id);

//     return res.json({
//       success: true,
//       status: 200,
//       message: "User found",
//       body: data,
//     });
//   } catch (error) {
//     return res.json({
//       success: false,
//       status: 400,
//       message: "User not found",
//       body: {},
//     });
//   }
// };
// //  FIND USER BY ID (PARAMS)
// export const findByIdByParams = async (req, res) => {
//   try {
//     const data = await userDataSchema.findById(req.params.id);

//     return res.json({
//       success: true,
//       status: 200,
//       message: "User found",
//       body: data,
//     });
//   } catch (error) {
//     return res.json({
//       success: false,
//       status: 400,
//       message: "User not found",
//       body: {},
//     });
//   }
// };
// //  DELETE USER
// export const dataDelete = async (req, res) => {
//   try {
//     const data = await userDataSchema.findByIdAndDelete(req.params.id);

//     return res.json({
//       success: true,
//       status: 200,
//       message: "User deleted",
//       body: data,
//     });
//   } catch (error) {
//     return res.json({
//       success: false,
//       status: 400,
//       message: "Delete failed",
//       body: {},
//     });
//   }
// };
// //  UPDATE USER

// export const userUpdate = async (req, res) => {
//   try {
//     const updateData = { ...req.body };

//     if (req.body.password) {
//       updateData.password = await bcrypt.hash(req.body.password, 10);
//     }

//     const data = await userDataSchema.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true }
//     );

//     if (!data) {
//       return res.json({
//         success: false,
//         status: 404,
//         message: "User not found",
//         body: {},
//       });
//     }

//     if (req.body.password) {
//       await transporter.sendMail({
//         from: process.env.EMAIL_USER,
//         to: data.email,
//         subject: "Password Changed Successfully",
//         html: `
//           <h3>Hello ${data.name || "User"},</h3>
//           <p>Your account password has been changed successfully.</p>`,
//       });
//     }

//     return res.json({
//       success: true,
//       status: 200,
//       message: "Data updated",
//       body: data,
//     });
//   } catch (error) {
//     console.error("Update Error:", error);
//     return res.json({
//       success: false,
//       status: 400,
//       message: "Update failed",
//       body: {},
//     });
//   }
// };
// //  FORGOT PASSWORD (Send OTP to Email)
// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.json({
//         success: false,
//         status: 400,
//         message: "Email is required",
//         body: {},
//       });
//     }

//     const user = await userDataSchema.findOne({ email });
//     if (!user) {
//       return res.json({
//         success: false,
//         status: 400,
//         message: "Email not found",
//         body: {},
//       });
//     }

//     // ✅ OTP generate
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     // ✅ OTP valid for ONLY 5 minutes
//     const otpExpire = Date.now() + 5 * 60 * 1000;

//     await userDataSchema.updateOne({ email }, { otp, otpExpire });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Password Reset OTP (Valid for 5 minutes)",
//       html: `
//         <h2>Your OTP is:</h2>
//         <h1>${otp}</h1>
//         <p>This OTP is valid for <b>5 minutes only</b>.</p>
//       `,
//     });

//     return res.json({
//       success: true,
//       status: 200,
//       message: "OTP sent to your email (valid for 5 minutes)",
//       body: {},
//     });
//   } catch (error) {
//     console.error("Forgot Password Error:", error);
//     return res.json({
//       success: false,
//       status: 500,
//       message: "Failed to send OTP",
//       body: {},
//     });
//   }
// };
// //  VERIFY OTP
// export const verifyOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     if (!email || !otp) {
//       return res.json({
//         success: false,
//         status: 400,
//         message: "Email and OTP required",
//         body: {},
//       });
//     }

//     const user = await userDataSchema.findOne({ email, otp });

//     if (!user) {
//       return res.json({
//         success: false,
//         status: 400,
//         message: "Invalid OTP",
//         body: {},
//       });
//     }

//     // ✅ OTP expiry check (5 minutes)
//     if (user.otpExpire < Date.now()) {
//       return res.json({
//         success: false,
//         status: 400,
//         message: "OTP expired",
//         body: {},
//       });
//     }

//     // ✅ OTP verified → clear OTP immediately
//     await userDataSchema.updateOne({ email }, { otp: null, otpExpire: null });

//     return res.json({
//       success: true,
//       status: 200,
//       message: "OTP verified successfully",
//       body: {},
//     });
//   } catch (error) {
//     console.error("Verify OTP Error:", error);
//     return res.json({
//       success: false,
//       status: 400,
//       message: "OTP verification failed",
//       body: {},
//     });
//   }
// };
// //  RESET PASSWORD

// export const resetPassword = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.json({
//         success: false,
//         status: 400,
//         message: "Email and password required",
//         body: {},
//       });
//     }

//     const encPass = await bcrypt.hash(password, 10);

//     const user = await userDataSchema.findOneAndUpdate(
//       { email },
//       { password: encPass },
//       { new: true }
//     );

//     if (!user) {
//       return res.json({
//         success: false,
//         status: 404,
//         message: "User not found",
//         body: {},
//       });
//     }

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Password Reset Successful",
//       html: `
//         <p>Your password has been reset successfully.</p>
//         <p>If this was not you, please contact support immediately.</p>
//       `,
//     });

//     return res.json({
//       success: true,
//       status: 200,
//       message: "Password reset successful",
//       body: {},
//     });
//   } catch (error) {
//     console.error("Reset Password Error:", error);
//     return res.json({
//       success: false,
//       status: 400,
//       message: "Password update failed",
//       body: {},
//     });
//   }
// };
// // import { sendEmail } from "../utils/sendEmail.js";
// export const sendWelcomeMail = async (req, res) => {
//   console.log(
//     "SENDGRID:",
//     process.env.SENDGRID_API_KEY?.startsWith("SG.") ? "OK" : "NOT OK"
//   );

//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     await sendEmail({
//       to: email,
//       subject: "Welcome to Furniture Store",
//       html: `
//         <h2>Welcome 🎉</h2>
//         <p>Your account has been created successfully.</p>
//       `,
//     });

//     return res.status(200).json({ message: "Welcome email sent" });
//   } catch (error) {
//     console.error("Send email error:", error.message);

//     return res.status(500).json({
//       message: "Failed to send welcome email",
//     });
//   }
// };
