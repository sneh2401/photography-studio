import { useState, useEffect } from "react";
import API from "../api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const AdminDashboard = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [staff, setStaff] = useState([]);
  const [activeTab, setActiveTab] = useState("bookings");
  const [newStaff, setNewStaff] = useState({ name: "", phone: "", specialization: "wedding" });
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) navigate("/admin");
    fetchBookings();
    fetchStaff();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStaff = async () => {
    try {
      const res = await API.get("/staff");
      setStaff(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();
    try {
      await API.post("/staff", newStaff);
      toast.success("Staff added!");
      setNewStaff({ name: "", phone: "", specialization: "wedding" });
      fetchStaff();
    } catch (err) {
      toast.error("Failed to add staff!");
    }
  };

  const handleDeleteStaff = async (id) => {
    try {
      await API.delete(`/staff/${id}`);
      toast.success("Staff removed!");
      fetchStaff();
    } catch (err) {
      toast.error("Failed to remove staff!");
    }
  };

  const handleAddDates = async () => {
    if (!selectedStaff) return;
    try {
      const dates = selectedDates.map((d) => d.toISOString().split("T")[0]);
      await API.post(`/staff/${selectedStaff}/dates`, { dates });
      toast.success("Dates added!");
      fetchStaff();
    } catch (err) {
      toast.error("Failed to add dates!");
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await API.patch(`/bookings/${id}/status`, { status });
      toast.success(`Booking ${status}!`);
      fetchBookings();
    } catch (err) {
      toast.error("Failed to update status!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-4 mb-8">
          {["bookings", "staff"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg capitalize font-semibold transition ${
                activeTab === tab ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "bookings" && (
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">All Bookings</h2>
            {bookings.length === 0 ? (
              <p className="text-gray-400">No bookings yet.</p>
            ) : (
              <div className="space-y-4">
                {bookings.map((b) => (
                  <div key={b._id} className="border rounded-xl p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-lg">{b.clientName}</p>
                        <p className="text-gray-500 text-sm">{b.clientEmail} | {b.clientPhone}</p>
                        <p className="text-sm mt-1">
                          <span className="font-medium">Event:</span> {b.eventType} |{" "}
                          <span className="font-medium">Date:</span>{" "}
                          {new Date(b.eventDate).toDateString()}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Photographer:</span>{" "}
                          {b.staffAssigned?.name}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Venue:</span> {b.venue}
                        </p>
                        {b.message && (
                          <p className="text-sm text-gray-500">Note: {b.message}</p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          b.status === "confirmed" ? "bg-green-100 text-green-700" :
                          b.status === "rejected" ? "bg-red-100 text-red-700" :
                          b.status === "completed" ? "bg-blue-100 text-blue-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {b.status}
                        </span>
                        {b.status === "pending" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleStatusUpdate(b._id, "confirmed")}
                              className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(b._id, "rejected")}
                              className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "staff" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-bold mb-4">Add New Photographer</h2>
              <form onSubmit={handleAddStaff} className="space-y-4">
                <input
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  placeholder="Full Name"
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  value={newStaff.phone}
                  onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                  placeholder="Phone Number"
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <select
                  value={newStaff.specialization}
                  onChange={(e) => setNewStaff({ ...newStaff, specialization: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="wedding">Wedding</option>
                  <option value="mehendi">Mehendi</option>
                  <option value="ring ceremony">Ring Ceremony</option>
                  <option value="portrait">Portrait</option>
                  <option value="all">All</option>
                </select>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
                >
                  Add Photographer
                </button>
              </form>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-bold mb-4">Manage Availability</h2>
              <select
                onChange={(e) => setSelectedStaff(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Select Photographer</option>
                {staff.map((s) => (
                  <option key={s._id} value={s._id}>{s.name}</option>
                ))}
              </select>

              {selectedStaff && (
                <>
                  <Calendar
                    onChange={(date) => {
                      const exists = selectedDates.find(
                        (d) => d.toDateString() === date.toDateString()
                      );
                      if (exists) {
                        setSelectedDates(selectedDates.filter(
                          (d) => d.toDateString() !== date.toDateString()
                        ));
                      } else {
                        setSelectedDates([...selectedDates, date]);
                      }
                    }}
                    tileClassName={({ date }) =>
                      selectedDates.find((d) => d.toDateString() === date.toDateString())
                        ? "bg-black text-white rounded-full"
                        : ""
                    }
                  />
                  <button
                    onClick={handleAddDates}
                    className="w-full bg-black text-white py-2 rounded-lg mt-4 hover:bg-gray-800"
                  >
                    Save Available Dates
                  </button>
                </>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow p-6 md:col-span-2">
              <h2 className="text-xl font-bold mb-4">All Photographers</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {staff.map((s) => (
                  <div key={s._id} className="border rounded-xl p-4">
                    <p className="font-semibold">{s.name}</p>
                    <p className="text-gray-500 text-sm">{s.phone}</p>
                    <p className="text-gray-500 text-sm capitalize">{s.specialization}</p>
                    <p className="text-sm mt-1">
                      Available dates: {s.availableDates.filter((d) => !d.isBooked).length}
                    </p>
                    <button
                      onClick={() => handleDeleteStaff(s._id)}
                      className="mt-3 bg-red-500 text-white px-4 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;