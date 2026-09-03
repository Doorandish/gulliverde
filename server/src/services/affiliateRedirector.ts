export const resolveAffiliateUrl = (provider: string, origin: string, dest: string): string => {
  const encOrigin = encodeURIComponent(origin);
  const encDest = encodeURIComponent(dest);
  
  switch (provider) {
    case 'omio':
      return `https://www.omio.de/search?from=${encOrigin}&to=${encDest}`;
    case 'db':
      return `https://www.bahn.de/buchung/start?from=${encOrigin}&to=${encDest}`;
    case 'booking':
      return `https://www.booking.com/searchresults.html?ss=${encDest}`;
    case 'gyg':
      return `https://www.getyourguide.de/s/?q=${encDest}`;
    default:
      return `https://www.google.com/search?q=${encDest}`;
  }
};
