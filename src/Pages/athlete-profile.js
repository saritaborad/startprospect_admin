import React, { useState } from "react";
import MainLayout from "../Components/Layout/MainLayout";
import ProfileLayout from "../Components/ProfileLayout/MainProfileLayout";
import { Link } from "react-router-dom";
// import { TagsInput } from "react-tag-input-component";
import { Tab, Nav, Dropdown, Accordion } from "react-bootstrap";
import "rc-slider/assets/index.css";
import AthleteProfileEdit from "./athlete-profile-edit";
import AddNewPost from "./Common/AddNewPost";
// import InputEmoji from "react-input-emoji";
// import { Rating } from "react-simple-star-rating";

export default function AthleteProfile() {
	const [selected, setSelected] = useState(["Baseball"]);
	const [defultview, setdefultview] = useState(true);
	const [shownewpostdiv, setshownewpostdiv] = useState(false);


	const handlenewpost = () => {
		// setediprofiledivshow(false);
		setdefultview(false);
		setshownewpostdiv(true);
	};

	const closehandlenewpost = () => {
		setshownewpostdiv(false);
		// setediprofiledivshow(false);
		setdefultview(true);
		// setPropertyImage([]);
	};




	const [profileState, setProfileState] = React.useState({
		editProfile: false,
		post: false,
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
		reqCompleted: false,
	});

	const [teamState, setTeamState] = React.useState({
		team: false,
		teamDetail: false,
		teamInvite: false,
	});

	const [eventState, setEventState] = React.useState({
		eventDetail: false,
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
	const handleEventClick = (type) => {
		setEventState({
			[type]: true,
		});
	};

	return (
		<>
			<MainLayout>
				<section className="">
					<div className="container">
						<div className="row">
							<div className="col-xl-2 col-md-3 pe-0">
								<ProfileLayout />
							</div>
							<div className="col-xl-10 col-md-9">
								{/* ===================== profile ================== */}

								{defultview && (
									<>
										<div className="mb-3 mt-3 mt-md-0 tabs-heading-txt">
											<h5>Profile</h5>
										</div>
										<div className="row">
											<div className="col-lg-5">
												<div className="customer-page-box h-auto">
													<div className="img-div-main position-relative">
														<img src="../assets/images/athlete-bg.png" className="img-fluid w-100" alt="customer" />
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
																		<div>{/* <Rating className="" fillColor="#FFC107" emptyColor="#828282" initialValue={1} iconsCount={1} size={20} /> */}</div>
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
															<img src="../assets/images/score.png" alt="score" />
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
																	<img src="../assets/images/instagram-icon.png" className="img-fluid" alt="" />
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
																	<img src="../assets/images/Facebook-icon.png" className="img-fluid" alt=""/>
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
																	<img src="../assets/images/Tik-Tok-icon.png" className="img-fluid" alt="tik-tok" />
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
																	<img src="../assets/images/YouTube-icon.png" alt="you-tube" className="img-fluid" />
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
																	<img src="../assets/images/linkedin_icon.png" className="img-fluid" alt="linkedin" />
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
																	<img src="../assets/images/twitter-icon.png" alt="twitter" className="img-fluid" />
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
																	<img src="../assets/images/twitter-icon.png" alt="twitter" className="img-fluid" />
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
																<button className="comn-white-btn mt-3" data="Post" onClick={() => handlenewpost()}></button>
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
																			<div className="row mt-3 m-0 me-0">
																				<div className="col-lg-4 col-sm-3 col-4 mb-3 pe-0">
																					<div className="deal-newsfeed-tab">
																						<img src="../assets/images/md-1.png" className="img-fluid w-100" alt="" />
																					</div>
																				</div>
																				<div className="col-lg-4 col-sm-3 col-4 mb-3 pe-0">
																					<div className="deal-newsfeed-tab">
																						<img src="../assets/images/md-2.png" className="img-fluid w-100" alt="" />
																					</div>
																				</div>
																				<div className="col-lg-4 col-sm-3 col-4 mb-3 pe-0">
																					<div className="deal-newsfeed-tab">
																						<img src="../assets/images/md-3.png" className="img-fluid w-100" alt="" />
																					</div>
																				</div>
																				<div className="col-lg-4 col-sm-3 col-4 mb-3 pe-0">
																					<div className="deal-newsfeed-tab">
																						<img src="../assets/images/md-4.png" className="img-fluid w-100" alt="" />
																					</div>
																				</div>
																				<div className="col-lg-4 col-sm-3 col-4 mb-3 pe-0">
																					<div className="deal-newsfeed-tab">
																						<img src="../assets/images/md-5.png" className="img-fluid w-100" alt="" />
																					</div>
																				</div>
																				<div className="col-lg-4 col-sm-3 col-4 mb-3 pe-0">
																					<div className="deal-newsfeed-tab">
																						<img src="../assets/images/md-6.png" className="img-fluid w-100"  alt=""/>
																					</div>
																				</div>
																				<div className="col-lg-4 col-sm-3 col-4 mb-3 pe-0">
																					<div className="deal-newsfeed-tab">
																						<img src="../assets/images/md-7.png" className="img-fluid w-100" alt="" />
																					</div>
																				</div>
																				<div className="col-lg-4 col-sm-3 col-4 mb-3 pe-0">
																					<div className="deal-newsfeed-tab">
																						<img src="../assets/images/md-8.png" className="img-fluid w-100" alt=""/>
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
																								<img src="../assets/images/Tik-Tok-icon.png" className="img-fluid" alt="" />
																								<span>Post | Audio</span>
																							</div>
																							<bdi className="ms-auto">$90.00</bdi>
																						</div>
																						<div className="d-flex align-items-center mt-3">
																							<div>
																								<img src="../assets/images/linkedin_icon.png" className="img-fluid" alt="" />
																								<span>Post | Video</span>
																							</div>
																							<bdi className="ms-auto">$70.00</bdi>
																						</div>
																					</div>
																					<div className="col-12">
																						<div className="d-flex align-items-center mt-3">
																							<div>
																								<img src="../assets/images/Facebook-icon.png" className="img-fluid" alt="" />
																								<span>Post | Story</span>
																							</div>
																							<bdi className="ms-auto">$150.00</bdi>
																						</div>
																						<div className="d-flex align-items-center mt-3">
																							<div>
																								<img src="../assets/images/YouTube-icon.png" className="img-fluid" alt="" />
																								<span>Post | Audio</span>
																							</div>
																							<bdi className="ms-auto">$150.00</bdi>
																						</div>
																						<div className="d-flex align-items-center mt-3">
																							<div>
																								<img src="../assets/images/twitter-icon.png" className="img-fluid" alt="" />
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
									<AthleteProfileEdit profileState={profileState} setProfileState={setProfileState} />
								)}

								{/* ==================  POST  ================== */}

								{shownewpostdiv && (
									<AddNewPost closehandlenewpost={closehandlenewpost} />
								)}

								{/* ===================== offer ================== */}
								{offerState.pending === false && offerState.inProgress === false && offerState.completed === false && offerState.inReview === false && offerState.cancel === false && (
									<>
										<div className="d-md-flex align-items-center mb-3">
											<div className="mt-3 mt-md-0 tabs-heading-txt">
												<h5>Offers</h5>
											</div>
											<div className="position-relative ms-auto mt-3 mt-md-0">
												<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6C6A81" className="bi bi-search fix-in-icon" viewBox="0 0 16 16">
													<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
												</svg>
												<input type="input" className="form-control login-comn-input searchbar ps-5" placeholder="Search" />
											</div>
											<div className="ps-md-3 mt-3 mt-md-0">
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
										<div className="row me-0">
											<div className=" col-md-6 mb-3 pe-0">
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
																<img src="./assets/images/available social icon.png" alt="" />
															</span>
														</div>
													</div>
												</div>
											</div>
											<div className=" col-md-6 mb-3 pe-0">
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
																	<img src="../assets/images/energy-icon.svg"  alt=""/>
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
																<img src="./assets/images/available social icon.png" alt="" />
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
															<img src="../assets/images/deal-detail-profile.png" alt="" />
														</div>
														<div className="ms-3 requester-name">
															<bdi className="">To John Doe</bdi>
															<span className="comn-status-class pending-class">Pending</span>
														</div>
														<span className="ms-auto">
															<img src="../assets/images/chat-icon.png" alt="" />
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
																		<img src="./assets/images/twitter-icon.png" className="me-2" alt="" />
																		Twitter
																	</span>
																</label>
																<label className="cust-chk-bx-soc p-0">
																	<input type="checkbox" />
																	<span className="cust-trend-chkbox">
																		<img src="./assets/images/Tik-Tok-icon.png" className="me-2" alt="" />
																		Tik Tok
																	</span>
																</label>
																<label className="cust-chk-bx-soc p-0">
																	<input type="checkbox" />
																	<span className="cust-trend-chkbox">
																		<img src="./assets/images/other-social-icon.svg" className="me-2"  alt=""/>
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
															<img src="../assets/images/deal-detail-profile.png" alt="" />
														</div>
														<div className="ms-3 requester-name">
															<bdi className="">To John Doe</bdi>
															<span className="comn-status-class inprogress-class">In Progress</span>
														</div>
														<span className="ms-auto">
															<img src="../assets/images/chat-icon.png" alt="" />
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
																		<img src="./assets/images/instagram.svg" className="me-2" alt="" />
																		Instagram
																	</span>
																</label>
																<label className="cust-chk-bx-soc p-0">
																	<input type="checkbox" />
																	<span className="cust-trend-chkbox">
																		<img src="./assets/images/twitter-img.svg" className="me-2" alt="" />
																		Twitter
																	</span>
																</label>
																<label className="cust-chk-bx-soc p-0">
																	<input type="checkbox" />
																	<span className="cust-trend-chkbox">
																		<img src="./assets/images/tik-tok-img.svg" className="me-2" alt="" />
																		Tik Tok
																	</span>
																</label>
																<label className="cust-chk-bx-soc p-0">
																	<input type="checkbox" />
																	<span className="cust-trend-chkbox">
																		<img src="./assets/images/other-social-icon.svg" className="me-2" alt="" />
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

								{/* ===================== request ================== */}
								{reqState.reqPending === false && reqState.reqProgress === false && reqState.reqInReview === false && reqState.reqCompleted === false && (
									<>
										<div className="d-md-flex align-items-center mb-3">
											<div className="mt-3 mt-md-0 tabs-heading-txt">
												<h5>Request</h5>
											</div>
											<div className="position-relative ms-auto mt-3 mt-md-0">
												<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6C6A81" className="bi bi-search fix-in-icon" viewBox="0 0 16 16">
													<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
												</svg>
												<input type="input" className="form-control login-comn-input searchbar ps-5" placeholder="Search" />
											</div>
											<div className="ps-md-3 mt-3 mt-md-0">
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
										<div className="row me-0">
											<div className=" col-md-6 mb-3 pe-0">
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
																<img src="./assets/images/available social icon.png" alt="" />
															</span>
														</div>
													</div>
												</div>
											</div>
											<div className=" col-md-6 mb-3 pe-0">
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
																<img src="./assets/images/available social icon.png" alt="" />
															</span>
														</div>
													</div>
												</div>
											</div>
											<div className=" col-md-6 mb-3 pe-0">
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
																<img src="./assets/images/available social icon.png" alt="" />
															</span>
														</div>
													</div>
												</div>
											</div>
											<div className=" col-md-6 mb-3 pe-0">
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
																<img src="./assets/images/available social icon.png" alt="" />
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
															<img src="../assets/images/chat-icon.png" alt="" />
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
																		<img src="./assets/images/facebook-img.svg" alt="" className="me-2" />
																		Facebook
																	</span>
																</label>
																<label className="cust-chk-bx-soc p-0">
																	<input type="checkbox" />
																	<span className="cust-trend-chkbox">
																		<img src="./assets/images/instagram.svg" alt="" className="me-2" />
																		Instagram
																	</span>
																</label>
																<label className="cust-chk-bx-soc p-0">
																	<input type="checkbox" />
																	<span className="cust-trend-chkbox">
																		<img src="./assets/images/twitter-img.svg" alt="" className="me-2" />
																		Twitter
																	</span>
																</label>
																<label className="cust-chk-bx-soc p-0">
																	<input type="checkbox" />
																	<span className="cust-trend-chkbox">
																		<img src="./assets/images/tik-tok-img.svg" alt="" className="me-2" />
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
															<button
																className="gray-btn w-100"
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
																Requested
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
															<img src="../assets/images/chat-icon.png" alt="" />
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
																		<img src="./assets/images/facebook-img.svg" alt="" className="me-2" />
																		Facebook
																	</span>
																</label>
																<label className="cust-chk-bx-soc p-0">
																	<input type="checkbox" />
																	<span className="cust-trend-chkbox">
																		<img src="./assets/images/instagram.svg" alt="" className="me-2" />
																		Instagram
																	</span>
																</label>
																<label className="cust-chk-bx-soc p-0">
																	<input type="checkbox" />
																	<span className="cust-trend-chkbox">
																		<img src="./assets/images/twitter-img.svg" alt="" className="me-2" />
																		Twitter
																	</span>
																</label>
																<label className="cust-chk-bx-soc p-0">
																	<input type="checkbox" />
																	<span className="cust-trend-chkbox">
																		<img src="./assets/images/tik-tok-img.svg" alt="" className="me-2" />
																		Tik Tok
																	</span>
																</label>
																<label className="cust-chk-bx-soc p-0">
																	<input type="checkbox" />
																	<span className="cust-trend-chkbox">
																		<img src="./assets/images/other-social-icon.svg" alt=""  className="me-2" />
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
															<img src="../assets/images/deal-detail-profile.png"  alt=""/>
														</div>
														<div className="ms-3 requester-name">
															<bdi className="">To John Doe</bdi>
															<span className="comn-status-class review-class">In Review</span>
														</div>
														<span className="ms-auto">
															<img src="../assets/images/chat-icon.png" alt="" />
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
																		<img src="./assets/images/facebook-img.svg" alt="" className="me-2" />
																		Facebook
																	</span>
																</label>
																<label className="cust-chk-bx-soc p-0">
																	<input type="checkbox" />
																	<span className="cust-trend-chkbox">
																		<img src="./assets/images/instagram.svg" alt="" className="me-2" />
																		Instagram
																	</span>
																</label>
																<label className="cust-chk-bx-soc p-0">
																	<input type="checkbox" />
																	<span className="cust-trend-chkbox">
																		<img src="./assets/images/twitter-img.svg" alt="" className="me-2" />
																		Twitter
																	</span>
																</label>
																<label className="cust-chk-bx-soc p-0">
																	<input type="checkbox" />
																	<span className="cust-trend-chkbox">
																		<img src="./assets/images/tik-tok-img.svg" alt="" className="me-2" />
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
															<img src="../assets/images/chat-icon.png" alt=""/>
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
																		<img src="./assets/images/facebook-img.svg" alt="" className="me-2" />
																		Facebook
																	</span>
																</label>
																<label className="cust-chk-bx-soc p-0">
																	<input type="checkbox" />
																	<span className="cust-trend-chkbox">
																		<img src="./assets/images/instagram.svg" alt="" className="me-2" />
																		Instagram
																	</span>
																</label>
																<label className="cust-chk-bx-soc p-0">
																	<input type="checkbox" />
																	<span className="cust-trend-chkbox">
																		<img src="./assets/images/twitter-img.svg" alt="" className="me-2" />
																		Twitter
																	</span>
																</label>
																<label className="cust-chk-bx-soc p-0">
																	<input type="checkbox" />
																	<span className="cust-trend-chkbox">
																		<img src="./assets/images/tik-tok-img.svg" alt="" className="me-2" />
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

								{/* ===================== TEAM ================== */}

								{teamState.team === false && teamState.teamDetail === false && teamState.teamInvite === false && (
									<>
										<div className="row">
											<div className="col-12 mt-3 mt-md-0">
												<div className="d-sm-flex align-items-center">
													<div className="tabs-heading-txt">
														<h5>Team</h5>
													</div>
													<div className="position-relative ms-auto mt-3 mt-sm-0">
														<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6C6A81" className="bi bi-search fix-in-icon" viewBox="0 0 16 16">
															<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
														</svg>
														<input type="input" className="form-control login-comn-input searchbar ps-5" placeholder="Search" />
													</div>
													<div className="ps-sm-3 mt-3 mt-sm-0">
														<button className="gray-btn" onClick={() => handleTeamClick("teamInvite")}>
															<img src="./assets/images/team-union.png" alt="" />
														</button>
													</div>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-12 mt-3">
												<div className="mt-3 mt-sm-0 team-staff-div">
													<h6>Your Team</h6>
													<div className="row me-0">
														<div className="col-xl-3 col-lg-4 col-sm-6 pe-0">
															<div className="team-box-class" onClick={() => handleTeamClick("teamDetail")}>
																<div className="team-img-div mx-auto">
																	<img src="../assets/images/team-ball-img.svg" alt=""/>
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
													<div className="row me-0">
														<div className="col-xl-3 col-lg-4 col-sm-6 mb-3 pe-0">
															<div className="team-box-class" onClick={() => handleTeamClick("team")}>
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
																	</div>
																</div>
															</div>
														</div>
														<div className="col-xl-3 col-lg-4 col-sm-6 mb-3 pe-0">
															<div className="team-box-class" onClick={() => handleTeamClick("team")}>
																<div className="team-img-div mx-auto">
																	<img src="../assets/images/team-ball-img.svg" alt="" />
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
														<div className="col-xl-3 col-lg-4 col-sm-6 mb-3 pe-0">
															<div className="team-box-class" onClick={() => handleTeamClick("team")}>
																<div className="team-img-div mx-auto">
																	<img src="../assets/images/team-ball-img.svg" alt="" />
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
														<div className="col-xl-3 col-lg-4 col-sm-6 mb-3 pe-0">
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
												<div className="position-relative ms-auto mt-3 mt-sm-0">
													<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6C6A81" className="bi bi-search fix-in-icon" viewBox="0 0 16 16">
														<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
													</svg>
													<input type="input" className="form-control login-comn-input searchbar ps-5" placeholder="Search" />
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
																			<img src="../assets/images/staff-img.png" alt="" />
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
															<div className="row me-0">
																<div className="col-2 mb-3 team-col-class pe-0">
																	<div className="team-staff-box">
																		<div className="mb-2">
																			<img src="../assets/images/staff-img.png" alt="" />
																		</div>
																		<span>#01</span>
																		<p className="mt-auto mb-0">John Doe</p>
																	</div>
																</div>
																<div className="col-2 mb-3 team-col-class pe-0">
																	<div className="team-staff-box">
																		<div className="mb-2">
																			<img src="../assets/images/staff-img.png" alt="" />
																		</div>
																		<span>#02</span>
																		<p className="mt-auto mb-0">John Doe</p>
																	</div>
																</div>
																<div className="col-2 mb-3 team-col-class pe-0">
																	<div className="team-staff-box">
																		<div className="mb-2">
																			<img src="../assets/images/staff-img.png" alt="" />
																		</div>
																		<span>#05</span>
																		<p className="mt-auto mb-0">John Doe</p>
																	</div>
																</div>
																<div className="col-2 mb-3 team-col-class pe-0">
																	<div className="team-staff-box">
																		<div className="mb-2"> 
																			<img src="../assets/images/staff-img.png" alt=""/>
																		</div>
																		<span>#06</span>
																		<p className="mt-auto mb-0">John Doe</p>
																	</div>
																</div>
																<div className="col-2 mb-3 team-col-class pe-0">
																	<div className="team-staff-box">
																		<div className="mb-2">
																			<img src="../assets/images/staff-img.png" alt=""/>
																		</div>
																		<span>#03</span>
																		<p className="mt-auto mb-0">John Doe</p>
																	</div>
																</div>
																<div className="col-2 mb-3 team-col-class pe-0">
																	<div className="team-staff-box">
																		<div className="mb-2">
																			<img src="../assets/images/staff-img.png" alt=""/>
																		</div>
																		<span>#03</span>
																		<p className="mt-auto mb-0">John Doe</p>
																	</div>
																</div>
																<div className="col-2 mb-3 team-col-class pe-0">
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
												<div className="position-relative ms-auto mt-3 mt-sm-0">
													<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6C6A81" className="bi bi-search fix-in-icon" viewBox="0 0 16 16">
														<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
													</svg>
													<input type="input" className="form-control login-comn-input searchbar ps-5" placeholder="Search" />
												</div>
											</div>
											<div className="col-12 mt-3">
												<div className="d-md-flex align-items-center justify-content-between team-join-class p-3">
													<div className="d-flex align-items-center">
														<div className="team-img-div">
															<img src="../assets/images/team-ball-img.svg" alt="" />
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
																						<img src="../assets/images/staff-img.png" alt="" />
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
																						<img src="../assets/images/staff-img.png" alt="" />
																					</div>
																					<span>#01</span>
																					<p className="mt-auto mb-0">John Doe</p>
																				</div>
																			</div>
																			<div className="col-2 mb-3 team-col-class">
																				<div className="team-staff-box">
																					<div className="mb-2">
																						<img src="../assets/images/staff-img.png" alt=""  />
																					</div>
																					<span>#02</span>
																					<p className="mt-auto mb-0">John Doe</p>
																				</div>
																			</div>
																			<div className="col-2 mb-3 team-col-class">
																				<div className="team-staff-box">
																					<div className="mb-2">
																						<img src="../assets/images/staff-img.png"  alt=""/>
																					</div>
																					<span>#05</span>
																					<p className="mt-auto mb-0">John Doe</p>
																				</div>
																			</div>
																			<div className="col-2 mb-3 team-col-class">
																				<div className="team-staff-box">
																					<div className="mb-2">
																						<img src="../assets/images/staff-img.png"  alt=""/>
																					</div>
																					<span>#06</span>
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
										<div className="row me-0">
											<div className="col-xl-4 col-sm-6 mt-3 pe-0">
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
											<div className="col-xl-4 col-sm-6 mt-3 pe-0">
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
											<div className="col-xl-4 col-sm-6 mt-3 pe-0">
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

								{/* ===================== event ================== */}

								{eventState.eventDetail === false && (
									<>
										<div className="row">
											<div className="col-12">
												<div className="d-md-flex align-items-center">
													<div className=" mt-3 mt-md-0 tabs-heading-txt">
														<h5>Event</h5>
													</div>
													<div className="position-relative ms-auto mt-3 mt-md-0">
														<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6C6A81" className="bi bi-search fix-in-icon" viewBox="0 0 16 16">
															<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
														</svg>
														<input type="input" className="form-control login-comn-input searchbar ps-5" placeholder="Search" />
													</div>
												</div>
											</div>
										</div>
										<div className="row me-0">
											<div className="col-12 mt-3 pe-0">
												<mark className="event-mark">Upcoming</mark>
											</div>
											<div className="col-xl-3 col-lg-4 col-sm-6 mt-3 pe-0">
												<div className="team-box-class position-relative" onClick={() => handleEventClick("eventDetail")}>
													<span className="event-share-icon">
														<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M13.5833 17.3352C12.6816 17.3456 11.827 16.9336 11.2735 16.2216C10.7201 15.5097 10.5316 14.5798 10.7642 13.7085L5.54749 10.7269C4.64607 11.5527 3.32473 11.7275 2.23957 11.1644C1.1544 10.6014 0.536556 9.42038 0.692801 8.20786C0.849045 6.99534 1.7461 6.00956 2.93856 5.73998C4.13101 5.4704 5.36488 5.97445 6.0275 7.00186L10.7633 4.29436C10.7021 4.06285 10.6696 3.82466 10.6667 3.58519C10.6547 2.19079 11.6232 0.979477 12.986 0.68421C14.3488 0.388943 15.7318 1.09081 16.298 2.36512C16.8643 3.63943 16.4583 5.13621 15.3258 5.94978C14.1933 6.76335 12.6452 6.67027 11.6183 5.72686L6.4925 8.65602C6.48742 8.87213 6.45722 9.0869 6.40249 9.29603L11.6183 12.2769C12.5785 11.3956 14.0073 11.2596 15.1166 11.9438C16.2258 12.628 16.7455 13.9658 16.389 15.2194C16.0325 16.473 14.8866 17.3371 13.5833 17.3352ZM13.5833 13.1685C12.893 13.1685 12.3333 13.7282 12.3333 14.4185C12.3333 15.1089 12.893 15.6685 13.5833 15.6685C14.2737 15.6685 14.8333 15.1089 14.8333 14.4185C14.8333 13.7282 14.2737 13.1685 13.5833 13.1685ZM3.58333 7.33519C2.89297 7.33519 2.33333 7.89484 2.33333 8.58519C2.33333 9.27555 2.89297 9.83519 3.58333 9.83519C4.27368 9.83519 4.83333 9.27555 4.83333 8.58519C4.83333 7.89484 4.27368 7.33519 3.58333 7.33519ZM13.5833 2.33519C12.893 2.33519 12.3333 2.89484 12.3333 3.58519C12.3333 4.27555 12.893 4.83519 13.5833 4.83519C14.2737 4.83519 14.8333 4.27555 14.8333 3.58519C14.8333 2.89484 14.2737 2.33519 13.5833 2.33519Z" fill="#7B838A" />
														</svg>
													</span>
													<div className="team-img-div mx-auto position-relative">
														<img src="../assets/images/team-ball-img.svg" alt="" />
													</div>
													<div className="team-body-txt">
														<span>Fearless Wizards</span>
														<div className="">
															<p className="position-relative">Santa Barbara Ground</p>
															<div className="even-time-btn mt-3">Today 3:00 PM</div>
														</div>
													</div>
												</div>
											</div>
											<div className="col-xl-3 col-lg-4 col-sm-6 mt-3 pe-0">
												<div className="team-box-class position-relative" onClick={() => handleEventClick("eventDetail")}>
													<span className="event-share-icon">
														<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M13.5833 17.3352C12.6816 17.3456 11.827 16.9336 11.2735 16.2216C10.7201 15.5097 10.5316 14.5798 10.7642 13.7085L5.54749 10.7269C4.64607 11.5527 3.32473 11.7275 2.23957 11.1644C1.1544 10.6014 0.536556 9.42038 0.692801 8.20786C0.849045 6.99534 1.7461 6.00956 2.93856 5.73998C4.13101 5.4704 5.36488 5.97445 6.0275 7.00186L10.7633 4.29436C10.7021 4.06285 10.6696 3.82466 10.6667 3.58519C10.6547 2.19079 11.6232 0.979477 12.986 0.68421C14.3488 0.388943 15.7318 1.09081 16.298 2.36512C16.8643 3.63943 16.4583 5.13621 15.3258 5.94978C14.1933 6.76335 12.6452 6.67027 11.6183 5.72686L6.4925 8.65602C6.48742 8.87213 6.45722 9.0869 6.40249 9.29603L11.6183 12.2769C12.5785 11.3956 14.0073 11.2596 15.1166 11.9438C16.2258 12.628 16.7455 13.9658 16.389 15.2194C16.0325 16.473 14.8866 17.3371 13.5833 17.3352ZM13.5833 13.1685C12.893 13.1685 12.3333 13.7282 12.3333 14.4185C12.3333 15.1089 12.893 15.6685 13.5833 15.6685C14.2737 15.6685 14.8333 15.1089 14.8333 14.4185C14.8333 13.7282 14.2737 13.1685 13.5833 13.1685ZM3.58333 7.33519C2.89297 7.33519 2.33333 7.89484 2.33333 8.58519C2.33333 9.27555 2.89297 9.83519 3.58333 9.83519C4.27368 9.83519 4.83333 9.27555 4.83333 8.58519C4.83333 7.89484 4.27368 7.33519 3.58333 7.33519ZM13.5833 2.33519C12.893 2.33519 12.3333 2.89484 12.3333 3.58519C12.3333 4.27555 12.893 4.83519 13.5833 4.83519C14.2737 4.83519 14.8333 4.27555 14.8333 3.58519C14.8333 2.89484 14.2737 2.33519 13.5833 2.33519Z" fill="#7B838A" />
														</svg>
													</span>
													<div className="team-img-div mx-auto position-relative">
														<img src="../assets/images/team-ball-img.svg" alt="" />
													</div>
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
										<div className="row me-0">
											<div className="col-12 mt-5 mb-3 pe-0">
												<mark className="event-mark">Completed Event</mark>
											</div>
											<div className="col-xl-3 col-lg-4 col-sm-6 mb-3 text-center pe-0">
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
											<div className="col-xl-3 col-lg-4 col-sm-6 mb-3 text-center pe-0">
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
											<div className="col-xl-3 col-lg-4 col-sm-6 mb-3 text-center pe-0">
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
									</>
								)}

								{/* =============================== Event Details ===================================  */}

								{eventState.eventDetail && (
									<>
										<div className="row">
											<div className="col-12 d-flex align-items-center">
												<div>
													<div className="mt-3 mt-md-0 tabs-heading-txt">
														<h5 className="mb-0">Events</h5>
													</div>
													<div className="market-head-txt">
														<span>
															Events &gt;
															<bdi> Event Details</bdi>
														</span>
													</div>
												</div>
												<div className="position-relative ms-auto mt-3 mt-md-0">
													<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6C6A81" className="bi bi-search fix-in-icon" viewBox="0 0 16 16">
														<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
													</svg>
													<input type="input" className="form-control login-comn-input searchbar ps-5" placeholder="Search" />
												</div>
											</div>
											<div className="col-12 mt-3">
												<div className="d-md-flex align-items-center justify-content-between team-join-class p-3">
													<div className="d-flex align-items-center">
														<div className="team-img-div">
															<div className="schedule-date-box mx-auto p-2">
																<span>SAT</span>
																<bdi>30</bdi>
															</div>
														</div>
														<div className="ms-3 team-detail-name">
															<span>Practice</span>
															<p className="position-relative mb-0">
																Arrive 6:45 <bdi></bdi> 7:00 - 8:00 AM
															</p>
														</div>
													</div>
												</div>
											</div>
											<div className="col-12 mt-3">
												<div className="d-sm-flex align-items-center justify-content-between team-join-class p-3">
													<div className="d-flex align-items-center">
														<div className="">
															<img src="./assets/images/deal-detail-profile.png" alt="" />
														</div>
														<div className="ms-3 team-detail-name">
															<span>You’re Going</span>
														</div>
													</div>
													<div className="ms-sm-auto mt-3 mt-sm-0">
														<button className="comn-btn-class" type="button">
															Change Status
														</button>
													</div>
												</div>
											</div>
										</div>

										<div className="row">
											<div className="col-md-8 mt-3 pe-0">
												<div className="event-map-main p-3">
													<div className="d-sm-flex align-items-center">
														<div className="team-detail-name">
															<span>Cloverdale Athletic Park</span>
															<p className="position-relative mb-0">Surry BC, Caneda</p>
														</div>
														<div className="ms-sm-auto mt-3 mt-sm-0">
															<button className="comn-white-btn me-sm-2" data="View Map"></button>
														</div>
													</div>
													<div className="mt-3">
														<iframe width="100%" height="400" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
													</div>
												</div>
											</div>
											<div className="col-md-4 mt-3">
												<div className="weather-day-div p-3">
													<label>Weather That Day</label>
													<div>
														<ul>
															<li className="d-flex">
																<span>6 AM</span>
																<bdi className="ms-auto">62°C | Rain 10%</bdi>
															</li>
															<li className="d-flex">
																<span>7 AM</span>
																<bdi className="ms-auto">65°C | Rain 5%</bdi>
															</li>
															<li className="d-flex">
																<span>8 AM</span>
																<bdi className="ms-auto">58°C | Rain 13%</bdi>
															</li>
															<li className="d-flex">
																<span>9 AM</span>
																<bdi className="ms-auto">60°C | Rain 8%</bdi>
															</li>
														</ul>
													</div>
												</div>
												<div className="player-staff-rsvp mt-3 p-3">
													<mark>Player RSVP</mark>
													<div className="mt-2">
														<span className="me-3">
															0
															<svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="ms-1" xmlns="http://www.w3.org/2000/svg">
																<path d="M11.9997 23.6654C5.55928 23.6583 0.340081 18.4391 0.333008 11.9987V11.7654C0.461261 5.35401 5.74003 0.248001 12.1521 0.333079C18.5642 0.418157 23.7057 5.66242 23.6638 12.0749C23.6219 18.4875 18.4123 23.6641 11.9997 23.6654ZM6.64467 11.5204L4.99967 13.1654L9.66634 17.8321L18.9997 8.49872L17.3547 6.84205L9.66634 14.5304L6.64467 11.5204Z" fill="#27AE60" />
															</svg>
														</span>
														<span className="me-3">
															0
															<svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="ms-1" xmlns="http://www.w3.org/2000/svg">
																<path d="M11.9997 23.6667C8.90464 23.6695 5.93555 22.4412 3.74702 20.2527C1.5585 18.0642 0.330228 15.0951 0.333013 12.0001V11.7667C0.428432 7.09098 3.30544 2.92357 7.64377 1.17696C11.9821 -0.569648 16.9441 0.441768 20.2527 3.74706C23.5922 7.08382 24.5917 12.1043 22.7847 16.4656C20.9778 20.827 16.7205 23.6695 11.9997 23.6667ZM11.9997 13.6451L15.0214 16.6667L16.6664 15.0217L13.6447 12.0001L16.6664 8.97839L15.0214 7.33339L11.9997 10.3551L8.97802 7.33339L7.33302 8.97839L10.3547 12.0001L7.33302 15.0217L8.97802 16.6667L11.9997 13.6462V13.6451Z" fill="#EB5757" />
															</svg>
														</span>
														<span className="me-3">
															2
															<svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="ms-1" xmlns="http://www.w3.org/2000/svg">
																<path d="M11.9997 23.6654C5.55635 23.6654 0.333008 18.442 0.333008 11.9987C0.333008 5.55538 5.55635 0.332031 11.9997 0.332031C18.443 0.332031 23.6663 5.55538 23.6663 11.9987C23.6593 18.4391 18.4401 23.6583 11.9997 23.6654ZM10.833 17.832V20.1654H13.1663V17.832H10.833ZM11.9997 6.16536C13.2883 6.16536 14.333 7.21003 14.333 8.4987C14.3371 9.11788 14.0885 9.71196 13.6447 10.1437L12.198 11.6137C11.3247 12.4907 10.8339 13.6777 10.833 14.9154V15.4987H13.1663C13.0757 14.2445 13.5815 13.021 14.5313 12.197L15.5813 11.1237C16.2791 10.4287 16.6698 9.48349 16.6664 8.4987C16.6664 5.92137 14.577 3.83203 11.9997 3.83203C9.42235 3.83203 7.33301 5.92137 7.33301 8.4987H9.66634C9.66634 7.21003 10.711 6.16536 11.9997 6.16536Z" fill="#2D9CDB" />
															</svg>
														</span>
													</div>
													<div className="mt-3">
														<mark>Player RSVP</mark>
														<div className="mt-2">
															<span className="me-3">
																1
																<svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="ms-1" xmlns="http://www.w3.org/2000/svg">
																	<path d="M11.9997 23.6654C5.55928 23.6583 0.340081 18.4391 0.333008 11.9987V11.7654C0.461261 5.35401 5.74003 0.248001 12.1521 0.333079C18.5642 0.418157 23.7057 5.66242 23.6638 12.0749C23.6219 18.4875 18.4123 23.6641 11.9997 23.6654ZM6.64467 11.5204L4.99967 13.1654L9.66634 17.8321L18.9997 8.49872L17.3547 6.84205L9.66634 14.5304L6.64467 11.5204Z" fill="#27AE60" />
																</svg>
															</span>
															<span className="me-3">
																0
																<svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="ms-1" xmlns="http://www.w3.org/2000/svg">
																	<path d="M11.9997 23.6667C8.90464 23.6695 5.93555 22.4412 3.74702 20.2527C1.5585 18.0642 0.330228 15.0951 0.333013 12.0001V11.7667C0.428432 7.09098 3.30544 2.92357 7.64377 1.17696C11.9821 -0.569648 16.9441 0.441768 20.2527 3.74706C23.5922 7.08382 24.5917 12.1043 22.7847 16.4656C20.9778 20.827 16.7205 23.6695 11.9997 23.6667ZM11.9997 13.6451L15.0214 16.6667L16.6664 15.0217L13.6447 12.0001L16.6664 8.97839L15.0214 7.33339L11.9997 10.3551L8.97802 7.33339L7.33302 8.97839L10.3547 12.0001L7.33302 15.0217L8.97802 16.6667L11.9997 13.6462V13.6451Z" fill="#EB5757" />
																</svg>
															</span>
															<span className="me-3">
																0
																<svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="ms-1" xmlns="http://www.w3.org/2000/svg">
																	<path d="M11.9997 23.6654C5.55635 23.6654 0.333008 18.442 0.333008 11.9987C0.333008 5.55538 5.55635 0.332031 11.9997 0.332031C18.443 0.332031 23.6663 5.55538 23.6663 11.9987C23.6593 18.4391 18.4401 23.6583 11.9997 23.6654ZM10.833 17.832V20.1654H13.1663V17.832H10.833ZM11.9997 6.16536C13.2883 6.16536 14.333 7.21003 14.333 8.4987C14.3371 9.11788 14.0885 9.71196 13.6447 10.1437L12.198 11.6137C11.3247 12.4907 10.8339 13.6777 10.833 14.9154V15.4987H13.1663C13.0757 14.2445 13.5815 13.021 14.5313 12.197L15.5813 11.1237C16.2791 10.4287 16.6698 9.48349 16.6664 8.4987C16.6664 5.92137 14.577 3.83203 11.9997 3.83203C9.42235 3.83203 7.33301 5.92137 7.33301 8.4987H9.66634C9.66634 7.21003 10.711 6.16536 11.9997 6.16536Z" fill="#2D9CDB" />
																</svg>
															</span>
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
		</>
	);
}
