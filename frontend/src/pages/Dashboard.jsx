import React, { useState, useEffect } from 'react';
import api from '../services/api';
import TripPlanner from '../components/TripPlanner';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get('/travel/my-plans/');
      setHistory(res.data);
    } catch (err) {
      console.error("History fetch failed:", err.response?.data || err.message);
    }
  };

  const handleSearch = async (formData) => {
    setLoading(true);
    setItinerary(null);
    
    try {
      const res = await api.post('/travel/generate/', formData);
      setItinerary(res.data.itinerary_data);
      fetchHistory(); 
    } catch (err) {
      console.error("SERVER ERROR DETAILS:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--slate-50)' }}>
      {/* Sticky Header */}
      <header className="sticky-header">
        <div className="header-container">
          <h1 className="brand-logo">PennyPilot</h1>
          <button onClick={handleLogout} className="btn-secondary">
            LOGOUT
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-layout">
        
        {/* Search Section */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 className="section-title">Plan Your Next Trip</h2>
            <p style={{ color: 'var(--slate-600)', fontWeight: 700 }}>
              Your budget Itinerary for vacation
            </p>
          </div>
          <TripPlanner onSearch={handleSearch} loading={loading} />
        </section>

        <div style={{ height: '1px', backgroundColor: 'var(--slate-200)', marginBottom: '4rem' }}></div>

        {/* Saved Plans Section */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <h3 className="brand-logo" style={{ fontSize: '1.5rem' }}>Saved Travel Plans</h3>
            <span className="trip-badge" style={{ padding: '0.5rem 1rem' }}>
              {history.length} RESULTS
            </span>
          </div>

          {history.length > 0 ? (
            <div className="history-grid">
              {history.map((plan) => (
                <div key={plan.id} className="trip-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: 'var(--slate-950)' }}>
                        {plan.destination}
                      </h4>
                      <p style={{ fontSize: '12px', color: 'var(--slate-500)', fontWeight: 700, textTransform: 'uppercase', marginTop: '0.25rem' }}>
                        {plan.arrival_date} — {plan.departure_date}
                      </p>
                    </div>
                    <div className="trip-badge">{plan.vibe}</div>
                  </div>
                  
                  <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--slate-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <p className="field-label" style={{ marginBottom: '0.25rem' }}>Origin</p>
                      <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--slate-700)' }}>{plan.origin}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p className="field-label" style={{ marginBottom: '0.25rem' }}>Total Budget</p>
                      <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900, color: 'var(--slate-950)' }}>
                        €{Math.floor(plan.total_budget)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '6rem 0', backgroundColor: 'var(--white)', borderRadius: '2rem', border: '2px dashed var(--slate-200)' }}>
              <p style={{ color: 'var(--slate-400)', fontWeight: 700, fontSize: '1.125rem' }}>No saved trips yet.</p>
            </div>
          )}
        </section>
      </main>

      {/* Itinerary Modal */}
      {itinerary && (
        <div className="modal-overlay">
          <div className="modal-body">
            <div className="modal-header">
              <h3 className="brand-logo" style={{ fontSize: '1.5rem' }}>Adventure Strategy</h3>
              <button 
                onClick={() => setItinerary(null)} 
                style={{ background: 'none', border: 'none', fontWeight: 900, color: 'var(--slate-400)', cursor: 'pointer', textTransform: 'uppercase', fontSize: '12px' }}
              >
                [ Close ]
              </button>
            </div>
            <div style={{ padding: '2rem', overflowY: 'auto' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                {itinerary.daily_plan?.map((day, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                      <span className="trip-badge" style={{ backgroundColor: 'var(--slate-950)', color: 'var(--white)' }}>
                        {day.date ? day.date : `DAY ${day.day}`}
                      </span>
                      <div style={{ height: '1px', flex: 1, backgroundColor: 'var(--slate-100)' }}></div>
                    </div>
                    <p style={{ color: 'var(--slate-700)', fontWeight: 700, lineHeight: 1.6, marginBottom: '0.75rem' }}>
                      {day.activities}
                    </p>
                    <p className="field-label" style={{ color: 'var(--slate-950)' }}>
                      Estimated Cost: €{day.estimated_cost}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}