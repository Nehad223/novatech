export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const raw = parts.pop()?.split(";").shift();
    return raw ? decodeURIComponent(raw) : null;
  }
  return null;
}

export function setCookie(name: string, value: string, maxAgeSeconds: number) {
  const encoded = encodeURIComponent(value);
  document.cookie = `${name}=${encoded}; path=/; max-age=${maxAgeSeconds}; SameSite=Strict`;
}

// JWT expiry check
export function isAccessTokenValid(): boolean {
  const token = getCookie("access_token");
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now + 30; // صالح إذا تبقى أكثر من 30 ثانية
  } catch (e) {
    return false;
  }
}
