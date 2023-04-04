import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

export default function TeamMemberTab(props) {

    const { team } = props;
    const navigate = useNavigate();
    const [singleTeam, setSingleTeam] = useState({});

    useEffect(() => {
        setSingleTeam(team);
    }, [props])

    return (
        <div className="row">
            <div className="col-12 mt-3">
                <div className="team-staff-div">
                    <h6>Coaches ({singleTeam?.coach ? 1 + singleTeam?.sub_coach.length : 0})</h6>
                    <div className="row">
                        {singleTeam?.coach ? (
                            <div className="col-2 mb-3 team-col-class pointer" onClick={() => navigate("/market-detail", { state: { athletesId: singleTeam.coach._id, Team: "Team" } })}>
                                <div className="team-staff-box">
                                    <div className="mb-2">
                                        <img src={singleTeam?.coach.profile_img ? singleTeam?.coach.profile_img : require("../../assets/images/defaultStrPic.png")} alt="profile" />
                                    </div>
                                    <p className="mt-auto mb-0">{singleTeam?.coach.name}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="div-content-center h-135">
                                <h6>No Coach Found</h6>
                            </div>
                        )}
                        {singleTeam?.sub_coach?.length > 0 &&
                            singleTeam?.sub_coach.map((item, i) => {
                                return (
                                    <div className="col-2 mb-3 team-col-class pointer" key={i} onClick={() => Navigate("/market-detail", { state: { athletesId: item.user_id._id, Team: "Team" } })}>
                                        <div className="team-staff-box">
                                            <div className="mb-2">
                                                <img src={item.user_id.profile_img ? item.user_id.profile_img : require("../../assets/images/defaultStrPic.png")} alt="profile" />
                                            </div>
                                            <p className="mt-auto mb-0">{item.user_id.name}</p>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="team-staff-div">
                    <h6>Players ({singleTeam?.team_member?.length})</h6>
                    <div className="row me-0">
                        {singleTeam?.team_member?.length > 0 ? (
                            singleTeam?.team_member.map((item, i) => {
                                return (
                                    <div className="col-2 mb-3 team-col-class pe-0 pointer" key={i} onClick={() => navigate("/market-detail", { state: { athletesId: item.user_id._id, Team: "Team" } })}>
                                        <div className="team-staff-box">
                                            <div className="mb-2">
                                                <img src={item.user_id.profile_img ? item.user_id.profile_img : require("../../assets/images/defaultStrPic.png")} alt="profile" />
                                            </div>
                                            {item.member_number ? <span># {item.member_number}</span> : ""}
                                            <p className="mt-auto mb-0">{item.user_id.name}</p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="div-content-center h-135">
                                <h5>No Players Found</h5>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
