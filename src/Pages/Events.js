import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import MainLayout from "../Components/Layout/MainLayout";
import ProfileLayout from "../Components/ProfileLayout/MainProfileLayout";
import StudentProfileLayout from "../Components/ProfileLayout/StudentProfileLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRef, useContext } from "react";
import PlacesAutocomplete, { geocodeByPlaceId } from "react-places-autocomplete";
import roleContext from "../contexts/roleContext";
import { FetchPostApi } from "../Api/apiServices";
import { API_Path, errorContainer, formAttr, getTime, GoogleAddressKEY } from "../Api/Const";
import { toast } from "react-toastify";
import Googlemap from "./Map";
import EventDetails from "./EventDetails";
import Loader from "../Components/Loader/Loader";
import CoachTeamModal from "../Components/AllModals/CoachTeamModal";

export default function Events() {
	const contect1 = useRef();
	const contect = useRef();
	const context = useContext(roleContext);

	const [latitude, setLatitude] = useState("60.2517722");
	const [longitude, setLongitude] = useState("24.8989093");
	const [address, setAddress] = useState("");
	const [selectlocation, setSelectLocation] = useState(false);
	const [signupType, setSignupType] = useState("")
	const [eventState, setEventState] = useState({ eventCreate: false, eventDetail: false });
	const [selectteam, setSelectTeam] = useState(false);
	const [reapeat, setReapeat] = useState(false);
	const [repetsType, setrepetsType] = useState({ SelectType: "Never", weekdays: [] });
	const [eventFormData, setEventFormData] = useState();
	const [handleRadio, sethandleRadio] = useState("");
	const [toggle, setToggle] = useState(false);
	const [eventType, seteventType] = useState({ team: "", event_type: "" });
	const [rType, setRType] = useState("");
	const [eType, setEType] = useState("");
	const [searchEvent, setSearchEvent] = useState("");
	const [eventID, seteventID] = useState("");
	const [loader, setloader] = useState(false);
	const [loaderTeam, setLoaderTeam] = useState(false);
	const [loading, setloading] = useState(false);
	const [serchData, setserchData] = useState(null);
	const [onGoingOption, setonGoingOption] = useState({ sizePerPage: 8, search: { team_name: "" }, page: 0, sort: "createdAt", order: "ASC" });
	const [ongoingData, setOngoingData] = useState([]);
	const [totalOnGoingLimit, setTotalOnGoingLimit] = useState('');
	const [upComingOption, setupComingOption] = useState({ sizePerPage: 8, search: { team_name: "" }, page: 0, sort: "createdAt", order: "ASC" });
	const [upComingData, setupComingData] = useState('');
	const [totalUpCominglimit, settotalUpCominglimit] = useState('');
	const [completedOption, setCompletedOption] = useState({ sizePerPage: 8, search: { team_name: "" }, page: 0, sort: "createdAt", order: "ASC" });
	const [completedData, setCompletedData] = useState('');
	const [totalCompletedData, settotalCompletedData] = useState('');
	const [timer, setTimer] = useState(null);;

	useEffect(() => {
		setSignupType(context?.signup_type)
	}, [context?.signup_type]);

	useEffect(() => {
		handleOnGoingEvent(onGoingOption)
	}, [onGoingOption.page])

	useEffect(() => {
		handleUpComingEvent(upComingOption)
	}, [upComingOption.page])

	useEffect(() => {
		handleCompletedEvent(completedOption)
	}, [completedOption.page])

	const inputChanged = async (e) => {
		setserchData(e.target.value)
		setonGoingOption({ ...onGoingOption, search: { team_name: e.target.value } })
		setupComingOption({ ...upComingOption, search: { team_name: e.target.value } })
		setCompletedOption({ ...completedOption, search: { team_name: e.target.value } })
		clearTimeout(timer);
		const newTimer = setTimeout(() => {
			handleOnGoingEvent({ ...onGoingOption, search: { team_name: e.target.value } })
			handleUpComingEvent({ ...upComingOption, search: { team_name: e.target.value } })
			handleCompletedEvent({ ...completedOption, search: { team_name: e.target.value } })
		}, 1000);
		setTimer(newTimer);
	}

	const formatTimeFuture = (date) => {
		const futureDate = new Date(date).getTime();
		const currentTime = new Date().getTime();
		const SECOND = 1000;
		const MINUTE = SECOND * 60;
		const HOUR = MINUTE * 60;
		const DAY = HOUR * 24;
		const timeDifference = futureDate - currentTime;

		const days = Math.floor(timeDifference / DAY);
		const hours = Math.floor((timeDifference % DAY) / (1000 * 60 * 60));
		const minutes = Math.floor((timeDifference % HOUR) / (1000 * 60));
		const seconds = Math.floor((timeDifference % MINUTE) / 1000);
		if (days !== 0) {
			return days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds left";
		} else if (hours !== 0) {
			return hours + " hours " + minutes + " minutes " + seconds + " seconds left";
		} else if (minutes !== 0) {
			return minutes + " minutes " + seconds + " seconds left";
		} else if (seconds !== 0) {
			return seconds + " seconds left";
		}
	};

	const handleOnGoingEvent = async (options) => {
		setLoaderTeam(true)
		setloading(true)
		let result = await FetchPostApi(API_Path.getOnGoingEvent, { user_id: context?.user_id, options: options });
		let onGoing = await result.json();
		if (result.status === 200) {
			setOngoingData([...ongoingData, ...onGoing.data.data])
			setTotalOnGoingLimit(onGoing?.data?.totalRecord)
			setloading(false)
			setLoaderTeam(false)

		} else {
			toast.error(onGoing.message);
			setloading(false)
			setLoaderTeam(false)

		}
	}

	const handleUpComingEvent = async (options) => {
		setLoaderTeam(true)
		setloading(true)
		let result = await FetchPostApi(API_Path.getUpComingEvent, { user_id: context?.user_id, options: options });
		let upComing = await result.json();
		if (result.status === 200) {
			setupComingData([...upComingData, ...upComing.data.data])
			settotalUpCominglimit(upComing?.data?.totalRecord)
			setloading(false)
			setLoaderTeam(false)

		} else {
			toast.error(upComing.message);
			setloading(false)
			setLoaderTeam(false)

		}
	}

	const handleCompletedEvent = async (options) => {
		setLoaderTeam(true)
		setloading(true)
		let result = await FetchPostApi(API_Path.getCompletedEvent, { user_id: context?.user_id, options: options });
		let completed = await result.json();
		if (result.status === 200) {
			if (serchData != null) {
				setCompletedData(completed.data.data)
			} else setCompletedData([...completedData, ...completed.data.data])
			settotalCompletedData(completed?.data?.totalRecord)
			setloading(false)
			setLoaderTeam(false)

		} else {
			toast.error(completed.message);
			setloading(false)
			setLoaderTeam(false)
		}
	}

	const handleCoachSelectTeam = () => {
		setSelectTeam(true)
	}

	const handleDay = (e) => {
		if (e.target.checked) {
			setrepetsType({ ...repetsType, ...{ weekdays: [...repetsType.weekdays, e.target.id] } });
		} else {
			let removeDay = repetsType?.weekdays?.filter((x) => x !== e.target.id);
			setrepetsType({ ...repetsType, ...{ weekdays: [...removeDay] } });
		}
	};
	const SelectedTypeHandle = (e) => {
		setRType(e.target.value);
		setrepetsType({
			SelectType: e.target.value,
			weekdays: [],
		});
	};

	const handleEventClick = (type, id) => {
		setEventState({ ...eventState, [type]: true });
		seteventID(id);
	};

	const weekdayNumber = repetsType?.weekdays.map((str) => {
		return parseInt(str);
	});

	const createEvent = async (formdata) => {
		setloader(true);
		let data = {
			coach: context?.user_id,
			team: eventType?.team,
			event_type: eventType?.event_type,
			venue: { name: address, latitude: Number(latitude), longitude: Number(longitude) },
			opponent: eventType?.event_type === "Game" ? formdata?.Opponent : "",
			all_day_event: formdata?.toggle === false ? 0 : 1,
			start_date: new Date(formdata?.start_date),
			arrive: formdata?.arrival,
			repeats: repetsType?.SelectType === "Monthly" ? 4 : repetsType?.SelectType === "Day" ? 1 : repetsType?.SelectType === "Weekly" ? 2 : 0,
			note: formdata?.Notes,
			status: Number(formdata?.Status),
		};
		if (formdata?.toggle === false) {
			data.event_duration = formdata?.event_duration;
		}
		if (repetsType?.SelectType !== "Never") {
			data.end_date = eventFormData?.end_date;
		}
		if (repetsType?.SelectType === "Weekly") {
			data.weekdays = weekdayNumber;
		}
		if (repetsType?.SelectType === "Monthly") {
			eventFormData?.plan === "basic" ? (data.everymonth = 0) : (data.everymonth = 1);
		}
		if (repetsType?.SelectType === "Monthly") {
			eventFormData?.plan === "basic"
				? (data.day_number = eventFormData?.numberMonth)
				: (data.on_the_day = {
					week_number: Number(eventFormData?.selectWeek),
					day_name: Number(eventFormData?.selectDayName),
				});
		}
		let result = await FetchPostApi(API_Path.createEvent, data);
		let CreateEvenT = await result.json();
		if (result.status === 200) {
			setEventState({ ...eventState, eventDetail: false, eventCreate: false });
			setloader(false);
		} else {
			toast.error(CreateEvenT.message);
			setloader(false);
		}
	};

	const eventRepeatSet = (formdata) => {
		setEventFormData(formdata);
		closeRepeatModal();
	};
	const closeRepeatModal = () => {
		setReapeat(false);
	};

	const handleSelectAddress = async (address, placeId) => {
		const [place] = await geocodeByPlaceId(placeId);
		var lat = place.geometry.location.lat();
		var lng = place.geometry.location.lng();
		setAddress(place.formatted_address);
		contect1.current.setFieldValue("Venue", place.formatted_address);
		setLatitude(lat.toString());
		setLongitude(lng.toString());
	};

	const handleChangeAddress = (address) => {
		setAddress(address);
	};
	const handleEventType = (e) => {
		seteventType({ ...eventType, event_type: e.target.value });
		setEType(e.target.value);
	};

	return (
		<MainLayout>
			<section className="gray-bg-section">
				<div className="container">
					<div className="row me-0">
						<div className="col-xl-2 col-md-3 ">
							{signupType == 4 ? <StudentProfileLayout /> : <ProfileLayout />}
						</div>
						<div className="col-xl-10 col-md-9 pe-0">
							{loaderTeam ? (
								<Loader />
							) : (
								eventState.eventCreate === false && eventState.eventDetail === false && (
									<>
										<div className="row">
											<div className="col-12">
												<div className="d-md-flex align-items-center">
													<div className="mt-3 mt-lg-0 tabs-heading-txt">
														<h5>Event</h5>
													</div>
													{signupType !== 1 && signupType !== 5 && <div className="position-relative ms-auto mt-3 mt-md-0">
														<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6C6A81" className="bi bi-search fix-in-icon" viewBox="0 0 16 16">
															<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
														</svg>
														<input type="input" className="form-control login-comn-input searchbar ps-5" placeholder="Search" value={onGoingOption.search.name} onChange={(e) => inputChanged(e)} />
													</div>}
													{signupType === 3 && <div className="ps-md-3 mt-3 mt-md-0">
														<button className="comn-btn-class px-4" onClick={handleCoachSelectTeam}>
															Create Event
														</button>
													</div>}
												</div>
											</div>
										</div>
										<div className="row me-0">
											<div className="col-12 mt-3 pe-0">
												<mark className="event-mark">Ongoing</mark>
											</div>
											<div className="col-12 mt-3 event-type">
												<div className="row">
													{ongoingData && ongoingData?.length > 0 ?
														ongoingData?.map((item) => {
															return (
																<div className="col-xl-3 col-md-4 col-sm-6 mt-3 pe-0">
																	<div className="team-box-class position-relative" onClick={() => handleEventClick("eventDetail", item?.event_id)}>
																		<div className="team-img-div mx-auto position-relative">
																			<img src={item?.team_img} alt="" />
																		</div>
																		<span className="event-share-icon">
																			<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
																				<path d="M13.5833 17.3352C12.6816 17.3456 11.827 16.9336 11.2735 16.2216C10.7201 15.5097 10.5316 14.5798 10.7642 13.7085L5.54749 10.7269C4.64607 11.5527 3.32473 11.7275 2.23957 11.1644C1.1544 10.6014 0.536556 9.42038 0.692801 8.20786C0.849045 6.99534 1.7461 6.00956 2.93856 5.73998C4.13101 5.4704 5.36488 5.97445 6.0275 7.00186L10.7633 4.29436C10.7021 4.06285 10.6696 3.82466 10.6667 3.58519C10.6547 2.19079 11.6232 0.979477 12.986 0.68421C14.3488 0.388943 15.7318 1.09081 16.298 2.36512C16.8643 3.63943 16.4583 5.13621 15.3258 5.94978C14.1933 6.76335 12.6452 6.67027 11.6183 5.72686L6.4925 8.65602C6.48742 8.87213 6.45722 9.0869 6.40249 9.29603L11.6183 12.2769C12.5785 11.3956 14.0073 11.2596 15.1166 11.9438C16.2258 12.628 16.7455 13.9658 16.389 15.2194C16.0325 16.473 14.8866 17.3371 13.5833 17.3352ZM13.5833 13.1685C12.893 13.1685 12.3333 13.7282 12.3333 14.4185C12.3333 15.1089 12.893 15.6685 13.5833 15.6685C14.2737 15.6685 14.8333 15.1089 14.8333 14.4185C14.8333 13.7282 14.2737 13.1685 13.5833 13.1685ZM3.58333 7.33519C2.89297 7.33519 2.33333 7.89484 2.33333 8.58519C2.33333 9.27555 2.89297 9.83519 3.58333 9.83519C4.27368 9.83519 4.83333 9.27555 4.83333 8.58519C4.83333 7.89484 4.27368 7.33519 3.58333 7.33519ZM13.5833 2.33519C12.893 2.33519 12.3333 2.89484 12.3333 3.58519C12.3333 4.27555 12.893 4.83519 13.5833 4.83519C14.2737 4.83519 14.8333 4.27555 14.8333 3.58519C14.8333 2.89484 14.2737 2.33519 13.5833 2.33519Z" fill="#7B838A" />
																			</svg>
																		</span>
																		<div className="team-body-txt">
																			<span>{item?.team_name}</span>
																			<div className="set-team-des">
																				<p className="position-relative">{"Venue: " + item?.venue?.name}</p>
																				<div className="even-time-btn">Ongoing {getTime(item?.start_date)} - {item?.all_day_event === 0 ? getTime(item?.end_date) : "11:59:59 PM"}</div>
																			</div>
																		</div>
																	</div>
																</div>
															);
														}) : <div className="postNotFound">No events currently in progress</div>}
													{ongoingData && ongoingData?.length > 0 && totalOnGoingLimit > ongoingData.length && <div className="col-md-12 text-center my-3">
														<button className="pagination-button load-more-btn-cust py-1 px-2" type='button' onClick={() => setonGoingOption({ ...onGoingOption, page: onGoingOption.page + 1 })} >{loading ? "Loading..." : "Load More"}</button>
													</div>}
												</div>
											</div>
										</div>
										<div className="row me-0">
											<div className="col-12 mt-3 pe-0">
												<mark className="event-mark">Upcoming</mark>
											</div>
											<div className="col-12 mt-3 event-type">
												<div className="row">
													{upComingData && upComingData?.length > 0 ?
														upComingData?.map((item) => {
															return (
																<div className="col-xl-3 col-md-4 col-sm-6 mt-3 pe-0" key={item?._id}>
																	<div className="team-box-class position-relative" onClick={() => handleEventClick("eventDetail", item?.event_id)}>
																		<div className="team-img-div mx-auto position-relative">
																			<img src={item?.team_img} alt="" />
																		</div>
																		<span className="event-share-icon">
																			<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
																				<path d="M13.5833 17.3352C12.6816 17.3456 11.827 16.9336 11.2735 16.2216C10.7201 15.5097 10.5316 14.5798 10.7642 13.7085L5.54749 10.7269C4.64607 11.5527 3.32473 11.7275 2.23957 11.1644C1.1544 10.6014 0.536556 9.42038 0.692801 8.20786C0.849045 6.99534 1.7461 6.00956 2.93856 5.73998C4.13101 5.4704 5.36488 5.97445 6.0275 7.00186L10.7633 4.29436C10.7021 4.06285 10.6696 3.82466 10.6667 3.58519C10.6547 2.19079 11.6232 0.979477 12.986 0.68421C14.3488 0.388943 15.7318 1.09081 16.298 2.36512C16.8643 3.63943 16.4583 5.13621 15.3258 5.94978C14.1933 6.76335 12.6452 6.67027 11.6183 5.72686L6.4925 8.65602C6.48742 8.87213 6.45722 9.0869 6.40249 9.29603L11.6183 12.2769C12.5785 11.3956 14.0073 11.2596 15.1166 11.9438C16.2258 12.628 16.7455 13.9658 16.389 15.2194C16.0325 16.473 14.8866 17.3371 13.5833 17.3352ZM13.5833 13.1685C12.893 13.1685 12.3333 13.7282 12.3333 14.4185C12.3333 15.1089 12.893 15.6685 13.5833 15.6685C14.2737 15.6685 14.8333 15.1089 14.8333 14.4185C14.8333 13.7282 14.2737 13.1685 13.5833 13.1685ZM3.58333 7.33519C2.89297 7.33519 2.33333 7.89484 2.33333 8.58519C2.33333 9.27555 2.89297 9.83519 3.58333 9.83519C4.27368 9.83519 4.83333 9.27555 4.83333 8.58519C4.83333 7.89484 4.27368 7.33519 3.58333 7.33519ZM13.5833 2.33519C12.893 2.33519 12.3333 2.89484 12.3333 3.58519C12.3333 4.27555 12.893 4.83519 13.5833 4.83519C14.2737 4.83519 14.8333 4.27555 14.8333 3.58519C14.8333 2.89484 14.2737 2.33519 13.5833 2.33519Z" fill="#7B838A" />
																			</svg>
																		</span>
																		<div className="team-body-txt">
																			<span>{item?.team_name}</span>
																			<div className="set-team-des">
																				<p className="position-relative">{"Venue: " + item?.venue?.name}</p>
																				<div className="even-time-btn">{formatTimeFuture(item?.start_date)}</div>
																			</div>
																		</div>
																	</div>
																</div>
															);
														}) : <div className="postNotFound">No events scheduled</div>}
													{upComingData && upComingData?.length > 0 && totalUpCominglimit > upComingData.length && <div className="col-md-12 text-center my-3">
														<button className="pagination-button load-more-btn-cust py-1 px-2" type='button' onClick={() => setupComingOption({ ...upComingOption, page: upComingOption.page + 1 })} >{loading ? "Loading..." : "Load More"}</button>
													</div>}
												</div>
											</div>
										</div>
										<div className="row me-0">
											<div className="col-12 mt-5 mb-3 pe-0">
												<mark className="event-mark">Completed Event</mark>
											</div>
											<div className="row me-0 mt-3 event-type">
												{completedData && completedData?.length > 0 ?
													completedData?.map((item) => {
														return (
															<div className="col-xl-3 col-lg-4 col-sm-6 mb-3 text-center pe-0" key={item?._id} onClick={() => handleEventClick("eventDetail", item?.event_id)}>
																<div className="schedule-box-main p-3">
																	<div className="schedule-date-box mx-auto p-2">
																		<span>{new Date(item.start_date).toString().split(" ")[0]}</span>
																		<bdi>{item?.start_date.slice(8, 10)}</bdi>
																	</div>
																	<div className="schedule-box-body mt-3">
																		<span>{item?.team_name}</span>
																		<bdi>{item?.event_type}</bdi>
																	</div>
																</div>
															</div>
														);
													}) : <div className="postNotFound">No completed event</div>}
												{completedData && completedData?.length > 0 && totalCompletedData > completedData.length && <div className="col-md-12 text-center my-3">
													<button className="pagination-button load-more-btn-cust py-1 px-2" type='button' onClick={() => setCompletedOption({ ...completedOption, page: completedOption.page + 1 })} >{loading ? "Loading..." : "Load More"}</button>
												</div>}
											</div>
										</div>
									</>
								)
							)}
							{/* ===================== Create Event ========================== */}
							{eventState.eventCreate && (
								<>
									<div className="row">
										<div className="col-12">
											<div className="mt-3 mt-lg-0 tabs-heading-txt">
												<h5 className="mb-0">Event</h5>
											</div>
											<div className="market-head-txt">
												<span>
													<bdi className="pointer" onClick={() => setEventState({ ...eventState, eventCreate: false })}>
														Event
													</bdi>
													&gt;
													<bdi> Create Event</bdi>
												</span>
											</div>
										</div>
										<Formik
											innerRef={contect1}
											enableReinitialize={true}
											initialValues={{
												start_date: "",
												event_duration: "",
												arrival: "",
												Notes: "",
												toggle: false,
												Venue: "",
												SelectTypE: eType,
												Opponent: "",
												Status: "",
											}}
											validationSchema={Yup.object({
												Status: Yup.number().required("Select Status please."),
												start_date: Yup.string().required("Starting date & time is required."),
												event_duration: Yup.number().when("toggle", {
													is: false,
													then: Yup.number().required("Duration is required").min(1, "Min Duration: 1").max(24, "Max Duration: 24"),
												}),
												arrival: Yup.string().required("Arrival time is required."),
												Venue: Yup.string().required("Location is required."),
												SelectTypE: Yup.string().required("Please select Event type."),
												Opponent: Yup.string().when("SelectTypE", {
													is: (SelectTypE) => SelectTypE === "Game",
													then: Yup.string().required("Please enter Opponent team."),
												}),
											})}
											onSubmit={(formData, { resetForm }) => createEvent(formData, resetForm)}
										>
											{(runform) => (
												<form className="row align-items-center me-0" onSubmit={runform.handleSubmit}>
													<div className="col-12 mt-3">
														<div className="team-info-main p-3">
															<div className="row">
																<div className="col-lg-6 col-sm-6 mb-3">
																	<label className="comn-label-class">Event Type</label>
																	<bdi className="d-block position-relative">
																		<select className="w-100 form-select comn-input-style ps-3" name="SelectTypE" onChange={handleEventType}>
																			<option>Select...</option>
																			<option value="Practice">Practice</option>
																			<option value="Game">Game</option>
																		</select>
																		{errorContainer(runform, "SelectTypE")}
																	</bdi>
																</div>
															</div>
														</div>
													</div>
													<div className="col-12 mt-3">
														<div className="team-info-main p-3">
															<div className="row pe-3">
																<div className="col-lg-6 col-sm-6 mb-3 pe-0">
																	<label className="comn-label-class">Event Duration</label>
																	<bdi className="d-block position-relative">
																		<input type="text" className="form-control comn-input-style ps-3" placeholder="All Day Event" />
																		<span className="custm-toggel-switch event-toggle">
																			<div className="form-check position-absolute form-switch">
																				<input className="form-check-input mt-0" type="checkbox" name="toggle" id="offer-status" {...formAttr(runform, "toggle")} onChangeCapture={() => setToggle(!toggle)} />
																			</div>
																		</span>
																	</bdi>
																</div>
																{eventType?.event_type === "Game" && (
																	<div className="col-lg-6 col-sm-6 mb-3 pe-0">
																		<label className="comn-label-class">Opponent</label>
																		<bdi className="d-block position-relative">
																			<input type="text" className="form-control comn-input-style ps-3" name="Opponent" placeholder="TBD" {...formAttr(runform, "Opponent")} />
																			{errorContainer(runform, "Opponent")}
																		</bdi>
																	</div>
																)}
																<div className="col-lg-6 col-sm-6 mb-3 pe-0">
																	<label className="comn-label-class">Starts</label>
																	<bdi className="d-block position-relative">
																		<input type="datetime-local" className="form-control comn-input-style ps-3" placeholder="Baseball" name="start_date" {...formAttr(runform, "start_date")} />
																	</bdi>
																	{errorContainer(runform, "start_date")}
																</div>
																{toggle === false && (
																	<div className="col-lg-6 col-sm-6 mb-3 pe-0">
																		<label className="comn-label-class">Duration</label>
																		<bdi className="d-block position-relative">
																			<input type="number" className="form-control comn-input-style ps-3" placeholder="hr" name="event_duration" {...formAttr(runform, "event_duration")} />
																		</bdi>
																		{errorContainer(runform, "event_duration")}
																	</div>
																)}
																<div className="col-lg-6 col-sm-6 mb-3 pe-0">
																	<label className="comn-label-class">Arrive</label>
																	<bdi className="d-block position-relative">
																		<input type="time" className="form-control comn-input-style ps-3" name="arrival" placeholder="No arrival time" {...formAttr(runform, "arrival")} />
																	</bdi>
																	{errorContainer(runform, "arrival")}
																</div>
																{toggle === false && (
																	<div className="col-lg-6 col-sm-6 mb-3 pe-0">
																		<label className="comn-label-class">Repets</label>
																		<bdi className="d-block position-relative">
																			<input type="text" className="form-control comn-input-style ps-3" value={repetsType?.SelectType} onChange={(e) => e.target.value} onClick={() => setReapeat(true)} />
																		</bdi>
																	</div>
																)}
																<div className="col-lg-6 col-sm-6 mb-3 pe-0">
																	<label className="comn-label-class">Notes (Optional)</label>
																	<bdi className="d-block position-relative">
																		<input type="text" className="form-control comn-input-style ps-3" placeholder="Notes" name="Notes" {...formAttr(runform, "Notes")} />
																	</bdi>
																</div>
																<div className="col-lg-6 col-sm-6 mb-3">
																	<label className="comn-label-class">Status</label>
																	<bdi className="d-block position-relative">
																		<select className="w-100 form-select comn-input-style ps-3" name="Status" {...formAttr(runform, "Status")}>
																			<option>Select...</option>
																			<option value={0}>I'm not going</option>
																			<option value={1}>I'm going</option>
																			<option value={2}>Not Sure</option>
																		</select>
																		{errorContainer(runform, "Status")}
																	</bdi>
																</div>
																<div className="col-lg-6 col-sm-6 mb-3 pe-0">
																	<label className="comn-label-class">Venue</label>
																	<bdi className="d-block position-relative">
																		<input type="text" className="form-control comn-input-style ps-3" placeholder="Venue" name="Venue" {...formAttr(runform, "Venue")} onClick={() => setSelectLocation(true)} />
																		{errorContainer(runform, "Venue")}
																		<span className="showpwd-class bg-transparent" id="show_pwd">
																			<svg width="16" height="16" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
																				<path d="M14.6569 14.6569C13.7202 15.5935 11.7616 17.5521 10.4138 18.8999C9.63275 19.681 8.36768 19.6814 7.58663 18.9003C6.26234 17.576 4.34159 15.6553 3.34315 14.6569C0.218951 11.5327 0.218951 6.46734 3.34315 3.34315C6.46734 0.218951 11.5327 0.218951 14.6569 3.34315C17.781 6.46734 17.781 11.5327 14.6569 14.6569Z" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
																				<path d="M12 9C12 10.6569 10.6569 12 9 12C7.34315 12 6 10.6569 6 9C6 7.34315 7.34315 6 9 6C10.6569 6 12 7.34315 12 9Z" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
																			</svg>
																		</span>
																	</bdi>
																</div>
															</div>
															<div className="row">
																<div className="col-xxl-3 col-xl-4 col-md-6 mt-3 mx-md-0 mx-sm-auto">
																	<button className="comn-btn-class" type="submit">
																		Save
																	</button>
																</div>
															</div>
														</div>
													</div>
												</form>
											)}
										</Formik>
									</div>
								</>
							)}
							{/* =============================== Event Details ===================================  */}
							{eventState.eventDetail && signupType !== 1 && signupType !== 5 && (
								<>
									<EventDetails setEventState={setEventState} eventState={eventState} eventId={eventID} />
								</>
							)}
						</div>

					</div>
				</div>
			</section>
			{/* ============= Select Team Modal =========== */}
			{selectteam && (
				<Modal show={selectteam} onHide={() => setSelectTeam(false)} size="md" className="select-team-modal" arialabelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton className="mt-2 border-0">
						<div className="add-modal-hdr mx-auto">
							<p>Select team</p>
						</div>
					</Modal.Header>
					<Modal.Body>
						<CoachTeamModal seteventType={seteventType} setSelectTeam={setSelectTeam} handleEventClick={handleEventClick} />
					</Modal.Body>
				</Modal>
			)}

			{/* ============= Event Reapeat Modal =========== */}
			{reapeat && (
				<Modal show={reapeat} onHide={closeRepeatModal} size="md" className="select-team-modal" arialabelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton className="border-0 pb-0">
						<div className="add-modal-hdr mx-auto">
							<p>Repeats </p>
						</div>
					</Modal.Header>
					<Modal.Body>
						<Formik
							innerRef={contect}
							enableReinitialize
							initialValues={{
								end_date: "",
								TypeofS: rType,
								plan: handleRadio,
								numberMonth: "",
								selectWeek: "",
								selectDayName: "",
							}}
							validationSchema={Yup.object({
								TypeofS: Yup.string().required("Select Repeat Type"),
								end_date: Yup.string().when("TypeofS", {
									is: (TypeofS) => TypeofS === "Day" || TypeofS === "Weekly" || TypeofS === "Monthly",
									then: Yup.string().required("Ending date is required."),
								}),
								plan: Yup.string().when("TypeofS", {
									is: "Monthly",
									then: Yup.string().required("Select any one"),
								}),
								numberMonth: Yup.number().when("plan", {
									is: "basic",
									then: Yup.number().required("Date is required").min(1, "Min Date: 1").max(31, "Max Date: 31"),
								}),
								selectWeek: Yup.string().when("plan", {
									is: "complete",
									then: Yup.string().required("Required"),
								}),
								selectDayName: Yup.string().when("plan", {
									is: "complete",
									then: Yup.string().required("Required"),
								}),
							})}
							onSubmit={(formData, { resetForm }) => eventRepeatSet(formData, resetForm)}
						>
							{(runform) => (
								<form onSubmit={runform.handleSubmit}>
									<div className="row">
										<div className="col-12 mt-3">
											<label className="comn-label-class">Repeat every</label>
											<bdi className="d-block position-relative">
												<select className="form-select comn-input-style ps-3 w-100" name="TypeofS" onChange={SelectedTypeHandle}>
													<option defaultselect="true" value="Never">
														Select...
													</option>
													<option value="Day">Day</option>
													<option value="Weekly">Weekly</option>
													<option value="Monthly">Monthly</option>
													<option value="Never">Never</option>
												</select>
												{errorContainer(runform, "TypeofS")}
											</bdi>
										</div>
										{repetsType?.SelectType === "Weekly" && (
											<div className="col-12 mt-3">
												<div className="repeat-modal-main">
													<div>
														<label className="cust-chk-bx-soc p-0">
															<input type="checkbox" name={0} id={0} onChange={(e) => handleDay(e)} />
															<span className="cust-chkbox-soc">
																<bdi>S</bdi>
															</span>
														</label>
													</div>
													<div>
														<label className="cust-chk-bx-soc p-0">
															<input type="checkbox" name={1} id={1} onChange={(e) => handleDay(e)} />
															<span className="cust-chkbox-soc">
																<bdi>M</bdi>
															</span>
														</label>
													</div>
													<div>
														<label className="cust-chk-bx-soc p-0">
															<input type="checkbox" name={2} id={2} onChange={(e) => handleDay(e)} />
															<span className="cust-chkbox-soc">
																<bdi>T</bdi>
															</span>
														</label>
													</div>
													<div>
														<label className="cust-chk-bx-soc p-0">
															<input type="checkbox" name={3} id={3} onChange={(e) => handleDay(e)} />
															<span className="cust-chkbox-soc">
																<bdi>W</bdi>
															</span>
														</label>
													</div>
													<div>
														<label className="cust-chk-bx-soc p-0">
															<input type="checkbox" name={4} id={4} onChange={(e) => handleDay(e)} />
															<span className="cust-chkbox-soc">
																<bdi>T</bdi>
															</span>
														</label>
													</div>
													<div>
														<label className="cust-chk-bx-soc p-0">
															<input type="checkbox" name={5} id={5} onChange={(e) => handleDay(e)} />
															<span className="cust-chkbox-soc">
																<bdi>F</bdi>
															</span>
														</label>
													</div>
													<div>
														<label className="cust-chk-bx-soc p-0">
															<input type="checkbox" name={6} id={6} onChange={(e) => handleDay(e)} />
															<span className="cust-chkbox-soc">
																<bdi>S</bdi>
															</span>
														</label>
													</div>
												</div>
											</div>
										)}
										{repetsType?.SelectType === "Monthly" && (
											<div className="col-12 mt-3">
												<div className="row me-0">
													<div className="col-md-4 pe-0">
														<label class="plan basic-plan" htmlFor="basic">
															<input type="radio" name="plan" id="basic" onChange={(e) => sethandleRadio(e.target.id)} />
															<div class="plan-content">
																<div class="plan-details">
																	<bdi>On day</bdi>
																	{handleRadio === "basic" && <input type="number" name="numberMonth" className="form-select comn-input-style ps-3" {...formAttr(runform, "numberMonth")} />}
																	{errorContainer(runform, "numberMonth")}
																</div>
															</div>
														</label>
													</div>
													<div className="col-md-8 d-flex pe-0 mt-md-0 mt-3">
														<label class="plan complete-plan" htmlFor="complete">
															<input type="radio" id="complete" name="plan" onChange={(e) => sethandleRadio(e.target.id)} />
															<div class="plan-content">
																<div class="plan-details">
																	<bdi>On the</bdi>
																	{handleRadio === "complete" && (
																		<div className="d-flex  w-100">
																			<div className="w-100">
																				<select className="form-select comn-input-style ps-3 " name="selectWeek" {...formAttr(runform, "selectWeek")}>
																					<option defaultselect value="Never">
																						Select...
																					</option>
																					<option value={1}>First</option>
																					<option value={2}>Second</option>
																					<option value={3}>Third</option>
																					<option value={4}>Fourth</option>
																					<option value={4}>Last</option>
																				</select>
																				{errorContainer(runform, "selectWeek")}
																			</div>
																			<div className="w-100">
																				<select className="form-select comn-input-style ps-3 ms-2 " name="selectDayName" {...formAttr(runform, "selectDayName")}>
																					<option defaultselect value="Never">
																						Select...
																					</option>
																					<option value="0">Sunday</option>
																					<option value="1">Monday</option>
																					<option value="2">Tuesday</option>
																					<option value="3">Wednesday</option>
																					<option value="4">Tuesday</option>
																					<option value="5">Friday</option>
																					<option value="6">Saturday</option>
																				</select>
																				{errorContainer(runform, "selectDayName")}
																			</div>
																		</div>
																	)}
																</div>
															</div>
														</label>
													</div>
												</div>
												{errorContainer(runform, "plan")}
											</div>
										)}
										<div className="col-12 mt-3">
											<label className="comn-label-class">End Repeat</label>
											<bdi className="d-block position-relative">
												<input type="datetime-local" className="form-control comn-input-style ps-3" placeholder="Wed, December 28, 2022" name="end_date" {...formAttr(runform, "end_date")} />
											</bdi>
											{errorContainer(runform, "end_date")}
										</div>
										<div className="col-sm-6 mx-auto mt-3">
											<button type="submit" className="comn-btn-class">
												Save
											</button>
										</div>
									</div>
								</form>
							)}
						</Formik>
					</Modal.Body>
				</Modal>
			)}

			{/* ============= Event Location Map Modal =========== */}
			{selectlocation && (
				<Modal show={selectlocation} onHide={() => setSelectLocation(false)} className="select-team-modal" arialabelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton className="border-0 pb-0">
						<div className="add-modal-hdr mx-auto">
							<p>Select Location</p>
						</div>
					</Modal.Header>
					<Modal.Body>
						<div className="row">
							<div className="col-12">
								<div className="location-sel-div p-2">
									<PlacesAutocomplete value={address} onChange={handleChangeAddress} onSelect={handleSelectAddress} name="address">
										{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
											<div className="mb-3 position-relative">
												<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6C6A81" className="bi bi-search map-search-icn" viewBox="0 0 16 16">
													<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
												</svg>
												<input {...getInputProps({ placeholder: " Enter Address ...", className: "form-control login-comn-input searchbar ps-5" })} />
												<div className="autocomplete-dropdown-container autocomplete-dropdown-custom-drop">
													{suggestions.map((suggestion, i) => {
														const className = suggestion.active ? "suggestion-item--active" : "suggestion-item";
														const style = suggestion.active ? { backgroundColor: "#fafafa", cursor: "pointer" } : { backgroundColor: "#ffffff", cursor: "pointer" };
														return (
															<div
																key={i}
																{...getSuggestionItemProps(suggestion, {
																	className,
																	style,
																})}
															>
																<span className="">
																	<i className="bi bi-geo-alt-fill me-2"></i>
																	{suggestion.description}
																</span>
															</div>
														);
													})}
												</div>
											</div>
										)}
									</PlacesAutocomplete>
									<Googlemap longitude={longitude} latitude={latitude} googleMapURL={GoogleAddressKEY} loadingElement={<div style={{ height: `100%` }} />} containerElement={<div style={{ height: `400px` }} />} mapElement={<div style={{ height: `100%` }} />} />
								</div>
							</div>
							<div className="col-sm-4 mx-auto mt-3" onClick={() => setSelectLocation(false)}>
								<button className="comn-btn-class">Save</button>
							</div>
						</div>
					</Modal.Body>
				</Modal>
			)}
		</MainLayout>
	);
}
