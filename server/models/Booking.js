const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    clientPhone: { type: String, required: true },
    eventType: {
      type: String,
      enum: ["wedding", "mehendi", "ring ceremony", "portrait", "other"],
      required: true,
    },
    eventDate: { type: Date, required: true },
    venue: { type: String },
    staffAssigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
    message: { type: String },
    status: {
      type: String,
      enum: ["pending", "confirmed", "rejected", "completed"],
      default: "pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", bookingSchema);
