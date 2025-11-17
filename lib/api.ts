// lib/api.ts
"use client";
import { refreshToken } from "./refreshToken";
function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

export async function api(url: string, options: RequestInit = {}) {
  const access = getCookie("access_token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    Authorization: access ? `Bearer ${access}` : "",
  };

  try {
    let res = await fetch(url, { ...options, headers });

 
    if (res.status === 401) {
      const newAccess = await refreshToken();
      if (newAccess) {
        res = await fetch(url, {
          ...options,
          headers: { ...headers, Authorization: `Bearer ${newAccess}` },
        });
      }
    }

    return res;
  } catch (err) {
    console.error("API request failed:", err);
    throw err;
  }
}

