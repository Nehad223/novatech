// lib/refreshToken.ts
"use client";

export async function refreshToken(): Promise<string | null> {
  const refresh = getCookie("refresh_token");
  if (!refresh) return null;

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
    document.cookie = `access_token=${data.access}; path=/; max-age=3600`;
    return data.access;
  } catch (err) {
    console.error("Refresh token failed:", err);
    return null;
  }
}

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

