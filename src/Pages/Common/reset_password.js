import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import EyeOpen from "../../assets/images/eye-open.svg";
import MainLogo from "../../assets/images/main-logo.png";
import ArchyMan from "../../assets/images/Archery-man.png";
import EyeClose from "../../assets/images/eye-close.svg";
import { API_Path, errorContainer, formAttr, LandingPageURL } from "../../Api/Const";
import { FetchPostApi } from "../../Api/apiServices";

export default function ResetPassword() {
	const location = useLocation();
	const navigate = useNavigate();

	const [showPassword, setshowPassword] = useState("password");
	const [IconPassword, setIconPassword] = useState(false);
	const [showPassword2, setshowPassword2] = useState("password");
	const [IconPassword2, setIconPassword2] = useState(false);

	// useEffect(() => {
	// 	if (location?.state?.email === undefined || location?.state?.contact_no === undefined) {
	// 		window.location.href = `${LandingPageURL}/login`;
	// 	}
	// }, [location?.state?.email, location?.state?.contact_no]);

	const showpassword = () => {
		if (showPassword === "password") {
			setshowPassword("text");
			setIconPassword(true);
		} else {
			setshowPassword("password");
			setIconPassword(false);
		}
	};

	const showpassword2 = () => {
		if (showPassword2 === "password") {
			setshowPassword2("text");
			setIconPassword2(true);
		} else {
			setshowPassword2("password");
			setIconPassword2(false);
		}
	};

	const submitFormData = async (formData, resetForm) => {
		let emailData = {
			email: location.state.email,
			password: formData.password,
			confirmPassword: formData.password2,
		};
		let contactData = {
			contact_no: location.state.contact_no,
			password: formData.password,
			confirmPassword: formData.password2,
		};
		let response = await FetchPostApi(API_Path.forgotPassword, location.state.email ? emailData : contactData);
		let result = await response.json();
		if (response.status == 200) {
			resetForm(formData);
			toast.success(result.message);
			navigate("/login");
		} else {
			toast.error(result.message);
		}
	};

	return (
		<>
			<div className="container-fluid login-flow-screen">
				<div className="row align-items-center h-100 position-relative">
					<div className="col-12 p-0">
						<div className="login-box mx-auto">
							<div className="row">
								<div className="col-md-6 ovr-div-class">
									<div>
										<div className="main-logo-box text-center mb-3 mt-5">
											<img src={MainLogo} className="img-fluid" alt="starprospect" />
										</div>
										<Formik
											enableReinitialize
											initialValues={{
												password: "",
												password2: "",
											}}
											validationSchema={Yup.object({
												password: Yup.string().required("New password is required."),
												password2: Yup.string()
													.when("password", {
														is: (val) => (val && val.length > 0 ? true : false),
														then: Yup.string().oneOf([Yup.ref("password")], "Password must match."),
													})
													.required("Confirmation of Password is required."),
											})}
											onSubmit={(formData, { resetForm }) => submitFormData(formData, resetForm)}
										>
											{(runform) => (
												<form className="row align-items-center signup-as-form-div max-width-class mx-auto" onSubmit={runform.handleSubmit}>
													<div className="col-12 mb-3">
														<div className="text-start">
															<div className="comn-login-head">
																<h2>Reset Password</h2>
																<p>Enter and confirm your new password below.</p>
															</div>
														</div>
													</div>
													<div className="col-12 mb-3">
														<label className="form-lbl-class mb-2">New Password</label>
														<bdi className="d-block  password-class">
															<div className="position-relative">
																<input type={showPassword} className="form-control comn-input-style pe-5" {...formAttr(runform, "password")} name="password" placeholder="Enter your new password" />
																<span className="eye-pwd bg-transparent" onClick={showpassword}>
																	{IconPassword ? <img src={EyeClose} alt="eye-close" /> : <img src={EyeOpen} alt="" />}
																</span>
															</div>
														</bdi>
														{errorContainer(runform, "password")}
													</div>
													<div className="col-sm-12 mb-3">
														<label className="form-lbl-class mb-2">Confirm New Password</label>
														<bdi className="d-block  password-class">
															<div className="position-relative">
																<input type={showPassword2} className="form-control comn-input-style pe-5" {...formAttr(runform, "password2")} name="password2" placeholder="Enter your confirm password" />
																<span className="eye-pwd bg-transparent" onClick={showpassword2}>
																	{IconPassword2 ? <img src={EyeClose} alt="eye-open" /> : <img src={EyeOpen} alt="" />}
																</span>
															</div>
														</bdi>
														{errorContainer(runform, "password2")}
													</div>
													<div className="col-12 mt-3 text-center">
														<button type="submit" className="comn-btn-class w-100">
															Reset Password
														</button>
													</div>
												</form>
											)}
										</Formik>
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
