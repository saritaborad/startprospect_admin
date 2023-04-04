import React, { useContext, useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Tab, Nav, Modal } from "react-bootstrap";
import Select from "react-select";
import MainLayout from "../Components/Layout/MainLayout";
import { FetchPostApi, ImagePostApi } from "../Api/apiServices";
import { toast } from "react-toastify";
import { API_Path, errorContainer, formAttr } from "../Api/Const";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import roleContext from "../contexts/roleContext";
import ProfileLayout from "../Components/ProfileLayout/MainProfileLayout";
import UploadCam from "../assets/images/Profile-cam-icon.svg";
import Loader from "../Components/Loader/Loader";
import NewsFeedModal from "../Components/AllModals/NewsFeedModal";
import AddNewPost from "./Common/AddNewPost";

export default function CoachProfile() {
	const context = useContext(roleContext);
	const contect = useRef();
	const [newsfeed, setNewsfeed] = useState(false);
	const [defultview, setdefultview] = useState(true);
	const [ediprofiledivshow, setediprofiledivshow] = useState(false);
	const [shownewpostdiv, setshownewpostdiv] = useState(false);
	const [flag, setFlag] = useState(true);

	const [selectedsports, setselectedsports] = useState([]);
	const [profileData, setProfileData] = useState([]);
	const [country, setcountry] = useState("");
	const [profile_img, setProfile_img] = useState("");
	// const [propertyImage, setPropertyImage] = useState([]);
	const [neewsFeedData, setNeewsFeedData] = useState([]);
	const [customAchivement, setCustomAchivement] = useState([]);
	const [buttonType, setButtonType] = useState("button");
	const [profilePicture, setprofilePicture] = useState('');
	const [selectedPostId, setselectedPostId] = useState('');
	const [allPosts, setAllPosts] = useState([]);

	const options = [
		{ label: "Basketball", value: "basketball" },
		{ label: "Cricket", value: "cricket" },
		{ label: "Football", value: "football" },
		{ label: "Rugby", value: "rugby" },
		{ label: "Baseball", value: "baseball" },
		{ label: "Hockey", value: "hockey" },
	];

	useEffect(() => {
		setProfileData(context?.profiledata);
		setProfile_img(context?.profiledata?.profile_img);
		if (context?.profiledata?.achievement && context?.profiledata?.achievement?.length > 0) {
			setCustomAchivement(context?.profiledata?.achievement)
		}
	}, [context.profiledata]);

	useEffect(() => {
		setFlag(context?.flag)
		setprofilePicture(context?.profilePicture)
	}, [context]);

	useEffect(() => {
		setcountry(context.country);
	}, [context.profiledata, context.country]);
	useEffect(() => {
		getAllPosts()
	}, [profileData])


	const PhonehandleOnChange = (value) => {
		let temp = "+" + value;
		contect.current.setFieldValue("contact_no", temp);
	};

	const editprofiledivshowhandel = () => {
		if (profileData?.sports?.length > 0) {
			const selectedCompany = profileData?.sports?.filter((val) => options.includes(val?.value));
			setselectedsports(selectedCompany);
		}
		setdefultview(false);
		setshownewpostdiv(false);
		setediprofiledivshow(true);
	};

	const closeeditprofiledivshowhandel = () => {
		setshownewpostdiv(false);
		setediprofiledivshow(false);
		setdefultview(true);
		setselectedsports("");
	};

	const handlenewpost = () => {
		setediprofiledivshow(false);
		setdefultview(false);
		setshownewpostdiv(true);
	};

	const closehandlenewpost = () => {
		setshownewpostdiv(false);
		setediprofiledivshow(false);
		setdefultview(true);
		// setPropertyImage([]);
	};

	const selectehandelchange = (sportname) => {
		let temp_array_head = sportname.map((c) => c.value);
		if (temp_array_head.length > 0) {
			contect.current.setFieldValue("sports", temp_array_head);
			setselectedsports(sportname);
		} else {
			contect.current.setFieldValue("sports", "");
			setselectedsports([]);
		}
	};

	const submitProEditedfile = async (formdata) => {
		if (profile_img) {
			context.setprofilePicture(profile_img)
		}
		let data = {
			name: formdata.name,
			user_name: formdata.user_name,
			email: formdata.email,
			contact_no: formdata.contact_no,
			DOB: formdata.DOB,
			gender: formdata.gender,
			univercity: formdata.univercity,
			address: formdata.address,
			company_name: formdata.company_name,
			sports: formdata.sports,
			cover_img: formdata.cover_img,
			profile_img: profile_img,
			achievement: customAchivement
		};
		let result = await FetchPostApi(API_Path.editProfile, data);
		let editUserData = await result.json();
		if (result.status === 200) {
			toast.success(editUserData.message);
			setProfileData(editUserData.data);
			setediprofiledivshow(false);
			setdefultview(true);
		} else {
			toast.error(editUserData.message);
		}
	};

	const profileimgupdate = async (e) => {
		if (e.target.files[0]) {
			let formData = new FormData();
			formData.append("images", e.target.files[0]);
			// let data = new FormData();
			// data.append("images", e.target.files);
			let result = await ImagePostApi(API_Path.addImage, formData);
			let getImage = await result.json();
			if (result.status === 200) {
				setProfile_img(getImage.data.img[0]);
			} else {
				toast.error(getImage.message);
			}
		}
	};

	const handlegetNeewdata = (id) => {
		setselectedPostId(id)
		setNewsfeed(true)
	}

	const addAchivements = (e) => {
		if (e.key === "Enter" && e.target.value !== "") {
			setCustomAchivement([...customAchivement, e.target.value]);
			e.target.value = "";
		}
	};

	const removeAchivements = (index) => {
		const updatedAchievements = [...customAchivement];
		updatedAchievements.splice(index, 1);
		setCustomAchivement(updatedAchievements);
	};

	function handleClick() {
		setButtonType("submit");
	}
	const getAllPosts = async () => {
		let result = await FetchPostApi(API_Path.postData, { user_id: profileData?._id });
		let getAthlete = await result.json();
		if (result.status === 200) {
			setAllPosts(getAthlete?.data);
		} else {
			toast.error(getAthlete.message);
		}
	};

	return (
		<>
			<MainLayout>
				<section className="gray-bg-section">
					<div className="container">
						{flag ? (
							<Loader />
						) : (<div className="row me-0">
							<div className="col-xl-2 col-md-3 ">
								<ProfileLayout />
							</div>
							<div className="col-xl-10 col-md-9 pe-0">
								{defultview && (
									<div className="row">
										<div className="col-12 mb-3">
											<div className="mt-3 mt-md-0 tabs-heading-txt">
												<h5 className="mb-0">Profile</h5>
											</div>
										</div>
										<div className="col-lg-4 ">
											<div className="custm-profile-detail h-auto">
												<div className="player-detail p-3">
													<div className=" text-center">
														<img src={profileData?.profile_img ? profileData?.profile_img : require("../assets/images/defaultProPic.png")} alt="coach profile" />
													</div>
													<div className="athelete-name-txt text-center ms-0">
														<label className="d-block">{profileData?.name}</label>
														<p className="mb-0">Basketball-Golden State Warrious</p>
													</div>
													{profileData?.sports?.length > 0 && (
														<div className="mt-2">
															<span>
																Sports :
																{profileData?.sports?.length > 0 &&
																	profileData.sports.map((item, i) => (
																		<>
																			<b key={i}>{item}</b>
																			{i < profileData.sports.length - 1 && ' | '}
																		</>
																	))
																}
															</span>
														</div>
													)}
													<div className="mt-2">
														<div className="mb-1">
															<bdi>
																<svg className="me-2" width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path d="M10.0007 0.5L0.833984 5.5L4.16732 7.31667V12.3167L10.0007 15.5L15.834 12.3167V7.31667L17.5007 6.40833V12.1667H19.1673V5.5L10.0007 0.5ZM15.684 5.5L10.0007 8.6L4.31732 5.5L10.0007 2.4L15.684 5.5ZM14.1673 11.325L10.0007 13.6L5.83398 11.325V8.225L10.0007 10.5L14.1673 8.225V11.325Z" fill="url(#paint0_linear_3601_34027)" />
																	<defs>
																		<linearGradient id="paint0_linear_3601_34027" x1="1.574" y1="3.66011" x2="21.1905" y2="7.97025" gradientUnits="userSpaceOnUse">
																			<stop stopColor="#6A58FB" />
																			<stop offset="1" stopColor="#4599F4" />
																		</linearGradient>
																	</defs>
																</svg>
																{profileData?.univercity}</bdi>
														</div>
														<div className="mb-1">


															<bdi><svg className="me-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
																<g clipPath="url(#clip0_3601_34031)">
																	<path d="M9.99935 1.6665C6.77435 1.6665 4.16602 4.27484 4.16602 7.49984C4.16602 11.8748 9.99935 18.3332 9.99935 18.3332C9.99935 18.3332 15.8327 11.8748 15.8327 7.49984C15.8327 4.27484 13.2243 1.6665 9.99935 1.6665ZM5.83268 7.49984C5.83268 5.19984 7.69935 3.33317 9.99935 3.33317C12.2993 3.33317 14.166 5.19984 14.166 7.49984C14.166 9.89984 11.766 13.4915 9.99935 15.7332C8.26602 13.5082 5.83268 9.87484 5.83268 7.49984Z" fill="url(#paint0_linear_3601_34031)" />
																	<path d="M9.99935 9.58317C11.1499 9.58317 12.0827 8.65043 12.0827 7.49984C12.0827 6.34924 11.1499 5.4165 9.99935 5.4165C8.84876 5.4165 7.91602 6.34924 7.91602 7.49984C7.91602 8.65043 8.84876 9.58317 9.99935 9.58317Z" fill="url(#paint1_linear_3601_34031)" />
																</g>
																<defs>
																	<linearGradient id="paint0_linear_3601_34031" x1="4.63694" y1="5.17774" x2="17.5188" y2="6.79879" gradientUnits="userSpaceOnUse">
																		<stop stopColor="#6A58FB" />
																		<stop offset="1" stopColor="#4599F4" />
																	</linearGradient>
																	<linearGradient id="paint1_linear_3601_34031" x1="8.0842" y1="6.29431" x2="12.6114" y2="7.10817" gradientUnits="userSpaceOnUse">
																		<stop stopColor="#6A58FB" />
																		<stop offset="1" stopColor="#4599F4" />
																	</linearGradient>
																	<clipPath id="clip0_3601_34031">
																		<rect width="20" height="20" fill="white" />
																	</clipPath>
																</defs>
															</svg>{profileData?.address}</bdi>

														</div>
													</div>
													<div className="d-flex">
														<button className="comn-white-btn w-100 mt-3" data="Post" onClick={() => handlenewpost()}></button>
														<button className="comn-white-btn w-100 ms-2 mt-3" data="Edit Profile" onClick={() => editprofiledivshowhandel()}></button>
													</div>
												</div>
											</div>
										</div>
										<div className="col-lg-8  mt-3 mt-lg-0">
											<div className="">
												<Tab.Container id="left-tabs-example" defaultActiveKey="newsfeed">
													<div className="comn-tab-sec  position-relative">
														<Nav variant="pills">
															<Nav.Item>
																<Nav.Link eventKey="newsfeed">Newsfeed</Nav.Link>
															</Nav.Item>
														</Nav>
													</div>
													<Tab.Content>
														<Tab.Pane eventKey="newsfeed">
															<div className="mt-3 Atheletes-news-feed ">
																{allPosts && allPosts?.length > 0
																	? allPosts?.map((item) => {
																		return (
																			<div className="fix-col-news mb-3" onClick={() => handlegetNeewdata(item?._id)}>
																				<div className="deal-newsfeed-tab">{item?.images[0].includes(".mp4") ? <video src={item?.images[0]} className="img-fluid" alt="" controls /> : <img src={item?.images[0]} className="img-fluid" alt="" />}</div>
																			</div>
																		);
																	})
																	: "No Data Available"}
															</div>
														</Tab.Pane>
													</Tab.Content>
												</Tab.Container>
											</div>
										</div>
									</div>)
								}
								{/* ==================================== PROFILE EDIT DETAILS ======================================= */}
								{ediprofiledivshow && (
									<div className="top-athlete-box">
										<Formik
											innerRef={contect}
											enableReinitialize={true}
											initialValues={{
												name: profileData.name ? profileData.name : "",
												user_name: profileData.user_name ? profileData.user_name : "",
												univercity: profileData.univercity ? profileData.univercity : "",
												address: profileData.address ? profileData.address : "",
												email: profileData.email ? profileData.email : "",
												DOB: profileData.DOB ? profileData.DOB : "",
												contact_no: profileData.contact_no ? profileData.contact_no : "",
												sports: profileData?.sports,
											}}
											validationSchema={Yup.object({
												name: Yup.string().required("name is required."),
												user_name: Yup.string().required("user name is required."),
												univercity: Yup.string().required("university name  is required."),
												address: Yup.string().required("address  is required."),
												email: Yup.string().required("email is required."),
												DOB: Yup.string().required("DOB is required."),
												contact_no: Yup.string().required("contect number is required."),
												sports: Yup.array().required("sports is required."),
											})}
											onSubmit={(formData, { resetForm }) => submitProEditedfile(formData, resetForm)}
										>
											{(runform) => (
												<form className="row me-0" onSubmit={runform.handleSubmit}>
													<div className="col-12 pe-0">
														<div className="mt-3 mt-md-0 tabs-heading-txt">
															<h5 className="mb-0">Profile</h5>
														</div>
													</div>
													<div className="col-12 mt-3 pe-0">
														<div className="team-info-main p-3">
															<div className="d-md-block d-flex justify-content-center">
																<div className="student-profile-img position-relative">
																	<img src={profile_img ? profile_img : require("../assets/images/defaultProPic.png")} className="img-fluid" alt="" />
																	<div className="stud-pro-cam">
																		<label htmlFor="upload-img">
																			<input type="file" id="upload-img" name="upload-img" hidden accept=".png, .jpg, .jpeg" onChange={(e) => profileimgupdate(e)} />
																			<img src={UploadCam} alt="" />
																		</label>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div className="col-lg-6 col-sm-6 mt-3 pe-0">
														<label className="comn-label-class">Name</label>
														<bdi className="d-block position-relative">
															<input type="text" className="form-control comn-input-style ps-3" placeholder="Enter Your Name" name="name" {...formAttr(runform, "name")} />
														</bdi>
														{errorContainer(runform, "name")}
													</div>
													<div className="col-lg-6 col-sm-6 mt-3 pe-0">
														<label className="comn-label-class">Username</label>
														<bdi className="d-block position-relative">
															<input type="text" name="user_name" className="form-control comn-input-style ps-3" placeholder="Enter Your Username" {...formAttr(runform, "user_name")} />
														</bdi>
														{errorContainer(runform, "user_name")}
													</div>
													<div className="col-lg-6 col-sm-6 mt-3 pe-0">
														<label className="comn-label-class">School or Collage</label>
														<bdi className="d-block position-relative">
															<input type="text" name="univercity" className="form-control comn-input-style ps-3" placeholder="Enter Your School or Collage Name" {...formAttr(runform, "univercity")} />
														</bdi>
														{errorContainer(runform, "univercity")}
													</div>
													<div className="col-lg-6 col-sm-6 mt-3 pe-0">
														<label className="comn-label-class">Address</label>
														<bdi className="d-block position-relative">
															<input type="text" name="address" className="form-control comn-input-style ps-3" placeholder="Enter Address" {...formAttr(runform, "address")} />
														</bdi>
														{errorContainer(runform, "address")}
													</div>
													<div className="col-lg-6 col-sm-6 mt-3 pe-0">
														<label className="comn-label-class">Email Address</label>
														<bdi className="d-block position-relative">
															<input type="email" name="email" className="form-control comn-input-style ps-3" placeholder="Enter Your Email" {...formAttr(runform, "email")} />
														</bdi>
														{errorContainer(runform, "email")}
													</div>
													<div className="col-lg-6 col-sm-6 mt-3 pe-0">
														<label className="comn-label-class">Phone Number</label>
														<bdi className="d-block position-relative">
															<PhoneInput inputExtraProps={{ inputClass: "form-control input-style", required: true, autoFocus: true }} value={profileData.contact_no} country={country} onChange={PhonehandleOnChange} />
														</bdi>
														{errorContainer(runform, "contact_no")}
													</div>
													<div className="col-lg-6 col-sm-6 mt-3 pe-0">
														<label className="comn-label-class">Date Of Birth</label>
														<bdi className="d-block position-relative">
															<input type="date" name="DOB" className="form-control comn-input-style ps-3" {...formAttr(runform, "DOB")} />
														</bdi>
														{errorContainer(runform, "DOB")}
													</div>
													<div className="col-lg-6 col-sm-6 mt-3 pe-0">
														<label className="comn-label-class">Achivements</label>
														<div className="custm-studnt-position px-2">
															<div>
																<div className="tags-input">
																	<ul>
																		{customAchivement?.map((tag, index) => (
																			<li key={index}>
																				<div className="d-flex align-items-center">
																					<div>
																						<span>{tag}</span>
																					</div>
																					<div className="ms-2">
																						<bdi onClick={() => removeAchivements(index)}>
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
																		<input type="text" onKeyUp={(e) => addAchivements(e)} placeholder="Type Here" className="niche-input-cust" />
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div className="col-lg-6 col-sm-6 mt-3 pe-0">
														<label className="comn-label-class">Choose Your Sports</label>
														<bdi className="d-block position-relative choose-sport-class p-2">
															<Select
																selectedsports={selectedsports}
																isMulti
																options={options}
																defaultValue={profileData?.sports.map((item) => {
																	return { value: item?.toLowerCase(), label: item };
																})}
																onChange={selectehandelchange}
															/>
															<span className=" sport-left-icon coach-sport-ball">
																<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 3.3L12.35 2.35C14.17 2.91 15.72 4.11 16.73 5.69L16.34 7.03L14.99 7.49L11 4.7V3.3ZM7.65 2.35L9 3.3V4.7L5.01 7.49L3.66 7.03L3.27 5.69C4.28 4.12 5.83 2.92 7.65 2.35ZM5.08 15.11L3.94 15.21C2.73 13.81 2 11.99 2 10C2 9.88 2.01 9.77 2.02 9.65L3.02 8.92L4.4 9.4L5.86 13.74L5.08 15.11ZM12.5 17.59C11.71 17.85 10.87 18 10 18C9.13 18 8.29 17.85 7.5 17.59L6.81 16.1L7.45 15H12.56L13.2 16.11L12.5 17.59ZM12.27 13H7.73L6.38 8.98L10 6.44L13.63 8.98L12.27 13ZM16.06 15.21L14.92 15.11L14.13 13.74L15.59 9.4L16.98 8.93L17.98 9.66C17.99 9.77 18 9.88 18 10C18 11.99 17.27 13.81 16.06 15.21Z" fill="#7B838A" />
																</svg>
															</span>
														</bdi>
														{errorContainer(runform, "sports")}
													</div>
													<div className="col-12 pe-0">
														<div className="row">
															<div className="col-xxl-3 col-xl-4 col-md-6 mt-3 mx-md-0 mx-sm-auto d-flex">
																<button className="comn-btn-class me-2" type={buttonType} onClick={handleClick}>
																	Save
																</button>
																<button className="comn-btn-class" type="reset" onClick={closeeditprofiledivshowhandel}>
																	cancel
																</button>
															</div>
														</div>
													</div>
												</form>
											)}
										</Formik>
									</div>
								)}
								{/* ================== NEW POST  ================== */}
								{shownewpostdiv && (
									<>
										<AddNewPost closehandlenewpost={closehandlenewpost}/>
									</>
								)}
							</div>
						</div>)}
					</div>
				</section>
				{/* ================ Newsfeed ==================== */}
				{newsfeed && (
					<Modal show={newsfeed} backdrop="static" onHide={() => setNewsfeed(false)} size="xl" className="save-player-modal m-0 p-0" aria-labelledby="contained-modal-title-vcenter" centered>
						<Modal.Header closeButton className="border-0"></Modal.Header>
						<Modal.Body className="">
							<NewsFeedModal selectedPostId={selectedPostId} />
						</Modal.Body>
					</Modal>
				)}
			</MainLayout>
		</>
	);
}
