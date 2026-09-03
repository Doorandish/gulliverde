export const slugify = (text: string): string => {
  const charMap: Record<string, string> = {
    'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'ß': 'ss',
    'Ä': 'ae', 'Ö': 'oe', 'Ü': 'ue'
  };

  const processed = text.replace(/[äöüßÄÖÜ]/g, match => charMap[match] || match);
  
  return processed
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
};

export const buildTripSlug = (origin: string, destination: string): string => {
  return slugify(`${origin}-nach-${destination}-mit-dem-zug`);
};

export const buildEventSlug = (city: string, eventName: string, year: number): string => {
  return slugify(`${city}-${eventName}-${year}`);
};
