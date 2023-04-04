import React, { useEffect, useState } from "react";
import MainLayout from "../Components/Layout/MainLayout";
import { Tab, Nav, Toast } from "react-bootstrap";
import { Collapse, Accordion, Modal } from "react-bootstrap";
import InputEmoji from "react-input-emoji";
import { Link } from "react-router-dom";
import { FetchPostApi } from "../Api/apiServices";
import { API_Path } from "../Api/Const";
import { toast } from "react-toastify";

export default function AthleteSetting() {
	const [forgotmodalShow, setForgotModalShow] = useState(false);
	const [addbank, setAddBank] = useState(false);
	const [addbanksuccess, setAddBankSuccess] = useState(false);
	const [addcard, setAddCard] = useState(false);
	const [addcase, setAddCase] = useState(false);
	const [opencard, setOpenCard] = useState(false);
	const [removebank, setRemoveBank] = useState(false);
	const [sharemodalShow, setShareModalShow] = useState(false);
	const [permission, setPermission] = useState(false);
	const [invite, setInvite] = useState(false);
	const [timer, setTimer] = useState(null);
	const [requestlist, setRequestlist] = useState([])
	const [search, setSearch] = useState("");
	const [parentId, setParentId] = useState("");
	const [parent, setParent] = useState([]);
	const [allMessage, setAllMessage] = useState([]);
	const [athleteParent, setAthleteParent] = useState({})
	const [thankMsg, setThankMsg] = useState({ msg: "", custom: "" });
	const [manageAccess, setManageAccess] = useState({ profile: false, offers: false, team: false, events: false, wallet: false, notification: false })

	const [reqchatState, setReqchat] = useState({
		reqchatDetail: false,
	});

	// old password show //
	const passwordshow = (e) => {
		var x = document.getElementById("password");
		if (x.type === "password") {
			x.type = "text";
		} else {
			x.type = "password";
		}
		document.getElementById("show_pwd").classList.toggle("active");
	};

	// new password show //
	const newpasswordshow = (e) => {
		var x = document.getElementById("newpassword");
		if (x.type === "password") {
			x.type = "text";
		} else {
			x.type = "password";
		}
		document.getElementById("show_newpwd").classList.toggle("active");
	};

	// oconfirm password show //
	const confirmpasswordshow = (e) => {
		var x = document.getElementById("confmpassword");
		if (x.type === "password") {
			x.type = "text";
		} else {
			x.type = "password";
		}
		document.getElementById("show_confmpwd").classList.toggle("active");
	};

	// chat box //
	const chatboxactive = () => {
		document.getElementById("chat-main").classList.toggle("active");
	};

	const chatboxclose = () => {
		document.getElementById("chat-main").classList.remove("active");
	};

	const [text, setText] = useState("");
	function handleOnEnter(text) { }

	// RATING REVIEW //
	const [rating, setRating] = useState(0);

	const handleRating = (rate) => {
		setRating(rate);
	};

	const handleReqchatClick = (type) => {
		setReqchat({
			[type]: true,
		});
	};

	const handleTabChange = async (e) => {
		if (e === "thankmessage") {
			getAllMsg();
		}
		else if (e === "thankmessage") {
			getParent();
			getParentlist(search);
		}
	};

	const getAllMsg = async () => {
		let response = await FetchPostApi(API_Path.getThankYouMsg);
		let result = await response.json();
		if (response.status === 200) {
			setAllMessage(result.data);
		} else {
			toast.error(result.message);
		}
	};

	const sendMsg = async () => {
		if (thankMsg.msg || thankMsg.custom) {
			let response = await FetchPostApi(API_Path.sendThankYouMsg, { thankyou: thankMsg.msg ? thankMsg.msg : thankMsg.custom });
			let result = await response.json();
			if (response.status === 200) {
				setThankMsg({ msg: "", custom: "" });
				toast.success(result.message);
			} else {
				toast.error(result.message);
			}
		} else {
			toast.warning("Please select a message to send")
		}
	};

	const getParentlist = async (Search) => {
		let response = await FetchPostApi(API_Path.searchAthleteParent, { name: Search });
		let result = await response.json();
		if (response.status === 200) {
			setParent(result.data);
		} else {
			toast.error(result.message);
		}
	};

	const getParent = async () => {
		let response = await FetchPostApi(API_Path.manageParent);
		let result = await response.json();
		if (response.status === 200) {
			setAthleteParent(result.data[0]);
		} else {
			toast.error(result.message);
		}
	};

	const inputChangedInvite = (e) => {
		setSearch(e.target.value);
		clearTimeout(timer);
		const newTimer = setTimeout(() => {
			getParentlist(e.target.value);
		}, 1000);
		setTimer(newTimer);
	};

	const handleFilterChange = (e) => {
		if (e.target.checked) {
			setManageAccess({ ...manageAccess, [e.target.name]: true });
		} else {
			setManageAccess({ ...manageAccess, [e.target.name]: false });
		}
	};

	const inviteClicked = (id) => {
		setManageAccess({ profile: false, offers: false, team: false, events: false, wallet: false, notification: false });
		setParentId(id);
		setPermission(true);
	}

	const sendInvite = async () => {
		if (Object.values(manageAccess).some(access => access)) {
			let response = await FetchPostApi(API_Path.inviteAthleteParent, { ...manageAccess, userid: parentId });
			let result = await response.json();
			if (response.status === 200) {
				setPermission(false);
				getParentlist(search);
				toast.success(result.message);
			} else {
				toast.error(result.message);
			}
		} else {
			toast.warning("At least 1 permission is required.");
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

	const acceptRequest = async () => {
		if (Object.values(manageAccess).some(access => access)) {
			let response = await FetchPostApi(API_Path.reqAccept, { _id: parentId });
			let result = await response.json();
			if (response.status === 200) {
				manageAcceptAccess();
				toast.success(result.message);
			} else {
				setPermission(false);
				toast.error(result.message);
			}
		} else {
			toast.warning("At least 1 permission is required.");
		}
	};

	const manageAcceptAccess = async () => {
		let response = await FetchPostApi(API_Path.managePermission, { ...manageAccess, parentId: parentId });
		let result = await response.json();
		if (response.status === 200) {
			setPermission(false);
			getRequestList();
			toast.success(result.message);
		} else {
			setPermission(false);
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

	const removeParent = async (id) => {
		let response = await FetchPostApi(API_Path.removeParent, { parentId: id });
		let result = await response.json();
		if (response.status === 200) {
			getParent();
			toast.success(result.message);
		} else {
			toast.error(result.message);
		}
	};

	return (
		<>
			<MainLayout>
				<section className="gray-bg-section">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<Tab.Container id="left-tabs-example" defaultActiveKey="linkplatform" onSelect={(e) => handleTabChange(e)}>
									<div className="row">
										<div className="col-xxl-2  col-lg-3 ">
											<div className="profile-setting-section">
												<Nav variant="pills">
													<Nav.Item>
														<Nav.Link eventKey="linkplatform">
															<div className="d-flex align-items-center inr-li-prof">
																<img src="../assets/images/link.svg" alt="link-ico" />
																<span>Link Platform</span>
															</div>
														</Nav.Link>
														<Nav.Link eventKey="thankmessage">
															<div className="d-flex align-items-center inr-li-prof">
																<img src="../assets/images/thank.svg" alt="thank-ico" />
																<span>Thank You message</span>
															</div>
														</Nav.Link>
														<Nav.Link eventKey="parent">
															<div className="d-flex align-items-center inr-li-prof">
																<img src="../assets/images/paren.svg" alt="parents-ico" />
																<span>Parent</span>
															</div>
														</Nav.Link>
														<Nav.Link eventKey="Inviteother">
															<div className="d-flex align-items-center inr-li-prof">
																<img src="../assets/images/invite-1.svg" aria-label="invite other ico" />
																<span>Invite Others</span>
															</div>
														</Nav.Link>
														<Nav.Link eventKey="changepass">
															<div className="d-flex align-items-center inr-li-prof">
																<img src="../assets/images/lock-icn.svg" alt="change-pass ico" />
																<span>Change Password</span>
															</div>
														</Nav.Link>
														<Nav.Link eventKey="help&support">
															<div className="d-flex align-items-center position-relative inr-li-prof">
																<bdi>
																	<img src="../assets/images/support-icn.svg" alt="support-ico" />
																</bdi>
																<span>Help & Support</span>
															</div>
														</Nav.Link>
														<Nav.Link eventKey="faq">
															<div className="d-flex align-items-center inr-li-prof">
																<img src="../assets/images/faq-icn.svg" alt="faq-ico" />
																<span>FAQ</span>
															</div>
														</Nav.Link>
													</Nav.Item>
												</Nav>
											</div>
										</div>
										<div className="col-xxl-10 col-lg-9">
											<Tab.Content>
												<Tab.Pane eventKey="linkplatform">
													<div className="my-3 mt-md-0 tabs-heading-txt">
														<h5>Link Platform</h5>
													</div>
													<div className="row">
														<div className="col-xl-3 col-lg-4 col-sm-6 mb-3">
															<div className="team-box-class ">
																<div className="mx-auto">
																	<img src="../assets/images/instagram.svg" alt="insta" className="rounded-0" />
																</div>
																<div className="team-body-txt">
																	<span>Instagram</span>
																	<div className="mt-3">
																		<button className="remove-btn">Disconnected</button>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-xl-3 col-lg-4 col-sm-6 mb-3">
															<div className="team-box-class">
																<div className="mx-auto">
																	<img src="../assets/images/Facebook-icon.png" alt="fb" />
																</div>
																<div className="team-body-txt">
																	<span>Facebook</span>
																	<div className="mt-3">
																		<button className="comn-btn-class">Connect</button>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-xl-3 col-lg-4 col-sm-6 mb-3">
															<div className="team-box-class">
																<div className="mx-auto">
																	<img src="../assets/images/linkedin_icon.png" alt="linkedin" />
																</div>
																<div className="team-body-txt">
																	<span>Linkdin</span>
																	<div className="mt-3">
																		<button className="comn-btn-class">Connect</button>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-xl-3 col-lg-4 col-sm-6 mb-3">
															<div className="team-box-class">
																<div className="mx-auto">
																	<img src="../assets/images/twitter-icon.png" alt="twitter" />
																</div>
																<div className="team-body-txt">
																	<span>Twitter</span>
																	<div className="mt-3">
																		<button className="comn-btn-class">Connect</button>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-xl-3 col-lg-4 col-sm-6 mb-3">
															<div className="team-box-class">
																<div className="mx-auto">
																	<img src="../assets/images/discord.svg" alt="discord" className="rounded-0" />
																</div>
																<div className="team-body-txt">
																	<span>Discord</span>
																	<div className="mt-3">
																		<button className="comn-btn-class">Connect</button>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-xl-3 col-lg-4 col-sm-6 mb-3">
															<div className="team-box-class">
																<div className="mx-auto">
																	<img src="../assets/images/Tik-Tok-icon.png" alt="tik-tok" />
																</div>
																<div className="team-body-txt">
																	<span>Tiktok</span>
																	<div className="d-xxl-flex align-items-center justify-content-center mt-3">
																		<button className="gray-btn w-100">/Username</button>
																		<button className="gray-btn w-100 ms-xxl-2 mt-xxl-0 mt-2">Follower</button>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-xl-3 col-lg-4 col-sm-6 mb-3">
															<div className="team-box-class">
																<div className="mx-auto">
																	<img src="../assets/images/ytube.svg" alt="youtube" />
																</div>
																<div className="team-body-txt">
																	<span>Youtube</span>
																	<div className="d-xxl-flex align-items-center justify-content-center mt-3">
																		<button className="gray-btn w-100">/UserId</button>
																		{/* <button className="gray-btn w-100 ms-xxl-2 mt-xxl-0 mt-2">Follower</button> */}
																	</div>
																</div>
															</div>
														</div>
													</div>
												</Tab.Pane>
												<Tab.Pane eventKey="thankmessage">
													<div className="my-3 mt-md-0 tabs-heading-txt">
														<h5>Thanks Message Preset</h5>
													</div>
													<div className="row">
														<div className="col-12">
															<div>
																<ul>
																	{allMessage?.length > 0 && allMessage.map((item, i) => {
																		return (
																			<li key={i}>
																				<div className="cust-radio-div thanks-msg-box mb-3">
																					<div className="form-check mb-2">
																						<label className="form-check-label" htmlFor={`m-${i}`}>
																							<input className="form-check-input" type="radio" name="msg" id={`m-${i}`} value={item.msg} checked={item.msg == thankMsg.msg} onClick={(e) => setThankMsg({ custom: "", msg: e.target.value })} />
																							<div className="d-flex flex-column payment-class ps-2">
																								<bdi>{item.msg}</bdi>
																							</div>
																						</label>
																					</div>
																				</div>
																			</li>
																		)
																	})}
																	<li>
																		<div className="cust-radio-div thanks-msg-box custm-thank-msg-div">
																			<div className="form-check m-0">
																				<label className="form-check-label w-100" htmlFor="m-5">
																					{/* <input className="form-check-input" type="radio" name="msg" id="m-5" /> */}
																					<div className="d-flex flex-column payment-class ps-2">
																						<textarea type="text" className="w-100" rows={3} placeholder="Custom Thank You Message" value={thankMsg.custom} onChange={(e) => setThankMsg({ msg: "", custom: e.target.value })}></textarea>
																					</div>
																				</label>
																			</div>
																		</div>
																	</li>
																</ul>
																<div className="text-center mt-3">
																	<button className="comn-btn-class w-auto" onClick={() => sendMsg()}>
																		Send Message
																	</button>
																</div>
															</div>
														</div>
													</div>
												</Tab.Pane>
												<Tab.Pane eventKey="parent">
													{/* ============== parent-main ============== */}
													{!invite && (<div className="row">
														<div className="col-12">
															<div className="d-md-flex align-items-center">
																<div className="mt-3 mt-lg-0 tabs-heading-txt">
																	<h5>Parent</h5>
																</div>
																{/* <div className="ms-auto mt-3 mt-md-0">
																	<div className="d-flex align-items-center">
																		<div className="position-relative ">
																			<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6C6A81" className="bi bi-search fix-in-icon" viewBox="0 0 16 16">
																				<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
																			</svg>
																			<input type="input" className="form-control login-comn-input searchbar ps-5" placeholder="Search" />
																		</div>
																		<div className="parent-white ms-2">
																			<button type="" >
																				<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<path d="M3 8C3 5.23858 5.23858 3 8 3C10.7614 3 13 5.23858 13 8C13 10.7614 10.7614 13 8 13C5.23858 13 3 10.7614 3 8ZM8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z" fill="#7B838A" />
																					<path d="M2.34315 16.3431C0.842855 17.8434 0 19.8783 0 22H2C2 20.4087 2.63214 18.8826 3.75736 17.7574C4.88258 16.6321 6.4087 16 8 16C9.5913 16 11.1174 16.6321 12.2426 17.7574C13.3679 18.8826 14 20.4087 14 22H16C16 19.8783 15.1571 17.8434 13.6569 16.3431C12.1566 14.8429 10.1217 14 8 14C5.87827 14 3.84344 14.8429 2.34315 16.3431Z" fill="#7B838A" />
																					<path fillRule="evenodd" clipRule="evenodd" d="M24.7071 13.2929C25.0977 13.6834 25.0977 14.3166 24.7071 14.7071L20.7071 18.7071C20.3166 19.0976 19.6834 19.0976 19.2929 18.7071L15.2929 14.7071C14.9024 14.3166 14.9024 13.6834 15.2929 13.2929C15.6834 12.9024 16.3166 12.9024 16.7071 13.2929L19 15.5858V8C19 7.44771 19.4477 7 20 7C20.5523 7 21 7.44771 21 8V15.5858L23.2929 13.2929C23.6834 12.9024 24.3166 12.9024 24.7071 13.2929Z" fill="#7B838A" />
																				</svg>
																			</button>
																		</div>
																	</div>
																</div> */}
															</div>
														</div>
														{athleteParent ? (<div className="col-12 mt-3">
															<div className="d-sm-flex align-items-center justify-content-between team-join-class p-3">
																<div className="d-flex align-items-center">
																	<div className="">
																		<img src={athleteParent?.parentId?.profile_img ?? "../assets/images/defaultProPic.png"} alt="" className="review_profile_img" />
																	</div>
																	<div className="ms-3 team-detail-name">
																		<span>{athleteParent?.parentId?.name}</span>
																		<p className="position-relative mb-0">
																			<svg width="14" height="14" viewBox="0 0 20 16" fill="none" className="me-2" xmlns="http://www.w3.org/2000/svg">
																				<path d="M18 16H2C0.89543 16 0 15.1046 0 14V1.913C0.0466084 0.842548 0.928533 -0.00101238 2 9.11911e-07H18C19.1046 9.11911e-07 20 0.895432 20 2V14C20 15.1046 19.1046 16 18 16ZM2 3.868V14H18V3.868L10 9.2L2 3.868ZM2.8 2L10 6.8L17.2 2H2.8Z" fill="#7B838A" />
																			</svg>
																			cobybrayent@gmail.com
																		</p>
																	</div>
																</div>
																<div className="ms-sm-auto mt-3 mt-sm-0">
																	<button className="remove-btn2" type="button" onClick={() => removeParent(athleteParent._id)}>
																		Remove
																	</button>
																</div>
															</div>
														</div>) : (<div className="div-content-center h-230">
															<h5>No Parents Found</h5>
														</div>)}
													</div>
													)}
													{/* ============== parent-result ============== */}
													{!invite && (<div className="row">
														<div className="col-12">
															<div className="d-md-flex mt-3 align-items-center">
																<div className="mt-3 mt-lg-0 tabs-heading-txt">
																	<h5>Invite Parent</h5>
																</div>
																<div className="ms-auto mt-3 mt-md-0">
																	<div className="d-flex align-items-center">
																		<div className="position-relative ">
																			<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6C6A81" className="bi bi-search fix-in-icon" viewBox="0 0 16 16">
																				<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
																			</svg>
																			<input type="input" className="form-control login-comn-input searchbar ps-5" placeholder="Search" value={search} onChange={(e) => inputChangedInvite(e)} />
																		</div>
																		<div className="parent-white ms-2">
																			<button onClick={() => { setInvite(!invite); getRequestList(); }} >
																				<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<path d="M3 8C3 5.23858 5.23858 3 8 3C10.7614 3 13 5.23858 13 8C13 10.7614 10.7614 13 8 13C5.23858 13 3 10.7614 3 8ZM8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z" fill="#7B838A" />
																					<path d="M2.34315 16.3431C0.842855 17.8434 0 19.8783 0 22H2C2 20.4087 2.63214 18.8826 3.75736 17.7574C4.88258 16.6321 6.4087 16 8 16C9.5913 16 11.1174 16.6321 12.2426 17.7574C13.3679 18.8826 14 20.4087 14 22H16C16 19.8783 15.1571 17.8434 13.6569 16.3431C12.1566 14.8429 10.1217 14 8 14C5.87827 14 3.84344 14.8429 2.34315 16.3431Z" fill="#7B838A" />
																					<path fillRule="evenodd" clipRule="evenodd" d="M24.7071 13.2929C25.0977 13.6834 25.0977 14.3166 24.7071 14.7071L20.7071 18.7071C20.3166 19.0976 19.6834 19.0976 19.2929 18.7071L15.2929 14.7071C14.9024 14.3166 14.9024 13.6834 15.2929 13.2929C15.6834 12.9024 16.3166 12.9024 16.7071 13.2929L19 15.5858V8C19 7.44771 19.4477 7 20 7C20.5523 7 21 7.44771 21 8V15.5858L23.2929 13.2929C23.6834 12.9024 24.3166 12.9024 24.7071 13.2929Z" fill="#7B838A" />
																				</svg>
																			</button>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-12 mt-3">
															<div className="mb-3">
																<span>Results</span>
															</div>
															{parent?.length > 0 && parent.map((item, i) => {
																return (<div className="d-sm-flex align-items-center justify-content-between team-join-class p-3 mb-3" key={i}>
																	<div className="d-flex align-items-center">
																		<div className="">
																			<img src={item.profile_img ?? "../assets/images/defaultProPic.png"} alt="" className="review_profile_img" />
																		</div>
																		<div className="ms-3 team-detail-name">
																			<span>{item.name}</span>
																			<p className="position-relative mb-0">
																				<svg width="14" height="14" viewBox="0 0 20 16" fill="none" className="me-2" xmlns="http://www.w3.org/2000/svg">
																					<path d="M18 16H2C0.89543 16 0 15.1046 0 14V1.913C0.0466084 0.842548 0.928533 -0.00101238 2 9.11911e-07H18C19.1046 9.11911e-07 20 0.895432 20 2V14C20 15.1046 19.1046 16 18 16ZM2 3.868V14H18V3.868L10 9.2L2 3.868ZM2.8 2L10 6.8L17.2 2H2.8Z" fill="#7B838A" />
																				</svg>
																				{item.email}
																			</p>
																		</div>
																	</div>
																	<div className="ms-sm-auto mt-3 mt-sm-0">
																		<button className="comn-white-btn mt-xxl-0 ms-xxl-2" type="button" data="Invite" onClick={() => inviteClicked(item._id)}></button>
																	</div>
																</div>)
															})}
															{/* <div className="d-sm-flex align-items-center justify-content-between team-join-class p-3 mb-3">
																<div className="d-flex align-items-center">
																	<div className="">
																		<img src="./assets/images/deal-detail-profile.png" alt="" />
																	</div>
																	<div className="ms-3 team-detail-name">
																		<span>Crsitan Prain</span>
																		<p className="position-relative mb-0">
																			<svg width="14" height="14" viewBox="0 0 20 16" fill="none" className="me-2" xmlns="http://www.w3.org/2000/svg">
																				<path d="M18 16H2C0.89543 16 0 15.1046 0 14V1.913C0.0466084 0.842548 0.928533 -0.00101238 2 9.11911e-07H18C19.1046 9.11911e-07 20 0.895432 20 2V14C20 15.1046 19.1046 16 18 16ZM2 3.868V14H18V3.868L10 9.2L2 3.868ZM2.8 2L10 6.8L17.2 2H2.8Z" fill="#7B838A" />
																			</svg>
																			cobybrayent@gmail.com
																		</p>
																	</div>
																</div>
															</div>
															<div className="d-sm-flex align-items-center justify-content-between team-join-class p-3 mb-3">
																<div className="d-flex align-items-center">
																	<div className="">
																		<img src="./assets/images/deal-detail-profile.png" alt="" />
																	</div>
																	<div className="ms-3 team-detail-name">
																		<span>Crsitan Prain</span>
																		<p className="position-relative mb-0">
																			<svg width="14" height="14" viewBox="0 0 20 16" fill="none" className="me-2" xmlns="http://www.w3.org/2000/svg">
																				<path d="M18 16H2C0.89543 16 0 15.1046 0 14V1.913C0.0466084 0.842548 0.928533 -0.00101238 2 9.11911e-07H18C19.1046 9.11911e-07 20 0.895432 20 2V14C20 15.1046 19.1046 16 18 16ZM2 3.868V14H18V3.868L10 9.2L2 3.868ZM2.8 2L10 6.8L17.2 2H2.8Z" fill="#7B838A" />
																			</svg>
																			cobybrayent@gmail.com
																		</p>
																	</div>
																</div>
															</div>
															<div className="d-sm-flex align-items-center justify-content-between team-join-class p-3 mb-3">
																<div className="d-flex align-items-center">
																	<div className="">
																		<img src="./assets/images/deal-detail-profile.png" alt="" />
																	</div>
																	<div className="ms-3 team-detail-name">
																		<span>Crsitan Prain</span>
																		<p className="position-relative mb-0">
																			<svg width="14" height="14" viewBox="0 0 20 16" fill="none" className="me-2" xmlns="http://www.w3.org/2000/svg">
																				<path d="M18 16H2C0.89543 16 0 15.1046 0 14V1.913C0.0466084 0.842548 0.928533 -0.00101238 2 9.11911e-07H18C19.1046 9.11911e-07 20 0.895432 20 2V14C20 15.1046 19.1046 16 18 16ZM2 3.868V14H18V3.868L10 9.2L2 3.868ZM2.8 2L10 6.8L17.2 2H2.8Z" fill="#7B838A" />
																			</svg>
																			cobybrayent@gmail.com
																		</p>
																	</div>
																</div>
															</div> */}
														</div>
													</div>)}


													{/* ============== invitation ============== */}

													{invite && (<div className="row">
														<div className="col-12">
															<div className="d-md-flex align-items-center">
																<div className="mt-3 mt-lg-0 tabs-heading-txt">
																	<h5>Invitation</h5>
																</div>
																<div className="ms-auto mt-3 mt-md-0">
																	<div className="d-flex align-items-center">
																		<div className="position-relative ">
																			<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6C6A81" className="bi bi-search fix-in-icon" viewBox="0 0 16 16">
																				<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
																			</svg>
																			<input type="input" className="form-control login-comn-input searchbar ps-5" placeholder="Search" />
																		</div>
																		<div className="parent-white ms-2">
																			<button onClick={() => { setInvite(!invite); getParent(); }} >
																				<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<path d="M3 8C3 5.23858 5.23858 3 8 3C10.7614 3 13 5.23858 13 8C13 10.7614 10.7614 13 8 13C5.23858 13 3 10.7614 3 8ZM8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z" fill="#7B838A" />
																					<path d="M2.34315 16.3431C0.842855 17.8434 0 19.8783 0 22H2C2 20.4087 2.63214 18.8826 3.75736 17.7574C4.88258 16.6321 6.4087 16 8 16C9.5913 16 11.1174 16.6321 12.2426 17.7574C13.3679 18.8826 14 20.4087 14 22H16C16 19.8783 15.1571 17.8434 13.6569 16.3431C12.1566 14.8429 10.1217 14 8 14C5.87827 14 3.84344 14.8429 2.34315 16.3431Z" fill="#7B838A" />
																					<path fillRule="evenodd" clipRule="evenodd" d="M24.7071 13.2929C25.0977 13.6834 25.0977 14.3166 24.7071 14.7071L20.7071 18.7071C20.3166 19.0976 19.6834 19.0976 19.2929 18.7071L15.2929 14.7071C14.9024 14.3166 14.9024 13.6834 15.2929 13.2929C15.6834 12.9024 16.3166 12.9024 16.7071 13.2929L19 15.5858V8C19 7.44771 19.4477 7 20 7C20.5523 7 21 7.44771 21 8V15.5858L23.2929 13.2929C23.6834 12.9024 24.3166 12.9024 24.7071 13.2929Z" fill="#7B838A" />
																				</svg>
																			</button>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-12 mt-3">
															<div className="row">
																{requestlist?.length > 0 && requestlist.map((item, i) => {
																	return (
																		<div className="col-xl-4 col-sm-6 mt-3">
																			<div className="team-req-box-accept text-center p-3">
																				<div>
																					<img src={item.parentId.profile_img ?? "../assets/images/defaultProPic.png"} alt="" />
																					<span>{item.parentId.name}</span>
																					<bdi>As a parent</bdi>
																				</div>
																				<div className="d-flex align-items-center">
																					<button type="button" className="comn-btn-decline mt-3" onClick={() => declineRequest(item._id)}>
																						Decline
																					</button>
																					<button className="comn-white-btn mt-3 ms-3" data="accept" onClick={() => inviteClicked(item._id)}></button>
																				</div>
																			</div>
																		</div>
																	)
																})}

																{/* <div className="col-xl-4 col-sm-6 mt-3">
																	<div className="team-req-box-accept text-center p-3">
																		<div>
																			<img src="./assets/images/deal-personal-profile.png" alt="" />
																			<span>John Doe</span>
																			<bdi>As a parent</bdi>
																		</div>
																		<div className="d-flex align-items-center">
																			<button type="button" className="comn-btn-decline  mt-3 ">
																				Decline
																			</button>
																			<button className="comn-white-btn mt-3 ms-3" data="accept" onClick={() => setPermission(true)}></button>
																		</div>
																	</div>
																</div>
																<div className="col-xl-4 col-sm-6 mt-3">
																	<div className="team-req-box-accept text-center p-3">
																		<div>
																			<img src="./assets/images/deal-personal-profile.png" alt="" />
																			<span>John Doe</span>
																			<bdi>As a parent</bdi>
																		</div>
																		<div className="d-flex align-items-center">
																			<button type="button" className="comn-btn-decline  mt-3 ">
																				Decline
																			</button>
																			<button className="comn-white-btn mt-3 ms-3" data="accept" onClick={() => setPermission(true)}></button>
																		</div>
																	</div>
																</div> */}
															</div>
														</div>
													</div>)}

												</Tab.Pane>
												<Tab.Pane eventKey="Inviteother">
													<div className="row">
														<div className="col-12">
															<div className="d-md-flex align-items-center">
																<div className="mb-3 mt-3 mt-lg-0 tabs-heading-txt">
																	<h5>Invite Others</h5>
																</div>
																<div className="position-relative ms-auto mt-3 mt-md-0">
																	<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6C6A81" className="bi bi-search fix-in-icon" viewBox="0 0 16 16">
																		<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
																	</svg>
																	<input type="input" className="form-control login-comn-input searchbar ps-5" placeholder="Search" />
																</div>
															</div>
														</div>
														<div className="col-12 text-center mt-3">
															<div className="invite-share-div p-3">
																<div>
																	<img src="./assets/images/deal-detail-profile.png" alt="" />
																</div>
																<div>
																	<span>Crsitan Prain</span>
																	<bdi>Friends who have not joined STARPROSPECT. Send the an exclusive invite now!</bdi>
																</div>
																<div className="row">
																	<div className="col-sm-3 mx-auto">
																		<button className="comn-btn-class mt-3" onClick={() => setShareModalShow(true)}>
																			Share
																		</button>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</Tab.Pane>
												<Tab.Pane eventKey="changepass">
													<div className="my-3 mt-md-0 tabs-heading-txt">
														<h5>Change Password</h5>
													</div>
													<div className="profile-main-class p-3">
														<form className="row align-items-center mt-3">
															<div className="col-lg-6 col-md-12 col-sm-6 mb-3">
																<label className="comn-label-class">Old Password</label>
																<bdi className="d-block position-relative">
																	<input type="password" id="password" className="form-control comn-input-style ps-3" placeholder="Enter Your Old Password" />
																	<span className="showpwd-class bg-transparent" id="show_pwd" onClick={(e) => passwordshow(e)}>
																		<i className="bi bi-eye-slash"></i>
																	</span>
																</bdi>
															</div>
															<div className="row pe-0">
																<div className="col-lg-6 col-md-12 pe-0 col-sm-6 mb-3">
																	<label className="comn-label-class">New Password</label>
																	<bdi className="d-block position-relative">
																		<input type="password" id="newpassword" className="form-control comn-input-style ps-3" placeholder="Enter Your New Password" />
																		<span className="showpwd-class bg-transparent" id="show_newpwd" onClick={(e) => newpasswordshow(e)}>
																			<i className="bi bi-eye-slash"></i>
																		</span>
																	</bdi>
																</div>
																<div className="col-lg-6 col-md-12 pe-0 col-sm-6 mb-3">
																	<label className="comn-label-class">Confirm New Password</label>
																	<bdi className="d-block position-relative">
																		<input type="password" id="confmpassword" className="form-control comn-input-style ps-3" placeholder="Enter Your Confirm Password" />
																		<span className="showpwd-class bg-transparent" id="show_confmpwd" onClick={(e) => confirmpasswordshow(e)}>
																			<i className="bi bi-eye-slash"></i>
																		</span>
																	</bdi>
																</div>
																<div className="col-12 mb-3 ">
																	<button type="button" className="btn forgot-pwd linear-txt" onClick={() => setForgotModalShow(true)}>
																		Forgot password?
																	</button>
																</div>
															</div>

															<div className="row">
																<div className="col-3">
																	<button className="comn-btn-class">Update Password</button>
																</div>
															</div>
														</form>
													</div>
												</Tab.Pane>
												<Tab.Pane eventKey="help&support">
													{reqchatState.reqchatDetail === false && (
														<>
															<div className="my-3 mt-md-0 tabs-heading-txt">
																<h5>Help & Support</h5>
															</div>
															<div className="help-issue-div p-3">
																<div className="row">
																	<div className="col-xl-5 col-sm-6 mb-3">
																		<div className="">
																			<label className="">Issue</label>
																			<select className="w-100 comn-input-style form-select ps-3">
																				<option>Money is not credited</option>
																			</select>
																			<div>
																				<button className="comn-btn-class mt-3" onClick={() => handleReqchatClick("reqchatDetail")}>
																					Request Chat
																				</button>
																			</div>
																		</div>
																	</div>
																</div>
															</div>

															<div className="faq-main-class p-3 mt-3">
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
														</>
													)}
													{/* ===================== REQUEST FOR CHATS ===================== */}
													{reqchatState.reqchatDetail && (
														<>
															<div className="my-3 mt-md-0 tabs-heading-txt">
																<h5>Help & Support</h5>
															</div>
															<div className="row justify-content-center">
																<div className="col-12">
																	<div className="chat-displ" id="chat-main">
																		{/* <div className="chat-rgt-head">
                                  <div className="rgt-pro-info d-flex align-items-center">
                                    <div className="d-lg-none pe-2">
                                      <button
                                        className="bg-transparent border-0 pe-2"
                                        onClick={chatboxclose}
                                      >
                                        <i className="bi bi-arrow-left"></i>
                                      </button>
                                    </div>
                                  </div>
                                </div> */}
																		<div className="helpreq-chat-main">
																			<div className="chat-box-part">
																				<div className="chat-box message-in mb-2">
																					<div className="chat-main-detail d-flex mx-3 mx-lg-0">
																						<div className="chat-section-side position-relative">
																							<div className="chat-left-polygon">
																								<img src="../assets/images/chat-left-polygon.png" />
																							</div>
																							<div className="chat-in-box d-flex flex-column ">
																								<p className="mb-0">Who was that photographer you shared with me recently?</p>
																							</div>
																						</div>
																					</div>
																				</div>
																				<div className="chat-box message-in mb-2">
																					<div className="chat-main-detail d-flex mx-3 mx-lg-0">
																						<div className="chat-section-side position-relative">
																							<div className="chat-left-polygon">
																								<img src="../assets/images/chat-left-polygon.png" />
																							</div>
																							<div className="chat-in-box d-flex flex-column ">
																								<p className="mb-0">Who was that photographer you shared with me recently?</p>
																							</div>
																						</div>
																					</div>
																				</div>
																				<div className="chat-box message-out position-relative mx-3 mx-lg-0 mb-2">
																					<div className="chat-main-detail">
																						<div className="chat-section-side position-relative">
																							<div className="chat-right-polygon">
																								<img src="../assets/images/chat-right-polygon.png" />
																							</div>
																							<div className="chat-in-box d-flex flex-column ms-auto">
																								<p className="mb-0 text-start">Lorem Ipsum is simply</p>
																							</div>
																						</div>
																					</div>
																				</div>
																				<div className="chat-box message-out mx-3 mx-lg-0 mb-2">
																					<div className="chat-main-detail">
																						<div className="chat-section-side position-relative">
																							<div className="chat-right-polygon">
																								<img src="../assets/images/chat-right-polygon.png" />
																							</div>
																							<div className="chat-in-box d-flex flex-column ms-auto">
																								<p className="mb-0 text-start">Lorem Ipsum is simply dummy text of the printing.</p>
																							</div>
																						</div>
																					</div>
																				</div>
																				<div className="chat-box message-in mb-2">
																					<div className="chat-main-detail d-flex mx-3 mx-lg-0">
																						<div className="chat-section-side position-relative">
																							<div className="chat-left-polygon">
																								<img src="../assets/images/chat-left-polygon.png" />
																							</div>
																							<div className="chat-in-box d-flex flex-column ">
																								<p className="mb-0">Who was that photographer you shared with me recently?</p>
																							</div>
																						</div>
																					</div>
																				</div>
																				<div className="chat-box message-out mx-3 mx-lg-0 mb-2">
																					<div className="chat-main-detail">
																						<div className="chat-section-side position-relative">
																							<div className="chat-right-polygon">
																								<img src="../assets/images/chat-right-polygon.png" />
																							</div>
																							<div className="chat-in-box d-flex flex-column ms-auto">
																								<p className="mb-0 text-start">Lorem Ipsum is simply dummy text of the printing.</p>
																							</div>
																						</div>
																					</div>
																				</div>
																				<div className="chat-box message-in mb-2">
																					<div className="chat-main-detail d-flex mx-3 mx-lg-0">
																						<div className="chat-section-side position-relative">
																							<div className="chat-left-polygon">
																								<img src="../assets/images/chat-left-polygon.png" />
																							</div>
																							<div className="chat-in-box d-flex flex-column ">
																								<p className="mb-0">Who was that photographer you shared with me recently?</p>
																							</div>
																						</div>
																					</div>
																				</div>
																				<div className="chat-box message-in mb-2">
																					<div className="chat-main-detail d-flex mx-3 mx-lg-0">
																						<div className="chat-section-side position-relative">
																							<div className="chat-left-polygon">
																								<img src="../assets/images/chat-left-polygon.png" />
																							</div>
																							<div className="chat-in-box d-flex flex-column ">
																								<p className="mb-0">Who was that photographer you shared with me recently?</p>
																							</div>
																						</div>
																					</div>
																				</div>
																				<div className="chat-box message-in mb-2">
																					<div className="chat-main-detail d-flex mx-3 mx-lg-0">
																						<div className="chat-section-side position-relative">
																							<div className="chat-left-polygon">
																								<img src="../assets/images/chat-left-polygon.png" />
																							</div>
																							<div className="chat-in-box d-flex flex-column ">
																								<p className="mb-0">Who was that photographer you shared with me recently?</p>
																							</div>
																						</div>
																					</div>
																				</div>
																				<div className="chat-box message-in mb-2">
																					<div className="chat-main-detail d-flex mx-3 mx-lg-0">
																						<div className="chat-section-side position-relative">
																							<div className="chat-left-polygon">
																								<img src="../assets/images/chat-left-polygon.png" />
																							</div>
																							<div className="chat-in-box d-flex flex-column ">
																								<p className="mb-0">Who was that photographer you shared with me recently?</p>
																							</div>
																						</div>
																					</div>
																				</div>
																				<div className="chat-box message-in mb-2">
																					<div className="chat-main-detail d-flex mx-3 mx-lg-0">
																						<div className="chat-section-side position-relative">
																							<div className="chat-left-polygon">
																								<img src="../assets/images/chat-left-polygon.png" />
																							</div>
																							<div className="chat-in-box d-flex flex-column ">
																								<p className="mb-0">Who was that photographer you shared with me recently?</p>
																							</div>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																		<div className="chat-section-right-msg-box mb-2">
																			<div className="d-flex align-items-center position-relative">
																				<div className="w-100">
																					<InputEmoji value={text} onChange={setText} cleanOnEnter onEnter={handleOnEnter} placeholder="Type Somthing..." />
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</>
													)}
												</Tab.Pane>
												<Tab.Pane eventKey="faq">
													<div className="my-3 mt-md-0 tabs-heading-txt">
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
			{addbank && (<Modal show={addbank} onHide={() => setAddBank(false)} size="md" className="comn-modal-style" arialabelledby="contained-modal-title-vcenter" centered>
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
									<button className="comn-btn-class mt-3" onClick={() => setAddBankSuccess(true)}>
										Add Bank
									</button>
								</div>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>)}
			{/* =============  Add credit-card ================== */}
			{/* <Modal show={addcard} onHide={() => setAddCard(false)} size="md" className="comn-modal-style" arialabelledby="contained-modal-title-vcenter" centered>
				<Modal.Header closeButton className="mt-2">
					<div className="add-modal-hdr mx-auto">
						<p>Add Credit Card</p>
					</div>
				</Modal.Header>
				<Modal.Body className="pt-0">
					<div className="row">
						<div className="col-12 mb-3 mt-3">
							<label className="comn-label-class">Card Number</label>
							<bdi className="d-block position-relative">
								<input type="tel" className="form-control comn-input-style ps-3" placeholder="Enter Card Number" />
								<span className="showpwd-class bg-transparent" id="show_pwd">
									<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M18 16H2C0.89543 16 0 15.1046 0 14V2C0 0.89543 0.89543 0 2 0H18C19.1046 0 20 0.89543 20 2V14C20 15.1046 19.1046 16 18 16ZM2 8V14H18V8H2ZM2 2V4H18V2H2ZM11 12H4V10H11V12Z" fill="#7B838A" />
									</svg>
								</span>
							</bdi>
						</div>
						<div className="col-xl-6 col-lg-12 col-sm-6 mb-3">
							<label className="comn-label-class">Month & Years</label>
							<input className="form-control comn-input-style ps-3" type="month" />
						</div>
						<div className="col-xl-6 col-lg-12 col-sm-6 mb-3">
							<label className="comn-label-class">CVC Number</label>
							<input className="form-control comn-input-style ps-3" type="tel" placeholder="CVV" />
						</div>
						<div className="col-12 mb-3">
							<label className="comn-label-class">Postal code</label>
							<input className="form-control comn-input-style ps-3" type="tel" placeholder="Postal Code" />
						</div>
						<div className="col-12 mt-3">
							<button className="comn-btn-class mt-3">Add Bank</button>
						</div>
					</div>
				</Modal.Body>
			</Modal> */}
			{/* ================  forgot password modal =============== */}
			{forgotmodalShow && (<Modal show={forgotmodalShow} onHide={() => setForgotModalShow(false)} size="md" className="comn-modal-style" arialabelledby="contained-modal-title-vcenter" centered>
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body className="pt-0">
					<div className="text-center modal-data px-5">
						<span>Forgot Password</span>
						<p>Select which contact details should we use to reset your password:</p>
						<div className="modal-in-box mb-3" onClick={() => window.open("/check-phone", "_self")}>
							<div className="d-flex align-items-center">
								<div className="me-3">
									<svg width="21" height="32" viewBox="0 0 21 32" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M17.729 31.5834H3.56234C1.99753 31.5834 0.729004 30.3148 0.729004 28.75V3.25002C0.729004 1.68521 1.99753 0.416687 3.56234 0.416687H17.729C19.2938 0.416687 20.5623 1.68521 20.5623 3.25002V28.75C20.5623 30.3148 19.2938 31.5834 17.729 31.5834ZM3.56234 3.25002V28.75H17.729V3.25002H3.56234ZM10.6457 27.3334C9.86327 27.3334 9.229 26.6991 9.229 25.9167C9.229 25.1343 9.86327 24.5 10.6457 24.5C11.4281 24.5 12.0623 25.1343 12.0623 25.9167C12.0623 26.6991 11.4281 27.3334 10.6457 27.3334Z" fill="url(#paint0_linear_2138_26)" />
										<defs>
											<linearGradient id="paint0_linear_2138_26" x1="1.52957" y1="6.9827" x2="23.4881" y2="9.49476" gradientUnits="userSpaceOnUse">
												<stop stopColor="#6A58FB" />
												<stop offset="1" stopColor="#4599F4" />
											</linearGradient>
										</defs>
									</svg>
								</div>
								<div className="box-in-info text-start">
									<span className="d-block">Via SMS</span>
									<p>*** *** 7895</p>
								</div>
							</div>
						</div>
						<div className="modal-in-box mb-3" onClick={() => window.open("/check-mail", "_self")}>
							<div className="d-flex align-items-center">
								<div className="me-3">
									<svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M26.3335 23.3334H3.66683C2.10202 23.3334 0.833496 22.0648 0.833496 20.5V3.37677C0.899525 1.8603 2.14892 0.665253 3.66683 0.666688H26.3335C27.8983 0.666688 29.1668 1.93522 29.1668 3.50002V20.5C29.1668 22.0648 27.8983 23.3334 26.3335 23.3334ZM3.66683 6.14636V20.5H26.3335V6.14636L15.0002 13.7L3.66683 6.14636ZM4.80016 3.50002L15.0002 10.3L25.2002 3.50002H4.80016Z" fill="url(#paint0_linear_2138_1099)" />
										<defs>
											<linearGradient id="paint0_linear_2138_1099" x1="1.97716" y1="5.44197" x2="32.2295" y2="12.2401" gradientUnits="userSpaceOnUse">
												<stop stopColor="#6A58FB" />
												<stop offset="1" stopColor="#4599F4" />
											</linearGradient>
										</defs>
									</svg>
								</div>
								<div className="box-in-info text-start">
									<span className="d-block">Via Email</span>
									<p>******e@gmail.com</p>
								</div>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>)}
			{/* ===============  Remove Bank ============= */}
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
											<select className="form-control comn-input-style ps-3 pe-5">
												<option>Choose Bank</option>
												<option>HDFC BANK</option>
											</select>
											<span className="showpwd-class bg-transparent">
												<img src="../assets/images/down arrow icon.svg" alt="" />
											</span>
										</bdi>
									</div>
									<div className="mt-3">
										<label className="comn-label-class">Account Type</label>
										<bdi className="d-block position-relative">
											<select className="form-control comn-input-style ps-3 pe-5">
												<option>Choose Account type</option>
												<option>Saving Account</option>
											</select>
											<span className="showpwd-class bg-transparent">
												<img src="../assets/images/down arrow icon.svg" alt="" />
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
										<button className="comn-btn-class mt-3" onClick={() => setAddBankSuccess(true)}>
											Add Bank
										</button>
									</div>
								</div>
							</div>
						</div>
					</Modal.Body>
				</Modal>
			)}
			{/* =============  Add credit-card ================== */}
			{addcard && (
				<Modal show={addcard} onHide={() => setAddCard(false)} size="md" className="comn-modal-style" arialabelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton className="mt-2">
						<div className="add-modal-hdr mx-auto">
							<p>Add Credit Card</p>
						</div>
					</Modal.Header>
					<Modal.Body className="pt-0">
						<div className="row">
							<div className="col-12 mb-3 mt-3">
								<label className="comn-label-class">Card Number</label>
								<bdi className="d-block position-relative">
									<input type="tel" className="form-control comn-input-style ps-3" placeholder="Enter Card Number" />
									<span className="showpwd-class bg-transparent" id="show_pwd">
										<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M18 16H2C0.89543 16 0 15.1046 0 14V2C0 0.89543 0.89543 0 2 0H18C19.1046 0 20 0.89543 20 2V14C20 15.1046 19.1046 16 18 16ZM2 8V14H18V8H2ZM2 2V4H18V2H2ZM11 12H4V10H11V12Z" fill="#7B838A" />
										</svg>
									</span>
								</bdi>
							</div>
							<div className="col-xl-6 col-lg-12 col-sm-6 mb-3">
								<label className="comn-label-class">Month & Years</label>
								<input className="form-control comn-input-style ps-3" type="month" />
							</div>
							<div className="col-xl-6 col-lg-12 col-sm-6 mb-3">
								<label className="comn-label-class">CVC Number</label>
								<input className="form-control comn-input-style ps-3" type="tel" placeholder="CVV" />
							</div>
							<div className="col-12 mb-3">
								<label className="comn-label-class">Postal code</label>
								<input className="form-control comn-input-style ps-3" type="tel" placeholder="Postal Code" />
							</div>
							<div className="col-12 mt-3">
								<button className="comn-btn-class mt-3">Add Bank</button>
							</div>
						</div>
					</Modal.Body>
				</Modal>
			)}
			{/* ================  forgot password modal =============== */}
			{forgotmodalShow && (
				<Modal show={forgotmodalShow} onHide={() => setForgotModalShow(false)} size="md" className="comn-modal-style" arialabelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton></Modal.Header>
					<Modal.Body className="pt-0">
						<div className="text-center modal-data px-5">
							<span>Forgot Password</span>
							<p>Select which contact details should we use to reset your password:</p>
							<div className="modal-in-box mb-3" onClick={() => window.open("/check-phone", "_self")}>
								<div className="d-flex align-items-center">
									<div className="me-3">
										<svg width="21" height="32" viewBox="0 0 21 32" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M17.729 31.5834H3.56234C1.99753 31.5834 0.729004 30.3148 0.729004 28.75V3.25002C0.729004 1.68521 1.99753 0.416687 3.56234 0.416687H17.729C19.2938 0.416687 20.5623 1.68521 20.5623 3.25002V28.75C20.5623 30.3148 19.2938 31.5834 17.729 31.5834ZM3.56234 3.25002V28.75H17.729V3.25002H3.56234ZM10.6457 27.3334C9.86327 27.3334 9.229 26.6991 9.229 25.9167C9.229 25.1343 9.86327 24.5 10.6457 24.5C11.4281 24.5 12.0623 25.1343 12.0623 25.9167C12.0623 26.6991 11.4281 27.3334 10.6457 27.3334Z" fill="url(#paint0_linear_2138_26)" />
											<defs>
												<linearGradient id="paint0_linear_2138_26" x1="1.52957" y1="6.9827" x2="23.4881" y2="9.49476" gradientUnits="userSpaceOnUse">
													<stop stopColor="#6A58FB" />
													<stop offset="1" stopColor="#4599F4" />
												</linearGradient>
											</defs>
										</svg>
									</div>
									<div className="box-in-info text-start">
										<span className="d-block">Via SMS</span>
										<p>*** *** 7895</p>
									</div>
								</div>
							</div>
							<div className="modal-in-box mb-3" onClick={() => window.open("/check-mail", "_self")}>
								<div className="d-flex align-items-center">
									<div className="me-3">
										<svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M26.3335 23.3334H3.66683C2.10202 23.3334 0.833496 22.0648 0.833496 20.5V3.37677C0.899525 1.8603 2.14892 0.665253 3.66683 0.666688H26.3335C27.8983 0.666688 29.1668 1.93522 29.1668 3.50002V20.5C29.1668 22.0648 27.8983 23.3334 26.3335 23.3334ZM3.66683 6.14636V20.5H26.3335V6.14636L15.0002 13.7L3.66683 6.14636ZM4.80016 3.50002L15.0002 10.3L25.2002 3.50002H4.80016Z" fill="url(#paint0_linear_2138_1099)" />
											<defs>
												<linearGradient id="paint0_linear_2138_1099" x1="1.97716" y1="5.44197" x2="32.2295" y2="12.2401" gradientUnits="userSpaceOnUse">
													<stop stopColor="#6A58FB" />
													<stop offset="1" stopColor="#4599F4" />
												</linearGradient>
											</defs>
										</svg>
									</div>
									<div className="box-in-info text-start">
										<span className="d-block">Via Email</span>
										<p>******e@gmail.com</p>
									</div>
								</div>
							</div>
						</div>
					</Modal.Body>
				</Modal>
			)}
			{/* ===============  Remove Bank ============= */}
			{removebank && (
				<Modal show={removebank} onHide={() => setRemoveBank(false)} size="sm" className="comn-modal-style" arialabelledby="contained-modal-title-vcenter" centered>
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
				</Modal>
			)}
			{/* ===============  Add Bank  Success ============= */}
			{addbanksuccess && (
				<Modal show={addbanksuccess} onHide={() => setAddBankSuccess(false)} size="sm" className="comn-modal-style" arialabelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton className="mt-2"></Modal.Header>
					<Modal.Body className="pt-0">
						<div className="row">
							<div className="col-12 mx-auto">
								<div className="remove-modal-main text-center">
									<div className="mb-3">
										<svg width="59" height="35" viewBox="0 0 59 35" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M43.9984 4.49961L40.4734 0.974609L24.6234 16.8246L28.1484 20.3496L43.9984 4.49961ZM54.5984 0.974609L28.1484 27.4246L17.6984 16.9996L14.1734 20.5246L28.1484 34.4996L58.1484 4.49961L54.5984 0.974609ZM0.0234375 20.5246L13.9984 34.4996L17.5234 30.9746L3.57344 16.9996L0.0234375 20.5246Z" fill="url(#paint0_linear_5325_29856)" />
											<defs>
												<linearGradient id="paint0_linear_5325_29856" x1="2.36963" y1="8.03746" x2="61.7925" y2="26.5586" gradientUnits="userSpaceOnUse">
													<stop stopColor="#6A58FB" />
													<stop offset="1" stopColor="#4599F4" />
												</linearGradient>
											</defs>
										</svg>
									</div>
									<span>Account Added Successfully</span>
									<bdi>Lorem Ipsum Lorem Ipsum Lorem</bdi>
								</div>
							</div>
							<div className="col-12 mt-3">
								<div className="">
									<button type="btn" className="comn-btn-class mt-3">
										Done
									</button>
								</div>
							</div>
						</div>
					</Modal.Body>
				</Modal>
			)}
			{/* ===============  Add Case modal ============= */}
			{addcase && (
				<Modal show={addcase} onHide={() => setAddCase(false)} size="md" className="donate-modal-style comn-modal-style" centered>
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
												<img src="../assets/images/card.svg" alt="" />
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
																	<img src="../assets/images/paypal.svg" alt="pay-pal" />
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
																	<img src="../assets/images/google-pay-img.svg" alt="g-pay" />
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
																	<img src="../assets/images/apple-pay-img.svg" alt="apple-pay" />
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
																	<input name="donate" type="radio" id="donate-card-1" />
																	<label className="cust-radio-main w-100 card-1" htmlFor="donate-card-1">
																		<div className="d-flex align-items-center">
																			<div>
																				<img src="../assets/images/card-visa.svg" alt="card" />
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
																	<input name="donate" type="radio" id="donate-card-2" />
																	<label className="cust-radio-main w-100 card-1" htmlFor="donate-card-2">
																		<div className="d-flex align-items-center">
																			<div>
																				<img src="../assets/images/card-visa.svg" alt="card" />
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
																				<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<path d="M18 16H2C0.89543 16 0 15.1046 0 14V2C0 0.89543 0.89543 0 2 0H18C19.1046 0 20 0.89543 20 2V14C20 15.1046 19.1046 16 18 16ZM2 8V14H18V8H2ZM2 2V4H18V2H2ZM11 12H4V10H11V12Z" fill="#7B838A" />
																				</svg>
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
			{/* ============= Share Modal ============== */}
			{addcase && (
				<Modal show={sharemodalShow} onHide={() => setShareModalShow(false)} size="md" className="comn-modal-style" arialabelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton></Modal.Header>
					<Modal.Body className="pt-0 like-modal-body share-data-modal">
						<div className="text-center modal-data  px-5">
							<span>Share</span>
						</div>
						<label className="input-label">Invitation Link</label>
						<div className="input-group mb-4">
							<span className="input-group-text" id="basic-addon1">
								@
							</span>
							<input type="text" className="form-control comn-input-style ps-2" placeholder="https://starprospectnil.com/3b3655cc" aria-label="Username" aria-describedby="basic-addon1" />
							<button className="link-copy-btn">copy</button>
						</div>
						<div className="top-new-section position-relative mb-3">
							<span className="d-inline-block px-2 position-relative">OR</span>
						</div>
						<div className="row">
							<div className="col-12 mx-auto text-center">
								<div>
									<label className="input-label mt-2">Send Link</label>
									<div>
										<ul className="d-flex align-items-center justify-content-center mt-3 social-share-icon">
											<li>
												<span>
													<Link href="/#">
														<img src="./assets/images/Facebook-icon.png" alt="fb" />
													</Link>
												</span>
											</li>
											<li>
												<span>
													<Link href="/#">
														<img src="./assets/images/instagram-icon.png" alt="insta" />
													</Link>
												</span>
											</li>
											<li>
												<span>
													<Link href="/#">
														<img src="./assets/images/twitter-icon.png" alt="twiter" />
													</Link>
												</span>
											</li>
											<li>
												<span>
													<Link href="/#">
														<img src="./assets/images/linkedin_icon.png" alt="linkedin" />
													</Link>
												</span>
											</li>
											<li>
												<span>
													<Link href="/#">
														<img src="./assets/images/gmail icon.png" aria-label="gmail" />
													</Link>
												</span>
											</li>
										</ul>
									</div>
									<div className="row">
										<div className="col-sm-4 mt-3 mx-auto">
											<button className="comn-btn-class mt-3">SEND</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Modal.Body>
				</Modal>
			)}
			{/* ===============  Manage Permissions ============= */}
			{permission && (
				<Modal show={permission} onHide={() => setPermission(false)} size="md" className="report-post-modal" arialabelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton className="pb-0 border-0">
						<div className="manage-permission-hdr">
							<p>Manage Permissions</p>
						</div>
					</Modal.Header>
					<Modal.Body className="pt-0">
						<div className="text-center manage-permission-body">
							<span>Give permissions to your gardian to manage your profile</span>
						</div>
						<div className="row">
							<div className="col-12 mt-3">
								<div className="mb-3">
									<label className="cust-chk-bx">
										<input type="checkbox" name="profile" onClick={(e) => handleFilterChange(e)} />
										<span className="cust-chkmark"></span>
										Profile Manage
									</label>
								</div>
								<div className="mb-3">
									<label className="cust-chk-bx">
										<input type="checkbox" name="offers" onClick={(e) => handleFilterChange(e)} />
										<span className="cust-chkmark"></span>
										Offers Manage
									</label>
								</div>
								<div className="mb-3">
									<label className="cust-chk-bx">
										<input type="checkbox" name="team" onClick={(e) => handleFilterChange(e)} />
										<span className="cust-chkmark"></span>
										Team Manage
									</label>
								</div>
								<div className="mb-3">
									<label className="cust-chk-bx">
										<input type="checkbox" name="events" onClick={(e) => handleFilterChange(e)} />
										<span className="cust-chkmark"></span>
										Events Manage
									</label>
								</div>
								<div className="mb-3">
									<label className="cust-chk-bx">
										<input type="checkbox" name="wallet" onClick={(e) => handleFilterChange(e)} />
										<span className="cust-chkmark"></span>
										Wallet Manage
									</label>
								</div>
								<div className="mb-3">
									<label className="cust-chk-bx">
										<input type="checkbox" name="notification" onClick={(e) => handleFilterChange(e)} />
										<span className="cust-chkmark"></span>
										Show notifications
									</label>
								</div>
								<div className="mt-4">
									<button className="comn-btn-class" onClick={invite ? () => acceptRequest() : () => sendInvite()}>Done</button>
								</div>
							</div>
						</div>
					</Modal.Body>
				</Modal>
			)}
		</>
	);
}
