const Staff = require("../models/Staff");

exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find({ isActive: true });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addStaff = async (req, res) => {
  try {
    const staff = await Staff.create(req.body);
    res.status(201).json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteStaff = async (req, res) => {
  try {
    await Staff.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: "Staff removed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addDates = async (req, res) => {
  try {
    const { dates } = req.body;
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff not found" });

    dates.forEach((date) => {
      const exists = staff.availableDates.find(
        (d) =>
          new Date(d.date).toDateString() === new Date(date).toDateString(),
      );
      if (!exists) staff.availableDates.push({ date });
    });

    await staff.save();
    res.json({ message: "Dates added", staff });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeDate = async (req, res) => {
  try {
    const { date } = req.body;
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff not found" });

    const dateEntry = staff.availableDates.find(
      (d) => new Date(d.date).toDateString() === new Date(date).toDateString(),
    );

    if (dateEntry?.isBooked) {
      return res
        .status(400)
        .json({ message: "Cannot remove — date already booked" });
    }

    staff.availableDates = staff.availableDates.filter(
      (d) => new Date(d.date).toDateString() !== new Date(date).toDateString(),
    );

    await staff.save();
    res.json({ message: "Date removed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAvailableStaffByDate = async (req, res) => {
  try {
    const { date } = req.query;
    const staff = await Staff.find({ isActive: true });

    const available = staff.filter((s) =>
      s.availableDates.some(
        (d) =>
          new Date(d.date).toDateString() === new Date(date).toDateString() &&
          !d.isBooked,
      ),
    );

    res.json(available);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
