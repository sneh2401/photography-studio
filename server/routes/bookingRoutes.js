const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
} = require("../controllers/bookingController");

router.post("/", createBooking);
router.get("/", protect, getAllBookings);
router.get("/:id", protect, getBookingById);
router.patch("/:id/status", protect, updateBookingStatus);
router.delete("/:id", protect, deleteBooking);

module.exports = router;
