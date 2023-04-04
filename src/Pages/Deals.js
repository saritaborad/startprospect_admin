import React, { useState, useContext } from "react";
import { Tab, Nav, Modal, Dropdown } from "react-bootstrap";
import MainLayout from "../Components/Layout/MainLayout";
import ProfileLayout from "../Components/ProfileLayout/MainProfileLayout";
import { FetchPostApi } from "../Api/apiServices";
import { toast } from "react-toastify";
import { useEffect } from "react";
import moment from "moment/moment";
import roleContext from "../contexts/roleContext";
import { Link, useNavigate } from "react-router-dom";
import { API_Path } from "../Api/Const";
import DefaultPro from "../assets/images/defaultProPic.png";
import SocOne from "../assets/images/soc-p-1.png";
import SocTwo from "../assets/images/soc-p-4.png";
import SocThree from "../assets/images/soc-p-5.png";
import SocFour from "../assets/images/soc-p-5.png";
import SocFive from "../assets/images/soc-p-5.png";
import SocSix from "../assets/images/soc-p-5.png";

export default function Deals() {
  const context = useContext(roleContext);
  const navigate = useNavigate();
  const [editbudget, setEditBudget] = useState(false);
  const [dealState, setDealState] = useState({ pending: false, inProgress: false, completed: false, inReview: false, cancel: false, writeReview: false });
  const [totalDeal, setTotalDeal] = useState("");
  const [dealsList, setDealsList] = useState([]);
  const [oneDealData, setOneDealData] = useState("");
  const [loadData, setLoadData] = useState(6);
  const [loader, setLoader] = useState(false);
  const [flag, setFlag] = useState(true);
  const [dealDtlsShow, setdealDtlsShow] = useState(false);
  const [socialName, setSocialName] = useState([]);
  const [socialMediaName, setSocialMediaName] = useState([]);
  const [searcName, setSearcName] = useState("");
  const [tab, setTab] = useState(1);
  const [status, setStatus] = useState("");
  const [profileData, setProfileData] = useState([]);
  const [oneDealId, setOneDealId] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [opinian, setOpinian] = useState("");
  const [selectedDeal, setselectedDeal] = useState();
  const [signupType, setSignupType] = useState(null);

  useEffect(() => {
    setSignupType(context?.signup_type);
  }, [context?.signup_type]);

  useEffect(() => {
    setProfileData(context.profiledata);
  }, [context.profiledata]);

  useEffect(() => {
    getDeals();
  }, [searcName, status, tab]);

  const handleDealClick = (type) => {
    setDealState({ [type]: true });
  };

  const getDeals = async (e) => {
    setLoader(true);
    let data = {
      searchfield: tab,
      DealName: searcName ? searcName : "",
      status: status ? status : "",
      page: 1,
      limit: loadData,
    };
    let result = await FetchPostApi(API_Path.getDeal, data);
    let res = await result.json();
    setLoader(false);
    setFlag(false);
    if (result.status === 200) {
      setDealsList(res.data.deal);
      setTotalDeal(res.data.totalDeal);
    } else {
      toast.error(res.message);
    }
  };

  const handleChangeTab = (e) => {
    setTab(e);
    setLoadData(6);
    setFlag(true);
    setdealDtlsShow(false);
    // getDeals(e);
  };

  const viewMoreData = () => {
    setLoadData((prev) => prev + 6);
  };

  const showOneDealDtls = (id) => {
    setdealDtlsShow(true);
    getOneDeals(id);
    setOneDealId(id);
  };

  const getOneDeals = async (e) => {
    setLoader(true);
    let data = {
      dealid: e,
    };
    let result = await FetchPostApi(API_Path.getSingleDeal, data);
    let res = await result.json();
    if (result.status === 200) {
      setLoader(false);
      setFlag(false);
      setSocialMediaName(res.data.Activities);
      setOneDealData(res.data);
    } else {
      toast.error(res.message);
    }
  };

  const handleChangesMediaName = (media, e) => {
    setSocialName(media);

    if (e.target.value == "all") {
      setSocialMediaName(socialName);
    }
    if (e.target.value == "facebook") {
      setSocialMediaName(socialName?.filter((item) => item.name == "facebook"));
    }
    if (e.target.value == "instagram") {
      setSocialMediaName(socialName?.filter((item) => item.name == "instagram"));
    }
    if (e.target.value == "twitter") {
      setSocialMediaName(socialName?.filter((item) => item.name == "twitter"));
    }
    if (e.target.value == "tiktok") {
      setSocialMediaName(socialName?.filter((item) => item.name == "tiktok"));
    }
    // if (e.target.value == "other") {
    //   setSocialMediaName([...youtube, ...linkedin, ...discord]);
    // }
  };

  const handleGiveReview = async () => {
    if (rating != 0 && opinian != "") {
      let data = {
        deal_id: oneDealId,
        star: rating,
        opinion: opinian,
      };
      let result = await FetchPostApi(API_Path.giveDealReview, data);
      let res = await result.json();
      if (result.status === 200) {
        toast.success("Review give successfully !!!");
      } else {
        toast.error(res.message);
      }
    } else {
      toast.error("Please give rating and opinian");
    }
  };

  const handleDeleteDeal = async () => {
    let data = {
      dealid: oneDealId,
      obj: 1,
    };
    let result = await FetchPostApi(API_Path.deleteDeal, data);
    let res = await result.json();
    if (result.status === 200) {
      toast.success(res.data.message);
    } else {
      getDeals();
      toast.error(res.message);
    }
  };

  const handleCancelDeal = async () => {
    let data = {
      dealid: oneDealId,
      obj: 0,
    };
    let result = await FetchPostApi(API_Path.deleteDeal, data);
    let res = await result.json();
    if (result.status === 200) {
      toast.success(res.data.message);
    } else {
      getDeals();
      toast.error(res.message);
    }
  };

  const handleSelect = (eventKey) => {
    navigate("/make-deal", { state: { eventKey } });
  };

  return (
    <MainLayout>
      <section className="gray-bg-section">
        <div className="container">
          <div className="row me-0">
            <div className="col-xl-2 col-md-3 ">
              <ProfileLayout />
            </div>
            <div className="col-xl-10 col-md-9 pe-0">
              {dealState.pending === false && dealState.inProgress === false && dealState.inReview === false && dealState.completed === false && dealState.cancel === false && (
                <div className="row">
                  <div className="col-12">
                    <div className="d-md-flex align-items-center">
                      <div className="mb-3 mt-3 mt-lg-0 tabs-heading-txt">
                        <h5>Deals</h5>
                      </div>
                    </div>
                  </div>
                  <Tab.Container id="left-tabs-example" defaultActiveKey="1" onSelect={(e) => handleChangeTab(e)}>
                    <div className="d-xl-flex mb-3">
                      <div className="comn-tab-sec  position-relative">
                        <Nav variant="pills">
                          <Nav.Item>
                            <Nav.Link eventKey="1">Personal Deals</Nav.Link>
                          </Nav.Item>
                          {/* <Nav.Item>
														<Nav.Link eventKey="2">Public</Nav.Link>
													</Nav.Item> */}
                          <Nav.Item>
                            <Nav.Link eventKey="3">Draft</Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </div>
                      <div className="ms-xl-auto d-sm-flex mt-3 mt-xl-0">
                        <div className="position-relative mt-3 mt-md-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6C6A81" className="bi bi-search fix-in-icon" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                          </svg>
                          <input type="input" className="form-control login-comn-input searchbar ps-5" placeholder="Search" onChange={(e) => setSearcName(e.target.value)} />
                        </div>
                        <div className="mx-sm-2 mt-3 mt-md-0 text-center">
                          <select className="comn-input-select form-select m-0" onChange={(e) => setStatus(e.target.value)}>
                            <option value="">All</option>
                            <option value="pending"> Pending </option>
                            <option value="inProgress"> InProgress </option>
                            <option value="inReview"> InReview </option>
                            <option value="canceled"> Canceled </option>
                            <option value="completed"> Completed </option>
                            <option value="Payment_Process"> Payment Process </option>
                            <option value="offerClose"> OfferClose </option>
                          </select>
                        </div>
                        <div className="mt-3 mt-md-0">
                          <div className="">
                            <Dropdown variant="success" id="dropdown-basic" onSelect={handleSelect}>
                              <Dropdown.Toggle variant="transparent" id="dropdown-autoclose-true" className="comn-btn-class px-4">
                                Create Deal
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                {(signupType === 3 || signupType === 1) && <Dropdown.Item eventKey="Personal">Personal Deal</Dropdown.Item>}
                                {signupType === 1 && <Dropdown.Item eventKey="public">Public Deal</Dropdown.Item>}
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Tab.Content>
                      <Tab.Pane eventKey="1">
                        {loader && flag ? (
                          <div> Loading.... </div>
                        ) : (
                          <>
                            {dealDtlsShow ? (
                              <>
                                {loader ? (
                                  <div> Loading.... </div>
                                ) : (
                                  <>
                                    <div className="my-3 mt-md-0 tabs-heading-txt d-md-flex align-items-center">
                                      <div>
                                        <div className="d-inline-flex align-items-center detls-users-link" id="" onClick={() => setdealDtlsShow(false)}>
                                          <svg className="me-2" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.83 5L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H16V5H3.83Z" fill="#333333" />
                                          </svg>
                                          <h5 className="mb-0">Deal Details</h5>
                                        </div>
                                        <div className="market-head-txt ">
                                          <span>
                                            Deals &gt;
                                            <bdi> Deal Details</bdi>
                                          </span>
                                        </div>
                                      </div>

                                      {oneDealData?.status == "pending" && (
                                        <div className="ms-auto mt-4 mt-lg-0">
                                          <span className="edit-btn" onClick={() => setEditBudget(true)}>
                                            <svg width="16" height="16" viewBox="0 0 19 18" fill="none" className="me-2" xmlns="http://www.w3.org/2000/svg">
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
                                          <span className="cancel-btn ms-3" onClick={handleCancelDeal}>
                                            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className="me-2" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#EB5757" />
                                            </svg>
                                            Cancel
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                    <div className="row">
                                      <div className="col-12 mt-3">
                                        <div className="tab-innr-content p-3">
                                          <div className="d-flex">
                                            <div className="deal-inr-main-im-sec">
                                              <img src={oneDealData?.loginId?.profile_img ? oneDealData?.loginId?.profile_img : require("../assets/images/defaultProPic.png")} alt="" />
                                            </div>
                                            <div className="ms-3 requester-name">
                                              <bdi className="">{oneDealData?.loginId?.name}</bdi>
                                              {oneDealData?.status == "pending" && <span className="comn-status-class pending-class">{oneDealData?.status}</span>}
                                              {oneDealData?.status == "inProgress" && <span className="comn-status-class inprogress-class">{oneDealData?.status}</span>}
                                              {oneDealData?.status == "inReview" && <span className="comn-status-class review-class">{oneDealData?.status}</span>}
                                              {oneDealData?.status == "canceled" && <span className="comn-status-class cancel-class">{oneDealData?.status}</span>}
                                              {oneDealData?.status == "completed" && <span className="comn-status-class complete-class">{oneDealData?.status}</span>}
                                              {oneDealData?.status == "Payment_Process" && <span className="comn-status-class progress-class">{oneDealData?.status}</span>}
                                              {oneDealData?.status == "offerClose" && <span className="comn-status-class offerclose-class">{oneDealData?.status}</span>}
                                            </div>
                                            <span className="ms-auto">
                                              <img src="../assets/images/chat-icn.svg" alt="" />
                                            </span>
                                          </div>
                                          <div className="req-innr-txt mt-3">
                                            <bdi> {oneDealData?.DealName}.</bdi>
                                            <p> {oneDealData?.Description} </p>
                                          </div>
                                          <div className="req-innr-txt mt-3">
                                            <bdi>Post Caption</bdi>
                                            <p>{oneDealData?.postCaption}</p>
                                          </div>
                                          <div className="row">
                                            <div className="col-12">
                                              <div className="d-flex deal-media-txt me-3">
                                                <span>Media</span>
                                                {/* <bdi className="ms-auto">See all</bdi> */}
                                              </div>
                                            </div>
                                            <div className="col-12" onClick={(e) => handleChangesMediaName(oneDealData.Activities, e)}>
                                              <div className="top-trending-custom-check mb-3 d-flex">
                                                <label className="cust-chk-bx-soc p-0">
                                                  <input type="radio" value="all" name="privet" id="all" defaultChecked />
                                                  <span className="cust-trend-chkbox">All</span>
                                                </label>
                                                <label className="cust-chk-bx-soc p-0">
                                                  <input type="radio" value="facebook" id="facebook" name="privet" />
                                                  <span className="cust-trend-chkbox">
                                                    <img src="./assets/images/Facebook-icon.png" alt="" className="me-2" />
                                                    Facebook
                                                  </span>
                                                </label>
                                                <label className="cust-chk-bx-soc p-0">
                                                  <input type="radio" value="instagram" id="instagram" name="privet" />
                                                  <span className="cust-trend-chkbox">
                                                    <img src="./assets/images/instagram-icon.png" alt="" className="me-2" />
                                                    Instagram
                                                  </span>
                                                </label>
                                                <label className="cust-chk-bx-soc p-0">
                                                  <input type="radio" value="twitter" id="twitter" name="privet" />
                                                  <span className="cust-trend-chkbox">
                                                    <img src="./assets/images/twitter-icon.png" alt="" className="me-2" />
                                                    Twitter
                                                  </span>
                                                </label>
                                                <label className="cust-chk-bx-soc p-0">
                                                  <input type="radio" value="tiktok" id="tiktok" name="privet" />
                                                  <span className="cust-trend-chkbox">
                                                    <img src="./assets/images/Tik-Tok-icon.png" alt="" className="me-2" />
                                                    Tik Tok
                                                  </span>
                                                </label>
                                                {/* <label className="cust-chk-bx-soc p-0">
																								<input type="radio" value="other" name="privet"  />
																								<span className="cust-trend-chkbox">
																								<img src="./assets/images/other-social-icon.svg" alt="" className="me-2" />
																								Others
																								</span>
																							</label> */}
                                              </div>
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col-12 mb-3">
                                              {/* <div className="d-flex deal-media-txt mb-3 me-3">
																							<span>Facebook</span>
																							<bdi className="ms-auto">
																								<svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
																								<path d="M1.66699 15.6673L1.66699 16.834C1.66699 18.767 3.234 20.334 5.16699 20.334L16.8337 20.334C18.7667 20.334 20.3337 18.767 20.3337 16.834L20.3337 15.6673M15.667 11.0006L11.0003 15.6673M11.0003 15.6673L6.33366 11.0007M11.0003 15.6673L11.0003 1.66732" stroke="#111827" strokeWidth="2.32044" strokeLinecap="round" strokeLinejoin="round" />
																								</svg>
																							</bdi>
																							</div> */}
                                              <div className="d-flex deal-budget-txt me-3">
                                                <span>Fulfilment</span>
                                                <bdi className="ms-auto">{moment(oneDealData?.fulfillmentDate).format("DD/MM/YYYY @h:mm a")} </bdi>
                                              </div>
                                              <div className="d-flex deal-budget-txt me-3">
                                                <span>Budget</span>
                                                <bdi className="ms-auto">${oneDealData?.payment?.toLocaleString()}</bdi>
                                              </div>
                                            </div>
                                            {socialMediaName?.length > 0 &&
                                              socialMediaName?.map((item, i) => {
                                                return (
                                                  <>
                                                    <div className="deal-media-txt">
                                                      <span className="d-block mb-2">{item?.name}</span>
                                                      <div className="deal-dtl-in-main">
                                                        {item.image?.length > 0 &&
                                                          item.image?.map((item, i) => {
                                                            return (
                                                              <>
                                                                <div className="deal-dtl-in-itm mb-3">
                                                                  <div className="deal-img-main-dtl">
                                                                    {item.includes(".mp4") ? (
                                                                      <video width="100%" height="100%">
                                                                        <source src={item} type="video/mp4" />
                                                                      </video>
                                                                    ) : (
                                                                      <img src={item} alt="" />
                                                                    )}
                                                                  </div>
                                                                </div>
                                                              </>
                                                            );
                                                          })}
                                                      </div>
                                                    </div>
                                                  </>
                                                );
                                              })}

                                            {oneDealData?.status == "completed" && (
                                              <div className="row">
                                                <div className="col-xl-3 col-sm-4 mt-3">
                                                  <button className="comn-btn-class mt-3" onClick={() => handleDealClick("writeReview")}>
                                                    Add Review
                                                  </button>
                                                </div>
                                              </div>
                                            )}

                                            {oneDealData?.status == "canceled" && (
                                              <div className="row">
                                                <div className="col-xl-3 col-lg-4 col-sm-5 mt-3">
                                                  <button className="comn-btn-class delet-btn mt-3" onClick={handleDeleteDeal}>
                                                    Delete deal request
                                                  </button>
                                                </div>
                                              </div>
                                            )}
                                            {oneDealData?.status == "inProgress" && (
                                              <div className="row">
                                                <div className="col-xl-3 col-sm-4 mt-3">
                                                  <button className="comn-btn-class mt-3">Complete Deal</button>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </>
                            ) : (
                              <div className="row me-0">
                                {dealsList?.length > 0 ? (
                                  dealsList.map((item, i) => {
                                    return (
                                      <div className=" col-md-6 mb-3 pe-0">
                                        <div className="deal-personal-box-div p-3" onClick={() => showOneDealDtls(item._id)}>
                                          <div className="row">
                                            <div className="col-xl-4">
                                              <div className="deal-personal-img">
                                                {item?.Activities?.[0]?.image?.[0].includes(".mp4") ? (
                                                  <video width="100%" height="100%" controls>
                                                    <source src={item?.Activities?.[0]?.image?.[0]} type="video/mp4" />
                                                  </video>
                                                ) : (
                                                  <img src={item?.Activities[0]?.image[0]} alt="" />
                                                )}
                                              </div>
                                            </div>
                                            <div className="col-xl-8 mt-3 mt-xl-0">
                                              <div className="deal-profile-img-class d-flex align-items-center">
                                                <img src={item?.details?.profile_img ? item?.details?.profile_img : require("../assets/images/defaultProPic.png")} className="deal_Profile" alt="" />
                                                <div className="ms-3">
                                                  <bdi>{item?.details?.name}</bdi>
                                                  {item?.status == "pending" && <span className="comn-status-class pending-class">{item?.status}</span>}
                                                  {item?.status == "inProgress" && <span className="comn-status-class inprogress-class">{item?.status}</span>}
                                                  {item?.status == "inReview" && <span className="comn-status-class review-class">{item?.status}</span>}
                                                  {item?.status == "canceled" && <span className="comn-status-class cancel-class">{item?.status}</span>}
                                                  {item?.status == "completed" && <span className="comn-status-class complete-class">{item?.status}</span>}
                                                  {item?.status == "Payment_Process" && <span className="comn-status-class progress-class">{item?.status}</span>}
                                                  {item?.status == "offerClose" && <span className="comn-status-class offerclose-class">{item?.status}</span>}
                                                </div>
                                              </div>
                                              <div className="deal-personal-detail">
                                                <ul>
                                                  <li className="d-flex">
                                                    <span>Price :</span>
                                                    <bdi className="ms-auto price-txt">{item?.payment && "$" + item?.payment.toLocaleString()}</bdi>
                                                  </li>
                                                  <li className="d-flex">
                                                    <span>Content Duration :</span>
                                                    <bdi className="ms-auto">{item?.duration > 1 ? item?.duration + " days" : item?.duration + " day"} </bdi>
                                                  </li>
                                                  <li className="d-flex">
                                                    <span>Deals :</span>
                                                    {item.NegotiableDeal == true && <bdi className="ms-auto">Negotiable</bdi>}
                                                    {item.NonNegotiableDeal == true && <bdi className="ms-auto">Non-Negotiable</bdi>}
                                                  </li>
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="deal-personal-box-body">
                                            <p> {item?.DealName}</p>
                                            <span>{item?.Description} </span>
                                            <div className="d-flex align-items-center mt-2">
                                              <div>
                                                <span>Plateform :</span>
                                              </div>
                                              <div className="ms-auto ">
                                                <div className="d-flex align-items-center w-100">
                                                  {item?.Activities?.length > 0 &&
                                                    item?.Activities?.map((data, i) => {
                                                      return (
                                                        <>
                                                          {data.name == "instagram" && (
                                                            <div className="deal-cust-soc">
                                                              {" "}
                                                              <img src={require("../assets/images/soc-p-1.png")} alt="insta" className="" />
                                                            </div>
                                                          )}
                                                          {data.name == "facebook" && (
                                                            <div className="deal-cust-soc">
                                                              {" "}
                                                              <img src={require("../assets/images/soc-p-4.png")} alt="fb" className="" />
                                                            </div>
                                                          )}
                                                          {data.name == "youtube" && (
                                                            <div className="deal-cust-soc">
                                                              {" "}
                                                              <img src={require("../assets/images/soc-p-5.png")} alt="youtube" className="" />
                                                            </div>
                                                          )}
                                                          {data.name == "tiktok" && (
                                                            <div className="deal-cust-soc">
                                                              {" "}
                                                              <img src={require("../assets/images/soc-p-2.png")} className="" alt="tik-tok" />
                                                            </div>
                                                          )}
                                                          {data.name == "linkedin" && (
                                                            <div className="deal-cust-soc">
                                                              {" "}
                                                              <img src={require("../assets/images/soc-p-3.png")} alt="linkedin" className="" />
                                                            </div>
                                                          )}
                                                          {data.name == "twitter" && (
                                                            <div className="deal-cust-soc">
                                                              {" "}
                                                              <img src={require("../assets/images/soc-p-6.png")} alt="discord" className="" />
                                                            </div>
                                                          )}
                                                          {/* {data.name == "discord" && <img src={Discord} alt="discord" className="" />} */}
                                                        </>
                                                      );
                                                    })}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })
                                ) : (
                                  <div className="postNotFound">No Any Personal Deal Is Available</div>
                                )}

                                {totalDeal > 0 && loadData < totalDeal && (
                                  <div className="col-md-12 text-center my-3" onClick={() => viewMoreData()}>
                                    <button className="pagination-button"> {loader ? "Loading..." : "view More"}</button>
                                  </div>
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </Tab.Pane>

                      {/* <Tab.Pane eventKey="2">
												{loader && flag ? (
													<div> Loading.... </div>
												) : (
													<>
														{dealDtlsShow ? (
															<>
																{loader ? (
																	<div> Loading.... </div>
																) : (
																	<>
																		<div className="my-3 mt-md-0 tabs-heading-txt d-md-flex align-items-center">
																			<div>
																				<div className="d-inline-flex align-items-center detls-users-link" id="" onClick={() => setdealDtlsShow(false)}>
																					<svg className="me-2" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
																						<path d="M3.83 5L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H16V5H3.83Z" fill="#333333" />
																					</svg>
																					<h5 className="mb-0">Deal Details</h5>
																				</div>
																				<div className="market-head-txt ">
																					<span>
																						Deals &gt;
																						<bdi> Deal Details</bdi>
																					</span>
																				</div>
																			</div>
																			<div className="ms-auto mt-4 mt-lg-0">
																				<span className="edit-btn" onClick={() => setEditBudget(true)}>
																					<svg width="16" height="16" viewBox="0 0 19 18" fill="none" className="me-2" xmlns="http://www.w3.org/2000/svg">
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
																				<span className="cancel-btn ms-3" onClick={() => handleDealClick("cancel")}>
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
																							<img src={oneDealData?.acceptId?.profile_img ? oneDealData?.acceptId?.profile_img : require("../assets/images/defaultProPic.png")} alt="" />
																						</div>
																						<div className="ms-3 requester-name">
																							<bdi className="">{oneDealData?.acceptId?.name}</bdi>
																							{oneDealData?.status == "pending" && <span className="comn-status-class pending-class">{oneDealData?.status}</span>}
																							{oneDealData?.status == "inProgress" && <span className="comn-status-class inprogress-class">{oneDealData?.status}</span>}
																							{oneDealData?.status == "inReview" && <span className="comn-status-class review-class">{oneDealData?.status}</span>}
																							{oneDealData?.status == "canceled" && <span className="comn-status-class cancel-class">{oneDealData?.status}</span>}
																							{oneDealData?.status == "completed" && <span className="comn-status-class complete-class">{oneDealData?.status}</span>}
																							{oneDealData?.status == "Payment_Process" && <span className="comn-status-class progress-class">{oneDealData?.status}</span>}
																							{oneDealData?.status == "offerClose" && <span className="comn-status-class offerclose-class">{oneDealData?.status}</span>}
																						</div>
																						<span className="ms-auto">
																							<img src="../assets/images/chat-icn.svg" alt="" />
																						</span>
																					</div>
																					<div className="req-innr-txt mt-3">
																						<bdi> {oneDealData?.DealName}.</bdi>
																						<p> {oneDealData?.Description} </p>
																					</div>
																					<div className="req-innr-txt mt-3">
																						<bdi>Post Caption</bdi>
																						<p>{oneDealData?.postCaption}</p>
																					</div>
																					<div className="row">
																						<div className="col-12">
																							<div className="d-flex deal-media-txt me-3">
																								<span>Media</span>
																								<bdi className="ms-auto">See all</bdi>
																							</div>
																						</div>
																						<div className="col-12" onClick={(e) => handleChangesMediaName(oneDealData.Activities, e)}>
																							<div className="top-trending-custom-check mb-3 d-flex">
																								<label className="cust-chk-bx-soc p-0">
																									<input type="radio" value="all" name="privet" id="all" defaultChecked />
																									<span className="cust-trend-chkbox">All</span>
																								</label>
																								<label className="cust-chk-bx-soc p-0">
																									<input type="radio" value="facebook" id="facebook" name="privet" />
																									<span className="cust-trend-chkbox">
																										<img src="./assets/images/Facebook-icon.png" alt="" className="me-2" />
																										Facebook
																									</span>
																								</label>
																								<label className="cust-chk-bx-soc p-0">
																									<input type="radio" value="instagram" id="instagram" name="privet" />
																									<span className="cust-trend-chkbox">
																										<img src="./assets/images/instagram-icon.png" alt="" className="me-2" />
																										Instagram
																									</span>
																								</label>
																								<label className="cust-chk-bx-soc p-0">
																									<input type="radio" value="twitter" id="twitter" name="privet" />
																									<span className="cust-trend-chkbox">
																										<img src="./assets/images/twitter-icon.png" alt="" className="me-2" />
																										Twitter
																									</span>
																								</label>
																								<label className="cust-chk-bx-soc p-0">
																									<input type="radio" value="tiktok" id="tiktok" name="privet" />
																									<span className="cust-trend-chkbox">
																										<img src="./assets/images/Tik-Tok-icon.png" alt="" className="me-2" />
																										Tik Tok
																									</span>
																								</label>
																								<label className="cust-chk-bx-soc p-0">
																								<input type="radio" value="other" name="privet"  />
																								<span className="cust-trend-chkbox">
																								<img src="./assets/images/other-social-icon.svg" alt="" className="me-2" />
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
																								<bdi className="ms-auto">{moment(oneDealData?.fulfillmentDate).format("DD/MM/YYYY @h:mm a")} </bdi>
																							</div>
																							<div className="d-flex deal-budget-txt me-3">
																								<span>Budget</span>
																								<bdi className="ms-auto">${oneDealData?.payment?.toLocaleString()}</bdi>
																							</div>
																						</div>
																						{socialMediaName?.length > 0 &&
																							socialMediaName?.map((item, i) => {
																								return (
																									<>
																										<div className="deal-media-txt">
																											<span className="d-block mb-2">{item?.name}</span>
																											<div className="row">
																												{item.image?.length > 0 &&
																													item.image?.map((item, i) => {
																														return (
																															<>
																																<div className="col-2 req-media-div mb-3">
																																	<div>
																																		<img src={item} alt="" />
																																	</div>
																																</div>
																															</>
																														);
																													})}
																											</div>
																										</div>
																									</>
																								);
																							})}
																					</div>
																				</div>
																			</div>
																		</div>
																	</>
																)}
															</>
														) : (
															<div className="row me-0">
																{dealsList?.length > 0 ? (
																	dealsList.map((item, i) => {
																		return (
																			<div className=" col-md-6 mb-3 pe-0">
																				<div className="deal-personal-box-div p-3" onClick={() => showOneDealDtls(item._id)}>
																					<div className="row">
																						<div className="col-xl-4">
																							<div className="deal-personal-img">
																								<img src={item?.Activities.length > 0 ? item?.Activities[0].image[0] : require("../assets/images/defaultStrPic.png")} alt="" />
																							</div>
																						</div>
																						<div className="col-xl-8 mt-3 mt-xl-0">
																							<div className="deal-profile-img-class d-flex align-items-center">
																								<img src={item?.user_details?.profile_img ? item?.user_details?.profile_img : require("../assets/images/defaultProPic.png")} className="deal_Profile" alt="" />
																								<div className="ms-3">
																									<bdi>{item?.user_details?.name}</bdi>
																									{item?.status == "pending" && <span className="comn-status-class pending-class">{item?.status}</span>}
																									{item?.status == "inProgress" && <span className="comn-status-class inprogress-class">{item?.status}</span>}
																									{item?.status == "inReview" && <span className="comn-status-class review-class">{item?.status}</span>}
																									{item?.status == "canceled" && <span className="comn-status-class cancel-class">{item?.status}</span>}
																									{item?.status == "completed" && <span className="comn-status-class complete-class">{item?.status}</span>}
																									{item?.status == "Payment_Process" && <span className="comn-status-class progress-class">{item?.status}</span>}
																									{item?.status == "offerClose" && <span className="comn-status-class offerclose-class">{item?.status}</span>}
																								</div>
																							</div>
																							<div className="deal-personal-detail">
																								<ul>
																									<li className="d-flex">
																										<span>Price :</span>
																										<bdi className="ms-auto price-txt">{item?.payment && "$" + item?.payment.toLocaleString()}</bdi>
																									</li>
																									<li className="d-flex">
																										<span>Content Duration :</span>
																										<bdi className="ms-auto">{item?.duration > 1 ? item?.duration + " days" : item?.duration + " day"} </bdi>
																									</li>
																									<li className="d-flex">
																										<span>Deals :</span>
																										{item.NegotiableDeal == true && <bdi className="ms-auto">Negotiable</bdi>}
																										{item.NonNegotiableDeal == true && <bdi className="ms-auto">Non-Negotiable</bdi>}
																									</li>
																								</ul>
																							</div>
																						</div>
																					</div>
																					<div className="deal-personal-box-body">
																						<p> {item?.DealName}</p>
																						<span>{item?.Description} </span>
																						<div className="d-flex align-items-center mt-2">
																							<span>Plateform :</span>
																							<span className="ms-auto">
																								{item?.Activities?.length > 0 &&
																									item?.Activities?.map((data, i) => {
																										return (
																											<div className="d-flex align-items-center">
																												{data.name == "instagram" && <img src={require("../assets/images/instagramicon.png")} alt="insta" className="img-fluid social_Athlete" />}
																												{data.name == "facebook" && <img src={require("../assets/images/Facebookicon.png")} alt="fb" className="img-fluid social_Athlete" />}
																												{data.name == "tiktok" && <img src={require("../assets/images/Tik-Tok-icon.png")} className="img-fluid social_Athlete" />}
																												{data.name == "youtube" && <img src={require("../assets/images/YouTube-icon.png")} alt="youtube" className="img-fluid social_Athlete" />}
																												{data.name == "linkedin" && <img src={require("../assets/images/linkedin_icon.png")} alt="linkedin" className="img-fluid social_Athlete" />}
																												{data.name == "twitter" && <img src={require("../assets/images/Twitter-icon.png")} alt="discord" className="img-fluid social_Athlete" />}
																												{data.name == "discord" && <img alt="discord" className="img-fluid social_Athlete" />}
																											</div>
																										);
																									})}
																							</span>
																						</div>
																					</div>
																				</div>
																			</div>
																		);
																	})
																) : (
																	<div className="postNotFound">No Any Personal Deal Is Available</div>
																)}

																{totalDeal > 0 && loadData < totalDeal && (
																	<div className="col-md-12 text-center my-3" onClick={() => viewMoreData()}>
																		<button className="pagination-button"> {loader ? "Loading..." : "view More"}</button>
																	</div>
																)}
															</div>
														)}
													</>
												)}
											</Tab.Pane> */}
                      <Tab.Pane eventKey="3">
                        {loader && flag ? (
                          <div> Loading.... </div>
                        ) : (
                          <>
                            {dealDtlsShow ? (
                              <>
                                {loader ? (
                                  <div> Loading.... </div>
                                ) : (
                                  <>
                                    <div className="my-3 mt-md-0 tabs-heading-txt d-md-flex align-items-center">
                                      <div>
                                        <div className="d-inline-flex align-items-center detls-users-link" id="" onClick={() => setdealDtlsShow(false)}>
                                          <svg className="me-2" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.83 5L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H16V5H3.83Z" fill="#333333" />
                                          </svg>
                                          <h5 className="mb-0">Deal Details</h5>
                                        </div>
                                        <div className="market-head-txt ">
                                          <span>
                                            Deals &gt;
                                            <bdi> Deal Details</bdi>
                                          </span>
                                        </div>
                                      </div>
                                      <div className="ms-auto mt-4 mt-lg-0">
                                        <span className="edit-btn" onClick={() => setEditBudget(true)}>
                                          <svg width="16" height="16" viewBox="0 0 19 18" fill="none" className="me-2" xmlns="http://www.w3.org/2000/svg">
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
                                        <span className="cancel-btn ms-3" onClick={() => handleDealClick("cancel")}>
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
                                            <div className="deal-inr-main-im-sec">
                                              <img src={oneDealData?.acceptId?.profile_img ? oneDealData?.acceptId?.profile_img : require("../assets/images/defaultProPic.png")} alt="" />
                                            </div>
                                            <div className="ms-3 requester-name">
                                              <bdi className="">{oneDealData?.acceptId?.name}</bdi>
                                              {oneDealData?.status == "pending" && <span className="comn-status-class pending-class">{oneDealData?.status}</span>}
                                              {oneDealData?.status == "inProgress" && <span className="comn-status-class inprogress-class">{oneDealData?.status}</span>}
                                              {oneDealData?.status == "inReview" && <span className="comn-status-class review-class">{oneDealData?.status}</span>}
                                              {oneDealData?.status == "canceled" && <span className="comn-status-class cancel-class">{oneDealData?.status}</span>}
                                              {oneDealData?.status == "completed" && <span className="comn-status-class complete-class">{oneDealData?.status}</span>}
                                              {oneDealData?.status == "Payment_Process" && <span className="comn-status-class progress-class">{oneDealData?.status}</span>}
                                              {oneDealData?.status == "offerClose" && <span className="comn-status-class offerclose-class">{oneDealData?.status}</span>}
                                            </div>
                                            <span className="ms-auto">
                                              <img src="../assets/images/chat-icn.svg" alt="" />
                                            </span>
                                          </div>
                                          <div className="req-innr-txt mt-3">
                                            <bdi> {oneDealData?.DealName}.</bdi>
                                            <p> {oneDealData?.Description} </p>
                                          </div>
                                          <div className="req-innr-txt mt-3">
                                            <bdi>Post Caption</bdi>
                                            <p>{oneDealData?.postCaption}</p>
                                          </div>
                                          <div className="row">
                                            <div className="col-12">
                                              <div className="d-flex deal-media-txt me-3">
                                                <span>Media</span>
                                                {/* <bdi className="ms-auto">See all</bdi> */}
                                              </div>
                                            </div>
                                            <div className="col-12" onClick={(e) => handleChangesMediaName(oneDealData.Activities, e)}>
                                              <div className="top-trending-custom-check mb-3 d-flex">
                                                <label className="cust-chk-bx-soc p-0">
                                                  <input type="radio" value="all" name="privet" id="all" defaultChecked />
                                                  <span className="cust-trend-chkbox">All</span>
                                                </label>
                                                <label className="cust-chk-bx-soc p-0">
                                                  <input type="radio" value="facebook" id="facebook" name="privet" />
                                                  <span className="cust-trend-chkbox">
                                                    <img src="./assets/images/Facebook-icon.png" alt="" className="me-2" />
                                                    Facebook
                                                  </span>
                                                </label>
                                                <label className="cust-chk-bx-soc p-0">
                                                  <input type="radio" value="instagram" id="instagram" name="privet" />
                                                  <span className="cust-trend-chkbox">
                                                    <img src="./assets/images/instagram-icon.png" alt="" className="me-2" />
                                                    Instagram
                                                  </span>
                                                </label>
                                                <label className="cust-chk-bx-soc p-0">
                                                  <input type="radio" value="twitter" id="twitter" name="privet" />
                                                  <span className="cust-trend-chkbox">
                                                    <img src="./assets/images/twitter-icon.png" alt="" className="me-2" />
                                                    Twitter
                                                  </span>
                                                </label>
                                                <label className="cust-chk-bx-soc p-0">
                                                  <input type="radio" value="tiktok" id="tiktok" name="privet" />
                                                  <span className="cust-trend-chkbox">
                                                    <img src="./assets/images/Tik-Tok-icon.png" alt="" className="me-2" />
                                                    Tik Tok
                                                  </span>
                                                </label>
                                                {/* <label className="cust-chk-bx-soc p-0">
																								<input type="radio" value="other" name="privet"  />
																								<span className="cust-trend-chkbox">
																								<img src="./assets/images/other-social-icon.svg" alt="" className="me-2" />
																								Others
																								</span>
																							</label> */}
                                              </div>
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col-12 mb-3">
                                              {/* <div className="d-flex deal-media-txt mb-3 me-3">
																							<span>Facebook</span>
																							<bdi className="ms-auto">
																								<svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
																								<path d="M1.66699 15.6673L1.66699 16.834C1.66699 18.767 3.234 20.334 5.16699 20.334L16.8337 20.334C18.7667 20.334 20.3337 18.767 20.3337 16.834L20.3337 15.6673M15.667 11.0006L11.0003 15.6673M11.0003 15.6673L6.33366 11.0007M11.0003 15.6673L11.0003 1.66732" stroke="#111827" strokeWidth="2.32044" strokeLinecap="round" strokeLinejoin="round" />
																								</svg>
																							</bdi>
																							</div> */}

                                              <div className="d-flex deal-budget-txt me-3">
                                                <span>Fulfilment</span>
                                                <bdi className="ms-auto">{moment(oneDealData?.fulfillmentDate).format("DD/MM/YYYY @h:mm a")} </bdi>
                                              </div>
                                              <div className="d-flex deal-budget-txt me-3">
                                                <span>Budget</span>
                                                <bdi className="ms-auto">${oneDealData?.payment?.toLocaleString()}</bdi>
                                              </div>
                                            </div>
                                            {socialMediaName?.length > 0 &&
                                              socialMediaName?.map((item, i) => {
                                                return (
                                                  <>
                                                    <div className="deal-media-txt">
                                                      <span className="d-block mb-2">{item?.name}</span>
                                                      <div className="deal-dtl-in-main">
                                                        {item.image?.length > 0 &&
                                                          item.image?.map((item, i) => {
                                                            return (
                                                              <>
                                                                <div className="deal-dtl-in-itm mb-3">
                                                                  <div className="deal-img-main-dtl">
                                                                    <img src={item} alt="" />
                                                                  </div>
                                                                </div>
                                                              </>
                                                            );
                                                          })}
                                                      </div>
                                                    </div>
                                                  </>
                                                );
                                              })}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </>
                            ) : (
                              <div className="row me-0">
                                {dealsList?.length > 0 ? (
                                  dealsList.map((item, i) => {
                                    return (
                                      <div className=" col-md-6 mb-3 pe-0">
                                        <div className="deal-personal-box-div p-3" onClick={() => showOneDealDtls(item._id)}>
                                          <div className="row">
                                            <div className="col-xl-4">
                                              <div className="deal-personal-img">
                                                <img src={item?.Activities.length > 0 ? item?.Activities[0].image[0] : require("../assets/images/defaultStrPic.png")} alt="" />
                                              </div>
                                            </div>
                                            <div className="col-xl-8 mt-3 mt-xl-0">
                                              <div className="deal-profile-img-class d-flex align-items-center">
                                                <img src={item?.user_details?.profile_img ? item?.user_details?.profile_img : require("../assets/images/defaultProPic.png")} className="deal_Profile" alt="" />
                                                <div className="ms-3">
                                                  <bdi>{item?.user_details?.name}</bdi>
                                                  {item?.status == "pending" && <span className="comn-status-class pending-class">{item?.status}</span>}
                                                  {item?.status == "inProgress" && <span className="comn-status-class inprogress-class">{item?.status}</span>}
                                                  {item?.status == "inReview" && <span className="comn-status-class review-class">{item?.status}</span>}
                                                  {item?.status == "canceled" && <span className="comn-status-class cancel-class">{item?.status}</span>}
                                                  {item?.status == "completed" && <span className="comn-status-class complete-class">{item?.status}</span>}
                                                  {item?.status == "Payment_Process" && <span className="comn-status-class progress-class">{item?.status}</span>}
                                                  {item?.status == "offerClose" && <span className="comn-status-class offerclose-class">{item?.status}</span>}
                                                </div>
                                              </div>
                                              <div className="deal-personal-detail">
                                                <ul>
                                                  <li className="d-flex">
                                                    <span>Price :</span>
                                                    <bdi className="ms-auto price-txt">{item?.payment && "$" + item?.payment.toLocaleString()}</bdi>
                                                  </li>
                                                  <li className="d-flex">
                                                    <span>Content Duration :</span>
                                                    <bdi className="ms-auto">{item?.duration > 1 ? item?.duration + " days" : item?.duration + " day"} </bdi>
                                                  </li>
                                                  <li className="d-flex">
                                                    <span>Deals :</span>
                                                    {item.NegotiableDeal == true && <bdi className="ms-auto">Negotiable</bdi>}
                                                    {item.NonNegotiableDeal == true && <bdi className="ms-auto">Non-Negotiable</bdi>}
                                                  </li>
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="deal-personal-box-body">
                                            <p> {item?.DealName}</p>
                                            <span>{item?.Description} </span>
                                            <div className="d-flex align-items-center mt-2">
                                              <span>Plateform :</span>
                                              <span className="ms-auto">
                                                {item?.Activities?.length > 0 &&
                                                  item?.Activities?.map((data, i) => {
                                                    return (
                                                      <div className="d-flex align-items-center">
                                                        {data.name == "instagram" && <img src={require("../assets/images/instagramicon.png")} alt="insta" className="img-fluid social_Athlete" />}
                                                        {data.name == "facebook" && <img src={require("../assets/images/Facebookicon.png")} alt="fb" className="img-fluid social_Athlete" />}
                                                        {data.name == "tiktok" && <img src={require("../assets/images/Tik-Tok-icon.png")} className="img-fluid social_Athlete" />}
                                                        {data.name == "youtube" && <img src={require("../assets/images/YouTube-icon.png")} alt="youtube" className="img-fluid social_Athlete" />}
                                                        {data.name == "linkedin" && <img src={require("../assets/images/linkedin_icon.png")} alt="linkedin" className="img-fluid social_Athlete" />}
                                                        {data.name == "twitter" && <img src={require("../assets/images/Twitter-icon.png")} alt="discord" className="img-fluid social_Athlete" />}
                                                        {/* {data.name == "discord" && <img src={Discord} alt="discord" className="img-fluid social_Athlete" />} */}
                                                      </div>
                                                    );
                                                  })}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })
                                ) : (
                                  <div className="postNotFound">No Any Personal Deal Is Available</div>
                                )}

                                {totalDeal > 0 && loadData < totalDeal && (
                                  <div className="col-md-12 text-center my-3" onClick={() => viewMoreData()}>
                                    <button className="pagination-button"> {loader ? "Loading..." : "view More"}</button>
                                  </div>
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              )}

              {/* // ============================================== ( in progress ) ============================================ // */}

              {/* {dealState.inProgress && (
			<>
				<div className="my-3 mt-md-0 tabs-heading-txt">
				<h5 className="mb-0">Deal Details</h5>
				</div>
				<div className="market-head-txt">
				<span>
					Deal &gt;
					<bdi> Deal Details</bdi>
				</span>
				</div>
				<div className="row">
				<div className="col-12 mt-3">
					<div className="tab-innr-content p-3">
					<div className="d-flex">
						<div>
						<img src="../assets/images/deal-detail-profile.png" alt="" />
						</div>
						<div className="ms-3 requester-name">
						<bdi className="">To John Doe</bdi>
						<span className="comn-status-class inprogress-class">In Progress</span>
						</div>
						<span className="ms-auto">
						<img src="../assets/images/chat-icn.svg" alt="" />
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
								<img src="./assets/images/Facebook-icon.png" alt="" className="me-2" />
								Facebook
							</span>
							</label>
							<label className="cust-chk-bx-soc p-0">
							<input type="checkbox" />
							<span className="cust-trend-chkbox">
								<img src="./assets/images/instagram-icon.png" alt="" className="me-2" />
								Instagram
							</span>
							</label>
							<label className="cust-chk-bx-soc p-0">
							<input type="checkbox" />
							<span className="cust-trend-chkbox">
								<img src="./assets/images/twitter-icon.png" alt="" className="me-2" />
								Twitter
							</span>
							</label>
							<label className="cust-chk-bx-soc p-0">
							<input type="checkbox" />
							<span className="cust-trend-chkbox">
								<img src="./assets/images/Tik-Tok-icon.png" alt="" className="me-2" />
								Tik Tok
							</span>
							</label>
							<label className="cust-chk-bx-soc p-0">
							<input type="checkbox" />
							<span className="cust-trend-chkbox">
								<img src="./assets/images/other-social-icon.svg" alt="" className="me-2" />
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
						<button className="comn-btn-class mt-3" onClick={() => handleDealClick("completed")}>
							Complete Deal
						</button>
						</div>
					</div>
					</div>
				</div>
				</div>
			</>
			)} */}

              {/* // ============================================== ( In Review ) ============================================ // */}
              {/* {dealState.inReview && (
			<>
				<div className="my-3 mt-md-0 tabs-heading-txt">
				<h5 className="mb-0">Deal Details</h5>
				</div>
				<div className="market-head-txt">
				<span>
					Deals &gt;
					<bdi> Deal Details</bdi>
				</span>
				</div>
				<div className="row">
				<div className="col-12 mt-3">
					<div className="tab-innr-content p-3">
					<div className="d-flex">
						<div>
						<img src="../assets/images/deal-detail-profile.png" alt="" />
						</div>
						<div className="ms-3 requester-name">
						<bdi className="">To John Doe</bdi>
						<span className="comn-status-class review-class">In Review</span>
						</div>
						<span className="ms-auto">
						<img src="../assets/images/chat-icn.svg" alt="" />
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
								<img src="./assets/images/Facebook-icon.png" alt="" className="me-2" />
								Facebook
							</span>
							</label>
							<label className="cust-chk-bx-soc p-0">
							<input type="checkbox" />
							<span className="cust-trend-chkbox">
								<img src="./assets/images/instagram-icon.png" alt="" className="me-2" />
								Instagram
							</span>
							</label>
							<label className="cust-chk-bx-soc p-0">
							<input type="checkbox" />
							<span className="cust-trend-chkbox">
								<img src="./assets/images/twitter-icon.png" alt="" className="me-2" />
								Twitter
							</span>
							</label>
							<label className="cust-chk-bx-soc p-0">
							<input type="checkbox" />
							<span className="cust-trend-chkbox">
								<img src="./assets/images/Tik-Tok-icon.png" alt="" className="me-2" />
								Tik Tok
							</span>
							</label>
							<label className="cust-chk-bx-soc p-0">
							<input type="checkbox" />
							<span className="cust-trend-chkbox">
								<img src="./assets/images/other-social-icon.svg" alt="" className="me-2" />
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
			)} */}

              {/* // ============================================== ( Completed ) ============================================ // */}
              {/* {dealState.completed && (
			<>
				<div className="my-3 mt-md-0 tabs-heading-txt">
				<h5 className="mb-0">Deal Details</h5>
				</div>
				<div className="market-head-txt">
				<span>
					Deal &gt;
					<bdi> Deal Details</bdi>
				</span>
				</div>
				<div className="row">
				<div className="col-12 mt-3">
					<div className="tab-innr-content p-3">
					<div className="d-flex">
						<div>
						<img src="../assets/images/deal-detail-profile.png" alt="" />
						</div>
						<div className="ms-3 requester-name">
						<bdi className="">To John Doe</bdi>
						<span className="comn-status-class complete-class">Completed</span>
						</div>
						<span className="ms-auto">
						<img src="../assets/images/chat-icn.svg" alt="" />
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
								<img src="./assets/images/Facebook-icon.png" alt="" className="me-2" />
								Facebook
							</span>
							</label>
							<label className="cust-chk-bx-soc p-0">
							<input type="checkbox" />
							<span className="cust-trend-chkbox">
								<img src="./assets/images/instagram-icon.png" alt="" className="me-2" />
								Instagram
							</span>
							</label>
							<label className="cust-chk-bx-soc p-0">
							<input type="checkbox" />
							<span className="cust-trend-chkbox">
								<img src="./assets/images/twitter-icon.png" alt="" className="me-2" />
								Twitter
							</span>
							</label>
							<label className="cust-chk-bx-soc p-0">
							<input type="checkbox" />
							<span className="cust-trend-chkbox">
								<img src="./assets/images/Tik-Tok-icon.png" alt="" className="me-2" />
								Tik Tok
							</span>
							</label>
							<label className="cust-chk-bx-soc p-0">
							<input type="checkbox" />
							<span className="cust-trend-chkbox">
								<img src="./assets/images/other-social-icon.svg" alt="" className="me-2" />
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
						<button className="comn-btn-class mt-3" onClick={() => handleDealClick("writeReview")}>
							Add Review
						</button>
						</div>
					</div>
					</div>
				</div>
				</div>
			</>
			)} */}

              {/* // ============================================== ( cancel ) ============================================ // */}
              {/* {dealState.cancel && (
			<>
				<div className="my-3 mt-md-0 tabs-heading-txt">
				<h5 className="mb-0">Deal Details</h5>
				</div>
				<div className="market-head-txt">
				<span>
					Deals &gt;
					<bdi> Deal Details</bdi>
				</span>
				</div>
				<div className="row">
				<div className="col-12 mt-3">
					<div className="tab-innr-content p-3">
					<div className="d-flex">
						<div>
						<img src="../assets/images/deal-detail-profile.png" alt="" />
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
								<img src="./assets/images/Facebook-icon.png" alt="" className="me-2" />
								Facebook
							</span>
							</label>
							<label className="cust-chk-bx-soc p-0">
							<input type="checkbox" />
							<span className="cust-trend-chkbox">
								<img src="./assets/images/instagram-icon.png" alt="" className="me-2" />
								Instagram
							</span>
							</label>
							<label className="cust-chk-bx-soc p-0">
							<input type="checkbox" />
							<span className="cust-trend-chkbox">
								<img src="./assets/images/twitter-icon.png" alt="" className="me-2" />
								Twitter
							</span>
							</label>
							<label className="cust-chk-bx-soc p-0">
							<input type="checkbox" />
							<span className="cust-trend-chkbox">
								<img src="./assets/images/Tik-Tok-icon.png" alt="" className="me-2" />
								Tik Tok
							</span>
							</label>
							<label className="cust-chk-bx-soc p-0">
							<input type="checkbox" />
							<span className="cust-trend-chkbox">
								<img src="./assets/images/other-social-icon.svg" alt="" className="me-2" />
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
			)} */}

              {/* // ============================================== ( Write Review ) ============================================ // */}
              {dealState.writeReview && (
                <>
                  <div className="my-3 mt-md-0 tabs-heading-txt">
                    <h5 className="mb-0">Write Review</h5>
                  </div>
                  <div className="market-head-txt">
                    <span>
                      Deals &gt; Deal Details &gt;
                      <bdi> Write Review</bdi>
                    </span>
                  </div>
                  <div className="row">
                    <div className="col-12 mt-3">
                      <div className="tab-innr-content p-3">
                        <div className="d-flex pb-3 deal-bdrbtm-class">
                          <div className="deal-inr-main-im-sec">
                            <img src={profileData?.profile_img ? profileData.profile_img : require("../assets/images/defaultProPic.png")} alt="" />
                          </div>
                          <div className="ms-3 requester-name">
                            <bdi className="">{profileData?.name}</bdi>
                            <p>{profileData?.sports?.map((s) => s).join(" , ")} • Male • 40Y/0</p>
                          </div>
                        </div>
                        <div className="req-innr-txt mt-3 pb-3 deal-bdrbtm-class">
                          <bdi>Give a rating</bdi>

                          {[...Array(5)].map((star, index) => {
                            index += 1;
                            return (
                              <button type="button" key={index} className={index <= (hover || rating) ? "on" : "off"} onClick={() => setRating(index)} onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(rating)}>
                                <span className={index <= (hover || rating) ? "on" : "off"}>
                                  <h2>&#9733;</h2>
                                </span>
                              </button>
                            );
                          })}

                          <p className="mb-0">Please give a starts and and share your experiance with Camden</p>
                        </div>
                        <div className="make-a-deal-top-title mt-3">
                          <label>What’s your opinion?</label>
                        </div>
                        <div className="">
                          <textarea className=" ps-3 comn-input-style  form-control h-auto" rows={7} placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." onChange={(e) => setOpinian(e.target.value)} />
                        </div>
                        <div className="row">
                          <div className="col-xl-3 col-lg-4 col-sm-4 mt-3">
                            <button className="comn-btn-class mt-3" onClick={handleGiveReview}>
                              Submit
                            </button>
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
      {/* ============= Deal Budget Modal =========== */}

      {editbudget && (
        <Modal show={editbudget} onHide={() => setEditBudget(false)} size="md" className="select-team-modal" arialabelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton className="border-0 pb-0">
            <div className="add-modal-hdr mx-auto">
              <p>Edit Budget</p>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-12">
                <div className="make-a-deal-top-title">
                  <label className="activity-innr-lable">Fulfillment date</label>
                  <input type="date" className="form-control comn-input-style ps-3 mt-2" name="date" />
                </div>
                <div className="make-a-deal-top-title mt-3">
                  <label className="activity-innr-lable">Payment</label>
                  <input type="text" className="form-control comn-input-style ps-3 mt-2" name="date" placeholder="Ex.50.00" />
                </div>
                <div className="make-a-deal-top-title mt-3">
                  <label className="activity-innr-lable">Add Content Duration</label>
                  <input type="text" className="form-control comn-input-style ps-3 mt-2" name="date" placeholder="Ex.50.00" />
                </div>
                <div className="mt-4">
                  <button className="comn-btn-class">Done</button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </MainLayout>
  );
}
