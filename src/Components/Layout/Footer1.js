import React from "react";
import { Link } from "react-router-dom";
import Ftbg from "../../assets/images/footer-bg-1.png";
import FtbgTwo from "../../assets/images/footer-bg-2.png";
import Logo from "../../assets/images/logo.png";
import Facebook from "../../assets/images/facebook.svg";
import Insta from "../../assets/images/insta.svg";
import YouTube from "../../assets/images/youtube.svg";

export default function Footer() {
  return (
    <>
      <footer className="position-relative">
        <div className="footer-main-class position-relative">
          <div className="container">
            <div className="row">
              <div className="col-12 ovr-div-class">
                <div className="row">
                  <div className="col-lg-5 col-12 mb-lg-0 mb-md-4 mb-3 pe-lg-5 pe-2">
                    <div className="ftr-links-part">
                      <div className="footer-logo mb-sm-4 mb-2">
                        <Link to="/#">
                          <img
                            src={Logo}
                            className="img-fluid logo"
                            alt="logo"
                          />
                        </Link>
                      </div>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s
                      </p>
                      <div className="social-media-links mt-3 mt-sm-5">
                        <Link to="/" className="social-comn-box me-3">
                          <img
                            src={Facebook}
                            alt="social-icon"
                          />
                        </Link>
                        <Link to="/" className="social-comn-box me-3">
                          <img
                            src={Insta}
                            alt="social-icon"
                          />
                        </Link>
                        <Link to="/" className="social-comn-box me-3">
                          <img
                            src={YouTube}
                            alt="social-icon"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-6 mb-md-0 mb-3 pe-2">
                    <div className="ftr-links-part">
                      <span className="d-block">Company</span>
                      <ul>
                        <li>
                          <Link to="/">
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link to="/">
                           Contact Us
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-2 col-6 mb-md-0 mb-3 pe-2">
                    <div className="ftr-links-part">
                      <span className="d-block">Technology</span>
                      <ul>
                        <li>
                          <Link to="/">
                           Features
                          </Link>
                        </li>
                        <li>
                          <Link to="/">
                           FAQs
                          </Link>
                        </li>
                        <li>
                          <Link to="/">
                            Support
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3 col-12 mt-lg-0 mt-md-4 mt-3 pe-2">
                    <div className="ftr-links-part">
                      <span className="d-block">Join Our Newsfeeds!</span>
                      <p>
                        Subscribe our newsletter to get info about our events
                        and schedule.
                      </p>
                      <div className="position-relative btm-comn-section">
                        <div className="input-group">
                          <span className="input-group-text">
                            <svg
                              width="21"
                              height="20"
                              viewBox="0 0 21 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M18.452 19.9724H2.48945C1.38747 19.9724 0.494141 19.077 0.494141 17.9724V7.02141C0.527813 6.35027 0.890489 5.73927 1.46286 5.38941L9.44411 0.589407C10.0758 0.209781 10.8647 0.209781 11.4963 0.589407L19.4775 5.38941C20.0773 5.75218 20.4449 6.40225 20.4473 7.10441V17.9724C20.4473 19.077 19.5539 19.9724 18.452 19.9724ZM2.48945 7.84041V17.9724H18.452V7.84041L10.4707 13.1734L2.48945 7.84041ZM10.4707 2.30441L3.80237 6.31441L10.4707 10.7704L17.138 6.31441L10.4707 2.30441Z"
                                fill="#6A6E83"
                              ></path>
                            </svg>
                          </span>
                          <input
                            type="text"
                            className="input-style-comn-btm form-control"
                            placeholder="Email address"
                            name="email"
                            autoComplete="off"
                          />
                          <button className="input-group-text">
                            <bdi>
                              <svg
                                width="16"
                                height="14"
                                viewBox="0 0 16 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15.79 0.426222C15.6367 0.317555 15.4354 0.302889 15.2687 0.390222L0.268696 8.22356C0.091363 8.31622 -0.0133037 8.50556 0.00136299 8.70489C0.0166963 8.90489 0.149363 9.07556 0.33803 9.14022L4.50803 10.5656L13.3887 2.97222L6.5167 11.2516L13.5054 13.6402C13.5574 13.6576 13.612 13.6669 13.6667 13.6669C13.7574 13.6669 13.8474 13.6422 13.9267 13.5942C14.0534 13.5169 14.1394 13.3869 14.1614 13.2409L15.9947 0.907555C16.022 0.720889 15.9434 0.535555 15.79 0.426222Z"
                                  fill="white"
                                />
                              </svg>
                            </bdi>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bg-1">
            <img src={Ftbg} alt="" className="footer-bg" />
          </div>
          <div className="footer-bg-2">
            <img src={FtbgTwo} alt="" className="footer-bg" />
          </div>
        </div>
        <div className="footer-sub-part py-3">
          © {new Date().getFullYear()} Powered by Starprospect | All Rights Reserved.
        </div>
      </footer>

      {/* <footer className="footer-fixed">
        <div className="footer-sub-part d-md-flex align-items-center justify-content-between py-3">
          <div>
            <ul className='d-flex justify-content-center'>
              <li><span>About us</span><bdi className='footer-dots'></bdi></li>
              <li><span>FAQ</span><bdi className='footer-dots'></bdi></li>
              <li><span>Contact Us</span></li>
            </ul>
          </div>
          <div className=''>
            <span>© Copyright Powered by Starprospect. All Rights Reserved</span>
          </div>
        </div>
      </footer> */}
    </>
  );
}
