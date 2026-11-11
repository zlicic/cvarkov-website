const map: Record<string, string> = {
  č: 'c',
  ć: 'c',
  đ: 'dj',
  š: 's',
  ž: 'z',
  Č: 'C',
  Ć: 'C',
  Đ: 'Dj',
  Š: 'S',
  Ž: 'Z',
};

export function slugify(text: string) {
  return text
    .split('')
    .map((c) => map[c] || c)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}
