export const BASE_URL = import.meta.env.BASE_URL;

export function withBase(path: string): string {
  if (/^[a-z][a-z0-9+.-]*:/i.test(path)) return path;
  const clean = path.replace(/^\/+/, '');
  return clean ? `${BASE_URL}${clean}` : BASE_URL;
}
