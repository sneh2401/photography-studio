import { useState, useEffect } from "react";
import API from "../api";
import toast from "react-hot-toast";

const Booking = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    eventType: "wedding",
    eventDate: "",
    venue: "",
    staffAssigned: "",
    message: "",
  });

  useEffect(() => {
    if (form.eventDate) fetchAvailableStaff();
  }, [form.eventDate]);

  const fetchAvailableStaff = async () => {
    try {
      const res = await API.get(`/staff/available?date=${form.eventDate}`);
      setStaff(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.staffAssigned) {
      toast.error("Please select a photographer!");
      return;
    }
    setLoading(true);
    try {
      await API.post("/bookings", form);
      toast.success("Booking submitted successfully!");
      setForm({
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        eventType: "wedding",
        eventDate: "",
        venue: "",
        staffAssigned: "",
        message: "",
      });
      setStaff([]);
    } catch (err) {
      toast.error("Booking failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Book a Session</h1>
        <p className="text-gray-500 text-center mb-8">
          Fill in your details to book a photographer
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="clientName"
            value={form.clientName}
            onChange={handleChange}
            placeholder="Your Full Name"
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            name="clientEmail"
            value={form.clientEmail}
            onChange={handleChange}
            placeholder="Your Email"
            type="email"
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            name="clientPhone"
            value={form.clientPhone}
            onChange={handleChange}
            placeholder="Your Phone Number"
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <select
            name="eventType"
            value={form.eventType}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="wedding">Wedding</option>
            <option value="mehendi">Mehendi</option>
            <option value="ring ceremony">Ring Ceremony</option>
            <option value="portrait">Portrait</option>
            <option value="other">Other</option>
          </select>

          <input
            name="eventDate"
            value={form.eventDate}
            onChange={handleChange}
            type="date"
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            name="venue"
            value={form.venue}
            onChange={handleChange}
            placeholder="Event Venue"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          {staff.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Available Photographers on this date:
              </label>
              <select
                name="staffAssigned"
                value={form.staffAssigned}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Select a photographer</option>
                {staff.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name} — {s.specialization}
                  </option>
                ))}
              </select>
            </div>
          )}

          {form.eventDate && staff.length === 0 && (
            <p className="text-red-500 text-sm">
              No photographers available on this date. Please choose another
              date.
            </p>
          )}

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Any special requirements..."
            rows={3}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            {loading ? "Submitting..." : "Submit Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
