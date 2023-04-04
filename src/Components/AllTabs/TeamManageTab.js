import React, { useState, useEffect } from 'react'

export default function TeamManageTab(props) {

    const { team, removeMember, declineRequest, acceptRequest } = props;
    const [singleteam, setSingleteam] = useState({});

    useEffect(() => {
        setSingleteam(team);
    }, [props])

    return (
        <div className="row">
            <div className="col-12 mt-3">
                <mark className="event-mark">All Members ({singleteam?.team_member?.length > 0 ? singleteam.team_member.length : 0})</mark>
            </div>
            {singleteam?.team_member?.length > 0 ? (
                singleteam?.team_member?.map((item, i) => {
                    return (
                        <div className="col-xl-3 col-sm-4 mt-3" key={i}>
                            <div className="team-req-box-accept manage-mem-num text-center p-3">
                                <div>
                                    <img src={item?.user_id.profile_img ? item?.user_id.profile_img : "../assets/images/defaultProPic.png"} alt="" />
                                    {item?.member_number ? <bdi className="d-block mt-2"># {item?.member_number}</bdi> : <span> &nbsp; </span>}
                                    <span>{item?.user_id.name}</span>
                                </div>
                                <div className="">
                                    <button type="button" className="comn-btn-decline" onClick={() => removeMember(item.user_id._id)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="div-content-center h-135">
                    <h5>No Members Found</h5>
                </div>
            )}
            <div className="col-12 mt-3">
                <mark className="event-mark">New Request ({singleteam?.User_to_team_req?.length > 0 ? singleteam.User_to_team_req.length : 0})</mark>
            </div>
            {singleteam?.User_to_team_req?.length > 0 ? (
                singleteam?.User_to_team_req?.map((item, i) => {
                    return (
                        <div className="col-xl-4 col-sm-6 mt-3" key={i}>
                            <div className="team-req-box-accept text-center p-3">
                                <div>
                                    <img src={item?.user_id.profile_img ? item.user_id.profile_img : "../assets/images/defaultProPic.png"} alt="" />
                                    <span>{item?.user_id.name}</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <button type="button" className="comn-btn-decline" onClick={() => declineRequest(item?._id)}>
                                        Decline
                                    </button>
                                    <button className="comn-white-btn ms-3" data="accept" onClick={() => acceptRequest(item?._id)}></button>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="div-content-center h-135">
                    <h5>No Requests Found</h5>
                </div>
            )}
        </div>
    )
}
