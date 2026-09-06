export const formatTemperature = (celsius, unit = 'C') => {
  if (celsius === undefined || celsius === null || isNaN(celsius)) return '--';
  if (unit === 'F') {
    const fahrenheit = (celsius * 9) / 5 + 32;
    return `${Math.round(fahrenheit)}°`;
  }
  return `${Math.round(celsius)}°`;
};

export const formatWindSpeed = (kmh, unit = 'kmh') => {
  if (kmh === undefined || kmh === null || isNaN(kmh)) return '--';
  if (unit === 'mph') {
    return `${Math.round(kmh * 0.621371)} mph`;
  } else if (unit === 'ms') {
    return `${(kmh / 3.6).toFixed(1)} m/s`;
  }
  return `${Math.round(kmh)} km/h`;
};

export const formatTime = (timeStr, format = '12h') => {
  if (!timeStr) return '';
  try {
    let hours, minutes;
    if (typeof timeStr === 'string' && timeStr.includes('T')) {
      const timePart = timeStr.split('T')[1];
      const parts = timePart.split(':');
      hours = parseInt(parts[0], 10);
      minutes = parseInt(parts[1], 10);
    } else if (typeof timeStr === 'string' && timeStr.includes(':')) {
      const parts = timeStr.split(':');
      hours = parseInt(parts[0], 10);
      minutes = parseInt(parts[1], 10);
    } else {
      return timeStr;
    }

    if (isNaN(hours) || isNaN(minutes)) return timeStr;

    const padMin = String(minutes).padStart(2, '0');
    if (format === '24h') {
      return `${String(hours).padStart(2, '0')}:${padMin}`;
    }

    const period = hours >= 12 ? 'PM' : 'AM';
    const h12 = hours % 12 || 12;
    return `${String(h12).padStart(2, '0')}:${padMin} ${period}`;
  } catch {
    return timeStr;
  }
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  } catch {
    return dateStr;
  }
};
