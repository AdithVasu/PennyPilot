import React, { useState } from 'react';

export default function SearchCard({ onSearch, loading }) {
  const [destination, setDestination] = useState('');

  const handleAction = () => {
    if (!destination) return;
    onSearch(destination);
  };

  return (
    <div className="planner-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'row', gap: '0.75rem', alignItems: 'center' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', paddingLeft: '1rem' }}>
        {/* Replacement for MapPin Icon using a simple Unicode or CSS circle */}
        <span style={{ color: 'var(--slate-400)', marginRight: '0.75rem', fontSize: '1.25rem' }}>📍</span>
        <input 
          id="destination"
          className="pill-input"
          style={{ border: 'none', background: 'transparent', padding: '1rem 0' }}
          placeholder="Destination (e.g. Paris, France)"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      
      <button 
        onClick={handleAction}
        disabled={loading || !destination}
        className="btn-primary"
        style={{ width: 'auto', padding: '1rem 2.5rem', marginTop: 0 }}
      >
        {loading ? "..." : "PLAN IT"}
      </button>
    </div>
  );
}