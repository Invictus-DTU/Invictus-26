import React, { useState } from 'react';
import { Upload, Plus, X, Edit2, Trash2, Download, Users, Calendar } from 'lucide-react';

export default function Admin() {
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showRegistrations, setShowRegistrations] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedEventRegs, setSelectedEventRegs] = useState([]);
  const [formData, setFormData] = useState({
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

  const [registrations, setRegistrations] = useState({});

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
        setFormData(prev => ({ ...prev, eventPhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    console.log('Form data:', formData);
    
    if (!formData.eventName || !formData.eventCategory || !formData.date) {
      alert('Please fill in Required Fields');
      return;
    }

    if (editingEvent !== null) {
      const updatedEvents = events.map((event, idx) => 
        idx === editingEvent ? { ...formData, id: event.id } : event
      );
      setEvents(updatedEvents);
      console.log('Updated events:', updatedEvents);
      alert('Event updated successfully!');
    } else {
      const newEvent = { ...formData, id: Date.now() };
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      setRegistrations(prev => ({ ...prev, [newEvent.id]: [] }));
      console.log('New event created:', newEvent);
      console.log('All events:', updatedEvents);
      alert('Event created successfully!');
    }
    
    setShowEventForm(false);
    resetForm();
  };

  const handleEdit = (index) => {
    setEditingEvent(index);
    setFormData(events[index]);
    setShowEventForm(true);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      const eventId = events[index].id;
      setEvents(events.filter((_, idx) => idx !== index));
      const newRegs = { ...registrations };
      delete newRegs[eventId];
      setRegistrations(newRegs);
    }
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const lines = text.split('\n');
        
        const csvEvents = lines.slice(1).filter(line => line.trim()).map(line => {
          const values = line.split(',');
          return {
            id: Date.now() + Math.random(),
            eventName: values[0] || '',
            eventCategory: values[1] || '',
            eventMode: values[2] || 'offline',
            description: values[3] || '',
            date: values[4] || '',
            status: values[5] || 'registrations_open',
            isWorkshop: values[6]?.toLowerCase() === 'true',
            unstopRegLink: values[7] || '',
            latitude: values[8] || '',
            longitude: values[9] || '',
            eventPhoto: ''
          };
        });
        
        setEvents([...events, ...csvEvents]);
        setShowEventForm(false);
      };
      reader.readAsText(file);
    }
  };

  const viewRegistrations = (eventId) => {
    if (!registrations[eventId] || registrations[eventId].length === 0) {
      const mockRegs = Array.from({ length: 5 }, (_, i) => ({
        id: `${eventId}-${i}`,
        name: `Participant ${i + 1}`,
        email: `participant${i + 1}@example.com`,
        attendance: false
      }));
      setRegistrations(prev => ({ ...prev, [eventId]: mockRegs }));
      setSelectedEventRegs(mockRegs);
    } else {
      setSelectedEventRegs(registrations[eventId]);
    }
    setShowRegistrations(eventId);
  };

  const toggleAttendance = (eventId, regId) => {
    setRegistrations(prev => ({
      ...prev,
      [eventId]: prev[eventId].map(reg => 
        reg.id === regId ? { ...reg, attendance: !reg.attendance } : reg
      )
    }));
    setSelectedEventRegs(prev => 
      prev.map(reg => reg.id === regId ? { ...reg, attendance: !reg.attendance } : reg)
    );
  };

  const exportRegistrations = (eventId) => {
    const regs = registrations[eventId] || [];
    const csv = 'Name,Email,Attendance\n' + 
      regs.map(r => `${r.name},${r.email},${r.attendance ? 'Present' : 'Absent'}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registrations-${eventId}.csv`;
    a.click();
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Decorative Background Pattern */}
      <div 
        className="fixed inset-0 opacity-5 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Header Section */}
      <div className="relative z-10 w-full flex flex-col items-center pt-12 pb-8 bg-gradient-to-b from-white via-white/95 to-transparent">
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

        {/* Event Form Modal */}
        {showEventForm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8 border-4 border-[#C5A059]">
              <div className="bg-gradient-to-b from-[#D4AF37] to-[#6E5B1D] text-white px-8 py-6 rounded-t-2xl flex justify-between items-center">
                <h2 className="font-['Montserrat',sans-serif] text-3xl font-bold tracking-wide">
                  {editingEvent !== null ? 'Edit Event' : 'Create New Event'}
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
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="eventPhotoUpload"
                    />
                    <label 
                      htmlFor="eventPhotoUpload"
                      className="bg-gradient-to-b from-[#D4AF37] to-[#6E5B1D] text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:from-[#E5C158] hover:to-[#7F6C2E] transition-all shadow-lg cursor-pointer border border-[#C5A059]"
                    >
                      <Upload size={20} />
                      <span className="font-['Montserrat',sans-serif] font-semibold">Choose Image</span>
                    </label>
                    {formData.eventPhoto && (
                      <img src={formData.eventPhoto} alt="Preview" className="h-24 w-24 object-cover rounded-xl border-3 border-[#C5A059] shadow-lg" />
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#8B6508] font-['Montserrat',sans-serif] font-bold mb-3">Event Name *</label>
                    <input
                      type="text"
                      name="eventName"
                      value={formData.eventName}
                      onChange={handleInputChange}
                      className="w-full bg-[#FFFBEB] border-2 border-[#C5A059] text-[#8B6508] rounded-lg px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-all font-['Montserrat',sans-serif]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8B6508] font-['Montserrat',sans-serif] font-bold mb-3">Event Category *</label>
                    <input
                      type="text"
                      name="eventCategory"
                      value={formData.eventCategory}
                      onChange={handleInputChange}
                      className="w-full bg-[#FFFBEB] border-2 border-[#C5A059] text-[#8B6508] rounded-lg px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-all font-['Montserrat',sans-serif]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8B6508] font-['Montserrat',sans-serif] font-bold mb-3">Event Mode *</label>
                    <select
                      name="eventMode"
                      value={formData.eventMode}
                      onChange={handleInputChange}
                      className="w-full bg-[#FFFBEB] border-2 border-[#C5A059] text-[#8B6508] rounded-lg px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-all font-['Montserrat',sans-serif]"
                    >
                      <option value="offline">Offline</option>
                      <option value="online">Online</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#8B6508] font-['Montserrat',sans-serif] font-bold mb-3">Date *</label>
                    <input
                      type="datetime-local"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full bg-[#FFFBEB] border-2 border-[#C5A059] text-[#8B6508] rounded-lg px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-all font-['Montserrat',sans-serif]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8B6508] font-['Montserrat',sans-serif] font-bold mb-3">Event Status *</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full bg-[#FFFBEB] border-2 border-[#C5A059] text-[#8B6508] rounded-lg px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-all font-['Montserrat',sans-serif]"
                    >
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
                      <input
                        type="checkbox"
                        name="isWorkshop"
                        checked={formData.isWorkshop}
                        onChange={handleInputChange}
                        className="w-6 h-6 text-[#D4AF37] border-[#C5A059] rounded focus:ring-[#D4AF37]"
                      />
                      <span className="text-[#8B6508] font-['Montserrat',sans-serif] font-bold text-lg">Is this a workshop?</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-[#8B6508] font-['Montserrat',sans-serif] font-bold mb-3 text-lg">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full bg-[#FFFBEB] border-2 border-[#C5A059] text-[#8B6508] rounded-lg px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-all font-['Montserrat',sans-serif]"
                  />
                </div>

                <div>
                  <label className="block text-[#8B6508] font-['Montserrat',sans-serif] font-bold mb-3">Unstop Registration Link</label>
                  <input
                    type="url"
                    name="unstopRegLink"
                    value={formData.unstopRegLink}
                    onChange={handleInputChange}
                    className="w-full bg-[#FFFBEB] border-2 border-[#C5A059] text-[#8B6508] rounded-lg px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-all font-['Montserrat',sans-serif]"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#8B6508] font-['Montserrat',sans-serif] font-bold mb-3">Latitude</label>
                    <input
                      type="text"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleInputChange}
                      className="w-full bg-[#FFFBEB] border-2 border-[#C5A059] text-[#8B6508] rounded-lg px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-all font-['Montserrat',sans-serif]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8B6508] font-['Montserrat',sans-serif] font-bold mb-3">Longitude</label>
                    <input
                      type="text"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleInputChange}
                      className="w-full bg-[#FFFBEB] border-2 border-[#C5A059] text-[#8B6508] rounded-lg px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-all font-['Montserrat',sans-serif]"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-gradient-to-b from-[#D4AF37] to-[#6E5B1D] text-white py-4 rounded-lg font-['Montserrat',sans-serif] font-bold text-lg hover:from-[#E5C158] hover:to-[#7F6C2E] transition-all shadow-xl border border-[#C5A059]"
                  >
                    {editingEvent !== null ? 'Update Event' : 'Create Event'}
                  </button>
                  <button
                    onClick={() => { setShowEventForm(false); resetForm(); }}
                    className="px-8 bg-gradient-to-b from-gray-400 to-gray-600 text-white py-4 rounded-lg font-['Montserrat',sans-serif] font-bold text-lg hover:from-gray-500 hover:to-gray-700 transition-all border border-gray-500"
                  >
                    Cancel
                  </button>
                </div>

                <div className="border-t-2 border-[#C5A059]/30 my-6"></div>

                {/* CSV Import at Bottom */}
                <div className="text-center">
                  <label className="inline-flex items-center gap-2 bg-gradient-to-b from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all shadow-lg cursor-pointer border border-blue-600 font-['Montserrat',sans-serif] font-semibold">
                    <Upload size={20} />
                    Import CSV
                    <input type="file" accept=".csv" onChange={handleCSVUpload} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Registrations Modal */}
        {showRegistrations && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border-4 border-[#C5A059]">
              <div className="bg-gradient-to-b from-[#D4AF37] to-[#6E5B1D] text-white px-8 py-6 flex justify-between items-center">
                <h2 className="font-['Montserrat',sans-serif] text-3xl font-bold flex items-center gap-3">
                  <Users size={28} />
                  Event Registrations
                </h2>
                <div className="flex gap-3">
                  <button
                    onClick={() => exportRegistrations(showRegistrations)}
                    className="hover:bg-white/20 p-3 rounded-lg flex items-center gap-2 transition-all font-['Montserrat',sans-serif] font-semibold"
                  >
                    <Download size={22} />
                    <span>Export CSV</span>
                  </button>
                  <button onClick={() => setShowRegistrations(false)} className="hover:bg-white/20 p-3 rounded-lg transition-all">
                    <X size={28} />
                  </button>
                </div>
              </div>
              
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="space-y-4">
                  {selectedEventRegs.map((reg) => (
                    <div key={reg.id} className="bg-gradient-to-r from-[#FDF8E2] to-[#FFFBEB] p-5 rounded-xl border-2 border-[#C5A059] flex justify-between items-center hover:border-[#D4AF37] transition-all">
                      <div>
                        <p className="font-bold text-[#8B6508] text-lg font-['Montserrat',sans-serif]">{reg.name}</p>
                        <p className="text-sm text-[#8B6508]/70 mt-1 font-['Montserrat',sans-serif]">{reg.email}</p>
                      </div>
                      <label className="flex items-center gap-3 cursor-pointer bg-white px-5 py-3 rounded-lg border-2 border-[#C5A059] hover:border-[#D4AF37] transition-all">
                        <input
                          type="checkbox"
                          checked={reg.attendance}
                          onChange={() => toggleAttendance(showRegistrations, reg.id)}
                          className="w-6 h-6 text-[#D4AF37] border-[#C5A059] rounded focus:ring-[#D4AF37]"
                        />
                        <span className="text-[#8B6508] font-['Montserrat',sans-serif] font-bold">
                          {reg.attendance ? 'Present' : 'Absent'}
                        </span>
                      </label>
                    </div>
                  ))}
                  {selectedEventRegs.length === 0 && (
                    <p className="text-center text-[#8B6508]/60 py-12 text-lg font-['Montserrat',sans-serif]">No registrations yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div key={event.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border-3 border-[#C5A059] hover:border-[#D4AF37] hover:shadow-2xl transition-all">
              {event.eventPhoto && (
                <img src={event.eventPhoto} alt={event.eventName} className="w-full h-52 object-cover" />
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-[#8B6508] font-['Montserrat',sans-serif]">{event.eventName}</h3>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold font-['Montserrat',sans-serif] ${
                    event.status === 'registrations_open' ? 'bg-green-100 text-green-700 border-2 border-green-500' :
                    event.status === 'registrations_closed' ? 'bg-red-100 text-red-700 border-2 border-red-500' :
                    event.status === 'upcoming' ? 'bg-blue-100 text-blue-700 border-2 border-blue-500' :
                    event.status === 'ongoing' ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-500' :
                    event.status === 'completed' ? 'bg-gray-100 text-gray-700 border-2 border-gray-500' :
                    'bg-red-100 text-red-700 border-2 border-red-500'
                  }`}>
                    {event.status.replace(/_/g, ' ').toUpperCase()}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-[#8B6508]/80 mb-5 font-['Montserrat',sans-serif]">
                  <p><strong className="text-[#8B6508]">Category:</strong> {event.eventCategory}</p>
                  <p><strong className="text-[#8B6508]">Mode:</strong> {event.eventMode}</p>
                  <p><strong className="text-[#8B6508]">Date:</strong> {new Date(event.date).toLocaleString()}</p>
                  {event.isWorkshop && (
                    <span className="inline-block bg-[#FDF8E2] text-[#8B6508] px-3 py-1 rounded-lg text-xs font-bold border-2 border-[#C5A059] mt-2">
                      Workshop
                    </span>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => viewRegistrations(event.id)}
                    className="flex-1 bg-gradient-to-b from-blue-500 to-blue-700 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 hover:from-blue-600 hover:to-blue-800 transition-all text-sm font-semibold shadow-lg font-['Montserrat',sans-serif] border border-blue-600"
                  >
                    <Users size={18} />
                    Registrations
                  </button>
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-gradient-to-b from-[#D4AF37] to-[#6E5B1D] text-white p-3 rounded-lg hover:from-[#E5C158] hover:to-[#7F6C2E] transition-all shadow-lg border border-[#C5A059]"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-gradient-to-b from-red-500 to-red-700 text-white p-3 rounded-lg hover:from-red-600 hover:to-red-800 transition-all shadow-lg border border-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {events.length === 0 && (
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