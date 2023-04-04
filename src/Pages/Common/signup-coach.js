import React, { createRef, useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FetchPostApi } from "../../Api/apiServices";
import { API_Path, errorContainer, formAttr, phoneRegExp } from "../../Api/Const";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import roleContext from "../../contexts/roleContext";
import { Modal } from "react-bootstrap";
import moment from "moment/moment";
import MainLogo from "../../assets/images/main-logo.png";
import ArchyMan from "../../assets/images/Archery-man.png";
import VerifyOtpModal from "../../Components/AllModals/VerifyOtpModal";

export default function SignupCoach() {
	const context = useContext(roleContext);
	const { newEmail, phoneNumber, handleGoogleLogin, handleFacebookLogin, social, socialPopUp } = context;
	const runform = createRef();
	const navigate = useNavigate();
	const location = useLocation();

	const [country, setcountry] = useState("");
	const [showPassword, setshowPassword] = useState("password");
	const [forgotmodalShow, setForgotModalShow] = useState(false);
	const [tempObj, setTempObj] = useState({});
	const [socialData, setSocialData] = useState("");
	const [socialLoginPopUp, setSocialLoginPopUp] = useState(false);

	var yearsago = moment(new Date()).subtract(18, "years").format("YYYY-MM-DD");

	useEffect(() => {
		setcountry(context.country);
		setSocialData(social);
		setSocialLoginPopUp(socialPopUp);
	}, [context.country, social, socialPopUp]);

	const PhonehandleOnChange = (value) => {
		let temp = "+" + value;
		runform.current.setFieldValue("contact_no", temp);
	};

	const varifyByEmail = async () => {
		let result = await FetchPostApi(API_Path.signUp, { email: tempObj.email, otpsend: 1 });
		let LoginData = await result.json();
		if (result.status === 200) {
			toast.success(LoginData.message);
			navigate("/otpverification", {
				state: { email: tempObj.email },
			});
		} else {
			toast.error(LoginData.message);
		}
	};

	const varifyBycontect = async () => {
		let result = await FetchPostApi(API_Path.signUp, { contact_no: tempObj.contact_no, otpsend: 1 });
		let LoginData = await result.json();
		if (result.status === 200) {
			toast.success(LoginData.data.message);
			navigate("/otpverification", {
				state: { contact_no: tempObj.contact_no },
			});
		} else {
			toast.error(result.data.message);
		}
	};

	const submitCouchRagister = async (data, resetForm) => {
		let result = await FetchPostApi(API_Path.signUp, data);
		let LoginData = await result.json();
		if (result.status === 200) {
			setTempObj(data);
			toast.success(LoginData.message);
			resetForm(data);
			setForgotModalShow(true);
		} else {
			toast.error(LoginData.message);
		}
	};

	const submitCouchRagisterBySocial = async (data, resetForm) => {
		let result = await FetchPostApi(API_Path.socialMediaLogin, data);
		let LoginData = await result.json();
		if (result.status === 200) {
			setTempObj(data);
			toast.success(LoginData.message);
			resetForm(data);
			setForgotModalShow(true);
		} else {
			toast.error(LoginData.message);
		}
	};

	return (
		<>
			<div className="container-fluid login-flow-screen">
				<div className="row align-items-center h-100 position-relative">
					<div className="col-12 p-0">
						<div className="login-box mx-auto ">
							<div className="row">
								<div className="col-md-6 ovr-div-class">
									<div>
										<div className="main-logo-box text-center mb-3 mt-5">
											<img src={MainLogo} className="img-fluid" alt="starprospect" />
										</div>
										{socialLoginPopUp ? (
											<Formik
												innerRef={runform}
												enableReinitialize
												initialValues={{
													idToken: socialData.idToken,
													exist: 0,
													web: true,
													signupType: location?.state?.signupType,
													user_name: "",
													name :socialData.fullName,
													address: "",
													contact_no: "",
													univercity: "",
													email: socialData.email,
													DOB: "",
												}}
												validationSchema={Yup.object({ 
													email: Yup.string().email().required("Email is required."),
													name: Yup.string().required("name is required."),
													user_name: Yup.string().required("Username is required."),
													address: Yup.string().required("address is required."),
													contact_no: Yup.string().matches(phoneRegExp, "Phone number is not valid").required("Phone number is required."),
													univercity: Yup.string().required("university is required."),
													DOB: Yup.string().required("DOB is required."),
												})}
												onSubmit={(formData, { resetForm }) => submitCouchRagisterBySocial(formData, resetForm)}
											>
												{(runform) => (
													<form className="row align-items-center px-5 me-0" onSubmit={runform.handleSubmit}>
														<div className="col-12 mb-3 pe-0">
															<div className="text-start">
																<div className="comn-login-head">
																	<h2>Welcome To Starprospect!</h2>
																	<p>Enter Your Personal Details</p>
																</div>
															</div>
														</div>
														<div className="col-lg-6 col-md-12 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Name</label>
															<bdi className="d-block position-relative">
																<input type="text" disabled name="name" className="form-control comn-input-style" placeholder="Enter Your Name" {...formAttr(runform, "name")} />
																<span className="comn-left-input-icon">
																	<svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M3 5C3 2.23858 5.23858 0 8 0C10.7614 0 13 2.23858 13 5C13 7.76142 10.7614 10 8 10C5.23858 10 3 7.76142 3 5ZM8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" fill="#7B838A" />
																		<path d="M2.34315 13.3431C0.842855 14.8434 0 16.8783 0 19H2C2 17.4087 2.63214 15.8826 3.75736 14.7574C4.88258 13.6321 6.4087 13 8 13C9.5913 13 11.1174 13.6321 12.2426 14.7574C13.3679 15.8826 14 17.4087 14 19H16C16 16.8783 15.1571 14.8434 13.6569 13.3431C12.1566 11.8429 10.1217 11 8 11C5.87827 11 3.84344 11.8429 2.34315 13.3431Z" fill="#7B838A" />
																	</svg>
																</span>
															</bdi>
															{errorContainer(runform, "name")}
														</div>
														<div className="col-lg-6 col-md-12 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Username</label>
															<bdi className="d-block position-relative">
																<input type="text" disabled name="user_name" className="form-control comn-input-style" placeholder="Enter Your Name" {...formAttr(runform, "user_name")} />
																<span className="comn-left-input-icon">
																	<svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M3 5C3 2.23858 5.23858 0 8 0C10.7614 0 13 2.23858 13 5C13 7.76142 10.7614 10 8 10C5.23858 10 3 7.76142 3 5ZM8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" fill="#7B838A" />
																		<path d="M2.34315 13.3431C0.842855 14.8434 0 16.8783 0 19H2C2 17.4087 2.63214 15.8826 3.75736 14.7574C4.88258 13.6321 6.4087 13 8 13C9.5913 13 11.1174 13.6321 12.2426 14.7574C13.3679 15.8826 14 17.4087 14 19H16C16 16.8783 15.1571 14.8434 13.6569 13.3431C12.1566 11.8429 10.1217 11 8 11C5.87827 11 3.84344 11.8429 2.34315 13.3431Z" fill="#7B838A" />
																	</svg>
																</span>
															</bdi>
															{errorContainer(runform, "user_name")}
														</div>
														<div className="col-lg-6 col-md-12 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Organization/School/Professional Team</label>
															<bdi className="d-block position-relative">
																<input type="text" className="form-control comn-input-style" placeholder="Enter Your School Name" name="univercity" {...formAttr(runform, "univercity")} />
																<span className="comn-left-input-icon">
																	<svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M11 0L0 6L4 8.18V14.18L11 18L18 14.18V8.18L20 7.09V14H22V6L11 0ZM17.82 6L11 9.72L4.18 6L11 2.28L17.82 6ZM16 12.99L11 15.72L6 12.99V9.27L11 12L16 9.27V12.99Z" fill="#7B838A" />
																	</svg>
																</span>
															</bdi>
															{errorContainer(runform, "univercity")}
														</div>
														<div className="col-lg-6 col-md-12 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Address</label>
															<bdi className="d-block position-relative">
																<input type="text" className="form-control comn-input-style" placeholder="Enter Your Address" name="address" {...formAttr(runform, "address")} />
																<span className="comn-left-input-icon">
																	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM7 9C7 6.24 9.24 4 12 4C14.76 4 17 6.24 17 9C17 11.88 14.12 16.19 12 18.88C9.92 16.21 7 11.85 7 9Z" fill="#7B838A" />
																		<path d="M12 11.5C13.3807 11.5 14.5 10.3807 14.5 9C14.5 7.61929 13.3807 6.5 12 6.5C10.6193 6.5 9.5 7.61929 9.5 9C9.5 10.3807 10.6193 11.5 12 11.5Z" fill="#7B838A" />
																	</svg>
																</span>
															</bdi>
															{errorContainer(runform, "address")}
														</div>
														<div className="col-lg-6 col-md-12 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Date Of Birth</label>
															<bdi className="d-block position-relative">
																<input type="date" max={yearsago} className="form-control comn-input-style"  data-date-format="YYYY-MM-DD" name="DOB" {...formAttr(runform, "DOB")} />
																<span className="comn-left-input-icon">
																	<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M16 20H2C0.89543 20 0 19.1046 0 18V4C0 2.89543 0.89543 2 2 2H4V0H6V2H12V0H14V2H16C17.1046 2 18 2.89543 18 4V18C18 19.1046 17.1046 20 16 20ZM2 8V18H16V8H2ZM2 4V6H16V4H2ZM14 16H12V14H14V16ZM10 16H8V14H10V16ZM6 16H4V14H6V16ZM14 12H12V10H14V12ZM10 12H8V10H10V12ZM6 12H4V10H6V12Z" fill="#7B838A" />
																	</svg>
																</span>
															</bdi>
															{errorContainer(runform, "DOB")}
														</div>
														<div className="col-lg-6 col-md-12 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Email Address</label>
															<bdi className="d-block position-relative">
																<input type="email" disabled className="form-control comn-input-style" placeholder="Enter Your Email" name="email" {...formAttr(runform, "email")} />
																<span className="comn-left-input-icon">
																	<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M18 16H2C0.89543 16 0 15.1046 0 14V1.913C0.0466084 0.842548 0.928533 -0.00101238 2 9.11911e-07H18C19.1046 9.11911e-07 20 0.895432 20 2V14C20 15.1046 19.1046 16 18 16ZM2 3.868V14H18V3.868L10 9.2L2 3.868ZM2.8 2L10 6.8L17.2 2H2.8Z" fill="#7B838A" />
																	</svg>
																</span>
															</bdi>
															{errorContainer(runform, "email")}
														</div>
														<div className="col-lg-6 col-md-12 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Phone Number</label>
															<bdi className="d-block position-relative">
																<PhoneInput inputExtraProps={{ inputClass: "form-control input-style", required: true, autoFocus: true }} country={country} onChange={PhonehandleOnChange} />
															</bdi>
															{errorContainer(runform, "contact_no")}
														</div>
														<div className="col-sm-8 mx-auto my-3 pe-0">
															<button className="comn-btn-class w-100" type="submit">
																SIGN UP
															</button>
														</div>
														<div className="col-12 pe-0">
															<div className="text-center form-btm-link">
																<div className="mt-4 form-btm-link" onClick={() => navigate("/login")}>
																	<p>
																		Already User?
																		<Link to="/#" className="ms-2 comn-yellow-txt">
																			Sign In
																		</Link>
																	</p>
																</div>
															</div>
														</div>
													</form>
												)}
											</Formik>
										) : (
											<Formik
												innerRef={runform}
												enableReinitialize
												initialValues={{
													web: true,
													signupType: location?.state?.signupType,
													address: "",
													user_name: "",
													name: "",
													password: "",
													contact_no: "",
													univercity: "",
													email: "",
													DOB: "",
												}}
												validationSchema={Yup.object({
													email: Yup.string().email().required("Email is required."),
													user_name: Yup.string().required("Username is required."),
													name: Yup.string().required("Username is required."),
													address: Yup.string().required("address is required."),
													password: Yup.string()
														.required("Please Enter your password")
														.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
													contact_no: Yup.string().matches(phoneRegExp, "Phone number is not valid").required("Phone number is required."),
													univercity: Yup.string().required("university is required."),
													DOB: Yup.string().required("DOB is required."),
												})}
												onSubmit={(formData, { resetForm }) => submitCouchRagister(formData, resetForm)}
											>
												{(runform) => (
													<form className="row align-items-center px-5 me-0" onSubmit={runform.handleSubmit}>
														<div className="col-12 mb-3 pe-0">
															<div className="text-start">
																<div className="comn-login-head">
																	<h2>Welcome To Starprospect!</h2>
																	<p>Enter Your Personal Details</p>
																</div>
															</div>
														</div>
														<div className="col-lg-6 col-md-12 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Name</label>
															<bdi className="d-block position-relative">
																<input type="text"  name="name" className="form-control comn-input-style" placeholder="Enter Your Name" {...formAttr(runform, "name")} />
																<span className="comn-left-input-icon">
																	<svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M3 5C3 2.23858 5.23858 0 8 0C10.7614 0 13 2.23858 13 5C13 7.76142 10.7614 10 8 10C5.23858 10 3 7.76142 3 5ZM8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" fill="#7B838A" />
																		<path d="M2.34315 13.3431C0.842855 14.8434 0 16.8783 0 19H2C2 17.4087 2.63214 15.8826 3.75736 14.7574C4.88258 13.6321 6.4087 13 8 13C9.5913 13 11.1174 13.6321 12.2426 14.7574C13.3679 15.8826 14 17.4087 14 19H16C16 16.8783 15.1571 14.8434 13.6569 13.3431C12.1566 11.8429 10.1217 11 8 11C5.87827 11 3.84344 11.8429 2.34315 13.3431Z" fill="#7B838A" />
																	</svg>
																</span>
															</bdi>
															{errorContainer(runform, "name")}
														</div>
														<div className="col-lg-6 col-md-12 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Username</label>
															<bdi className="d-block position-relative">
																<input type="text"  name="user_name" className="form-control comn-input-style" placeholder="Enter Your Name" {...formAttr(runform, "user_name")} />
																<span className="comn-left-input-icon">
																	<svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M3 5C3 2.23858 5.23858 0 8 0C10.7614 0 13 2.23858 13 5C13 7.76142 10.7614 10 8 10C5.23858 10 3 7.76142 3 5ZM8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" fill="#7B838A" />
																		<path d="M2.34315 13.3431C0.842855 14.8434 0 16.8783 0 19H2C2 17.4087 2.63214 15.8826 3.75736 14.7574C4.88258 13.6321 6.4087 13 8 13C9.5913 13 11.1174 13.6321 12.2426 14.7574C13.3679 15.8826 14 17.4087 14 19H16C16 16.8783 15.1571 14.8434 13.6569 13.3431C12.1566 11.8429 10.1217 11 8 11C5.87827 11 3.84344 11.8429 2.34315 13.3431Z" fill="#7B838A" />
																	</svg>
																</span>
															</bdi>
															{errorContainer(runform, "user_name")}
														</div>
														<div className="col-lg-6 col-md-12 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Organization/School/Professional Team</label>
															<bdi className="d-block position-relative">
																<input type="text" className="form-control comn-input-style" placeholder="Enter Your School Name" name="univercity" {...formAttr(runform, "univercity")} />
																<span className="comn-left-input-icon">
																	<svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M11 0L0 6L4 8.18V14.18L11 18L18 14.18V8.18L20 7.09V14H22V6L11 0ZM17.82 6L11 9.72L4.18 6L11 2.28L17.82 6ZM16 12.99L11 15.72L6 12.99V9.27L11 12L16 9.27V12.99Z" fill="#7B838A" />
																	</svg>
																</span>
															</bdi>
															{errorContainer(runform, "univercity")}
														</div>
														<div className="col-lg-6 col-md-12 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Address</label>
															<bdi className="d-block position-relative">
																<input type="text" className="form-control comn-input-style" placeholder="Enter Your Address" name="address" {...formAttr(runform, "address")} />
																<span className="comn-left-input-icon">
																	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM7 9C7 6.24 9.24 4 12 4C14.76 4 17 6.24 17 9C17 11.88 14.12 16.19 12 18.88C9.92 16.21 7 11.85 7 9Z" fill="#7B838A" />
																		<path d="M12 11.5C13.3807 11.5 14.5 10.3807 14.5 9C14.5 7.61929 13.3807 6.5 12 6.5C10.6193 6.5 9.5 7.61929 9.5 9C9.5 10.3807 10.6193 11.5 12 11.5Z" fill="#7B838A" />
																	</svg>
																</span>
															</bdi>
															{errorContainer(runform, "address")}
														</div>
														<div className="col-lg-6 col-md-12 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Date Of Birth</label>
															<bdi className="d-block position-relative">
																<input type="date" max={yearsago} className="form-control comn-input-style" data-date-format="YYYY-MM-DD" name="DOB" {...formAttr(runform, "DOB")} />
																<span className="comn-left-input-icon">
																	<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M16 20H2C0.89543 20 0 19.1046 0 18V4C0 2.89543 0.89543 2 2 2H4V0H6V2H12V0H14V2H16C17.1046 2 18 2.89543 18 4V18C18 19.1046 17.1046 20 16 20ZM2 8V18H16V8H2ZM2 4V6H16V4H2ZM14 16H12V14H14V16ZM10 16H8V14H10V16ZM6 16H4V14H6V16ZM14 12H12V10H14V12ZM10 12H8V10H10V12ZM6 12H4V10H6V12Z" fill="#7B838A" />
																	</svg>
																</span>
															</bdi>
															{errorContainer(runform, "DOB")}
														</div>
														<div className="col-lg-6 col-md-12 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Email Address</label>
															<bdi className="d-block position-relative">
																<input type="email" className="form-control comn-input-style" placeholder="Enter Your Email" name="email" {...formAttr(runform, "email")} />
																<span className="comn-left-input-icon">
																	<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M18 16H2C0.89543 16 0 15.1046 0 14V1.913C0.0466084 0.842548 0.928533 -0.00101238 2 9.11911e-07H18C19.1046 9.11911e-07 20 0.895432 20 2V14C20 15.1046 19.1046 16 18 16ZM2 3.868V14H18V3.868L10 9.2L2 3.868ZM2.8 2L10 6.8L17.2 2H2.8Z" fill="#7B838A" />
																	</svg>
																</span>
															</bdi>
															{errorContainer(runform, "email")}
														</div>
														<div className="col-lg-6 col-md-12 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Phone Number</label>
															<bdi className="d-block position-relative">
																<PhoneInput inputExtraProps={{ inputClass: "form-control input-style", required: true, autoFocus: true }} country={country} onChange={PhonehandleOnChange} />
															</bdi>
															{errorContainer(runform, "contact_no")}
														</div>
														<div className="col-lg-6 col-md-12 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Password</label>
															<bdi className="d-block position-relative">
																<input type={showPassword} name="password" className="form-control comn-input-style pe-5" placeholder="Enter Your Password" {...formAttr(runform, "password")} />
																<span className="comn-left-input-icon">
																	<svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M14 7H13V5C13 2.24 10.76 0 8 0C5.24 0 3 2.24 3 5V7H2C0.9 7 0 7.9 0 9V19C0 20.1 0.9 21 2 21H14C15.1 21 16 20.1 16 19V9C16 7.9 15.1 7 14 7ZM5 5C5 3.34 6.34 2 8 2C9.66 2 11 3.34 11 5V7H5V5ZM14 19H2V9H14V19ZM8 16C9.1 16 10 15.1 10 14C10 12.9 9.1 12 8 12C6.9 12 6 12.9 6 14C6 15.1 6.9 16 8 16Z" fill="#7B838A" />
																	</svg>
																</span>
																<span id="eye-pwd" className="eye-pwd" onClick={() => setshowPassword(showPassword === "password" ? "text" : "password")}>
																	{showPassword === "text" ? (
																		<svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
																			<path d="M10 14.3448C8.35987 14.3653 6.7367 14.0113 5.254 13.3098C4.10469 12.7491 3.07265 11.9746 2.213 11.0278C1.30243 10.0489 0.585467 8.90649 0.1 7.66083L0 7.34483L0.105 7.02883C0.590815 5.78426 1.30624 4.6421 2.214 3.66183C3.07334 2.71514 4.10504 1.94069 5.254 1.37983C6.73671 0.678416 8.35988 0.324439 10 0.344828C11.6401 0.324474 13.2633 0.678449 14.746 1.37983C15.8953 1.94056 16.9274 2.71502 17.787 3.66183C18.6993 4.63938 19.4165 5.78219 19.9 7.02883L20 7.34483L19.895 7.66083C18.3262 11.7446 14.3742 14.4142 10 14.3448ZM10 2.34483C6.59587 2.23816 3.47142 4.21992 2.117 7.34483C3.4712 10.4699 6.59579 12.4518 10 12.3448C13.4041 12.4512 16.5284 10.4695 17.883 7.34483C16.5304 4.21841 13.4047 2.23591 10 2.34483ZM10 10.3448C8.55733 10.3544 7.30937 9.34219 7.02097 7.9286C6.73256 6.51501 7.48427 5.09485 8.81538 4.53849C10.1465 3.98213 11.6852 4.44496 12.4885 5.64333C13.2919 6.84171 13.1354 8.44091 12.115 9.46083C11.5563 10.0261 10.7948 10.3444 10 10.3448Z" fill="#495567" />
																		</svg>
																	) : (
																		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																			<path d="M19.97 21.385L16.614 18.029C15.1661 18.6882 13.5908 19.0204 12 19.002C10.3599 19.0224 8.73671 18.6684 7.254 17.967C6.10468 17.4063 5.07264 16.6318 4.213 15.685C3.30049 14.7069 2.5833 13.5634 2.1 12.316L2 12.002L2.105 11.686C2.82781 9.84231 4.04426 8.23318 5.621 7.03501L3 4.41401L4.413 3.00201L21.382 19.971L19.972 21.385H19.97ZM7.036 8.45101C5.75792 9.34693 4.74865 10.5747 4.117 12.002C5.47142 15.1269 8.59587 17.1087 12 17.002C13.0498 17.0106 14.0936 16.8416 15.087 16.502L13.287 14.702C12.8863 14.8984 12.4462 15.001 12 15.002C10.3475 14.9916 9.01037 13.6546 9 12.002C9.00048 11.5548 9.10309 11.1136 9.3 10.712L7.036 8.45101ZM19.852 15.612L18.46 14.221C19.0456 13.5589 19.5256 12.8105 19.883 12.002C18.5304 8.87559 15.4047 6.89309 12 7.00201C11.753 7.00201 11.505 7.01101 11.265 7.02801L9.5 5.26101C10.3216 5.08525 11.1598 4.99841 12 5.00201C13.6401 4.98166 15.2633 5.33564 16.746 6.03701C17.8953 6.59775 18.9274 7.37221 19.787 8.31901C20.6991 9.29598 21.4163 10.4381 21.9 11.684L22 12.002L21.895 12.318C21.4268 13.5361 20.7342 14.6555 19.853 15.618L19.852 15.612Z" fill="#495567" />
																		</svg>
																	)}
																</span>
															</bdi>
															{errorContainer(runform, "password")}
														</div>
														<div className="col-sm-8 mx-auto my-3 pe-0">
															<button className="comn-btn-class w-100" type="submit">
																SIGN UP
															</button>
														</div>
														<div className="col-12 pe-0">
															<div className="text-center form-btm-link">
																<p>Continue with</p>
																<div className="d-flex align-items-center justify-content-center">
																	<div className="social-comn-box me-2" onClick={handleGoogleLogin}>
																		<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
																			<rect width="40" height="40" rx="20" fill="#F14336" />
																			<g clipPath="url(#clip0_1718_22222)">
																				<path d="M15.4955 21.4111L14.8767 23.7212L12.6149 23.7691C11.9389 22.5154 11.5555 21.081 11.5555 19.5567C11.5555 18.0827 11.914 16.6927 12.5494 15.4688H12.5499L14.5635 15.8379L15.4456 17.8394C15.261 18.3777 15.1604 18.9555 15.1604 19.5567C15.1604 20.2092 15.2786 20.8343 15.4955 21.4111Z" fill="white" />
																				<path d="M29.1781 17.8965C29.2802 18.4342 29.3334 18.9895 29.3334 19.557C29.3334 20.1934 29.2665 20.8142 29.1391 21.413C28.7063 23.4506 27.5757 25.2298 26.0094 26.4889L26.0089 26.4884L23.4727 26.359L23.1137 24.1182C24.153 23.5087 24.9652 22.5549 25.3931 21.413H20.64V17.8965H25.4624H29.1781Z" fill="white" />
																				<path d="M26.0087 26.4885L26.0092 26.489C24.4859 27.7134 22.5508 28.446 20.4444 28.446C17.0593 28.446 14.1162 26.554 12.6148 23.7696L15.4954 21.4116C16.2461 23.415 18.1787 24.8412 20.4444 24.8412C21.4182 24.8412 22.3306 24.5779 23.1135 24.1183L26.0087 26.4885Z" fill="white" />
																				<path d="M26.1182 12.7144L23.2386 15.0719C22.4283 14.5654 21.4705 14.2728 20.4444 14.2728C18.1275 14.2728 16.1587 15.7644 15.4457 17.8396L12.5499 15.4689H12.5494C14.0288 12.6167 17.009 10.668 20.4444 10.668C22.6012 10.668 24.5787 11.4362 26.1182 12.7144Z" fill="white" />
																			</g>
																			<defs>
																				<clipPath id="clip0_1718_22222">
																					<rect width="17.7778" height="17.7778" fill="white" transform="translate(11.5555 10.668)" />
																				</clipPath>
																			</defs>
																		</svg>
																	</div>
																	<div className="social-comn-box me-2" onClick={handleFacebookLogin}>
																		<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
																			<rect width="40" height="40" rx="20" fill="#4267B2" />
																			<path d="M22.3778 13.6198H24.0007V10.7932C23.7207 10.7546 22.7578 10.668 21.6363 10.668C19.2963 10.668 17.6933 12.1398 17.6933 14.845V17.3346H15.1111V20.4946H17.6933V28.4457H20.8592V20.4954H23.337L23.7303 17.3354H20.8585V15.1583C20.8592 14.245 21.1052 13.6198 22.3778 13.6198Z" fill="white" />
																		</svg>
																	</div>
																	<div className="social-comn-box">
																		<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
																			<rect width="40" height="40" rx="20" fill="#152A3C" />
																			<path d="M22.1589 13.5169C21.5358 14.2633 20.5388 14.852 19.5418 14.7679C19.4172 13.7587 19.9053 12.6864 20.4765 12.0241C21.0996 11.2567 22.1901 10.71 23.0728 10.668C23.1766 11.7192 22.7716 12.7495 22.1589 13.5169Z" fill="white" />
																			<path d="M23.0624 14.9684C21.6189 14.8843 20.3831 15.7988 19.6976 15.7988C19.0018 15.7988 17.9529 15.0104 16.8105 15.0314C15.3255 15.0525 13.9442 15.904 13.1861 17.2601C11.6283 19.9723 12.7811 23.9881 14.2869 26.1958C15.0243 27.2891 15.907 28.4875 17.0702 28.4455C18.171 28.4034 18.6072 27.7201 19.9365 27.7201C21.2762 27.7201 21.6604 28.4455 22.8236 28.4244C24.0283 28.4034 24.7864 27.3311 25.5237 26.2378C26.3649 24.9973 26.7076 23.7884 26.7284 23.7253C26.7076 23.7043 24.4021 22.8107 24.3814 20.1195C24.3606 17.8698 26.1988 16.7975 26.2819 16.7345C25.2433 15.1786 23.6232 15.0104 23.0624 14.9684Z" fill="white" />
																		</svg>
																	</div>
																</div>
																<div className="mt-4 form-btm-link" onClick={() => navigate("/login")}>
																	<p>
																		Already User?
																		<Link to="/#" className="ms-2 comn-yellow-txt">
																			Sign In
																		</Link>
																	</p>
																</div>
															</div>
														</div>
													</form>
												)}
											</Formik>
										)}
									</div>
								</div>
								<div className="col-md-6 d-md-block d-none position-relative">
									<div className="main-poster">
										<img src={ArchyMan} className="img-fluid archery-img" alt="archery-man" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* ============== Verify Otp modal ================= */}
			{forgotmodalShow && (
				<Modal show={forgotmodalShow} onHide={() => setForgotModalShow(false)} size="md" className="comn-modal-style" aria-labelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton></Modal.Header>
					<Modal.Body className="pt-0">
						<VerifyOtpModal tempObj={tempObj} varifyBycontect={varifyBycontect} varifyByEmail={varifyByEmail} phoneNumber={phoneNumber} newEmail={newEmail} />
					</Modal.Body>
				</Modal>
			)}
		</>
	);
}
