const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    publicId: { type: String },
    category: {
      type: String,
      enum: ["wedding", "mehendi", "ring ceremony", "portrait", "other"],
      default: "other",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Portfolio", portfolioSchema);
