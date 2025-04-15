// CurrencyService.js
const API_URL = 'https://api.exchangerate-api.com/v4/latest/COP'; // Cambia esto a tu API

export const fetchExchangeRates = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error fetching exchange rates');
    const data = await response.json();
    return data.rates; // Devuelve las tasas de cambio
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return null;
  }
};

export const convertCurrency = (amount, rate) => {
  return (amount * rate).toFixed(2); // Convertir y redondear
};
