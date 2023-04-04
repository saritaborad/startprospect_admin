import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="footer-fixed">
        <div className="footer-sub-part d-md-flex align-items-center justify-content-between py-3">
          <div>
            <ul className="d-flex justify-content-center">
              <li>
                <Link to="/">About us</Link>
                <bdi className="footer-dots"></bdi>
              </li>
              <li>
              <Link to="/">FAQ</Link>
                <bdi className="footer-dots"></bdi>
              </li>
              <li>
                <Link to="/">Contact Us</Link>
                <bdi className="footer-dots"></bdi>
              </li>
            </ul>
          </div>
          <div className="">
            <span>
              © {new Date().getFullYear()} Powered by Starprospect | All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
