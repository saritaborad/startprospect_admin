import React, { useState, useEffect } from 'react'
import { errorContainer, formAttr } from "../../Api/Const";
import { Formik } from "formik";
import * as Yup from "yup";

export default function TeamInfoTab(props) {

    const { user_id, team, handleUpdateTeam, profileimgupdate, leaveTeamToggle, setSelectCoach } = props;
    const [userID, setUserID] = useState("")
    const [teamInfo, setTeamInfo] = useState({})
    const [type, setType] = useState("");

    useEffect(() => {
        setUserID(user_id);
        setTeamInfo(team);
    }, [props])

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    _id: teamInfo._id ?? "",
                    sport_name: teamInfo.sport_name ?? "",
                    team_type: teamInfo.team_type ?? "",
                    age_group: teamInfo.age_group ?? "",
                    team_name: teamInfo.team_name ?? "",
                    team_address: teamInfo.team_address ?? "",
                    team_session: teamInfo.team_session ?? "",
                    team_img: teamInfo.team_img ?? "",
                }}
                validationSchema={Yup.object({
                    sport_name: Yup.string().required("Please select your Sport"),
                    team_type: Yup.string().required("Please select your Team Type"),
                    age_group: Yup.string().required("Please select your Age Group"),
                    team_name: Yup.string().min(2, "Team Name should have more than 1 character").required("Team Name is required"),
                    team_address: Yup.string().min(2, "Location should have more than 1 character").required("Location is required"),
                    team_session: Yup.string().required("Please select Event type"),
                    team_img: Yup.string().required("Please select Team Image"),
                })}
                onSubmit={(formData) => handleUpdateTeam(formData)}
            >
                {(runform) => (
                    <form onSubmit={runform.handleSubmit}>
                        <div className="row">
                            <div className="col-12 mt-3">
                                <div className="team-info-main p-3">
                                    <div className="row align-items-center me-0">
                                        <div className=" mb-3">
                                            <div className="team-info-img position-relative">
                                                <img src={teamInfo.team_img ? teamInfo.team_img : '../../assets/defaultProPic.png'} alt="" />
                                                <div className="team-info-cam">
                                                    <label htmlFor="upload-img">
                                                        <input type="file" id="upload-img" name="upload-img" hidden accept=".png, .jpg, .jpeg" onChange={(e) => profileimgupdate(e)} />
                                                        <img src="../assets/images/Profile-cam-icon.svg" alt="" />
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-lg-6 col-sm-6 mb-3 pe-0">
                                            <label className="comn-label-class">Team Name</label>
                                            <bdi className="d-block position-relative">
                                                <input type="text" className="form-control comn-input-style ps-3" placeholder="Enter Your Team Name" name="team_name" {...formAttr(runform, "team_name")} />
                                                {errorContainer(runform, "team_name")}
                                            </bdi>
                                        </div>
                                        <div className="col-lg-6 col-sm-6 mb-3 pe-0">
                                            <label className="comn-label-class">Sport</label>
                                            <bdi className="d-block position-relative">
                                                <select className="comn-input-select form-select m-0" name="sport_name" {...formAttr(runform, "sport_name")}>
                                                    <option value="Basketball">Basketball</option>
                                                    <option value="Bowling">Bowling</option>
                                                    <option value="Cross Country">Cross Country</option>
                                                    <option value="Field Hockey">Field Hockey</option>
                                                    <option value="Football">Football</option>
                                                    <option value="Wrestling">Wrestling</option>
                                                    <option value="Golf">Golf</option>
                                                    <option value="Hockey">Hockey</option>
                                                    <option value="Lacrosse">Lacrosse</option>
                                                    <option value="Soccer">Soccer</option>
                                                    <option value="Softball">Softball</option>
                                                    <option value="Swimming & Diving">Swimming & Diving</option>
                                                    <option value="Water Polo">Water Polo</option>
                                                    <option value="Tennis">Tennis</option>
                                                    <option value="Track & Field">Track & Field</option>
                                                    <option value="Volleyball">Volleyball</option>
                                                    <option value="Cheerleading">Cheerleading</option>
                                                    <option value="Crew & Rowing">Crew & Rowing</option>
                                                    <option value="Rugby">Rugby</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                {errorContainer(runform, "sport_name")}
                                            </bdi>
                                        </div>
                                        <div className="col-lg-6 col-sm-6 mb-3 pe-0">
                                            <label className="comn-label-class">Team Type</label>
                                            <bdi className="d-block position-relative">
                                                <select className="comn-input-select form-select m-0" name="team_type" onClick={(e) => setType(e.target.value)}  {...formAttr(runform, "team_type")}>
                                                    <option value="Local League / Rec / Other">Local League / Rec / Other</option>
                                                    <option value="School">School</option>
                                                </select>
                                                {errorContainer(runform, "team_type")}
                                            </bdi>
                                        </div>
                                        <div className="col-lg-6 col-sm-6 mb-3 pe-0">
                                            <label className="comn-label-class">Location</label>
                                            <bdi className="d-block position-relative">
                                                <input type="text" className="form-control comn-input-style ps-3" placeholder="Enter location" name="team_address" {...formAttr(runform, "team_address")} />
                                                {errorContainer(runform, "team_address")}
                                            </bdi>
                                        </div>
                                        <div className="col-lg-6 col-sm-6 mb-3 pe-0">
                                            <label className="comn-label-class">Age Group</label>
                                            <bdi className="d-block position-relative">
                                                {type !== "School" ? (<select className="comn-input-select form-select m-0" name="age_group" {...formAttr(runform, "age_group")}>
                                                    <option value="Pro">Pro</option>
                                                    <option value="Under 13">Under 13</option>
                                                    <option value="Between 13-18">Between 13-18</option>
                                                    <option value="Over 18">Over 18</option>
                                                </select>) :
                                                    (<select className="comn-input-select form-select m-0" name="age_group" {...formAttr(runform, "age_group")}>
                                                        <option value="Pro">Pro</option>
                                                        <option value="Pre High School">Pre High School</option>
                                                        <option value="High School">High School</option>
                                                        <option value="College">College</option>
                                                    </select>)}
                                                {errorContainer(runform, "age_group")}
                                            </bdi>
                                        </div>
                                        <div className="col-lg-6 col-sm-6 mb-3 pe-0">
                                            <label className="comn-label-class">Current Season</label>
                                            <bdi className="d-block position-relative">
                                                <select className="comn-input-select form-select m-0" name="team_session" {...formAttr(runform, "team_session")} >
                                                    <option value={`Spring ${new Date().getFullYear()}`}>Spring {new Date().getFullYear()}</option>
                                                    <option value={`Summer ${new Date().getFullYear()}`}>Summer {new Date().getFullYear()}</option>
                                                    <option value={`Fall ${new Date().getFullYear()}`}>Fall {new Date().getFullYear()}</option>
                                                    <option value={`Winter ${new Date().getFullYear()} - ${new Date().getFullYear() + 1}`}>Winter {new Date().getFullYear()} - {new Date().getFullYear() + 1}</option>
                                                    <option value={`Spring ${new Date().getFullYear() + 1}`}>Spring {new Date().getFullYear() + 1}</option>
                                                    <option value={`Summer ${new Date().getFullYear() + 1}`}>Summer {new Date().getFullYear() + 1}</option>
                                                </select>
                                                {errorContainer(runform, "team_session")}
                                            </bdi>
                                        </div>
                                        <div className="col-xxl-3 col-xl-4 col-md-6 mt-3 mx-md-0 mx-sm-auto">
                                            <button className="comn-btn-class" type="submit">
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
            {userID === teamInfo?.coach?._id && (
                <div
                    className="team-info-main p-3 mt-3 pointer"
                    onClick={() => {
                        leaveTeamToggle();
                        setSelectCoach("");
                    }}
                >
                    <div className="d-flex align-items-center">
                        <div>
                            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 13L19 9M19 9L15 5M19 9L5 9M11 13V14C11 15.6569 9.65686 17 8 17H4C2.34315 17 1 15.6569 1 14V4C1 2.34315 2.34315 1 4 1H8C9.65686 1 11 2.34315 11 4V5" stroke="#EB5757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="leave-team-class ms-2">Leave Team</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
