import React, { useContext, useEffect, useState } from "react";
import { Tab, Nav, Modal } from "react-bootstrap";
import { FetchPostApi, ImagePostApi } from "../Api/apiServices";
import { API_Path } from "../Api/Const";
import { toast } from "react-toastify";
import MainLayout from "../Components/Layout/MainLayout";
import ProfileLayout from "../Components/ProfileLayout/MainProfileLayout";
import StudentProfileLayout from "../Components/ProfileLayout/StudentProfileLayout";
import roleContext from "../contexts/roleContext";
import EventDetails from "./EventDetails";
import Loader from "../Components/Loader/Loader";
import SchoolModal from "../Components/AllModals/SchoolModal"
import LocateModal from "../Components/AllModals/LocateModal"
import SeasonModal from "../Components/AllModals/SeasonModal";
import TeamTypeModal from "../Components/AllModals/TeamTypeModal"
import LeaveTeamModal from "../Components/AllModals/LeaveTeamModal";
import AsignRoleModal from "../Components/AllModals/AsignRoleModal"
import SportsTeamModal from "../Components/AllModals/SportsTeamModal"
import LocalLeagueModal from "../Components/AllModals/LocalLeagueModal"
import JoinTeamModal from "../Components/AllModals/JoinTeamModal";
import TeamMemberTab from "../Components/AllTabs/TeamMemberTab";
import TeamEventTab from "../Components/AllTabs/TeamEventTab";
import TeamUpdateTab from "../Components/AllTabs/TeamUpdateTab";
import TeamInfoTab from "../Components/AllTabs/TeamInfoTab";
import TeamManageTab from "../Components/AllTabs/TeamManageTab";
import TeamInvitation from "./TeamInvitation"
export default function Team() {
	const context = useContext(roleContext);
	const [defaultView, setDefaultView] = useState(true);
	const [loader, setloader] = useState(true);
	const [league, setLeague] = useState(false);
	const [season, setSeason] = useState(false);
	const [school, setSchool] = useState(false);
	const [locate, setLocate] = useState(false);
	const [JoinTeam, setJoinTeam] = useState(false);
	const [teamtype, setTeamType] = useState(false);
	const [asignrole, setAsignRole] = useState(false);
	const [leaveteam, setLeaveTeam] = useState(false);
	const [selectsportteam, setSelectSportTeam] = useState(false);
	const [loading, setLoading] = useState({ your: false, college: false });
	const [teamState, setTeamState] = useState({ teamDetail: false, teamInvite: false, teamSetting: false, clickEvent: false });
	const [joinTeam, setjoinTeam] = useState(false);
	const [timer, setTimer] = useState(null);
	const [yourTeam, setYourTeam] = useState([]);
	const [subCoach, setSubCoach] = useState([]);
	const [inviteList, setInviteList] = useState([]);
	const [collegeTeam, setCollegeTeam] = useState([]);
	const [scheduleEvent, setScheduleEvent] = useState([]);
	const [user_id, setuser_id] = useState("");
	const [eventID, seteventID] = useState("");
	const [totalJoin, setTotalJoin] = useState("")
	const [oneTeamId, setOneTeamId] = useState("");
	const [selectCoach, setSelectCoach] = useState("");
	const [totalCollege, setTotalCollege] = useState("")
	const [searchInviteList, setSearchInviteList] = useState("");
	const [team, setTeam] = useState({});
	const [inviteId, setInviteId] = useState({ id: "", status: "" });
	const [assign, setAssign] = useState({ member_role: "", member_number: "" });
	const [createTeam, setCreateTeam] = useState({ sport_name: "", team_type: "", age_group: "", team_name: "", team_address: "", team_session: "" });
	const [optionGetTeams, setOptionGetTeams] = useState({ sizePerPage: 20, search: { team_name: "" }, page: 0, sort: "", order: "ASC" });
	const [optionJoin, setOptionJoin] = useState({ sizePerPage: 16, search: "", page: 0, sort: "", order: "DESC" });
	const [optionCollege, setOptionCollege] = useState({ sizePerPage: 16, search: "", page: 0, sort: "", order: "DESC" });
	const [signupType, setSignupType] = useState("")

	useEffect(() => {
		setSignupType(context?.signup_type)
	}, [context?.signup_type]);

	useEffect(() => {
		if (context.user_id !== undefined) {
			setuser_id(context.user_id);
			getJoinTeams(context.user_id, optionJoin);
			getCollegeTeams(context.user_id, optionCollege);
		}
	}, [context.user_id]);

	const inputChangedTeam = (e) => {
		setOptionGetTeams({ ...optionGetTeams, search: e.target.value });
		clearTimeout(timer);
		const newTimer = setTimeout(() => {
			getJoinTeams(user_id, { ...optionJoin, search: e.target.value });
			getCollegeTeams(user_id, { ...optionCollege, search: e.target.value });
		}, 1000);
		setTimer(newTimer);
	};

	const inputChangedInvite = (e) => {
		setSearchInviteList(e.target.value);
		clearTimeout(timer);
		const newTimer = setTimeout(() => {
			getInviteList(e.target.value);
		}, 1000);
		setTimer(newTimer);
	};

	const getJoinTeams = async (id, options) => {
		setLoading({ ...loading, your: true });
		let result = await FetchPostApi(API_Path.joinTeamList, { user_id: id, options: options });
		let teamList = await result.json();
		if (result.status === 200) {
			setTotalJoin(teamList.data.totalRecord);
			setYourTeam(teamList.data.data);
			setLoading({ ...loading, your: false });
			setloader(false);
		} else {
			toast.error(teamList.message);
		}
	};

	const getCollegeTeams = async (id, options) => {
		setLoading({ ...loading, college: true });
		let result = await FetchPostApi(API_Path.collegeTeamList, { user_id: id, options: options });
		let teamList = await result.json();
		if (result.status === 200) {
			setTotalCollege(teamList.data.totalRecord);
			setCollegeTeam(teamList.data.data);
			setLoading({ ...loading, college: false });
			setloader(false);
		} else {
			toast.error(teamList.message);
		}
	};

	const getATeam = async (id) => {
		setOptionGetTeams({ ...optionGetTeams, search: { team_name: "" } });
		setTeam({});
		setOneTeamId(id);
		let result = await FetchPostApi(API_Path.getTeamById, { _id: id });
		let team = await result.json();
		if (result.status === 200) {
			setTeam(team.data);
			setSubCoach(team.data.sub_coach);
		} else {
			toast.error(team.message);
		}
	};

	const handleCreateTeam = async () => {
		if (createTeam.team_session) {
			let data = { sport_name: createTeam.sport_name, team_type: createTeam.team_type, age_group: createTeam.age_group, team_name: createTeam.team_name, team_address: createTeam.team_address, team_session: createTeam.team_session };
			let result = await FetchPostApi(API_Path.createTeam, data);
			let team = await result.json();
			if (result.status === 200) {
				setSeason(false);
				getJoinTeams(user_id, optionJoin);
				getCollegeTeams(user_id, optionCollege);
				toast.success(team.message);
			} else {
				toast.error(team.message);
			}
		} else {
			toast.error("Please select a session");
		}
	};

	const handleSportss = (e) => {
		if (e.target.checked) {
			setCreateTeam({ ...createTeam, sport_name: e.target.value });
		}
	};

	const handleTeamType = (e) => {
		if (e.target.checked) {
			setCreateTeam({ ...createTeam, team_type: e.target.value });
		}
	};

	const handleAgeGroup = (e) => {
		if (e.target.checked) {
			setCreateTeam({ ...createTeam, age_group: e.target.value });
		}
	};

	const handleAddress = (e) => {
		setCreateTeam({ ...createTeam, team_address: e.target.value });
	};

	const handleName = (e) => {
		setCreateTeam({ ...createTeam, team_name: e.target.value });
	};

	const handleSession = (e) => {
		setCreateTeam({ ...createTeam, team_session: e.target.value });
	};

	const handleUpdateTeam = async (formData) => {
		let result = await FetchPostApi(API_Path.updateATeam, formData);
		let team = await result.json();
		if (result.status === 200) {
			getATeam(oneTeamId);
			toast.success(team.message);
		} else {
			toast.error(team.message);
		}
	};

	const handleScheduleEvent = async (id) => {
		let result = await FetchPostApi(API_Path.getScheduleEvent, { _id: id, search: "" });
		let team = await result.json();
		if (result.status === 200) {
			setScheduleEvent(team.data.upcomming);
		} else {
			toast.error(team.message);
		}
	};

	const handleJoinTeam = async () => {
		let result = await FetchPostApi(API_Path.joinTeam, { team_id: oneTeamId, user_id: user_id });
		let team = await result.json();
		if (result.status === 200) {
			setJoinTeam(!JoinTeam);
			toast.success(team.message);
		} else {
			toast.error(team.message);
		}
	};

	const removeMember = async (user_id) => {
		let result = await FetchPostApi(API_Path.removeUser, { team_id: oneTeamId, user_id: user_id });
		let team = await result.json();
		if (result.status === 200) {
			getATeam(oneTeamId);
			toast.success(team.message);
		} else {
			toast.error(team.message);
		}
	};

	const acceptRequest = async (id) => {
		let result = await FetchPostApi(API_Path.requestAcceptByCoach, { Req_id: id });
		let team = await result.json();
		if (result.status === 200) {
			getATeam(oneTeamId);
			toast.success(team.message);
		} else {
			toast.error(team.message);
		}
	};

	const declineRequest = async (id) => {
		let result = await FetchPostApi(API_Path.requestDeclineByCoach, { Req_id: id });
		let team = await result.json();
		if (result.status === 200) {
			getATeam(oneTeamId);
			toast.success(team.message);
		} else {
			toast.error(team.message);
		}
	};

	const getInviteList = async (Search) => {
		let result = await FetchPostApi(API_Path.inviteMembers, { search: Search, team_id: oneTeamId });
		let team = await result.json();
		if (result.status === 200) {
			setInviteList(team.data.inviteMember);
		} else {
			toast.error(team.message);
		}
	};

	const handleInviteNew = () => {
		setInviteList([]);
		setTeamState({ ...teamState, teamSetting: false, teamInvite: true });
		getInviteList(searchInviteList);
	};

	const inviteClick = (status, id) => {
		if (!status) {
			setAssign({ member_role: "", member_number: "" });
			setAsignRole(true);
			setInviteId({ ...inviteId, status: status, id: id });
		} else if (status === "invited") {
			sendInvite(id);
			setInviteList([]);
			getInviteList(searchInviteList);
		} else if (status === "joined") {
			toast.warning("Member already joined");
		}
	};

	const inviteAndAssign = async () => {
		if (assign.member_role && assign.member_number) {
			setAsignRole(!asignrole);
			await sendInvite(inviteId.id);
			assignRoleNumber();
			setInviteList([]);
			getInviteList(searchInviteList);
		} else {
			toast.warning("All fields are mandatory");
		}
	};

	const sendInvite = async (id) => {
		let result = await FetchPostApi(API_Path.inviteTeam, { user_id: id, team_id: oneTeamId });
		let team = await result.json();
		if (result.status === 200) {
			toast.success(team.message);
		} else {
			toast.error(team.message);
		}
	};

	const assignRoleNumber = async () => {
		let result = await FetchPostApi(API_Path.assignRNumber, { team_id: oneTeamId, member_id: inviteId.id, member_number: assign.member_number, member_role: assign.member_role });
		let team = await result.json();
		if (result.status === 200) {
			toast.success(team.message);
		} else {
			toast.error(team.message);
		}
	};

	const mainCoachReplace = async () => {
		if (selectCoach) {
			let result = await FetchPostApi(API_Path.mainCoachReplacement, { user_id: selectCoach, team_id: oneTeamId });
			let team = await result.json();
			if (result.status === 200) {
				setLeaveTeam(!leaveteam);
				getATeam(oneTeamId);
				toast.success(team.message);
			} else {
				toast.error(team.message);
			}
		} else {
			toast.warning("Please select a coach");
		}
	};

	const leaveTeamToggle = () => {
		if (subCoach.length > 0) {
			setLeaveTeam(true);
		} else {
			toast.warning("No subcoach available to replace and leave");
		}
	};

	const handleTabChange = async (e) => {
		if (e === "schedule") {
			handleScheduleEvent(team._id);
		}
		else if (e === "manage-member") {
			getATeam(oneTeamId);
		}
	};

	const toggle = () => {
		if (createTeam.team_type === "Local League / Rec / Other") {
			setLeague(true);
		} else {
			setSchool(true);
		}
	};

	const handleTeamClick = (type) => {
		setTeamState({ ...teamState, [type]: true });
	};

	const handleTeamClose = (type) => {
		setTeamState({ ...teamState, [type]: false });
		getJoinTeams(user_id, optionJoin);
		getCollegeTeams(user_id, optionCollege);
	};

	const handleTeamSetting = () => {
		setSearchInviteList("");
		setTeamState({ ...teamState, teamDetail: false, teamSetting: true });
	};

	const profileimgupdate = async (e) => {
		if (e.target.files[0]) {
			let formData = new FormData();
			formData.append("images", e.target.files[0]);
			let result = await ImagePostApi(API_Path.addImage, formData);
			let getImage = await result.json();
			if (result.status === 200) {
				// setTeam_image(getImage.data.img[0]);
				setTeam({ ...team, team_img: getImage.data.img[0] })
			} else {
				toast.error(getImage.message);
			}
		}
	};

	const handleEventClick = (id) => {
		setTeamState({ teamDetail: false, teamInvite: false, teamSetting: false, clickEvent: true });
		seteventID(id);
	};

	const loadMoreJoin = () => {
		getJoinTeams(user_id, { ...optionJoin, sizePerPage: optionJoin.sizePerPage + 16 });
		setOptionJoin({ ...optionJoin, sizePerPage: optionJoin.sizePerPage + 16 });
	};

	const loadMoreCollege = () => {
		getCollegeTeams(user_id, { ...optionCollege, sizePerPage: optionCollege.sizePerPage + 16 });
		setOptionCollege({ ...optionCollege, sizePerPage: optionCollege.sizePerPage + 16 });
	};

	return (
		<MainLayout>
			<section className="gray-bg-section">
				<div className="container">
					<div className="row me-0">
						<div className="col-xl-2 col-md-3">
							{signupType == 4 ? <StudentProfileLayout /> : <ProfileLayout />}
						</div>
						<div className="col-xl-10 col-md-9 pe-0">
							{(loader && loading.your && loading.college) ? (
								<Loader />
							) : (
								teamState.teamDetail === false &&
								teamState.teamSetting === false &&
								teamState.teamInvite === false &&
								teamState.clickEvent === false && (
									<>
										<div className="row">
											<div className="col-12 mt-md-0 mt-3">
												<div className="d-sm-flex align-items-center">
													<div className="tabs-heading-txt text-center">
														<h5>Team</h5>
													</div>
													<div className="ms-sm-auto d-sm-flex">
														{defaultView &&
															<>
																<div className="position-relative ">
																	<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6C6A81" className="bi bi-search fix-in-icon" viewBox="0 0 16 16">
																		<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
																	</svg>
																	<input type="Search" className="form-control login-comn-input searchbar ps-5" placeholder="Search" value={optionGetTeams.search.team_name} onChange={(e) => inputChangedTeam(e)} />
																</div>
																<div className="ps-sm-3 mt-2 mt-sm-0">
																	<button
																		className="comn-btn-class px-4"
																		onClick={() => {
																			setSelectSportTeam(true);
																			setCreateTeam({ sport_name: "", team_type: "", age_group: "", team_name: "", team_address: "", team_session: "" });
																		}}
																	>
																		Create Team
																	</button>
																</div>
															</>
														}

														<div className="ps-sm-3 mt-3 mt-sm-0 ">
															<div className="">
																<button className="gray-btn w-100" onClick={() => { setjoinTeam(!joinTeam); setDefaultView(!defaultView) }}>
																	<img src="./assets/images/team-union.png" alt="" />
																</button>
															</div>
														</div>
													</div>

												</div>
											</div>
										</div>
										{defaultView &&
											<>
												<div className="team-staff-div mt-3">
													<h6>Your Team</h6>
												</div>
												<div className="row me-0 team-type">
													{yourTeam.length > 0 ? (
														yourTeam.map((item, i) => {
															return (
																<div key={i} className="col-xl-3 col-lg-4 col-sm-6 mb-3 pe-0 pointer">
																	<div
																		className="team-box-class"
																		onClick={() => {
																			handleTeamClick("teamDetail");
																			getATeam(item._id);
																		}}
																	>
																		<div className="team-img-div mx-auto">
																			<img src={item.team_img ? item.team_img : require("../assets/images/defaultStrPic.png")} alt="profile" />
																		</div>
																		<div className="team-body-txt">
																			<span>{item.team_name}</span>
																			<div>
																				<p className="position-relative">
																					{item?.sport_name} <bdi></bdi> {item?.team_session}
																				</p>
																				<p className="mb-0 mt-auto">{item?.team_address}</p>
																			</div>
																		</div>
																		{item.join_team === true && (
																			<div className="joined-status">
																				<span>joined</span>
																			</div>
																		)}
																	</div>
																</div>
															);
														})
													) : (
														<div className="div-content-center h-230">
															<h5>No Teams Found</h5>
														</div>
													)}
													{totalJoin > optionJoin.sizePerPage && (
														<div className="text-center mt-3">
															<button className="comn-btn-class w-auto" disabled={loading.your} onClick={() => loadMoreJoin()}>
																{loading.your ? "Loading..." : "Load More"}
															</button>
														</div>
													)}
												</div>
												<div className="team-staff-div mt-3">
													<h6>College Team</h6>
												</div>
												<div className="row me-0 team-type">
													{collegeTeam?.length > 0 ? (
														collegeTeam?.map((item, i) => {
															return (
																<div key={i} className="col-xl-3 col-lg-4 col-sm-6 mb-3 pe-0 pointer">
																	<div
																		className="team-box-class"
																		onClick={() => {
																			handleTeamClick("teamDetail");
																			getATeam(item?._id);
																		}}
																	>
																		<div className="team-img-div mx-auto">
																			<img src={item?.team_img ? item.team_img : require("../assets/images/defaultStrPic.png")} alt="profile" className="img-round" />
																		</div>
																		<div className="team-body-txt">
																			<span>{item?.team_name}</span>
																			<div className="">
																				<p className="position-relative">
																					{item?.sport_name} <bdi></bdi> {item?.team_session}
																				</p>
																				<p className="mb-0 mt-auto">{item?.team_address}</p>
																			</div>
																		</div>
																		{item?.join_team === true && (
																			<div className="joined-status">
																				<span>joined</span>
																			</div>
																		)}
																	</div>
																</div>
															);
														})
													) : (
														<div className="div-content-center h-230">
															<h5>No Teams Found</h5>
														</div>
													)}
													{totalCollege > optionCollege.sizePerPage && (
														<div className="text-center mt-3">
															<button className="comn-btn-class w-auto" disabled={loading.college} onClick={() => loadMoreCollege()}>
																{loading.college ? "Loading..." : "Load More"}
															</button>
														</div>
													)}
												</div>
											</>
										}
									</>
								)
							)}
							{/* ======================== Team Details ====================== */}
							{teamState.teamDetail && (
								<div className="row">
									<div className="col-12">
										<div className="mt-3 mt-md-0 tabs-heading-txt">
											<h5 className="mb-0">Team Details </h5>
										</div>
										<div className="market-head-txt">
											<span>
												<bdi className="pointer" onClick={() => handleTeamClose("teamDetail")}>
													Teams
												</bdi>
											</span>
											<span> &gt; </span>
											<span> {team?.team_name} Details </span>
										</div>
									</div>
									<div className="col-12 mt-3">
										<div className="d-sm-flex align-items-center justify-content-between team-join-class p-3">
											<div className="d-flex align-items-center">
												<div className="team-img-div">
													<img src={team?.team_img ? team.team_img : require("../assets/images/defaultStrPic.png")} alt="profile" className="img-round" />
												</div>
												<div className="ms-3 team-detail-name">
													<span>{team?.team_name}</span>
													<p className="position-relative mb-0">
														{team?.sport_name} <bdi></bdi> {team?.team_session}
													</p>
												</div>
											</div>
											<div className="mt-3 mt-md-0 d-flex ms-auto">
												{user_id !== team?.coach?._id && (
													<div className="me-3 ">
														<button className="comn-btn-class team-btn-fit" onClick={() => setJoinTeam(true)}>
															Join Team
														</button>
													</div>
												)}
												<div className="">
													<button className="comn-btn-class team-btn-fit" onClick={() => handleTeamSetting()}>
														Team Setting
													</button>
												</div>
											</div>
										</div>
									</div>
									<div className="col-12 mt-3">
										<Tab.Container id="left-tabs-example" defaultActiveKey="members" onSelect={(e) => handleTabChange(e)}>
											<div className="comn-tab-sec  position-relative">
												<Nav variant="pills">
													<Nav.Item>
														<Nav.Link eventKey="members" className="shadow-none">
															Members
														</Nav.Link>
													</Nav.Item>
													<Nav.Item>
														<Nav.Link eventKey="schedule" className="shadow-none">
															Schedule
														</Nav.Link>
													</Nav.Item>
													<Nav.Item>
														<Nav.Link eventKey="update" className="shadow-none">
															Update
														</Nav.Link>
													</Nav.Item>
												</Nav>
											</div>
											<Tab.Content>
												<Tab.Pane eventKey="members">
													<TeamMemberTab team={team} />
												</Tab.Pane>
												<Tab.Pane eventKey="schedule">
													<TeamEventTab scheduleEvent={scheduleEvent} handleEventClick={handleEventClick} />
												</Tab.Pane>
												<Tab.Pane eventKey="update">
													<TeamUpdateTab />
												</Tab.Pane>
											</Tab.Content>
										</Tab.Container>
									</div>
								</div>
							)}
							{/* ======================== Team Settings ====================== */}
							{teamState.teamSetting && (
								<div className="row">
									<div className="col-12">
										<div className="my-3 mt-md-0 tabs-heading-txt">
											<h5 className="mb-0">Settings</h5>
											<div className="market-head-txt mt-10">
												<span>
													<bdi className="pointer" onClick={() => handleTeamClose("teamSetting")}>
														Teams
													</bdi>
												</span>
												<span> &gt; </span>
												<span>
													<bdi className="pointer" onClick={() => setTeamState({ ...teamState, teamSetting: false, teamDetail: true })}>
														{team?.team_name} Details
													</bdi>
												</span>
												<span> &gt; </span>
												<span> {team?.team_name} Settings </span>
											</div>
										</div>
									</div>
									<div className="col-12">
										<Tab.Container id="left-tabs-example" defaultActiveKey="team-info" onSelect={(e) => handleTabChange(e)}>
											<div className="comn-tab-sec d-lg-flex position-relative">
												<Nav variant="pills">
													<Nav.Item>
														<Nav.Link eventKey="team-info">
															<span className="tab-set-icon">
																<svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="me-1" xmlns="http://www.w3.org/2000/svg">
																	<path d="M10.01 -4.68805e-06C15.5315 0.00552138 20.0037 4.48512 20 10.0067C19.9963 15.5282 15.5182 20.0018 9.99667 20C4.47512 19.9982 3.91519e-07 15.5215 8.74228e-07 10C0.00331442 4.47462 4.48462 -0.00221007 10.01 -4.68805e-06ZM18 9.828C17.9527 5.42676 14.3589 1.89046 9.95746 1.914C5.55603 1.93777 2.00046 5.51251 2.00046 9.914C2.00046 14.3155 5.55603 17.8902 9.95746 17.914C14.3589 17.9375 17.9527 14.4012 18 10L18 9.828ZM9 5L11 5L11 7L9 7L9 5ZM9 9L11 9L11 15L9 15L9 9Z" fill="#6a58fb" />
																</svg>
															</span>
															Team Information
														</Nav.Link>
													</Nav.Item>
													{user_id === team?.coach?._id && (
														<Nav.Item>
															<Nav.Link eventKey="manage-member">
																<span className="tab-set-icon">
																	<svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="me-1" xmlns="http://www.w3.org/2000/svg">
																		<path d="M16 7V10M16 10V13M16 10H19M16 10H13M11 5C11 7.20914 9.20914 9 7 9C4.79086 9 3 7.20914 3 5C3 2.79086 4.79086 1 7 1C9.20914 1 11 2.79086 11 5ZM1 18C1 14.6863 3.68629 12 7 12C10.3137 12 13 14.6863 13 18V19H1V18Z" stroke="#6a58fb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
																	</svg>
																</span>
																Manage Members
															</Nav.Link>
														</Nav.Item>
													)}
												</Nav>
												<div className="ms-auto mt-3 mt-lg-0">
													<button className="comn-btn-class px-4" onClick={() => handleInviteNew()}>
														<span>
															<svg width="14" height="14" viewBox="0 0 20 20" fill="none" className="me-2" xmlns="http://www.w3.org/2000/svg">
																<path d="M16 7V10M16 10V13M16 10H19M16 10H13M11 5C11 7.20914 9.20914 9 7 9C4.79086 9 3 7.20914 3 5C3 2.79086 4.79086 1 7 1C9.20914 1 11 2.79086 11 5ZM1 18C1 14.6863 3.68629 12 7 12C10.3137 12 13 14.6863 13 18V19H1V18Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
															</svg>
														</span>
														Invite New
													</button>
												</div>
											</div>
											<Tab.Content>
												<Tab.Pane eventKey="team-info">
													<TeamInfoTab user_id={user_id} team={team} handleUpdateTeam={handleUpdateTeam} profileimgupdate={profileimgupdate} leaveTeamToggle={leaveTeamToggle} setSelectCoach={setSelectCoach} />
												</Tab.Pane>
												<Tab.Pane eventKey="manage-member">
													<TeamManageTab team={team} removeMember={removeMember} declineRequest={declineRequest} acceptRequest={acceptRequest} />
												</Tab.Pane>
											</Tab.Content>
										</Tab.Container>
									</div>
								</div>
							)}
							{/* =========== Team INVITE ================ */}
							{teamState.teamInvite && (
								<div className="row">
									<div className="col-12">
										<div className="my-3 mt-md-0 tabs-heading-txt">
											<h5 className="mb-0">Settings</h5>
										</div>
										<div className="market-head-txt mt-10">
											<span>
												<bdi
													className="pointer"
													onClick={() => {
														setTeamState({ teamDetail: false, teamInvite: false, teamSetting: false, clickEvent: false });
														getJoinTeams(user_id, optionJoin);
														getCollegeTeams(user_id, optionCollege);
													}}
												>
													Teams
												</bdi>
											</span>
											<span> &gt; </span>
											<span>
												<bdi className="pointer" onClick={() => setTeamState({ ...teamState, teamInvite: false, teamSetting: false, teamDetail: true })}>
													{team?.team_name} Details
												</bdi>
											</span>
											<span> &gt; </span>
											<span>
												<bdi className="pointer" onClick={() => setTeamState({ ...teamState, teamDetail: false, teamInvite: false, teamSetting: true })}>
													{team?.team_name} Settings
												</bdi>
											</span>
											<span> &gt; </span>
											<span> Invite </span>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-5 mt-3">
											<div className="position-relative ms-sm-auto">
												<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6C6A81" className="bi bi-search fix-in-icon" viewBox="0 0 16 16">
													<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
												</svg>
												<input type="Search" className="form-control login-comn-input searchbar ps-5" placeholder="Search" value={searchInviteList} onChange={(e) => inputChangedInvite(e)} />
											</div>
										</div>
									</div>
									{inviteList?.length > 0 &&
										inviteList?.map((item, i) => {
											return (
												<div className="col-xl-3 col-sm-4 mt-3" key={i}>
													<div className="team-req-box-accept text-center p-3">
														<div>
															<img src={item?.profile_img ? item.profile_img : "../assets/images/defaultPropic.png"} alt="" />
															<span>{item?.name}</span>
															<bdi>{item?.signupType}</bdi>
														</div>
														<div>
															<button className="comn-white-btn mt-3" data={item?.is_join ? item?.is_join : "INVITE"} onClick={() => inviteClick(item?.is_join, item?._id)}></button>
														</div>
													</div>
												</div>
											);
										})}
								</div>
							)}
							{/* ============ Join Team Invitation Model =========== */}
							{joinTeam && <TeamInvitation user_id={user_id} />}

							{/* =============================== Event Details ===================================  */}
							{teamState.clickEvent && <EventDetails setEventState={setTeamState} eventState={teamState} eventId={eventID} teamName={team?.team_name} />}
						</div>
					</div>
				</div>
			</section>
			{/* =============== Select Sport Team Modal============= */}
			{selectsportteam && (
				<Modal show={selectsportteam} onHide={() => setSelectSportTeam(false)} size="lg" className="select-team-modal" arialabelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton className="mt-2">
						<div className="add-modal-hdr mx-auto">
							<p>Select your team sport</p>
						</div>
					</Modal.Header>
					<Modal.Body className="pt-0">
						<SportsTeamModal createTeam={createTeam} handleSportss={handleSportss} setTeamType={setTeamType} setSelectSportTeam={setSelectSportTeam} />
					</Modal.Body>
				</Modal>
			)}
			{/* ============= Team Type Modal =========== */}
			{teamtype && (
				<Modal show={teamtype} onHide={() => setTeamType(false)} size="md" className="select-team-modal" arialabelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton className="mt-2">
						<div className="add-modal-hdr mx-auto">
							<p>Select your team type</p>
						</div>
					</Modal.Header>
					<Modal.Body className="pt-0">
						<TeamTypeModal createTeam={createTeam} handleTeamType={handleTeamType} toggle={toggle} setTeamType={setTeamType} />
					</Modal.Body>
				</Modal>
			)}
			{/* ============= Local League Modal =========== */}
			{league && (
				<Modal show={league} onHide={() => setLeague(false)} size="lg" className="select-team-modal" arialabelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton className="mt-2">
						<div className="add-modal-hdr mx-auto">
							<p>How old are your players?</p>
						</div>
					</Modal.Header>
					<Modal.Body>
						<LocalLeagueModal createTeam={createTeam} handleAgeGroup={handleAgeGroup} setLocate={setLocate} setLeague={setLeague} />
					</Modal.Body>
				</Modal>
			)}
			{/* ============ School Modal =========== */}
			{school && (
				<Modal show={school} onHide={() => setSchool(false)} size="md" className="select-team-modal" arialabelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton className="mt-2">
						<div className="add-modal-hdr mx-auto">
							<p>How old are your players?</p>
						</div>
					</Modal.Header>
					<Modal.Body>
						<SchoolModal createTeam={createTeam} handleAgeGroup={handleAgeGroup} setLocate={setLocate} setSchool={setSchool} />
					</Modal.Body>
				</Modal>
			)}
			{/* ============= Locate Modal =========== */}
			{locate && (
				<Modal show={locate} onHide={() => setLocate(false)} size="md" className="select-team-modal" arialabelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton className="mt-2">
						<div className="add-modal-hdr mx-auto">
							<p>Where is your team based?</p>
						</div>
					</Modal.Header>
					<Modal.Body>
						<LocateModal createTeam={createTeam} handleAddress={handleAddress} handleName={handleName} setSeason={setSeason} setLocate={setLocate} />
					</Modal.Body>
				</Modal>
			)}
			{/* ============= Season Modal =========== */}
			{season && (
				<Modal show={season} onHide={() => setSeason(false)} size="md" className="select-team-modal" arialabelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton className="mt-2">
						<div className="add-modal-hdr mx-auto">
							<p>Select your team season</p>
						</div>
					</Modal.Header>
					<Modal.Body>
						<SeasonModal createTeam={createTeam} handleSession={handleSession} handleCreateTeam={handleCreateTeam} />
					</Modal.Body>
				</Modal>
			)}
			{/* =============== Asign Role & Number ============= */}
			{asignrole && (
				<Modal show={asignrole} onHide={() => setAsignRole(false)} size="md" className="comn-modal-style" arialabelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton className="mt-2">
						<div className="add-modal-hdr mx-auto">
							<p>Asign Role & Number</p>
						</div>
					</Modal.Header>
					<Modal.Body className="pt-0">
						<AsignRoleModal assign={assign} setAssign={setAssign} inviteAndAssign={inviteAndAssign} />
					</Modal.Body>
				</Modal>
			)}
			{/* ============ LEAVE TEAM MODAL =========== */}
			{leaveteam && (
				<Modal show={leaveteam} onHide={() => setLeaveTeam(false)} size="md" className="select-team-modal" arialabelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton className="mt-2">
						<div className="add-modal-hdr d-inline-block mx-auto">
							<p>Assign Head Coach Position</p>
							<span>You can leave team only after assign someone as a Headcoach</span>
						</div>
					</Modal.Header>
					<Modal.Body className="pt-0">
						<LeaveTeamModal subCoach={subCoach} mainCoachReplace={mainCoachReplace} setSelectCoach={setSelectCoach} />
					</Modal.Body>
				</Modal>)}
			{/* ============ JOIN TEAM MODAL =========== */}
			{JoinTeam && (
				<Modal show={JoinTeam} onHide={() => setJoinTeam(false)} size="md" className="comn-modal-style" arialabelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton className="mt-2">
						<div className="add-modal-hdr d-inline-block mx-auto text-center">
							<p>Request To Be Part of the team</p>
						</div>
					</Modal.Header>
					<Modal.Body className="pt-0">
						<JoinTeamModal JoinTeam={JoinTeam} setJoinTeam={setJoinTeam} handleJoinTeam={handleJoinTeam} />
					</Modal.Body>
				</Modal>)}

		</MainLayout>
	);
}
