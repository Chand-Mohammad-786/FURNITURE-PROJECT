import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    // user
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    email: {
      type: String,
      trim: true,
    },
    // Items
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.Mixed,
        },
        productName: { type: String, default: "" },
        productImage: { type: String, default: "" },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true },
        productSnapshot: {
          description: { type: String, default: "" },
          category: { type: String, default: "" },
          dimensions: {
            height: { type: String, default: "" },
            width: { type: String, default: "" },
            depth: { type: String, default: "" },
          },
          seatHeight: { type: String, default: "" },
          material: { type: String, default: "" },
          color: { type: String, default: "" },
        },
      },
    ],
    //  Pricing.
    totalAmount: { type: Number, required: true },
    shippingCharge: { type: Number, default: 0 },
    taxAmount: { type: Number, default: 0 },
    // Payment.
    paymentMethod: { type: String, default: "cod" },
    // Status.
    status: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "OutForDelivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
    //  Address.
    address: { type: String, required: true },
    phone: { type: String, required: true },
    // Tracking.
    trackingNumber: { type: String, default: "" },
    trackingURL: { type: String, default: "" },
    estimatedDelivery: { type: Date },
    //  Timeline.
    timeline: {
      orderedAt: Date,
      processedAt: Date,
      shippedAt: Date,
      outForDeliveryAt: Date,
      deliveredAt: Date,
      cancelledAt: Date,
    },
    invoiceNumber: { type: String, default: "" },
    //Important field.
    cancelledBy: {
      type: String,
      enum: ["user", "admin"],
      default: null,
    },
    cancelReason: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);
export default mongoose.model("order", orderSchema);
