"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import Orange_btn from "./Orange_btn";
const Navbar_Admin = () => {
    useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img className="logo me-2" src="/Logo.avif" alt="NovaTech Logo" />
          <a className="navbar-brand fw-bold mt-3 mb-1 mx-2" href="#">
            NovaTech
          </a>
        </div>

        <button
          className="navbar-toggler mt-2 bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item mx-2 mt-lg-5">
              <a className="nav-link" href="/admin">
                Projects
              </a>
            </li>
            <li className="nav-item mx-2 mt-lg-5">
              <a className="nav-link" target="_blank" href="https://analytics.google.com/analytics/web/?authuser=7#/a375579974p513623390/reports/reportinghub?params=_u..nav%3Dmaui">
                Statistics
              </a>
            </li>
            <li className="mt-2 mt-lg-5 mx-2 ">
              <Orange_btn
                text="Log out"
                class="btn_Start"
                 href="/logout"
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar_Admin;

