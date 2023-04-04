import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import Range from "rc-slider";
import { Formik } from 'formik';
import * as Yup from "yup";
import { API_Path, errorContainer, formAttr } from '../Api/Const';
import PhoneInput from 'react-phone-input-2';
import roleContext from "../contexts/roleContext";
import { useRef } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { FetchPostApi, ImagePostApi } from '../Api/apiServices';


export default function AthleteProfileEdit(props) {

	const { profile, additionalDetail, setdefultview, setediprofiledivshow } = props
	const context = useContext(roleContext);
	const contect = useRef(roleContext);
	const contectAdditionalDetails = useRef();
	const [sportRecord, setSportRecord] = useState([]);

	const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
	const [customAwardsHonors, setCustomAwardsHonors] = useState([]);
	const [buttonType, setButtonType] = useState("button");
	const [country, setcountry] = useState("");
	const [profileData, setProfileData] = useState({});
	const [contactNumber, setcontactNumber] = useState('');
	const [additionalDetails, setAdditionalDetails] = useState('');
	const [value, setValue] = useState(2);
	const [checkedCount, setCheckedCount] = useState(0);
	const [selectedSports, setSelectedSports] = useState([]);
	const [profile_img, setProfile_img] = useState("");
	const [cover_img, setcover_img] = useState("");

	useEffect(() => {
		setcountry(context.country)
		setProfile_img(context?.profilePicture)
		setcover_img(context?.cover_img)
	}, [context])

	useEffect(() => {
		setProfileData(profile);
		setcontactNumber(additionalDetail?.contact_no)
		setAdditionalDetails(additionalDetail)
		if (additionalDetail?.additionalinfo?.AwardsHonors && additionalDetail?.additionalinfo?.AwardsHonors?.length > 0) { setCustomAwardsHonors(additionalDetail?.additionalinfo?.AwardsHonors) }
		if (additionalDetail.additionalinfo?.sports && additionalDetail.additionalinfo?.sports?.length > 0) { setSelectedCheckboxes(additionalDetail?.additionalinfo?.sports) }
	}, [props]);

	useEffect(() => {
		getAllSport()
	}, [])

	const getAllSport = async () => {
		let result = await FetchPostApi(API_Path.getAllSport);
		let allSports = await result.json();
		if (result.status === 200) {
			setSportRecord(allSports.data);
		} else {
			toast.error(allSports.message);
		}
	};

	const handleSliderChange = (newValue) => {
		setValue(newValue);
	};
	function handleClick() {
		setButtonType("submit");
	}

	const PhonehandleOnChange = (value) => {
		let temp = "+" + value;
		contect.current.setFieldValue("contact_no", temp);
	};

	const submitProEditedDetails = async (formdata) => {
		if (profile_img) {
			context.setprofilePicture(profile_img)
		}
		if (cover_img) {
			context.setcover_img(cover_img)
		}
		let data = {
			name: formdata.name,
			username: formdata.username,
			email: formdata.email,
			contact_no: formdata.contact_no,
			DOB: formdata.DOB,
			univercity: formdata.univercity,
			address: formdata.address,
			gender: formdata.gender,
			profile_img: profile_img,
			cover_img: cover_img,

		};
		let result = await FetchPostApi(API_Path.editProfile, data);
		let editUserData = await result.json();
		if (result.status === 200) {
			toast.success(editUserData.message);
			setediprofiledivshow(false);
			setdefultview(true);
			props.getAthleteProfile();
			props.getAdditionalDetails();
		} else {
			toast.error(editUserData.message);
		}
	};

	const submitProAdditionalDetails = () => {

	}

	const addAwardsHonors = (e) => {
		if (e.key === "Enter" && e.target.value !== "") {
			setCustomAwardsHonors([...customAwardsHonors, e.target.value]);
			e.target.value = "";
		}
	};

	const removeAwardsHonors = (index) => {
		const updatedAchievements = [...customAwardsHonors];
		updatedAchievements.splice(index, 1);
		setCustomAwardsHonors(updatedAchievements);
	};

	const profileimgupdate = async (e) => {
		if (e.target.files[0]) {
			let formData = new FormData();
			formData.append("images", e.target.files[0]);
			let result = await ImagePostApi(API_Path.addImage, formData);
			let getImage = await result.json();
			if (result.status === 200) {
				setProfile_img(getImage.data.img[0]);
			} else {
				toast.error(getImage.message);
			}
		}
	}

	const coverImageUpdate = async (e) => {
		if (e.target.files[0]) {
			let formData = new FormData();
			formData.append("images", e.target.files[0]);
			let result = await ImagePostApi(API_Path.addImage, formData);
			let getCover = await result.json();
			if (result.status === 200) {
				setcover_img(getCover.data.img[0]);
			} else {
				toast.error(getCover.message);
			}
		}
	}

	const maxChecked = 2;
	function handleCheckboxChange(e) {
		if (e.target.checked) {
			if (checkedCount < maxChecked) {
				setCheckedCount(checkedCount + 1);
				setSelectedSports([...selectedSports, e.target.name]);
			} else {
				e.target.checked = false;
			}
		} else {
			setCheckedCount(checkedCount - 1);
			setSelectedSports(selectedSports.filter(name => name !== e.target.name));
		}
	}
	return (
		<>
			<section className=''>
				<div className='container'>
					<div className='row'>
						<div className='col-xl-12 col-md-9'>
							<div className="mt-3 mt-md-0 tabs-heading-txt">
								<h5 className="mb-0">Profile</h5>
							</div>
							<div className="market-head-txt">
								<span>
									Profile &gt;
									<bdi> Edit Profile</bdi>
								</span>
							</div>
							<div className="row">
								<div className="col-12">
									<div className="edit-profile-main p-3 mt-3">
										<h5>Personal Information</h5>
										<Formik
											innerRef={contect}
											enableReinitialize={true}
											initialValues={{
												name: profileData.name ?? "",
												username: profileData.user_name ?? "",
												email: additionalDetail?.email ?? "",
												contact_no: contactNumber ?? "",
												DOB: profileData.DOB ?? "",
												univercity: profileData.univercity ?? "",
												address: profileData.address ?? "",
												gender: profileData.gender ?? "",
											}}
											validationSchema={Yup.object({
												name: Yup.string().required("name is required."),
												username: Yup.string().required("username is required."),
												email: Yup.string().required("email is required."),
												contact_no: Yup.string().required("contect number is required."),
												DOB: Yup.string().required("DOB is required."),
												univercity: Yup.string().required("School or college name is required"),
												address: Yup.string().required("Address is required"),
												gender: Yup.string().required("gender is required"),
											})}
											onSubmit={(formData) => submitProEditedDetails(formData)}
										>
											{(runform) => (
												<form className="row align-items-center" onSubmit={runform.handleSubmit}>
													<div className="d-flex justify-content-around">
														<div className="team-info-main p-3">
															<label className="comn-label-class">Profile Image </label>
															<div className="d-md-block d-flex justify-content-center">
																<div className="student-profile-img position-relative">
																	<img src={profile_img ? profile_img : require("../assets/images/defaultProPic.png")} className="img-fluid" alt="" />
																	<div className="stud-pro-cam">
																		<label htmlFor="upload-img">
																			<input type="file" id="upload-img" name="upload-img" hidden accept=".png, .jpg, .jpeg" onChange={(e) => profileimgupdate(e)} />
																			<img src="../assets/images/Profile-cam-icon.svg" alt="" />
																		</label>
																	</div>
																</div>
															</div>
														</div>
														<div className="team-info-main p-3">
															<label className="comn-label-class">Cover Image</label>
															<div className="d-md-block d-flex justify-content-center">
																<div className="student-profile-img position-relative">
																	<img src={cover_img ? cover_img : require("../assets/images/defaultProPic.png")} className="img-fluid" alt="" />
																	<div className="stud-pro-cam">
																		<label htmlFor="upload-cover">
																			<input type="file" id="upload-cover" name="upload-cover" hidden accept=".png, .jpg, .jpeg" onChange={(e) => coverImageUpdate(e)} />
																			<img src="../assets/images/Profile-cam-icon.svg" alt="" />
																		</label>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div className="col-lg-6 col-md-12 col-sm-6 mb-3 mt-3">
														<label className="comn-label-class">Name</label>
														<bdi className="d-block position-relative">
															<input type="text" className="form-control comn-input-style ps-3" name="name" placeholder="Enter Your Name" {...formAttr(runform, "name")} />
														</bdi>
														{errorContainer(runform, "name")}
													</div>
													<div className="col-lg-6 col-md-12 col-sm-6 mb-3 mt-3">
														<label className="comn-label-class">Username</label>
														<bdi className="d-block position-relative">
															<input type="text" className="form-control comn-input-style ps-3" name="username" placeholder="Enter Your Name" {...formAttr(runform, "username")} />
														</bdi>
														{errorContainer(runform, "username")}
													</div>
													<div className="col-lg-6 col-md-12 col-sm-6 mb-3">
														<label className="comn-label-class">Email Address</label>
														<bdi className="d-block position-relative">
															<input type="email" name="email" className="form-control comn-input-style ps-3" placeholder="Enter Your Email" {...formAttr(runform, "email")} />
														</bdi>
														{errorContainer(runform, "email")}
													</div>
													<div className="col-lg-6 col-sm-6 mb-3">
														{/* <label className="comn-label-class">Phone Number</label> */}
														<bdi className="d-block position-relative mt-2">
															<PhoneInput inputProps={{ required: true, autoFocus: true }} value={contactNumber} country={country} onChange={PhonehandleOnChange} />
														</bdi>
														{errorContainer(runform, "contact_no")}
													</div>
													<div className="col-lg-6 col-md-12 col-sm-6 mb-3">
														<label className="comn-label-class">Date Of Birth</label>
														<bdi className="d-block position-relative">
															<input type="date" className="form-control comn-input-style ps-3" name="DOB" {...formAttr(runform, "DOB")} />
														</bdi>
														{errorContainer(runform, "DOB")}
													</div>
													<div>
														<label className="comn-label-class">Gender</label>
														<div className='cust-radio-div d-flex mb-3'>
															<div className="form-check">
																<input className="form-check-input" type="radio" value="male" id="male" name='gender' checked={profileData.gender == "male"} onChange={runform.handleChange} onBlur={runform.handleBlur} />
																<label className="form-check-label ms-1 mt-1" htmlFor="male">Male</label>
															</div>
															<div className="form-check ms-4">
																<input className="form-check-input" type="radio" value="female" id="female" name="gender" checked={profileData.gender == 'female'} onChange={runform.handleChange} onBlur={runform.handleBlur} />
																<label className="form-check-label ms-1 mt-1" htmlFor="female">Female</label>
															</div>
														</div>
														{errorContainer(runform, "gender")}
													</div>
													<div className="col-lg-6 col-md-12 col-sm-6 mb-3">
														<label className="comn-label-class">School/Collage</label>
														<bdi className="d-block position-relative">
															<input type="text" className="form-control comn-input-style ps-3" placeholder='Enter your school or college name' name='univercity' {...formAttr(runform, "univercity")} />
														</bdi>
														{errorContainer(runform, "univercity")}
													</div>
													<div className="col-lg-6 col-md-12 col-sm-6 mb-3">
														<label className="comn-label-class">Address</label>
														<bdi className="d-block position-relative">
															<input type="text" className="form-control comn-input-style ps-3" placeholder='Enter your address' name='address' {...formAttr(runform, "address")} />
														</bdi>
														{errorContainer(runform, "address")}
													</div>
													<div className="row">
														<div className="col-xxl-3 col-xl-4 col-md-6 mt-3 mx-md-0 mx-sm-auto d-flex">
															<button className="comn-btn-class me-2" type={buttonType} onClick={handleClick}>
																Save
															</button>
															<button className="comn-btn-class" type="reset" onClick={props.closeeditprofiledivshowhandel}>
																cancel
															</button>
														</div>
													</div>
												</form>
											)}
										</Formik>
									</div>
									<div className="additional-info mt-3 p-3">
										<h5>Additional Information</h5>
										<Formik
											// innerRef={contectAdditionalDetails}
											enableReinitialize={true}
											initialValues={{
												faith: additionalDetails?.additionalinfo?.faith ?? "",
												familyCircle: additionalDetails?.additionalinfo?.familyCircle ?? "",
												academics: additionalDetails?.additionalinfo?.Academics ?? "",
												graduationYear: additionalDetails?.additionalinfo?.GraduationYear ?? "",
												ACT: additionalDetails?.additionalinfo?.Act ?? "",
												SAT: additionalDetails?.additionalinfo?.Sat ?? "",
												classRank: additionalDetails?.additionalinfo?.ClassRank ?? "",
												classSize: additionalDetails?.additionalinfo?.ClassSize ?? "",
												NCAA: additionalDetails?.additionalinfo?.Ncaa ?? "",
												height: additionalDetails?.additionalinfo?.Height ?? "",
												weight: additionalDetails?.additionalinfo?.Weight ?? "",
												// // privacy:"",
											}}
											validationSchema={Yup.object({
												faith: Yup.string().required("Please enter your faith."),
												familyCircle: Yup.string().required("Please enter your family circle."),
												academics: Yup.string().required("Please enter your academic information."),
												graduationYear: Yup.string().required("Please enter your graduation year."),
												ACT: Yup.string().required("Please enter your ACT score."),
												SAT: Yup.string().required("Please enter your SAT score."),
												classRank: Yup.string().required("Please provide information about your academic ranking."),
												classSize: Yup.string().required("Please enter your class size."),
												NCAA: Yup.string().required("Please enter your NCAA status."),
												height: Yup.string().required("Please enter your height."),
												weight: Yup.string().required("Please enter your weight."),
												// Please enter your awards and honors
											})}
											onSubmit={(formData, { resetForm }) => submitProAdditionalDetails(formData, resetForm)}
										>
											{(runforms) => (
												<form className="row align-items-center" onSubmit={runforms.handleSubmit}>
													<div className="col-lg-6 col-md-12 col-sm-6 mb-3">
														<label className="comn-label-class">Faith</label>
														<bdi className="d-block position-relative">
															<input type="text" className="form-control comn-input-style ps-3" placeholder="Religious beliefs" name="faith" {...formAttr(runforms, "faith")} />
														</bdi>
														{errorContainer(runforms, "faith")}
													</div>
													<div className="col-lg-6 col-md-12 col-sm-6 mb-3">
														<label className="comn-label-class">Family Circle</label>
														<bdi className="d-block position-relative">
															<input type="text" className="form-control comn-input-style ps-3" placeholder="Family circle" name="familyCircle" {...formAttr(runforms, "familyCircle")} />
														</bdi>
														{errorContainer(runforms, "familyCircle")}
													</div>
													<div className="col-lg-6 col-md-12 col-sm-6 mb-3">
														<label className="comn-label-class">Academics</label>
														<bdi className="d-block position-relative">
															<input type="text" className="form-control comn-input-style ps-3" placeholder="Educational background" name="academics" {...formAttr(runforms, "academics")} />
														</bdi>
														{errorContainer(runforms, "academics")}
													</div>
													<div className="col-lg-6 col-md-12 col-sm-6 mb-3">
														<label className="comn-label-class">Graduation Year:</label>
														<bdi className="d-block position-relative">
															<input type="text" className="form-control comn-input-style ps-3" placeholder="Graduation Year" name="graduationYear" {...formAttr(runforms, "graduationYear")} />
														</bdi>
														{errorContainer(runforms, "graduationYear")}
													</div>
													<div className="col-lg-6 col-md-12 col-sm-6 mb-3">
														<label className="comn-label-class">ACT</label>
														<bdi className="d-block position-relative">
															<input type="text" className="form-control comn-input-style ps-3" placeholder="Your ACT performance" name="ACT" {...formAttr(runforms, "ACT")} />
														</bdi>
														{errorContainer(runforms, "ACT")}
													</div>
													<div className="col-lg-6 col-md-12 col-sm-6 mb-3">
														<label className="comn-label-class">SAT</label>
														<bdi className="d-block position-relative">
															<input type="text" className="form-control comn-input-style ps-3" placeholder="SAT score" name="SAT" {...formAttr(runforms, "SAT")} />
														</bdi>
														{errorContainer(runforms, "SAT")}
													</div>
													<div className="col-lg-6 col-md-12 col-sm-6 mb-3">
														<label className="comn-label-class">Class Rank</label>
														<bdi className="d-block position-relative">
															<input type="text" className="form-control comn-input-style ps-3" placeholder="Academic ranking" name="classRank" {...formAttr(runforms, "classRank")} />
														</bdi>
														{errorContainer(runforms, "classRank")}
													</div>
													<div className="col-lg-6 col-md-12 col-sm-6 mb-3">
														<label className="comn-label-class">Class Size</label>
														<bdi className="d-block position-relative">
															<input type="text" className="form-control comn-input-style ps-3" placeholder="Class size" name="classSize" {...formAttr(runforms, "classSize")} />
														</bdi>
														{errorContainer(runforms, "classSize")}
													</div>
													<div className="col-lg-6 col-md-12 col-sm-6 mb-3">
														<label className="comn-label-class">AwardsHonors</label>
														<div className="custm-studnt-position px-2">
															<div>
																<div className="tags-input">
																	<ul>
																		{customAwardsHonors?.map((tag, index) => (
																			<li key={index}>
																				<div className="d-flex align-items-center">
																					<div>
																						<span>{tag}</span>
																					</div>
																					<div className="ms-2">
																						<bdi onClick={() => removeAwardsHonors(index)}>
																							<svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
																								<path d="M5.09433 0.0820312L3.00016 2.1762L0.905996 0.0820312L0.0834961 0.904531L2.17766 2.9987L0.0834961 5.09286L0.905996 5.91537L3.00016 3.8212L5.09433 5.91537L5.91683 5.09286L3.82266 2.9987L5.91683 0.904531L5.09433 0.0820312Z" fill="#7B838A" />
																							</svg>
																						</bdi>
																					</div>
																				</div>
																			</li>
																		))}
																	</ul>
																	<div className="border-top">
																		<input type="text" onKeyUp={(e) => addAwardsHonors(e)} placeholder="Type Here" className="niche-input-cust" />
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div className="col-lg-6 col-md-12 col-sm-6 mb-3">
														<label className="comn-label-class">NCAA Clearinghouse registered:</label>
														<bdi className="d-block position-relative">
															<input type="text" className="form-control comn-input-style ps-3" placeholder="NCAA eligibility status" name="NCAA" {...formAttr(runforms, "NCAA")} />
														</bdi>
														{errorContainer(runforms, "NCAA")}
													</div>
													{/* <div className="col-lg-6 col-md-12 col-sm-6 mb-3">
														<label className="comn-label-class">Athletics:</label>
														<bdi className="d-block position-relative">
															<input type="text" className="form-control comn-input-style ps-3" placeholder="Basketball, Volleyball, etc." />
														</bdi>
													</div> */}
													<div className="col-lg-6 col-md-12 col-sm-6 mb-3">
														<label className="comn-label-class">Height</label>
														<bdi className="d-block position-relative">
															<input type="text" className="form-control comn-input-style ps-3" placeholder="5.5’" name="height" {...formAttr(runforms, "height")} />
														</bdi>
														{errorContainer(runforms, "height")}
													</div>
													<div className="col-lg-6 col-md-12 col-sm-6 mb-3">
														<label className="comn-label-class">Weight</label>
														<bdi className="d-block position-relative">
															<input type="text" className="form-control comn-input-style ps-3" placeholder="48 kg" name="weight" {...formAttr(runforms, "weight")} />
														</bdi>
														{errorContainer(runforms, "weight")}
													</div>
													<div className="col-12">
														<div className="categori-main mt-3">
															<div className="text-start mb-2">
																<label className="comn-label-class">Student Athlete Plays</label>
															</div>
															{/* {sportRecord && sportRecord?.length > 0 && sportRecord?.map((item, i) => {
																	return (
																		<label className="cust-chk-bx-soc p-0" key={i}>
																			<input type="checkbox" name={item?.name} checked={checkedState[i]} onChange={(e) => handleCheckboxChange(i, e)} />
																			<span className="cust-chkbox-soc hobby-checkbx">{item?.name}</span>
																		</label>
																	)
																})} */}
															<div className="category-inner-div">
																{sportRecord && sportRecord?.map((item, i) => {
																	return (
																		<label className="cust-chk-bx-soc p-0" key={i}>
																			<input type="checkbox" name={item.name} checked={selectedCheckboxes.map((a) => a) == item.name?.toLowerCase() ? true : false} onChange={handleCheckboxChange} />
																			<span className="cust-chkbox-soc hobby-checkbx">{item.name}</span>
																		</label>
																	)
																})}
															</div>
														</div>
													</div>
													{/* <div className="col-12 mt-3">
														<div className="text-start mb-2">
															<label className="comn-label-class">Sports</label>
															<div className="custm-studnt-position">
																<div><TagsInput value={selected} onChange={setSelected} name="sport" placeHolder="Type here" /></div>
															</div>
														</div>
													</div> */}
													<div className="col-12 mt-3">
														<div className="text-start mb-2">
															<label className="comn-label-class">Select Position</label>
														</div>
														<div className="d-flex flex-wrap">
															<div className="custm-studnt-sport">
																<div className="select-game">
																	<span className="position-relative">
																		Baseball
																	</span>
																</div>
																<div className="ms-auto">
																	<input type="text" placeholder="Enter Position"></input>
																</div>
															</div>

															{selectedSports && selectedSports.length > 0 && selectedSports.map((item, i) => {
																return (
																	<div className="custm-studnt-sport" key={i}>
																		<div className="select-game">
																			<span className="position-relative">
																				{item}
																			</span>
																		</div>
																		<div className="ms-auto">
																			<input type="text" placeholder="Enter Position"></input>
																		</div>
																	</div>
																)
															})
															}
														</div>
													</div>

													<div className="col-12 mt-3">
														<div className="range-area">
															<span className="text-muted">GPA</span>
															<Range min={0} max={4} value={value} onChange={handleSliderChange} />
															<div className="d-flex">
																<span>0.0</span>
																<span className="ms-auto">4.0</span>
															</div>
														</div>
													</div>

													<div className="col-12 mt-3">
														<div className="make-a-deal-top-title">
															<label className="comn-label-class">Events</label>
														</div>
														<div className="cust-soc-icon-main">
															<div className="soc-icon-main">
																<label className="cust-chk-bx-soc p-0">
																	<input type="radio" name="event" defaultChecked />
																	<span className="cust-chkbox-soc event-check-box text-center">
																		<img alt="" src="../assets/images/event-icon1.png" className="img-fluid" />
																		<bdi className="event-txt">Dash</bdi>
																	</span>
																</label>
															</div>
															<div className="soc-icon-main">
																<label className="cust-chk-bx-soc p-0">
																	<input type="radio" name="event" />
																	<span className="cust-chkbox-soc event-check-box text-center">
																		<img alt="" src="../assets/images/event-icon2.png" className="img-fluid" />
																		<bdi className="event-txt">Bench</bdi>
																	</span>
																</label>
															</div>
															<div className="soc-icon-main">
																<label className="cust-chk-bx-soc p-0">
																	<input type="radio" name="event" />
																	<span className="cust-chkbox-soc event-check-box text-center">
																		<img alt="" src="../assets/images/event-icon3.png" className="img-fluid" />
																		<bdi className="event-txt">Vertical</bdi>
																	</span>
																</label>
															</div>
															<div className="soc-icon-main">
																<label className="cust-chk-bx-soc p-0">
																	<input type="radio" name="event" />
																	<span className="cust-chkbox-soc event-check-box text-center">
																		<img alt="" src="../assets/images/event-icon4.png" className="img-fluid" />
																		<bdi className="event-txt">Broad</bdi>
																	</span>
																</label>
															</div>
															<div className="soc-icon-main">
																<label className="cust-chk-bx-soc p-0">
																	<input type="radio" name="event" />
																	<span className="cust-chkbox-soc event-check-box text-center">
																		<img alt="" src="../assets/images/event-icon5.png" className="img-fluid" />
																		<bdi className="event-txt">3 Cone</bdi>
																	</span>
																</label>
															</div>
															<div className="soc-icon-main">
																<label className="cust-chk-bx-soc p-0">
																	<input type="radio" name="event" />
																	<span className="cust-chkbox-soc event-check-box text-center">
																		<img alt="" src="../assets/images/event-icon6.png" className="img-fluid" />
																		<bdi className="event-txt">Shuttle</bdi>
																	</span>
																</label>
															</div>
															<div className="soc-icon-main">
																<label className="cust-chk-bx-soc p-0">
																	<input type="radio" name="event" />
																	<span className="cust-chkbox-soc event-check-box text-center me-0">
																		<img alt="" src="../assets/images/event-icon7.png" className="img-fluid" />
																		<bdi className="event-txt">Shuttle</bdi>
																	</span>
																</label>
															</div>
														</div>
													</div>
													<div className="col-12">
														<div className="categori-main mt-3">
															<div className="text-start">
																<label className="comn-label-class">Position</label>
															</div>
															<div className="category-inner-div position-info">
																<label className="cust-chk-bx-soc p-0">
																	<input type="checkbox" />
																	<span className="cust-chkbox-soc hobby-checkbx">QB</span>
																</label>
																<label className="cust-chk-bx-soc p-0">
																	<input type="checkbox" />
																	<span className="cust-chkbox-soc hobby-checkbx">RB</span>
																</label>
																<label className="cust-chk-bx-soc p-0">
																	<input type="checkbox" />
																	<span className="cust-chkbox-soc hobby-checkbx">WR</span>
																</label>
																<label className="cust-chk-bx-soc p-0">
																	<input type="checkbox" />
																	<span className="cust-chkbox-soc hobby-checkbx">TE</span>
																</label>
																<label className="cust-chk-bx-soc p-0">
																	<input type="checkbox" />
																	<span className="cust-chkbox-soc hobby-checkbx">OL</span>
																</label>
																<label className="cust-chk-bx-soc p-0">
																	<input type="checkbox" />
																	<span className="cust-chkbox-soc hobby-checkbx">DE</span>
																</label>
																<label className="cust-chk-bx-soc p-0">
																	<input type="checkbox" />
																	<span className="cust-chkbox-soc hobby-checkbx">DT</span>
																</label>
																<label className="cust-chk-bx-soc p-0">
																	<input type="checkbox" />
																	<span className="cust-chkbox-soc hobby-checkbx">LB</span>
																</label>
																<label className="cust-chk-bx-soc p-0">
																	<input type="checkbox" />
																	<span className="cust-chkbox-soc hobby-checkbx">CB</span>
																</label>
																<label className="cust-chk-bx-soc p-0">
																	<input type="checkbox" />
																	<span className="cust-chkbox-soc hobby-checkbx">SAF</span>
																</label>
																<label className="cust-chk-bx-soc p-0">
																	<input type="checkbox" />
																	<span className="cust-chkbox-soc hobby-checkbx">SPEC</span>
																</label>
																<label className="cust-chk-bx-soc p-0">
																	<input type="checkbox" />
																	<span className="cust-chkbox-soc hobby-checkbx">ALL</span>
																</label>
															</div>
														</div>
													</div>
													<div className="col-12 mt-3">
														<h4 className="starpro-txt-alert">Starprospect Text Alerts</h4>
														<div>
															<label className="cust-chk-bx mt-3 non-nego-txt">
																<input type="checkbox" id="remember-me" name="remember-me" />
																<span className="cust-chkmark"></span>
																<span>
																	Sign up for activity alerts, special offers, & more! Msg freq may vary. Msg & data rates may apply. Reply HELP for help, STOP to opt-out &nbsp;
																	<span className="term-privacy-class">
																		<Link href="#">
																			Terms & Conditions
																		</Link>
																		<Link href="#">
																			Privacy Policy.
																		</Link>
																	</span>
																</span>
															</label>
														</div>
													</div>
													<div className="col-12">
														<label className="mt-3 non-nego-txt">
															<bdi>Profile Privacy Settings</bdi>
															<p className="mt-2">Choose who can see your profile (can be changed later)</p>
														</label>

														<div className="row">
															<div className="col-xl-4 col-lg-8 col-md-6 my-3">
																<bdi className="d-block position-relative">
																	<select className="comn-input-style form-select w-100 ps-3">
																		<option>Everyone</option>
																		<option>Friends</option>
																		<option>Only Me</option>
																	</select>
																</bdi>
															</div>
														</div>
														<div className="row">
															<div className="col-xxl-3 col-xl-4 mt-3 col-md-6 mx-md-0 mx-sm-auto">
																<button
																	className="comn-btn-class w-100"
																	type="button"
																	onClick={() => {
																		props.setProfileState({
																			...props.profileState,
																			editProfile: false,
																			post: false,
																		});
																	}}
																>
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
					</div>
				</div>
			</section>
		</>
	)
}
