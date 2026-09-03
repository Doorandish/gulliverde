import { env } from '../config/env.js';

export const getWeatherForecast = async (city: string, countryCode?: string) => {
  if (!env.OPENWEATHERMAP_API_KEY) {
    return {
      temp: 18,
      condition: 'Sonnig',
      icon: '☀️',
      precipitation: 10
    };
  }

  try {
    const query = countryCode ? `${city},${countryCode}` : city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${env.OPENWEATHERMAP_API_KEY}&units=metric&lang=de`;
    
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Weather API error');
    }
    
    const data = await res.json();
    return {
      temp: Math.round(data.main.temp),
      condition: data.weather[0].description,
      icon: getIcon(data.weather[0].icon),
      precipitation: data.pop ? Math.round(data.pop * 100) : 0
    };
  } catch (err) {
    console.error('Weather service error:', err);
    return { temp: 18, condition: 'Unbekannt', icon: '❓', precipitation: 0 };
  }
};

function getIcon(code: string): string {
  if (code.includes('01')) return '☀️';
  if (code.includes('02')) return '⛅';
  if (code.includes('03') || code.includes('04')) return '☁️';
  if (code.includes('09') || code.includes('10')) return '🌧️';
  if (code.includes('11')) return '⛈️';
  if (code.includes('13')) return '❄️';
  if (code.includes('50')) return '🌫️';
  return '☀️';
}
