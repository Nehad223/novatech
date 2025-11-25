"use client";
import './login.css';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from '@/lib/cookies';
export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const submit = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://novatech66.pythonanywhere.com/projects/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.detail || "كلمة السر غلط");
        return;
      }

setCookie("access_token", data.token, 3600);
setCookie("refresh_token", data.refresh, 7 * 24 * 60 * 60);


      router.push("/admin"); // تحويل للأدمن
    } catch (e) {
      console.log("ERROR:", e);
      setError("صار خطأ");
    }
  };

  return (
    <div className="container">
      <div className="box">
        <img src="/Logo.avif" className="logo" alt="Logo" />
        <h1 className="title">Novatech</h1>

        <form onSubmit={submit}>
          <input
            type="password"
            placeholder="كلمة السر"
            className="input"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" className="button">دخول</button>
        </form>
      </div>
    </div>
  );
}


