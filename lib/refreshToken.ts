import { getCookie, setCookie } from "./cookies";

let refreshingPromise: Promise<string | null> | null = null;
let currentAccessToken: string | null = getCookie("access_token") || null;

export function getCurrentAccessToken() {
  return currentAccessToken;
}

export async function refreshToken(): Promise<string | null> {
  if (refreshingPromise) return refreshingPromise;

  const refresh = getCookie("refresh_token");
  if (!refresh) return null;

  refreshingPromise = (async () => {
    try {
      const res = await fetch(
        "https://novatech66.pythonanywhere.com/projects/token/refresh/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh }),
        }
      );

      if (!res.ok) return null;

      const data = await res.json();

      if (data.access) {
        currentAccessToken = data.access;
        setCookie("access_token", data.access, 600); // 10 دقائق
      }

      if (data.refresh) {
        setCookie("refresh_token", data.refresh, 7 * 24 * 60 * 60);
      }

      return currentAccessToken;
    } catch (e) {
      console.error("Refresh error:", e);
      return null;
    } finally {
      refreshingPromise = null;
    }
  })();

  return refreshingPromise;
}
