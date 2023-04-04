import React, { createRef, useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { FetchPostApi } from "../../Api/apiServices";
import { API_Path, errorContainer, formAttr, phoneRegExp } from "../../Api/Const";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import MainLogo from "../../assets/images/main-logo.png";
import ArchyMan from "../../assets/images/Archery-man.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import roleContext from "../../contexts/roleContext";

export default function Login() {

	const context = useContext(roleContext);
	const { facebookLogin, googleLogin, appleLogin, setuser_id, setsignup_type, setprofiledata } = context;
	const navigate = useNavigate();
	const runform = createRef();

	const [flag, setFlag] = useState(false);
	const [loginShow, setLoginShow] = useState(true);
	const [forgotmodalShow, setForgotModalShow] = useState(false);
	const [flag1, setFlag1] = useState({ email: true, contact: false });
	const [showPassword, setshowPassword] = useState("password");

	useEffect(() => {
		if (localStorage.getItem("strusertoken")) {
			navigate("/latest");
		} else {
			navigate("/login");
		}
	}, []);

	const loginSubmit = async (formData, reset) => {
		let data = { email: formData?.email, password: formData?.password, fcm_token: "" }
		let result = await FetchPostApi(API_Path.loginByEmail, data);
		let LoginData = await result.json();
		if (result.status === 200) {
			localStorage.setItem("strusertoken", "Bearer " + LoginData.data.token);
			setuser_id(LoginData.data.user._id);
			setsignup_type(LoginData.data.user.signupType);
			toast.success(LoginData.message);
			reset(formData);
			navigate("/latest", { state: { userData: LoginData.data.user } });
		} else {
			toast.error(LoginData.message);
		}
	};

	const PhonehandleOnChange = (value) => {
		let temp = "+" + value;
		runform.current.setFieldValue("contact_no", temp);
	};

	const handleGoogleLogin = async () => {
		googleLogin().then(async ({ _tokenResponse, user }) => {
			try {
				let data = { idToken: _tokenResponse?.idToken, social_type: "google", exist: 1, web: true };
				let result = await FetchPostApi(API_Path.socialMediaLogin, data);
				let res = await result.json();
				if (res.success === true) {
					toast.success(res.message);
					setuser_id(res.data.user._id);
					setsignup_type(res.data.user.signupType);
					localStorage.setItem("strusertoken", "Bearer " + res.data.token);
					navigate("/latest");
				}
			} catch (error) {
				console.log(error);
			}
		});
	};

	const handleFacebookLogin = async () => {
		facebookLogin().then(async ({ _tokenResponse, user }) => {
			try {
				let data = { idToken: _tokenResponse?.idToken, social_type: "facebook", exist: 1, web: true };
				let result = await FetchPostApi(API_Path.socialMediaLogin, data);
				let res = await result.json();
				if (res.success === true) {
					localStorage.setItem("strusertoken", "Bearer " + res.data.token);
					toast.success("Login successfully!");
					setprofiledata(res.data.user);
					navigate("/latest");
				}
			} catch (error) {
				console.log(error);
			}
		});
	};

	const handleAppleLogin = async () => {
		appleLogin().then(async ({ _tokenResponse, user }) => {
			try {
				let data = { idToken: _tokenResponse?.idToken, social_type: "apple", exist: 1, web: true };
				let result = await FetchPostApi(API_Path.socialMediaLogin, data);
				let res = await result.json();
				if (res.success === true) {
					localStorage.setItem("strusertoken", "Bearer " + res.data.token);
					setprofiledata(res.data.user);
					toast.success("Login successfully!");
					navigate("/latest");
				}
			} catch (error) {
				console.log(error);
			}
		});
	};

	const submitFormData = async (formData, resetForm) => {
		let response = await FetchPostApi(API_Path.forgotPassword, formData);
		let result = await response.json();
		if (response.status === 200) {
			resetForm(formData);
			toast.success(result.message);
			navigate(`/otpverification`, { state: { email: formData.email, flag: 1 } });
		} else {
			toast.error(result.message);
		}
	};

	const submitFormForgotpassword = async (formData, resetForm) => {
		let response = await FetchPostApi(API_Path.forgotPassword, formData);
		let result = await response.json();
		if (response.status === 200) {
			resetForm(formData);
			toast.success(result.message);
			navigate(`/otpverification`, { state: { contact_no: formData.contact_no, flag: 1 } });
		} else {
			toast.error(result.message);
		}
	};

	const handleForgot = () => {
		setLoginShow(!loginShow);
		setForgotModalShow(!forgotmodalShow);
	}

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
										{(loginShow && !flag) && (
											<Formik
												enableReinitialize
												initialValues={{
													web: "true",
													email: "",
													password: "",
												}}
												validationSchema={Yup.object({
													email: Yup.string().email().required("Email is required."),
													password: Yup.string().required("Please Enter your password"),
												})}
												onSubmit={(formData, { resetForm }) => loginSubmit(formData, resetForm)}
											>
												{(runform) => (
													<form className="row align-items-center max-width-class mx-auto py-5" onSubmit={runform.handleSubmit}>
														<div className="col-12 mb-3">
															<div className="text-start">
																<div className="comn-login-head">
																	<h2>Welcome Back!</h2>
																	<p>
																		Enter your&nbsp;
																		<span className="pointer text-colour" onClick={() => setFlag(!flag)}>
																			Email or Contact Number&nbsp;
																		</span>
																		and password to login account.
																	</p>
																</div>
															</div>
														</div>
														<div className="col-12 mb-3">
															<label className="comn-label-class">Email Address</label>
															<bdi className="d-block position-relative">
																<input type="email" name="email" className="form-control comn-input-style" placeholder="johndeo@gmail.com" {...formAttr(runform, "email")} />
																<span className="comn-left-input-icon ">
																	<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M18 16H2C0.89543 16 0 15.1046 0 14V1.913C0.0466084 0.842548 0.928533 -0.00101238 2 9.11911e-07H18C19.1046 9.11911e-07 20 0.895432 20 2V14C20 15.1046 19.1046 16 18 16ZM2 3.868V14H18V3.868L10 9.2L2 3.868ZM2.8 2L10 6.8L17.2 2H2.8Z" fill="#7B838A" />
																	</svg>
																</span>
															</bdi>
															{errorContainer(runform, "email")}
														</div>
														<div className="col-12 mb-3">
															<label className="comn-label-class">Password</label>
															<bdi className="d-block position-relative">
																<input type={showPassword} id="password" className="form-control comn-input-style pe-5" placeholder="Enter Your Password" {...formAttr(runform, "password")} />
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
														<div className="col-6 mb-3">
															<label className="cust-chk-bx">
																<input type="checkbox" id="remember-me" name="remember-me" />
																<span className="cust-chkmark"></span>
																Remember me
															</label>
														</div>
														<div className="col-6 mb-3 text-end">
															<button type="button" className="btn forgot-pwd" onClick={() => handleForgot()}>
																Forgot password?
															</button>
														</div>
														<div className="col-12 mb-3">
															<button className="comn-btn-class w-100" type="submit">
																SIGN IN
															</button>
														</div>
														<div className="col-12">
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
																	<div className="social-comn-box" onClick={handleAppleLogin}>
																		<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
																			<rect width="40" height="40" rx="20" fill="#152A3C" />
																			<path d="M22.1589 13.5169C21.5358 14.2633 20.5388 14.852 19.5418 14.7679C19.4172 13.7587 19.9053 12.6864 20.4765 12.0241C21.0996 11.2567 22.1901 10.71 23.0728 10.668C23.1766 11.7192 22.7716 12.7495 22.1589 13.5169Z" fill="white" />
																			<path d="M23.0624 14.9684C21.6189 14.8843 20.3831 15.7988 19.6976 15.7988C19.0018 15.7988 17.9529 15.0104 16.8105 15.0314C15.3255 15.0525 13.9442 15.904 13.1861 17.2601C11.6283 19.9723 12.7811 23.9881 14.2869 26.1958C15.0243 27.2891 15.907 28.4875 17.0702 28.4455C18.171 28.4034 18.6072 27.7201 19.9365 27.7201C21.2762 27.7201 21.6604 28.4455 22.8236 28.4244C24.0283 28.4034 24.7864 27.3311 25.5237 26.2378C26.3649 24.9973 26.7076 23.7884 26.7284 23.7253C26.7076 23.7043 24.4021 22.8107 24.3814 20.1195C24.3606 17.8698 26.1988 16.7975 26.2819 16.7345C25.2433 15.1786 23.6232 15.0104 23.0624 14.9684Z" fill="white" />
																		</svg>
																	</div>
																</div>
																<div className="mt-4 form-btm-link" onClick={() => navigate("/signupas")}>
																	<p>
																		New User?
																		<span className="ms-2 comn-yellow-txt">Create Account</span>
																	</p>
																</div>
															</div>
														</div>
													</form>
												)}
											</Formik>
										)}
										{(loginShow && flag) && (
											<Formik
												innerRef={runform}
												enableReinitialize
												initialValues={{
													web: "true",
													contact_no: "",
													password: "",
												}}
												validationSchema={Yup.object({
													contact_no: Yup.string().matches(phoneRegExp, "Phone number is not valid").required("Phone number is required."),
													password: Yup.string().required("Please Enter your password"),
												})}
												onSubmit={(formData, { resetForm }) => loginSubmit(formData, resetForm)}
											>
												{(runform) => (
													<form className="row align-items-center max-width-class mx-auto py-5" onSubmit={runform.handleSubmit}>
														<div className="col-12 mb-3">
															<div className="text-start">
																<div className="comn-login-head">
																	<h2>Welcome Back!</h2>
																	<p>
																		Enter your&nbsp;
																		<span className="pointer text-colour" onClick={() => setFlag(!flag)}>
																			Email or Contact Number&nbsp;
																		</span>
																		and password to login account.
																	</p>
																</div>
															</div>
														</div>
														<div className="col-12 mb-3 cust-contact-class">
															<label className="comn-label-class">Mobile Number</label>
															<bdi className="d-block position-relative">
																<PhoneInput inputExtraProps={{ inputClass: "form-control comn-input-style", required: true, autoFocus: true }} country={"us"} onChange={PhonehandleOnChange} />
															</bdi>
															{errorContainer(runform, "contact_no")}
														</div>
														<div className="col-12 mb-3">
															<label className="comn-label-class">Password</label>
															<bdi className="d-block position-relative">
																<input type={showPassword} id="password" className="form-control comn-input-style pe-5" placeholder="Enter Your Password" {...formAttr(runform, "password")} />
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
														<div className="col-sm-6 mb-3">
															<label className="cust-chk-bx">
																<input type="checkbox" id="remember-me" name="remember-me" />
																<span className="cust-chkmark"></span>
																Remember me
															</label>
														</div>
														<div className="col-sm-6 mb-3 text-sm-end">
															<button type="button" className="btn forgot-pwd" onClick={() => handleForgot()}>
																Forgot password?
															</button>
														</div>
														<div className="col-12 mb-3">
															<button className="comn-btn-class w-100" type="submit">
																SIGN IN
															</button>
														</div>
														<div className="col-12">
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
																<div className="mt-4 form-btm-link" onClick={() => navigate("/signupas")}>
																	<p>
																		New User?
																		<span className="ms-2 comn-yellow-txt">Create Account</span>
																	</p>
																</div>
															</div>
														</div>
													</form>
												)}
											</Formik>
										)}
										{forgotmodalShow && (
											<div className="row align-items-center max-width-class mx-auto py-5">

												<div className="text-center login-text-top pb-2">
													<h1 style={{ color: "#333333" }}>Forgot Password?</h1>
													<p>
														Please enter your&nbsp;
														<span className="pointer text-colour" onClick={() => setFlag1({ email: true, contact: false })}>
															Email
														</span>
														&nbsp;or&nbsp;
														<span className="pointer text-colour" onClick={() => setFlag1({ email: false, contact: true })}>
															Contact Number&nbsp;
														</span>
														to recieve a verification code.
													</p>
												</div>
												{flag1.email && (
													<Formik
														enableReinitialize
														initialValues={{
															email: "",
															isSend: 1,
														}}
														validationSchema={Yup.object({
															email: Yup.string().email("Enter valid Email address.").required("Email is required."),
														})}
														onSubmit={(formData, { resetForm }) => submitFormData(formData, resetForm)}
													>
														{(runform) => (
															<form className="row" onSubmit={runform.handleSubmit}>
																<div className="col-12 mb-3">
																	<label className="comn-label-class">Email Address</label>
																	<bdi className="d-block position-relative">
																		<input type="email" name="email" className="form-control comn-input-style" placeholder="johndeo@gmail.com" {...formAttr(runform, "email")} />
																		<span className="comn-left-input-icon ">
																			<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
																				<path d="M18 16H2C0.89543 16 0 15.1046 0 14V1.913C0.0466084 0.842548 0.928533 -0.00101238 2 9.11911e-07H18C19.1046 9.11911e-07 20 0.895432 20 2V14C20 15.1046 19.1046 16 18 16ZM2 3.868V14H18V3.868L10 9.2L2 3.868ZM2.8 2L10 6.8L17.2 2H2.8Z" fill="#7B838A" />
																			</svg>
																		</span>
																	</bdi>
																	{errorContainer(runform, "email")}
																</div>
																<div className="col-12 mb-3">
																	<button className="comn-btn-class w-100" type="submit">
																		SEND
																	</button>
																</div>
															</form>
														)}
													</Formik>
												)}
												{flag1.contact && (
													<Formik
														innerRef={runform}
														enableReinitialize
														initialValues={{
															contact_no: "",
															isSend: 1,
														}}
														validationSchema={Yup.object({
															contact_no: Yup.string().matches(phoneRegExp, "Phone number is not valid").required("Phone number is required."),
														})}
														onSubmit={(formData, { resetForm }) => submitFormForgotpassword(formData, resetForm)}
													>
														{(runform) => (
															<form className="row" onSubmit={runform.handleSubmit}>
																<div className="col-12 mb-3">
																	<label className="comn-label-class">Contact Number</label>
																	<bdi className="d-block position-relative">
																		<PhoneInput inputExtraProps={{ inputClass: "form-control input-style", required: true, autoFocus: true }} country={"us"} onChange={PhonehandleOnChange} />
																	</bdi>
																	{errorContainer(runform, "contact_no")}
																</div>
																<div className="col-12 mb-3">
																	<button className="comn-btn-class w-100" type="submit">
																		SEND
																	</button>
																</div>
															</form>
														)}
													</Formik>
												)}
											</div>)}
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
			{/* ============== forgot password modal ================= */}
			{/* {forgotmodalShow && (
				<Modal show={forgotmodalShow} onHide={() => setForgotModalShow(false)} size="md" className="comn-modal-style" aria-labelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton></Modal.Header>
					<Modal.Body className="pt-0">
						<div className="m-auto login-main-box user-sign-form white-bx-info">
							<div className="w-100 text-center mb-4"></div>
							<div className="text-center login-text-top pb-2">
								<h1 style={{ color: "#333333" }}>Forgot Password?</h1>
								<p>
									Please enter your&nbsp;
									<span className="pointer text-colour" onClick={() => setFlag1({ email: true, contact: false })}>
										Email
									</span>
									&nbsp;or&nbsp;
									<span className="pointer text-colour" onClick={() => setFlag1({ email: false, contact: true })}>
										Contact Number&nbsp;
									</span>
									to recieve a verification code.
								</p>
							</div>
							{flag1.email && (
								<Formik
									enableReinitialize
									initialValues={{
										email: "",
										isSend: 1,
									}}
									validationSchema={Yup.object({
										email: Yup.string().email("Enter valid Email address.").required("Email is required."),
									})}
									onSubmit={(formData, { resetForm }) => submitFormData(formData, resetForm)}
								>
									{(runform) => (
										<form className="row" onSubmit={runform.handleSubmit}>
											<div className="col-12 mb-3">
												<label className="comn-label-class">Email Address</label>
												<bdi className="d-block position-relative">
													<input type="email" name="email" className="form-control comn-input-style" placeholder="johndeo@gmail.com" {...formAttr(runform, "email")} />
													<span className="comn-left-input-icon ">
														<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M18 16H2C0.89543 16 0 15.1046 0 14V1.913C0.0466084 0.842548 0.928533 -0.00101238 2 9.11911e-07H18C19.1046 9.11911e-07 20 0.895432 20 2V14C20 15.1046 19.1046 16 18 16ZM2 3.868V14H18V3.868L10 9.2L2 3.868ZM2.8 2L10 6.8L17.2 2H2.8Z" fill="#7B838A" />
														</svg>
													</span>
												</bdi>
												{errorContainer(runform, "email")}
											</div>
											<div className="col-12 mb-3">
												<button className="comn-btn-class w-100" type="submit">
													SEND
												</button>
											</div>
										</form>
									)}
								</Formik>
							)}
							{flag1.contact && (
								<Formik
									innerRef={runform}
									enableReinitialize
									initialValues={{
										contact_no: "",
										isSend: 1,
									}}
									validationSchema={Yup.object({
										contact_no: Yup.string().matches(phoneRegExp, "Phone number is not valid").required("Phone number is required."),
									})}
									onSubmit={(formData, { resetForm }) => submitFormForgotpassword(formData, resetForm)}
								>
									{(runform) => (
										<form className="row" onSubmit={runform.handleSubmit}>
											<div className="col-12 mb-3">
												<label className="comn-label-class">Contact Number</label>
												<bdi className="d-block position-relative">
													<PhoneInput inputExtraProps={{ inputClass: "form-control input-style", required: true, autoFocus: true }} country={"us"} onChange={PhonehandleOnChange} />
												</bdi>
												{errorContainer(runform, "contact_no")}
											</div>
											<div className="col-12 mb-3">
												<button className="comn-btn-class w-100" type="submit">
													SEND
												</button>
											</div>
										</form>
									)}
								</Formik>
							)}
						</div>
					</Modal.Body>
				</Modal>
			)} */}
		</>
	);
}
