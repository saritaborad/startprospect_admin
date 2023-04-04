import React, { useState } from "react";
import MainLayout from "../Components/Layout/MainLayout";
import ProfileLayout from "../Components/ProfileLayout/MainProfileLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import { FetchPostApi } from "../Api/apiServices";
import { API_Path, errorContainer, formAttr } from "../Api/Const";
import { toast } from "react-toastify";
import EyeOpen from "../assets/images/eye-open.svg";
import EyeClose from "../assets/images/eye-close.svg";

export default function ChangePassword() {
	const [showPassword, setshowPassword] = useState("password");
	const [IconPassword, setIconPassword] = useState(false);
	const [showPassword2, setshowPassword2] = useState("password");
	const [IconPassword2, setIconPassword2] = useState(false);
	const [showPassword0, setshowPassword0] = useState("password");
	const [IconPassword0, setIconPassword0] = useState(false);

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

	const showpassword0 = () => {
		if (showPassword0 === "password") {
			setshowPassword0("text");
			setIconPassword0(true);
		} else {
			setshowPassword0("password");
			setIconPassword0(false);
		}
	};

	const submitFormData = async (formData, resetForm) => {
		let result = await FetchPostApi(API_Path.changepassword, { old_password: formData.password0, new_password: formData.password, confirm_password: formData.password2 });
		let res = await result.json();
		if (result.status === 200) {
			toast.success(res.message);
			resetForm();
		} else {
			toast.error(res.message);
		}
	};

	return (
		<MainLayout>
			<section className="gray-bg-section">
				<div className="container">
					<div className="row me-0">
						<div className="col-xl-2 col-md-3 ">
							<ProfileLayout />
						</div>
						<div className="col-xl-10 col-md-9 pe-0">
							<div>
								<div className="mb-3 mt-3 mt-md-0 tabs-heading-txt">
									<h5>Change Password</h5>
								</div>
								<div className="profile-main-class p-3">
									<Formik
										enableReinitialize
										initialValues={{
											password: "",
											password2: "",
											password0: "",
										}}
										validationSchema={Yup.object({
											password: Yup.string()
												.when("password0", {
													is: (val) => (val && val.length > 0 ? true : false),
													then: Yup.string().notOneOf([Yup.ref("password0")], "Password must be different from old password."),
												})
												.required("New Password is required."),
											password2: Yup.string()
												.when("password", {
													is: (val) => (val && val.length > 0 ? true : false),
													then: Yup.string().oneOf([Yup.ref("password")], "Password must match."),
												})
												.required("Confirmation of Password is required."),
											password0: Yup.string().required("Old Password is required."),
										})}
										onSubmit={(formData, { resetForm }) => submitFormData(formData, resetForm)}
									>
										{(runform) => (
											<form className="row me-0" onSubmit={runform.handleSubmit}>
												<div className="col-lg-4 col-md-6  mb-3 pe-0">
													<label className="form-lbl-class mb-2">Old Password</label>
													<bdi className="d-block  password-class">
														<div className="position-relative">
															<input type={showPassword0} className="form-control comn-input-style ps-3 pe-5" {...formAttr(runform, "password0")} name="password0" placeholder="Enter your old password" />
															<span className="eye-pwd bg-transparent" onClick={showpassword0}>
																{IconPassword0 ? <img src={EyeClose} alt="" /> : <img src={EyeOpen} alt="" />}
															</span>
														</div>
													</bdi>
													{errorContainer(runform, "password0")}
												</div>
												<div className="col-lg-4 col-md-6  mb-3 pe-0">
													<label className="form-lbl-class mb-2">New Password</label>
													<bdi className="d-block  password-class">
														<div className="position-relative">
															<input type={showPassword} className="form-control comn-input-style ps-3 pe-5" {...formAttr(runform, "password")} name="password" placeholder="Enter your new password" />
															<span className="eye-pwd bg-transparent" onClick={showpassword}>
																{IconPassword ? <img src={EyeClose} alt="" /> : <img src={EyeOpen} alt="" />}
															</span>
														</div>
													</bdi>
													{errorContainer(runform, "password")}
												</div>
												<div className="col-lg-4 col-md-6  mb-3 pe-0">
													<label className="form-lbl-class mb-2">Confirm New Password</label>
													<bdi className="d-block  password-class">
														<div className="position-relative">
															<input type={showPassword2} className="form-control comn-input-style ps-3 pe-5" {...formAttr(runform, "password2")} name="password2" placeholder="Enter your confirm password" />
															<span className="eye-pwd bg-transparent" onClick={showpassword2}>
																{IconPassword2 ? <img src={EyeClose} alt="" /> : <img src={EyeOpen} alt="" />}
															</span>
														</div>
													</bdi>
													{errorContainer(runform, "password2")}
												</div>
												<div className="col-12 pe-0 py-3 fix-btn-size text-md-start text-center">
													<div className="row me-0">
														<div className="col-xl-3 col-lg-4 col-sm-5 pe-0">
															<button type="submit" className="comn-btn-class mt-3">
																Update Password
															</button>
														</div>
													</div>
												</div>
											</form>
										)}
									</Formik>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</MainLayout>
	);
}
