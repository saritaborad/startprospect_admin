import React, { useEffect, useState } from 'react'
import MainLayout from "../Components/Layout/MainLayout";
import ProfileLayout from "../Components/ProfileLayout/MainProfileLayout";
import { Link, useLocation } from "react-router-dom";
import { Tab, Nav } from "react-bootstrap";
import { toast } from 'react-toastify';
import { FetchPostApi } from '../Api/apiServices';
import { API_Path } from '../Api/Const';
import Loader from "../Components/Loader/Loader";

export default function Request() {

    const [state, setState] = useState({ pending: false, inProgress: false, completed: false, inReview: false, cancel: false, writeReview: false });
    const [Deals, setDeals] = useState([]);
    const location = useLocation();
    const [publicOption, setPublicOption] = useState({ sizePerPage: 10, search: { DealName: "" }, page: 0, sort: "", order: "" });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDeal()
    }, [location?.pathname])

    const getDeal = async () => {
        setLoading(true)
        let data = { dealType: (location?.pathname === "/offers") ? 1 : 2, status: "", "niche": "", options: publicOption }
        let result = await FetchPostApi(API_Path.searchDeal, data);
        let allDeals = await result.json();
        if (result.status === 200) {
            // console.log(allDeals?.data, 'allDeals')
            setDeals(allDeals?.data?.data);
            setLoading(false)
        } else {
            toast.error(allDeals?.message);
            setLoading(false)
        }
    };

    const handleClick = (type) => {
        setState({
            [type]: true,
        });
    };

    return (
        <MainLayout>
            <section className="gray-bg-section">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-2 col-md-3 ">
                            <ProfileLayout />
                        </div>
                        <div className="col-xxl-10 col-md-9">
                            {loading ? (<Loader />) : (
                                state.pending === false && state.inProgress === false && state.completed === false && state.inReview === false && state.cancel === false && state.writeReview === false && (
                                    <>
                                        <div className="my-3 mt-md-0 tabs-heading-txt">
                                            <h5>Requests</h5>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <Tab.Container id="left-tabs-example" defaultActiveKey="public">
                                                    <div className="d-xl-flex align-items-center">
                                                        <div className="comn-tab-sec  position-relative">
                                                            <Nav variant="pills">
                                                                {location?.pathname === "/offers" &&
                                                                    <Nav.Item>
                                                                        <Nav.Link eventKey="public">Public</Nav.Link>
                                                                    </Nav.Item>}
                                                                {location?.pathname === "/request" && <Nav.Item>
                                                                    <Nav.Link eventKey="personal">Personal</Nav.Link>
                                                                </Nav.Item>}
                                                                {/* <Nav.Item>
                                                                <Nav.Link eventKey="draft">Draft</Nav.Link>
                                                            </Nav.Item> */}
                                                            </Nav>
                                                        </div>
                                                        <div className="d-flex ms-xl-auto">
                                                            <div className="position-relative mt-3 mt-xl-0">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6C6A81" className="bi bi-search fix-in-icon" viewBox="0 0 16 16">
                                                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                                                </svg>
                                                                <input type="input" className="form-control login-comn-input searchbar ps-5" placeholder="Search" />
                                                            </div>
                                                            <div className="ps-3 mt-3 mt-xl-0">
                                                                <bdi className="d-block position-relative">
                                                                    <select className="form-select comn-input-style ps-3 pe-5">
                                                                        <option>All</option>
                                                                        <option>Pending</option>
                                                                        <option>In Progress</option>
                                                                        <option>In Review</option>
                                                                        <option>Canceled</option>
                                                                        <option>Completed</option>
                                                                    </select>
                                                                </bdi>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Tab.Content>

                                                        <Tab.Pane eventKey="public">
                                                            <div className="row mt-3">
                                                                {Deals && Deals?.length > 0 ? Deals?.map((item, i) => {
                                                                    console.log(item, 'item')
                                                                    return (
                                                                        <div className=" col-md-6 mb-3">
                                                                            <div className="deal-personal-box-div p-3">
                                                                                <div className="d-lg-flex">
                                                                                    <div className="">
                                                                                        <div className="deal-personal-img ">
                                                                                            <img src={item?.Activities[0]?.image} alt="" />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="w-100 ps-0 ps-lg-4 mt-lg-0 mt-3">
                                                                                        <div className="deal-profile-img-class d-flex align-items-center">
                                                                                            <div className='me-2 offer-pro-charge'>
                                                                                                <img src={item?.details?.profile_img ?? require("../assets/images/battery-offer.png")} alt="" className="" />
                                                                                            </div>
                                                                                            <div className='offer-tit'>
                                                                                                <p className='mb-1'>{item?.details?.company_name}</p>
                                                                                                <span className="comn-status-class pending-class">{item?.status}</span>
                                                                                            </div>

                                                                                        </div>
                                                                                        <div className="deal-personal-detail mt-3">
                                                                                            <ul>
                                                                                                <li className="d-flex">
                                                                                                    <span>Price :</span>
                                                                                                    <bdi className="ms-auto price-txt">${item?.payment}</bdi>
                                                                                                </li>
                                                                                                <li className="d-flex">
                                                                                                    <span>Content Duration :</span>
                                                                                                    <bdi className="ms-auto">{item?.duration} days</bdi>
                                                                                                </li>
                                                                                                <li className="d-flex">
                                                                                                    <span>Deals :</span>
                                                                                                    <bdi className="ms-auto">{item?.NegotiableDeal === true ? "NegotiableDeal" : "NonNegotiableDeal"}</bdi>
                                                                                                </li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="deal-personal-box-body  d-flex flex-column">
                                                                                    <div>
                                                                                        <bdi>{item?.DealName}</bdi>
                                                                                        <p>{item?.Description}</p>
                                                                                    </div>
                                                                                    <div className="d-flex align-items-center mt-auto">
                                                                                        <span>Plateform :</span>
                                                                                        <div className="ms-auto ">
                                                                                            <div className="d-flex align-items-center w-100">
                                                                                                {item?.Activities && item?.Activities.length > 0 && item?.Activities?.map((social, i) => {
                                                                                                    return (
                                                                                                        <>
                                                                                                            {social.name == "instagram" && (
                                                                                                                <div className="deal-cust-soc">
                                                                                                                    {" "}
                                                                                                                    <img src={require("../assets/images/soc-p-1.png")} alt="insta" className="" />
                                                                                                                </div>
                                                                                                            )}
                                                                                                            {social.name == "facebook" && (
                                                                                                                <div className="deal-cust-soc">
                                                                                                                    {" "}
                                                                                                                    <img src={require("../assets/images/soc-p-4.png")} alt="fb" className="" />
                                                                                                                </div>
                                                                                                            )}
                                                                                                            {social.name == "youtube" && (
                                                                                                                <div className="deal-cust-soc">
                                                                                                                    {" "}
                                                                                                                    <img src={require("../assets/images/soc-p-5.png")} alt="youtube" className="" />
                                                                                                                </div>
                                                                                                            )}
                                                                                                            {social.name == "tiktok" && (
                                                                                                                <div className="deal-cust-soc">
                                                                                                                    {" "}
                                                                                                                    <img src={require("../assets/images/soc-p-2.png")} className="" alt="tik-tok" />
                                                                                                                </div>
                                                                                                            )}
                                                                                                            {social.name == "linkedin" && (
                                                                                                                <div className="deal-cust-soc">
                                                                                                                    {" "}
                                                                                                                    <img src={require("../assets/images/soc-p-3.png")} alt="linkedin" className="" />
                                                                                                                </div>
                                                                                                            )}
                                                                                                            {social.name == "twitter" && (
                                                                                                                <div className="deal-cust-soc">
                                                                                                                    {" "}
                                                                                                                    <img src={require("../assets/images/soc-p-6.png")} alt="discord" className="" />
                                                                                                                </div>
                                                                                                            )}
                                                                                                        </>
                                                                                                    );
                                                                                                })}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }) : 'nonono'
                                                                }
                                                            </div>
                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="personal">
                                                            <div className="row mt-3">
                                                                <div className=" col-md-6 mb-3 " onClick={() => handleClick("pending")}>
                                                                    <div className="deal-personal-box-div p-3">
                                                                        <div className="row">
                                                                            <div className="col-xl-4">
                                                                                <div className="deal-personal-img ">
                                                                                    <img src="../assets/images/deal-personal-img.png" alt="" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-xl-8 mt-3 mt-xl-0">
                                                                                <div className="deal-profile-img-class d-flex">
                                                                                    <img src="../assets/images/deal-personal-profile.png" alt="" />
                                                                                    <div className="ms-3">
                                                                                        <bdi>John Doe</bdi>
                                                                                        <span className="comn-status-class pending-class">Pending</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="deal-personal-detail">
                                                                                    <ul>
                                                                                        <li className="d-flex">
                                                                                            <span>Price :</span>
                                                                                            <bdi className="ms-auto price-txt">$785.00</bdi>
                                                                                        </li>
                                                                                        <li className="d-flex">
                                                                                            <span>Content Duration :</span>
                                                                                            <bdi className="ms-auto">7 days</bdi>
                                                                                        </li>
                                                                                        <li className="d-flex">
                                                                                            <span>Deals :</span>
                                                                                            <bdi className="ms-auto">Non-Negotiable</bdi>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="deal-personal-box-body">
                                                                            <p> Lorem Ipsum is simply dummy text of lipsum te</p>
                                                                            <span>when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only f...</span>
                                                                            <div className="d-flex mt-2">
                                                                                <span>Plateform :</span>
                                                                                <span className="ms-auto">
                                                                                    <img src="./assets/images/available social icon.png" alt="" />
                                                                                </span>
                                                                                <div className="d-flex mt-2">
                                                                                    <span>Plateform :</span>
                                                                                    <span className="ms-auto">
                                                                                        <img
                                                                                            src="./assets/images/available-social-icon.png"
                                                                                            alt=""
                                                                                        />
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className=" col-md-6 mb-3 " onClick={() => handleClick("inProgress")}>
                                                                    <div className="deal-personal-box-div p-3">
                                                                        <div className="row">
                                                                            <div className="col-xl-4">
                                                                                <div className="deal-personal-img ">
                                                                                    <img src="../assets/images/deal-personal-img.png" alt="" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-xl-8 mt-3 mt-xl-0">
                                                                                <div className="deal-profile-img-class d-flex">
                                                                                    <img src="../assets/images/deal-personal-profile.png" alt="" />
                                                                                    <div className="ms-3">
                                                                                        <bdi>John Doe</bdi>
                                                                                        <span className="comn-status-class inprogress-class">In progress</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="deal-personal-detail">
                                                                                    <ul>
                                                                                        <li className="d-flex">
                                                                                            <span>Price :</span>
                                                                                            <bdi className="ms-auto price-txt">$785.00</bdi>
                                                                                        </li>
                                                                                        <li className="d-flex">
                                                                                            <span>Content Duration :</span>
                                                                                            <bdi className="ms-auto">7 days</bdi>
                                                                                        </li>
                                                                                        <li className="d-flex">
                                                                                            <span>Deals :</span>
                                                                                            <bdi className="ms-auto">Non-Negotiable</bdi>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="deal-personal-box-body">
                                                                            <p> Lorem Ipsum is simply dummy text of lipsum te</p>
                                                                            <span>when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only f...</span>
                                                                            <div className="d-flex mt-2">
                                                                                <span>Plateform :</span>
                                                                                <span className="ms-auto">
                                                                                    <img src="./assets/images/available social icon.png" alt="" />
                                                                                </span>
                                                                                <div className="d-flex mt-2">
                                                                                    <span>Plateform :</span>
                                                                                    <span className="ms-auto">
                                                                                        <img
                                                                                            src="./assets/images/available-social-icon.png"
                                                                                            alt=""
                                                                                        />
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className=" col-md-6 mb-3 " onClick={() => handleClick("inReview")}>
                                                                    <div className="deal-personal-box-div p-3">
                                                                        <div className="row">
                                                                            <div className="col-xl-4">
                                                                                <div className="deal-personal-img ">
                                                                                    <img src="../assets/images/deal-personal-img.png" alt="" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-xl-8 mt-3 mt-xl-0">
                                                                                <div className="deal-profile-img-class d-flex">
                                                                                    <img src="../assets/images/deal-personal-profile.png" alt="" />
                                                                                    <div className="ms-3">
                                                                                        <bdi>John Doe</bdi>
                                                                                        <span className="comn-status-class review-class">In Review</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="deal-personal-detail">
                                                                                    <ul>
                                                                                        <li className="d-flex">
                                                                                            <span>Price :</span>
                                                                                            <bdi className="ms-auto price-txt">$785.00</bdi>
                                                                                        </li>
                                                                                        <li className="d-flex">
                                                                                            <span>Content Duration :</span>
                                                                                            <bdi className="ms-auto">7 days</bdi>
                                                                                        </li>
                                                                                        <li className="d-flex">
                                                                                            <span>Deals :</span>
                                                                                            <bdi className="ms-auto">Non-Negotiable</bdi>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="deal-personal-box-body">
                                                                            <p> Lorem Ipsum is simply dummy text of lipsum te</p>
                                                                            <span>when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only f...</span>
                                                                            <div className="d-flex mt-2">
                                                                                <span>Plateform :</span>
                                                                                <span className="ms-auto">
                                                                                    <img src="./assets/images/available social icon.png" alt="" />
                                                                                </span>
                                                                                <div className="d-flex mt-2">
                                                                                    <span>Plateform :</span>
                                                                                    <span className="ms-auto">
                                                                                        <img
                                                                                            src="./assets/images/available-social-icon.png"
                                                                                            alt=""
                                                                                        />
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className=" col-md-6 mb-3 " onClick={() => handleClick("completed")}>
                                                                    <div className="deal-personal-box-div p-3">
                                                                        <div className="row">
                                                                            <div className="col-xl-4">
                                                                                <div className="deal-personal-img ">
                                                                                    <img src="../assets/images/deal-personal-img.png" alt="" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-xl-8 mt-3 mt-xl-0">
                                                                                <div className="deal-profile-img-class d-flex">
                                                                                    <img src="../assets/images/deal-personal-profile.png" alt="" />
                                                                                    <div className="ms-3">
                                                                                        <bdi>John Doe</bdi>
                                                                                        <span className="comn-status-class complete-class">Completed</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="deal-personal-detail">
                                                                                    <ul>
                                                                                        <li className="d-flex">
                                                                                            <span>Price :</span>
                                                                                            <bdi className="ms-auto price-txt">$785.00</bdi>
                                                                                        </li>
                                                                                        <li className="d-flex">
                                                                                            <span>Content Duration :</span>
                                                                                            <bdi className="ms-auto">7 days</bdi>
                                                                                        </li>
                                                                                        <li className="d-flex">
                                                                                            <span>Deals :</span>
                                                                                            <bdi className="ms-auto">Non-Negotiable</bdi>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="deal-personal-box-body">
                                                                            <p> Lorem Ipsum is simply dummy text of lipsum te</p>
                                                                            <span>when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only f...</span>
                                                                            <div className="d-flex mt-2">
                                                                                <span>Plateform :</span>
                                                                                <span className="ms-auto">
                                                                                    <img src="./assets/images/available social icon.png" alt="" />
                                                                                </span>
                                                                                <div className="d-flex mt-2">
                                                                                    <span>Plateform :</span>
                                                                                    <span className="ms-auto">
                                                                                        <img
                                                                                            src="./assets/images/available-social-icon.png"
                                                                                            alt=""
                                                                                        />
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className=" col-md-6 mb-3 " onClick={() => handleClick("cancel")}>
                                                                    <div className="deal-personal-box-div p-3">
                                                                        <div className="row">
                                                                            <div className="col-xl-4">
                                                                                <div className="deal-personal-img ">
                                                                                    <img src="../assets/images/deal-personal-img.png" alt="" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-xl-8 mt-3 mt-xl-0">
                                                                                <div className="deal-profile-img-class d-flex">
                                                                                    <img src="../assets/images/deal-personal-profile.png" alt="" />
                                                                                    <div className="ms-3">
                                                                                        <bdi>John Doe</bdi>
                                                                                        <span className="comn-status-class cancel-class">Canceled</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="deal-personal-detail">
                                                                                    <ul>
                                                                                        <li className="d-flex">
                                                                                            <span>Price :</span>
                                                                                            <bdi className="ms-auto price-txt">$785.00</bdi>
                                                                                        </li>
                                                                                        <li className="d-flex">
                                                                                            <span>Content Duration :</span>
                                                                                            <bdi className="ms-auto">7 days</bdi>
                                                                                        </li>
                                                                                        <li className="d-flex">
                                                                                            <span>Deals :</span>
                                                                                            <bdi className="ms-auto">Non-Negotiable</bdi>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="deal-personal-box-body">
                                                                            <p> Lorem Ipsum is simply dummy text of lipsum te</p>
                                                                            <span>when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only f...</span>
                                                                            <div className="d-flex mt-2">
                                                                                <span>Plateform :</span>
                                                                                <span className="ms-auto">
                                                                                    <img src="./assets/images/available social icon.png" alt="" />
                                                                                </span>
                                                                                <div className="d-flex mt-2">
                                                                                    <span>Plateform :</span>
                                                                                    <span className="ms-auto">
                                                                                        <img
                                                                                            src="./assets/images/available-social-icon.png"
                                                                                            alt=""
                                                                                        />
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Tab.Pane>
                                                        {/* <Tab.Pane eventKey="draft">
                                                        <div className="row mt-3">
                                                            <div className="col-lg-6 mb-3">
                                                                <div className="tab-innr-content p-3">
                                                                    <div className="d-flex">
                                                                        <div>
                                                                            <img src="../assets/images/deal-personal-img.png" />
                                                                        </div>
                                                                        <div className="ms-3 requester-name">
                                                                            <bdi>
                                                                                John, Merily, Zeo and 2 Other
                                                                            </bdi>
                                                                            <span className="comn-status-class pending-class">
                                                                                Pending
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="req-innr-txt mt-3">
                                                                        <bdi>
                                                                            Lorem Ipsum is simply dummy text
                                                                            of the...
                                                                        </bdi>
                                                                        <p>
                                                                            when an unknown printer took a
                                                                            galley of type and scrambled it to
                                                                            make a type specimen book. It has
                                                                            survived not only f...
                                                                        </p>
                                                                    </div>
                                                                    <div className="req-activity-div">
                                                                        <div className="d-flex align-items-center">
                                                                            <span>
                                                                                Activities:
                                                                                <bdi>
                                                                                    Twitter Post, Instagram Post
                                                                                </bdi>
                                                                            </span>
                                                                            <span className="ms-2 activity-num">
                                                                                +2
                                                                            </span>
                                                                        </div>
                                                                        <div>
                                                                            <span>
                                                                                Budget :<bdi>$5000.00</bdi>
                                                                            </span>
                                                                        </div>
                                                                        <div>
                                                                            <span>
                                                                                Date : <bdi>08/12/22</bdi>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Tab.Pane> */}
                                                    </Tab.Content>
                                                </Tab.Container>
                                            </div>
                                        </div>
                                    </>
                                ))}
                            {/* // ============================================== ( Pending ) ============================================ // */}
                            {state.pending && (
                                <>
                                    <div className="my-3 mt-md-0 tabs-heading-txt d-flex align-items-center">
                                        <div>
                                            <h5 className="mb-0">Deal Details</h5>
                                            <div className="market-head-txt ">
                                                <span>
                                                    Request &gt;
                                                    <bdi> Deal Details</bdi>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ms-auto">
                                            <Link href="//make-deal">
                                                <a>
                                                    <span className="edit-btn">
                                                        <svg width="13" height="13" viewBox="0 0 19 18" fill="none" className="me-2" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0 14.25V18H3.75L14.81 6.94L11.06 3.19L0 14.25ZM2.92 16H2V15.08L11.06 6.02L11.98 6.94L2.92 16ZM17.71 2.63L15.37 0.29C15.17 0.09 14.92 0 14.66 0C14.4 0 14.15 0.1 13.96 0.29L12.13 2.12L15.88 5.87L17.71 4.04C18.1 3.65 18.1 3.02 17.71 2.63Z" fill="url(#paint0_linear_5006_22994)" />
                                                            <defs>
                                                                <linearGradient id="paint0_linear_5006_22994" x1="0.726663" y1="3.79214" x2="20.2868" y2="7.30896" gradientUnits="userSpaceOnUse">
                                                                    <stop stopColor="#6A58FB" />
                                                                    <stop offset="1" stopColor="#4599F4" />
                                                                </linearGradient>
                                                            </defs>
                                                        </svg>
                                                        Edit
                                                    </span>
                                                </a>
                                            </Link>
                                            <span className="cancel-btn ms-sm-3" onClick={() => handleClick("cancel")}>
                                                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className="me-2" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#EB5757" />
                                                </svg>
                                                Cancel
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 mt-3">
                                            <div className="tab-innr-content p-3">
                                                <div className="d-flex">
                                                    <div>
                                                        <img src="../assets/images/deal-detail-profile.png" />
                                                    </div>
                                                    <div className="ms-3 requester-name">
                                                        <bdi>John, Merily, Zeo and 2 Other</bdi>
                                                        <span className="comn-status-class pending-class">Pending</span>
                                                    </div>
                                                    <span className="ms-auto">
                                                        <img src="../assets/images/chat-icn.svg" />
                                                    </span>
                                                </div>
                                                <div className="req-innr-txt mt-3">
                                                    <bdi>Lorem Ipsum is simply dummy text of the printing simply dummy text of the printing.</bdi>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.</p>
                                                </div>
                                                <div className="req-innr-txt mt-3">
                                                    <bdi>Post Caption</bdi>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis.</p>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="d-flex deal-media-txt me-3">
                                                            <span>Media</span>
                                                            <bdi className="ms-auto">See all</bdi>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="top-trending-custom-check mb-3 d-flex">
                                                            <label className="cust-chk-bx-soc p-0">
                                                                <input type="checkbox" defaultChecked />
                                                                <span className="cust-trend-chkbox">All</span>
                                                            </label>
                                                            <label className="cust-chk-bx-soc p-0">
                                                                <input type="checkbox" />
                                                                <span className="cust-trend-chkbox">
                                                                    <img src="./assets/images/Facebook-icon.png" className="me-2" />
                                                                    Facebook
                                                                </span>
                                                            </label>
                                                            <label className="cust-chk-bx-soc p-0">
                                                                <input type="checkbox" />
                                                                <span className="cust-trend-chkbox">
                                                                    <img src="./assets/images/instagram-icon.png" className="me-2" />
                                                                    Instagram
                                                                </span>
                                                            </label>
                                                            <label className="cust-chk-bx-soc p-0">
                                                                <input type="checkbox" />
                                                                <span className="cust-trend-chkbox">
                                                                    <img src="./assets/images/twitter-icon.png" className="me-2" />
                                                                    Twitter
                                                                </span>
                                                            </label>
                                                            <label className="cust-chk-bx-soc p-0">
                                                                <input type="checkbox" />
                                                                <span className="cust-trend-chkbox">
                                                                    <img src="./assets/images/Tik-Tok-icon.png" className="me-2" />
                                                                    Tik Tok
                                                                </span>
                                                            </label>
                                                            <label className="cust-chk-bx-soc p-0">
                                                                <input type="checkbox" />
                                                                <span className="cust-trend-chkbox">
                                                                    <img src="./assets/images/other-social-icon.svg" className="me-2" />
                                                                    Others
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-12 mb-3">
                                                        <div className="d-flex deal-media-txt mb-3 me-3">
                                                            <span>Facebook</span>
                                                            <bdi className="ms-auto">
                                                                <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M1.66699 15.6673L1.66699 16.834C1.66699 18.767 3.234 20.334 5.16699 20.334L16.8337 20.334C18.7667 20.334 20.3337 18.767 20.3337 16.834L20.3337 15.6673M15.667 11.0006L11.0003 15.6673M11.0003 15.6673L6.33366 11.0007M11.0003 15.6673L11.0003 1.66732" stroke="#111827" strokeWidth="2.32044" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </bdi>
                                                        </div>
                                                        <div className="d-flex deal-budget-txt me-3">
                                                            <span>Fulfilment</span>
                                                            <bdi className="ms-auto">13/02/2022 @2:00pm</bdi>
                                                        </div>
                                                        <div className="d-flex deal-budget-txt me-3">
                                                            <span>Budget</span>
                                                            <bdi className="ms-auto">$5000.00</bdi>
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media1.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media2.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media3.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media1.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media2.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media3.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media3.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            {/* // ============================================== ( in progress ) ============================================ // */}
                            {state.inProgress && (
                                <>
                                    <div className="my-3 mt-md-0 tabs-heading-txt">
                                        <h5 className="mb-0">Deal Details</h5>
                                    </div>
                                    <div className="market-head-txt">
                                        <span>
                                            Request &gt;
                                            <bdi> Deal Details</bdi>
                                        </span>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 mt-3">
                                            <div className="tab-innr-content p-3">
                                                <div className="d-flex">
                                                    <div>
                                                        <img src="../assets/images/deal-detail-profile.png" />
                                                    </div>
                                                    <div className="ms-3 requester-name">
                                                        <bdi className="">To John Doe</bdi>
                                                        <span className="comn-status-class inprogress-class">In Progress</span>
                                                    </div>
                                                    <span className="ms-auto">
                                                        <img src="../assets/images/chat-icn.svg" />
                                                    </span>
                                                </div>
                                                <div className="req-innr-txt mt-3">
                                                    <bdi>Lorem Ipsum is simply dummy text of the printing simply dummy text of the printing.</bdi>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.</p>
                                                </div>
                                                <div className="req-innr-txt mt-3">
                                                    <bdi>Post Caption</bdi>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis.</p>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="d-flex deal-media-txt me-3">
                                                            <span>Media</span>
                                                            <bdi className="ms-auto">See all</bdi>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="top-trending-custom-check mb-3 d-flex">
                                                            <label className="cust-chk-bx-soc p-0">
                                                                <input type="checkbox" defaultChecked />
                                                                <span className="cust-trend-chkbox">All</span>
                                                            </label>
                                                            <label className="cust-chk-bx-soc p-0">
                                                                <input type="checkbox" />
                                                                <span className="cust-trend-chkbox">
                                                                    <img src="./assets/images/Facebook-icon.png" className="me-2" />
                                                                    Facebook
                                                                </span>
                                                            </label>
                                                            <label className="cust-chk-bx-soc p-0">
                                                                <input type="checkbox" />
                                                                <span className="cust-trend-chkbox">
                                                                    <img src="./assets/images/instagram-icon.png" className="me-2" />
                                                                    Instagram
                                                                </span>
                                                            </label>
                                                            <label className="cust-chk-bx-soc p-0">
                                                                <input type="checkbox" />
                                                                <span className="cust-trend-chkbox">
                                                                    <img src="./assets/images/twitter-icon.png" className="me-2" />
                                                                    Twitter
                                                                </span>
                                                            </label>
                                                            <label className="cust-chk-bx-soc p-0">
                                                                <input type="checkbox" />
                                                                <span className="cust-trend-chkbox">
                                                                    <img src="./assets/images/Tik-Tok-icon.png" className="me-2" />
                                                                    Tik Tok
                                                                </span>
                                                            </label>
                                                            <label className="cust-chk-bx-soc p-0">
                                                                <input type="checkbox" />
                                                                <span className="cust-trend-chkbox">
                                                                    <img src="./assets/images/other-social-icon.svg" className="me-2" />
                                                                    Others
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12 mb-3">
                                                        <div className="d-flex deal-media-txt mb-3 me-3">
                                                            <span>Facebook</span>
                                                            <bdi className="ms-auto">
                                                                <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M1.66699 15.6673L1.66699 16.834C1.66699 18.767 3.234 20.334 5.16699 20.334L16.8337 20.334C18.7667 20.334 20.3337 18.767 20.3337 16.834L20.3337 15.6673M15.667 11.0006L11.0003 15.6673M11.0003 15.6673L6.33366 11.0007M11.0003 15.6673L11.0003 1.66732" stroke="#111827" strokeWidth="2.32044" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </bdi>
                                                        </div>
                                                        <div className="d-flex deal-budget-txt me-3">
                                                            <span>Fulfilment</span>
                                                            <bdi className="ms-auto">13/02/2022 @2:00pm</bdi>
                                                        </div>
                                                        <div className="d-flex deal-budget-txt me-3">
                                                            <span>Budget</span>
                                                            <bdi className="ms-auto">$5000.00</bdi>
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media1.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media2.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media3.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media1.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media2.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media3.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media3.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-xl-3 col-sm-4 mt-3">
                                                        <button className="comn-btn-class mt-3" onClick={() => handleClick("inReview")}>
                                                            Complete Deal
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            {/* // ============================================== ( choose file ) ============================================ // */}
                            <div className="my-3 mt-md-0 tabs-heading-txt">
                                <h5 className="mb-0">Deal Details</h5>
                            </div>
                            <div className="market-head-txt">
                                <span>
                                    Request &gt; Deal Details &gt;
                                    <bdi>Add More Info</bdi>
                                </span>
                            </div>
                            <div className="row">
                                <div className="col-12 mt-3">
                                    <div className="tab-innr-content p-3">
                                        <div className="make-a-deal-top-title">
                                            <label className='comn-label-class'>Additional Detail</label>
                                        </div>
                                        <textarea
                                            className="ps-3 comn-input-style  form-control h-auto"
                                            rows={7}
                                            placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                                        />
                                        <div className="make-a-deal-top-title mt-3">
                                            <label className='comn-label-class'>Additional Media</label>
                                        </div>
                                        <div className="upload-img-comn-cust">
                                            <label
                                                htmlFor="upload-img"
                                                className="w-100"
                                            >
                                                <div className="mt-3 d-flex align-items-center justify-content-center flex-column ">
                                                    <img src="../assets/images/cloud-upload1.png" />
                                                    <p className="m-0">
                                                        Upload Media
                                                    </p>
                                                    <span
                                                        className="comn-white-btn mt-3 mb-3 w-auto"
                                                        data="Choose File"
                                                    ></span>
                                                </div>
                                                <input
                                                    type="file"
                                                    id="upload-img"
                                                    name="upload-img"
                                                    hidden
                                                />
                                            </label>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="d-flex mt-3">
                                                    <button className="comn-btn-class mt-3 me-2">
                                                        ADD
                                                    </button>
                                                    <button
                                                        className="comn-white-btn mt-3 ms-2"
                                                        data="Cancel"
                                                    ></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* // ============================================== ( In Review ) ============================================ // */}
                            {state.inReview && (
                                <>
                                    <div className="my-3 mt-md-0 tabs-heading-txt">
                                        <h5 className="mb-0">Deal Details</h5>
                                    </div>
                                    <div className="market-head-txt">
                                        <span>
                                            Request &gt;
                                            <bdi> Deal Details</bdi>
                                        </span>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 mt-3">
                                            <div className="tab-innr-content p-3">
                                                <div className="d-flex">
                                                    <div>
                                                        <img src="../assets/images/deal-detail-profile.png" />
                                                    </div>
                                                    <div className="ms-3 requester-name">
                                                        <bdi className="">To John Doe</bdi>
                                                        <span className="comn-status-class review-class">In Review</span>
                                                    </div>
                                                    <span className="ms-auto">
                                                        <img src="../assets/images/chat-icn.svg" />
                                                    </span>
                                                </div>
                                                <div className="req-innr-txt mt-3">
                                                    <bdi>Lorem Ipsum is simply dummy text of the printing simply dummy text of the printing.</bdi>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.</p>
                                                </div>
                                                <div className="req-innr-txt mt-3">
                                                    <bdi>Post Caption</bdi>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis.</p>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="d-flex deal-media-txt me-3">
                                                            <span>Media</span>
                                                            <bdi className="ms-auto">See all</bdi>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="top-trending-custom-check mb-3 d-flex">
                                                            <label className="cust-chk-bx-soc p-0">
                                                                <input type="checkbox" defaultChecked />
                                                                <span className="cust-trend-chkbox">All</span>
                                                            </label>
                                                            <label className="cust-chk-bx-soc p-0">
                                                                <input type="checkbox" />
                                                                <span className="cust-trend-chkbox">
                                                                    <img src="./assets/images/Facebook-icon.png" className="me-2" />
                                                                    Facebook
                                                                </span>
                                                            </label>
                                                            <label className="cust-chk-bx-soc p-0">
                                                                <input type="checkbox" />
                                                                <span className="cust-trend-chkbox">
                                                                    <img src="./assets/images/instagram-icon.png" className="me-2" />
                                                                    Instagram
                                                                </span>
                                                            </label>
                                                            <label className="cust-chk-bx-soc p-0">
                                                                <input type="checkbox" />
                                                                <span className="cust-trend-chkbox">
                                                                    <img src="./assets/images/twitter-icon.png" className="me-2" />
                                                                    Twitter
                                                                </span>
                                                            </label>
                                                            <label className="cust-chk-bx-soc p-0">
                                                                <input type="checkbox" />
                                                                <span className="cust-trend-chkbox">
                                                                    <img src="./assets/images/Tik-Tok-icon.png" className="me-2" />
                                                                    Tik Tok
                                                                </span>
                                                            </label>
                                                            <label className="cust-chk-bx-soc p-0">
                                                                <input type="checkbox" />
                                                                <span className="cust-trend-chkbox">
                                                                    <img src="./assets/images/other-social-icon.svg" className="me-2" />
                                                                    Others
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12 mb-3">
                                                        <div className="d-flex deal-media-txt mb-3 me-3">
                                                            <span>Facebook</span>
                                                            <bdi className="ms-auto">
                                                                <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M1.66699 15.6673L1.66699 16.834C1.66699 18.767 3.234 20.334 5.16699 20.334L16.8337 20.334C18.7667 20.334 20.3337 18.767 20.3337 16.834L20.3337 15.6673M15.667 11.0006L11.0003 15.6673M11.0003 15.6673L6.33366 11.0007M11.0003 15.6673L11.0003 1.66732" stroke="#111827" strokeWidth="2.32044" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </bdi>
                                                        </div>
                                                        <div className="d-flex deal-budget-txt me-3">
                                                            <span>Fulfilment</span>
                                                            <bdi className="ms-auto">13/02/2022 @2:00pm</bdi>
                                                        </div>
                                                        <div className="d-flex deal-budget-txt me-3">
                                                            <span>Budget</span>
                                                            <bdi className="ms-auto">$5000.00</bdi>
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media1.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media2.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media3.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media1.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media2.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media3.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media3.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-xl-3 col-sm-4 mt-3">
                                                        <button className="comn-btn-class mt-3">Complete Deal</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            {/* // ============================================== ( Completed ) ============================================ // */}
                            {state.completed && (
                                <>
                                    <div className="my-3 mt-md-0 tabs-heading-txt">
                                        <h5 className="mb-0">Deal Details</h5>
                                    </div>
                                    <div className="market-head-txt">
                                        <span>
                                            Request &gt;
                                            <bdi> Deal Details</bdi>
                                        </span>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 mt-3">
                                            <div className="tab-innr-content p-3">
                                                <div className="d-flex">
                                                    <div>
                                                        <img src="../assets/images/deal-detail-profile.png" />
                                                    </div>
                                                    <div className="ms-3 requester-name">
                                                        <bdi className="">To John Doe</bdi>
                                                        <span className="comn-status-class complete-class">Completed</span>
                                                    </div>
                                                    <span className="ms-auto">
                                                        <img src="../assets/images/chat-icn.svg" />
                                                    </span>
                                                </div>
                                                <div className="req-innr-txt mt-3">
                                                    <bdi>Lorem Ipsum is simply dummy text of the printing simply dummy text of the printing.</bdi>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.</p>
                                                </div>
                                                <div className="req-innr-txt mt-3">
                                                    <bdi>Post Caption</bdi>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis.</p>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="d-flex deal-media-txt me-3">
                                                            <span>Media</span>
                                                            <bdi className="ms-auto">See all</bdi>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="top-trending-custom-check mb-3 d-flex">
                                                            <label className="cust-chk-bx-soc p-0">
                                                                <input type="checkbox" defaultChecked />
                                                                <span className="cust-trend-chkbox">All</span>
                                                            </label>
                                                            <label className="cust-chk-bx-soc p-0">
                                                                <input type="checkbox" />
                                                                <span className="cust-trend-chkbox">
                                                                    <img src="./assets/images/Facebook-icon.png" className="me-2" />
                                                                    Facebook
                                                                </span>
                                                            </label>
                                                            <label className="cust-chk-bx-soc p-0">
                                                                <input type="checkbox" />
                                                                <span className="cust-trend-chkbox">
                                                                    <img src="./assets/images/instagram-icon.png" className="me-2" />
                                                                    Instagram
                                                                </span>
                                                            </label>
                                                            <label className="cust-chk-bx-soc p-0">
                                                                <input type="checkbox" />
                                                                <span className="cust-trend-chkbox">
                                                                    <img src="./assets/images/twitter-icon.png" className="me-2" />
                                                                    Twitter
                                                                </span>
                                                            </label>
                                                            <label className="cust-chk-bx-soc p-0">
                                                                <input type="checkbox" />
                                                                <span className="cust-trend-chkbox">
                                                                    <img src="./assets/images/Tik-Tok-icon.png" className="me-2" />
                                                                    Tik Tok
                                                                </span>
                                                            </label>
                                                            <label className="cust-chk-bx-soc p-0">
                                                                <input type="checkbox" />
                                                                <span className="cust-trend-chkbox">
                                                                    <img src="./assets/images/other-social-icon.svg" className="me-2" />
                                                                    Others
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12 mb-3">
                                                        <div className="d-flex deal-media-txt mb-3 me-3">
                                                            <span>Facebook</span>
                                                            <bdi className="ms-auto">
                                                                <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M1.66699 15.6673L1.66699 16.834C1.66699 18.767 3.234 20.334 5.16699 20.334L16.8337 20.334C18.7667 20.334 20.3337 18.767 20.3337 16.834L20.3337 15.6673M15.667 11.0006L11.0003 15.6673M11.0003 15.6673L6.33366 11.0007M11.0003 15.6673L11.0003 1.66732" stroke="#111827" strokeWidth="2.32044" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </bdi>
                                                        </div>
                                                        <div className="d-flex deal-budget-txt me-3">
                                                            <span>Fulfilment</span>
                                                            <bdi className="ms-auto">13/02/2022 @2:00pm</bdi>
                                                        </div>
                                                        <div className="d-flex deal-budget-txt me-3">
                                                            <span>Budget</span>
                                                            <bdi className="ms-auto">$5000.00</bdi>
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media1.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media2.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media3.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media1.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media2.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media3.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media3.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-xl-3 col-sm-4 mt-3">
                                                        <button className="comn-btn-class mt-3" onClick={() => handleClick("writeReview")}>
                                                            Add Review
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            {/* // ============================================== ( Write Review ) ============================================ // */}
                            {state.writeReview && (
                                <>
                                    <div className="my-3 mt-md-0 tabs-heading-txt">
                                        <h5 className="mb-0">Write Review</h5>
                                    </div>
                                    <div className="market-head-txt">
                                        <span>
                                            Request &gt; Deal Details &gt;
                                            <bdi> Write Review</bdi>
                                        </span>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 mt-3">
                                            <div className="tab-innr-content p-3">
                                                <div className="d-flex pb-3 deal-bdrbtm-class">
                                                    <div>
                                                        <img src="../assets/images/deal-detail-profile.png" />
                                                    </div>
                                                    <div className="ms-3 requester-name">
                                                        <bdi className="">To John Doe</bdi>
                                                        <p>Football • Male • 40Y/0</p>
                                                    </div>
                                                </div>
                                                <div className="req-innr-txt mt-3 pb-3 deal-bdrbtm-class">
                                                    <bdi>Give a rating</bdi>
                                                    <div>
                                                        {/* <Rating onClick={handleRating} ratingValue={rating} className="my-2" fillColor="#F2C94C" emptyColor="#828282" initialValue={0} iconsCount={5} size={25} allowHalfIcon={true} /> */}
                                                    </div>
                                                    <p className="mb-0">Please give a starts and and share your experiance with Camden</p>
                                                </div>
                                                <div className="make-a-deal-top-title mt-3">
                                                    <label>What’s your opinion?</label>
                                                </div>
                                                <div className="">
                                                    <textarea className=" ps-3 comn-input-style  form-control h-auto" rows={7} placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
                                                </div>
                                                <div className="row">
                                                    <div className="col-xl-3 col-lg-4 col-sm-4 mt-3">
                                                        <button className="comn-btn-class mt-3">Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            {/* // ============================================== ( cancel ) ============================================ // */}
                            {state.cancel && (
                                <>
                                    <div className="my-3 mt-md-0 tabs-heading-txt">
                                        <h5 className="mb-0">Deal Details</h5>
                                    </div>
                                    <div className="market-head-txt">
                                        <span>
                                            Request &gt;
                                            <bdi> Deal Details</bdi>
                                        </span>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 mt-3">
                                            <div className="tab-innr-content p-3">
                                                <div className="d-flex">
                                                    <div>
                                                        <img src="../assets/images/deal-detail-profile.png" />
                                                    </div>
                                                    <div className="ms-3 requester-name">
                                                        <bdi className="">To John Doe</bdi>
                                                        <span className="comn-status-class cancel-class">Canceled</span>
                                                    </div>
                                                </div>
                                                <div className="req-innr-txt mt-3">
                                                    <bdi>Lorem Ipsum is simply dummy text of the printing simply dummy text of the printing.</bdi>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.</p>
                                                </div>
                                                <div className="req-innr-txt mt-3">
                                                    <bdi>Post Caption</bdi>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis.</p>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="d-flex deal-media-txt me-3">
                                                            <span>Media</span>
                                                            <bdi className="ms-auto">See all</bdi>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="top-trending-custom-check mb-3 d-flex">
                                                            <label className="cust-chk-bx-soc p-0">
                                                                <input type="checkbox" defaultChecked />
                                                                <span className="cust-trend-chkbox">All</span>
                                                            </label>
                                                            <label className="cust-chk-bx-soc p-0">
                                                                <input type="checkbox" />
                                                                <span className="cust-trend-chkbox">
                                                                    <img src="./assets/images/Facebook-icon.png" className="me-2" />
                                                                    Facebook
                                                                </span>
                                                            </label>
                                                            <label className="cust-chk-bx-soc p-0">
                                                                <input type="checkbox" />
                                                                <span className="cust-trend-chkbox">
                                                                    <img src="./assets/images/instagram-icon.png" className="me-2" />
                                                                    Instagram
                                                                </span>
                                                            </label>
                                                            <label className="cust-chk-bx-soc p-0">
                                                                <input type="checkbox" />
                                                                <span className="cust-trend-chkbox">
                                                                    <img src="./assets/images/twitter-icon.png" className="me-2" />
                                                                    Twitter
                                                                </span>
                                                            </label>
                                                            <label className="cust-chk-bx-soc p-0">
                                                                <input type="checkbox" />
                                                                <span className="cust-trend-chkbox">
                                                                    <img src="./assets/images/Tik-Tok-icon.png" className="me-2" />
                                                                    Tik Tok
                                                                </span>
                                                            </label>
                                                            <label className="cust-chk-bx-soc p-0">
                                                                <input type="checkbox" />
                                                                <span className="cust-trend-chkbox">
                                                                    <img src="./assets/images/other-social-icon.svg" className="me-2" />
                                                                    Others
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12 mb-3">
                                                        <div className="d-flex deal-media-txt mb-3 me-3">
                                                            <span>Facebook</span>
                                                            <bdi className="ms-auto">
                                                                <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M1.66699 15.6673L1.66699 16.834C1.66699 18.767 3.234 20.334 5.16699 20.334L16.8337 20.334C18.7667 20.334 20.3337 18.767 20.3337 16.834L20.3337 15.6673M15.667 11.0006L11.0003 15.6673M11.0003 15.6673L6.33366 11.0007M11.0003 15.6673L11.0003 1.66732" stroke="#111827" strokeWidth="2.32044" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </bdi>
                                                        </div>
                                                        <div className="d-flex deal-budget-txt me-3">
                                                            <span>Fulfilment</span>
                                                            <bdi className="ms-auto">13/02/2022 @2:00pm</bdi>
                                                        </div>
                                                        <div className="d-flex deal-budget-txt me-3">
                                                            <span>Budget</span>
                                                            <bdi className="ms-auto">$5000.00</bdi>
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media1.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media2.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media3.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media1.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media2.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media3.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-2 req-media-div pe-0 mb-3">
                                                        <div>
                                                            <img src="../assets/images/req-media3.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-xl-3 col-lg-4 col-sm-5 mt-3">
                                                        <button className="comn-btn-class delet-btn mt-3">Delete deal request</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}
