import React from "react";
import { Link, useLocation } from "react-router-dom";
import Pro from "../../assets/images/profile-icn.svg";
import Deal from "../../assets/images/deal-icn.svg";
import Team from "../../assets/images/team-icn.svg";
import Event from "../../assets/images/event-icn.svg";
import Wallet from "../../assets/images/wallet-icn.svg";
import Logout from "../../assets/images/logout-icn.svg";

export default function StudentSidebar() {
    const location = useLocation();

    return (
        <>
            <div className="sidebar-main-section">
                <div className="sidebar-main-section-inner">
                    <ul className="sidebar-main-inner-menu">
                        <li>
                            {/* <Link to="/student-profile"> */}
                                <div className={location.pathname === "/student-profile" ? "active" : ""}>
                                    <img src={Pro} alt="athlete-ico" />
                                    <span>John Doe</span>
                                </div>
                            {/* </Link> */}
                        </li>
                        <li>
                            <Link to="/student-profile">
                                <div className={location.pathname === "/student-profile" ? "active" : ""}>
                                    <img src={Pro} alt="athlete-ico" />
                                    <span>Profile</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="">
                                <div className={location.pathname === "/offers" ? "active" : ""}>
                                    <img src={Deal} alt="offer-ico" />
                                    <span>Offers</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/request">
                                <div className={location.pathname === "/request" ? "active" : ""}>
                                    <img src={Deal} alt="request-ico" />
                                    <span>Request</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/team">
                                <div className={location.pathname === "/team" ? "active" : ""}>
                                    <img src={Team} alt="team-ico" />
                                    <span>Team</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/event">
                                <div className={location.pathname === "/event" ? "active" : ""}>
                                    <img src={Event} alt="event-ico" />
                                    <span>Events</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/wallet">
                                <div className={location.pathname === "/wallet" ? "active" : ""}>
                                    <img src={Wallet} alt="wallet-ico" />
                                    <span>Wallet</span>
                                </div>
                            </Link>
                        </li>
                        <li>
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
