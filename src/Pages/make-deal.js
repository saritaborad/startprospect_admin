import React, { useRef, useState } from "react";
// import BusinessLayout from "../components/BusinessLayout/BusinessLayout.js";
// import MultiSelect from "react-multiple-select-dropdown-lite";
// import "react-multiple-select-dropdown-lite/dist/index.css";
import Select from "react-select";
import { Collapse, Nav, Tab } from "react-bootstrap";
// import { TagsInput } from "react-tag-input-component";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CKEditor } from "ckeditor4-react";
import MainLayout from "../Components/Layout/MainLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import InstagramTab from "../Components/AllTabs/InstagramTab.js";
import FacebookTab from "../Components/AllTabs/FacebookTab";
import YoutubeTab from "../Components/AllTabs/YoutubeTab";
import TikTokTab from "../Components/AllTabs/TikTokTab";
import LinkedinTab from "../Components/AllTabs/LinkedinTab";
import TwitterTab from "../Components/AllTabs/TwitterTab";
import { FetchPostApi } from "../Api/apiServices.js";
import { API_Path, errorContainer, formAttr } from "../Api/Const.js";
import { toast } from "react-toastify";
import roleContext from "../contexts/roleContext";
import { useContext } from "react";
import { useEffect } from "react";
import Insta from "../assets/images/instagram.svg";
import Fb from "../assets/images/facebook-img.svg";
import TikTok from "../assets/images/tik-tok-img.svg";
import Youtube from "../assets/images/YouTube-icon.svg";
import Linkedin from "../assets/images/linkedin-img.svg";
import Twitter from "../assets/images/twitter-img.svg";
import Paypal from "../assets/images/paypal.svg";
import Applepay from "../assets/images/apple-pay-img.svg";
import Googlepay from "../assets/images/google-pay-img.svg";
import Card from "../assets/images/card-visa.svg";
import CardNum from "../assets/images/card-num.svg";

export default function MakeDeal() {
	const context = useContext(roleContext);
	const contect = useRef();
	const location = useLocation();
	const navgate = useNavigate();
	const athletesId = location?.state;
	const [opencard, setOpenCard] = useState(false);
	const [editorValue, setEditorValue] = useState("");

	const [tab, setTab] = useState("");
	const [instaData, setinstaData] = useState("");
	const [fbData, setfbData] = useState("");
	const [ytData, setytData] = useState("");
	const [tikTokData, setTikTokData] = useState("");
	const [linkedinData, setlinkedinData] = useState("");
	const [twitterData, setTwitterData] = useState("");

	const [selectNiche, setselectNiche] = useState([]);
	const [nameRecipients, setNameRecipients] = useState("");
	const [nonNegotialble, setnonNegotialble] = useState(false);
	const [activeTab, setactiveTab] = useState();
	const [atheteDetails, setAtheteDetails] = useState("");
	const [signupType, setSignupType] = useState(null);
	const [allUser, setallUser] = useState([]);
	const [buttonType, setButtonType] = useState("button");
	const [allNiche, setallNiche] = useState([]);
	const [dealType, setDealType] = useState();
	const [clickButton, setclickButton] = useState();

	const [selected, setSelected] = useState(["Baseball", "1B"]);

	useEffect(() => {
		setDealType(location?.state?.eventKey)
	}, [location?.state])

	useEffect(() => {
		setSignupType(context?.signup_type);
	}, [context?.signup_type]);

	useEffect(() => {
		setAtheteDetails(athletesId);
	}, [location?.state]);


	useEffect(() => {
		if (dealType === "Personal") {
			getAllUser();
		}
	}, [dealType]);
	useEffect(() => {
		getNichedetails();
	}, [])

	const allNicheGetDetails = allNiche.filter((obj) => (obj?.name !== "Others" && obj?.name !== "All"))

	const handleSelect = (selectedTab) => {
		// setInstaActivities({ ...instaactivities, name: selectedTab });
		setTab(selectedTab);
		setactiveTab(selectedTab);
		contect.current.setFieldValue("facebook", selectedTab == "facebook" ? true : false);
	};

	const slider = {
		centerMode: true,
		arrows: false,
		infinite: true,
		slidesToShow: 7,
		speed: 500,
		initialSlide: 0,
		swipeToSlide: true,
		speed: 1000,
		responsive: [
			{
				breakpoint: 1599,
				settings: {
					centerMode: false,
					slidesToShow: 6,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 1199,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 991,
				settings: {
					centerMode: true,
					slidesToShow: 4,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 767,
				settings: {
					centerMode: false,
					slidesToShow: 3,
					slidesToScroll: 1,
				},
			},

			{
				breakpoint: 400,
				settings: {
					centerMode: false,
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
		],
	};

	const handleNiche = (e) => {
		if (e.target.checked) {
			setselectNiche((prev) => [...prev, e.target.id]);
		} else {
			let removeActivities = selectNiche.filter((x) => x !== e.target.id);
			setselectNiche(removeActivities);
		}
	};
	const getNichedetails = async () => {
		let result = await FetchPostApi(API_Path.getAllNiche);
		let getniche = await result.json();
		if (result.status === 200) {
			setallNiche(getniche?.data)
		} else toast.error(getniche.message);
	}
	const handleDeal = async (formData) => {
		let data = {
			DealName: formData.dname,
			Description: editorValue,
			Activities: [],
			payment: Number(formData.payment),
			postCaption: formData?.postCaption,
			NonNegotiableDeal: nonNegotialble,
			duration: Number(formData.day),
			fulfillmentDate: formData.date,
			visibility: dealType === "Personal" ? false : true,
			isDraft: clickButton === "draft" ? true : false
		};
		if (atheteDetails?.Athlete === "Athlete" || dealType === "Personal") { data.userid = atheteDetails?.Athlete === "Athlete" ? atheteDetails?.athletesId : nameRecipients }
		if (dealType === "Public" && signupType === 1 && atheteDetails?.Athlete !== "Athlete") { data.niche = selectNiche }
		if ((instaData.post || instaData.story || instaData.reels || instaData.igtv) && instaData?.image?.length > 0) data?.Activities.push(instaData);
		if ((fbData.post || fbData.story || fbData.reels || fbData.igtv) && fbData?.image?.length > 0) data?.Activities.push(fbData);
		if ((ytData.post || ytData.story || ytData.reels || ytData.igtv) && ytData?.image?.length > 0) data?.Activities.push(ytData);
		if ((tikTokData.post || tikTokData.story || tikTokData.reels || tikTokData.igtv) && tikTokData?.image?.length > 0) data?.Activities.push(tikTokData);
		if ((linkedinData.post || linkedinData.story || linkedinData.reels || linkedinData.igtv) && linkedinData?.image?.length > 0) data?.Activities.push(linkedinData);
		if ((twitterData.post || twitterData.story || twitterData.reels || twitterData.igtv) && twitterData?.image?.length > 0) data?.Activities.push(twitterData);
		let result = await FetchPostApi(API_Path.createDeal, data);
		let createNewDeal = await result.json();
		if (result.status === 200) {
			navgate("/deal")
		} else toast.error(createNewDeal.message);
	};

	const handleNonNegotiableDeal = (e) => {
		setnonNegotialble(e.target.checked);
	};

	function handleClick(e) {
		setclickButton(e.target.name)
		setButtonType("submit");
	}

	const selectehandelchange = (dealerName) => {
		contect.current.setFieldValue("recipients", dealerName?.value);
		setNameRecipients(dealerName?.value);
	};
	const getAllUser = async () => {
		let result = await FetchPostApi(API_Path.getAllUser, { search: "" });
		let getUser = await result.json();
		if (result.status === 200) {
			let a = [];
			a = getUser?.data?.map((item) => {
				return { value: item._id, label: item.name };
			});
			setallUser(a);
		} else {
			toast.error(getUser.message);
		}
	};

	function handleInstaStateChange(instaactivities) {
		setinstaData(instaactivities);
	}
	function handleFbStateChange(fbactivities) {
		setfbData(fbactivities);
	}
	function handleYtStateChange(ytactivities) {
		setytData(ytactivities);
	}
	function handleTikTokStateChange(tikactivities) {
		setTikTokData(tikactivities);
	}
	function handleLinkedinStateChange(linkedinactivities) {
		setlinkedinData(linkedinactivities);
	}
	function handleTwitterStateChange(linkedinactivities) {
		setTwitterData(linkedinactivities);
	}

	const handleEditorChange = (event) => {
		setEditorValue(event.editor.getData());
	};

	let validationSchemaObject = {
		dname: Yup.string().required("Please enter a valid deal name").min(2),
		date: Yup.string().required("Please enter valid data."),
		day: Yup.number().required("You must specify a number").min(1, "DurationTooShortError").max(7, "Max Content Duration is 7."),
		payment: Yup.number().required("You must specify a number").min(1, "Enter valid amount."),
		postCaption: Yup.string().required("Please enter a caption for your post."),
		facebook: Yup.boolean().required("Please select atleast one social media"),
	};
	if (athletesId === null) {
		validationSchemaObject.recipients = Yup.string().required("Recipients is Required.");
	}

	const dealTOMarket = () => {
		navgate("/market-detail", {
			state: { athletesId: atheteDetails?.athletesId, Athlete: "Athlete" },
		});
	};
	return (
		<>
			<MainLayout>
				<Formik
					innerRef={contect}
					initialValues={{
						dname: "",
						recipients: "",
						date: "",
						day: "",
						facebook: "",
						postCaption: "",
						activeTab: "",
						payment: "",
					}}
					validationSchema={Yup.object(validationSchemaObject)}
					onSubmit={(formData, { resetForm }) => handleDeal(formData, resetForm)}
				>
					{(runform) => (
						<form onSubmit={runform.handleSubmit}>
							<section className="gray-bg-section">
								<div className="container">
									<div className="row">
										<div className="col-12 mb-4">
											<div className="comnn-main-head-title">
												<h3 className="mb-3">Make A Deal</h3>
												<span>
													{atheteDetails?.Athlete === "Athlete" && (
														<span className="d-flex">
															<Link to="/latest">NIL MarketPlace</Link> &gt; <span onClick={dealTOMarket}><div className='team-cur-set'>{atheteDetails?.AthleteName} &gt;</div>  </span>
															<span>
																<bdi>Make A Deal</bdi>
															</span>
														</span>
													)}
												</span>
											</div>
										</div>
										<div className="col-lg-8">
											<div className="make-a-deal-main-left">
												{dealType === "Personal" && (
													<div className="comnn-white-back-bg-box mb-3">
														<div className="make-a-deal-top-title">
															<label>Recipients</label>
														</div>
														<div className="row">
															<div className="col-12">
																<Select isMulti={false} nameRecipients={nameRecipients} options={allUser} onChange={selectehandelchange} />
																{errorContainer(runform, "recipients")}
															</div>
														</div>
													</div>
												)}
												<div className="comnn-white-back-bg-box mb-3">
													<div className="make-a-deal-top-title">
														<label>Deal Name</label>
														<input type="text" className="form-control comn-input-style ps-3" placeholder="Enter the name of the deal here..." name="dname" {...formAttr(runform, "dname")} />
														{errorContainer(runform, "dname")}
													</div>
												</div>
												<div className="comnn-white-back-bg-box my-3">
													<div className="make-a-deal-top-title">
														<label>Description</label>
													</div>
													<div className="mt-3">
														<CKEditor initData="<p>Enter your content here...</p>" name="editorValue" onChange={handleEditorChange} />
													</div>
												</div>
												<div className="comnn-white-back-bg-box my-3">
													<div className="make-a-deal-top-title">
														<label>Activities (Select at least one activity)</label>
													</div>
													<div className="cust-soc-icon-main">
														<Tab.Container id="left-tabs-example" activeKey={tab} onSelect={handleSelect}>
															<div className="row">
																<div className="col-12">
																	<Nav variant="pills">
																		<Nav.Item>
																			<Nav.Link eventKey="instagram">
																				<div className="soc-icon-main">
																					<img src={Insta} alt="insta-ico" />
																				</div>
																			</Nav.Link>
																		</Nav.Item>
																		<Nav.Item>
																			<Nav.Link eventKey="facebook">
																				<div className="soc-icon-main">
																					<img src={Fb} alt="facebook-ico" />
																				</div>
																			</Nav.Link>
																		</Nav.Item>
																		<Nav.Item>
																			<Nav.Link eventKey="tik-tok">
																				<div className="soc-icon-main">
																					<img src={TikTok} alt="tik-tok-ico" />
																				</div>
																			</Nav.Link>
																		</Nav.Item>
																		<Nav.Item>
																			<Nav.Link eventKey="youtube">
																				<div className="soc-icon-main">
																					<img src={Youtube} alt="youtube-ico" />
																				</div>
																			</Nav.Link>
																		</Nav.Item>
																		<Nav.Item>
																			<Nav.Link eventKey="linkedin">
																				<div className="soc-icon-main">
																					<img src={Linkedin} alt="linkedin-ico" />
																				</div>
																			</Nav.Link>
																		</Nav.Item>
																		<Nav.Item>
																			<Nav.Link eventKey="twitter">
																				<div className="soc-icon-main">
																					<img src={Twitter} alt="twitter-ico" />
																				</div>
																			</Nav.Link>
																		</Nav.Item>
																	</Nav>
																	{errorContainer(runform, "facebook")}
																</div>
																<div className="col-12">
																	<Tab.Content>
																		<Tab.Pane eventKey="instagram">{tab === "instagram" && <InstagramTab instaData={instaData} handleInstaStateChange={handleInstaStateChange} />}</Tab.Pane>
																		<Tab.Pane eventKey="facebook">{tab === "facebook" && <FacebookTab fbData={fbData} handleFbStateChange={handleFbStateChange} />}</Tab.Pane>
																		<Tab.Pane eventKey="tik-tok">{tab === "tik-tok" && <TikTokTab tikTokData={tikTokData} handleTikTokStateChange={handleTikTokStateChange} />}</Tab.Pane>
																		<Tab.Pane eventKey="youtube">{tab === "youtube" && <YoutubeTab ytData={ytData} handleYtStateChange={handleYtStateChange} />}</Tab.Pane>
																		<Tab.Pane eventKey="linkedin">{tab === "linkedin" && <LinkedinTab linkedinData={linkedinData} handleLinkedinStateChange={handleLinkedinStateChange} />}</Tab.Pane>
																		<Tab.Pane eventKey="twitter">{tab === "twitter" && <TwitterTab twitterData={twitterData} handleTwitterStateChange={handleTwitterStateChange} />}</Tab.Pane>
																	</Tab.Content>
																</div>
															</div>
														</Tab.Container>
													</div>
													<div className="make-a-deal-top-title mt-3">
														<label className="activity-innr-lable">Fulfillment date</label>
														<input type="date" className="form-control comn-input-style ps-3" name="date" {...formAttr(runform, "date")} />
														{errorContainer(runform, "date")}
													</div>
													<div className="make-a-deal-top-title mt-3">
														<label className="activity-innr-lable">Add Content Duration</label>
														<input type="number" className="form-control comn-input-style ps-3" name="day" placeholder="Ex.7 Days" {...formAttr(runform, "day")} />
														{errorContainer(runform, "day")}
													</div>
													<div className="make-a-deal-top-title mt-3">
														<label className="activity-innr-lable">Payment</label>
														<input type="number" className="form-control comn-input-style ps-3" name="payment" placeholder="Ex.500.00" {...formAttr(runform, "payment")} />
														{errorContainer(runform, "payment")}
													</div>
												</div>
												{dealType !== "Personal" && signupType === 1 && atheteDetails?.Athlete !== "Athlete" && <div className="comnn-white-back-bg-box my-3">
													<div className="categori-main">
														<div className="text-start">
															<h6>Select Niche</h6>
														</div>
														<div className="category-inner-div">
															{allNicheGetDetails && allNicheGetDetails?.length > 0 && allNicheGetDetails?.map((item, i) => {
																return (
																	<label key={i} className="cust-chk-bx-soc p-0">
																		<input type="checkbox" name={item?.name} id={item?.name} onChange={handleNiche} />
																		<span className="cust-chkbox-soc hobby-checkbx">{item?.name}</span>
																	</label>
																)
															})}
														</div>
													</div>
												</div>}
												<div className="comnn-white-back-bg-box my-3">
													<div className="make-a-deal-top-title">
														<label>Post Caption</label>
													</div>
													<div className="">
														<textarea className=" ps-3 comn-input-style  form-control h-auto" rows={5} placeholder="Write a caption for your post..." name="postCaption" {...formAttr(runform, "postCaption")} />
														{errorContainer(runform, "postCaption")}
													</div>
												</div>
												<div>
													<label className="cust-chk-bx mt-3 non-nego-txt">
														<input type="checkbox" id="remember-me" name="remember-me" checked={nonNegotialble} onChange={handleNonNegotiableDeal} />
														<span className="cust-chkmark"></span>
														<bdi>Non-Negotiable Deal</bdi>
														<p className="mt-2">By Selecting Non-Negotiable deal, You need pay now for the deal and no one can negotiate with you for the deal.</p>
													</label>
												</div>
												<div className="mt-3 d-sm-flex bottom-buttons-make-deal">
													<button className="comn-btn-class-gray me-sm-3" name="draft" type={buttonType} onClick={(e) => handleClick(e)}>
														SAVE DRAFT
													</button>
													<button className="comn-btn-class mt-3 mt-sm-0" name="deal" type={buttonType} onClick={(e) => handleClick(e)}>
														MAKE A DEAL
													</button>
												</div>
											</div>
										</div>
										<div className="col-lg-4 mt-3 mt-lg-0">
											<div className="make-a-deal-main-right">
												<div className="comnn-white-back-bg-box">
													<div className="d-flex mb-1 make-a-deal-right-inner-txt">
														<div>
															<span>Sub Total :</span>
														</div>
														<div className="ms-auto text-end">
															<bdi>$1000.00</bdi>
														</div>
													</div>
													<div className="d-flex mb-1 make-a-deal-right-inner-txt">
														<div>
															<span>Service Fee (15%) :</span>
														</div>
														<div className="ms-auto text-end">
															<bdi>$150.00</bdi>
														</div>
													</div>
													<div className="d-flex make-a-deal-right-inner-txt">
														<div>
															<span>Taxes:</span>
														</div>
														<div className="ms-auto text-end">
															<bdi>$50.00</bdi>
														</div>
													</div>
													<div className="border-bottom my-2"></div>
													<div className="d-flex make-a-deal-right-inner-txt-total">
														<div>
															<bdi>Total:</bdi>
														</div>
														<div className="ms-auto text-end">
															<span>$1200.00</span>
														</div>
													</div>
												</div>
												<div className="d-flex mt-3">
													<div className="me-2">
														<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M11.917 7.58329H14.0837V9.74996H11.917V7.58329ZM11.917 11.9166H14.0837V18.4166H11.917V11.9166ZM13.0003 2.16663C7.02033 2.16663 2.16699 7.01996 2.16699 13C2.16699 18.98 7.02033 23.8333 13.0003 23.8333C18.9803 23.8333 23.8337 18.98 23.8337 13C23.8337 7.01996 18.9803 2.16663 13.0003 2.16663ZM13.0003 21.6666C8.22283 21.6666 4.33366 17.7775 4.33366 13C4.33366 8.22246 8.22283 4.33329 13.0003 4.33329C17.7778 4.33329 21.667 8.22246 21.667 13C21.667 17.7775 17.7778 21.6666 13.0003 21.6666Z" fill="#323232" />
														</svg>
													</div>
													<div className="make-a-deal-right-inner-txt">
														<p>Payment will taken after the deal offer is final, Mark a Non-Negotiable deal to make a payment for deal or Submit for Negotiable deal.</p>
													</div>
												</div>
												<div className="payment-main-sec">
													<div className="payment-main-title">
														<span>Payment Method</span>
													</div>
													<div className="comnn-white-back-bg-box mt-3">
														<div className="row">
															<div className="col-12 mb-3">
																<div className="cust-radio-div ">
																	<div className="form-check mb-2">
																		<input className="form-check-input" type="radio" name="payment" id="paypal" defaultChecked onClick={() => setOpenCard(false)} />
																		<label className="form-check-label ms-2" htmlFor="paypal">
																			<div className="d-flex flex-column payment-class">
																				<span>
																					<img src={Paypal} alt="paypal-ico" />
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
																					<img src={Googlepay} alt="googlepay-ico" />
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
																					<img src={Applepay} alt="applepay-ico" />
																				</span>
																				<bdi>You’ll be redirected to applepay.com</bdi>
																			</div>
																		</label>
																	</div>
																	<div className="form-check mb-2">
																		<input className="form-check-input" type="radio" name="payment" id="wallet" onClick={() => setOpenCard(false)} />
																		<label className="form-check-label d-flex align-items-center ms-2" htmlFor="wallet">
																			<div className="d-flex flex-column payment-class">
																				<strong>Wallet</strong>
																				<bdi>Pay with Opase wallet</bdi>
																			</div>
																			<div className="ms-auto wallet-balance">
																				<span className="d-block">$1000.00</span>
																				<bdi>Available</bdi>
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
																								<img src={Card} alt="card" />
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
																								<img src={Card} alt="card" />
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
																				<div className="row me-0">
																					<div className="col-12 mb-3 pe-0">
																						<bdi className="d-block position-relative">
																							<input type="tel" className="form-control comn-input-style ps-3 pe-5" placeholder="Enter Card Number" />
																							<span className="showpwd-class bg-transparent" id="show_pwd">
																								<img src={CardNum} alt="card-num" />
																							</span>
																						</bdi>
																					</div>
																					<div className="col-xl-6 col-lg-12 col-sm-6 mb-3 pe-0">
																						<input className="form-control comn-input-style ps-3" type="month" />
																					</div>
																					<div className="col-xl-6 col-lg-12 col-sm-6 mb-3 pe-0">
																						<input className="form-control comn-input-style ps-3" type="tel" placeholder="CVV" />
																					</div>
																					<div className="col-12 mb-3 pe-0">
																						<input className="form-control comn-input-style ps-3" type="tel" placeholder="Postal Code" />
																					</div>
																				</div>
																				<div>
																					<label className="cust-chk-bx">
																						<input type="checkbox" id="remember-me" name="remember-me" defaultChecked />
																						<span className="cust-chkmark"></span>
																						Securely save this card
																					</label>
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
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</section>
						</form>
					)}
				</Formik>
			</MainLayout>
		</>
	);
}
