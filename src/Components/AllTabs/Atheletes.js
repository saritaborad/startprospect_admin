import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import Sliders from "rc-slider";
import "rc-slider/assets/index.css";
import { FetchPostApi } from "../../Api/apiServices";
import { API_Path } from "../../Api/Const";
import { useNavigate } from "react-router-dom";
import Location from "../../assets/images/location.svg";
import DownAerrow from "../../assets/images/down-arrow-icon.svg";
import DefaultPro from "../../assets/images/defaultProPic.png";
import Star from "../../assets/images/star.svg";
import SocOne from "../../assets/images/soc-p-1.png";
import SocTwo from "../../assets/images/soc-p-4.png";
import SocThree from "../../assets/images/soc-p-5.png";

export default function Atheletes() {

	const navigate = useNavigate();
	const [timer, setTimer] = useState(null);
	const [sort, setSort] = useState("");
	const [sportRecord, setSportRecord] = useState([]);
	const [Athlete, setAthlete] = useState([]);
	const [featuredAthlete, setFeaturedAthlete] = useState([]);
	const [topTrending, setTopTrending] = useState([]);
	const [sportss, setSportss] = useState([]);
	const [selectedFilters, setSelectedFilters] = useState({ gender: "", university: "", sort: "" });
	const [total, setTotal] = useState({ allAthlete: "", feaAthlete: "", toptreAthlete: "" });
	const [loading, setLoading] = useState({ allA: false, feaA: false, topT: false });
	const [click, setClick] = useState({ featureAthC: false, topTrendingAthC: false });
	const [optionAll, setOptionAll] = useState({ sizePerPage: 6, search: "", page: 0, sort: "createdAt", order: "ASC" });
	const [optionTop, setOptionTop] = useState({ sizePerPage: 3, search: { name: "" }, page: 0, sort: "createdAt", order: "ASC" });
	const [optionFeature, setOptionFeature] = useState({ sizePerPage: 3, search: { name: "" }, page: 0, sort: "createdAt", order: "ASC" });

	useEffect(() => {
		getAllSport();
	}, []);

	useEffect(() => {
		getAthlete(optionAll);
	}, [sportss, optionAll.sizePerPage]);

	useEffect(() => {
		filter();
	}, [selectedFilters, sort]);

	useEffect(() => {
		getTopTrending();
	}, [optionTop]);

	useEffect(() => {
		getFeaturedAthelete();
	}, [optionFeature]);

	const inputChanged = (e) => {
		setOptionAll({ ...optionAll, search: e.target.value })
		clearTimeout(timer);
		const newTimer = setTimeout(() => {
			getAthlete({ ...optionAll, search: e.target.value });
		}, 1000);
		setTimer(newTimer);
	};

	const getAthlete = async (optionAll) => {
		setLoading({ ...loading, allA: true });
		let result = await FetchPostApi(API_Path.getAllAthlete, { sports: sportss, options: optionAll });
		let getAthlete = await result.json();
		if (result.status === 200) {
			setTotal({ ...total, allAthlete: getAthlete.data.totalRecord });
			setAthlete(getAthlete.data.data);
			setLoading({ ...loading, allA: false });
		} else {
			toast.error(getAthlete.message);
		}
	};

	const getFeaturedAthelete = async () => {
		setLoading({ ...loading, feaA: true });
		let result = await FetchPostApi(API_Path.getfeaturedAthlete, { options: optionFeature });
		let getAthlete = await result.json();
		if (result.status === 200) {
			setTotal({ ...total, feaAthlete: getAthlete.data.totalRecord });
			setFeaturedAthlete(getAthlete?.data?.data);
			setLoading({ ...loading, feaA: false });
		} else {
			toast.error(getAthlete.message);
		}
	};

	const getTopTrending = async () => {
		setLoading({ ...loading, topT: true });
		let result = await FetchPostApi(API_Path.getTrandingTop, { options: optionTop });
		let getAthlete = await result.json();
		if (result.status === 200) {
			setTotal({ ...total, toptreAthlete: getAthlete.data.totalRecord });
			setTopTrending([...topTrending, ...getAthlete.data.data,]);
			setLoading({ ...loading, topT: false });
		} else {
			toast.error(getAthlete.message);
		}
	};

	const getAllSport = async () => {
		let result = await FetchPostApi(API_Path.getAllSport);
		let allSports = await result.json();
		if (result.status === 200) {
			setSportRecord(allSports.data);
		} else {
			toast.error(getAthlete.message);
		}
	};

	const filter = async () => {
		let data = { gender: selectedFilters.gender, university: selectedFilters.university, sort: sort, page: 1, limit: optionAll.sizePerPage };
		let result = await FetchPostApi(API_Path.filterAthlete, data);
		let getAthlete = await result.json();
		if (result.status === 200) {
			setTotal({ ...total, allAthlete: getAthlete.data.totalAthlete });
			setAthlete(getAthlete.data.filter);
		} else {
			toast.error(getAthlete.message);
		}
	};

	function calculateAge(birthdate) {
		const ageDiffMs = Date.now() - new Date(birthdate).getTime();
		const ageDate = new Date(ageDiffMs);
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	}

	const handleSportss = (e) => {
		if (e.target.checked) {
			if (e.target.value === "All") {
				setSportss([]);
				setOptionAll({ ...optionAll, sizePerPage: 12 });
			} else {
				setSportss([e.target.value]);
			}
		}
	};

	const handleFilterChange = (e) => {
		if (e.target.checked) {
			setSelectedFilters({ ...selectedFilters, [e.target.name]: e.target.value });
		} else {
			setSelectedFilters({ ...selectedFilters, [e.target.name]: "" });
		}
	};

	const checkClick = (category) => {
		if (category === "topath") {
			if (click.topTrendingAthC === false) {
				setClick({ ...click, topTrendingAthC: true });
				setOptionTop({ ...optionTop, page: optionTop.page + 1 });
			} else {
				setClick({ ...click, topTrendingAthC: false });
				setOptionTop({ ...optionTop, page: 1 });
			}
		} else if (category === "feaath") {
			if (click.featureAthC === false) {
				setClick({ ...click, featureAthC: true });
				setOptionFeature({ ...optionFeature, sizePerPage: optionFeature.sizePerPage + 3 });
			} else {
				setClick({ ...click, featureAthC: false });
				setOptionFeature({ ...optionFeature, sizePerPage: 3 });
			}
		}
	};

	return (
		<section className="mt-3 position-relative">
			<div className="container position-relative p-sm-3 p-0">
				<div className="row align-items-center justify-content-between">
					<div className="col-12 d-lg-flex justify-content-between">
						<div className="position-relative">
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6C6A81" className="bi bi-search fix-in-icon" viewBox="0 0 16 16">
								<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
							</svg>
							<input type="Search" className="form-control login-comn-input searchbar ps-5" placeholder="Search" value={optionAll.search} onChange={(e) => inputChanged(e)} />
						</div>
						<div className="mt-lg-0 mt-3  d-flex">
							<div className="cust-filter">
								<Dropdown className="d-inline mx-2 pe-3">
									<Dropdown.Toggle variant="transparent" id="dropdown-autoclose-false" className="filter-btn">
										<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2 cust-svg">
											<path d="M1.125 2.125C1.125 1.57272 1.57272 1.125 2.125 1.125H18.875C19.4273 1.125 19.875 1.57272 19.875 2.125V4.87745C19.875 5.14267 19.7696 5.39702 19.5821 5.58456L12.8762 12.2904C12.6887 12.478 12.5833 12.7323 12.5833 12.9975V15.7083L8.41667 19.875V12.9975C8.41667 12.7323 8.31131 12.478 8.12377 12.2904L1.41789 5.58456C1.23036 5.39702 1.125 5.14267 1.125 4.87745V2.125Z" stroke="#7B838A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
										Filter
									</Dropdown.Toggle>
									<Dropdown.Menu>
										<div>
											<div>
												<div className="col mt-4">
													<div id="example-collapse-text" className="">
														<div className="card card-body filter-part-main">
															<div className="row">
																<div className="col-12 filtr-title d-flex align-items-center mb-3">
																	<span>Filter</span>
																	<bdi className="ms-auto" onClick={() => setSelectedFilters({ ...selectedFilters, gender: "", university: "" })}>
																		Reset
																	</bdi>
																</div>
																<div className="col-12">
																	<p className="comn-label-class">Team</p>
																	<div className="mb-3 filter-chckmark">
																		<label className="cust-chk-bx">
																			<input type="radio" name="gender" value="male" checked={selectedFilters.gender === "male"} onClick={(e) => handleFilterChange(e)} />
																			<span className="cust-chkmark"></span>
																			Man’s
																		</label>
																	</div>
																	<div className="mb-3">
																		<label className="cust-chk-bx">
																			<input type="radio" name="gender" value="female" checked={selectedFilters.gender === "female"} onClick={(e) => handleFilterChange(e)} />
																			<span className="cust-chkmark"></span>
																			Woman’s
																		</label>
																	</div>
																</div>
																<div className="col-sm-12 mb-3">
																	<label className="comn-label-class">Location</label>
																	<bdi className="d-block position-relative">
																		<select className="form-control comn-input-style">
																			<option>Search An Area</option>
																			<option>123</option>
																			<option>456</option>
																		</select>
																		<span className="comn-left-input-icon">
																			<img src={Location} alt="location" />
																		</span>
																		<span className="showpwd-class bg-transparent">
																			<img src={DownAerrow} alt="down-aerrow" />
																		</span>
																	</bdi>
																</div>
																<div className="col-sm-12 mb-3">
																	<label className="comn-label-class">University</label>
																	<input type="text" name="university" className="form-control comn-input-style ps-3" value={selectedFilters.university} onChange={(e) => setSelectedFilters({ ...selectedFilters, university: e.target.value })} />
																</div>
																<div className="col-sm-12 mb-3">
																	<label className="comn-label-class">Follower Count</label>
																	<div className="filtr-social-div mb-3">
																		<div className="d-flex align-items-center">
																			<span>Instagram</span>
																			<bdi className="ms-auto">40K - 800K</bdi>
																		</div>
																		<div>
																			<div className="range-area mt-2">
																				<Sliders range min={40} max={800} defaultValue={[100, 500]} />
																			</div>
																		</div>
																	</div>
																	<div className="filtr-social-div mb-3">
																		<div className="d-flex align-items-center">
																			<span>Twitter</span>
																			<bdi className="ms-auto">100K - 400K</bdi>
																		</div>
																		<div>
																			<div className="range-area mt-2">
																				<Sliders range min={100} max={400} defaultValue={[150, 250]} />
																			</div>
																		</div>
																	</div>
																	<div className="filtr-social-div mb-3">
																		<div className="d-flex align-items-center">
																			<span>Tiktok</span>
																			<bdi className="ms-auto">200K - 900K</bdi>
																		</div>
																		<div>
																			<div className="range-area mt-2">
																				<Sliders range min={200} max={900} defaultValue={[450, 800]} />
																			</div>
																		</div>
																	</div>
																</div>
																<div className="col-12 mb-3">
																	<p className="comn-label-class">Verified Status</p>
																	<div className="mb-3">
																		<label className="cust-chk-bx">
																			<input type="checkbox" defaultChecked />
																			<span className="cust-chkmark"></span>
																			Instagram
																		</label>
																	</div>
																	<div className="mb-3">
																		<label className="cust-chk-bx">
																			<input type="checkbox" />
																			<span className="cust-chkmark"></span>
																			Twitter
																		</label>
																	</div>
																	<div className="mb-3">
																		<label className="cust-chk-bx">
																			<input type="checkbox" />
																			<span className="cust-chkmark"></span>
																			Tiktok
																		</label>
																	</div>
																	<div className="mb-3">
																		<label className="cust-chk-bx">
																			<input type="checkbox" />
																			<span className="cust-chkmark"></span>
																			Youtube
																		</label>
																	</div>
																</div>
																<div className="col-sm-12 mb-3">
																	<label className="comn-label-class">Follower Count</label>
																	<div className="filtr-social-div">
																		<div className="d-flex align-items-center">
																			<span>Years</span>
																			<bdi className="ms-auto">2 - 4</bdi>
																		</div>
																		<div className="range-area mt-2">
																			<zC f range min={0} max={4} defaultValue={[1, 3]} />
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</Dropdown.Menu>
								</Dropdown>
							</div>
							<div className="">
								<Dropdown variant="success" id="dropdown-basic">
									<Dropdown.Toggle variant="transparent" id="dropdown-autoclose-true" className="filter-btn">
										<svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2 cust-svg">
											<path d="M1.125 1.16663H14.6667M1.125 5.33329H10.5M1.125 9.49996H10.5M15.7083 5.33329V17.8333M15.7083 17.8333L11.5417 13.6666M15.7083 17.8333L19.875 13.6666" stroke="#7B838A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
										Sort
									</Dropdown.Toggle>
									<Dropdown.Menu>
										<Dropdown.Item href="#/action-1" className={sort == 1 && "select-btn"} onClick={() => setSort("1")}>
											Sort A to Z
										</Dropdown.Item>
										<Dropdown.Item href="#/action-2" className={sort == 2 && "select-btn"} onClick={() => setSort("2")}>
											Sort Z to A
										</Dropdown.Item>
										<Dropdown.Item href="#/action-3" className={sort == 3 && "select-btn"} onClick={() => setSort("3")}>
											Sort New to Old
										</Dropdown.Item>
										<Dropdown.Item href="#/action-4" className={sort == 4 && "select-btn"} onClick={() => setSort("4")}>
											Sort Old to New
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</div>
						</div>
					</div>
				</div>
				<div className="d-flex my-3">
					<div className="">
						<div className="row">
							<div className="col-12">
								{sportRecord?.length > 1 && (
									<div className="top-trending-custom-check mb-4 d-flex">
										<label className="cust-chk-bx-soc p-0">
											<input type="radio" name="field" value="All" onClick={(e) => handleSportss(e)} />
											<span className="cust-trend-chkbox">All</span>
										</label>
										{sportRecord?.length > 0 &&
											sportRecord?.map((item) => {
												return (
													<label className="cust-chk-bx-soc p-0" key={item?._id}>
														<input type="radio" name="field" value={item?.name} onClick={(e) => handleSportss(e)} />
														<span className="cust-trend-chkbox">{item?.name}</span>
													</label>
												);
											})}
									</div>
								)}
							</div>
						</div>
						<div className="row">
							{Athlete?.length > 0 ? (
								Athlete?.map((athlete) => {
									return (
										<div className="col-lg-4 col-sm-6 mb-4 pointer" key={athlete?._id} onClick={() => navigate("/market-detail", { state: { athletesId: athlete?._id, Athlete: "Athlete" } })}>
											<div className="customer-page-box">
												<div className="img-div-main position-relative">
													<div className="feature-plan-img">
														<img src={athlete?.cover_img ? athlete?.cover_img : require( DefaultPro)} className="img-fluid" alt="customers large" />
													</div>
													<div className="custmer-price d-flex align-items-center">
														<img src={Star} className="img-fluid me-1" alt="star" />
														<span className="rating-value">
															{athlete?.avg_review > 0 ? athlete?.avg_review : 0} ({athlete?.numberOfReview > 120 ? athlete?.numberOfReview + "+" : athlete?.numberOfReview})
														</span>
													</div>
												</div>
												<div className="customer-page-box-body">
													<div className="player-detail mb-2">
														<div className="athlete-profile">
															<img src={athlete?.profile_img ? athlete?.profile_img : require( DefaultPro)} alt="athelete profile" />
														</div>
														<div className="athelete-name-txt">
															<label className="d-block">{athlete?.name}</label>
															<p className="mb-0">{athlete?.team_name ? athlete?.sports[0] + "-" + athlete?.team_name : <p> </p>}</p>
														</div>
														<div>
															<span className="d-block">Sports : {athlete?.sports > 1 ? <b>{athlete?.sports.slice(0, 4).join(" | ")}</b> : <b>{athlete?.sports[0]}</b>}</span>
															<span className="me-3">
																Age: <b>{athlete?.DOB ? calculateAge(athlete.DOB) : " - "}</b>
															</span>
															<span>
																Gender: <b>{athlete?.gender ? athlete.gender : " - "}</b>
															</span>
														</div>
														<div className="mb-2 d-flex align-items-center">
															<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path d="M9.99999 2.66431C6.77499 2.66431 4.16666 5.27264 4.16666 8.49764C4.16666 12.8726 9.99999 19.331 9.99999 19.331C9.99999 19.331 15.8333 12.8726 15.8333 8.49764C15.8333 5.27264 13.225 2.66431 9.99999 2.66431ZM5.83332 8.49764C5.83332 6.19764 7.69999 4.33097 9.99999 4.33097C12.3 4.33097 14.1667 6.19764 14.1667 8.49764C14.1667 10.8976 11.7667 14.4893 9.99999 16.731C8.26666 14.506 5.83332 10.8726 5.83332 8.49764Z" fill="#323232" />
																<path d="M9.99999 10.581C11.1506 10.581 12.0833 9.64823 12.0833 8.49764C12.0833 7.34705 11.1506 6.41431 9.99999 6.41431C8.8494 6.41431 7.91666 7.34705 7.91666 8.49764C7.91666 9.64823 8.8494 10.581 9.99999 10.581Z" fill="#323232" />
															</svg>
															<span className="ms-2">{athlete?.address ? athlete.address : " - "}</span>
														</div>
													</div>
													<div className="auth-div d-xl-flex justify-content-between text-xl-center align-items-center">
														<div className="pe-xl-4">
															<div className="ps-2">
																<div className="d-flex align-items-center">
																	<div className="deal-cust-soc">
																		<img src={SocOne} alt="soc-ic" />
																	</div>
																	<div className="deal-cust-soc">
																		<img src={SocTwo} alt="soc-ic" />
																	</div>
																	<div className="deal-cust-soc">
																		<img src={SocThree} alt="soc-ic" />
																	</div>
																	<div className="deal-cust-soc">
																		<div className="cust-soc-counter">
																			<span>3+</span>
																		</div>
																	</div>
																</div>
															</div>
															<bdi className="d-block">Available on</bdi>
														</div>
														<div className="px-xl-4 mt-3 mt-xl-0 bdr-div">
															<span className="d-block">250M+</span>
															<bdi>Total Followers</bdi>
														</div>
														<div className="ps-xl-4 mt-3 mt-xl-0">
															<span className="d-block">2.5%</span>
															<bdi>Engagement</bdi>
														</div>
													</div>
												</div>
											</div>
										</div>
									);
								})
							) : (
								<div className="div-content-center h-350">
									<h4>No Athletes Found</h4>
								</div>
							)}
							{Athlete?.length > 0 && total?.allAthlete > Athlete?.length && (
								<div className="text-center">
									<button className="comn-btn-class w-auto" disabled={loading?.allA} onClick={() => setOptionAll({ ...optionAll, sizePerPage: optionAll.sizePerPage + 12 })}>
										{loading?.allA ? "Loading..." : "Load More"}
									</button>
								</div>
							)}
						</div>
						{featuredAthlete?.length > 0 && (
							<div className="filtr-title border-0 d-flex align-items-center mt-3">
								<span>Featured Athlete</span>
								<bdi className="ms-auto" onClick={() => checkClick("feaath")}>
									{click?.featureAthC ? "See Less" : "See All"}
								</bdi>
							</div>
						)}
						<div className="row">
							{featuredAthlete?.length > 0 &&
								featuredAthlete?.map((athlete) => {
									return (
										<div className="col-lg-4 col-sm-6 mb-4  pointer" key={athlete?._id} onClick={() => navigate("/market-detail", { state: { athletesId: athlete?._id, Athlete: "Athlete" } })}>
											<div className="customer-page-box">
												<div className="img-div-main position-relative">
													<div className="feature-plan-img">
														<img src={athlete?.cover_img ? athlete.cover_img : require( DefaultPro)} className="img-fluid w-100" alt="customers large" />
													</div>
													<div className="custmer-price d-flex align-items-center">
														<img src={Star} className="img-fluid me-1" alt="star" />
														<span className="rating-value">
															{athlete?.avg_review > 0 ? athlete.avg_review : 0} ({athlete?.numberOfReview > 120 ? athlete.numberOfReview + "+" : athlete?.numberOfReview})
														</span>
													</div>
												</div>
												<div className="customer-page-box-body">
													<div className="player-detail mb-2">
														<div className="athlete-profile">
															<img src={athlete?.profile_img ? athlete.profile_img : require( DefaultPro)} alt="athelete profile" />
														</div>
														<div className="athelete-name-txt">
															<label className="d-block">{athlete?.name}</label>
															<p className="mb-0">{athlete?.team_name ? athlete?.sports[0] + "-" + athlete.team_name : <p> </p>}</p>
														</div>
														<div>
															<span className="d-block">Sports : {athlete?.sports > 1 ? <b>{athlete.sports.slice(0, 4).join(" | ")}</b> : <b>{athlete?.sports[0]}</b>}</span>
															<span className="me-3">
																Age: <b>{athlete?.DOB ? calculateAge(athlete.DOB) : " - "}</b>
															</span>
															<span>
																Gender: <b>{athlete?.gender ? athlete.gender : " - "}</b>
															</span>
														</div>
														<div className="mb-2 d-flex align-items-center">
															<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path d="M9.99999 2.66431C6.77499 2.66431 4.16666 5.27264 4.16666 8.49764C4.16666 12.8726 9.99999 19.331 9.99999 19.331C9.99999 19.331 15.8333 12.8726 15.8333 8.49764C15.8333 5.27264 13.225 2.66431 9.99999 2.66431ZM5.83332 8.49764C5.83332 6.19764 7.69999 4.33097 9.99999 4.33097C12.3 4.33097 14.1667 6.19764 14.1667 8.49764C14.1667 10.8976 11.7667 14.4893 9.99999 16.731C8.26666 14.506 5.83332 10.8726 5.83332 8.49764Z" fill="#323232" />
																<path d="M9.99999 10.581C11.1506 10.581 12.0833 9.64823 12.0833 8.49764C12.0833 7.34705 11.1506 6.41431 9.99999 6.41431C8.8494 6.41431 7.91666 7.34705 7.91666 8.49764C7.91666 9.64823 8.8494 10.581 9.99999 10.581Z" fill="#323232" />
															</svg>
															<span className="ms-2">{athlete?.address ? athlete.address : " - "}</span>
														</div>
													</div>
													<div className="auth-div d-xl-flex justify-content-between text-xl-center align-items-center">
														<div className="pe-xl-4">
															<div className="ps-2">
																<div className="d-flex align-items-center">
																	<div className="deal-cust-soc">
																		<img src={SocOne} alt="soc-ic" />
																	</div>
																	<div className="deal-cust-soc">
																		<img src={SocTwo} alt="soc-ic" />
																	</div>
																	<div className="deal-cust-soc">
																		<img src={SocThree} alt="soc-ic" />
																	</div>
																	<div className="deal-cust-soc">
																		<div className="cust-soc-counter">
																			<span>3+</span>
																		</div>
																	</div>
																</div>
															</div>
															<bdi className="d-block">Available on</bdi>
														</div>
														<div className="px-xl-4 mt-3 mt-xl-0 bdr-div">
															<span className="d-block">250M+</span>
															<bdi>Total Followers</bdi>
														</div>
														<div className="ps-xl-4 mt-3 mt-xl-0">
															<span className="d-block">2.5%</span>
															<bdi>Engagement</bdi>
														</div>
													</div>
												</div>
											</div>
										</div>
									);
								})}
							{total?.feaAthlete > featuredAthlete?.length && click?.featureAthC === true && (
								<div className="text-center">
									<button className="comn-btn-class w-auto" disabled={loading?.feaA} onClick={() => setOptionFeature({ ...optionFeature, sizePerPage: optionFeature.sizePerPage + 12 })}>
										{loading?.feaA ? "Loading..." : "Load More"}
									</button>
								</div>
							)}
						</div>
						{topTrending?.length > 0 && (
							<div className="row">
								<div className="col-12">
									<div className="filtr-title border-0 d-flex align-items-center">
										<span>Top Trending</span>
										<bdi className="ms-auto" onClick={() => checkClick("topath")}>
											{click?.topTrendingAthC ? "See Less" : "See All"}
										</bdi>
									</div>
								</div>
							</div>
						)}
						<div className="row">
							{topTrending?.length > 0 &&
								topTrending?.map((athlete) => {
									return (
										<div className="col-lg-4 col-sm-6 mb-4 pointer" key={athlete._id} onClick={() => navigate("/market-detail", { state: { athletesId: athlete?._id, Athlete: "Athlete" } })}>
											<div className="customer-page-box">
												<div className="img-div-main position-relative">
													<div className="feature-plan-img">
														<img src={athlete?.cover_img ? athlete.cover_img : require( DefaultPro)} className="img-fluid w-100" alt="customers large" />
													</div>
													<div className="custmer-price d-flex align-items-center">
														<img src={Star} className="img-fluid me-1" alt="star" />
														<span className="rating-value">
															{athlete?.avg_review > 0 ? athlete.avg_review : 0} ({athlete?.numberOfReview > 120 ? athlete.numberOfReview + "+" : athlete?.numberOfReview})
														</span>
													</div>
												</div>
												<div className="customer-page-box-body">
													<div className="player-detail mb-2">
														<div className="athlete-profile">
															<img src={athlete?.profile_img ? athlete.profile_img : require( DefaultPro)} alt="athelete profile" />
														</div>
														<div className="athelete-name-txt">
															<label className="d-block">{athlete?.name}</label>
															<p className="mb-0">{athlete?.team_name ? athlete?.sports[0] + "-" + athlete.team_name : <p> </p>}</p>
														</div>
														<div>
															<span className="me-3">
																Age: <b>{athlete?.DOB ? calculateAge(athlete.DOB) : " - "}</b>
															</span>
															<span>
																Gender: <b>{athlete?.gender ? athlete.gender : " - "}</b>
															</span>
														</div>
														<div className="mb-2 d-flex align-items-center">
															<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path d="M9.99999 2.66431C6.77499 2.66431 4.16666 5.27264 4.16666 8.49764C4.16666 12.8726 9.99999 19.331 9.99999 19.331C9.99999 19.331 15.8333 12.8726 15.8333 8.49764C15.8333 5.27264 13.225 2.66431 9.99999 2.66431ZM5.83332 8.49764C5.83332 6.19764 7.69999 4.33097 9.99999 4.33097C12.3 4.33097 14.1667 6.19764 14.1667 8.49764C14.1667 10.8976 11.7667 14.4893 9.99999 16.731C8.26666 14.506 5.83332 10.8726 5.83332 8.49764Z" fill="#323232" />
																<path d="M9.99999 10.581C11.1506 10.581 12.0833 9.64823 12.0833 8.49764C12.0833 7.34705 11.1506 6.41431 9.99999 6.41431C8.8494 6.41431 7.91666 7.34705 7.91666 8.49764C7.91666 9.64823 8.8494 10.581 9.99999 10.581Z" fill="#323232" />
															</svg>
															<span className="ms-2">{athlete?.address ? athlete.address : " - "}</span>
														</div>
													</div>
													<div className="auth-div d-xl-flex justify-content-between text-xl-center align-items-center">
														<div className="pe-xl-4">
															<div className="ps-2">
																<div className="d-flex align-items-center">
																	<div className="deal-cust-soc">
																		<img src={SocOne} alt="insta" />
																	</div>
																	<div className="deal-cust-soc">
																		<img src={SocTwo} alt="insta" />
																	</div>
																	<div className="deal-cust-soc">
																		<img src={SocThree} alt="insta" />
																	</div>
																	<div className="deal-cust-soc">
																		<div className="cust-soc-counter">
																			<span>3+</span>
																		</div>
																	</div>
																</div>
															</div>
															<bdi className="d-block">Available on</bdi>
														</div>
														<div className="px-xl-4 mt-3 mt-xl-0 bdr-div">
															<span className="d-block">250M+</span>
															<bdi>Total Followers</bdi>
														</div>
														<div className="ps-xl-4 mt-3 mt-xl-0">
															<span className="d-block">2.5%</span>
															<bdi>Engagement</bdi>
														</div>
													</div>
												</div>
											</div>
										</div>
									);
								})}
							{total?.toptreAthlete > topTrending?.length && click?.topTrendingAthC === true && (
								<div className="text-center">
									<button className="comn-btn-class w-auto" disabled={loading?.topT} onClick={() => setOptionTop({ ...optionTop, page: optionTop.page + 1 })}>
										{loading?.topT ? "Loading..." : "Load More"}
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
