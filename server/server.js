const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const staffRoutes = require("./routes/staffRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/portfolio", portfolioRoutes);

app.get("/", (req, res) => res.send("Photography Studio API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
