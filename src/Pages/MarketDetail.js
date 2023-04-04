import React, { useState, useEffect, useContext } from "react";
import MainLayout from "../Components/Layout/MainLayout";
import { Tab, Nav, Modal, Collapse } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FetchPostApi } from "../Api/apiServices";
import { API_Path, calculateAge, SetDate } from "../Api/Const";
import { toast } from "react-toastify";
import Loader from "../Components/Loader/Loader";
import ReactApexChart from "react-apexcharts";
import MarketDealsTab from "../Components/AllTabs/MarketDealsTab";
import MarketReviewModal from "../Components/AllModals/MarketReviewModal";
import NewsFeedModal from "../Components/AllModals/NewsFeedModal";
import roleContext from "../contexts/roleContext";
import AddNewPost from "./Common/AddNewPost";
import ProfileLayout from "../Components/ProfileLayout/MainProfileLayout";
import AthleteProfileEdit from "./athlete-profile-edit";

export default function MarketDetails() {
	const navigate = useNavigate();
	const location = useLocation();
	const context = useContext(roleContext);

	const [userId, setuserId] = useState('');
	const [signType, setsignType] = useState('');
	const [shownewpostdiv, setshownewpostdiv] = useState(false);
	const [ediprofiledivshow, setediprofiledivshow] = useState(false);


	const Team = location?.state?.Team;
	const Athlete = location?.state?.Athlete;
	const athletesId = (location?.state?.athletesId) ?? userId;
	const favAthlete = location?.state?.favAthlete;

	const [flag, setFlag] = useState(true);
	const [loader, setloader] = useState(false);
	const [loading, setLoading] = useState(false);
	const [opencard, setOpenCard] = useState(false);
	const [newsfeed, setNewsfeed] = useState(false);
	const [reviewshow, setReviewModalShow] = useState(false);
	const [donatemodalShow, setdonateModalShow] = useState(false);
	const [defultview, setdefultview] = useState(true);


	const [country, setcountry] = useState("");

	const [score, setScore] = useState(0);
	const [profile, setProfile] = useState({});
	const [allPosts, setAllPosts] = useState([]);
	const [followers, setFollowers] = useState([]);
	const [socialData, setSocialData] = useState([]);
	const [selectedFeed, setSelectedFeed] = useState("");
	const [ReviewDetails, setReviewDetails] = useState({});
	const [additionalDetail, setAdditionalDetail] = useState({});
	const [optionReview, setOptionReview] = useState({ sizePerPage: 1, search: {}, page: 0, sort: "createdAt", order: "ASC" });

	useEffect(() => {
		setuserId(context.user_id)
		setsignType(context.signup_type)
		setcountry(context.country)
	}, [context])

	useEffect(() => {
		if (athletesId) {
			getAthleteProfile()
			getAdditionalDetails();
			getAthleteScore();
			getAllPosts();
		}
	}, [athletesId]);

	useEffect(() => {
		if (reviewshow) {
			handleReviewModal();
		}
	}, [optionReview.sizePerPage]);

	const getAthleteProfile = async () => {
		let result = await FetchPostApi(API_Path.athleteProfile, { user_id: athletesId });
		let getAthlete = await result.json();
		if (result.status === 200) {
			setProfile(getAthlete?.data[0]);
		} else {
			toast.error(getAthlete.message);
		}
	};

	const getAdditionalDetails = async () => {
		let result = await FetchPostApi(API_Path.additionalDetail, { user_id: athletesId });
		let getAthlete = await result.json();
		if (result.status === 200) {
			setAdditionalDetail(getAthlete.data[0]);
		} else {
			toast.error(getAthlete.message);
		}
	};

	const getAthleteScore = async () => {
		let result = await FetchPostApi(API_Path.athleteScore, { user_id: athletesId });
		let getAthlete = await result.json();
		if (result.status === 200) {
			setScore(getAthlete.data);
		} else {
			toast.error(getAthlete.message);
		}
	};

	const getAllPosts = async () => {
		let result = await FetchPostApi(API_Path.postData, { user_id: athletesId });
		let getAthlete = await result.json();
		if (result.status === 200) {
			setAllPosts(getAthlete?.data);
			setFlag(false);
		} else {
			toast.error(getAthlete.message);
			setFlag(false);
		}
	};

	const handleFavorite = async () => {
		let result = await FetchPostApi(API_Path.addToFav, { favorite_user_id: athletesId });
		let getAthlete = await result.json();
		if (result.status === 200) {
			getAthleteProfile(athletesId);
			toast.success(getAthlete.message);
		} else {
			toast.error(getAthlete.message);
		}
	};

	const handleReviewModal = async () => {
		if (profile?.avg_review > 0) {
			setReviewModalShow(true);
			setLoading(true);
			let response = await FetchPostApi(API_Path.oneUserAllReview, { user: athletesId, options: optionReview });
			let result = await response.json();
			if (response.status === 200) {
				setReviewDetails(result?.data);
				setLoading(false);
			} else {
				toast.error("No athletes detail available");
				setLoading(false);
			}
		}
	};

	const getsocial = async () => {
		let result = await FetchPostApi(API_Path.getsocial, { user_id: athletesId });
		let getProfile = await result.json();
		if (result.status === 200) {
			setSocialData(getProfile?.data);
			setloader(false);
		} else {
			toast.error(getProfile.message);
		}
	};

	const follower = (followerNumber) => {
		if (Number(followerNumber) >= 1000) {
			let num = Number(followerNumber) / 1000;
			return num + "K";
		}
		if (Number(followerNumber) >= 100000) {
			let num = Number(followerNumber) / 100000;
			return num + "L";
		}
		if (Number(followerNumber) >= 1000000) {
			let num = Number(followerNumber) / 1000000;
			return num + "M";
		} else {
			return Number(followerNumber);
		}
	};

	const scoreChart = {
		series: [score ? score : 0],
		chart: {
			type: "radialBar",
			offsetY: -20,
			sparkline: {
				enabled: true,
			},
		},
		plotOptions: {
			radialBar: {
				startAngle: -90,
				endAngle: 90,
				track: {
					background: "#F4F7FE",
					strokeWidth: "97%",
					margin: 5,
					dropShadow: {
						enabled: false,
						top: 2,
						left: 0,
						color: "#999",
						opacity: 1,
						blur: 2,
					},
				},
				dataLabels: {
					name: {
						show: false,
					},
					value: {
						offsetY: -2,
						fontSize: "22px",
					},
				},
			},
		},
		grid: {
			padding: {
				top: -10,
			},
		},
		fill: {
			type: "gradient",
			gradient: {
				shadeIntensity: 1,
				opacityFrom: 0.7,
				opacityTo: 0.9,
				colorStops: [
					{
						offset: 0,
						color: "#4599F4",
						opacity: 1,
					},
					{
						offset: 100,
						color: "#6A58FB",
						opacity: 1,
					},
				],
			},
		},
		labels: ["Average Results"],
	};

	const newsFeedClick = (id) => {
		setSelectedFeed(id);
		setNewsfeed(true);
	}

	const editprofiledivshowhandel = () => {
		setdefultview(false);
		setshownewpostdiv(false);
		setediprofiledivshow(true);
	};

	const closeeditprofiledivshowhandel = () => {
		setshownewpostdiv(false);
		setediprofiledivshow(false);
		setdefultview(true);
	};

	const handlenewpost = () => {
		setediprofiledivshow(false);
		setdefultview(false);
		setshownewpostdiv(true);
	};

	const closehandlenewpost = () => {
		setshownewpostdiv(false);
		setediprofiledivshow(false);
		setdefultview(true);
	};

	return (
		<MainLayout>
			<>
				<section className="gray-bg-section">
					<div className="container">
						{loader && flag ? (
							<Loader />
						) : (<div className="row">
							{!(location?.state?.athletesId) &&
								<div className="col-xl-2 col-md-3 ">
									<ProfileLayout />
								</div>}
							<div className={!(location?.state?.athletesId) ? "col-xl-10 col-md-9" : "col-xl-12 "}>
								{defultview &&
									<div className="row">
										<div className="col-12">
											<div className="market-head-txt">
												<span>
													{favAthlete === "favorite Athlete" && (
														<span>
															<Link to="/favoriteathlete">Favorite Athlete</Link> &gt;
															<span>
																<bdi>{profile?.name}</bdi>
															</span>
														</span>
													)}
													{Athlete === "Athlete" && (
														<span>
															<Link to="/latest">NIL MarketPlace</Link> &gt;
															<span>
																<bdi>{profile?.name}</bdi>
															</span>
														</span>
													)}
													{Team === "Team" && (
														<span>
															<Link to="/team">Team</Link> &gt;
															<span>
																<bdi>{profile?.name}</bdi>
															</span>
														</span>
													)}
												</span>
											</div>
										</div>
										<div className="col-xxl-4 col-lg-5">
											<div className="customer-page-box h-auto">
												<div className="img-div-main position-relative">
													<img src={profile?.cover_img ? profile?.cover_img : require("../assets/images/defaultStrPic.png")} className="img-fluid w-100" alt="cover" />
												</div>
												<div className="customer-page-box-body">
													<div className="player-detail">
														<div className="athlete-profile">
															<img src={profile?.profile_img ? profile?.profile_img : require("../assets/images/defaultProPic.png")} alt="profile" />
														</div>
														<div className="athelete-name-txt">
															<label className="d-block">{profile?.name}</label>
															<p className="mb-0">{profile?.AwardsHonors?.[0]}</p>
														</div>
														<div className="athelete-name-txt">
															<span>Sports : {profile?.sports > 1 ? <b>{profile?.sports.slice(0, 4).join(" | ")}</b> : <b>{profile?.sports?.[0]}</b>}</span>
															{/* <span>Sports : {athletesDetails?.users?.sports && athletesDetails?.users?.sports.length > 0 ? <b>{athletesDetails?.users?.sports?.map((item) => item).join(" | ")}</b> : <b>No details available</b>}</span> */}
														</div>
														<div className="row mt-2">
															<div className="col-6">
																<div className="d-flex flex-column">
																	{/* <span className="me-3 mb-1">
                                									Language: <b>English</b>
                              									</span> */}
																	<span className="me-3 mb-1">Age: {profile?.DOB ? <b>{calculateAge(profile?.DOB)}</b> : <b>-</b>}</span>
																	<span className="me-3 mb-1">Gender: {profile?.gender ? <b>{profile?.gender}</b> : <b>-</b>}</span>
																</div>
															</div>
															<div className="col-6">
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
																	<bdi>{profile?.univercity ? profile?.univercity : <b>-</b>}</bdi>
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
																	<bdi>{profile?.address ? profile?.address : <b>-</b>}</bdi>
																</div>
																<div className="market-rigth-subtxt d-flex align-items-center mb-1" onClick={() => handleReviewModal()}>
																	<img src="../../assets/images/star.svg" className="img-fluid me-1" alt="star" />
																	<span className="rating-value">
																		<bdi className={`linear-txt ${profile?.avg_review === 0 ? "default" : ""}`}>
																			{profile?.avg_review} ( {profile?.numberOfReview === 0 || profile?.numberOfReview === 1 ? profile?.numberOfReview + " Review" : profile?.numberOfReview + "+ Reviews "})
																		</bdi>
																	</span>
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
																<bdi>{additionalDetail?.DOB ? SetDate(additionalDetail?.DOB) : "-"}</bdi>
															</div>
														</li>
														<li>
															<div className="additional-detail">
																<span>Gender:</span>
																<bdi>{additionalDetail?.gender ?? "-"}</bdi>
															</div>
															{/* <div className="additional-detail">
															<span>Mailing Address:</span>
															<bdi>marie_robinsin12@mail.com</bdi>
															</div> */}
															<div className="additional-detail">
																<span>Email Address:</span>
																<bdi>{additionalDetail?.email ?? "-"}</bdi>
															</div>
															<div className="additional-detail">
																<span>Phone:</span>
																<bdi>{additionalDetail?.contact_no ?? "-"}</bdi>
															</div>
															<div className="additional-detail">
																<span>Faith:</span>
																<bdi>{additionalDetail?.additionalinfo?.faith ?? "-"}</bdi>
															</div>
															<div className="additional-detail">
																<span>Family Circle:</span>
																<bdi>{additionalDetail?.additionalinfo?.familyCircle ?? "-"}</bdi>
															</div>
															<div className="additional-detail">
																<span>Academics:</span>
																<bdi>{additionalDetail?.additionalinfo?.Academics ?? "-"}</bdi>
															</div>
															<div className="additional-detail">
																<span>Graduation Year:</span>
																<bdi>{additionalDetail?.additionalinfo?.GraduationYear ?? "-"}</bdi>
															</div>
															{/* <div className="additional-detail">
																<span>GPA:</span>
																<bdi>C+</bdi>
															</div> */}
															<div className="additional-detail">
																<span>SAT:</span>
																<bdi>{additionalDetail?.additionalinfo?.Sat ?? "-"}</bdi>
															</div>
															<div className="additional-detail">
																<span>ACT:</span>
																<bdi>{additionalDetail?.additionalinfo?.Act ?? "-"}</bdi>
															</div>
															<div className="additional-detail">
																<span>Class Rank:</span>
																<bdi>{additionalDetail?.additionalinfo?.ClassRank ?? "-"}</bdi>
															</div>
															<div className="additional-detail">
																<span>Class Size:</span>
																<bdi>{additionalDetail?.additionalinfo?.ClassSize ?? "-"}</bdi>
															</div>
															<div className="additional-detail">
																<span>Awards Honors:</span>
																<bdi>{additionalDetail?.additionalinfo?.AwardsHonors?.length > 0 ? additionalDetail?.additionalinfo?.AwardsHonors[0] : "-"}</bdi>
																{/* <bdi>{(athletesDetails?.users?.AwardsHonors && athletesDetails?.users?.AwardsHonors.length > 0) ? athletesDetails?.users?.AwardsHonors.map(item => item).join(", ") : "-"}</bdi> */}
															</div>
															<div className="additional-detail">
																<span>NCAA Clearinghouse registered:</span>
																<bdi>{additionalDetail?.additionalinfo?.Ncaa ?? "-"}</bdi>
															</div>
															<div className="additional-detail">
																<span>Athletics:</span>
																<bdi>{additionalDetail?.additionalinfo?.sports?.length > 0 ? additionalDetail?.additionalinfo?.sports.map((item, i) => <li key={i}>{item}</li>).join(", ") : "-"}</bdi>
															</div>
															<div className="additional-detail">
																<span>Height:</span>
																<bdi>{additionalDetail?.additionalinfo?.Height ? additionalDetail?.additionalinfo?.Height + "’" : "-"}</bdi>
															</div>
															<div className="additional-detail">
																<span>Weight:</span>
																<bdi>{additionalDetail?.additionalinfo?.Weight ?? "-"}</bdi>
															</div>
															{/* <div className="additional-detail">
															<span>Event</span>
															<bdi>40 Dash</bdi>
															</div>
															<div className="additional-detail">
															<span>Position</span>
															<bdi>RB</bdi>
															</div> */}
															<div className="additional-detail">
																<span>School/Collage:</span>
																<bdi>{additionalDetail?.univercity ?? "-"}</bdi>
															</div>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="col-xx-8 col-lg-7 mt-lg-0 mt-3">
											<div className="market-right-detail">
												<div className="score-div">
													<h6>About</h6>
													<div className="d-xl-flex">
														<ReactApexChart options={scoreChart} series={scoreChart.series} type="radialBar" height={300} />
														<div className="score-detail ms-3 mt-xl-0 mt-3">
															<span className="me-3">Starprospect Score</span>
															<bdi>{score ? score : 0}</bdi>
															{/* <p>Starprospect Score is Based on the amount of details they complete on their own personal profile + messages they send + their postings on the newsfeed</p> */}
															<p>Your score is 450 pts lower than the top 10% of athletes</p>
														</div>
													</div>
												</div>
												<div className="deal-social-box-info mt-3">
													{followers?.length > 0 &&
														followers.map((item, i) => {
															return (
																<div className="deal-social-box mb-2 me-3" key={i}>
																	{item?.socialMediaType === 1 && (
																		<div className="social-score-detail text-center p-3">
																			<div className="soc-img-div">
																				<img src="../assets/images/instagram-icon.png" className="img-fluid" alt="" />
																			</div>
																			<div className="soc-innr-percent">
																				<p>Instagram</p>
																				<div className="mt-auto">
																					<span>{follower(item?.follower)}</span>
																					{/* <bdi>25.2%</bdi> */}
																				</div>
																			</div>
																		</div>
																	)}
																	{item?.socialMediaType === 2 && (
																		<div className="social-score-detail text-center p-3">
																			<div className="soc-img-div">
																				<img src="../assets/images/Facebook-icon.png" className="img-fluid" alt="" />
																			</div>
																			<div className="soc-innr-percent">
																				<p>Facebook</p>
																				<div className="mt-auto">
																					<span>{follower(item?.follower)}</span>
																					{/* <bdi>25.2%</bdi> */}
																				</div>
																			</div>
																		</div>
																	)}
																	{item?.socialMediaType === 3 && (
																		<div className="social-score-detail text-center p-3">
																			<div className="soc-img-div">
																				<img src="../assets/images/YouTube-icon.png" className="img-fluid" alt="" />
																			</div>
																			<div className="soc-innr-percent">
																				<p>YouTube</p>
																				<div className="mt-auto">
																					<span>{follower(item?.follower)}</span>
																					{/* <bdi>25.2%</bdi> */}
																				</div>
																			</div>
																		</div>
																	)}
																	{item?.socialMediaType === 4 && (
																		<div className="social-score-detail text-center p-3">
																			<div className="soc-img-div">
																				<img src="../assets/images/linkedin_icon-icon.png" className="img-fluid" alt="" />
																			</div>
																			<div className="soc-innr-percent">
																				<p>Linkedin</p>
																				<div className="mt-auto">
																					<span>{follower(item?.follower)}</span>
																					{/* <bdi>25.2%</bdi> */}
																				</div>
																			</div>
																		</div>
																	)}
																	{item?.socialMediaType === 5 && (
																		<div className="social-score-detail text-center p-3">
																			<div className="soc-img-div">
																				<img src="../assets/images/twitter-icon.png" className="img-fluid" alt="" />
																			</div>
																			<div className="soc-innr-percent">
																				<p>Twitter</p>
																				<div className="mt-auto">
																					<span>{follower(item?.follower)}</span>
																					{/* <bdi>25.2%</bdi> */}
																				</div>
																			</div>
																		</div>
																	)}
																	{item?.socialMediaType === 7 && (
																		<div className="social-score-detail text-center p-3">
																			<div className="soc-img-div">
																				<img src="../assets/images/Tik-Tok-icon.png" className="img-fluid" alt="" />
																			</div>
																			<div className="soc-innr-percent">
																				<p>Tik-Tok</p>
																				<div className="mt-auto">
																					<span>{follower(item?.follower)}</span>
																					{/* <bdi>25.2%</bdi> */}
																				</div>
																			</div>
																		</div>
																	)}
																</div>
															);
														})}
												</div>
												<div className="row">
													<div className="col">
														<div className="d-flex flex-wrap ">
															<div className="me-2">
																<button className="comn-white-btn mt-3" data="" onClick={() => handleFavorite()}>
																	<svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={profile?.is_favorite ? "c path" : ""}>
																		<path d="M2.31802 2.31802C0.56066 4.07538 0.56066 6.92462 2.31802 8.68198L10.0001 16.364L17.682 8.68198C19.4393 6.92462 19.4393 4.07538 17.682 2.31802C15.9246 0.56066 13.0754 0.56066 11.318 2.31802L10.0001 3.63609L8.68198 2.31802C6.92462 0.56066 4.07538 0.56066 2.31802 2.31802Z" stroke="url(#paint0_linear_5234_6596)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
																		<defs>
																			<linearGradient id="paint0_linear_5234_6596" x1="1.72656" y1="4.2368" x2="21.0586" y2="8.30841" gradientUnits="userSpaceOnUse">
																				<stop stopColor="#6A58FB" />
																				<stop offset="1" stopColor="#4599F4" />
																			</linearGradient>
																		</defs>
																	</svg>
																</button>
															</div>
															<div className="me-2">
																<button className="comn-white-btn mt-3" data="">
																	<svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M6 9H6.01M10 9H10.01M14 9H14.01M19 9C19 13.4183 14.9706 17 10 17C8.46073 17 7.01172 16.6565 5.74467 16.0511L1 17L2.39499 13.28C1.51156 12.0423 1 10.5743 1 9C1 4.58172 5.02944 1 10 1C14.9706 1 19 4.58172 19 9Z" stroke="url(#paint0_linear_5234_3811)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
																		<defs>
																			<linearGradient id="paint0_linear_5234_3811" x1="1.72656" y1="4.37079" x2="21.1228" y2="8.29353" gradientUnits="userSpaceOnUse">
																				<stop stopColor="#6A58FB" />
																				<stop offset="1" stopColor="#4599F4" />
																			</linearGradient>
																		</defs>
																	</svg>
																</button>
															</div>
															{!(location?.state?.athletesId) &&
																<>
																	<div className="me-2">
																		<button className="comn-white-btn mt-3 " data="Post" onClick={() => handlenewpost()}></button>
																	</div>
																	<div className="me-2">
																		<button className="comn-white-btn mt-3" data="Edit Profile" onClick={() => editprofiledivshowhandel()}></button>
																	</div>
																</>
															}
															{((signType === 1) || (signType === 3)) &&
																<>
																	<div className="me-sm-2">
																		<button className="comn-white-btn mt-3 px-4" data="Donate" onClick={() => setdonateModalShow(true)}></button>
																	</div>
																	<div>
																		<button className="comn-btn-class mt-3" onClick={() => navigate("/make-deal", { state: { athletesId: athletesId, Athlete: "Athlete", AthleteName: profile?.name } })}>
																			MAKE A DEAL
																		</button>
																	</div>
																</>}
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-12 text-center">
														<div className="mt-4">
															<Tab.Container id="left-tabs-example" defaultActiveKey="newsfeed">
																<div className="comn-tab-sec  position-relative">
																	<Nav variant="pills">
																		<Nav.Item>
																			<Nav.Link eventKey="newsfeed">Newsfeed</Nav.Link>
																		</Nav.Item>
																		<Nav.Item onClick={() => getsocial()}>
																			<Nav.Link eventKey="deals">Deals</Nav.Link>
																		</Nav.Item>
																	</Nav>
																</div>
																<Tab.Content>
																	<Tab.Pane eventKey="newsfeed">
																		<div className=" mt-3 Atheletes-news-feed ">
																			{allPosts && allPosts?.length > 0 ? (
																				allPosts?.map((item) => {
																					return (
																						item?.images?.length > 0 &&
																						item?.images?.map((img, i) => {
																							return (
																								<div className="fix-col-news mb-3" key={i} onClick={() => newsFeedClick(item._id)}>
																									<div className="deal-newsfeed-tab">{img.includes(".mp4") ? <video src={img} className="img-fluid" alt="" controls /> : <img src={img} className="img-fluid" alt="" />}</div>
																								</div>
																							);
																						})
																					);
																				})
																			) : (
																				<div className="postNotFound">No Posts Available</div>
																			)}
																		</div>
																	</Tab.Pane>
																	<Tab.Pane eventKey="deals">
																		<MarketDealsTab socialData={socialData} />
																	</Tab.Pane>
																</Tab.Content>
															</Tab.Container>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								}
								{/* ================ Add New Post ==================== */}
								{shownewpostdiv && (
									<AddNewPost closehandlenewpost={closehandlenewpost} />
								)}
								{/* ================ Profile Edit ==================== */}
								{ediprofiledivshow && (
									<AthleteProfileEdit closeeditprofiledivshowhandel={closeeditprofiledivshowhandel} profile={profile} additionalDetail={additionalDetail} setdefultview={setdefultview} setediprofiledivshow={setediprofiledivshow} getAthleteProfile={getAthleteProfile} getAdditionalDetails={getAdditionalDetails} />
								)}
							</div>
						</div>)}
					</div>
				</section>
				{donatemodalShow && (
					<Modal show={donatemodalShow} onHide={() => setdonateModalShow(false)} size="md" className="donate-modal-style comn-modal-style" centered>
						<Modal.Header closeButton className="border-0 pb-0">
							<div className="modal-data">
								<span className="mb-0">Donation</span>
							</div>
						</Modal.Header>
						<Modal.Body className="pt-0">
							<div className="row">
								<div className="col-12">
									<div className="payment-main-sec p-3">
										<div className="mb-3">
											<ul className="row">
												<li className="col-4">
													<div>
														<label className="cust-radio-btn p-0">
															<input type="radio" name="donate" />
															<span className="cust-chkbox-soc hobby-checkbx">$5.00</span>
														</label>
													</div>
												</li>
												<li className="col-4">
													<div>
														<label className="cust-radio-btn p-0">
															<input type="radio" name="donate" />
															<span className="cust-chkbox-soc hobby-checkbx">$25.00</span>
														</label>
													</div>
												</li>
												<li className="col-4">
													<div>
														<label className="cust-radio-btn p-0">
															<input type="radio" name="donate" />
															<span className="cust-chkbox-soc hobby-checkbx">$50.00</span>
														</label>
													</div>
												</li>
												<li className="col-4">
													<div>
														<label className="cust-radio-btn p-0">
															<input type="radio" name="donate" />
															<span className="cust-chkbox-soc hobby-checkbx">$100.00</span>
														</label>
													</div>
												</li>
												<li className="col-4">
													<div>
														<label className="cust-radio-btn p-0">
															<input type="radio" name="donate" />
															<span className="cust-chkbox-soc hobby-checkbx">$500.00</span>
														</label>
													</div>
												</li>
												<li className="col-4">
													<div>
														<label className="cust-radio-btn p-0">
															<input type="radio" name="donate" defaultChecked />
															<span className="cust-chkbox-soc hobby-checkbx">Custom</span>
														</label>
													</div>
												</li>
											</ul>
										</div>
										<div className="mb-3">
											<bdi className="d-block position-relative">
												<input type="tel" className="form-control comn-input-style ps-3" placeholder="$1200.00" />
												<span className="showpwd-class bg-transparent" id="show_pwd">
													<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M18 16H2C0.89543 16 0 15.1046 0 14V2C0 0.89543 0.89543 0 2 0H18C19.1046 0 20 0.89543 20 2V14C20 15.1046 19.1046 16 18 16ZM2 8V14H18V8H2ZM2 2V4H18V2H2ZM11 12H4V10H11V12Z" fill="#7B838A" />
													</svg>
												</span>
											</bdi>
										</div>
										<div className="comnn-white-back-bg-box p-0">
											<form className="row">
												<div className="col-12 mb-3">
													<div className="cust-radio-div ">
														<div className="form-check mb-2">
															<input className="form-check-input" type="radio" name="payment" id="paypal" defaultChecked onClick={() => setOpenCard(false)} />
															<label className="form-check-label ms-2" htmlFor="paypal">
																<div className="d-flex flex-column payment-class">
																	<span>
																		<img src="../assets/images/paypal.svg" alt="" />
																	</span>
																	<bdi>You’ll be redirected to paypal.com</bdi>
																</div>
															</label>
														</div>
														<div className="form-check mb-2">
															<input className="form-check-input" type="radio" name="payment" id="gpay" onClick={() => setOpenCard(false)} />
															<label className="form-check-label ms-2" htmlFor="gpay">
																<div className="d-flex flex-column payment-class">
																	<span>
																		<img src="../assets/images/google-pay-img.svg" alt="" />
																	</span>
																	<bdi>You’ll be redirected to googlepay.com</bdi>
																</div>
															</label>
														</div>
														<div className="form-check mb-2">
															<input className="form-check-input" type="radio" name="payment" id="applepay" onClick={() => setOpenCard(false)} />
															<label className="form-check-label ms-2" htmlFor="applepay">
																<div className="d-flex flex-column payment-class">
																	<span>
																		<img src="../assets/images/apple-pay-img.svg" alt="" />
																	</span>
																	<bdi>You’ll be redirected to applepay.com</bdi>
																</div>
															</label>
														</div>
														<div className="form-check mb-2">
															<input className="form-check-input" type="radio" name="payment" id="creditcard" onClick={() => setOpenCard(true)} />
															<label className="form-check-label ms-2" htmlFor="creditcard">
																<div className="d-flex flex-column payment-class">
																	<strong>Credit Card</strong>
																	<bdi>All payments will be processed securely</bdi>
																</div>
															</label>
														</div>
														<Collapse in={opencard}>
															<div className="row">
																<div className="col-12 mt-2">
																	<div className="cust-radio-box d-flex align-items-center">
																		<input name="plan" type="radio" id="card-1" />
																		<label className="cust-radio-main w-100 card-1" htmlFor="card-1">
																			<div className="d-flex align-items-center">
																				<div>
																					<img src="../assets/images/card-visa.svg" alt="" />
																				</div>
																				<div className="ms-3">
																					<span>Bank Of America</span>
																					<p className="mb-0 mt-1">Visa Card - XXX02362</p>
																				</div>
																			</div>
																		</label>
																	</div>
																</div>
																<div className="col-12 mt-2">
																	<div className="cust-radio-box d-flex align-items-center">
																		<input name="plan" type="radio" id="card-2" />
																		<label className="cust-radio-main w-100 card-1" htmlFor="card-2">
																			<div className="d-flex align-items-center">
																				<div>
																					<img src="../assets/images/card-visa.svg" alt="" />
																				</div>
																				<div className="ms-3">
																					<span>Bank Of America</span>
																					<p className="mb-0 mt-1">Visa Card - XXX02362</p>
																				</div>
																			</div>
																		</label>
																	</div>
																</div>
																<div className="col-12 mt-3">
																	<div>
																		<h6>
																			<b>Add new card</b>
																		</h6>
																	</div>
																	<div className="row">
																		<div className="col-12 mb-3 mt-2">
																			<bdi className="d-block position-relative">
																				<input type="tel" className="form-control comn-input-style ps-3" placeholder="Enter Card Number" />
																				<span className="showpwd-class bg-transparent" id="show_pwd">
																					<img src="../assets/images/card.svg" alt="" />
																				</span>
																			</bdi>
																		</div>
																		<div className="col-xl-6 col-lg-12 col-sm-6 mb-3">
																			<input className="form-control comn-input-style ps-3" type="month" placeholder="MM/YY" />
																		</div>
																		<div className="col-xl-6 col-lg-12 col-sm-6 mb-3">
																			<input className="form-control comn-input-style ps-3" type="tel" placeholder="CVV" />
																		</div>
																		<div className="col-12 mb-3">
																			<input className="form-control comn-input-style ps-3" type="tel" placeholder="Postal Code" />
																		</div>
																		<div className="col-12">
																			<label className="cust-chk-bx">
																				<input type="checkbox" id="remember-me" name="remember-me" defaultChecked />
																				<span className="cust-chkmark"></span>
																				<b>Securely save this card</b>
																			</label>
																		</div>
																	</div>
																</div>
															</div>
														</Collapse>
													</div>
												</div>
												<div className="col-12 mt-3">
													<button className="comn-btn-class w-100" type="button">
														PAY USING CREDIT CARD
													</button>
												</div>
											</form>
										</div>
										<div></div>
									</div>
								</div>
							</div>
						</Modal.Body>
					</Modal>
				)}
				{/* ===============  setReviewModalShow ============= */}
				{reviewshow && (
					<Modal show={reviewshow} onHide={() => setReviewModalShow(false)} size="md" className="report-post-modal" aria-labelledby="contained-modal-title-vcenter" centered>
						<Modal.Header closeButton className="mt-2">
							<div className="report-post-hdr">
								<p>Rate and Reviews</p>
							</div>
						</Modal.Header>
						<Modal.Body className="">
							<MarketReviewModal ReviewDetails={ReviewDetails} optionReview={optionReview} setOptionReview={setOptionReview} />
						</Modal.Body>
					</Modal>
				)}
				{/* ================ Newsfeed ==================== */}
				{newsfeed && (
					<Modal show={newsfeed} backdrop="static" onHide={() => setNewsfeed(false)} size="xl" className="save-player-modal m-0 p-0" aria-labelledby="contained-modal-title-vcenter" centered>
						<Modal.Header closeButton className="border-0"></Modal.Header>
						<Modal.Body className="">
							<NewsFeedModal selectedPostId={selectedFeed} />
						</Modal.Body>
					</Modal>
				)}
			</>


		</MainLayout>
	);
}
