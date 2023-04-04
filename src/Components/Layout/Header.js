import React, { useContext, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import roleContext from "../../contexts/roleContext";
import Logo from "../../assets/images/logo.png";
import Pro from "../../assets/images/profile-icn.svg";
import Fav from "../../assets/images/favorite-icn.svg";
import Save from "../../assets/images/save-icn.svg";
import Noti from "../../assets/images/notification-icn.svg";
import Logout from "../../assets/images/logout-icn.svg";
import { websiteLink } from "../../Api/Const";

export default function Header() {
  const context = useContext(roleContext);
  const navigate = useNavigate();
  const [signupType, setSignupType] = useState("");
  const [profilePicture, setprofilePicture] = useState("");

  useEffect(() => {
    setSignupType(context.signup_type);
    setprofilePicture(context.profilePicture);
  }, [context.signup_type, context.profilePicture]);

  const addactiveclass = () => {
    document.getElementById("menu-box").classList.toggle("active");
    document.getElementById("menu-icon").classList.toggle("active");
  };

  const handleLogout = () => {
    localStorage.removeItem("strusertoken");
    navigate("/login");
  };

  const handleNavigate = () => {
    switch (signupType) {
      case 1:
        navigate("/business-profile");
        break;
      case 2:
        navigate("/athlete-profile");
        break;
      case 3:
        navigate("/coach-profile");
        break;
      case 4:
        navigate("/parent-profile");
        break;
      case 5:
        navigate("/fan-profile");
        break;
    }
  };

  return (
    <header className="main-header-section">
      <div className="main-header-row">
        <div className="container">
          <div className="row m-0">
            <div className="col-12 p-0">
              <div className="header-class">
                <div className="me-auto header-logo-left text-start">
                  <Link to="/latest" className="d-block">
                    <img src={Logo} className="img-fluid logo" alt="Starprospect" />
                  </Link>
                </div>
                <div className="header-options mx-auto" id="menu-box">
                  <ul>
                    <li>
                      <Link to="/latest">
                        <span>Home</span>
                      </Link>
                    </li>
                    <li>
                      <Link href={`${websiteLink}about-us`} target="_blank">
                        <span>About Us</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/nilmarketplace">
                        <span>Nil Marketplace</span>
                      </Link>
                    </li>
                    <li>
                      <Link href={`${websiteLink}services`} target="_blank">
                        <span>Services</span>
                      </Link>
                    </li>
                    <li>
                      <Link href={`${websiteLink}contact-us`} target="_blank">
                        <span>Contact Us</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="ms-auto">
                  <div className="header-rgt-part">
                    <ul>
                      <li className="profile-hdr-drop-class">
                        <Dropdown className="d-inline" drop="left" aria-labelledby="defaultDropdown" autoClose={true}>
                          <Dropdown.Toggle variant="transparent" id="dropdown-autoclose-true" className="border-0">
                            <div className="profile-hdr-drop">
                              <div className="profile-pic me-1">
                                <img src={profilePicture ? profilePicture : require("../../assets/images/defaultProPic.png")} alt="profile" />
                              </div>
                              <div className="profil-detail-section d-sm-block d-none ms-1 ">
                                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M1.41 0.590088L6 5.17009L10.59 0.590088L12 2.00009L6 8.00009L0 2.00009L1.41 0.590088Z" fill="white" />
                                </svg>
                              </div>
                            </div>
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="p-0">
                            <Dropdown.Item className="d-flex align-items-center" onClick={() => handleNavigate()}>
                              <div>
                                <img src={Pro} alt="pro_ico" />
                              </div>
                              <div className="ms-3">Profile</div>
                            </Dropdown.Item>
                            {signupType !== 1 && (
                              <Dropdown.Item className="d-flex align-items-center" onClick={() => navigate("/favoriteathlete")}>
                                <span>
                                  <img src={Fav} alt="fav_ico" />
                                </span>
                                <div className="ms-3">favorites</div>
                              </Dropdown.Item>
                            )}
                            {signupType !== 1 && (
                              <Dropdown.Item className="d-flex align-items-center" onClick={() => navigate("/save")}>
                                <span>
                                  <img src={Save} alt="save_ico" />
                                </span>
                                <div className="ms-3">Saved</div>
                              </Dropdown.Item>
                            )}
                            {signupType == 2 && (
                              <Dropdown.Item href="/athlete-setting" className="d-flex align-items-center">
                                <span>
                                  <img src={require("../../assets/images/setting-icon.png")} alt="setting-ico" />
                                </span>
                                <div className="ms-3">Settings</div>
                              </Dropdown.Item>
                            )}
                            <Dropdown.Item className="d-flex align-items-center position-relative mb-0" href="#/">
                              <span>
                                <img src={Noti} alt="notification_ico" />
                              </span>
                              <div className="ms-3">Notifications</div>
                              <div className="custm-toggel-switch ms-auto">
                                <div className="form-check form-switch">
                                  <input className="form-check-input mt-0" type="checkbox" id="offer-status" defaultChecked />
                                </div>
                              </div>
                            </Dropdown.Item>
                            <Dropdown.Item className="d-flex align-items-center" onClick={() => handleLogout()}>
                              <span>
                                <img src={Logout} alt="logout_ico" />
                              </span>
                              <div className="ms-3">Log Out</div>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="responsive-menu ms-3" onClick={addactiveclass}>
                  <div className="header-menu-icon">
                    <div className="menu-togle-new-class" id="menu-icon">
                      <span className="line"></span>
                      <span className="line"></span>
                      <span className="line"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
