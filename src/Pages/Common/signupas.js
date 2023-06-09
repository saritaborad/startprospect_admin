import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLogo from "../../assets/images/main-logo.png";
import ArchyMan from "../../assets/images/Archery-man.png";

export default function SignupAs() {
  const [defineSignup, setDefineSignupRole] = useState("business");
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("strusertoken");
    if (token) {
      navigate("/latest");
    }
  }, []);

  const handleRoleChange = () => {
    if (defineSignup === "business") {
      navigate("/signupbusiness", { state: { signupType: 1 } });
    } else if ((defineSignup === "athletes")) {
      navigate("/signupathletes", { state: { signupType: 2 } });
    } else if (defineSignup === "coach") {
      navigate("/signupcoach", { state: { signupType: 3 } });
    } else if (defineSignup === "parent") {
      navigate("/signupcoach", { state: { signupType: 4 } });
    } else if (defineSignup === "fan") {
      navigate("/signupcoach", { state: { signupType: 5 } });
    }
  };

  return (
    <>
      <div className="container-fluid login-flow-screen">
        <div className="row align-items-center h-100 position-relative">
          <div className="col-12 p-0">
            <div className="login-box mx-auto">
              <div className="row">
                <div className="col-md-6 ovr-div-class">
                  <div >
                    <div className="main-logo-box text-center mb-3 mt-5">
                      <img src={MainLogo} className="img-fluid" alt="starprospect" />
                    </div>
                    <form className="row align-items-center signup-as-form-div max-width-class mx-auto px-sm-5">
                      <div className="col-12 mb-3">
                        <div className="text-start">
                          <div className="comn-login-head">
                            <h2>Sign Up As</h2>
                            <p>
                              Choose any one in three selections and signup
                              based on your selection.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12 select-signup-div mb-3">
                        <div className="row align-items-center justify-content-center me-0">
                          <div className="col-lg-4 col-sm-6 pe-0 soc-icon-main">
                            <label className="cust-chk-bx p-0">
                              <input
                                type="radio"
                                name="sign-up-as"
                                value="business"
                                defaultChecked
                                onChange={(e) => {
                                  setDefineSignupRole(e.target.value);
                                }}
                              />
                              <div className="cust-chkbox">
                                <div className="text-center">
                                  <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 22 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-center"
                                  >
                                    <path
                                      d="M18.5833 20.75V3.41667C18.5833 2.22005 17.6133 1.25 16.4167 1.25H5.58333C4.38672 1.25 3.41667 2.22005 3.41667 3.41667V20.75M18.5833 20.75L20.75 20.75M18.5833 20.75H13.1667M3.41667 20.75L1.25 20.75M3.41667 20.75H8.83333M7.75 5.58331H8.83333M7.75 9.91664H8.83333M13.1667 5.58331H14.25M13.1667 9.91664H14.25M8.83333 20.75V15.3333C8.83333 14.735 9.31836 14.25 9.91667 14.25H12.0833C12.6816 14.25 13.1667 14.735 13.1667 15.3333V20.75M8.83333 20.75H13.1667"
                                      stroke="#7B838A"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <p className="mb-0 mt-3">Business</p>
                                </div>
                              </div>
                            </label>
                          </div>
                          <div className="col-lg-4 col-sm-6 pe-0 soc-icon-main">
                            <label className="cust-chk-bx p-0">
                              <input
                                type="radio"
                                name="sign-up-as"
                                value="athletes"
                                onChange={(e) => {
                                  setDefineSignupRole(e.target.value);
                                }}
                              />
                              <div className="cust-chkbox">
                                <div className="text-center">
                                  <svg
                                    width="18"
                                    height="22"
                                    viewBox="0 0 18 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M13.3334 5.58333C13.3334 7.97657 11.3933 9.91667 9.00008 9.91667C6.60685 9.91667 4.66675 7.97657 4.66675 5.58333C4.66675 3.1901 6.60685 1.25 9.00008 1.25C11.3933 1.25 13.3334 3.1901 13.3334 5.58333Z"
                                      stroke="#7B838A"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M9.00008 13.1667C4.81192 13.1667 1.41675 16.5618 1.41675 20.75H16.5834C16.5834 16.5618 13.1882 13.1667 9.00008 13.1667Z"
                                      stroke="#7B838A"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <p className="mb-0 mt-3">Athletes</p>
                                </div>
                              </div>
                            </label>
                          </div>
                          <div className="col-lg-4 col-sm-6 pe-0 soc-icon-main">
                            <label className="cust-chk-bx p-0">
                              <input
                                type="radio"
                                name="sign-up-as"
                                value="coach"
                                onChange={(e) => {
                                  setDefineSignupRole(e.target.value);
                                }}
                              />
                              <div className="cust-chkbox">
                                <div className="text-center">
                                  <svg
                                    width="22"
                                    height="20"
                                    viewBox="0 0 22 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M7.74959 0.25C4.75805 0.25 2.33293 2.67512 2.33293 5.66667C2.33293 8.65821 4.75805 11.0833 7.74959 11.0833C10.7411 11.0833 13.1663 8.65821 13.1663 5.66667C13.1663 2.67512 10.7411 0.25 7.74959 0.25ZM4.49959 5.66667C4.49959 3.87174 5.95467 2.41667 7.74959 2.41667C9.54452 2.41667 10.9996 3.87174 10.9996 5.66667C10.9996 7.46159 9.54452 8.91667 7.74959 8.91667C5.95467 8.91667 4.49959 7.46159 4.49959 5.66667Z"
                                      fill="#7B838A"
                                    />
                                    <path
                                      d="M16.317 5.90314C16.0123 5.74774 15.675 5.66673 15.3329 5.66673V3.50007C16.0172 3.50007 16.6917 3.66203 17.3012 3.97282C17.3684 4.00705 17.4345 4.04298 17.4996 4.08056C18.0254 4.38415 18.4824 4.79533 18.84 5.2881C19.2419 5.84187 19.5069 6.48293 19.6134 7.15881C19.7199 7.8347 19.6649 8.52621 19.4528 9.17672C19.2406 9.82724 18.8775 10.4183 18.393 10.9015C17.9086 11.3847 17.3166 11.7463 16.6655 11.9567C16.0862 12.1439 15.4747 12.2067 14.8709 12.142C14.7962 12.134 14.7216 12.124 14.6472 12.1121C13.972 12.0039 13.3321 11.7374 12.7796 11.3346L12.7785 11.3337L14.0557 9.58353C14.3321 9.78519 14.6523 9.9185 14.9901 9.97264C15.3279 10.0268 15.6737 10.0001 15.9992 9.89494C16.3247 9.78974 16.6207 9.60894 16.8629 9.36736C17.1052 9.12577 17.2867 8.83026 17.3928 8.50501C17.4988 8.17976 17.5264 7.83402 17.4731 7.49608C17.4199 7.15815 17.2873 6.83763 17.0864 6.56076C16.8855 6.28388 16.6218 6.05853 16.317 5.90314Z"
                                      fill="#7B838A"
                                    />
                                    <path
                                      d="M19.6642 19.75C19.6642 19.1812 19.5522 18.618 19.3345 18.0925C19.1168 17.567 18.7978 17.0895 18.3956 16.6873C17.9934 16.2851 17.5159 15.9661 16.9904 15.7484C16.4649 15.5308 15.9017 15.4187 15.3329 15.4187V13.25C16.0718 13.25 16.8045 13.376 17.4996 13.6217C17.6075 13.6599 17.7144 13.7009 17.8204 13.7448C18.609 14.0714 19.3255 14.5502 19.9291 15.1538C20.5327 15.7574 21.0115 16.4739 21.3381 17.2626C21.382 17.3685 21.423 17.4755 21.4612 17.5833C21.7069 18.2784 21.8329 19.0111 21.8329 19.75H19.6642Z"
                                      fill="#7B838A"
                                    />
                                    <path
                                      d="M15.3329 19.75H13.1663C13.1663 16.7585 10.7411 14.3333 7.74959 14.3333C4.75805 14.3333 2.33293 16.7585 2.33293 19.75H0.16626C0.16626 15.5618 3.56143 12.1667 7.74959 12.1667C11.9378 12.1667 15.3329 15.5618 15.3329 19.75Z"
                                      fill="#7B838A"
                                    />
                                  </svg>
                                  <p className="mb-0 mt-3">Coach</p>
                                </div>
                              </div>
                            </label>
                          </div>
                          <div className="col-lg-4 col-sm-6 pe-0 soc-icon-main">
                            <label className="cust-chk-bx p-0">
                              <input
                                type="radio"
                                name="sign-up-as"
                                value="parent"
                                onChange={(e) => {
                                  setDefineSignupRole(e.target.value);
                                }}
                              />
                              <div className="cust-chkbox">
                                <div className="text-center">
                                  <svg
                                    width="19"
                                    height="21"
                                    viewBox="0 0 19 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M5.03749 0.0652989C3.34452 0.416932 2.23905 2.04777 2.58693 3.68045C2.84076 4.87195 3.83326 5.84268 5.03931 6.07912L5.33329 6.13672L4.82555 6.16363C3.50611 6.23357 2.4017 6.70855 1.47918 7.60294C0.761153 8.29911 0.297419 9.12392 0.0818842 10.0884C-0.0268986 10.5752 -0.0273641 11.5965 0.0809109 12.1599C0.234459 12.9587 0.612809 13.8629 1.05623 14.4909L1.25023 14.7656V17.6383C1.25023 20.4365 1.25243 20.5152 1.3354 20.6729C1.39024 20.7771 1.48011 20.8643 1.58762 20.9174C1.75319 20.9993 1.82084 21 9.50097 21C17.1811 21 17.2487 20.9993 17.4143 20.9174C17.5218 20.8643 17.6117 20.7771 17.6665 20.6729C17.7495 20.5152 17.7517 20.4365 17.7517 17.6383V14.7656L17.9457 14.4909C18.375 13.8829 18.7211 13.0743 18.8994 12.2625C19.0227 11.7007 19.0351 10.5663 18.923 10.095C18.5645 8.58814 17.6276 7.38573 16.29 6.71594C15.5978 6.36935 14.9512 6.20141 14.1552 6.16137L13.6686 6.13692L13.9578 6.08015C15.1011 5.85568 16.0698 4.96602 16.3773 3.85799C16.4125 3.73124 16.4532 3.4518 16.4676 3.23701C16.6009 1.25901 14.6953 -0.33958 12.6831 0.0623044C10.9687 0.404708 9.85211 2.03362 10.203 3.68045C10.4567 4.8713 11.4407 5.83464 12.6554 6.08113C12.9416 6.13926 12.9155 6.14123 11.6589 6.1569C10.2313 6.1747 10.1727 6.18393 9.72378 6.46239L9.50097 6.60054L9.27815 6.46239C8.83266 6.18607 8.76851 6.17577 7.34308 6.15165C6.5024 6.13746 6.12633 6.11879 6.26414 6.09816C7.21911 5.9552 8.16887 5.22621 8.59478 4.30923C8.74875 3.97777 8.82238 3.67032 8.85157 3.23701C8.96898 1.49497 7.47848 -0.017892 5.66298 0.000526489C5.48163 0.00233142 5.20018 0.0314975 5.03749 0.0652989ZM6.08224 1.27354C6.44879 1.34828 6.75216 1.51035 7.02761 1.77863C8.11882 2.84141 7.52396 4.63198 5.99525 4.88615C5.39489 4.98595 4.8024 4.79832 4.35826 4.36772C3.60677 3.63919 3.60626 2.50475 4.35708 1.77957C4.82699 1.32572 5.44668 1.14391 6.08224 1.27354ZM13.6983 1.27354C14.0649 1.34828 14.3682 1.51035 14.6437 1.77863C15.7349 2.84141 15.14 4.63198 13.6113 4.88615C13.011 4.98595 12.4185 4.79832 11.9743 4.36772C11.2228 3.63919 11.2223 2.50475 11.9731 1.77957C12.4431 1.32572 13.0627 1.14391 13.6983 1.27354ZM8.49459 7.44706L8.62639 7.51314L8.33381 7.66078C7.91589 7.87163 7.44526 8.33517 7.24348 8.73467C6.96287 9.2903 6.89602 9.86505 7.04584 10.4331C7.16812 10.8965 7.35595 11.2112 7.72245 11.5665C8.08379 11.9168 8.4117 12.1029 8.87484 12.2206L9.18363 12.299L8.59127 12.3017C7.96629 12.3046 7.70544 12.3491 7.35391 12.5126C7.08088 12.6397 6.66128 13.0531 6.5357 13.3188C6.4344 13.533 6.43288 13.5341 6.23943 13.5341C5.96144 13.5341 5.43479 13.3941 5.1296 13.2391C4.78637 13.0648 4.27305 12.5671 4.09322 12.2344C3.93075 11.9337 3.78892 11.4267 3.78892 11.1467C3.78892 10.7614 3.50911 10.4576 3.15425 10.4576C2.93871 10.4576 2.70067 10.6024 2.59912 10.7954C2.51941 10.9469 2.51141 11.011 2.53396 11.3179C2.65078 12.9062 3.7871 14.2368 5.3756 14.6455C5.62862 14.7105 5.89036 14.7379 6.41223 14.7537C7.22457 14.7784 7.37042 14.8232 7.51178 15.0919C7.67832 15.4084 7.56611 15.7612 7.24885 15.9181C7.08096 16.0012 7.03032 16.0047 6.32917 15.9823C5.90259 15.9688 5.46441 15.9316 5.29842 15.895C4.28777 15.6721 3.4613 15.2339 2.74852 14.5428C2.0302 13.8464 1.58559 13.0547 1.3489 12.0507C1.23876 11.5834 1.25036 10.5782 1.37082 10.1499C1.76432 8.75104 2.93376 7.69794 4.37426 7.44525C4.61573 7.40288 5.16675 7.38741 6.5307 7.38466C8.13744 7.38142 8.37895 7.38909 8.49459 7.44706ZM14.8957 7.49645C16.2449 7.85891 17.265 8.84838 17.6311 10.1499C17.7516 10.5782 17.7632 11.5834 17.653 12.0507C17.2935 13.5757 16.3232 14.796 14.9288 15.4768C14.2227 15.8215 13.6433 15.9514 12.6728 15.9823C11.9716 16.0047 11.921 16.0012 11.7531 15.9181C11.44 15.7633 11.3236 15.4084 11.4852 15.1012C11.6294 14.8272 11.7891 14.7769 12.5897 14.7532C13.1131 14.7377 13.3726 14.7107 13.6263 14.6455C15.2148 14.2368 16.3512 12.9062 16.468 11.3179C16.4905 11.011 16.4825 10.9469 16.4028 10.7954C16.3424 10.6806 16.2561 10.5951 16.145 10.5401C15.6857 10.313 15.213 10.6206 15.213 11.1467C15.213 11.4267 15.0712 11.9337 14.9087 12.2344C14.7289 12.5671 14.2156 13.0648 13.8723 13.2391C13.567 13.3942 13.0404 13.5341 12.7622 13.5341C12.5686 13.5341 12.5667 13.5328 12.4635 13.3188C12.3352 13.0528 11.9192 12.6439 11.6446 12.5141C11.295 12.3487 11.039 12.3047 10.4107 12.3017L9.8183 12.299L10.1271 12.2206C10.5902 12.1029 10.9181 11.9168 11.2795 11.5665C11.9149 10.9504 12.158 10.1698 11.976 9.32948C11.8292 8.65173 11.3042 7.98165 10.6684 7.6609L10.3761 7.51343L10.4992 7.44743C10.6083 7.38893 10.8455 7.38282 12.5897 7.39348C14.4706 7.40501 14.5721 7.40952 14.8957 7.49645ZM10.0695 8.7521C10.512 8.96205 10.7474 9.34051 10.7474 9.84224C10.7474 10.1917 10.6595 10.4254 10.435 10.6734C10.0908 11.0535 9.43153 11.1704 8.94322 10.9379C8.26513 10.6151 8.03335 9.79851 8.44233 9.17331C8.77989 8.65726 9.48485 8.4748 10.0695 8.7521ZM11.0439 13.6033C11.1262 13.6413 11.1934 13.6828 11.1933 13.6956C11.1933 13.7083 11.1081 13.7709 11.004 13.8347C10.7641 13.9816 10.4656 14.302 10.3467 14.5402C10.0685 15.0973 10.0706 15.667 10.3528 16.2278C10.4868 16.4939 10.9085 16.8973 11.1828 17.0216L11.405 17.1224V18.4459V19.7694H9.50097H7.59695L7.59712 18.4464L7.59725 17.1235L7.8721 16.9857C8.61513 16.6132 9.02145 15.7232 8.80621 14.9394C8.67814 14.473 8.36469 14.0474 7.994 13.8368C7.89199 13.7789 7.80851 13.7181 7.80851 13.7018C7.80851 13.6854 7.87041 13.6422 7.94602 13.6057C8.06403 13.5488 8.2829 13.539 9.48895 13.5368C10.7232 13.5345 10.9126 13.5426 11.0439 13.6033ZM3.51389 16.5806C4.23924 16.9312 5.08936 17.1541 5.91507 17.2102L6.32761 17.2382V18.5038V19.7694H4.42359H2.51957V17.8814V15.9935L2.82633 16.195C2.99503 16.3058 3.30445 16.4793 3.51389 16.5806ZM16.4824 17.8824V19.7694H14.5783H12.6743V18.5038V17.2382L13.0869 17.2102C13.6072 17.1749 14.2357 17.0525 14.7264 16.8911C15.1817 16.7413 15.9188 16.384 16.2339 16.1604C16.3589 16.0717 16.466 15.9982 16.4718 15.9972C16.4776 15.9962 16.4824 16.8446 16.4824 17.8824Z"
                                      fill="#7B838A"
                                    />
                                  </svg>
                                  <p className="mb-0 mt-3">Parent</p>
                                </div>
                              </div>
                            </label>
                          </div>
                          <div className="col-lg-4 col-sm-6 pe-0 soc-icon-main">
                            <label className="cust-chk-bx p-0">
                              <input
                                type="radio"
                                name="sign-up-as"
                                value="fan"
                                onChange={(e) => {
                                  setDefineSignupRole(e.target.value);
                                }}
                              />
                              <div className="cust-chkbox">
                                <div className="text-center">
                                  <svg
                                    width="23"
                                    height="20"
                                    viewBox="0 0 23 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M3.17785 2.84454C1.27405 4.74835 1.27405 7.83503 3.17785 9.73883L11.5001 18.061L19.8221 9.73883C21.726 7.83503 21.726 4.74835 19.8221 2.84454C17.9183 0.940735 14.8317 0.940736 12.9279 2.84454L11.5001 4.27245L10.0721 2.84454C8.16834 0.940736 5.08166 0.940736 3.17785 2.84454Z"
                                      stroke="#7B838A"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <p className="mb-0 mt-3">FAN</p>
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12 mx-auto my-3">
                        <button
                          className="comn-btn-class w-100"
                          type="button"
                          onClick={() => handleRoleChange()}
                        >
                          CONTINUE
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-6 d-md-block d-none position-relative">
                  <div className="main-poster">
                    <img src={ArchyMan} className="img-fluid archery-img" alt="archery-man" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
