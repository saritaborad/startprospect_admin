import React, { createRef, useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Formik } from "formik";
import * as Yup from "yup";
import roleContext from "../../contexts/roleContext";
import { API_Path, errorContainer, formAttr, phoneRegExp } from "../../Api/Const";
import { FetchPostApi } from "../../Api/apiServices";
import { toast } from "react-toastify";
import moment from "moment";
import { Modal } from "react-bootstrap";
import MainLogo from "../../assets/images/main-logo.png";
import ArchyMan from "../../assets/images/Archery-man.png";
import VerifyOtpModal from "../../Components/AllModals/VerifyOtpModal";

export default function SignupAthletes() {
	const context = useContext(roleContext);
	const { newEmail, phoneNumber, handleGoogleLogin, handleFacebookLogin, social, socialPopUp } = context;
	const navigate = useNavigate();
	const location = useLocation();
	const runform = createRef();

	var yearsago = moment(new Date()).subtract(18, "years").format("YYYY-MM-DD");
	const [value, setvalue] = useState("");
	const [showPassword, setshowPassword] = useState("password");
	const [country, setcountry] = useState("");
	const [socialLoginPopUp, setSocialLoginPopUp] = useState(false);
	const [socialData, setSocialData] = useState("");
	const [tempObj, setTempObj] = useState({});
	const [forgotmodalShow, setForgotModalShow] = useState(false);
	const [sportRecord, setSportRecord] = useState([]);

	useEffect(() => {
		setcountry(context.country);
		setSocialData(social);
		setSocialLoginPopUp(socialPopUp);
	}, [context.country, social, socialPopUp]);

	useEffect(() => {
		getAllSport()
	}, [])

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
			navigate("/otpverification", { state: { contact_no: tempObj.contact_no } });
		} else {
			toast.error(result.data.message);
		}
	};

	const handleOnchange = (val) => {
		let temp = [];
		for (let array of val) {
			temp.push(array.value);
		}
		setvalue(temp);
	};

	const options = [
		{ label: "Basketball", value: "basketball" },
		{ label: "Circket", value: "circket" },
		{ label: "Football", value: "football" },
		{ label: "Rugby", value: "rugby" },
		{ label: "Baseball", value: "baseball" },
		{ label: "Hockey", value: "hockey" },
	];

	const submitAthleteRagister = async (data, resetForm) => {
		if (value !== "" || value !== null || value !== undefined) {
			data.sports = value;
		}
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

	const submitAthleteRagisterBySocial = async (data, resetForm) => {
		if (value !== "" || value !== null || value !== undefined) {
			data.sports = value;
		}
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

	const getAllSport = async () => {
		let result = await FetchPostApi(API_Path.getAllSport);
		let allSports = await result.json();
		if (result.status === 200) {
			let sportList = [];
			sportList = allSports.data.map((item) => {
				return { value: item.name, lable: item.name }
			})
			setSportRecord(sportList);
		} else {
			toast.error(allSports.message);
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
													name: socialData.fullName,
													gender: "",
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
													gender: Yup.string().required("gender is required."),
													address: Yup.string().required("address is required."),
													contact_no: Yup.string().matches(phoneRegExp, "Phone number is not valid").required("Phone number is required."),
													univercity: Yup.string().required("university is required."),
													DOB: Yup.string().required("DOB is required."),
												})}
												onSubmit={(formData, { resetForm }) => {
													submitAthleteRagisterBySocial(formData, resetForm);
												}}
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
														<div className="col-xxl-6 col-md-12 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Name</label>
															<bdi className="d-block position-relative">
																<input type="text" name="name" disabled className="form-control comn-input-style" placeholder="Enter Your Name" {...formAttr(runform, "name")} />
																<span className="comn-left-input-icon">
																	<svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M3 5C3 2.23858 5.23858 0 8 0C10.7614 0 13 2.23858 13 5C13 7.76142 10.7614 10 8 10C5.23858 10 3 7.76142 3 5ZM8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" fill="#7B838A" />
																		<path d="M2.34315 13.3431C0.842855 14.8434 0 16.8783 0 19H2C2 17.4087 2.63214 15.8826 3.75736 14.7574C4.88258 13.6321 6.4087 13 8 13C9.5913 13 11.1174 13.6321 12.2426 14.7574C13.3679 15.8826 14 17.4087 14 19H16C16 16.8783 15.1571 14.8434 13.6569 13.3431C12.1566 11.8429 10.1217 11 8 11C5.87827 11 3.84344 11.8429 2.34315 13.3431Z" fill="#7B838A" />
																	</svg>
																</span>
															</bdi>
															{errorContainer(runform, "name")}
														</div>
														<div className="col-xxl-6 col-md-12 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">User Name</label>
															<bdi className="d-block position-relative">
																<input type="text" name="user_name" className="form-control comn-input-style" placeholder="Enter Your Name" {...formAttr(runform, "user_name")} />
																<span className="comn-left-input-icon">
																	<svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M3 5C3 2.23858 5.23858 0 8 0C10.7614 0 13 2.23858 13 5C13 7.76142 10.7614 10 8 10C5.23858 10 3 7.76142 3 5ZM8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" fill="#7B838A" />
																		<path d="M2.34315 13.3431C0.842855 14.8434 0 16.8783 0 19H2C2 17.4087 2.63214 15.8826 3.75736 14.7574C4.88258 13.6321 6.4087 13 8 13C9.5913 13 11.1174 13.6321 12.2426 14.7574C13.3679 15.8826 14 17.4087 14 19H16C16 16.8783 15.1571 14.8434 13.6569 13.3431C12.1566 11.8429 10.1217 11 8 11C5.87827 11 3.84344 11.8429 2.34315 13.3431Z" fill="#7B838A" />
																	</svg>
																</span>
															</bdi>
															{errorContainer(runform, "user_name")}
														</div>
														<div className="col-xxl-6 col-md-12 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Gender</label>
															<bdi className="d-block position-relative">
																<select className="w-100 comn-input-style form-select" name="gender" {...formAttr(runform, "gender")}>
																	<option>Select any gender</option>
																	<option value="male">Male</option>
																	<option value="female">Female</option>
																</select>
																<span className="comn-left-input-icon">
																	<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M19.6662 4.19473L18.8344 1.20163C18.7364 0.858239 18.5267 0.580067 18.2549 0.380634C18.2287 0.360984 18.2025 0.341333 18.173 0.321686H18.17C17.8132 0.0991236 17.371 0.0142522 16.9355 0.135357L14.0935 0.927059C13.5696 1.07102 13.2653 1.61412 13.4124 2.13729C13.5565 2.65738 14.1001 2.96481 14.6207 2.81778L15.8254 2.48094L13.5336 6.54702C13.524 6.54047 13.5175 6.53741 13.5074 6.53741C13.3993 6.50466 13.2912 6.47191 13.1834 6.44598C13.1605 6.43943 13.1343 6.43288 13.1081 6.42982C12.9574 6.39386 12.8034 6.36766 12.6497 6.34801C12.6203 6.34494 12.5907 6.34146 12.5613 6.3384C12.1813 6.29589 11.8049 6.30244 11.4317 6.3515C11.2256 6.3809 11.0193 6.4202 10.8194 6.4726C11.4284 6.8553 11.9621 7.35924 12.3879 7.96421C12.486 7.97731 12.581 7.99041 12.676 8.01006C12.6856 8.01313 12.6956 8.01313 12.7022 8.01661C13.0134 8.07877 13.3177 8.19332 13.6092 8.35693C13.9073 8.52709 14.1656 8.73307 14.3885 8.97528C14.3951 8.98183 14.3982 8.98838 14.4082 8.99493C15.3052 9.983 15.5149 11.4745 14.8207 12.7046C14.7485 12.8355 14.6667 12.9566 14.5785 13.0711C14.4901 13.1887 14.3951 13.2969 14.2935 13.3948C14.2542 13.4374 14.2117 13.4767 14.1691 13.5159C13.9761 13.6861 13.7632 13.8331 13.5339 13.9542C13.4946 13.9771 13.4555 13.9967 13.4162 14.0132C13.1869 14.1212 12.9447 14.203 12.6991 14.2554C12.5747 14.2816 12.4469 14.3013 12.3226 14.311C12.3226 14.311 12.3226 14.3141 12.3196 14.3141C11.6975 14.3665 11.0557 14.242 10.4731 13.9151C10.0769 13.6925 9.74942 13.3982 9.49418 13.0579C9.44173 12.9892 9.39263 12.9171 9.34674 12.8453C9.3042 12.7832 9.26835 12.7177 9.23209 12.649C9.22246 12.6328 9.21242 12.6162 9.20586 12.5966C9.17308 12.541 9.14686 12.4855 9.12398 12.4264C9.11087 12.4002 9.10111 12.374 9.088 12.3481C9.029 12.2041 8.98338 12.0568 8.94712 11.9063C8.94056 11.8932 8.9375 11.8834 8.9375 11.8703C8.92132 11.8082 8.90806 11.746 8.89816 11.684C8.8916 11.6644 8.88854 11.6447 8.88854 11.6251C8.87891 11.5629 8.86887 11.4974 8.86566 11.4353C8.80345 10.8106 8.92787 10.1594 9.2618 9.57058C9.3077 9.48571 9.35679 9.40697 9.41552 9.32837C9.4515 9.27276 9.49084 9.22036 9.53324 9.16824V9.16517C9.09457 8.7921 8.54124 8.57636 7.96166 8.56327C7.942 8.59602 7.91912 8.63198 7.89611 8.66473C7.87644 8.69748 7.85356 8.73343 7.8339 8.76618C7.28714 9.73766 7.11374 10.8205 7.26746 11.8476C7.28057 11.936 7.29368 12.0208 7.31335 12.1092C7.33302 12.2006 7.35589 12.2955 7.37891 12.3874C7.38853 12.4267 7.39858 12.4657 7.4149 12.505C7.43456 12.5833 7.46079 12.6621 7.49022 12.7407C7.523 12.8386 7.56233 12.9335 7.60139 13.0284C7.61101 13.0481 7.61757 13.0677 7.62761 13.0874C7.6636 13.1723 7.70293 13.2541 7.74534 13.3328C7.7484 13.3394 7.75189 13.349 7.75496 13.3557C7.80406 13.4471 7.85302 13.5389 7.90895 13.6273V13.6303C8.32141 14.3206 8.91756 14.9127 9.667 15.3379C10.0107 15.5312 10.3682 15.6735 10.7315 15.7762C10.7315 15.7762 10.7312 15.7762 10.7312 15.7765C10.7416 15.7793 10.7522 15.7812 10.7625 15.784C10.7628 15.784 10.763 15.784 10.7635 15.7843C10.9663 15.8399 11.1709 15.8805 11.3758 15.9089H11.3761H11.3763C11.4116 15.9139 11.4466 15.9195 11.4819 15.9235C11.5787 15.9348 11.6757 15.9429 11.7728 15.9482H11.773C11.8156 15.9504 11.8577 15.9513 11.9002 15.9525H11.9005H11.9008C12.0692 15.9573 12.2372 15.9528 12.4045 15.94H12.4054C12.4883 15.9337 12.5704 15.9256 12.6526 15.915C12.6917 15.9095 12.7307 15.9047 12.7695 15.8984H12.7698C12.8857 15.8806 13.001 15.8589 13.115 15.8329C13.1366 15.8282 13.1584 15.8242 13.18 15.8189C13.3168 15.7858 13.4524 15.7486 13.5859 15.704C13.8543 15.6157 14.1165 15.5011 14.3685 15.3606C14.4307 15.3312 14.4897 15.2951 14.5454 15.2592C14.7813 15.1184 15.0072 14.9548 15.2166 14.7718C15.6193 14.4219 15.9695 13.9964 16.248 13.506C17.3874 11.4845 16.9124 8.99471 15.2393 7.51948L17.4592 3.58755L17.7767 4.72264C17.8455 4.98422 18.0191 5.19033 18.2386 5.3148C18.4578 5.43939 18.7231 5.47841 18.9849 5.40316C19.5059 5.2578 19.8136 4.71806 19.6662 4.19489L19.6662 4.19473Z" fill="#7B838A" />
																		<path d="M12.1192 8.76458C12.0898 8.70897 12.0537 8.65658 12.0212 8.60097C11.3698 7.51493 10.3481 6.77225 9.20543 6.45509C9.11044 6.42889 9.01545 6.40268 8.92046 6.38304C8.78948 6.35363 8.65516 6.33063 8.5211 6.31099C8.31146 6.28158 8.09875 6.26848 7.88589 6.26848C7.41123 6.26848 6.93321 6.33719 6.46482 6.48101L5.01447 3.85096L6.52049 3.02343C6.99516 2.75837 7.16881 2.16316 6.90353 1.68891C6.64172 1.21466 6.04558 1.04116 5.57091 1.30275L4.06489 2.13376L3.23665 0.629062C2.97121 0.154668 2.37533 -0.0185423 1.90081 0.243039C1.42615 0.508107 1.2525 1.10331 1.51431 1.57756L2.34605 3.08226L0.840035 3.90979C0.365369 4.17137 0.191722 4.76699 0.453532 5.24431C0.715343 5.71856 1.31456 5.89206 1.78922 5.63048L3.29524 4.79946L4.74559 7.42951C3.04332 8.8889 2.53559 11.385 3.66193 13.4264C3.8812 13.8254 4.1497 14.1787 4.45432 14.4863C4.60497 14.6401 4.76858 14.7841 4.93888 14.915C5.05661 15.0033 5.17796 15.0882 5.30224 15.1669C5.4169 15.239 5.53156 15.3077 5.65249 15.3663C6.08463 15.5955 6.55301 15.7525 7.03407 15.8374C7.7118 15.9617 8.42221 15.9388 9.11002 15.7591C8.47481 15.3567 7.9509 14.8462 7.54501 14.2641H7.54194C7.4895 14.2576 7.43733 14.251 7.38475 14.2413C7.30287 14.2282 7.22099 14.2119 7.1426 14.1922C7.0935 14.1826 7.04106 14.1694 6.99196 14.1529C6.94607 14.1398 6.89697 14.1235 6.85108 14.1071C6.78887 14.0874 6.72987 14.0646 6.66766 14.0384C6.60545 14.0122 6.53989 13.9828 6.47768 13.9535C6.41547 13.9241 6.35326 13.8913 6.29119 13.8555C6.23219 13.8196 6.17346 13.7835 6.11432 13.7444C6.05532 13.7051 5.9966 13.6626 5.94094 13.6201C5.88529 13.5776 5.82977 13.5318 5.77719 13.4859C5.7313 13.4434 5.68569 13.4011 5.63966 13.3583C5.62655 13.3421 5.61023 13.3289 5.60032 13.3158C5.55778 13.2699 5.51538 13.2244 5.4759 13.1784C5.4268 13.1228 5.38091 13.0673 5.33837 13.0082C5.29583 12.9526 5.25649 12.8971 5.21716 12.838C5.17462 12.7725 5.13528 12.7038 5.09595 12.6351C4.40828 11.392 4.6376 9.89052 5.56433 8.90905C5.7836 8.67339 6.04889 8.46727 6.35019 8.30058C6.65134 8.13698 6.96251 8.02242 7.28349 7.96375C7.33259 7.95413 7.38503 7.9441 7.43413 7.93755C7.48658 7.931 7.53568 7.92445 7.58785 7.92138C7.5944 7.91831 7.60096 7.91831 7.60751 7.91831C8.68139 7.82034 9.7652 8.27829 10.4395 9.17132L10.4364 9.17438C10.4823 9.23333 10.5279 9.29549 10.5674 9.35764C10.6099 9.4198 10.6493 9.4853 10.6851 9.554C10.7507 9.67511 10.8095 9.79942 10.862 9.92708C10.96 10.179 11.0257 10.4406 11.0585 10.6992C11.0847 10.9217 11.0879 11.1409 11.0716 11.3565C11.0487 11.6247 10.9932 11.8867 10.9079 12.1351C10.8816 12.22 10.8489 12.3018 10.8098 12.3836C10.777 12.4654 10.7377 12.5438 10.6921 12.6225C10.6561 12.6945 10.6137 12.7665 10.5677 12.835C10.5152 12.9168 10.4596 12.9951 10.4008 13.0704C10.522 13.1719 10.653 13.2633 10.7939 13.3451C11.1673 13.5545 11.5732 13.6591 11.9759 13.6688C12.0316 13.5805 12.084 13.4921 12.1362 13.4007C12.1427 13.381 12.1559 13.3582 12.1656 13.3385C12.2147 13.2502 12.2571 13.1588 12.2966 13.0669C12.3326 12.9883 12.3687 12.9065 12.3981 12.8247C12.4178 12.7789 12.4341 12.7333 12.4506 12.6873C12.4637 12.648 12.4768 12.6055 12.4899 12.5662C12.5128 12.504 12.5293 12.4419 12.5456 12.3799C12.5587 12.3308 12.5718 12.2819 12.5816 12.2326C12.5977 12.1769 12.611 12.1215 12.6209 12.0659C12.6438 11.9644 12.6602 11.8599 12.6733 11.7584C12.6895 11.6504 12.7028 11.5394 12.7093 11.4282C12.719 11.3171 12.7224 11.2056 12.7224 11.0913C12.7216 10.3023 12.5286 9.50413 12.1193 8.7648L12.1192 8.76458Z" fill="#7B838A" />
																	</svg>
																</span>
															</bdi>
															{errorContainer(runform, "gender")}
														</div>
														<div className="col-xxl-6 col-md-12 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Address</label>
															<bdi className="d-block position-relative">
																<input type="text" name="address" className="form-control comn-input-style" placeholder="Enter Your Address" {...formAttr(runform, "address")} />
																<span className="comn-left-input-icon">
																	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM7 9C7 6.24 9.24 4 12 4C14.76 4 17 6.24 17 9C17 11.88 14.12 16.19 12 18.88C9.92 16.21 7 11.85 7 9Z" fill="#7B838A" />
																		<path d="M12 11.5C13.3807 11.5 14.5 10.3807 14.5 9C14.5 7.61929 13.3807 6.5 12 6.5C10.6193 6.5 9.5 7.61929 9.5 9C9.5 10.3807 10.6193 11.5 12 11.5Z" fill="#7B838A" />
																	</svg>
																</span>
															</bdi>
															{errorContainer(runform, "address")}
														</div>
														<div className="col-xxl-6 col-md-12 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Organization/School/Professional Team</label>
															<bdi className="d-block position-relative">
																<input type="text" name="univercity" className="form-control comn-input-style" placeholder="Enter Your School Name" {...formAttr(runform, "univercity")} />
																<span className="comn-left-input-icon">
																	<svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M11 0L0 6L4 8.18V14.18L11 18L18 14.18V8.18L20 7.09V14H22V6L11 0ZM17.82 6L11 9.72L4.18 6L11 2.28L17.82 6ZM16 12.99L11 15.72L6 12.99V9.27L11 12L16 9.27V12.99Z" fill="#7B838A" />
																	</svg>
																</span>
															</bdi>
															{errorContainer(runform, "univercity")}
														</div>
														<div className="col-xxl-6 col-md-12 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Date Of Birth</label>
															<bdi className="d-block position-relative">
																<input type="date" max={yearsago} name="DOB" className="form-control comn-input-style" placeholder="Enter Your Email" {...formAttr(runform, "DOB")} />
																<span className="comn-left-input-icon">
																	<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M16 20H2C0.89543 20 0 19.1046 0 18V4C0 2.89543 0.89543 2 2 2H4V0H6V2H12V0H14V2H16C17.1046 2 18 2.89543 18 4V18C18 19.1046 17.1046 20 16 20ZM2 8V18H16V8H2ZM2 4V6H16V4H2ZM14 16H12V14H14V16ZM10 16H8V14H10V16ZM6 16H4V14H6V16ZM14 12H12V10H14V12ZM10 12H8V10H10V12ZM6 12H4V10H6V12Z" fill="#7B838A" />
																	</svg>
																</span>
															</bdi>
															{errorContainer(runform, "DOB")}
														</div>
														<div className="col-xxl-6 col-md-12 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Email Address</label>
															<bdi className="d-block position-relative">
																<input type="email" disabled className="form-control comn-input-style" name="email" placeholder="Enter Your Email" {...formAttr(runform, "email")} />
																<span className="comn-left-input-icon">
																	<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M18 16H2C0.89543 16 0 15.1046 0 14V1.913C0.0466084 0.842548 0.928533 -0.00101238 2 9.11911e-07H18C19.1046 9.11911e-07 20 0.895432 20 2V14C20 15.1046 19.1046 16 18 16ZM2 3.868V14H18V3.868L10 9.2L2 3.868ZM2.8 2L10 6.8L17.2 2H2.8Z" fill="#7B838A" />
																	</svg>
																</span>
															</bdi>
															{errorContainer(runform, "email")}
														</div>
														<div className="col-12">
															<div className="row me-0">
																<div className="col-xxl-6 col-md-12 col-sm-6 mb-3 pe-0">
																	<div>
																		<label className="comn-label-class">Phone Number</label>
																		<bdi className="d-block position-relative">
																			<PhoneInput
																				inputExtraProps={{
																					inputClass: "form-control input-style",
																					required: true,
																					autoFocus: true,
																				}}
																				country={country}
																				onChange={PhonehandleOnChange}
																			/>
																		</bdi>
																		{errorContainer(runform, "contact_no")}
																	</div>
																</div>
																<div className="col-xxl-6 col-md-12 col-sm-6 mb-3 pe-0">
																	<label className="comn-label-class">Choose Your Sports</label>
																	<bdi className="d-block position-relative choose-sport-class">
																		<Select isMulti={true} options={sportRecord} onChange={handleOnchange} />
																	</bdi>
																</div>
															</div>
														</div>
														<div className="col-sm-9 mx-auto my-3">
															<button className="comn-btn-class w-100" type="submit">
																SIGN UP
															</button>
														</div>
														<div className="col-12">
															<div className="text-center form-btm-link">
																<div className="mt-4 form-btm-link" onClick={() => navigate("/login")}>
																	<p>
																		Already User?
																		<Link to="#/" className="ms-2 comn-yellow-txt">
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
													user_name: "",
													name: "",
													gender: "",
													address: "",
													password: "",
													contact_no: "",
													univercity: "",
													email: "",
													DOB: "",
												}}
												validationSchema={Yup.object({
													email: Yup.string().email().required("Email is required."),
													name: Yup.string().required("name is required."),
													user_name: Yup.string().required("Username is required."),
													gender: Yup.string().required("gender is required."),
													address: Yup.string().required("address is required."),
													password: Yup.string().required("Please Enter your password"),
													// .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
													contact_no: Yup.string().matches(phoneRegExp, "Phone number is not valid").required("Phone number is required."),
													univercity: Yup.string().required("university is required."),
													DOB: Yup.string().required("DOB is required."),
												})}
												onSubmit={(formData, { resetForm }) => {
													submitAthleteRagister(formData, resetForm);
												}}
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
														<div className="col-xxl-6 col-md-12 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Name</label>
															<bdi className="d-block position-relative">
																<input type="text" name="name" className="form-control comn-input-style" placeholder="Enter Your Name" {...formAttr(runform, "name")} />
																<span className="comn-left-input-icon">
																	<svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M3 5C3 2.23858 5.23858 0 8 0C10.7614 0 13 2.23858 13 5C13 7.76142 10.7614 10 8 10C5.23858 10 3 7.76142 3 5ZM8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" fill="#7B838A" />
																		<path d="M2.34315 13.3431C0.842855 14.8434 0 16.8783 0 19H2C2 17.4087 2.63214 15.8826 3.75736 14.7574C4.88258 13.6321 6.4087 13 8 13C9.5913 13 11.1174 13.6321 12.2426 14.7574C13.3679 15.8826 14 17.4087 14 19H16C16 16.8783 15.1571 14.8434 13.6569 13.3431C12.1566 11.8429 10.1217 11 8 11C5.87827 11 3.84344 11.8429 2.34315 13.3431Z" fill="#7B838A" />
																	</svg>
																</span>
															</bdi>
															{errorContainer(runform, "name")}
														</div>
														<div className="col-xxl-6 col-md-12 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">User Name</label>
															<bdi className="d-block position-relative">
																<input type="text" name="user_name" className="form-control comn-input-style" placeholder="Enter Your Name" {...formAttr(runform, "user_name")} />
																<span className="comn-left-input-icon">
																	<svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M3 5C3 2.23858 5.23858 0 8 0C10.7614 0 13 2.23858 13 5C13 7.76142 10.7614 10 8 10C5.23858 10 3 7.76142 3 5ZM8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" fill="#7B838A" />
																		<path d="M2.34315 13.3431C0.842855 14.8434 0 16.8783 0 19H2C2 17.4087 2.63214 15.8826 3.75736 14.7574C4.88258 13.6321 6.4087 13 8 13C9.5913 13 11.1174 13.6321 12.2426 14.7574C13.3679 15.8826 14 17.4087 14 19H16C16 16.8783 15.1571 14.8434 13.6569 13.3431C12.1566 11.8429 10.1217 11 8 11C5.87827 11 3.84344 11.8429 2.34315 13.3431Z" fill="#7B838A" />
																	</svg>
																</span>
															</bdi>
															{errorContainer(runform, "user_name")}
														</div>
														<div className="col-xxl-6 col-md-12 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Gender</label>
															<bdi className="d-block position-relative">
																<select className="w-100 comn-input-style form-select" name="gender" {...formAttr(runform, "gender")}>
																	<option>Select any gender</option>
																	<option value="male">Male</option>
																	<option value="female">Female</option>
																</select>
																<span className="comn-left-input-icon">
																	<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M19.6662 4.19473L18.8344 1.20163C18.7364 0.858239 18.5267 0.580067 18.2549 0.380634C18.2287 0.360984 18.2025 0.341333 18.173 0.321686H18.17C17.8132 0.0991236 17.371 0.0142522 16.9355 0.135357L14.0935 0.927059C13.5696 1.07102 13.2653 1.61412 13.4124 2.13729C13.5565 2.65738 14.1001 2.96481 14.6207 2.81778L15.8254 2.48094L13.5336 6.54702C13.524 6.54047 13.5175 6.53741 13.5074 6.53741C13.3993 6.50466 13.2912 6.47191 13.1834 6.44598C13.1605 6.43943 13.1343 6.43288 13.1081 6.42982C12.9574 6.39386 12.8034 6.36766 12.6497 6.34801C12.6203 6.34494 12.5907 6.34146 12.5613 6.3384C12.1813 6.29589 11.8049 6.30244 11.4317 6.3515C11.2256 6.3809 11.0193 6.4202 10.8194 6.4726C11.4284 6.8553 11.9621 7.35924 12.3879 7.96421C12.486 7.97731 12.581 7.99041 12.676 8.01006C12.6856 8.01313 12.6956 8.01313 12.7022 8.01661C13.0134 8.07877 13.3177 8.19332 13.6092 8.35693C13.9073 8.52709 14.1656 8.73307 14.3885 8.97528C14.3951 8.98183 14.3982 8.98838 14.4082 8.99493C15.3052 9.983 15.5149 11.4745 14.8207 12.7046C14.7485 12.8355 14.6667 12.9566 14.5785 13.0711C14.4901 13.1887 14.3951 13.2969 14.2935 13.3948C14.2542 13.4374 14.2117 13.4767 14.1691 13.5159C13.9761 13.6861 13.7632 13.8331 13.5339 13.9542C13.4946 13.9771 13.4555 13.9967 13.4162 14.0132C13.1869 14.1212 12.9447 14.203 12.6991 14.2554C12.5747 14.2816 12.4469 14.3013 12.3226 14.311C12.3226 14.311 12.3226 14.3141 12.3196 14.3141C11.6975 14.3665 11.0557 14.242 10.4731 13.9151C10.0769 13.6925 9.74942 13.3982 9.49418 13.0579C9.44173 12.9892 9.39263 12.9171 9.34674 12.8453C9.3042 12.7832 9.26835 12.7177 9.23209 12.649C9.22246 12.6328 9.21242 12.6162 9.20586 12.5966C9.17308 12.541 9.14686 12.4855 9.12398 12.4264C9.11087 12.4002 9.10111 12.374 9.088 12.3481C9.029 12.2041 8.98338 12.0568 8.94712 11.9063C8.94056 11.8932 8.9375 11.8834 8.9375 11.8703C8.92132 11.8082 8.90806 11.746 8.89816 11.684C8.8916 11.6644 8.88854 11.6447 8.88854 11.6251C8.87891 11.5629 8.86887 11.4974 8.86566 11.4353C8.80345 10.8106 8.92787 10.1594 9.2618 9.57058C9.3077 9.48571 9.35679 9.40697 9.41552 9.32837C9.4515 9.27276 9.49084 9.22036 9.53324 9.16824V9.16517C9.09457 8.7921 8.54124 8.57636 7.96166 8.56327C7.942 8.59602 7.91912 8.63198 7.89611 8.66473C7.87644 8.69748 7.85356 8.73343 7.8339 8.76618C7.28714 9.73766 7.11374 10.8205 7.26746 11.8476C7.28057 11.936 7.29368 12.0208 7.31335 12.1092C7.33302 12.2006 7.35589 12.2955 7.37891 12.3874C7.38853 12.4267 7.39858 12.4657 7.4149 12.505C7.43456 12.5833 7.46079 12.6621 7.49022 12.7407C7.523 12.8386 7.56233 12.9335 7.60139 13.0284C7.61101 13.0481 7.61757 13.0677 7.62761 13.0874C7.6636 13.1723 7.70293 13.2541 7.74534 13.3328C7.7484 13.3394 7.75189 13.349 7.75496 13.3557C7.80406 13.4471 7.85302 13.5389 7.90895 13.6273V13.6303C8.32141 14.3206 8.91756 14.9127 9.667 15.3379C10.0107 15.5312 10.3682 15.6735 10.7315 15.7762C10.7315 15.7762 10.7312 15.7762 10.7312 15.7765C10.7416 15.7793 10.7522 15.7812 10.7625 15.784C10.7628 15.784 10.763 15.784 10.7635 15.7843C10.9663 15.8399 11.1709 15.8805 11.3758 15.9089H11.3761H11.3763C11.4116 15.9139 11.4466 15.9195 11.4819 15.9235C11.5787 15.9348 11.6757 15.9429 11.7728 15.9482H11.773C11.8156 15.9504 11.8577 15.9513 11.9002 15.9525H11.9005H11.9008C12.0692 15.9573 12.2372 15.9528 12.4045 15.94H12.4054C12.4883 15.9337 12.5704 15.9256 12.6526 15.915C12.6917 15.9095 12.7307 15.9047 12.7695 15.8984H12.7698C12.8857 15.8806 13.001 15.8589 13.115 15.8329C13.1366 15.8282 13.1584 15.8242 13.18 15.8189C13.3168 15.7858 13.4524 15.7486 13.5859 15.704C13.8543 15.6157 14.1165 15.5011 14.3685 15.3606C14.4307 15.3312 14.4897 15.2951 14.5454 15.2592C14.7813 15.1184 15.0072 14.9548 15.2166 14.7718C15.6193 14.4219 15.9695 13.9964 16.248 13.506C17.3874 11.4845 16.9124 8.99471 15.2393 7.51948L17.4592 3.58755L17.7767 4.72264C17.8455 4.98422 18.0191 5.19033 18.2386 5.3148C18.4578 5.43939 18.7231 5.47841 18.9849 5.40316C19.5059 5.2578 19.8136 4.71806 19.6662 4.19489L19.6662 4.19473Z" fill="#7B838A" />
																		<path d="M12.1192 8.76458C12.0898 8.70897 12.0537 8.65658 12.0212 8.60097C11.3698 7.51493 10.3481 6.77225 9.20543 6.45509C9.11044 6.42889 9.01545 6.40268 8.92046 6.38304C8.78948 6.35363 8.65516 6.33063 8.5211 6.31099C8.31146 6.28158 8.09875 6.26848 7.88589 6.26848C7.41123 6.26848 6.93321 6.33719 6.46482 6.48101L5.01447 3.85096L6.52049 3.02343C6.99516 2.75837 7.16881 2.16316 6.90353 1.68891C6.64172 1.21466 6.04558 1.04116 5.57091 1.30275L4.06489 2.13376L3.23665 0.629062C2.97121 0.154668 2.37533 -0.0185423 1.90081 0.243039C1.42615 0.508107 1.2525 1.10331 1.51431 1.57756L2.34605 3.08226L0.840035 3.90979C0.365369 4.17137 0.191722 4.76699 0.453532 5.24431C0.715343 5.71856 1.31456 5.89206 1.78922 5.63048L3.29524 4.79946L4.74559 7.42951C3.04332 8.8889 2.53559 11.385 3.66193 13.4264C3.8812 13.8254 4.1497 14.1787 4.45432 14.4863C4.60497 14.6401 4.76858 14.7841 4.93888 14.915C5.05661 15.0033 5.17796 15.0882 5.30224 15.1669C5.4169 15.239 5.53156 15.3077 5.65249 15.3663C6.08463 15.5955 6.55301 15.7525 7.03407 15.8374C7.7118 15.9617 8.42221 15.9388 9.11002 15.7591C8.47481 15.3567 7.9509 14.8462 7.54501 14.2641H7.54194C7.4895 14.2576 7.43733 14.251 7.38475 14.2413C7.30287 14.2282 7.22099 14.2119 7.1426 14.1922C7.0935 14.1826 7.04106 14.1694 6.99196 14.1529C6.94607 14.1398 6.89697 14.1235 6.85108 14.1071C6.78887 14.0874 6.72987 14.0646 6.66766 14.0384C6.60545 14.0122 6.53989 13.9828 6.47768 13.9535C6.41547 13.9241 6.35326 13.8913 6.29119 13.8555C6.23219 13.8196 6.17346 13.7835 6.11432 13.7444C6.05532 13.7051 5.9966 13.6626 5.94094 13.6201C5.88529 13.5776 5.82977 13.5318 5.77719 13.4859C5.7313 13.4434 5.68569 13.4011 5.63966 13.3583C5.62655 13.3421 5.61023 13.3289 5.60032 13.3158C5.55778 13.2699 5.51538 13.2244 5.4759 13.1784C5.4268 13.1228 5.38091 13.0673 5.33837 13.0082C5.29583 12.9526 5.25649 12.8971 5.21716 12.838C5.17462 12.7725 5.13528 12.7038 5.09595 12.6351C4.40828 11.392 4.6376 9.89052 5.56433 8.90905C5.7836 8.67339 6.04889 8.46727 6.35019 8.30058C6.65134 8.13698 6.96251 8.02242 7.28349 7.96375C7.33259 7.95413 7.38503 7.9441 7.43413 7.93755C7.48658 7.931 7.53568 7.92445 7.58785 7.92138C7.5944 7.91831 7.60096 7.91831 7.60751 7.91831C8.68139 7.82034 9.7652 8.27829 10.4395 9.17132L10.4364 9.17438C10.4823 9.23333 10.5279 9.29549 10.5674 9.35764C10.6099 9.4198 10.6493 9.4853 10.6851 9.554C10.7507 9.67511 10.8095 9.79942 10.862 9.92708C10.96 10.179 11.0257 10.4406 11.0585 10.6992C11.0847 10.9217 11.0879 11.1409 11.0716 11.3565C11.0487 11.6247 10.9932 11.8867 10.9079 12.1351C10.8816 12.22 10.8489 12.3018 10.8098 12.3836C10.777 12.4654 10.7377 12.5438 10.6921 12.6225C10.6561 12.6945 10.6137 12.7665 10.5677 12.835C10.5152 12.9168 10.4596 12.9951 10.4008 13.0704C10.522 13.1719 10.653 13.2633 10.7939 13.3451C11.1673 13.5545 11.5732 13.6591 11.9759 13.6688C12.0316 13.5805 12.084 13.4921 12.1362 13.4007C12.1427 13.381 12.1559 13.3582 12.1656 13.3385C12.2147 13.2502 12.2571 13.1588 12.2966 13.0669C12.3326 12.9883 12.3687 12.9065 12.3981 12.8247C12.4178 12.7789 12.4341 12.7333 12.4506 12.6873C12.4637 12.648 12.4768 12.6055 12.4899 12.5662C12.5128 12.504 12.5293 12.4419 12.5456 12.3799C12.5587 12.3308 12.5718 12.2819 12.5816 12.2326C12.5977 12.1769 12.611 12.1215 12.6209 12.0659C12.6438 11.9644 12.6602 11.8599 12.6733 11.7584C12.6895 11.6504 12.7028 11.5394 12.7093 11.4282C12.719 11.3171 12.7224 11.2056 12.7224 11.0913C12.7216 10.3023 12.5286 9.50413 12.1193 8.7648L12.1192 8.76458Z" fill="#7B838A" />
																	</svg>
																</span>
															</bdi>
															{errorContainer(runform, "gender")}
														</div>
														<div className="col-xxl-6 col-md-12 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Address</label>
															<bdi className="d-block position-relative">
																<input type="text" name="address" className="form-control comn-input-style" placeholder="Enter Your Address" {...formAttr(runform, "address")} />
																<span className="comn-left-input-icon">
																	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM7 9C7 6.24 9.24 4 12 4C14.76 4 17 6.24 17 9C17 11.88 14.12 16.19 12 18.88C9.92 16.21 7 11.85 7 9Z" fill="#7B838A" />
																		<path d="M12 11.5C13.3807 11.5 14.5 10.3807 14.5 9C14.5 7.61929 13.3807 6.5 12 6.5C10.6193 6.5 9.5 7.61929 9.5 9C9.5 10.3807 10.6193 11.5 12 11.5Z" fill="#7B838A" />
																	</svg>
																</span>
															</bdi>
															{errorContainer(runform, "address")}
														</div>
														<div className="col-xxl-6 col-md-12 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Organization/School/Professional Team</label>
															<bdi className="d-block position-relative">
																<input type="text" name="univercity" className="form-control comn-input-style" placeholder="Enter Your School Name" {...formAttr(runform, "univercity")} />
																<span className="comn-left-input-icon">
																	<svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M11 0L0 6L4 8.18V14.18L11 18L18 14.18V8.18L20 7.09V14H22V6L11 0ZM17.82 6L11 9.72L4.18 6L11 2.28L17.82 6ZM16 12.99L11 15.72L6 12.99V9.27L11 12L16 9.27V12.99Z" fill="#7B838A" />
																	</svg>
																</span>
															</bdi>
															{errorContainer(runform, "univercity")}
														</div>
														<div className="col-xxl-6 col-md-12 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Date Of Birth</label>
															<bdi className="d-block position-relative">
																<input type="date" max={yearsago} name="DOB" className="form-control comn-input-style" placeholder="Enter Your Email" {...formAttr(runform, "DOB")} />
																<span className="comn-left-input-icon">
																	<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M16 20H2C0.89543 20 0 19.1046 0 18V4C0 2.89543 0.89543 2 2 2H4V0H6V2H12V0H14V2H16C17.1046 2 18 2.89543 18 4V18C18 19.1046 17.1046 20 16 20ZM2 8V18H16V8H2ZM2 4V6H16V4H2ZM14 16H12V14H14V16ZM10 16H8V14H10V16ZM6 16H4V14H6V16ZM14 12H12V10H14V12ZM10 12H8V10H10V12ZM6 12H4V10H6V12Z" fill="#7B838A" />
																	</svg>
																</span>
															</bdi>
															{errorContainer(runform, "DOB")}
														</div>
														<div className="col-xxl-6 col-md-12 col-sm-6 mb-3 pe-0">
															<label className="comn-label-class">Email Address</label>
															<bdi className="d-block position-relative">
																<input type="email" className="form-control comn-input-style" name="email" placeholder="Enter Your Email" {...formAttr(runform, "email")} />
																<span className="comn-left-input-icon">
																	<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M18 16H2C0.89543 16 0 15.1046 0 14V1.913C0.0466084 0.842548 0.928533 -0.00101238 2 9.11911e-07H18C19.1046 9.11911e-07 20 0.895432 20 2V14C20 15.1046 19.1046 16 18 16ZM2 3.868V14H18V3.868L10 9.2L2 3.868ZM2.8 2L10 6.8L17.2 2H2.8Z" fill="#7B838A" />
																	</svg>
																</span>
															</bdi>
															{errorContainer(runform, "email")}
														</div>
														<div className="col-12">
															<div className="row me-0">
																<div className="col-xxl-6 col-md-12 col-sm-6 mb-3 pe-0">
																	<div>
																		<label className="comn-label-class">Phone Number</label>
																		<bdi className="d-block position-relative">
																			<PhoneInput
																				inputExtraProps={{
																					inputClass: "form-control input-style",
																					required: true,
																					autoFocus: true,
																				}}
																				country={country}
																				onChange={PhonehandleOnChange}
																			/>
																		</bdi>
																		{errorContainer(runform, "contact_no")}
																	</div>
																	<div className="mt-3">
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
																</div>
																<div className="col-xxl-6 col-md-12 col-sm-6 mb-3 pe-0">
																	<label className="comn-label-class">Choose Your Sports</label>
																	<bdi className="d-block position-relative choose-sport-class">
																		<Select isMulti={true} options={sportRecord} onChange={handleOnchange} />
																	</bdi>
																</div>
															</div>
														</div>
														<div className="col-sm-9 mx-auto my-3">
															<button className="comn-btn-class w-100" type="submit">
																SIGN UP
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
