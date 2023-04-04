import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import roleContext from "../../contexts/roleContext";
import Pro from "../../assets/images/profile-icn.svg";
import Deal from "../../assets/images/deal-icn.svg";
import Team from "../../assets/images/team-icn.svg";
import Event from "../../assets/images/event-icn.svg";
import Chat from "../../assets/images/chat-icn.svg";
import Lock from "../../assets/images/lock-icn.svg";
import Wallet from "../../assets/images/wallet-icn.svg";
import Invite from "../../assets/images/invite-icn.svg";
import Support from "../../assets/images/support-icn.svg";
import Faq from "../../assets/images/support-icn.svg";
import Logout from "../../assets/images/logout-icn.svg";

export default function Sidebar() {
    const context = useContext(roleContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [signupType, setSignupType] = useState("")

    useEffect(() => {
        setSignupType(context?.signup_type)
    }, [context?.signup_type]);

    const handleLogout = () => {
        localStorage.removeItem("strusertoken");
        navigate("/login");
    };

    return (
        <>
            <div className="sidebar-main-section">
                <div className="sidebar-main-section-inner">
                    <ul className="sidebar-main-inner-menu">
                        {signupType == 1 &&
                            <li>
                                <Link to="/business-profile">
                                    <div className={location.pathname === "/business-profile" ? "active" : ""}>
                                        <img src={Pro} alt="profile-ico" />
                                        <span>Profile</span>
                                    </div>
                                </Link>
                            </li>
                        }
                        {signupType == 2 &&
                            <li>
                                <Link to="/athlete-profile">
                                    <div className={location.pathname === "/athlete-profile" ? "active" : ""}>
                                        <img src={Pro} alt="profile-ico" />
                                        <span>Profile</span>
                                    </div>
                                </Link>
                            </li>
                        }
                        {signupType == 3 &&
                            <li>
                                <Link to="/coach-profile">
                                    <div className={location.pathname === "/coach-profile" ? "active" : ""}>
                                        <img src={Pro} alt="profile-ico" />
                                        <span>Profile</span>
                                    </div>
                                </Link>
                            </li>
                        }
                        {signupType == 4 &&
                            <li>
                                <Link to="/parent-profile">
                                    <div className={location.pathname === "/parent-profile" ? "active" : ""}>
                                        <img src={Pro} alt="profile-ico" />
                                        <span>Profile</span>
                                    </div>
                                </Link>
                            </li>
                        }
                        {signupType == 5 &&
                            <li>
                                <Link to="/fan-profile">
                                    <div className={location.pathname === "/fan-profile" ? "active" : ""}>
                                        <img src={Pro} alt="profile-ico" />
                                        <span>Profile</span>
                                    </div>
                                </Link>
                            </li>
                        }
                        {signupType == 4 &&
                            <li>
                                <Link to="/student-athlete">
                                    <div className={location.pathname === "/student-athlete" ? "active" : ""}>
                                        <img src={Pro} alt="athlete-ico" />
                                        <span>Student Athlete</span>
                                    </div>
                                </Link>
                            </li>
                        }
                        {signupType == 2 &&
                            <li>
                                <Link to="/offers">
                                    <div className={location.pathname === "/offers" ? "active" : ""}>
                                        <img src={Deal} alt="offer-ico" />
                                        <span>Offers</span>
                                    </div>
                                </Link>
                            </li>
                        }
                        {(signupType == 1 || signupType == 2) &&
                            <li>
                                <Link to="/request">
                                    <div className={location.pathname === "/request" ? "active" : ""}>
                                        <img src={Deal} alt="request-ico" />
                                        <span>Request</span>
                                    </div>
                                </Link>
                            </li>
                        }
                        {(signupType === 3 || signupType === 1) &&
                            <li>
                                <Link to="/deal">
                                    <div className={location.pathname === "/deal" ? "active" : ""}>
                                        <img src={Deal} alt="deal-ico" />
                                        <span>Deals</span>
                                    </div>
                                </Link>
                            </li>
                        }
                        {(signupType == 2 || signupType == 3) &&
                            <li>
                                <Link to="/team">
                                    <div className={location.pathname === "/team" ? "active" : ""}>
                                        <img src={Team} alt="team-ico" />
                                        <span>Team</span>
                                    </div>
                                </Link>
                            </li>
                        }
                        {(signupType == 2 || signupType == 3) &&
                            <li>
                                <Link to="/event">
                                    <div className={location.pathname === "/event" ? "active" : ""}>
                                        <img src={Event} alt="event-ico" />
                                        <span>Events</span>
                                    </div>
                                </Link>
                            </li>
                        }
                        <li>
                            <Link to="/chat">
                                <div className={location.pathname === "/chat" ? "active" : ""}>
                                    <img src={Chat} alt="chat-ico" />
                                    <span>Chat</span>
                                </div>
                            </Link>
                        </li>
                        {signupType !== 2 &&
                            <li>
                                <Link to="/change-password">
                                    <div className={location.pathname === "/change-password" ? "active" : ""}>
                                        <img src={Lock} alt="change-pass-ico" />
                                        <span>Change Password</span>
                                    </div>
                                </Link>
                            </li>
                        }
                        {(signupType !== 4 && signupType !== 5) &&
                            <li>
                                <Link to="/wallet">
                                    <div className={location.pathname === "/wallet" ? "active" : ""}>
                                        <img src={Wallet} alt="wallet-ico" />
                                        <span>Wallet</span>
                                    </div>
                                </Link>
                            </li>
                        }
                        {(signupType !== 1 && signupType !== 2) &&
                            <li>
                                <Link to="/invite-others">
                                    <div className={location.pathname === "/invite-others" ? "active" : ""}>
                                        <img src={Invite} alt="inviteorders-ico" />
                                        <span>Invite Others</span>
                                    </div>
                                </Link>
                            </li>
                        }
                        {signupType !== 2 &&
                            <li>
                                <Link to="/help-support">
                                    <div className={location.pathname === "/help-support" ? "active" : ""}>
                                        <img src={Support} alt="support-ico" />
                                        <span>Help and Support</span>
                                    </div>
                                </Link>
                            </li>
                        }
                        {signupType !== 2 &&
                            <li>
                                <Link to="/faq">
                                    <div className={location.pathname === "/faq" ? "active" : ""}>
                                        <img src={Faq} alt="faq-ico" />
                                        <span>FAQ</span>
                                    </div>
                                </Link>
                            </li>
                        }
                        <li onClick={() => handleLogout()}>
                            <div className="d-flex align-items-center">
                                <img src={Logout} alt="logout-ico" />
                                <span>Log Out</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
