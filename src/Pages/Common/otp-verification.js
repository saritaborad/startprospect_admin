import React, { useState, useContext, useEffect } from "react";
import OtpInput from "react-otp-input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MainLogo from "../../assets/images/main-logo.png";
import ArchyMan from "../../assets/images/Archery-man.png";
import { toast } from "react-toastify";
import { API_Path, LandingPageURL } from "../../Api/Const";
import { FetchPostApi } from "../../Api/apiServices";
import roleContext from "../../contexts/roleContext";

export default function OtpVerification() {
	const [OTP, setOTP] = useState("");
	const location = useLocation();
	const navigate = useNavigate();

	const context = useContext(roleContext);
	const { setsignup_type, setuser_id } = context;

	// useEffect(() => {
	// 	if (location?.state?.email === undefined || location?.state?.contact_no === undefined) {
	// 		window.location.href = `${LandingPageURL}/login`;
	// 	}
	// }, [location?.state?.email, location?.state?.contact_no]);

	const verifyOtp = async (otpdata) => {
		if (location.state.flag) {
			let response = await FetchPostApi(API_Path.forgotPassword, { email: location.state.email, otp: otpdata });
			let result = await response.json();
			if (response.status == 200) {
				toast.success(result.message);
				navigate(`/reset_password`, { state: { email: location.state.email } });
			} else {
				toast.error(result.message);
			}
		} else {
			let data = {};
			if (otpdata.length === 4) {
				data.otp = otpdata;
				if (location?.state?.email) {
					data.email = location.state.email;
				}
				if (location?.state?.contact_no) {
					data.contact_no = location?.state?.contact_no;
				}
				let result = await FetchPostApi(API_Path.signUp, data);
				let verifyotp = await result.json();
				if (result.status === 200) {
					setuser_id(verifyotp.data.user._id);
					localStorage.setItem("strusertoken", "Bearer " + verifyotp.data.token);
					setsignup_type(verifyotp.data.user.signupType);
					toast.success(verifyotp.message);
					navigate("/latest");
				} else {
					toast.error(verifyotp.message);
				}
			} else {
				toast.error("Please Enter Proper OTP");
			}
		}
	};

	const verifyContactOtp = async (otpdata) => {
		if (location.state.flag) {
			let response = await FetchPostApi(API_Path.forgotPassword, { contact_no: location.state.contact_no, otp: otpdata });
			let result = await response.json();
			if (response.status == 200) {
				toast.success(result.message);
				navigate(`/reset_password`, { state: { contact_no: location.state.contact_no } });
			} else {
				toast.error(result.message);
			}
		} else {
			let data = {};
			if (otpdata.length === 4) {
				data.otp = otpdata;
				if (location?.state?.email) {
					data.email = location.state.email;
				}
				if (location?.state?.contact_no) {
					data.contact_no = location?.state?.contact_no;
				}
				let result = await FetchPostApi(API_Path.signUp, data);
				let verifyotp = await result.json();
				if (result.status === 200) {
					setuser_id(verifyotp.data.user._id);
					localStorage.setItem("strusertoken", "Bearer " + verifyotp.data.token);
					setsignup_type(verifyotp.data.user.signupType);
					toast.success(verifyotp.message);
					navigate("/latest");
				} else {
					toast.error(verifyotp.message);
				}
			} else {
				toast.error("Please Enter Proper OTP");
			}
		}
	};

	const resendCode = async (e) => {
		e.preventDefault();
		let emailData = { email: location.state.email, isSend: 1 };
		let contactData = { contact_no: location.state.contact_no, isSend: 1 };
		let response = await FetchPostApi(API_Path.forgotPassword, location.state.email ? emailData : contactData);
		let result = await response.json();
		if (response.status === 200) {
			toast.success(result.message);
		} else {
			toast.error(result.message);
		}
	};

	const onhandleChangeOtp = (otp) => {
		setOTP(otp);
		if (otp.length === 4) {
			if (location.state.email) {
				verifyOtp(otp);
			} else {
				verifyContactOtp(otp);
			}
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
										<form className="row align-items-center signup-as-form-div max-width-class mx-auto">
											<div className="col-12 mb-3">
												<div className="text-start">
													<div className="comn-login-head">
														<h2>Verification</h2>
														<p>
															We sent a confirmation
															{location.state?.email ? " Email " : " Number "}
															at
														</p>
													</div>
												</div>
											</div>
											<div className="col-sm-12 mb-3">
												<span className="d-block custom-email-verify">{location.state?.email ? location.state?.email : location.state?.contact_no}</span>
											</div>
											<div className="col-12 mb-3">
												<p className="mb-2 code-txt-class">Enter Code</p>
												<OtpInput value={OTP} onChange={onhandleChangeOtp} numInputs={4} separator={<span style={{ width: "8px" }}></span>} isInputNum={true} shouldAutoFocus={true} inputStyle={{ border: "1px solid rgb(205 205 205)", borderRadius: "12px", backgroundColor: "#FFFF", width: "50px", height: "50px", fontSize: "16px", color: "#030303", fontWeight: "700", marginRight: "20px" }} containerStyle={{ justifyContent: "start" }} focusStyle={{ border: "1px solid #6A58FB", outline: "none", color: "#030303", boxShadow: "0 0 3px #FFF" }} />
											</div>
											<div className="my-3 text-center rcv-code-text">
												If you didn’t receive a code?
												<button className="form-link-style border-0 p-0 bg-transparent ms-1" onClick={(e) => resendCode(e)}>
													Resend
												</button>
											</div>
											<div className="col-12 mx-auto my-3">
												<button className="comn-btn-class w-100" type="button" onClick={() => verifyOtp()}>
													NEXT
												</button>
											</div>
											<div className="col-12">
												<div className="mt-4 text-center form-btm-link">
													<p>
														Remember Password?
														<Link to="/login" className="ms-2 comn-yellow-txt">
															Sign In
														</Link>
													</p>
												</div>
											</div>
										</form>
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
		</>
	);
}
