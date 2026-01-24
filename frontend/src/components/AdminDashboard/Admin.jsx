import React, { useState, useEffect, useContext } from 'react';
import { Upload, Plus, X, Edit2, Trash2, Users, Calendar } from 'lucide-react';
import Papa from "papaparse";
import { AuthContext } from '@/contexts/AuthContext';

// CONFIGURATION: Change this to your actual backend URL
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3004';
  
export default function Admin({ setLotusClass, setLotusStyle, setFigureClass, setFigureStyle }) {
  const { getAdminEvents,events, eventsLoading, eventsError } = useContext(AuthContext);

  const[eventsAll, setEvents] = useState([]);
  // State for UI Modals
  const [showEventForm, setShowEventForm] = useState(false);
  const [showRegistrations, setShowRegistrations] = useState(false); // Stores eventID or false
  const [editingEvent, setEditingEvent] = useState(null); // Stores full event object or null

  // State for Registrations Data
  const [selectedEventRegs, setSelectedEventRegs] = useState([]);
  const [currentEventName, setCurrentEventName] = useState(""); // Helper for display

  // Form Data State
  const [formData, setFormData] = useState({
    eventPhoto: '',
    eventPhotoFile: null,
    eventName: '',
    eventCategory: '',
    eventMode: 'offline',
    description: '',
    date: '',
    status: 'registrations_open',
    isWorkshop: false,
    unstopRegLink: '',
    latitude: '',
    longitude: ''
  });

  useEffect(() => {
    if (!setFigureClass || !setFigureStyle) return;
  
    setFigureStyle({
      left: "0px",
      bottom: "0px",
      transform: "translate(10%, 10%)",
    });
  
    setFigureClass(`
      fixed
      w-[120px]
      md:w-[140px]
      lg:w-[190px]
      pointer-events-none
      z-[30]
      opacity-90
      drop-shadow-[0_0_30px_rgba(255,215,138,0.4)]
      transition-all duration-700 ease-out
    `);
  }, [setFigureClass, setFigureStyle]);

  // --- 1. INITIAL DATA FETCHING ---
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      await getAdminEvents();
      setEvents(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      alert("Could not load events from server.");
    } 
    
  };

  // --- 2. FORM HANDLING ---
  const resetForm = () => {
    setFormData({
      eventPhoto: '',
      eventName: '',
      eventCategory: '',
      eventMode: 'offline',
      description: '',
      date: '',
      status: 'registrations_open',
      isWorkshop: false,
      unstopRegLink: '',
      latitude: '',
      longitude: ''
    });
    setEditingEvent(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, eventPhoto: reader.result, eventPhotoFile: file}));
      };
      reader.readAsDataURL(file);
    }
  };

  // --- 3. EVENT CRUD OPERATIONS ---
  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!formData.eventName || !formData.eventCategory || !formData.date) {
      alert('Please fill in Required Fields');
      return;
    }

    const basicEventFields = {
      name: formData.eventName,
      category: formData.eventCategory,
      mode: formData.eventMode,
      description: formData.description,
      date: formData.date,
      status: formData.status,
      isWorkshop: formData.isWorkshop,
      unstopRegLink: formData.unstopRegLink,
      latitude: formData.latitude,
      longitude: formData.longitude,
    }

    const imageFormData = new FormData();
    if (formData.eventPhotoFile) imageFormData.append('image', formData.eventPhotoFile);

    try {
      const adminToken = localStorage.getItem('adminToken');

      if (editingEvent) {
        // UPDATE Existing Event
        const response = await fetch(`${API_BASE_URL}/events/${editingEvent._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminToken}` },
          body: JSON.stringify(basicEventFields)
        });
        
        if (!response.ok) throw new Error("Update failed");

        const imageResponse = await fetch(`${API_BASE_URL}/events/${editingEvent._id}/image`, {
          method: 'PUT',
          headers: {'Authorization': `Bearer ${adminToken}`},
          body: imageFormData
        });

        if (!imageResponse.ok) throw new Error("Image Update failed");

        alert('Event updated successfully!');
      } else {
        // CREATE New Event
        const response = await fetch(`${API_BASE_URL}/events`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminToken}` },
          body: JSON.stringify(basicEventFields)
        });

        if (!response.ok) throw new Error("Creation failed");

        const data = await response.json();

        const imageResponse = await fetch(`${API_BASE_URL}/events/${data.id}/image`, {
          method: 'PUT',
          headers: {'Authorization': `Bearer ${adminToken}`},
          body: imageFormData
        });

        if (!imageResponse.ok) throw new Error("Image Upload failed");

        alert('Event created successfully!');
      }

      // Refresh list and close form
      fetchEvents();
      setShowEventForm(false);
      resetForm();

    } catch (error) {
      console.error(error);
      alert("Operation failed. Check console for details.");
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData(event);
    setShowEventForm(true);
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
          method: 'DELETE'
        });

        if (!response.ok) throw new Error("Delete failed");
        
        setEvents(events.filter(ev => ev._id !== eventId));
        alert("Event deleted.");
      } catch (error) {
        console.error(error);
        alert("Failed to delete event.");
      }
    }
  };

  // --- 4. REGISTRATION MANAGEMENT ---
  
  // Open Modal and Fetch Registrations
  const viewRegistrations = async (eventId, eventName) => {
    setShowRegistrations(eventId); // Store current Event ID
    setCurrentEventName(eventName);
    
    try {
      const response = await fetch(`${API_BASE_URL}/events/${eventId}/registrations`);
      if (response.ok) {
        const data = await response.json();
        setSelectedEventRegs(data);
      } else {
        setSelectedEventRegs([]); // Reset if empty or error
      }
    } catch (error) {
      console.error("Error fetching registrations:", error);
      setSelectedEventRegs([]);
    }
  };

  // Upload CSV to Backend
  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Use current event ID stored in state
    const eventId = showRegistrations; 

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          // Normalize data structure for backend
          const registrationsPayload = results.data.map(row => ({
            name: row.name || row.Name || "",
            email: row.email || row.Email || "",
            phone: row.phone || row.Phone || "",
            college: row.college || row.College || "",
            attendance: false
          }));

          const response = await fetch(`${API_BASE_URL}/events/${eventId}/registrations/import`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ registrations: registrationsPayload }),
          });

          if (!response.ok) throw new Error("Import failed");

          alert("CSV uploaded and linked successfully");
          // Refresh the list immediately
          viewRegistrations(eventId, currentEventName);

        } catch (err) {
          console.error(err);
          alert("Failed to upload CSV to backend");
        }
      },
      error: (err) => {
        console.error("CSV Parse Error:", err);
        alert("Invalid CSV file");
      },
    });
  };

  // Toggle Attendance (Send request to backend)
  const toggleAttendance = async (regId, currentStatus) => {
    try {
      // Optimistic UI Update
      setSelectedEventRegs(prev => 
        prev.map(reg => reg._id === regId ? { ...reg, attendance: !currentStatus } : reg)
      );

      const response = await fetch(`${API_BASE_URL}/registrations/${regId}/attendance`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attendance: !currentStatus })
      });

      if (!response.ok) {
        // Revert if failed
        setSelectedEventRegs(prev => 
          prev.map(reg => reg._id === regId ? { ...reg, attendance: currentStatus } : reg)
        );
        alert("Failed to update attendance on server");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative min-h-screen mt-28">
      {/* Header Section */}
      <div className="relative z-10 w-full flex flex-col items-center pt-12 pb-8 to-transparent">
        <h1 className="text-5xl lg:text-7xl font-bold leading-none drop-shadow-sm text-center bg-gradient-to-b from-[#D4AF37] to-[#6E5B1D] bg-clip-text text-transparent">
          ADMIN DASHBOARD
        </h1>
        <div className="w-[50vw] max-w-[600px] h-[2px] bg-[#4A90E2] shadow-[0_0_8px_#4A90E2] my-6" />
        <p className="font-['Montserrat',sans-serif] text-lg font-semibold text-center max-w-[90vw] px-[10px] bg-gradient-to-b from-[#D4AF37] to-[#6E5B1D] bg-clip-text text-transparent">
          Manage your events and registrations
        </p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Action Buttons */}
        <div className="flex gap-4 mb-12">
          <button
            onClick={() => { resetForm(); setShowEventForm(true); }}
            className="bg-gradient-to-b from-[#D4AF37] to-[#6E5B1D] text-white px-8 py-4 rounded-lg flex items-center gap-3 hover:from-[#E5C158] hover:to-[#7F6C2E] transition-all shadow-xl border border-[#C5A059]"
          >
            <Plus size={24} />
            <span className="font-['Montserrat',sans-serif] font-bold text-lg tracking-wide">Create New Event</span>
          </button>
        </div>

        {/* --- EVENT FORM MODAL --- */}
        {showEventForm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8 border-4 border-[#C5A059]">
              <div className="bg-gradient-to-b from-[#D4AF37] to-[#6E5B1D] text-white px-8 py-6 rounded-t-2xl flex justify-between items-center">
                <h2 className="font-['Montserrat',sans-serif] text-3xl font-bold tracking-wide">
                  {editingEvent ? 'Edit Event' : 'Create New Event'}
                </h2>
                <button onClick={() => { setShowEventForm(false); resetForm(); }} className="hover:bg-white/20 p-2 rounded-lg transition-all">
                  <X size={28} />
                </button>
              </div>
              
              <div className="p-8 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                {/* Event Photo */}
                <div>
                  <label className="block text-[#8B6508] font-['Montserrat',sans-serif] font-bold mb-3 text-lg">Event Photo</label>
                  <div className="flex items-center gap-4">
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="eventPhotoUpload" />
                    <label htmlFor="eventPhotoUpload" className="bg-gradient-to-b from-[#D4AF37] to-[#6E5B1D] text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:from-[#E5C158] hover:to-[#7F6C2E] transition-all shadow-lg cursor-pointer border border-[#C5A059]">
                      <Upload size={20} />
                      <span className="font-['Montserrat',sans-serif] font-semibold">Choose Image</span>
                    </label>
                    {formData.eventPhoto && (
                      <img src={formData.eventPhoto} alt="Preview" className="h-24 w-24 object-cover rounded-xl border-3 border-[#C5A059] shadow-lg" />
                    )}
                  </div>
                </div>

                {/* Form Inputs Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#8B6508] font-['Montserrat',sans-serif] font-bold mb-3">Event Name *</label>
                    <input type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} className="w-full bg-[#FFFBEB] border-2 border-[#C5A059] text-[#8B6508] rounded-lg px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-all font-['Montserrat',sans-serif]" />
                  </div>
                  <div>
                    <label className="block text-[#8B6508] font-['Montserrat',sans-serif] font-bold mb-3">Event Category *</label>
                    <input type="text" name="eventCategory" value={formData.eventCategory} onChange={handleInputChange} className="w-full bg-[#FFFBEB] border-2 border-[#C5A059] text-[#8B6508] rounded-lg px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-all font-['Montserrat',sans-serif]" />
                  </div>
                  <div>
                    <label className="block text-[#8B6508] font-['Montserrat',sans-serif] font-bold mb-3">Event Mode *</label>
                    <select name="eventMode" value={formData.eventMode} onChange={handleInputChange} className="w-full bg-[#FFFBEB] border-2 border-[#C5A059] text-[#8B6508] rounded-lg px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-all font-['Montserrat',sans-serif]">
                      <option value="offline">Offline</option>
                      <option value="online">Online</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#8B6508] font-['Montserrat',sans-serif] font-bold mb-3">Date *</label>
                    <input type="datetime-local" name="date" value={formData.date} onChange={handleInputChange} className="w-full bg-[#FFFBEB] border-2 border-[#C5A059] text-[#8B6508] rounded-lg px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-all font-['Montserrat',sans-serif]" />
                  </div>
                  <div>
                    <label className="block text-[#8B6508] font-['Montserrat',sans-serif] font-bold mb-3">Event Status *</label>
                    <select name="status" value={formData.status} onChange={handleInputChange} className="w-full bg-[#FFFBEB] border-2 border-[#C5A059] text-[#8B6508] rounded-lg px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-all font-['Montserrat',sans-serif]">
                      <option value="registrations_open">Registrations Open</option>
                      <option value="registrations_closed">Registrations Closed</option>
                      <option value="upcoming">Upcoming</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="flex items-center pt-8">
                    <label className="flex items-center gap-3 cursor-pointer bg-[#FDF8E2] px-5 py-3 rounded-lg border-2 border-[#C5A059] hover:border-[#D4AF37] transition-all">
                      <input type="checkbox" name="isWorkshop" checked={formData.isWorkshop} onChange={handleInputChange} className="w-6 h-6 text-[#D4AF37] border-[#C5A059] rounded focus:ring-[#D4AF37]" />
                      <span className="text-[#8B6508] font-['Montserrat',sans-serif] font-bold text-lg">Is this a workshop?</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-[#8B6508] font-['Montserrat',sans-serif] font-bold mb-3 text-lg">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" className="w-full bg-[#FFFBEB] border-2 border-[#C5A059] text-[#8B6508] rounded-lg px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-all font-['Montserrat',sans-serif]" />
                </div>

                <div>
                  <label className="block text-[#8B6508] font-['Montserrat',sans-serif] font-bold mb-3">Unstop Registration Link</label>
                  <input type="url" name="unstopRegLink" value={formData.unstopRegLink} onChange={handleInputChange} className="w-full bg-[#FFFBEB] border-2 border-[#C5A059] text-[#8B6508] rounded-lg px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-all font-['Montserrat',sans-serif]" />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#8B6508] font-['Montserrat',sans-serif] font-bold mb-3">Latitude</label>
                    <input type="text" name="latitude" value={formData.latitude} onChange={handleInputChange} className="w-full bg-[#FFFBEB] border-2 border-[#C5A059] text-[#8B6508] rounded-lg px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-all font-['Montserrat',sans-serif]" />
                  </div>
                  <div>
                    <label className="block text-[#8B6508] font-['Montserrat',sans-serif] font-bold mb-3">Longitude</label>
                    <input type="text" name="longitude" value={formData.longitude} onChange={handleInputChange} className="w-full bg-[#FFFBEB] border-2 border-[#C5A059] text-[#8B6508] rounded-lg px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-all font-['Montserrat',sans-serif]" />
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button onClick={handleSubmit} className="flex-1 bg-gradient-to-b from-[#D4AF37] to-[#6E5B1D] text-white py-4 rounded-lg font-['Montserrat',sans-serif] font-bold text-lg hover:from-[#E5C158] hover:to-[#7F6C2E] transition-all shadow-xl border border-[#C5A059]">
                    {editingEvent ? 'Update Event' : 'Create Event'}
                  </button>
                  <button onClick={() => { setShowEventForm(false); resetForm(); }} className="px-8 bg-gradient-to-b from-gray-400 to-gray-600 text-white py-4 rounded-lg font-['Montserrat',sans-serif] font-bold text-lg hover:from-gray-500 hover:to-gray-700 transition-all border border-gray-500">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- REGISTRATIONS MODAL --- */}
        {showRegistrations && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border-4 border-[#C5A059]">
              {/* Modal Header */}
              <div className="bg-gradient-to-b from-[#D4AF37] to-[#6E5B1D] text-white px-8 py-6 flex justify-between items-center">
                <h2 className="font-['Montserrat',sans-serif] text-3xl font-bold flex items-center gap-3">
                  <Users size={28} />
                  Registrations: {currentEventName}
                </h2>
                
                <div className="flex items-center gap-4">
                  {/* CSV Upload Button */}
                  <label className="bg-gradient-to-b from-purple-500 to-purple-700 text-white px-4 py-2 rounded-lg cursor-pointer hover:from-purple-600 hover:to-purple-800 transition-all shadow-lg border border-purple-600 flex items-center gap-2">
                    <Upload size={18} />
                    <span className="text-sm font-bold">Import CSV</span>
                    <input type="file" accept=".csv" className="hidden" onChange={handleCSVUpload} />
                  </label>

                  {/* Close Button (FIX ADDED HERE) */}
                  <button 
                    onClick={() => { setShowRegistrations(false); setSelectedEventRegs([]); }} 
                    className="bg-white/20 hover:bg-white/40 p-2 rounded-full transition-all"
                  >
                    <X size={24} color="white" />
                  </button>
                </div>
              </div>
              
              {/* Registration List */}
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="space-y-4">
                  {selectedEventRegs.map((reg) => (
                    <div key={reg._id || reg.id} className="bg-gradient-to-r from-[#FDF8E2] to-[#FFFBEB] p-5 rounded-xl border-2 border-[#C5A059] flex justify-between items-center hover:border-[#D4AF37] transition-all">
                      <div>
                        <p className="font-bold text-[#8B6508] text-lg font-['Montserrat',sans-serif]">{reg.name}</p>
                        <p className="text-sm text-[#8B6508]/70 mt-1 font-['Montserrat',sans-serif]">{reg.email}</p>
                        <p className="text-xs text-[#8B6508]/50 mt-1">{reg.college}</p>
                      </div>
                      <label className="flex items-center gap-3 cursor-pointer bg-white px-5 py-3 rounded-lg border-2 border-[#C5A059] hover:border-[#D4AF37] transition-all">
                        <input
                          type="checkbox"
                          checked={reg.attendance}
                          onChange={() => toggleAttendance(reg._id || reg.id, reg.attendance)}
                          className="w-6 h-6 text-[#D4AF37] border-[#C5A059] rounded focus:ring-[#D4AF37]"
                        />
                        <span className="text-[#8B6508] font-['Montserrat',sans-serif] font-bold">
                          {reg.attendance ? 'Present' : 'Absent'}
                        </span>
                      </label>
                    </div>
                  ))}
                  {selectedEventRegs.length === 0 && (
                    <p className="text-center text-[#8B6508]/60 py-12 text-lg font-['Montserrat',sans-serif]">
                      No registrations found. Import a CSV to get started.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- EVENTS GRID --- */}
        {eventsLoading ? (
          <div className="text-center py-20"><p className="text-[#8B6508] text-xl">Loading events...</p></div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event._id || event.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border-3 border-[#C5A059] hover:border-[#D4AF37] hover:shadow-2xl transition-all">
                {event.eventPhoto && (
                  <img src={event.eventPhoto} alt={event.name} className="w-full h-52 object-cover" />
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-[#8B6508] font-['Montserrat',sans-serif]">{event.eventName}</h3>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold font-['Montserrat',sans-serif] ${
                      event.status === 'ACTIVE' ? 'bg-green-100 text-green-700 border-2 border-green-500' :
                      event.status === 'COMPLETED' ? 'bg-red-100 text-red-700 border-2 border-red-500' :
                      event.status === 'UPCOMING' ? 'bg-blue-100 text-blue-700 border-2 border-blue-500' :
                      'bg-gray-100 text-gray-700 border-2 border-gray-500'
                    }`}>
                      {event.status ? event.status.replace(/_/g, ' ').toUpperCase() : 'STATUS'}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-[#8B6508]/80 mb-5 font-['Montserrat',sans-serif]">
                    <p><strong className="text-[#8B6508]">Category:</strong> {event.category}</p>
                    <p><strong className="text-[#8B6508]">Mode:</strong> {event.mode}</p>
                    <p><strong className="text-[#8B6508]">Date:</strong> {event.date ? new Date(event.date).toLocaleString() : 'TBD'}</p>
                    {event.isWorkshop && (
                      <span className="inline-block bg-[#FDF8E2] text-[#8B6508] px-3 py-1 rounded-lg text-xs font-bold border-2 border-[#C5A059] mt-2">
                        Workshop
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => viewRegistrations(event._id || event.id, event.eventName)}
                      className="flex-1 bg-gradient-to-b from-blue-500 to-blue-700 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 hover:from-blue-600 hover:to-blue-800 transition-all text-sm font-semibold shadow-lg font-['Montserrat',sans-serif] border border-blue-600"
                    >
                      <Users size={18} />
                      Registrations
                    </button>
                    <button
                      onClick={() => handleEdit(event)}
                      className="bg-gradient-to-b from-[#D4AF37] to-[#6E5B1D] text-white p-3 rounded-lg hover:from-[#E5C158] hover:to-[#7F6C2E] transition-all shadow-lg border border-[#C5A059]"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(event._id || event.id)}
                      className="bg-gradient-to-b from-red-500 to-red-700 text-white p-3 rounded-lg hover:from-red-600 hover:to-red-800 transition-all shadow-lg border border-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {events.length === 0 && !eventsLoading && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-xl border-3 border-[#C5A059]">
            <Calendar size={80} className="mx-auto text-[#D4AF37]/40 mb-6" />
            <p className="text-[#8B6508] text-2xl font-bold mb-2 font-['Montserrat',sans-serif]">No events created yet</p>
            <p className="text-[#8B6508]/60 text-lg font-['Montserrat',sans-serif]">Create your first event to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}