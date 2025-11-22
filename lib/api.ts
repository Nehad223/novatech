import { getCurrentAccessToken, refreshToken } from "./refreshToken";
import { isAccessTokenValid } from "./cookies";

export async function api(url: string, options: RequestInit = {}) {
  // تحقق من صلاحية token قبل الإرسال
  if (!isAccessTokenValid()) {
    const newToken = await refreshToken();
    if (!newToken) {
      window.location.href = "/admin/login";
      return;
    }
  }

  const token = getCurrentAccessToken();

  const buildHeaders = (t: string | null) => ({
    "Content-Type": "application/json",
    ...(options.headers || {}),
    Authorization: t ? `Bearer ${t}` : "",
  });

  try {
    const res = await fetch(url, { ...options, headers: buildHeaders(token) });
    return res;
  } catch (err) {
    console.error("API error:", err);
    throw err;
  }
}
