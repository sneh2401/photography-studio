const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    photo: { type: String },
    specialization: {
      type: String,
      enum: ["wedding", "mehendi", "ring ceremony", "portrait", "all"],
      default: "all",
    },
    availableDates: [
      {
        date: { type: Date, required: true },
        isBooked: { type: Boolean, default: false },
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Staff", staffSchema);
