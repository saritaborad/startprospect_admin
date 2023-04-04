import React, { useContext, useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import MainLayout1 from "../Components/Layout/MainLayout1";
import OurSponser from "../Pages/Common/OurSponser";
import { FetchPostApi } from "../Api/apiServices.js";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_Path, errorContainer, formAttr, phoneRegExp } from "../Api/Const.js";
import roleContext from "../contexts/roleContext";
import CircleTwo from "../assets/images/circle-2.png";
import Circle from "../assets/images/circle-1.png";
import Email from "../assets/images/email-icon.png";
import Call from "../assets/images/call-icon.png";
import Location from "../assets/images/location-icon.png";

export default function ContactUs() {
	const context = useContext(roleContext);
	const navigate = useNavigate();
	const runform = useRef();

	const [country, setcountry] = useState("");

	useEffect(() => {
		setcountry(context.country);
	}, [context.country]);

	const PhonehandleOnChange = (value) => {
		let temp = "+" + value;
		runform.current.setFieldValue("contact_no", temp);
	};

	const submitContect = async (formdata) => {
		let result = await FetchPostApi(API_Path.contactus, formdata);
		let contactUs = await result.json();
		if (result.status === 200) {
			toast.success(contactUs.message);
			navigate("/latest");
		} else {
			toast.error(contactUs.message);
		}
	};

	return (
		<MainLayout1>
			<section className="row-bg-comn-btm top-diff contact-top-bg">
				<div className="container position-relative">
					<div className="row align-items-center">
						<div className="col-lg-12">
							<div className="text-center">
								<div className="purple-bg-text">
									<h1>Contact Us</h1>
									<span className="d-block mt-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="contact-us-box comn-white-bg">
				<div className="container">
					<div className="row">
						<div className="col-xl-8 mx-auto">
							<div className="row justify-content-center">
							<div className="col-lg-4 col-sm-6 mb-3">
									<div className="cont-box-comn text-center position-relative">
										<div className="circle-1">
											<img src={Circle} alt="circle-bg" />
										</div>
										<div className="circle-2">
											<img src={CircleTwo} alt="circle-bg" />
										</div>
										<div className="h-100">
											<img src={Email} className="mb-3" alt="email-ico" />
											<span>Email us</span>
										</div>
										<div className="box-btm-part mt-auto">
											<bdi className="d-block">hello@motulsoftware.com</bdi>
										</div>
									</div>
								</div>
								<div className="col-lg-4 col-sm-6 mb-3">
									<div className="cont-box-comn text-center position-relative">
										<div className="circle-1">
											<img src={Circle} alt="circle-bg" />
										</div>
										<div className="circle-2">
											<img src={CircleTwo} alt="circle-bg" />
										</div>
										<div className="h-100">
											<img src={Call} className="mb-3" alt="call-ico" />
											<span>Call us</span>
										</div>
										<div className="box-btm-part mt-auto">
											<bdi className="d-block">+1 (646) 786-5060</bdi>
										</div>
									</div>
								</div>
								<div className="col-lg-4 col-sm-6 mb-3">
									<div className="cont-box-comn text-center position-relative">
										<div className="circle-1">
											<img src={Circle} alt="circle-bg" />
										</div>
										<div className="circle-2">
											<img src={CircleTwo} alt="circle-bg" />
										</div>
										<div className="h-100">
											<img src={Location} className="mb-3" alt="location-ico" />
											<span>Address</span>
										</div>
										<div className="box-btm-part mt-auto">
											<bdi className="d-block">25511 Budde Road - Suite 1602, The Woodlands, Texas, 77380</bdi>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="row-inr-space-class position-relative comn-white-bg">
				<div className="container mt-md-5 mt-2">
					<Formik
						innerRef={runform}
						enableReinitialize
						initialValues={{
							first_name: "",
							last_name: "",
							email: "",
							contact_no: "",
							message: "",
						}}
						validationSchema={Yup.object({
							email: Yup.string().email().required("Email is required."),
							first_name: Yup.string().required("first name is required."),
							message: Yup.string().required("message is required."),
							last_name: Yup.string().required("last name is required."),
							contact_no: Yup.string().matches(phoneRegExp, "Phone number is not valid").required("Phone number is required."),
						})}
						onSubmit={(formData, { resetForm }) => submitContect(formData, resetForm)}
					>
						{(runform) => (
							<form className="row" onSubmit={runform.handleSubmit}>
								<div className="col-lg-9 mx-auto">
									<div className="contact-form-box">
										<div className="row me-0">
											<div className="col-12 mb-sm-5 mb-3 pe-0">
												<h4 className="contact-us-title">Contact Us Now</h4>
											</div>
											<div className="col-md-6 mb-3 pe-0">
												<label className="comn-label-class">First Name</label>
												<bdi className="d-block position-relative">
													<input type="text" name="first_name" className="form-control comn-input-style ps-3" placeholder="Enter Your First" {...formAttr(runform, "first_name")} />
												</bdi>
												{errorContainer(runform, "first_name")}
											</div>
											<div className="col-md-6 mb-3 pe-0">
												<label className="comn-label-class">Last Name</label>
												<bdi className="d-block position-relative">
													<input type="text" name="last_name" className="form-control comn-input-style ps-3" placeholder="Enter Your Last" {...formAttr(runform, "last_name")} />
												</bdi>
												{errorContainer(runform, "last_name")}
											</div>
											<div className="col-md-6 mb-3 pe-0">
												<label className="comn-label-class">Email Address</label>
												<bdi className="d-block position-relative">
													<input type="email" name="email" className="form-control comn-input-style ps-3" placeholder="Enter Email Address" {...formAttr(runform, "email")} />
												</bdi>
												{errorContainer(runform, "email")}
											</div>
											<div className="col-md-6 mb-3 pe-0 cust-contact-class">
												<label className="comn-label-class">Mobile Number</label>
												<bdi className="d-block position-relative">
													<PhoneInput
														inputExtraProps={{
															inputClass: "",
															required: true,
															autoFocus: true,
														}}
														country={country}
														onChange={PhonehandleOnChange}
													/>
												</bdi>
												{errorContainer(runform, "contact_no")}
											</div>
											<div className="col-12 mb-3 pe-0">
												<label className="comn-label-class">Message</label>
												<bdi className="d-block position-relative">
													<textarea type="text" name="message" rows={3} className="form-control comn-input-style ps-3 h-100" placeholder="Your message" {...formAttr(runform, "message")} />
												</bdi>
												{errorContainer(runform, "message")}
											</div>
											<div className="col-12 mt-3 pe-0">
												<div className="row justify-content-center">
													<div className="col-md-3">
														<button className="comn-btn-class" type="submit ">
															SEND
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</form>
						)}
					</Formik>
				</div>
			</section>
			<section className="row-inr-space-class position-relative comn-white-bg">
				<OurSponser />
			</section>
		</MainLayout1>
	);
}
