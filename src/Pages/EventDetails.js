import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FetchPostApi } from "../Api/apiServices";
import Loader from "../Components/Loader/Loader";
import { API_Path, getTime } from "../Api/Const";
import roleContext from "../contexts/roleContext";
import { useContext } from "react";

export default function EventDetails(props) {
    const context = useContext(roleContext);
	const [iframeSrc, setIframeSrc] = useState("");
	const [EventByIdDetails, setEventByIdDetails] = useState("");
	const [loader, setloader] = useState(false);
	const [signupType, setSignupType] = useState("")

	useEffect(() => {
		setSignupType(context?.signup_type)
	}, [context?.signup_type]);

	useEffect(() => {
		props?.eventId !== undefined && geteventById(props?.eventId);
	}, [props]);

	const geteventById = async (id) => {
		setloader(true);
		let result = await FetchPostApi(API_Path.getEventById, { event_id: id });
		let getClickEventId = await result.json();
		if (result.status === 200) {
			setEventByIdDetails(getClickEventId?.data[0]);
			setIframeSrc(`https://maps.google.com/maps?q=${getClickEventId?.data[0]?.venue?.latitude},${getClickEventId?.data[0]?.venue?.longitude}&t=m&z=16&output=embed&iwloc=near`);
			setloader(false);
		} else {
			toast.error(getClickEventId.message);
			setloader(false);
		}
	};

	const handlechangeStatus = async (e) => {
		setloader(true);
		let data = {
			_id: EventByIdDetails?._id,
			venue: {
				name: EventByIdDetails?.venue?.name,
				latitude: EventByIdDetails?.venue?.latitude,
				longitude: EventByIdDetails?.venue?.longitude,
			},
			status: e.target.value,
		};
		let result = await FetchPostApi(API_Path.eventUpdate, data);
		let uStatus = await result.json();
		if (result.status === 200) {
			geteventById(props?.eventId);
			setloader(false);
		} else {
			toast.error(uStatus.message);
			setloader(false);
		}
	};

	const convertTime24_12 = (t) => {
		let [h, ...rest] = t.split(":");
		return (h === "12" ? "12" : h % 12) + ":" + rest.join(":") + (h < 12 ? " AM" : " PM");
	};

	return (
		<>
			{loader ? (
				<Loader />
			) : (
				<>
					<div className="row">
						<div className="col-12">
							<div className="mt-3 mt-lg-0 tabs-heading-txt">
								<h5 className="mb-0">Event Detail</h5>
							</div>
							<div className="market-head-txt">
								<span>
									{props.eventState.clickEvent && (
										<bdi className="pointer" onClick={() => props.setEventState({ teamDetail: true, teamInvite: false, teamSetting: false, clickEvent: false })}>
											{props?.teamName} Details
										</bdi>
									)}
									{props.eventState.eventDetail && (
										<bdi className="pointer" onClick={() => props.setEventState({ ...props.eventState, eventDetail: false })}>
											Event
										</bdi>
									)}
									<span> &gt; Event Details</span>
								</span>
							</div>
						</div>
						<div className="col-12 mt-3">
							<div className="d-md-flex align-items-center justify-content-between team-join-class p-3">
								<div className="d-flex align-items-center">
									<div className="team-img-div">
										<div className="schedule-date-box mx-auto p-2">
											<span>{EventByIdDetails?.start_date ? new Date(EventByIdDetails?.start_date).toString().split(" ")[0] : ""}</span>
											<bdi>{EventByIdDetails?.start_date?.slice(8, 10)}</bdi>
										</div>
									</div>
									<div className="ms-3 team-detail-name">
										<span>{EventByIdDetails?.event_type}</span>
										<p className="position-relative mb-0">
											{EventByIdDetails?.arrive ? <span>{"Arrive " + convertTime24_12(EventByIdDetails?.arrive)}</span> : ""} <bdi></bdi>Event Time {getTime(EventByIdDetails?.start_date)} - {EventByIdDetails?.all_day_event === 0 ? getTime(EventByIdDetails?.end_date) : "11:59:59 PM"}
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12 mt-3">
							<div className="d-sm-flex align-items-center justify-content-between team-join-class p-3">
								<div className="d-flex align-items-center">
									<div className="eve-pro">
										<img src={EventByIdDetails?.profile_img ?? require("../assets/images/defaultProPic.png")} alt="profile" />
									</div>
										<div className="ms-3 team-detail-name">
											<span>Status : {EventByIdDetails?.status === 0 ? "You’re not Going" : EventByIdDetails?.status === 1 ? "You’re Going" : "Not sure"}</span>
										</div>
								</div>
								{new Date(EventByIdDetails?.start_date).getTime() > new Date().getTime() && (signupType !==2) && (
									<div className="col-lg-2 col-sm-6 mb-3 comn-select-bg">
										<select className="w-100 form-select comn-input-style ps-3" name="status" onChange={handlechangeStatus}>
											<option className="option-bg">Status....</option>
											<option className="option-bg" value={0}>
												I'm not going
											</option>
											<option className="option-bg" value={1}>
												I'm going
											</option>
											<option className="option-bg" value={2}>
												Not Sure
											</option>
										</select>
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-8 mt-3 pe-0">
							<div className="event-map-main p-3">
								<div className="d-sm-flex align-items-center">
									<div className="team-detail-name">
										<span>{props.eventId?.venue?.name}</span>
										<p className="position-relative mb-0">{/* Surry BC, Caneda */}</p>
									</div>
									{/* <div className="ms-sm-auto mt-3 mt-sm-0">
										<button className="comn-white-btn me-sm-2" onClick={handleViewMapClick} target="_blank" data="View Map"></button>
									</div> */}
								</div>
								<div className="mt-3">{iframeSrc !== "" && iframeSrc !== undefined && <iframe width="100%" height="400" src={iframeSrc}></iframe>}</div>
							</div>
						</div>
						{EventByIdDetails?.weather?.length > 0 && (
							<div className="col-md-4 mt-3">
								<div className="weather-day-div p-3">
									<label>Weather That Day</label>
									<div>
										<ul>
											{EventByIdDetails?.weather?.length > 0 &&
												EventByIdDetails?.weather?.map((item, i) => {
													return (
														<li className="d-flex" key={i}>
															<span>{convertTime24_12(item?.time)}</span>
															<bdi className="ms-auto">
																{item?.celsius} | {item?.weather}
															</bdi>
														</li>
													);
												})}
										</ul>
									</div>
								</div>
								{/* -----------------------------------------------------dont delet this------------------------------------- */}
								{/* -----------------------------------------------------dont delet this------------------------------------- */}
								{/* <div className="player-staff-rsvp mt-3 p-3">
                        <mark>Player RSVP</mark>
                        <div className="mt-2">
                            <span className="me-3">
                                0
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="ms-1" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.9997 23.6654C5.55928 23.6583 0.340081 18.4391 0.333008 11.9987V11.7654C0.461261 5.35401 5.74003 0.248001 12.1521 0.333079C18.5642 0.418157 23.7057 5.66242 23.6638 12.0749C23.6219 18.4875 18.4123 23.6641 11.9997 23.6654ZM6.64467 11.5204L4.99967 13.1654L9.66634 17.8321L18.9997 8.49872L17.3547 6.84205L9.66634 14.5304L6.64467 11.5204Z" fill="#27AE60" />
                                </svg>
                            </span>
                            <span className="me-3">
                                0
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="ms-1" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.9997 23.6667C8.90464 23.6695 5.93555 22.4412 3.74702 20.2527C1.5585 18.0642 0.330228 15.0951 0.333013 12.0001V11.7667C0.428432 7.09098 3.30544 2.92357 7.64377 1.17696C11.9821 -0.569648 16.9441 0.441768 20.2527 3.74706C23.5922 7.08382 24.5917 12.1043 22.7847 16.4656C20.9778 20.827 16.7205 23.6695 11.9997 23.6667ZM11.9997 13.6451L15.0214 16.6667L16.6664 15.0217L13.6447 12.0001L16.6664 8.97839L15.0214 7.33339L11.9997 10.3551L8.97802 7.33339L7.33302 8.97839L10.3547 12.0001L7.33302 15.0217L8.97802 16.6667L11.9997 13.6462V13.6451Z" fill="#EB5757" />
                                </svg>
                            </span>
                            <span className="me-3">
                                2
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="ms-1" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.9997 23.6654C5.55635 23.6654 0.333008 18.442 0.333008 11.9987C0.333008 5.55538 5.55635 0.332031 11.9997 0.332031C18.443 0.332031 23.6663 5.55538 23.6663 11.9987C23.6593 18.4391 18.4401 23.6583 11.9997 23.6654ZM10.833 17.832V20.1654H13.1663V17.832H10.833ZM11.9997 6.16536C13.2883 6.16536 14.333 7.21003 14.333 8.4987C14.3371 9.11788 14.0885 9.71196 13.6447 10.1437L12.198 11.6137C11.3247 12.4907 10.8339 13.6777 10.833 14.9154V15.4987H13.1663C13.0757 14.2445 13.5815 13.021 14.5313 12.197L15.5813 11.1237C16.2791 10.4287 16.6698 9.48349 16.6664 8.4987C16.6664 5.92137 14.577 3.83203 11.9997 3.83203C9.42235 3.83203 7.33301 5.92137 7.33301 8.4987H9.66634C9.66634 7.21003 10.711 6.16536 11.9997 6.16536Z" fill="#2D9CDB" />
                                </svg>
                            </span>
                        </div>
                        <div className="mt-3">
                            <mark>Player RSVP</mark>
                            <div className="mt-2">
                                <span className="me-3">
                                    1
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="ms-1" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.9997 23.6654C5.55928 23.6583 0.340081 18.4391 0.333008 11.9987V11.7654C0.461261 5.35401 5.74003 0.248001 12.1521 0.333079C18.5642 0.418157 23.7057 5.66242 23.6638 12.0749C23.6219 18.4875 18.4123 23.6641 11.9997 23.6654ZM6.64467 11.5204L4.99967 13.1654L9.66634 17.8321L18.9997 8.49872L17.3547 6.84205L9.66634 14.5304L6.64467 11.5204Z" fill="#27AE60" />
                                    </svg>
                                </span>
                                <span className="me-3">
                                    0
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="ms-1" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.9997 23.6667C8.90464 23.6695 5.93555 22.4412 3.74702 20.2527C1.5585 18.0642 0.330228 15.0951 0.333013 12.0001V11.7667C0.428432 7.09098 3.30544 2.92357 7.64377 1.17696C11.9821 -0.569648 16.9441 0.441768 20.2527 3.74706C23.5922 7.08382 24.5917 12.1043 22.7847 16.4656C20.9778 20.827 16.7205 23.6695 11.9997 23.6667ZM11.9997 13.6451L15.0214 16.6667L16.6664 15.0217L13.6447 12.0001L16.6664 8.97839L15.0214 7.33339L11.9997 10.3551L8.97802 7.33339L7.33302 8.97839L10.3547 12.0001L7.33302 15.0217L8.97802 16.6667L11.9997 13.6462V13.6451Z" fill="#EB5757" />
                                    </svg>
                                </span>
                                <span className="me-3">
                                    0
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="ms-1" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.9997 23.6654C5.55635 23.6654 0.333008 18.442 0.333008 11.9987C0.333008 5.55538 5.55635 0.332031 11.9997 0.332031C18.443 0.332031 23.6663 5.55538 23.6663 11.9987C23.6593 18.4391 18.4401 23.6583 11.9997 23.6654ZM10.833 17.832V20.1654H13.1663V17.832H10.833ZM11.9997 6.16536C13.2883 6.16536 14.333 7.21003 14.333 8.4987C14.3371 9.11788 14.0885 9.71196 13.6447 10.1437L12.198 11.6137C11.3247 12.4907 10.8339 13.6777 10.833 14.9154V15.4987H13.1663C13.0757 14.2445 13.5815 13.021 14.5313 12.197L15.5813 11.1237C16.2791 10.4287 16.6698 9.48349 16.6664 8.4987C16.6664 5.92137 14.577 3.83203 11.9997 3.83203C9.42235 3.83203 7.33301 5.92137 7.33301 8.4987H9.66634C9.66634 7.21003 10.711 6.16536 11.9997 6.16536Z" fill="#2D9CDB" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div> */}
								{/* -----------------------------------------------------dont delet this------------------------------------- */}
								{/* -----------------------------------------------------dont delet this------------------------------------- */}

							</div>
						)}
					</div>
				</>
			)}
		</>
	);
}
