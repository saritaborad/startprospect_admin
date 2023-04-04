import React, { useState } from "react";
import MainLayout from "../Components/Layout/MainLayout";
import { Link } from "react-router-dom";
// import { TagsInput } from "react-tag-input-component";
import { Tab, Nav, Accordion, Modal } from "react-bootstrap";

import Range from "rc-slider";
import "rc-slider/assets/index.css";

// import { Rating } from "react-simple-star-rating";

export default function StudentProfile() {
  const [addbank, setAddBank] = React.useState(false);
  const [removebank, setRemoveBank] = React.useState(false);


  const [text, setText] = useState("");

  function handleOnEnter(text) {
  }

  const [rating, setRating] = React.useState(0);

  const handleRating = (rate) => {
    setRating(rate);
  };

  // ==================== custom search ==================//

  const [selected, setSelected] = useState(["Baseball"]);

  // =============== //

  const [profileState, setProfileState] = React.useState({
    editProfile: false,
    newpost: false,
    addpost: false,
  });

  const [offerState, setOfferState] = React.useState({
    pending: false,
    inProgress: false,
    completed: false,
    inReview: false,
    cancel: false,
    writeReview: false,
  });

  const [reqState, setReqState] = React.useState({
    reqPending: false,
    reqProgress: false,
    reqInReview: false,
    reqPaymentProcess: false,
    reqCompleted: false,
  });

  const [teamState, setTeamState] = React.useState({
    team: false,
    teamDetail: false,
    teamInvite: false,
  });

  const [withdrowState, setWithdrowState] = React.useState({
    withdraw: false,
  });

  const handleProfileClick = (type) => {
    setProfileState({
      [type]: true,
    });
  };
  const handleOfferClick = (type) => {
    setOfferState({
      [type]: true,
    });
  };
  const handleReqClick = (type) => {
    setReqState({
      [type]: true,
    });
  };
  const handleTeamClick = (type) => {
    setTeamState({
      [type]: true,
    });
  };
  const handleWithdrowClick = (type) => {
    setWithdrowState({
      [type]: true,
    });
  };

  return (
    <>
      <MainLayout>
        <section className="gray-bg-section">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
                  <div className="row">
                    <div className="col-xl-2 col-md-3 profile-setting-section">
                      <Nav variant="pills" className="flex-column mb-3">
                        <Nav.Item>
                          <Nav.Link>
                            <div className="d-flex align-items-center stud-prof-info">
                              <img src="../assets/images/user-profile.png" alt="" />
                              <span>John Doe</span>
                            </div>
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>

                      <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                          <Nav.Link eventKey="profile">
                            <div className="d-flex align-items-center">
                              <img src="../assets/images/profile-icn.svg" alt="" />
                              <span>Profile</span>
                            </div>
                          </Nav.Link>
                          <Nav.Link eventKey="offer">
                            <div className="d-flex align-items-center">
                              <img src="../assets/images/request-icn.svg" alt="" />
                              <span>Offers</span>
                            </div>
                          </Nav.Link>
                          <Nav.Link eventKey="request">
                            <div className="d-flex align-items-center">
                              <img src="../assets/images/req-chat-icn.svg" alt="" />
                              <span>Request</span>
                            </div>
                          </Nav.Link>
                          <Nav.Link eventKey="team">
                            <div className="d-flex align-items-center">
                              <img src="../assets/images/team-icn.svg" alt="" />
                              <span>Team</span>
                            </div>
                          </Nav.Link>
                          <Nav.Link eventKey="event">
                            <div className="d-flex align-items-center">
                              <img src="../assets/images/event-icn.svg" alt="" />
                              <span>Events</span>
                            </div>
                          </Nav.Link>
                          <Nav.Link eventKey="wallet">
                            <div className="d-flex align-items-center">
                              <img src="../assets/images/wallet-icn.svg" alt="" />
                              <span>Wallet</span>
                            </div>
                          </Nav.Link>
                          <Nav.Link eventKey="logout">
                            <div className="d-flex align-items-center">
                              <img src="../assets/images/logout-icn.sg" alt="" />
                              <span>Logout</span>
                            </div>
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </div>

                    <div className="col-xl-10 col-md-9">
                      <Tab.Content>
                        <Tab.Pane eventKey="profile">
                          {profileState.editProfile === false && profileState.newpost === false && profileState.addpost === false && (
                            <>
                              <div className="mt-3 mt-md-0 mb-3 d-sm-flex align-items-center">
                                <div className="tabs-heading-txt">
                                  <h5>Student Athelete</h5>
                                  <div className="market-head-txt">
                                    <span>
                                      Student Athelete &gt;
                                      <bdi>Profile</bdi>
                                    </span>
                                  </div>
                                </div>
                                <span className="ms-auto d-flex align-items-center comn-gry-txt">
                                  <svg width="20" height="20" viewBox="0 0 26 22" className="me-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.25 16L24.25 11M24.25 11L19.25 6M24.25 11L6.75 11M14.25 16V17.25C14.25 19.3211 12.5711 21 10.5 21H5.5C3.42893 21 1.75 19.3211 1.75 17.25V4.75C1.75 2.67893 3.42893 1 5.5 1H10.5C12.5711 1 14.25 2.67893 14.25 4.75V6" stroke="#7B838A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                  Exit Profile
                                </span>
                              </div>
                              <div className="row">
                                <div className="col-lg-5">
                                  <div className="customer-page-box h-auto">
                                    <div className="img-div-main position-relative">
                                      <img src="../assets/images/athlete-bg.png" className="img-fluid w-100" alt="customers large" />
                                    </div>
                                    <div className="customer-page-box-body">
                                      <div className="player-detail">
                                        <div className="athlete-profile">
                                          <img src="../assets/images/athlete-profile.png" alt="athelete profile" />
                                        </div>
                                        <div className="athelete-name-txt">
                                          <div className="d-flex">
                                            <label className="d-block">Leo Press</label>
                                            <span className="ms-auto">
                                              <span onClick={() => handleProfileClick("editProfile")}>
                                                <i className="bi bi-pencil"></i>
                                              </span>
                                            </span>
                                          </div>
                                          <p className="mb-0">Basketball-Golden State Warrious</p>
                                        </div>
                                        <div className="player-detail">
                                          <span>
                                            Sports : <b>Football | Baseball | Cricket | Rugby</b>
                                          </span>
                                        </div>
                                        <div className="d-flex mt-2">
                                          <div className="d-flex flex-column">
                                            <span className="me-3 mb-1">
                                              Language: <b>English</b>
                                            </span>
                                            <span className="me-3 mb-1">
                                              Age: <b>23</b>
                                            </span>
                                            <span className="me-3 mb-1">
                                              Gender: <b>Male</b>
                                            </span>
                                          </div>
                                          <div className="ms-auto">
                                            <div className="market-rigth-subtxt d-flex align-items-center mb-1">
                                              <div>
                                                <span>
                                                  <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.0007 0.5L0.833984 5.5L4.16732 7.31667V12.3167L10.0007 15.5L15.834 12.3167V7.31667L17.5007 6.40833V12.1667H19.1673V5.5L10.0007 0.5ZM15.684 5.5L10.0007 8.6L4.31732 5.5L10.0007 2.4L15.684 5.5ZM14.1673 11.325L10.0007 13.6L5.83398 11.325V8.225L10.0007 10.5L14.1673 8.225V11.325Z" fill="url(#paint0_linear_3601_34027)" />
                                                    <defs>
                                                      <linearGradient id="paint0_linear_3601_34027" x1="1.574" y1="3.66011" x2="21.1905" y2="7.97025" gradientUnits="userSpaceOnUse">
                                                        <stop stopColor="#6A58FB" />
                                                        <stop offset="1" stopColor="#4599F4" />
                                                      </linearGradient>
                                                    </defs>
                                                  </svg>
                                                </span>
                                              </div>
                                              <bdi>Houston Victoria School</bdi>
                                            </div>
                                            <div className="market-rigth-subtxt d-flex align-items-center mb-1">
                                              <div>
                                                <span>
                                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clipPath="url(#clip0_3601_34031)">
                                                      <path d="M9.99935 1.6665C6.77435 1.6665 4.16602 4.27484 4.16602 7.49984C4.16602 11.8748 9.99935 18.3332 9.99935 18.3332C9.99935 18.3332 15.8327 11.8748 15.8327 7.49984C15.8327 4.27484 13.2243 1.6665 9.99935 1.6665ZM5.83268 7.49984C5.83268 5.19984 7.69935 3.33317 9.99935 3.33317C12.2993 3.33317 14.166 5.19984 14.166 7.49984C14.166 9.89984 11.766 13.4915 9.99935 15.7332C8.26602 13.5082 5.83268 9.87484 5.83268 7.49984Z" fill="url(#paint0_linear_3601_34031)" />
                                                      <path d="M9.99935 9.58317C11.1499 9.58317 12.0827 8.65043 12.0827 7.49984C12.0827 6.34924 11.1499 5.4165 9.99935 5.4165C8.84876 5.4165 7.91602 6.34924 7.91602 7.49984C7.91602 8.65043 8.84876 9.58317 9.99935 9.58317Z" fill="url(#paint1_linear_3601_34031)" />
                                                    </g>
                                                    <defs>
                                                      <linearGradient id="paint0_linear_3601_34031" x1="4.63694" y1="5.17774" x2="17.5188" y2="6.79879" gradientUnits="userSpaceOnUse">
                                                        <stop stopColor="#6A58FB" />
                                                        <stop offset="1" stopColor="#4599F4" />
                                                      </linearGradient>
                                                      <linearGradient id="paint1_linear_3601_34031" x1="8.0842" y1="6.29431" x2="12.6114" y2="7.10817" gradientUnits="userSpaceOnUse">
                                                        <stop stopColor="#6A58FB" />
                                                        <stop offset="1" stopColor="#4599F4" />
                                                      </linearGradient>
                                                      <clipPath id="clip0_3601_34031">
                                                        <rect width="20" height="20" fill="white" />
                                                      </clipPath>
                                                    </defs>
                                                  </svg>
                                                </span>
                                              </div>
                                              <bdi>Newyork, USA</bdi>
                                            </div>
                                            <div className="market-rigth-subtxt d-flex align-items-center mb-1">
                                              <div>
                                                {/* <Rating className="" fillColor="#FFC107" emptyColor="#828282" initialValue={1} iconsCount={1} size={20} /> */}
                                              </div>
                                              <bdi className="linear-txt">4.5 ( 120+ Reviews )</bdi>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="market-left-detail mt-4 p-3">
                                    <h5>Additional Information</h5>
                                    <div>
                                      <ul>
                                        <li>
                                          <div className="additional-detail">
                                            <span>Birthday:</span>
                                            <bdi>15-8-1989</bdi>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="additional-detail">
                                            <span>Gender:</span>
                                            <bdi>Male</bdi>
                                          </div>
                                          <div className="additional-detail">
                                            <span>Mailing Address:</span>
                                            <bdi>marie_robinsin12@mail.com</bdi>
                                          </div>
                                          <div className="additional-detail">
                                            <span>Email Address:</span>
                                            <bdi>marierobinsin52@gmail.com</bdi>
                                          </div>
                                          <div className="additional-detail">
                                            <span>Phone:</span>
                                            <bdi>+1 254 854 1937</bdi>
                                          </div>
                                          <div className="additional-detail">
                                            <span>Faith:</span>
                                            <bdi>Christian</bdi>
                                          </div>
                                          <div className="additional-detail">
                                            <span>Family Circle:</span>
                                            <bdi>Lorem Ipsum</bdi>
                                          </div>
                                          <div className="additional-detail">
                                            <span>Academics:</span>
                                            <bdi>Lorem Ipsum</bdi>
                                          </div>
                                          <div className="additional-detail">
                                            <span>Graduation Year:</span>
                                            <bdi>2012</bdi>
                                          </div>
                                          <div className="additional-detail">
                                            <span>GPA:</span>
                                            <bdi>C+</bdi>
                                          </div>
                                          <div className="additional-detail">
                                            <span>SAT:</span>
                                            <bdi>Lorem</bdi>
                                          </div>
                                          <div className="additional-detail">
                                            <span>ACT:</span>
                                            <bdi>Ipsum</bdi>
                                          </div>
                                          <div className="additional-detail">
                                            <span>Class Rank:</span>
                                            <bdi>2nd</bdi>
                                          </div>
                                          <div className="additional-detail">
                                            <span>Class Size:</span>
                                            <bdi>Lorem</bdi>
                                          </div>
                                          <div className="additional-detail">
                                            <span>Awards Honors:</span>
                                            <bdi>Ipsum</bdi>
                                          </div>
                                          <div className="additional-detail">
                                            <span>NCAA Clearinghouse registered:</span>
                                            <bdi>Yes</bdi>
                                          </div>
                                          <div className="additional-detail">
                                            <span>Athletics:</span>
                                            <bdi>Basketball, Volleyball, etc.</bdi>
                                          </div>
                                          <div className="additional-detail">
                                            <span>Height:</span>
                                            <bdi>5.5’</bdi>
                                          </div>
                                          <div className="additional-detail">
                                            <span>Weight:</span>
                                            <bdi>48 kg</bdi>
                                          </div>
                                          <div className="additional-detail">
                                            <span>Event</span>
                                            <bdi>40 Dash</bdi>
                                          </div>
                                          <div className="additional-detail">
                                            <span>Position</span>
                                            <bdi>RB</bdi>
                                          </div>
                                          <div className="additional-detail">
                                            <span>School/Collage:</span>
                                            <bdi>Preparatory school</bdi>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-7 mt-lg-0 mt-3">
                                  <div className="market-right-detail">
                                    <div className="score-div">
                                      <h6>About</h6>
                                      <div className="d-flex">
                                        <img src="../assets/images/score.png" alt="" />
                                        <div className="score-detail ms-3">
                                          <span className="me-3">Starprospect Score</span>
                                          <bdi>425</bdi>
                                          <p>Your score is 450 pts lower than the top 10% of athletes</p>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="deal-social-box-info mt-3">
                                      <div className="deal-social-box mb-2 me-3">
                                        <div className="social-score-detail text-center p-3">
                                          <div className="soc-img-div">
                                            <img src="../assets/images/instagram-icon.png" alt="" className="img-fluid" />
                                          </div>
                                          <div className="soc-innr-percent">
                                            <p>johndoe31</p>
                                            <div className="mt-auto">
                                              <span>12.3K</span>
                                              <bdi>25.2%</bdi>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="deal-social-box mb-2 me-3">
                                        <div className="social-score-detail text-center p-3">
                                          <div className="soc-img-div">
                                            <img src="../assets/images/Facebook-icon.png" alt="" className="img-fluid" />
                                          </div>
                                          <div className="soc-innr-percent">
                                            <p>johndoe31</p>
                                            <div className="mt-auto">
                                              <span>12.3K</span>
                                              <bdi>25.2%</bdi>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="deal-social-box mb-2 me-3">
                                        <div className="social-score-detail text-center p-3">
                                          <div className="soc-img-div">
                                            <img src="../assets/images/Tik-Tok-icon.png" alt="" className="img-fluid" />
                                          </div>
                                          <div className="soc-innr-percent">
                                            <p>johndoe31</p>
                                            <div className="mt-auto">
                                              <span>12.3K</span>
                                              <bdi>25.2%</bdi>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="deal-social-box mb-2 me-3">
                                        <div className="social-score-detail text-center p-3">
                                          <div className="soc-img-div">
                                            <img src="../assets/images/YouTube-icon.png" alt="" className="img-fluid" />
                                          </div>
                                          <div className="soc-innr-percent">
                                            <p>johndoe31</p>
                                            <div className="mt-auto">
                                              <span>12.3K</span>
                                              <bdi>25.2%</bdi>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="deal-social-box mb-2 me-3">
                                        <div className="social-score-detail text-center p-3">
                                          <div className="soc-img-div">
                                            <img src="../assets/images/linkedin_icon.png" alt="" className="img-fluid" />
                                          </div>
                                          <div className="soc-innr-percent">
                                            <p>johndoe31</p>
                                            <div className="mt-auto">
                                              <span>12.3K</span>
                                              <bdi>25.2%</bdi>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="deal-social-box mb-2 me-3">
                                        <div className="social-score-detail text-center p-3">
                                          <div className="soc-img-div">
                                            <img src="../assets/images/twitter-icon.png" alt="" className="img-fluid" />
                                          </div>
                                          <div className="soc-innr-percent">
                                            <p>johndoe31</p>
                                            <div className="mt-auto">
                                              <span>12.3K</span>
                                              <bdi>25.2%</bdi>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="deal-social-box mb-2 me-3">
                                        <div className="social-score-detail text-center p-3">
                                          <div className="soc-img-div">
                                            <img src="../assets/images/twitter-icon.png" alt="" className="img-fluid" />
                                          </div>
                                          <div className="soc-innr-percent">
                                            <p>johndoe31</p>
                                            <div className="mt-auto">
                                              <span>12.3K</span>
                                              <bdi>25.2%</bdi>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-sm-8">
                                        <div className="d-flex">
                                          <button className="comn-white-btn mt-3" data="Post" onClick={() => handleProfileClick("newpost")}></button>
                                          <button className="comn-white-btn mt-3 ms-3" data="Edit Profile" onClick={() => handleProfileClick("editProfile")}></button>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-12 text-center">
                                        <div className="mt-5">
                                          <Tab.Container id="left-tabs-example" defaultActiveKey="newsfeed">
                                            <div className="comn-tab-sec  position-relative">
                                              <Nav variant="pills">
                                                <Nav.Item>
                                                  <Nav.Link eventKey="newsfeed">Newsfeed</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                  <Nav.Link eventKey="deals">Deals</Nav.Link>
                                                </Nav.Item>
                                              </Nav>
                                            </div>
                                            <Tab.Content>
                                              <Tab.Pane eventKey="newsfeed">
                                                <div className="row mt-3 m-0">
                                                  <div className="col-lg-4 col-sm-3 col-4 mb-3">
                                                    <div className="deal-newsfeed-tab">
                                                      <img src="../assets/images/md-1.png" className="img-fluid w-100" alt="" />
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-4 col-sm-3 col-4 mb-3">
                                                    <div className="deal-newsfeed-tab">
                                                      <img src="../assets/images/md-2.png" className="img-fluid w-100" alt=""/>
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-4 col-sm-3 col-4 mb-3">
                                                    <div className="deal-newsfeed-tab">
                                                      <img src="../assets/images/md-3.png" className="img-fluid w-100" alt="" />
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-4 col-sm-3 col-4 mb-3">
                                                    <div className="deal-newsfeed-tab">
                                                      <img src="../assets/images/md-4.png" className="img-fluid w-100" alt="" />
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-4 col-sm-3 col-4 mb-3">
                                                    <div className="deal-newsfeed-tab">
                                                      <img src="../assets/images/md-5.png" className="img-fluid w-100" alt="" />
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-4 col-sm-3 col-4 mb-3">
                                                    <div className="deal-newsfeed-tab">
                                                      <img src="../assets/images/md-6.png" className="img-fluid w-100" alt="" />
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-4 col-sm-3 col-4 mb-3">
                                                    <div className="deal-newsfeed-tab">
                                                      <img src="../assets/images/md-7.png" className="img-fluid w-100" alt="" />
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-4 col-sm-3 col-4 mb-3">
                                                    <div className="deal-newsfeed-tab">
                                                      <img src="../assets/images/md-8.png" className="img-fluid w-100" alt="" />
                                                    </div>
                                                  </div>
                                                </div>
                                              </Tab.Pane>
                                              <Tab.Pane eventKey="deals">
                                                <div className="social-media-platform mt-3 p-3">
                                                  <div className="text-start">
                                                    <h6>Social Media Plateforms</h6>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-12">
                                                      <div className="d-flex align-items-center mt-3">
                                                        <div>
                                                          <img src="../assets/images/instagram-icon.png" className="img-fluid" alt="" />
                                                          <span>Post | Story | Reels</span>
                                                        </div>
                                                        <bdi className="ms-auto">$150.00</bdi>
                                                      </div>
                                                      <div className="d-flex align-items-center mt-3">
                                                        <div>
                                                          <img src="../assets/images/Tik-Tok-icon.png" className="img-fluid" alt=""/>
                                                          <span>Post | Audio</span>
                                                        </div>
                                                        <bdi className="ms-auto">$90.00</bdi>
                                                      </div>
                                                      <div className="d-flex align-items-center mt-3">
                                                        <div>
                                                          <img src="../assets/images/linkedin_icon.png" className="img-fluid" alt=""/>
                                                          <span>Post | Video</span>
                                                        </div>
                                                        <bdi className="ms-auto">$70.00</bdi>
                                                      </div>
                                                    </div>
                                                    <div className="col-12">
                                                      <div className="d-flex align-items-center mt-3">
                                                        <div>
                                                          <img src="../assets/images/Facebook-icon.png" className="img-fluid" alt=""/>
                                                          <span>Post | Story</span>
                                                        </div>
                                                        <bdi className="ms-auto">$150.00</bdi>
                                                      </div>
                                                      <div className="d-flex align-items-center mt-3">
                                                        <div>
                                                          <img src="../assets/images/YouTube-icon.png" className="img-fluid" alt=""/>
                                                          <span>Post | Audio</span>
                                                        </div>
                                                        <bdi className="ms-auto">$150.00</bdi>
                                                      </div>
                                                      <div className="d-flex align-items-center mt-3">
                                                        <div>
                                                          <img src="../assets/images/twitter-icon.png" className="img-fluid" alt=""/>
                                                          <span>Post | Fleet</span>
                                                        </div>
                                                        <bdi className="ms-auto">$250.00</bdi>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="categori-main mt-3 p-3">
                                                  <div className="row">
                                                    <div className="col-12">
                                                      <div className="text-start">
                                                        <h6>Niche</h6>
                                                      </div>
                                                      <div className="category-inner-div text-start">
                                                        <span>General</span>
                                                        <span>Beauty/makeup</span>
                                                        <span>Fashion</span>
                                                        <span>Tech</span>
                                                        <span>Heallth/Fitness/Food</span>
                                                        <span>Dance</span>
                                                        <span>Meme</span>
                                                        <span>Travel</span>
                                                        <span>Family</span>
                                                        <span>Gaming</span>
                                                        <span>Athletes/Sports</span>
                                                        <span>Comedy</span>
                                                        <span>Theme</span>
                                                        <span>Finance/Stocks/Crypto</span>
                                                      </div>
                                                    </div>
                                                    <div className="col-12 mt-3">
                                                      <div className="text-start">
                                                        <h6>Categories</h6>
                                                      </div>
                                                      <div className="category-inner-div text-start">
                                                        <span>Baseball</span>
                                                        <span>Pitcher</span>
                                                        <span>Catcher</span>
                                                        <span>Shortstop</span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </Tab.Pane>
                                            </Tab.Content>
                                          </Tab.Container>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                          {/* ==================  EDIT PROFILE  ================== */}

                          {profileState.editProfile && (
                            <>
                              <div className="mt-3 mt-md-0 tabs-heading-txt">
                                <h5 className="mb-0">Student Athelete</h5>
                              </div>
                              <div className="market-head-txt">
                                <span>
                                  Student Athelete &gt;
                                  <bdi> Edit Profile</bdi>
                                </span>
                              </div>
                              <div className="row">
                                <div className="col-12">
                                  <div className="edit-profile-main p-3 mt-3">
                                    <h5>Personal Information</h5>
                                    <form className="row align-items-center">
                                      <div className="col-lg-6 col-md-12 col-sm-6 mb-3 mt-3">
                                        <label className="comn-label-class">Name</label>
                                        <bdi className="d-block position-relative">
                                          <input type="text" className="form-control comn-input-style ps-3" placeholder="Enter Your Name" />
                                        </bdi>
                                      </div>
                                      <div className="col-lg-6 col-md-12 col-sm-6 mb-3 mt-3">
                                        <label className="comn-label-class">Username</label>
                                        <bdi className="d-block position-relative">
                                          <input type="text" className="form-control comn-input-style ps-3" placeholder="Enter Your Name" />
                                        </bdi>
                                      </div>
                                      <div className="col-lg-6 col-md-12 col-sm-6 mb-3">
                                        <label className="comn-label-class">Email Address</label>
                                        <bdi className="d-block position-relative">
                                          <input type="email" className="form-control comn-input-style ps-3" placeholder="Enter Your Email" />
                                        </bdi>
                                      </div>
                                      <div className="col-lg-6 col-md-12 col-sm-6 mb-3">
                                        <label className="comn-label-class">Phone Number</label>
                                        <bdi className="d-block position-relative">
                                          <input type="tel" className="form-control comn-input-style ps-3" placeholder="Enter Your Phone Number" />
                                        </bdi>
                                      </div>
                                      <div className="col-lg-6 col-md-12 col-sm-6 mb-3">
                                        <label className="comn-label-class">Date Of Birth</label>
                                        <bdi className="d-block position-relative">
                                          <input type="date" className="form-control comn-input-style ps-3" />
                                        </bdi>
                                      </div>
                                      <div className="col-lg-6 col-md-12 col-sm-6 mb-3">
                                        <label className="comn-label-class">Gender</label>
                                        <bdi className="d-block position-relative">
                                          <select className="form-select comn-input-style w-100 ps-3">
                                            <option>Male</option>
                                            <option>Female</option>
                                          </select>
                                        </bdi>
                                      </div>
                                      <div className="col-12 mb-3">
                                        <label className="comn-label-class">BIo</label>
                                        <bdi className="d-block position-relative">
                                          <textarea type="date" className="form-control comn-input-style h-auto ps-3" placeholder="Text here..." rows={3} />
                                        </bdi>
                                      </div>
                                      <div className="col-lg-6 col-md-12 col-sm-6 mb-3">
                                        <label className="comn-label-class">School</label>
                                        <bdi className="d-block position-relative">
                                          <select className="form-select comn-input-style w-100 ps-3">
                                            <option>Houston Victoria School</option>
                                            <option>London school</option>
                                          </select>
                                        </bdi>
                                      </div>
                                      <div className="col-lg-6 col-md-12 col-sm-6 mb-3">
                                        <label className="comn-label-class">Address</label>
                                        <bdi className="d-block position-relative">
                                          <input type="text" className="form-control comn-input-style ps-3" />
                                        </bdi>
                                      </div>
                                      <div className="col-lg-6 col-md-12 col-sm-6 mb-3">
                                        <label className="comn-label-class">City</label>
                                        <bdi className="d-block position-relative">
                                          <select className="form-select comn-input-style w-100 ps-3">
                                            <option>Philadelphia</option>
                                            <option>London</option>
                                          </select>
                                        </bdi>
                                      </div>
                                      <div className="col-lg-6 col-md-12 col-sm-6 mb-3">
                                        <label className="comn-label-class">State</label>
                                        <bdi className="d-block position-relative">
                                          <select className="form-select comn-input-style w-100 ps-3">
                                            <option>Texas</option>
                                            <option>Usa</option>
                                          </select>
                                        </bdi>
                                      </div>
                                      <div className="col-xxl-3 col-xl-4 col-md-6 mx-md-0 mx-sm-auto">
                                        <button className="comn-btn-class w-100" type="button">
                                          Save
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                  <div className="additional-info mt-3 p-3">
                                    <h5>Additional Information</h5>
                                    <form className="row align-items-center">
                                      <div className="col-lg-6 col-md-12 col-sm-6 mb-3">
                                        <label className="comn-label-class">Faith</label>
                                        <bdi className="d-block position-relative">
                                          <input type="text" className="form-control comn-input-style ps-3" placeholder="Christian" />
                                        </bdi>
                                      </div>
                                      <div className="col-lg-6 col-md-12 col-sm-6 mb-3">
                                        <label className="comn-label-class">Family Circle</label>
                                        <bdi className="d-block position-relative">
                                          <input type="text" className="form-control comn-input-style ps-3" placeholder="Lorem Ipsum" />
                                        </bdi>
                                      </div>
                                      <div className="col-lg-6 col-md-12 col-sm-6 mb-3">
                                        <label className="comn-label-class">Academics</label>
                                        <bdi className="d-block position-relative">
                                          <input type="text" className="form-control comn-input-style ps-3" placeholder="Lorem Ipsum" />
                                        </bdi>
                                      </div>
                                      <div className="col-lg-6 col-md-12 col-sm-6 mb-3">
                                        <label className="comn-label-class">Graduation Year:</label>
                                        <bdi className="d-block position-relative">
                                          <input type="text" className="form-control comn-input-style ps-3" placeholder="2012" />
                                        </bdi>
                                      </div>
                                      <div className="col-lg-6 col-md-12 col-sm-6 mb-3">
                                        <label className="comn-label-class">ACT</label>
                                        <bdi className="d-block position-relative">
                                          <input type="text" className="form-control comn-input-style ps-3" placeholder="C+" />
                                        </bdi>
                                      </div>
                                      <div className="col-lg-6 col-md-12 col-sm-6 mb-3">
                                        <label className="comn-label-class">SAT</label>
                                        <bdi className="d-block position-relative">
                                          <input type="text" className="form-control comn-input-style ps-3" placeholder="Lorem" />
                                        </bdi>
                                      </div>
                                      <div className="col-lg-6 col-md-12 col-sm-6 mb-3">
                                        <label className="comn-label-class">ACT</label>
                                        <bdi className="d-block position-relative">
                                          <input type="text" className="form-control comn-input-style ps-3" placeholder="Ipsum" />
                                        </bdi>
                                      </div>
                                      <div className="col-lg-6 col-md-12 col-sm-6 mb-3">
                                        <label className="comn-label-class">Class Rank</label>
                                        <bdi className="d-block position-relative">
                                          <input type="text" className="form-control comn-input-style ps-3" placeholder="2nd" />
                                        </bdi>
                                      </div>
                                      <div className="col-lg-6 col-md-12 col-sm-6 mb-3">
                                        <label className="comn-label-class">Class Size</label>
                                        <bdi className="d-block position-relative">
                                          <input type="text" className="form-control comn-input-style ps-3" placeholder="Lorem" />
                                        </bdi>
                                      </div>
                                      <div className="col-lg-6 col-md-12 col-sm-6 mb-3">
                                        <label className="comn-label-class">Awards Honors:</label>
                                        <bdi className="d-block position-relative">
                                          <input type="text" className="form-control comn-input-style ps-3" placeholder="Ipsum" />
                                        </bdi>
                                      </div>
                                      <div className="col-lg-6 col-md-12 col-sm-6 mb-3">
                                        <label className="comn-label-class">NCAA Clearinghouse registered:</label>
                                        <bdi className="d-block position-relative">
                                          <input type="text" className="form-control comn-input-style ps-3" placeholder="Yes" />
                                        </bdi>
                                      </div>
                                      <div className="col-lg-6 col-md-12 col-sm-6 mb-3">
                                        <label className="comn-label-class">Athletics:</label>
                                        <bdi className="d-block position-relative">
                                          <input type="text" className="form-control comn-input-style ps-3" placeholder="Basketball, Volleyball, etc." />
                                        </bdi>
                                      </div>
                                      <div className="col-lg-6 col-md-12 col-sm-6 mb-3">
                                        <label className="comn-label-class">Height</label>
                                        <bdi className="d-block position-relative">
                                          <input type="text" className="form-control comn-input-style ps-3" placeholder="5.5’" />
                                        </bdi>
                                      </div>
                                      <div className="col-lg-6 col-md-12 col-sm-6 mb-3">
                                        <label className="comn-label-class">Weight</label>
                                        <bdi className="d-block position-relative">
                                          <input type="text" className="form-control comn-input-style ps-3" placeholder="48 kg" />
                                        </bdi>
                                      </div>
                                      <div className="col-lg-6 col-md-12 col-sm-6 mb-3">
                                        <label className="comn-label-class">School/Collage</label>
                                        <bdi className="d-block position-relative">
                                          <input type="text" className="form-control comn-input-style ps-3" placeholder="Preparatory school" />
                                        </bdi>
                                      </div>
                                      <div className="col-12">
                                        <div className="categori-main mt-3">
                                          <div className="text-start mb-2">
                                            <label className="comn-label-class">Student Athlete Plays</label>
                                          </div>

                                          <div className="category-inner-div">
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="checkbox" />
                                              <span className="cust-chkbox-soc hobby-checkbx">Baseball</span>
                                            </label>
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="checkbox" />
                                              <span className="cust-chkbox-soc hobby-checkbx">Basketball</span>
                                            </label>
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="checkbox" />
                                              <span className="cust-chkbox-soc hobby-checkbx">Soccer</span>
                                            </label>
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="checkbox" />
                                              <span className="cust-chkbox-soc hobby-checkbx">Football</span>
                                            </label>
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="checkbox" />
                                              <span className="cust-chkbox-soc hobby-checkbx">Cheer</span>
                                            </label>
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="checkbox" />
                                              <span className="cust-chkbox-soc hobby-checkbx">Cycling</span>
                                            </label>
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="checkbox" />
                                              <span className="cust-chkbox-soc hobby-checkbx">Diving</span>
                                            </label>
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="checkbox" />
                                              <span className="cust-chkbox-soc hobby-checkbx">Hockey</span>
                                            </label>
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="checkbox" />
                                              <span className="cust-chkbox-soc hobby-checkbx">Lacrosse</span>
                                            </label>
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="checkbox" />
                                              <span className="cust-chkbox-soc hobby-checkbx">Rowing</span>
                                            </label>
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="checkbox" />
                                              <span className="cust-chkbox-soc hobby-checkbx">Rugby</span>
                                            </label>
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="checkbox" />
                                              <span className="cust-chkbox-soc hobby-checkbx">Softball</span>
                                            </label>
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="checkbox" />
                                              <span className="cust-chkbox-soc hobby-checkbx">Swimming</span>
                                            </label>
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="checkbox" />
                                              <span className="cust-chkbox-soc hobby-checkbx">Tennis</span>
                                            </label>
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="checkbox" />
                                              <span className="cust-chkbox-soc hobby-checkbx">Cross Country</span>
                                            </label>
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="checkbox" />
                                              <span className="cust-chkbox-soc hobby-checkbx">Volleyball</span>
                                            </label>
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="checkbox" />
                                              <span className="cust-chkbox-soc hobby-checkbx">Wrestling</span>
                                            </label>
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="checkbox" defaultChecked />
                                              <span className="cust-chkbox-soc hobby-checkbx">Custom</span>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-12 mt-3">
                                        <div className="text-start mb-2">
                                          <label className="comn-label-class">Sports</label>
                                          <div className="custm-studnt-position">
                                            <div>
                                              {/* <TagsInput value={selected} onChange={setSelected} name="sport" placeHolder="Type here" /> */}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-12 mt-3">
                                        <div className="text-start mb-2">
                                          <label className="comn-label-class">Select Position</label>
                                        </div>
                                        <div className="d-flex flex-wrap">
                                          <div className="custm-studnt-sport">
                                            <div className="select-game">
                                              <span className="position-relative">
                                                Baseball
                                                <bdi className="ps-2">x</bdi>
                                              </span>
                                            </div>
                                            <div className="ms-auto">
                                              <select className="form-select">
                                                <option>Select Position</option>
                                                <option>Coach</option>
                                                <option>Business</option>
                                              </select>
                                            </div>
                                          </div>

                                          <div className="custm-studnt-sport">
                                            <div className="select-game">
                                              <span className="position-relative">
                                                Crpss Country
                                                <bdi className="ps-2">x</bdi>
                                              </span>
                                            </div>
                                            <div className="ms-auto">
                                              <select className="form-select">
                                                <option>Select Position</option>
                                                <option>Coach</option>
                                                <option>Business</option>
                                              </select>
                                            </div>
                                          </div>

                                          <div className="custm-studnt-sport">
                                            <div className="select-game">
                                              <span className="position-relative">
                                                Outfield
                                                <bdi className="ps-2">x</bdi>
                                              </span>
                                            </div>
                                            <div className="ms-auto">
                                              <select className="form-select">
                                                <option>Select Position</option>
                                                <option>Coach</option>
                                                <option>Business</option>
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="col-12 mt-3">
                                        <div className="range-area">
                                          <span className="text-muted">GPA</span>
                                          <Range min={0} max={6} defaultValue={[2]} />
                                          <div className="d-flex">
                                            <span>0.0</span>
                                            <span className="ms-auto">6.0</span>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="col-12 mt-3">
                                        <div className="make-a-deal-top-title">
                                          <label className="comn-label-class">Events</label>
                                        </div>
                                        <div className="cust-soc-icon-main">
                                          <div className="soc-icon-main">
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="radio" name="event" defaultChecked />
                                              <span className="cust-chkbox-soc event-check-box text-center">
                                                <img alt="" src="../assets/images/event-icon1.png" className="img-fluid" />
                                                <bdi className="event-txt">Dash</bdi>
                                              </span>
                                            </label>
                                          </div>
                                          <div className="soc-icon-main">
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="radio" name="event" />
                                              <span className="cust-chkbox-soc event-check-box text-center">
                                                <img alt="" src="../assets/images/event-icon2.png" className="img-fluid" />
                                                <bdi className="event-txt">Bench</bdi>
                                              </span>
                                            </label>
                                          </div>
                                          <div className="soc-icon-main">
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="radio" name="event" />
                                              <span className="cust-chkbox-soc event-check-box text-center">
                                                <img alt="" src="../assets/images/event-icon3.png" className="img-fluid" />
                                                <bdi className="event-txt">Vertical</bdi>
                                              </span>
                                            </label>
                                          </div>
                                          <div className="soc-icon-main">
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="radio" name="event" />
                                              <span className="cust-chkbox-soc event-check-box text-center">
                                                <img alt="" src="../assets/images/event-icon4.png" className="img-fluid" />
                                                <bdi className="event-txt">Broad</bdi>
                                              </span>
                                            </label>
                                          </div>
                                          <div className="soc-icon-main">
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="radio" name="event" />
                                              <span className="cust-chkbox-soc event-check-box text-center">
                                                <img alt="" src="../assets/images/event-icon5.png" className="img-fluid" />
                                                <bdi className="event-txt">3 Cone</bdi>
                                              </span>
                                            </label>
                                          </div>
                                          <div className="soc-icon-main">
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="radio" name="event" />
                                              <span className="cust-chkbox-soc event-check-box text-center">
                                                <img alt="" src="../assets/images/event-icon6.png" className="img-fluid" />
                                                <bdi className="event-txt">Shuttle</bdi>
                                              </span>
                                            </label>
                                          </div>
                                          <div className="soc-icon-main">
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="radio" name="event" />
                                              <span className="cust-chkbox-soc event-check-box text-center me-0">
                                                <img alt="" src="../assets/images/event-icon7.png" className="img-fluid" />
                                                <bdi className="event-txt">Shuttle</bdi>
                                              </span>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-12">
                                        <div className="categori-main mt-3">
                                          <div className="text-start">
                                            <label className="comn-label-class">Position</label>
                                          </div>
                                          <div className="category-inner-div position-info">
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="checkbox" />
                                              <span className="cust-chkbox-soc hobby-checkbx">QB</span>
                                            </label>
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="checkbox" />
                                              <span className="cust-chkbox-soc hobby-checkbx">RB</span>
                                            </label>
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="checkbox" />
                                              <span className="cust-chkbox-soc hobby-checkbx">WR</span>
                                            </label>
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="checkbox" />
                                              <span className="cust-chkbox-soc hobby-checkbx">TE</span>
                                            </label>
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="checkbox" />
                                              <span className="cust-chkbox-soc hobby-checkbx">OL</span>
                                            </label>
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="checkbox" />
                                              <span className="cust-chkbox-soc hobby-checkbx">DE</span>
                                            </label>
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="checkbox" />
                                              <span className="cust-chkbox-soc hobby-checkbx">DT</span>
                                            </label>
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="checkbox" />
                                              <span className="cust-chkbox-soc hobby-checkbx">LB</span>
                                            </label>
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="checkbox" />
                                              <span className="cust-chkbox-soc hobby-checkbx">CB</span>
                                            </label>
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="checkbox" />
                                              <span className="cust-chkbox-soc hobby-checkbx">SAF</span>
                                            </label>
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="checkbox" />
                                              <span className="cust-chkbox-soc hobby-checkbx">SPEC</span>
                                            </label>
                                            <label className="cust-chk-bx-soc p-0">
                                              <input type="checkbox" />
                                              <span className="cust-chkbox-soc hobby-checkbx">ALL</span>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-12 mt-3">
                                        <h4 className="starpro-txt-alert">Starprospect Text Alerts</h4>
                                        <div>
                                          <label className="cust-chk-bx mt-3 non-nego-txt">
                                            <input type="checkbox" id="remember-me" name="remember-me" />
                                            <span className="cust-chkmark"></span>
                                            <span>
                                              Sign up for activity alerts, special offers, & more! Msg freq may vary. Msg & data rates may apply. Reply HELP for help, STOP to opt-out &nbsp;
                                              <span className="term-privacy-class">
                                                <Link href="#">
                                                  Terms & Conditions |
                                                </Link>
                                                <Link href="#">
                                                   Privacy Policy.
                                                </Link>
                                              </span>
                                            </span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-12">
                                        <label className="mt-3 non-nego-txt">
                                          <bdi>Profile Privacy Settings</bdi>
                                          <p className="mt-2">Choose who can see your profile (can be changed later)</p>
                                        </label>

                                        <div className="row">
                                          <div className="col-xl-4 col-lg-8 col-md-6 my-3">
                                            <bdi className="d-block position-relative">
                                              <select className="comn-input-style form-select w-100 ps-3">
                                                <option>Everyone</option>
                                                <option>Friends</option>
                                                <option>Only Me</option>
                                              </select>
                                            </bdi>
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col-xxl-3 col-xl-4 mt-3 col-md-6 mx-md-0 mx-sm-auto">
                                            <button
                                              className="comn-btn-class w-100"
                                              type="button"
                                              onClick={() => {
                                                setProfileState({
                                                  ...profileState,
                                                  editProfile: false,
                                                  newpost: false,
                                                  addpost: false,
                                                });
                                              }}
                                            >
                                              Save
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                          {/* ================== NEW POST  ================== */}

                          {profileState.newpost && (
                            <>
                              <div className="mt-3 mt-lg-0 tabs-heading-txt">
                                <h5 className="mb-0">Add New Post</h5>
                              </div>
                              <div className="row">
                                <div className="col-12">
                                  <div className="edit-profile-main p-3 mt-3">
                                    <div className="make-a-deal-top-title">
                                      <label className="activity-innr-lable mb-3">Image/Video</label>
                                    </div>
                                    <div className="upload-img-comn-cust d-flex align-items-center">
                                      <div className="upload-box mx-auto p-2">
                                        <label htmlFor="upload-img" className="w-100">
                                          <div className="d-flex align-items-center justify-content-center flex-column ">
                                            <img src="../assets/images/cloud-upload1.png" alt="" />
                                            <p className="m-0">Upload JPG, PNG, Video</p>
                                            <span className="comn-white-btn mt-3 w-auto" data="Choose File"></span>
                                          </div>
                                          <input type="file" id="upload-img" name="upload-img" hidden />
                                        </label>
                                      </div>
                                    </div>
                                    <div className="make-a-deal-top-title mt-3">
                                      <label className="activity-innr-lable">Link (Optional)</label>
                                      <input type="text" className="form-control comn-input-style ps-3 mt-3" name="text" />
                                    </div>
                                    <div className="make-a-deal-top-title mt-3">
                                      <label className="activity-innr-lable">Description</label>
                                    </div>
                                    <div className="">
                                      <textarea className=" ps-3 comn-input-style  form-control h-auto" rows={5} placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
                                    </div>
                                    <div className="row me-0">
                                      <div className="col-lg-2 col-sm-3 col-6 mt-3 pe-0">
                                        <button type="button" className="comn-btn-class-darkgray w-100" onClick={() => handleProfileClick("addpost")}>
                                          ADD
                                        </button>
                                      </div>
                                      <div className="col-lg-2 col-sm-3 col-6 mt-3 pe-0">
                                        <button
                                          type="button"
                                          className="comn-declined-btn w-100"
                                          onClick={() => {
                                            setProfileState({
                                              ...profileState,
                                              editProfile: false,
                                              newpost: false,
                                              addpost: false,
                                            });
                                          }}
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                          {/* ================== ADD POST  ================== */}

                          {profileState.addpost && (
                            <>
                              <div className="mt-3 mt-lg-0 tabs-heading-txt">
                                <h5 className="mb-0">Add New Post</h5>
                              </div>
                              <div className="row">
                                <div className="col-12">
                                  <div className="edit-profile-main p-3 mt-3">
                                    <div className="make-a-deal-top-title">
                                      <label className="activity-innr-lable mb-3">Image/Video</label>
                                    </div>
                                    <div className="upload-img-comn-cust d-flex align-items-center">
                                      <div className="upload-1-img-div p-3">
                                        <img src="./assets/images/upload-1.png" alt="" />
                                      </div>
                                      <div className="upload-box1 p-2">
                                        <label htmlFor="upload-img" className="w-100">
                                          <div className="d-flex align-items-center justify-content-center flex-column ">
                                            <img src="../assets/images/cloud-upload1.png" alt="" />
                                            <p className="m-0">Upload JPG, PNG, Video</p>
                                            <span className="comn-white-btn mt-3 w-auto" data="Choose File"></span>
                                          </div>
                                          <input type="file" id="upload-img" name="upload-img" hidden />
                                        </label>
                                      </div>
                                    </div>
                                    <div className="make-a-deal-top-title mt-3">
                                      <label className="activity-innr-lable">Link (Optional)</label>
                                      <input type="text" className="form-control comn-input-style ps-3 mt-3" name="text" />
                                    </div>
                                    <div className="make-a-deal-top-title mt-3">
                                      <label className="activity-innr-lable">Description</label>
                                    </div>
                                    <div className="">
                                      <textarea className=" ps-3 comn-input-style  form-control h-auto" rows={5} placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
                                    </div>
                                    <div className="row me-0">
                                      <div className="col-lg-2 col-sm-3 col-6 mt-3 pe-0">
                                        <button
                                          type="button"
                                          className="comn-btn-class w-100"
                                          onClick={() => {
                                            setProfileState({
                                              ...profileState,
                                              editProfile: false,
                                              newpost: false,
                                              addpost: false,
                                            });
                                          }}
                                        >
                                          ADD
                                        </button>
                                      </div>
                                      <div className="col-lg-2 col-sm-3 col-6 mt-3 pe-0">
                                        <button
                                          type="button"
                                          className="comn-declined-btn w-100"
                                          onClick={() => {
                                            setProfileState({
                                              ...profileState,
                                              editProfile: false,
                                              newpost: false,
                                              addpost: false,
                                            });
                                          }}
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </Tab.Pane>
                        <Tab.Pane eventKey="offer">
                          {offerState.pending === false && offerState.inProgress === false && offerState.completed === false && offerState.inReview === false && offerState.cancel === false && (
                            <>
                              <div className="mt-3 mt-md-0 d-sm-flex align-items-center">
                                <div className=" tabs-heading-txt">
                                  <h5>Offers</h5>
                                </div>
                                <span className="ms-auto d-flex align-items-center comn-gry-txt">
                                  <svg width="20" height="20" viewBox="0 0 26 22" className="me-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.25 16L24.25 11M24.25 11L19.25 6M24.25 11L6.75 11M14.25 16V17.25C14.25 19.3211 12.5711 21 10.5 21H5.5C3.42893 21 1.75 19.3211 1.75 17.25V4.75C1.75 2.67893 3.42893 1 5.5 1H10.5C12.5711 1 14.25 2.67893 14.25 4.75V6" stroke="#7B838A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                  Exit Profile
                                </span>
                              </div>
                              <div className="mt-3 d-sm-flex align-items-center mb-3">
                                <div className="position-relative mt-3 mt-sm-0">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6C6A81" className="bi bi-search fix-in-icon" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                  </svg>
                                  <input type="input" className="form-control login-comn-input searchbar ps-5" placeholder="Search" />
                                </div>
                                <div className="ps-sm-3 mt-3 mt-sm-0">
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
                              <div className="row">
                                <div className=" col-md-6 mb-3">
                                  <div className="deal-personal-box-div p-3" onClick={() => handleOfferClick("pending")}>
                                    <div className="row">
                                      <div className="col-xxl-3 col-xl-4 col-md-12 col-sm-3">
                                        <div className="deal-personal-img ">
                                          <img src="../assets/images/deal-personal-img.png" alt="" />
                                        </div>
                                      </div>
                                      <div className="col-xxl-9 col-xl-8 col-md-12 col-sm-9 mt-3 mt-xl-0">
                                        <div className="deal-profile-img-class d-flex">
                                          <span className="energy-div">
                                            <img src="../assets/images/energy-icon.svg" alt="" />
                                          </span>
                                          <div className="ms-3">
                                            <bdi>Wally Energy Bareisu....</bdi>
                                            <span className="comn-status-class pending-class">Pending</span>
                                          </div>
                                        </div>
                                        <div className="deal-personal-detail">
                                          <ul>
                                            <li className="d-flex">
                                              <span>Date : :</span>
                                              <bdi className="ms-auto">08/12/22</bdi>
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
                                          <img src="./assets/images/available-social-icon.png" alt="" />
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className=" col-md-6 mb-3">
                                  <div className="deal-personal-box-div p-3" onClick={() => handleOfferClick("inProgress")}>
                                    <div className="row">
                                      <div className="col-xxl-3 col-xl-4 col-md-12 col-sm-3">
                                        <div className="deal-personal-img ">
                                          <img src="../assets/images/deal-personal-img.png" alt="" />
                                        </div>
                                      </div>
                                      <div className="col-xxl-8 col-xl-8 col-md-12 col-sm-9 mt-3 mt-xl-0">
                                        <div className="deal-profile-img-class d-flex">
                                          <span className="energy-div">
                                            <img src="../assets/images/energy-icon.svg" alt="" />
                                          </span>
                                          <div className="ms-3">
                                            <bdi>Wally Energy Bareisu....</bdi>
                                            <span className="comn-status-class inprogress-class">InProgress</span>
                                          </div>
                                        </div>
                                        <div className="deal-personal-detail">
                                          <ul>
                                            <li className="d-flex">
                                              <span>Date : :</span>
                                              <bdi className="ms-auto">08/12/22</bdi>
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
                                          <img src="./assets/images/available-social-icon.png" alt="" />
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                          {/* // ============================================== (Pending ) ============================================ // */}
                          {offerState.pending && (
                            <>
                              <div className="mt-3 mt-md-0 tabs-heading-txt">
                                <h5 className="mb-0">Deal Details</h5>
                              </div>
                              <div className="market-head-txt">
                                <span>
                                  Offers &gt;
                                  <bdi> Deal Details</bdi>
                                </span>
                              </div>
                              <div className="row">
                                <div className="col-12 mt-3">
                                  <div className="tab-innr-content p-3">
                                    <div className="d-flex">
                                      <div>
                                        <img src="../assets/images/deal-detail-profile.png" alt=""/>
                                      </div>
                                      <div className="ms-3 requester-name">
                                        <bdi className="">To John Doe</bdi>
                                        <span className="comn-status-class pending-class">Pending</span>
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
                                              <img src="./assets/images/Facebook-icon.png" className="me-2" alt="" />
                                              Facebook
                                            </span>
                                          </label>
                                          <label className="cust-chk-bx-soc p-0">
                                            <input type="checkbox" />
                                            <span className="cust-trend-chkbox">
                                              <img src="./assets/images/instagram-icon.png" className="me-2" alt="" />
                                              Instagram
                                            </span>
                                          </label>
                                          <label className="cust-chk-bx-soc p-0">
                                            <input type="checkbox" />
                                            <span className="cust-trend-chkbox">
                                              <img src="./assets/images/twitter-icon.png" className="me-2" alt=""/>
                                              Twitter
                                            </span>
                                          </label>
                                          <label className="cust-chk-bx-soc p-0">
                                            <input type="checkbox" />
                                            <span className="cust-trend-chkbox">
                                              <img src="./assets/images/Tik-Tok-icon.png" className="me-2" alt=""/>
                                              Tik Tok
                                            </span>
                                          </label>
                                          <label className="cust-chk-bx-soc p-0">
                                            <input type="checkbox" />
                                            <span className="cust-trend-chkbox">
                                              <img src="./assets/images/other-social-icon.svg" className="me-2" alt=""/>
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
                                      <div className="col-xl-2 col-md-3 col-sm-6 mt-3">
                                        <button className="gray-btn w-100">Decline</button>
                                      </div>
                                      <div className="col-xl-2 col-md-3 col-sm-6 mt-3">
                                        <button
                                          className="comn-btn-class"
                                          onClick={() => {
                                            setOfferState({
                                              ...offerState,
                                              pending: false,
                                              inProgress: false,
                                              completed: false,
                                              inReview: false,
                                              cancel: false,
                                            });
                                          }}
                                        >
                                          Accept
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                          {/* // ============================================== ( in progress ) ============================================ // */}
                          {offerState.inProgress && (
                            <>
                              <div className="mt-3 mt-md-0 tabs-heading-txt">
                                <h5 className="mb-0">Deal Details</h5>
                              </div>
                              <div className="market-head-txt">
                                <span>
                                  Offers &gt;
                                  <bdi> Deal Details</bdi>
                                </span>
                              </div>
                              <div className="row">
                                <div className="col-12 mt-3">
                                  <div className="tab-innr-content p-3">
                                    <div className="d-flex">
                                      <div>
                                        <img src="../assets/images/deal-detail-profile.png" alt=""/>
                                      </div>
                                      <div className="ms-3 requester-name">
                                        <bdi className="">To John Doe</bdi>
                                        <span className="comn-status-class inprogress-class">In Progress</span>
                                      </div>
                                      <span className="ms-auto">
                                        <img src="../assets/images/chat-icn.svg" alt=""/>
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
                                              <img src="./assets/images/Facebook-icon.png" className="me-2" alt=""/>
                                              Facebook
                                            </span>
                                          </label>
                                          <label className="cust-chk-bx-soc p-0">
                                            <input type="checkbox" />
                                            <span className="cust-trend-chkbox">
                                              <img src="./assets/images/instagram-icon.png" className="me-2" alt="" />
                                              Instagram
                                            </span>
                                          </label>
                                          <label className="cust-chk-bx-soc p-0">
                                            <input type="checkbox" />
                                            <span className="cust-trend-chkbox">
                                              <img src="./assets/images/twitter-icon.png" className="me-2" alt="" />
                                              Twitter
                                            </span>
                                          </label>
                                          <label className="cust-chk-bx-soc p-0">
                                            <input type="checkbox" />
                                            <span className="cust-trend-chkbox">
                                              <img src="./assets/images/Tik-Tok-icon.png" className="me-2" alt=""/>
                                              Tik Tok
                                            </span>
                                          </label>
                                          <label className="cust-chk-bx-soc p-0">
                                            <input type="checkbox" />
                                            <span className="cust-trend-chkbox">
                                              <img src="./assets/images/other-social-icon.svg" className="me-2" alt=""/>
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
                                      <div className="col-lg-3 col-sm-6 mt-3">
                                        <button
                                          className="comn-btn-class"
                                          onClick={() => {
                                            setOfferState({
                                              ...offerState,
                                              pending: false,
                                              inProgress: false,
                                              completed: false,
                                              inReview: false,
                                              cancel: false,
                                            });
                                          }}
                                        >
                                          Ask for review
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                          {/* // ============================================== ( Payment notice bottom)============================================ // */}

                          {/* <div className="d-flex align-items-center">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9 5H11V7H9V5ZM9 9H11V15H9V9ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z"
                                fill="#7B838A"
                              />
                            </svg>

                            <p className="mb-0 ms-2 payment-notice">
                              Payment are still in a process, it will
                              take upto 3 - 5 Business days. It will
                              automatically credited on your account.
                            </p>
                          </div> */}
                        </Tab.Pane>
                        <Tab.Pane eventKey="request">
                          {reqState.reqPending === false && reqState.reqProgress === false && reqState.reqInReview === false && reqState.reqCompleted === false && reqState.reqPaymentProcess === false && (
                            <>
                              <div className="mt-3 mt-md-0 d-sm-flex align-items-center">
                                <div className="tabs-heading-txt">
                                  <h5>Request</h5>
                                </div>
                                <span className="ms-auto d-flex align-items-center comn-gry-txt">
                                  <svg width="20" height="20" viewBox="0 0 26 22" className="me-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.25 16L24.25 11M24.25 11L19.25 6M24.25 11L6.75 11M14.25 16V17.25C14.25 19.3211 12.5711 21 10.5 21H5.5C3.42893 21 1.75 19.3211 1.75 17.25V4.75C1.75 2.67893 3.42893 1 5.5 1H10.5C12.5711 1 14.25 2.67893 14.25 4.75V6" stroke="#7B838A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                  Exit Profile
                                </span>
                              </div>
                              <div className="d-sm-flex align-items-center mb-3">
                                <div className="position-relative mt-3 mt-md-0">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6C6A81" className="bi bi-search fix-in-icon" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                  </svg>
                                  <input type="input" className="form-control login-comn-input searchbar ps-5" placeholder="Search" />
                                </div>
                                <div className="ps-sm-3 mt-3 mt-md-0">
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
                              <div className="row">
                                <div className=" col-md-6 mb-3 ">
                                  <div className="deal-personal-box-div p-3" onClick={() => handleReqClick("reqPending")}>
                                    <div className="row">
                                      <div className="col-xxl-3 col-xl-4 col-md-12 col-sm-3">
                                        <div className="deal-personal-img ">
                                          <img src="../assets/images/deal-personal-img.png" alt="" />
                                        </div>
                                      </div>
                                      <div className="col-xxl-9 col-xl-8 col-md-12 col-sm-9 mt-3 mt-xl-0">
                                        <div className="deal-profile-img-class d-flex">
                                          <span className="energy-div">
                                            <img src="../assets/images/energy-icon.svg" alt=""/>
                                          </span>
                                          <div className="ms-3">
                                            <bdi>Wally Energy Bareisu....</bdi>
                                            <span className="comn-status-class pending-class">Pending</span>
                                          </div>
                                        </div>
                                        <div className="deal-personal-detail">
                                          <ul>
                                            <li className="d-flex">
                                              <span>Date : :</span>
                                              <bdi className="ms-auto">08/12/22</bdi>
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
                                          <img src="./assets/images/available-social-icon.png" alt="" />
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className=" col-md-6 mb-3 ">
                                  <div className="deal-personal-box-div p-3" onClick={() => handleReqClick("reqProgress")}>
                                    <div className="row">
                                      <div className="col-xxl-3 col-xl-4 col-md-12 col-sm-3">
                                        <div className="deal-personal-img ">
                                          <img src="../assets/images/deal-personal-img.png" alt="" />
                                        </div>
                                      </div>
                                      <div className="col-xxl-9 col-xl-8 col-md-12 col-sm-9 mt-3 mt-xl-0">
                                        <div className="deal-profile-img-class d-flex">
                                          <span className="energy-div">
                                            <img src="../assets/images/energy-icon.svg" alt=""/>
                                          </span>
                                          <div className="ms-3">
                                            <bdi>Wally Energy Bareisu....</bdi>
                                            <span className="comn-status-class inprogress-class">In Progress</span>
                                          </div>
                                        </div>
                                        <div className="deal-personal-detail">
                                          <ul>
                                            <li className="d-flex">
                                              <span>Date : :</span>
                                              <bdi className="ms-auto">08/12/22</bdi>
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
                                          <img src="./assets/images/available-social-icon.png" alt="" />
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className=" col-md-6 mb-3 ">
                                  <div className="deal-personal-box-div p-3" onClick={() => handleReqClick("reqInReview")}>
                                    <div className="row">
                                      <div className="col-xxl-3 col-xl-4 col-md-12 col-sm-3">
                                        <div className="deal-personal-img ">
                                          <img src="../assets/images/deal-personal-img.png" alt="" />
                                        </div>
                                      </div>
                                      <div className="col-xxl-9 col-xl-8 col-md-12 col-sm-9 mt-3 mt-xl-0">
                                        <div className="deal-profile-img-class d-flex">
                                          <span className="energy-div">
                                            <img src="../assets/images/energy-icon.svg" alt=""/>
                                          </span>
                                          <div className="ms-3">
                                            <bdi>Wally Energy Bareisu....</bdi>
                                            <span className="comn-status-class review-class">In Review</span>
                                          </div>
                                        </div>
                                        <div className="deal-personal-detail">
                                          <ul>
                                            <li className="d-flex">
                                              <span>Date : :</span>
                                              <bdi className="ms-auto">08/12/22</bdi>
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
                                          <img src="./assets/images/available-social-icon.png" alt="" />
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className=" col-md-6 mb-3 ">
                                  <div className="deal-personal-box-div p-3" onClick={() => handleReqClick("reqPaymentProcess")}>
                                    <div className="row">
                                      <div className="col-xxl-3 col-xl-4 col-md-12 col-sm-3">
                                        <div className="deal-personal-img ">
                                          <img src="../assets/images/deal-personal-img.png" alt="" />
                                        </div>
                                      </div>
                                      <div className="col-xxl-9 col-xl-8 col-md-12 col-sm-9 mt-3 mt-xl-0">
                                        <div className="deal-profile-img-class d-flex">
                                          <span className="energy-div">
                                            <img src="../assets/images/energy-icon.svg" alt=""/>
                                          </span>
                                          <div className="ms-3">
                                            <bdi>Wally Energy Bareisu....</bdi>
                                            <span className="comn-status-class progress-class">Payment Process</span>
                                          </div>
                                        </div>
                                        <div className="deal-personal-detail">
                                          <ul>
                                            <li className="d-flex">
                                              <span>Date : :</span>
                                              <bdi className="ms-auto">08/12/22</bdi>
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
                                          <img src="./assets/images/available-social-icon.png" alt="" />
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className=" col-md-6 mb-3 ">
                                  <div className="deal-personal-box-div p-3" onClick={() => handleReqClick("reqCompleted")}>
                                    <div className="row">
                                      <div className="col-xxl-3 col-xl-4 col-md-12 col-sm-3">
                                        <div className="deal-personal-img ">
                                          <img src="../assets/images/deal-personal-img.png" alt="" />
                                        </div>
                                      </div>
                                      <div className="col-xxl-9 col-xl-8 col-md-12 col-sm-9 mt-3 mt-xl-0">
                                        <div className="deal-profile-img-class d-flex">
                                          <span className="energy-div">
                                            <img src="../assets/images/energy-icon.svg" alt=""/>
                                          </span>
                                          <div className="ms-3">
                                            <bdi>Wally Energy Bareisu....</bdi>
                                            <span className="comn-status-class complete-class">Completed</span>
                                          </div>
                                        </div>
                                        <div className="deal-personal-detail">
                                          <ul>
                                            <li className="d-flex">
                                              <span>Date : :</span>
                                              <bdi className="ms-auto">08/12/22</bdi>
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
                                          <img src="./assets/images/available-social-icon.png" alt="" />
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                          {/* // ============================================== ( Req-Pending ) ============================================ // */}

                          {reqState.reqPending && (
                            <>
                              <div className="mt-3 mt-md-0 tabs-heading-txt">
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
                                        <img src="../assets/images/deal-detail-profile.png" alt="" />
                                      </div>
                                      <div className="ms-3 requester-name">
                                        <bdi className="">To John Doe</bdi>
                                        <span className="comn-status-class pending-class">pending</span>
                                      </div>
                                      <span className="ms-auto">
                                        <img src="../assets/images/chat-icn.svg" alt=""/>
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
                                              <img src="./assets/images/Facebook-icon.png" alt="" className="me-2" />
                                              Facebook
                                            </span>
                                          </label>
                                          <label className="cust-chk-bx-soc p-0">
                                            <input type="checkbox" />
                                            <span className="cust-trend-chkbox">
                                              <img src="./assets/images/instagram-icon.png"  alt="" className="me-2" />
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
                                      <div className="col-xl-2 col-md-3 col-sm-6 mt-3">
                                        <button className="gray-btn w-100">Decline</button>
                                      </div>
                                      <div className="col-xl-2 col-md-3 col-sm-6 mt-3">
                                        <button
                                          className="comn-btn-class"
                                          onClick={() => {
                                            setReqState({
                                              ...reqState,
                                              reqPending: false,
                                              reqProgress: false,
                                              reqInReview: false,
                                              reqCompleted: false,
                                            });
                                          }}
                                        >
                                          Accept
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                          {/* // ============================================== ( Req-Progress ) ============================================ // */}

                          {reqState.reqProgress && (
                            <>
                              <div className="mt-3 mt-md-0 tabs-heading-txt">
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
                                              <img src="./assets/images/Facebook-icon.png" className="me-2" alt="" />
                                              Facebook
                                            </span>
                                          </label>
                                          <label className="cust-chk-bx-soc p-0">
                                            <input type="checkbox" />
                                            <span className="cust-trend-chkbox">
                                              <img src="./assets/images/instagram-icon.png" className="me-2" alt="" />
                                              Instagram
                                            </span>
                                          </label>
                                          <label className="cust-chk-bx-soc p-0">
                                            <input type="checkbox" />
                                            <span className="cust-trend-chkbox">
                                              <img src="./assets/images/twitter-icon.png" className="me-2" alt=""/>
                                              Twitter
                                            </span>
                                          </label>
                                          <label className="cust-chk-bx-soc p-0">
                                            <input type="checkbox" />
                                            <span className="cust-trend-chkbox">
                                              <img src="./assets/images/Tik-Tok-icon.png" className="me-2" alt=""/>
                                              Tik Tok
                                            </span>
                                          </label>
                                          <label className="cust-chk-bx-soc p-0">
                                            <input type="checkbox" />
                                            <span className="cust-trend-chkbox">
                                              <img src="./assets/images/other-social-icon.svg" className="me-2" alt=""/>
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
                                        <button
                                          className="comn-btn-class w-100"
                                          onClick={() => {
                                            setReqState({
                                              ...reqState,
                                              reqPending: false,
                                              reqProgress: false,
                                              reqInReview: false,
                                              reqCompleted: false,
                                            });
                                          }}
                                        >
                                          Ask for review
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                          {/* // ============================================== ( Req-In Review ) ============================================ // */}

                          {reqState.reqInReview && (
                            <>
                              <div className="mt-3 mt-md-0 tabs-heading-txt">
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
                                        <img src="../assets/images/deal-detail-profile.png" alt=""/>
                                      </div>
                                      <div className="ms-3 requester-name">
                                        <bdi className="">To John Doe</bdi>
                                        <span className="comn-status-class review-class">In Review</span>
                                      </div>
                                      <span className="ms-auto">
                                        <img src="../assets/images/chat-icn.svg" alt=""/>
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
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                          {/* // ============================================== ( Req Payment Process ) ============================================ // */}

                          {reqState.reqPaymentProcess && (
                            <>
                              <div className="mt-3 mt-md-0 tabs-heading-txt">
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
                                        <img src="../assets/images/deal-detail-profile.png" alt="" />
                                      </div>
                                      <div className="ms-3 requester-name">
                                        <bdi className="">To John Doe</bdi>
                                        <span className="comn-status-class progress-class">Payment Process</span>
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
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                          {/* // ============================================== ( Req-Completed ) ============================================ // */}

                          {reqState.reqCompleted && (
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
                                        <button className="comn-white-btn mt-3" data="Check Transaction"></button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </Tab.Pane>
                        <Tab.Pane eventKey="team">
                          {teamState.team === false && teamState.teamDetail === false && teamState.teamInvite === false && (
                            <>
                              <div className="row">
                                <div className="col-12 mt-3 mt-md-0">
                                  <div className="d-sm-flex align-items-center">
                                    <div className="tabs-heading-txt">
                                      <h5>Team</h5>
                                    </div>
                                    <span className="ms-auto d-flex align-items-center comn-gry-txt">
                                      <svg width="20" height="20" viewBox="0 0 26 22" className="me-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.25 16L24.25 11M24.25 11L19.25 6M24.25 11L6.75 11M14.25 16V17.25C14.25 19.3211 12.5711 21 10.5 21H5.5C3.42893 21 1.75 19.3211 1.75 17.25V4.75C1.75 2.67893 3.42893 1 5.5 1H10.5C12.5711 1 14.25 2.67893 14.25 4.75V6" stroke="#7B838A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                      Exit Profile
                                    </span>
                                  </div>
                                </div>
                                <div className="col-sm-6 mt-3">
                                  <div className="position-relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6C6A81" className="bi bi-search fix-in-icon" viewBox="0 0 16 16">
                                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                    <input type="input" className="form-control login-comn-input searchbar ps-5" placeholder="Search" />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12 mt-3">
                                  <div className="team-staff-div">
                                    <h6>Your Team</h6>
                                    <div className="row">
                                      <div className="col-xl-3 col-lg-4 col-sm-6">
                                        <div className="team-box-class" onClick={() => handleTeamClick("teamDetail")}>
                                          <div className="team-img-div mx-auto">
                                            <img src="../assets/images/team-ball-img.svg" alt="" />
                                          </div>
                                          <div className="team-body-txt">
                                            <span>Fearless Wizards</span>
                                            <div className="">
                                              <p className="position-relative">
                                                Soccerball <bdi></bdi> spring 2022
                                              </p>
                                              <p className="mb-0 mt-auto">Santa Barbara, US</p>
                                              <div className="mt-3 joined-team">
                                                <bdi>Joined</bdi>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 mt-4 mb-3">
                                  <div className="team-staff-div">
                                    <h6>College Teams</h6>
                                    <div className="row">
                                      <div className="col-xl-3 col-lg-4 col-sm-6 mb-3">
                                        <div className="team-box-class" onClick={() => handleTeamClick("team")}>
                                          <div className="team-img-div mx-auto">
                                            <img src="../assets/images/team-ball-img.svg"  alt=""/>
                                          </div>
                                          <div className="team-body-txt">
                                            <span>Fearless Wizards</span>
                                            <div className="">
                                              <p className="position-relative">
                                                Soccerball <bdi></bdi> spring 2022
                                              </p>
                                              <p className="mb-0 mt-auto">Santa Barbara, US</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-xl-3 col-lg-4 col-sm-6 mb-3">
                                        <div className="team-box-class" onClick={() => handleTeamClick("team")}>
                                          <div className="team-img-div mx-auto">
                                            <img src="../assets/images/team-ball-img.svg" alt=""/>
                                          </div>
                                          <div className="team-body-txt">
                                            <span>Tough Bison</span>
                                            <div className="">
                                              <p className="position-relative">
                                                baseball <bdi></bdi> spring 2022
                                              </p>
                                              <p className="mb-0 mt-auto">Santa Barbara, US</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-xl-3 col-lg-4 col-sm-6 mb-3">
                                        <div className="team-box-class" onClick={() => handleTeamClick("team")}>
                                          <div className="team-img-div mx-auto">
                                            <img src="../assets/images/team-ball-img.svg" alt=""/>
                                          </div>
                                          <div className="team-body-txt">
                                            <span>Silent Zebras</span>
                                            <div className="">
                                              <p className="position-relative">
                                                Football <bdi></bdi> spring 2022
                                              </p>
                                              <p className="mb-0 mt-auto">Santa Barbara, US</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-xl-3 col-lg-4 col-sm-6 mb-3">
                                        <div className="team-box-class" onClick={() => handleTeamClick("team")}>
                                          <div className="team-img-div mx-auto">
                                            <img src="../assets/images/team-ball-img.svg" alt=""/>
                                          </div>
                                          <div className="team-body-txt">
                                            <span>Fearless Wizards</span>
                                            <div className="">
                                              <p className="position-relative">
                                                Basketball <bdi></bdi> spring 2022
                                              </p>
                                              <p className="mb-0 mt-auto">Santa Barbara, US</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                          {/* ======================== Team Detail ====================== */}

                          {teamState.team && (
                            <>
                              <div className="row">
                                <div className="col-12 mt-3 mt-md-0 d-sm-flex align-items-center">
                                  <div>
                                    <div className="tabs-heading-txt">
                                      <h5 className="mb-0">Team Details</h5>
                                    </div>
                                    <div className="market-head-txt">
                                      <span>
                                        Team &gt;
                                        <bdi> Team Details</bdi>
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-12 mt-3">
                                  <div className="d-sm-flex align-items-center justify-content-between team-join-class p-3">
                                    <div className="d-flex align-items-center">
                                      <div className="team-img-div">
                                        <img src="../assets/images/team-ball-img.svg" alt=""/>
                                      </div>
                                      <div className="ms-3 team-detail-name">
                                        <span>Fearless Wizards</span>
                                        <p className="position-relative mb-0">
                                          Basketball <bdi></bdi> spring 2022
                                        </p>
                                      </div>
                                    </div>
                                    <div className="ps-md-3 mt-3 mt-sm-0">
                                      <button className="comn-btn-class px-4">Join Team</button>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 mt-3">
                                  <div className="row">
                                    <div className="col-12 mt-3">
                                      <div className="team-staff-div">
                                        <h6>Coaches (1)</h6>
                                        <div className="row">
                                          <div className="col-2 mb-3 team-col-class">
                                            <div className="team-staff-box">
                                              <div className="mb-2">
                                                <img src="../assets/images/staff-img.png" alt=""/>
                                              </div>
                                              <p className="mt-auto mb-0">John Doe</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-12">
                                      <div className="team-staff-div">
                                        <h6>Players (8)</h6>
                                        <div className="row">
                                          <div className="col-2 mb-3 team-col-class">
                                            <div className="team-staff-box">
                                              <div className="mb-2">
                                                <img src="../assets/images/staff-img.png" alt=""/>
                                              </div>
                                              <span>#01</span>
                                              <p className="mt-auto mb-0">John Doe</p>
                                            </div>
                                          </div>
                                          <div className="col-2 mb-3 team-col-class">
                                            <div className="team-staff-box">
                                              <div className="mb-2">
                                                <img src="../assets/images/staff-img.png" alt=""/>
                                              </div>
                                              <span>#02</span>
                                              <p className="mt-auto mb-0">John Doe</p>
                                            </div>
                                          </div>
                                          <div className="col-2 mb-3 team-col-class">
                                            <div className="team-staff-box">
                                              <div className="mb-2">
                                                <img src="../assets/images/staff-img.png" alt="" />
                                              </div>
                                              <span>#05</span>
                                              <p className="mt-auto mb-0">John Doe</p>
                                            </div>
                                          </div>
                                          <div className="col-2 mb-3 team-col-class">
                                            <div className="team-staff-box">
                                              <div className="mb-2">
                                                <img src="../assets/images/staff-img.png" alt=""/>
                                              </div>
                                              <span>#06</span>
                                              <p className="mt-auto mb-0">John Doe</p>
                                            </div>
                                          </div>
                                          <div className="col-2 mb-3 team-col-class">
                                            <div className="team-staff-box">
                                              <div className="mb-2">
                                                <img src="../assets/images/staff-img.png" alt=""/>
                                              </div>
                                              <span>#03</span>
                                              <p className="mt-auto mb-0">John Doe</p>
                                            </div>
                                          </div>
                                          <div className="col-2 mb-3 team-col-class">
                                            <div className="team-staff-box">
                                              <div className="mb-2">
                                                <img src="../assets/images/staff-img.png" alt=""/>
                                              </div>
                                              <span>#03</span>
                                              <p className="mt-auto mb-0">John Doe</p>
                                            </div>
                                          </div>
                                          <div className="col-2 mb-3 team-col-class">
                                            <div className="team-staff-box">
                                              <div className="mb-2">
                                                <img src="../assets/images/staff-img.png" alt="" />
                                              </div>
                                              <span>#03</span>
                                              <p className="mt-auto mb-0">John Doe</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                          {/* ======================== Team Detail Member Schedule Update ====================== */}

                          {teamState.teamDetail && (
                            <>
                              <div className="row">
                                <div className="col-12 mt-3 mt-md-0 d-sm-flex align-items-center">
                                  <div>
                                    <div className="tabs-heading-txt">
                                      <h5 className="mb-0">Team Details</h5>
                                    </div>
                                    <div className="market-head-txt">
                                      <span>
                                        Team &gt;
                                        <bdi> Team Details</bdi>
                                      </span>
                                    </div>
                                  </div>
                                  <div className="ms-auto ps-sm-3 mt-3 mt-sm-0">
                                    <button className="gray-btn" onClick={() => handleTeamClick("teamInvite")}>
                                      <img src="./assets/images/team-union.png" alt="" />
                                    </button>
                                  </div>
                                </div>
                                <div className="col-12 mt-3">
                                  <div className="d-md-flex align-items-center justify-content-between team-join-class p-3">
                                    <div className="d-flex align-items-center">
                                      <div className="team-img-div">
                                        <img src="../assets/images/team-ball-img.svg" alt=""/>
                                      </div>
                                      <div className="ms-3 team-detail-name">
                                        <span>Fearless Wizards</span>
                                        <p className="position-relative mb-0">
                                          Basketball <bdi></bdi> spring 2022
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 mt-3">
                                  <Tab.Container id="left-tabs-example" defaultActiveKey="members">
                                    <div className="comn-tab-sec  position-relative">
                                      <Nav variant="pills">
                                        <Nav.Item>
                                          <Nav.Link eventKey="members">Members</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                          <Nav.Link eventKey="schedule">Schedule</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                          <Nav.Link eventKey="update">Update</Nav.Link>
                                        </Nav.Item>
                                      </Nav>
                                    </div>
                                    <Tab.Content>
                                      <Tab.Pane eventKey="members">
                                        <div className="row">
                                          <div className="col-12 mt-3">
                                            <div className="team-staff-div">
                                              <h6>Team Staff (1)</h6>
                                              <div className="row">
                                                <div className="col-2 mb-3 team-col-class">
                                                  <div className="team-staff-box">
                                                    <div className="mb-2">
                                                      <img src="../assets/images/staff-img.png" alt=""/>
                                                    </div>
                                                    <p className="mt-auto mb-0">John Doe</p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-12">
                                            <div className="team-staff-div">
                                              <h6>Players (8)</h6>
                                              <div className="row">
                                                <div className="col-2 mb-3 team-col-class">
                                                  <div className="team-staff-box">
                                                    <div className="mb-2">
                                                      <img src="../assets/images/staff-img.png" alt=""/>
                                                    </div>
                                                    <span>#01</span>
                                                    <p className="mt-auto mb-0">John Doe</p>
                                                  </div>
                                                </div>
                                                <div className="col-2 mb-3 team-col-class">
                                                  <div className="team-staff-box">
                                                    <div className="mb-2">
                                                      <img src="../assets/images/staff-img.png" alt=""/>
                                                    </div>
                                                    <span>#02</span>
                                                    <p className="mt-auto mb-0">John Doe</p>
                                                  </div>
                                                </div>
                                                <div className="col-2 mb-3 team-col-class">
                                                  <div className="team-staff-box">
                                                    <div className="mb-2">
                                                      <img src="../assets/images/staff-img.png" alt=""/>
                                                    </div>
                                                    <span>#05</span>
                                                    <p className="mt-auto mb-0">John Doe</p>
                                                  </div>
                                                </div>
                                                <div className="col-2 mb-3 team-col-class">
                                                  <div className="team-staff-box">
                                                    <div className="mb-2">
                                                      <img src="../assets/images/staff-img.png" alt=""/>
                                                    </div>
                                                    <span>#06</span>
                                                    <p className="mt-auto mb-0">John Doe</p>
                                                  </div>
                                                </div>
                                                <div className="col-2 mb-3 team-col-class">
                                                  <div className="team-staff-box">
                                                    <div className="mb-2">
                                                      <img src="../assets/images/staff-img.png" alt=""/>
                                                    </div>
                                                    <span>#03</span>
                                                    <p className="mt-auto mb-0">John Doe</p>
                                                  </div>
                                                </div>
                                                <div className="col-2 mb-3 team-col-class">
                                                  <div className="team-staff-box">
                                                    <div className="mb-2">
                                                      <img src="../assets/images/staff-img.png" alt="" />
                                                    </div>
                                                    <span>#03</span>
                                                    <p className="mt-auto mb-0">John Doe</p>
                                                  </div>
                                                </div>
                                                <div className="col-2 mb-3 team-col-class">
                                                  <div className="team-staff-box">
                                                    <div className="mb-2">
                                                      <img src="../assets/images/staff-img.png" alt=""/>
                                                    </div>
                                                    <span>#03</span>
                                                    <p className="mt-auto mb-0">John Doe</p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </Tab.Pane>
                                      <Tab.Pane eventKey="schedule">
                                        <div className="row mt-3">
                                          <div className="col-xl-3 col-lg-4 col-sm-6 mb-3 text-center">
                                            <div className="schedule-box-main p-3">
                                              <div className="schedule-date-box mx-auto p-2">
                                                <span>SAT</span>
                                                <bdi>30</bdi>
                                              </div>
                                              <div className="schedule-box-body mt-3">
                                                <span>Fearless Wizards</span>
                                                <bdi>Practice</bdi>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-xl-3 col-lg-4 col-sm-6 mb-3 text-center">
                                            <div className="schedule-box-main p-3">
                                              <div className="schedule-date-box mx-auto p-2">
                                                <span>SAT</span>
                                                <bdi>30</bdi>
                                              </div>
                                              <div className="schedule-box-body mt-3">
                                                <span>Fearless Wizards</span>
                                                <bdi>Practice</bdi>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-xl-3 col-lg-4 col-sm-6 mb-3 text-center">
                                            <div className="schedule-box-main p-3">
                                              <div className="schedule-date-box mx-auto p-2">
                                                <span>SAT</span>
                                                <bdi>30</bdi>
                                              </div>
                                              <div className="schedule-box-body mt-3">
                                                <span>Fearless Wizards</span>
                                                <bdi>Practice</bdi>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-xl-3 col-lg-4 col-sm-6 mb-3 text-center">
                                            <div className="schedule-box-main p-3">
                                              <div className="schedule-date-box mx-auto p-2">
                                                <span>SAT</span>
                                                <bdi>30</bdi>
                                              </div>
                                              <div className="schedule-box-body mt-3">
                                                <span>Fearless Wizards</span>
                                                <bdi>Practice</bdi>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-xl-3 col-lg-4 col-sm-6 mb-3 text-center">
                                            <div className="schedule-box-main p-3">
                                              <div className="schedule-date-box mx-auto p-2">
                                                <span>SAT</span>
                                                <bdi>30</bdi>
                                              </div>
                                              <div className="schedule-box-body mt-3">
                                                <span>Fearless Wizards</span>
                                                <bdi>Practice</bdi>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </Tab.Pane>
                                      <Tab.Pane eventKey="update">
                                        <div className="row">
                                          <div className="col-12 my-3">
                                            <div className="team-update-box-main mt-3 p-3">
                                              <div className="d-flex align-items-center">
                                                <img src="./assets/images/FW-icon.svg" alt="" />
                                                <span className="ms-3">John DoeAP</span>
                                                <div className="ms-auto">
                                                  <bdi>15h</bdi>
                                                </div>
                                              </div>
                                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                                            </div>
                                            <div className="team-update-box-main mt-3 p-3">
                                              <div className="d-flex align-items-center">
                                                <img src="./assets/images/FW-icon.svg" alt="" />
                                                <span className="ms-3">John DoeAP</span>
                                                <div className="ms-auto">
                                                  <bdi>15h</bdi>
                                                </div>
                                              </div>
                                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                                            </div>
                                          </div>
                                        </div>
                                      </Tab.Pane>
                                    </Tab.Content>
                                  </Tab.Container>
                                </div>
                              </div>
                            </>
                          )}

                          {/* =============================== Team Invitation ===================================  */}

                          {teamState.teamInvite && (
                            <>
                              <div className="row">
                                <div className="col-12 mt-3 mt-md-0 d-sm-flex align-items-center">
                                  <div>
                                    <div className="tabs-heading-txt">
                                      <h5 className="mb-0">Team</h5>
                                    </div>
                                    <div className="market-head-txt">
                                      <span>
                                        Team &gt;
                                        <bdi> Invitation</bdi>
                                      </span>
                                    </div>
                                  </div>
                                  <div className="position-relative ms-auto mt-3 mt-sm-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6C6A81" className="bi bi-search fix-in-icon" viewBox="0 0 16 16">
                                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                    <input type="input" className="form-control login-comn-input searchbar ps-5" placeholder="Search" />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-xl-4 col-sm-6 mt-3">
                                  <div className="team-req-box-accept text-center p-3">
                                    <div>
                                      <img src="./assets/images/deal-personal-profile.png" alt="" />
                                      <span>John Doe</span>
                                      <bdi>Team</bdi>
                                    </div>
                                    <div className="d-flex align-items-center">
                                      <button type="button" className="comn-btn-decline  mt-3 ">
                                        Decline
                                      </button>
                                      <button className="comn-white-btn mt-3 ms-3" data="accept"></button>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-4 col-sm-6 mt-3">
                                  <div className="team-req-box-accept text-center p-3">
                                    <div>
                                      <img src="./assets/images/deal-personal-profile.png" alt="" />
                                      <span>John Doe</span>
                                      <bdi>Team</bdi>
                                    </div>
                                    <div className="d-flex align-items-center">
                                      <button type="button" className="comn-btn-decline  mt-3 ">
                                        Decline
                                      </button>
                                      <button className="comn-white-btn mt-3 ms-3" data="accept"></button>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-4 col-sm-6 mt-3">
                                  <div className="team-req-box-accept text-center p-3">
                                    <div>
                                      <img src="./assets/images/deal-personal-profile.png" alt="" />
                                      <span>John Doe</span>
                                      <bdi>Team</bdi>
                                    </div>
                                    <div className="d-flex align-items-center">
                                      <button type="button" className="comn-btn-decline  mt-3 ">
                                        Decline
                                      </button>
                                      <button className="comn-white-btn mt-3 ms-3" data="accept"></button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </Tab.Pane>
                        <Tab.Pane eventKey="event">
                          <div className="row">
                            <div className="col-12 mb-3">
                              <div className="mt-3 mt-md-0 d-sm-flex align-items-center">
                                <div className="tabs-heading-txt">
                                  <h5>Event</h5>
                                </div>
                                <span className="ms-auto d-flex align-items-center comn-gry-txt">
                                  <svg width="20" height="20" viewBox="0 0 26 22" className="me-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.25 16L24.25 11M24.25 11L19.25 6M24.25 11L6.75 11M14.25 16V17.25C14.25 19.3211 12.5711 21 10.5 21H5.5C3.42893 21 1.75 19.3211 1.75 17.25V4.75C1.75 2.67893 3.42893 1 5.5 1H10.5C12.5711 1 14.25 2.67893 14.25 4.75V6" stroke="#7B838A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                  Exit Profile
                                </span>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="position-relative ms-auto mt-3 mt-md-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6C6A81" className="bi bi-search fix-in-icon" viewBox="0 0 16 16">
                                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                                <input type="input" className="form-control login-comn-input searchbar ps-5" placeholder="Search" />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 mt-3">
                              <mark className="event-mark">Upcoming</mark>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-sm-6 mt-3">
                              <div className="team-box-class position-relative">
                                <div className="team-img-div mx-auto position-relative">
                                  <img src="../assets/images/team-ball-img.svg" alt="" />
                                </div>
                                <span className="event-share-icon">
                                  <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.5833 17.3352C12.6816 17.3456 11.827 16.9336 11.2735 16.2216C10.7201 15.5097 10.5316 14.5798 10.7642 13.7085L5.54749 10.7269C4.64607 11.5527 3.32473 11.7275 2.23957 11.1644C1.1544 10.6014 0.536556 9.42038 0.692801 8.20786C0.849045 6.99534 1.7461 6.00956 2.93856 5.73998C4.13101 5.4704 5.36488 5.97445 6.0275 7.00186L10.7633 4.29436C10.7021 4.06285 10.6696 3.82466 10.6667 3.58519C10.6547 2.19079 11.6232 0.979477 12.986 0.68421C14.3488 0.388943 15.7318 1.09081 16.298 2.36512C16.8643 3.63943 16.4583 5.13621 15.3258 5.94978C14.1933 6.76335 12.6452 6.67027 11.6183 5.72686L6.4925 8.65602C6.48742 8.87213 6.45722 9.0869 6.40249 9.29603L11.6183 12.2769C12.5785 11.3956 14.0073 11.2596 15.1166 11.9438C16.2258 12.628 16.7455 13.9658 16.389 15.2194C16.0325 16.473 14.8866 17.3371 13.5833 17.3352ZM13.5833 13.1685C12.893 13.1685 12.3333 13.7282 12.3333 14.4185C12.3333 15.1089 12.893 15.6685 13.5833 15.6685C14.2737 15.6685 14.8333 15.1089 14.8333 14.4185C14.8333 13.7282 14.2737 13.1685 13.5833 13.1685ZM3.58333 7.33519C2.89297 7.33519 2.33333 7.89484 2.33333 8.58519C2.33333 9.27555 2.89297 9.83519 3.58333 9.83519C4.27368 9.83519 4.83333 9.27555 4.83333 8.58519C4.83333 7.89484 4.27368 7.33519 3.58333 7.33519ZM13.5833 2.33519C12.893 2.33519 12.3333 2.89484 12.3333 3.58519C12.3333 4.27555 12.893 4.83519 13.5833 4.83519C14.2737 4.83519 14.8333 4.27555 14.8333 3.58519C14.8333 2.89484 14.2737 2.33519 13.5833 2.33519Z" fill="#7B838A" />
                                  </svg>
                                </span>
                                <div className="team-body-txt">
                                  <span>Fearless Wizards</span>
                                  <div className="">
                                    <p className="position-relative">Santa Barbara Ground</p>
                                    <div className="even-time-btn mt-3">Today 3:00 PM</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-sm-6 mt-3">
                              <div className="team-box-class position-relative">
                                <div className="team-img-div mx-auto position-relative">
                                  <img src="../assets/images/team-ball-img.svg" alt="" />
                                </div>
                                <span className="event-share-icon">
                                  <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.5833 17.3352C12.6816 17.3456 11.827 16.9336 11.2735 16.2216C10.7201 15.5097 10.5316 14.5798 10.7642 13.7085L5.54749 10.7269C4.64607 11.5527 3.32473 11.7275 2.23957 11.1644C1.1544 10.6014 0.536556 9.42038 0.692801 8.20786C0.849045 6.99534 1.7461 6.00956 2.93856 5.73998C4.13101 5.4704 5.36488 5.97445 6.0275 7.00186L10.7633 4.29436C10.7021 4.06285 10.6696 3.82466 10.6667 3.58519C10.6547 2.19079 11.6232 0.979477 12.986 0.68421C14.3488 0.388943 15.7318 1.09081 16.298 2.36512C16.8643 3.63943 16.4583 5.13621 15.3258 5.94978C14.1933 6.76335 12.6452 6.67027 11.6183 5.72686L6.4925 8.65602C6.48742 8.87213 6.45722 9.0869 6.40249 9.29603L11.6183 12.2769C12.5785 11.3956 14.0073 11.2596 15.1166 11.9438C16.2258 12.628 16.7455 13.9658 16.389 15.2194C16.0325 16.473 14.8866 17.3371 13.5833 17.3352ZM13.5833 13.1685C12.893 13.1685 12.3333 13.7282 12.3333 14.4185C12.3333 15.1089 12.893 15.6685 13.5833 15.6685C14.2737 15.6685 14.8333 15.1089 14.8333 14.4185C14.8333 13.7282 14.2737 13.1685 13.5833 13.1685ZM3.58333 7.33519C2.89297 7.33519 2.33333 7.89484 2.33333 8.58519C2.33333 9.27555 2.89297 9.83519 3.58333 9.83519C4.27368 9.83519 4.83333 9.27555 4.83333 8.58519C4.83333 7.89484 4.27368 7.33519 3.58333 7.33519ZM13.5833 2.33519C12.893 2.33519 12.3333 2.89484 12.3333 3.58519C12.3333 4.27555 12.893 4.83519 13.5833 4.83519C14.2737 4.83519 14.8333 4.27555 14.8333 3.58519C14.8333 2.89484 14.2737 2.33519 13.5833 2.33519Z" fill="#7B838A" />
                                  </svg>
                                </span>
                                <div className="team-body-txt">
                                  <span>Fearless Wizards</span>
                                  <div className="">
                                    <p className="position-relative">Santa Barbara Ground</p>
                                    <div className="even-time-btn mt-3">Today 3:00 PM</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 mt-5 mb-3">
                              <mark className="event-mark">Completed Event</mark>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-sm-6 mb-3 text-center">
                              <div className="schedule-box-main p-3">
                                <div className="schedule-date-box mx-auto p-2">
                                  <span>SAT</span>
                                  <bdi>30</bdi>
                                </div>
                                <div className="schedule-box-body mt-3">
                                  <span>Fearless Wizards</span>
                                  <bdi>Practice</bdi>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-sm-6 mb-3 text-center">
                              <div className="schedule-box-main p-3">
                                <div className="schedule-date-box mx-auto p-2">
                                  <span>SAT</span>
                                  <bdi>30</bdi>
                                </div>
                                <div className="schedule-box-body mt-3">
                                  <span>Fearless Wizards</span>
                                  <bdi>Practice</bdi>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-sm-6 mb-3 text-center">
                              <div className="schedule-box-main p-3">
                                <div className="schedule-date-box mx-auto p-2">
                                  <span>SAT</span>
                                  <bdi>30</bdi>
                                </div>
                                <div className="schedule-box-body mt-3">
                                  <span>Fearless Wizards</span>
                                  <bdi>Practice</bdi>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="wallet">
                          {withdrowState.withdraw === false && (
                            <>
                              <div className="mb-3 mt-3 mt-md-0 tabs-heading-txt">
                                <h5>Wallet</h5>
                              </div>
                              <div className="wallet-main p-3">
                                <div className="row">
                                  <div className="col-lg-6">
                                    <div className="mywallet-class position-relative p-3">
                                      <div className="star-img">
                                        <img src="../assets/images/mywallet-star-img.png" alt=""/>
                                      </div>
                                      <p>My Walllet</p>
                                      <div>
                                        <span>Balance</span>
                                        <bdi>$1,548</bdi>
                                        <span>/USD</span>
                                      </div>

                                      <div className="row">
                                        <div className="col-xl-6 col-lg-8 col-md-6 ms-auto">
                                          <div className="d-md-flex mt-3">
                                            <button className="withdraw-btn" onClick={() => handleWithdrowClick("withdraw")}>
                                              <span className="me-2">
                                                <svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M21.8751 7.58333V5.20833C21.8751 4.0625 20.9376 3.125 19.7917 3.125H5.20834C4.05209 3.125 3.125 4.0625 3.125 5.20833V19.7917C3.125 20.9375 4.05209 21.875 5.20834 21.875H19.7917C20.9376 21.875 21.8751 20.9375 21.8751 19.7917V17.4167C22.4896 17.0521 22.9167 16.3958 22.9167 15.625V9.375C22.9167 8.60417 22.4896 7.94792 21.8751 7.58333ZM20.8334 9.375V15.625H13.5417V9.375H20.8334ZM5.20834 19.7917V5.20833H19.7917V7.29167H13.5417C12.3959 7.29167 11.4584 8.22917 11.4584 9.375V15.625C11.4584 16.7708 12.3959 17.7083 13.5417 17.7083H19.7917V19.7917H5.20834Z" fill="#333333" />
                                                  <path d="M16.6667 14.0625C17.5297 14.0625 18.2292 13.3629 18.2292 12.5C18.2292 11.6371 17.5297 10.9375 16.6667 10.9375C15.8038 10.9375 15.1042 11.6371 15.1042 12.5C15.1042 13.3629 15.8038 14.0625 16.6667 14.0625Z" fill="#333333" />
                                                </svg>
                                              </span>
                                              Withdraw
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="mt-3">
                                      <label className="comn-label-class ">Bank Accounts</label>
                                      <div className="cust-radio-box d-flex align-items-center ">
                                        <input name="cc" type="radio" id="creditcard-1" />
                                        <label className="cust-radio-main w-100 card-1" htmlFor="creditcard-1">
                                          <div className="d-flex align-items-center">
                                            <div>
                                              <img src="../assets/images/visa.png" alt=""/>
                                            </div>
                                            <div className="ms-3">
                                              <span>Bank Of America</span>
                                              <p className="mb-0 mt-1">Visa Card - XXX02362</p>
                                            </div>
                                          </div>
                                        </label>
                                      </div>
                                      <div className="cust-radio-box d-flex align-items-center mt-3">
                                        <input name="cc" type="radio" id="creditcard-2" />
                                        <label className="cust-radio-main w-100 card-1" htmlFor="creditcard-2">
                                          <div className="d-flex align-items-center">
                                            <div>
                                              <img src="../assets/images/visa.png" alt=""/>
                                            </div>
                                            <div className="ms-3">
                                              <span>Bank Of America</span>
                                              <p className="mb-0 mt-1">Visa Card - XXX02362</p>
                                            </div>
                                          </div>
                                        </label>
                                      </div>
                                    </div>
                                    <div>
                                      <button className="comn-white-btn mt-3" data="Edit Bank Account" onClick={() => setAddBank(true)}>
                                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="me-2" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M0.5 12.375V15.5H3.625L12.8417 6.28333L9.71667 3.15833L0.5 12.375ZM2.93333 13.8333H2.16667V13.0667L9.71667 5.51667L10.4833 6.28333L2.93333 13.8333ZM15.2583 2.69167L13.3083 0.741667C13.1417 0.575 12.9333 0.5 12.7167 0.5C12.5 0.5 12.2917 0.583333 12.1333 0.741667L10.6083 2.26667L13.7333 5.39167L15.2583 3.86667C15.5833 3.54167 15.5833 3.01667 15.2583 2.69167Z" fill="#2F80ED" />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 mt-3 mt-lg-0">
                                    <div className="d-flex transation-class">
                                      <span>Trasaction History</span>
                                      <span className="ms-auto">
                                        <select type="form-select border-0">
                                          <option>Added</option>
                                          <option>Withdraw</option>
                                        </select>
                                      </span>
                                    </div>
                                    <div className="history-div d-flex align-items-center justify-content-between mt-3 p-3">
                                      <div className="d-flex align-items-center">
                                        <span className="dollar-img">
                                          <img src="../assets/images/dollar-icon.png" alt="" className="img-fluid" />
                                        </span>
                                        <div className="history-txt ms-3">
                                          <span>Added from Bank XX0952</span>
                                          <bdi className="d-block">+$160.00</bdi>
                                        </div>
                                      </div>
                                      <div className="ms-sm-3 hist-date-txt">1 Jan 2020</div>
                                    </div>
                                    <div className="history-div d-flex align-items-center justify-content-between mt-3 p-3">
                                      <div className="d-flex align-items-center">
                                        <span className="dollar-img">
                                          <img src="../assets/images/dollar-icon.png" alt="" className="img-fluid" />
                                        </span>
                                        <div className="history-txt ms-3">
                                          <span>Added from Bank XX0952</span>
                                          <bdi className="d-block">+$160.00</bdi>
                                        </div>
                                      </div>
                                      <div className="ms-sm-3 hist-date-txt">1 Jan 2020</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                          {/*  =================== Withdraw Page ================ */}

                          {withdrowState.withdraw && (
                            <>
                              <div className="mb-3 mt-3 mt-md-0 tabs-heading-txt">
                                <h5>Wallet</h5>
                              </div>
                              <div className="wallet-main p-3">
                                <div className="row">
                                  <div className="col-lg-6">
                                    <div className="mywallet-class position-relative p-3">
                                      <div className="star-img">
                                        <img src="../assets/images/mywallet-star-img.png" alt="" />
                                      </div>
                                      <p>My Walllet</p>
                                      <div className="mt-5">
                                        <span>Withdrawable Balance</span>
                                        <bdi>$1,000</bdi>
                                      </div>
                                      <div className="d-flex align-items-center mt-3">
                                        <span>View brackdown</span>
                                        <span className="ms-2">
                                          <svg width="16" height="16" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.6667 1.16602L16.5 6.99935M16.5 6.99935L10.6667 12.8327M16.5 6.99935L1.5 6.99935" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                          </svg>
                                        </span>
                                      </div>
                                    </div>

                                    <div className="mt-3">
                                      <label className="comn-label-class">Enter Amount</label>
                                      <input type="tel" placeholder="Enter Amount" className="form-control comn-input-style ps-3 pe-5" />
                                    </div>

                                    <div className="mt-3">
                                      <label className="comn-label-class">Select Bank</label>
                                      <div className="cust-radio-box d-flex align-items-center">
                                        <input name="ba" type="radio" id="bankaccount-1" />
                                        <label className="cust-radio-main w-100 card-1" htmlFor="bankaccount-1">
                                          <div className="d-flex align-items-center">
                                            <div>
                                              <img src="../assets/images/bank-america.png" alt=""/>
                                            </div>
                                            <div className="ms-3">
                                              <span>Bank Of America</span>
                                              <p className="mb-0 mt-1">Visa Card - XXX02362</p>
                                            </div>
                                            <div className="ms-auto" onClick={() => setRemoveBank(true)}>
                                              <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14 20.9688H4C2.89543 20.9688 2 20.0733 2 18.9688V5.96875H0V3.96875H4V2.96875C4 1.86418 4.89543 0.96875 6 0.96875H12C13.1046 0.96875 14 1.86418 14 2.96875V3.96875H18V5.96875H16V18.9688C16 20.0733 15.1046 20.9688 14 20.9688ZM4 5.96875V18.9688H14V5.96875H4ZM6 2.96875V3.96875H12V2.96875H6ZM12 16.9688H10V7.96875H12V16.9688ZM8 16.9688H6V7.96875H8V16.9688Z" fill="#D24944" />
                                              </svg>
                                            </div>
                                          </div>
                                        </label>
                                      </div>
                                      <div className="cust-radio-box d-flex align-items-center mt-3">
                                        <input name="ba" type="radio" id="bankaccount-2" />
                                        <label className="cust-radio-main w-100 card-1" htmlFor="bankaccount-2">
                                          <div className="d-flex align-items-center">
                                            <div>
                                              <img src="../assets/images/bank-america.png" alt=""/>
                                            </div>
                                            <div className="ms-3">
                                              <span>Bank Of America</span>
                                              <p className="mb-0 mt-1">Visa Card - XXX02362</p>
                                            </div>
                                            <div className="ms-auto" onClick={() => setRemoveBank(true)}>
                                              <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14 20.9688H4C2.89543 20.9688 2 20.0733 2 18.9688V5.96875H0V3.96875H4V2.96875C4 1.86418 4.89543 0.96875 6 0.96875H12C13.1046 0.96875 14 1.86418 14 2.96875V3.96875H18V5.96875H16V18.9688C16 20.0733 15.1046 20.9688 14 20.9688ZM4 5.96875V18.9688H14V5.96875H4ZM6 2.96875V3.96875H12V2.96875H6ZM12 16.9688H10V7.96875H12V16.9688ZM8 16.9688H6V7.96875H8V16.9688Z" fill="#D24944" />
                                              </svg>
                                            </div>
                                          </div>
                                        </label>
                                      </div>
                                    </div>

                                    <div>
                                      <button className="comn-white-btn mt-3" data="Add Bank" onClick={() => setAddBank(true)}>
                                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="me-2" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M0.5 12.375V15.5H3.625L12.8417 6.28333L9.71667 3.15833L0.5 12.375ZM2.93333 13.8333H2.16667V13.0667L9.71667 5.51667L10.4833 6.28333L2.93333 13.8333ZM15.2583 2.69167L13.3083 0.741667C13.1417 0.575 12.9333 0.5 12.7167 0.5C12.5 0.5 12.2917 0.583333 12.1333 0.741667L10.6083 2.26667L13.7333 5.39167L15.2583 3.86667C15.5833 3.54167 15.5833 3.01667 15.2583 2.69167Z" fill="#2F80ED" />
                                        </svg>
                                      </button>
                                    </div>
                                    <button
                                      className="comn-btn-class-darkgray w-100 mt-5"
                                      onClick={() => {
                                        setWithdrowState({
                                          ...withdrowState,
                                          withdraw: false,
                                        });
                                      }}
                                    >
                                      <span className="me-2">
                                        <svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M21.8751 7.58333V5.20833C21.8751 4.0625 20.9376 3.125 19.7917 3.125H5.20834C4.05209 3.125 3.125 4.0625 3.125 5.20833V19.7917C3.125 20.9375 4.05209 21.875 5.20834 21.875H19.7917C20.9376 21.875 21.8751 20.9375 21.8751 19.7917V17.4167C22.4896 17.0521 22.9167 16.3958 22.9167 15.625V9.375C22.9167 8.60417 22.4896 7.94792 21.8751 7.58333ZM20.8334 9.375V15.625H13.5417V9.375H20.8334ZM5.20834 19.7917V5.20833H19.7917V7.29167H13.5417C12.3959 7.29167 11.4584 8.22917 11.4584 9.375V15.625C11.4584 16.7708 12.3959 17.7083 13.5417 17.7083H19.7917V19.7917H5.20834Z" fill="#fff" />
                                          <path d="M16.6667 14.0625C17.5297 14.0625 18.2292 13.3629 18.2292 12.5C18.2292 11.6371 17.5297 10.9375 16.6667 10.9375C15.8038 10.9375 15.1042 11.6371 15.1042 12.5C15.1042 13.3629 15.8038 14.0625 16.6667 14.0625Z" fill="#fff" />
                                        </svg>
                                      </span>
                                      Withdraw
                                    </button>
                                  </div>
                                  <div className="col-lg-6 mt-3 mt-lg-0">
                                    <div className="d-flex transation-class">
                                      <span>Trasaction History</span>
                                      <span className="ms-auto">
                                        <select type="form-select border-0">
                                          <option>Added</option>
                                          <option>Withdraw</option>
                                        </select>
                                      </span>
                                    </div>
                                    <div className="history-div d-flex align-items-center justify-content-between mt-3 p-3">
                                      <div className="d-flex align-items-center">
                                        <span className="dollar-img">
                                          <img src="../assets/images/dollar-icon.png" alt="" className="img-fluid" />
                                        </span>
                                        <div className="history-txt ms-3">
                                          <span>Added from Bank XX0952</span>
                                          <bdi className="d-block">+$160.00</bdi>
                                        </div>
                                      </div>
                                      <div className="ms-sm-3 hist-date-txt">1 Jan 2020</div>
                                    </div>
                                    <div className="history-div d-flex align-items-center justify-content-between mt-3 p-3">
                                      <div className="d-flex align-items-center">
                                        <span className="dollar-img">
                                          <img src="../assets/images/dollar-icon.png" alt="" className="img-fluid" />
                                        </span>
                                        <div className="history-txt ms-3">
                                          <span>Added from Bank XX0952</span>
                                          <bdi className="d-block">+$160.00</bdi>
                                        </div>
                                      </div>
                                      <div className="ms-sm-3 hist-date-txt">1 Jan 2020</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </Tab.Pane>
                        <Tab.Pane eventKey="faq">
                          <div className="mb-3 mt-3 mt-lg-0 tabs-heading-txt">
                            <h5>Frequently asked questions</h5>
                          </div>
                          <div>
                            <div className="row">
                              <div className="col-12 mx-auto">
                                <div className="faq-main-class p-3">
                                  <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0" className="accor-item">
                                      <Accordion.Header className="accor-hdr">What is the purpose of Starprospect?</Accordion.Header>
                                      <Accordion.Body className="accor-bdy">To better connect more candidates with more employers and hiring doctors in a more meaningful way.</Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1" className="accor-item">
                                      <Accordion.Header className="accor-hdr">Where is the Starprospect app available?</Accordion.Header>
                                      <Accordion.Body className="accor-bdy">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2" className="accor-item">
                                      <Accordion.Header className="accor-hdr">What devices can I download and use Starprospect on?</Accordion.Header>
                                      <Accordion.Body className="accor-bdy">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3" className="accor-item border-0">
                                      <Accordion.Header className="accor-hdr">How do I join the Starprospect Team?</Accordion.Header>
                                      <Accordion.Body className="accor-bdy">Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</Accordion.Body>
                                    </Accordion.Item>
                                  </Accordion>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </div>
                  </div>
                </Tab.Container>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>

      {/* ===============  Add Bank ============= */}

      {addbank && (
        <Modal show={addbank} onHide={() => setAddBank(false)} size="md" className="comn-modal-style" arialabelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton className="mt-2">
            <div className="add-modal-hdr mx-auto">
              <p>Add Bank Account</p>
            </div>
          </Modal.Header>
          <Modal.Body className="pt-0">
            <div className="row">
              <div className="col-12">
                <div className="add-bank-detail">
                  <div>
                    <label className="comn-label-class">Bank Name</label>
                    <bdi className="d-block position-relative">
                      <select className="form-control comn-input-style form-select ps-3 pe-5">
                        <option>Choose Bank</option>
                        <option>HDFC BANK</option>
                      </select>
                      <span className="showpwd-class bg-transparent">
                        <img src="../assets/images/down-arrow-icon.svg" alt="" />
                      </span>
                    </bdi>
                  </div>
                  <div className="mt-3">
                    <label className="comn-label-class">Account Type</label>
                    <bdi className="d-block position-relative">
                      <select className="form-control comn-input-style form-select ps-3 pe-5">
                        <option>Choose Account type</option>
                        <option>Saving Account</option>
                      </select>
                      <span className="showpwd-class bg-transparent">
                        <img src="../assets/images/down-arrow-icon.svg" alt="" />
                      </span>
                    </bdi>
                  </div>
                  <div className="mt-3">
                    <label className="comn-label-class">Account Holder Name</label>
                    <input type="text" placeholder="Enter Account Holder Name" className="form-control comn-input-style ps-3 pe-5" />
                  </div>
                  <div className="mt-3">
                    <label className="comn-label-class">Account Number</label>
                    <input type="tel" placeholder="Enter Account Number" className="form-control comn-input-style ps-3 pe-5" />
                  </div>
                  <div className="mt-3">
                    <button className="comn-btn-class mt-3">Add Bank</button>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>)}

      {/* ===============  Remove Bank ============= */}

      {removebank && (<Modal show={removebank} onHide={() => setRemoveBank(false)} size="sm" className="comn-modal-style" arialabelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton className="mt-2"></Modal.Header>
        <Modal.Body className="pt-0">
          <div className="row">
            <div className="col-12 mx-auto">
              <div className="remove-modal-main text-center">
                <div className="mb-3">
                  <svg width="36" height="46" viewBox="0 0 36 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28 15.5V40.5H8V15.5H28ZM24.25 0.5H11.75L9.25 3H0.5V8H35.5V3H26.75L24.25 0.5ZM33 10.5H3V40.5C3 43.25 5.25 45.5 8 45.5H28C30.75 45.5 33 43.25 33 40.5V10.5Z" fill="#EB5757" />
                  </svg>
                </div>
                <span>Do you Want to remove your account ?</span>
                <bdi>Lorem Ipsum Lorem Ipsum Lorem</bdi>
              </div>
            </div>
            <div className="col-12 mt-3">
              <div className="d-sm-flex">
                <button type="btn" className="comn-btn-class-lightgray w-100">
                  Cancel
                </button>
                <button type="btn" className="remove-btn ms-sm-3 w-100 mt-3 mt-sm-0">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>)}
    </>
  );
}
