const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const {
  getAllStaff,
  addStaff,
  deleteStaff,
  addDates,
  removeDate,
  getAvailableStaffByDate,
} = require("../controllers/staffController");

router.get("/", getAllStaff);
router.get("/available", getAvailableStaffByDate);
router.post("/", protect, addStaff);
router.delete("/:id", protect, deleteStaff);
router.post("/:id/dates", protect, addDates);
router.delete("/:id/dates", protect, removeDate);

module.exports = router;
