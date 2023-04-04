import React, { useEffect, useState } from "react";
import MainLayout from "../Components/Layout/MainLayout";
import ProfileLayout from "../Components/ProfileLayout/MainProfileLayout";
import { Link } from "react-router-dom";
import { Tab, Nav } from "react-bootstrap";
import { FetchPostApi } from "../Api/apiServices";
import { API_Path } from "../Api/Const";
import { toast } from "react-toastify";

export default function StudentAthlete() {

    const [inviteList, setInviteList] = useState([]);
    const [requestlist, setRequestlist] = useState([])
    const [manageAllAthlete, setManageAllAthlete] = useState([]);
    const [search, setSearch] = useState("")
    const [nav, setNav] = useState("All")
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        getAllAthlete()
    }, [])

    const getInvitelist = async (Search) => {
        let response = await FetchPostApi(API_Path.searchAthleteParent, { name: Search });
        let result = await response.json();
        if (response.status === 200) {
            setInviteList(result.data);
        } else {
            toast.error(result.message);
        }
    };

    const getRequestList = async () => {
        let response = await FetchPostApi(API_Path.reqAthleteParent);
        let result = await response.json();
        if (response.status === 200) {
            setRequestlist(result.data);
        } else {
            toast.error(result.message);
        }
    };

    const sendInvite = async (id) => {
        let response = await FetchPostApi(API_Path.inviteAthleteParent, { userid: id });
        let result = await response.json();
        if (response.status === 200) {
            getInvitelist(search);
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
    };

    const acceptRequest = async (id) => {
        let response = await FetchPostApi(API_Path.reqAccept, { _id: id });
        let result = await response.json();
        if (response.status === 200) {
            getRequestList();
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
    };

    const declineRequest = async (id) => {
        let response = await FetchPostApi(API_Path.reqDecline, { _id: id });
        let result = await response.json();
        if (response.status === 200) {
            getRequestList();
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
    };

    const getAllAthlete = async () => {
        let response = await FetchPostApi(API_Path.manageAthlete);
        let result = await response.json();
        if (response.status === 200) {
            setManageAllAthlete(result.data);
        } else {
            toast.error(result.message);
        }
    };

    const handleTabChange = async (e) => {
        if (e === "invite") {
            setNav("Invite");
            getInvitelist(search);
        }
        else if (e === "request") {
            setNav("Request");
            getRequestList();
        }
        else if (e === "all") {
            setNav("All");
            getAllAthlete();
        }
    };

    const inputChangedInvite = (e) => {
        setSearch(e.target.value);
        clearTimeout(timer);
        const newTimer = setTimeout(() => {
            getInvitelist(e.target.value);
        }, 1000);
        setTimer(newTimer);
    };

    return (
        <MainLayout>
            <section className="gray-bg-section">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-2 col-md-3 pe-0">
                            <ProfileLayout />
                        </div>
                        <div className="col-xxl-10 col-md-9">
                            <div className="row">
                                <div className="col-12">
                                    <div className="mt-3 mt-md-0 tabs-heading-txt">
                                        <h5 className="mb-0">Student Athelete</h5>
                                    </div>
                                    <div className="market-head-txt">
                                        <span>
                                            Student Athelete &gt;
                                            <bdi>{nav}</bdi>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 mt-3">
                                    <Tab.Container id="left-tabs-example" defaultActiveKey="all" onSelect={(e) => handleTabChange(e)}>
                                        <div className="comn-tab-sec  position-relative">
                                            <Nav variant="pills">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="all">All</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="invite">Invite</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="request">Request</Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </div>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="all">
                                                <div className="row">
                                                    <div className="col-12 mt-3">
                                                        <div className="team-staff-div">
                                                            <div className="row">
                                                                {/* <div className="col-2 mb-3 team-col-class">
                                                                    <div className="team-staff-box">
                                                                        <div className="mb-2">
                                                                            <img src="../assets/images/staff-img.png" alt="" />
                                                                        </div>
                                                                        <p className="mb-0 mt-auto">John Doe</p>
                                                                        <Link to="/student-profile">
                                                                            
                                                                                <bdi className="stud-manage-txt">Manage Profile &gt;</bdi>
                                                                          
                                                                        </Link>
                                                                    </div>
                                                                </div> */}
                                                                {manageAllAthlete?.length > 0 && manageAllAthlete.map((item, i) => {
                                                                    return (
                                                                        <div className="col-2 mb-3 team-col-class" key={i}>
                                                                            <div className="team-staff-box">
                                                                                <div className="mb-2">
                                                                                    <img src={item.athleteId.profile_img ?? "../assets/images/defaultProPic.png"} alt="" />
                                                                                </div>
                                                                                <p className="mb-0 mt-auto">{item.athleteId.name}</p>
                                                                                <Link to="/student-profile">
                                                                                   
                                                                                        <bdi className="stud-manage-txt">Manage &gt;</bdi>
                                                                                   
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="invite">
                                                <div className="row">
                                                    <div className="d-sm-flex align-items-center">
                                                        <div className="position-relative ms-sm-auto">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6C6A81" className="bi bi-search fix-in-icon" viewBox="0 0 16 16">
                                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                                            </svg>
                                                            <input type="Search" className="form-control login-comn-input searchbar ps-5" placeholder="Search" value={search} onChange={(e) => inputChangedInvite(e)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 mt-3">
                                                        <div className="team-staff-div">
                                                            <div className="row">
                                                                {/* <div className="col-2 mb-3 team-col-class">
                                                                    <div className="team-staff-box">
                                                                        <div className="mb-2">
                                                                            <img src="../assets/images/staff-img.png" />
                                                                        </div>
                                                                        <p className="mb-0 mt-auto">John Doe</p>
                                                                        <span className="comn-status-class invite-txt">Invited</span>
                                                                        <span className="comn-status-class accepted-txt">Accepted</span>
                                                                        <span className="comn-status-class declined-txt">Declined</span>
                                                                    </div>
                                                                </div> */}
                                                                {inviteList?.length > 0 && inviteList.map((item, i) => {
                                                                    return (
                                                                        <div className="col-2 mb-3 team-col-class" key={i}>
                                                                            <div className="team-staff-box">
                                                                                <div className="mb-2 ">
                                                                                    <img src={item.profile_img ?? "../assets/images/defaultProPic.png"} alt="" />
                                                                                </div>
                                                                                {item.name ? <p className="mb-0 mt-auto">{item.name}</p> : <p>&nbsp;</p>}
                                                                                {item.univercity ? <span>{item.univercity}</span> : <span>&nbsp;</span>}
                                                                                <button type="button" className="comn-white-btn mt-xxl-0 ms-xxl-2" data="Invite" onClick={() => sendInvite(item._id)}></button>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="request">
                                                <div className="row mt-3">
                                                    {/* <div className="col-2 mb-3 team-col-class">
                                                        <div className="team-staff-box">
                                                            <div className="mb-2">
                                                                <img src="../assets/images/staff-img.png" />
                                                            </div>
                                                            <div className="my-auto">
                                                                <p className="mb-0">John Doe</p>
                                                                <span className="comn-status-class declined-txt">Declined</span>
                                                                <span className="comn-status-class accepted-txt">Accepted</span>
                                                                <span className="comn-status-class invited-txt">Invited</span>
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                    {requestlist?.length > 0 && requestlist.map((item, i) => {
                                                        return (
                                                            <div className="col-2 mb-3 team-col-class" key={i}>
                                                                <div className="student-req-main text-center p-3 ">
                                                                    <div className="mb-2 ">
                                                                        <img src={item.athleteId.profile_img ?? "../assets/images/defaultProPic.png"} alt="" className="review_profile_img" />
                                                                    </div>
                                                                    <div className="my-auto">
                                                                        {item.athleteId.name ? <p className="mb-2">{item.athleteId.name}</p> : <p>&nbsp;</p>}
                                                                        {item.athleteId.univercity ? <span>{item.athleteId.univercity}</span> : <span>&nbsp;</span>}
                                                                        <div className="d-xxl-flex">
                                                                            <button className="comn-declined-btn me-xxl-2" onClick={() => declineRequest(item._id)}>Decline</button>
                                                                            <button className="comn-white-btn mt-3 mt-xxl-0 ms-xxl-2" data="Accept" onClick={() => acceptRequest(item._id)}></button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Tab.Container>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}
