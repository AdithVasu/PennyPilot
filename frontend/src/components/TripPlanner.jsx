import React, { useState } from 'react';

export default function TripPlanner({ onSearch, loading }) {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    arrivalDate: '',
    departureDate: '',
    vibe: 'historical sightseeing'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const start = new Date(formData.arrivalDate);
    const end = new Date(formData.departureDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    onSearch({
      ...formData,
      days: diffDays
    });
  };

  return (
    <div className="planner-card">
      <form onSubmit={handleSubmit}>
        <div className="input-grid">
          
          {/* Leaving From */}
          <div>
            <label className="field-label">Leaving From</label>
            <input 
              className="pill-input"
              placeholder="e.g. London"
              value={formData.origin}
              onChange={(e) => setFormData({...formData, origin: e.target.value})}
              required
            />
          </div>

          {/* Arriving To */}
          <div>
            <label className="field-label">Arriving To</label>
            <input 
              className="pill-input"
              placeholder="e.g. Rome"
              value={formData.destination}
              onChange={(e) => setFormData({...formData, destination: e.target.value})}
              required
            />
          </div>

          {/* Arrival Date */}
          <div>
            <label className="field-label">Arrival Date</label>
            <input 
              type="date"
              className="pill-input"
              value={formData.arrivalDate}
              onChange={(e) => setFormData({...formData, arrivalDate: e.target.value})}
              required
            />
          </div>

          {/* Departure Date */}
          <div>
            <label className="field-label">Departure Date</label>
            <input 
              type="date"
              className="pill-input"
              value={formData.departureDate}
              onChange={(e) => setFormData({...formData, departureDate: e.target.value})}
              required
            />
          </div>

          {/* Vibe Dropdown (Full Width) */}
          <div className="full-width">
            <label className="field-label">Vacation Vibe</label>
            <select 
              className="pill-input"
              style={{ cursor: 'pointer' }}
              value={formData.vibe}
              onChange={(e) => setFormData({...formData, vibe: e.target.value})}
            >
              <option value="historical sightseeing">Historical Sightseeing</option>
              <option value="nature exploration">Nature Exploration</option>
              <option value="relaxation">Relaxation</option>
              <option value="cultural immersion">Cultural Immersion</option>
            </select>
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading || !formData.arrivalDate || !formData.departureDate}
          className="btn-primary"
        >
          {loading ? "CALCULATING DATES..." : "GENERATE PLAN"}
        </button>
      </form>
    </div>
  );
}