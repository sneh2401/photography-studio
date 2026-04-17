const Booking = require("../models/Booking");
const Staff = require("../models/Staff");

exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    const staff = await Staff.findById(req.body.staffAssigned);
    const dateEntry = staff.availableDates.find(
      (d) =>
        new Date(d.date).toDateString() ===
        new Date(req.body.eventDate).toDateString(),
    );
    if (dateEntry) dateEntry.isBooked = true;
    await staff.save();

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("staffAssigned", "name phone")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "staffAssigned",
      "name phone specialization",
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true },
    );
    res.json({ message: "Status updated", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
