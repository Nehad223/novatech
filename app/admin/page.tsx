"use client";
import '../portfolio/Portfolio.css';
import Portfilio_Items from '../Components/Portfilio_Items.jsx';
import Navbar_Admin from '../Components/Navbar_Admin.jsx';
import '../globals.css';
import { useState,useEffect } from "react";
import { refreshToken } from '../../lib/refreshToken';
import AddProjectModal from "./components/AddProjectModal.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Page() {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    // تحقق من وجود التوكن عند الدخول
    const cookies = document.cookie;
    if (!cookies.includes("access_token=")) {
      window.location.href = "/admin/login";
    }

    // تحديث التوكن كل 9 دقايق (540000 مللي ثانية)
    const interval = setInterval(async () => {
      const newToken = await refreshToken();
      if (!newToken) {
        console.warn("Failed to refresh token, redirecting to login...");
        window.location.href = "/admin/login";
      } else {
        console.log("Access token refreshed successfully");
      }
    }, 9 * 60 * 1000); // 9 دقائق
    return () => clearInterval(interval);
  }, []);
useEffect(() => {
  const hasRefreshed = sessionStorage.getItem("admin_refreshed");

  if (!hasRefreshed) {
    sessionStorage.setItem("admin_refreshed", "true");
    window.location.replace("/admin");
  }
}, []);


  return (
    <div className="container py-4">
      <Navbar_Admin />
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-primary mt-lg-5"
          onClick={() => setShowModal(true)}
        >
          + إضافة مشروع
        </button>
      </div>

      <Portfilio_Items type="admin" />

      {/* نافذة الإضافة */}
      {showModal && (
        <AddProjectModal
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}



