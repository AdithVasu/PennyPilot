// Formats numbers into European currency styles
export const formatCurrency = (amount, currency = 'EUR') => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };
  
  // Validates that the AI JSON is intact
  export const isValidItinerary = (data) => {
    return data && data.total_budget && Array.isArray(data.daily_plan);
  };