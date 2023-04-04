import React, { useState, useEffect, useContext, createRef } from "react";
import MainLayout from "../Components/Layout/MainLayout";
import { Link } from "react-router-dom";
import ProfileLayout from "../Components/ProfileLayout/MainProfileLayout";
import { Modal } from "react-bootstrap";
import ProCam from "../assets/images/Profile-cam-icon.svg";
import Fb from "../assets/images/Facebook-icon.png";
import Insta from "../assets/images/instagram-icon.png";
import Twitter from "../assets/images/Twitter-icon.png";
import Linkedin from "../assets/images/linkedin_icon.png";
import Gmail from "../assets/images/gmail_icon.png";
import roleContext from "../contexts/roleContext";
import { Formik } from "formik"
import * as Yup from "yup"
import { API_Path, errorContainer, formAttr } from "../Api/Const";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ImagePostApi, FetchPostApi } from "../Api/apiServices";
import { toast } from "react-toastify";

export default function FanProfile() {
	const context = useContext(roleContext);
	const runform = createRef();

	const [fanprofile, setFanProfile] = useState({})
	const [user_id, setUser_id] = useState('')
	const [country, setcountry] = useState("");
	const [forgotmodalShow, setForgotModalShow] = useState(false);
	const [sharemodalShow, setShareModalShow] = useState(false);

	useEffect(() => {
		setcountry(context.country);
		setFanProfile(context.profiledata);
		setUser_id(context.user_id);
	}, [context.country, context.profiledata, context.user_id]);

	const PhonehandleOnChange = (value) => {
		let temp = "+" + value;
		runform.current.setFieldValue("contact_no", temp);
	};

	const profileimgupdate = async (e) => {
		if (e.target.files[0]) {
			let formData = new FormData();
			formData.append("images", e.target.files[0]);
			let result = await ImagePostApi(API_Path.addImage, formData);
			let getImage = await result.json();
			if (result.status === 200) {
				setFanProfile({ ...fanprofile, profile_img: getImage.data.img[0] })
			} else {
				toast.error(getImage.message);
			}
		}
	};

	const handleProfileSubmit = async (formData) => {
		let result = await FetchPostApi(API_Path.editProfile, { ...formData, profile_img: fanprofile.profile_img });
		let editUserData = await result.json();
		if (result.status === 200) {
			context.getFanProfile(user_id);
			toast.success(editUserData.message);
		} else {
			toast.error(editUserData.message);
		}
	}

	return (
		<>
			<MainLayout>
				<section className="gray-bg-section">
					<div className="container">
						<div className="row">
							<div className="col-xl-2 col-md-3">
								<ProfileLayout />
							</div>
							<div className="col-xxl-10 col-md-9">
								<div className="row">
									<div className="col-12">
										<div className="mt-3 mt-md-0 tabs-heading-txt">
											<h5 className="mb-0">Profile</h5>
										</div>
									</div>
									<Formik
										innerRef={runform}
										enableReinitialize={true}
										initialValues={{
											name: fanprofile.name ?? "",
											user_name: fanprofile.user_name ?? "",
											email: fanprofile.email ?? "",
											contact_no: fanprofile.contact_no ? fanprofile.contact_no : "",
											DOB: fanprofile.DOB?.split("/").reverse().join("-") ?? "",
											address: fanprofile.address ?? "",
										}}
										validationSchema={Yup.object({
											name: Yup.string().min(2, "Name should be minimum 2 character").required("Name is required"),
											user_name: Yup.string().min(2, "Username should be minimum 2 character").required("Username is required"),
											email: Yup.string().email("Enter a valid Email Address").required("Email is required"),
											contact_no: Yup.string().required("Phone number is required"),
											DOB: Yup.string().required("DOB is required."),
											address: Yup.string().min(2, "Address should be minimum 2 character").required("Address  is required"),
										})}
										onSubmit={(formData) => { handleProfileSubmit(formData) }}>
										{(runform) => (
											<form className="col-12 mt-3" onSubmit={runform.handleSubmit}>
												<div className="team-info-main p-3">
													<div className="d-md-block d-flex justify-content-center mb-3">
														<div className="student-profile-img position-relative">
															<img src={fanprofile.profile_img ?? "../assets/images/defaultProPic.png"} className="img-fluid" alt="profile" />
															<div className="stud-pro-cam">
																<label htmlFor="upload-img">
																	<input type="file" id="upload-img" name="upload-img" hidden onChange={(e) => profileimgupdate(e)} />
																	<img src={ProCam} alt="upload-pro" />
																</label>
															</div>
														</div>
													</div>
													<div className="row align-items-center me-0">
														<div className="col-lg-6 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Name</label>
															<bdi className="d-block position-relative">
																<input type="text" name="name" className="form-control comn-input-style ps-3" placeholder="Enter Your Name" {...formAttr(runform, "name")} />
																{errorContainer(runform, "name")}
															</bdi>
														</div>
														<div className="col-lg-6 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Username</label>
															<bdi className="d-block position-relative">
																<input type="text" name="user_name" className="form-control comn-input-style ps-3" placeholder="Enter Your Username" {...formAttr(runform, "user_name")} />
																{errorContainer(runform, "user_name")}
															</bdi>
														</div>
														<div className="col-lg-6 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Email Address</label>
															<bdi className="d-block position-relative">
																<input type="email" name="email" className="form-control comn-input-style ps-3" placeholder="Enter Your Email" {...formAttr(runform, "email")} />
																{errorContainer(runform, "email")}
															</bdi>
														</div>
														<div className="col-lg-6 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Phone Number</label>
															<bdi className="d-block position-relative">
																<PhoneInput inputExtraProps={{ inputClass: "form-control input-style", required: true, autoFocus: true }} value={fanprofile.contact_no} country={country} onChange={PhonehandleOnChange} />
															</bdi>
														</div>
														<div className="col-lg-6 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Date Of Birth</label>
															<bdi className="d-block position-relative">
																<input type="date" name="DOB" className="form-control comn-input-style ps-3" {...formAttr(runform, "DOB")} />
																{errorContainer(runform, "DOB")}
															</bdi>
														</div>
														<div className="col-lg-6 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Address</label>
															<bdi className="d-block position-relative">
																<input type="text" name="address" className="form-control comn-input-style ps-3" placeholder="Enter Address" {...formAttr(runform, "address")} />
																{errorContainer(runform, "address")}
															</bdi>
														</div>
														<div className="col-xxl-3 col-xl-4 col-md-6 mt-3 mx-md-0 mx-sm-auto">
															<button className="comn-btn-class" type="submit">
																Save
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
				</section>
			</MainLayout>

			{/* forgot password modal */}
			{/* {forgotmodalShow && (
				<Modal show={forgotmodalShow} onHide={() => setForgotModalShow(false)} size="md" className="comn-modal-style" aria-labelledby="contained-modal-title-vcenter" centered>
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
			)} */}

			{/* forgot password modal */}
			{/* {forgotmodalShow && (
				<Modal show={forgotmodalShow} onHide={() => setForgotModalShow(false)} size="md" className="comn-modal-style" aria-labelledby="contained-modal-title-vcenter" centered>
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
			)} */}

			{/* ================ Share Modal ================== */}
			{/* {sharemodalShow && (
				<Modal show={sharemodalShow} onHide={() => setShareModalShow(false)} size="md" className="comn-modal-style" aria-labelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton className="pb-0"></Modal.Header>
					<Modal.Body className="pt-0 share-data-modal like-modal-body">
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
													<Link to="/">
														<img src={Fb} alt="fb-ico" />
													</Link>
												</span>
											</li>
											<li>
												<span>
													<Link to="/">
														<img src={Insta} alt="insta-ico" />
													</Link>
												</span>
											</li>
											<li>
												<span>
													<Link to="/">
														<img src={Twitter} alt="twitter-ico" />
													</Link>
												</span>
											</li>
											<li>
												<span>
													<Link to="/">
														<img src={Linkedin} alt="linkedin-ico" />
													</Link>
												</span>
											</li>
											<li>
												<span>
													<Link to="#">
														<img src={Gmail} alt="gmail-ico" />
													</Link>
												</span>
											</li>
										</ul>
									</div>
									<div className="row">
										<div className="col-sm-4 mt-3 mx-auto">
											<button className="comn-btn-class mt-3" onClick={() => setShareModalShow(true)}>
												SEND
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Modal.Body>
				</Modal>
			)} */}
		</>
	);
}
