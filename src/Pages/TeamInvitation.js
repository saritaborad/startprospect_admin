import React, { useEffect } from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FetchPostApi } from '../Api/apiServices';
import { API_Path } from '../Api/Const';
// import TeamLogo from '../assets/images/team-default.svg'
export default function TeamInvitation(props) {
    const [teamRequest, setTeamRequest] = useState();
    const [userId, setUserId] = useState('');

    useEffect(() => {
        setUserId(props.user_id)
    }, [])

    useEffect(() => {
        userId && getJoinRequest()
    }, [userId])

    const getJoinRequest = async () => {
        let result = await FetchPostApi(API_Path.teamJoin, { user_id: userId });
        let getRequest = await result.json();
        if (result.status === 200) {
            setTeamRequest(getRequest?.data?.Invitations)
        } else {
            toast.error(getRequest.message);
        }
    };

    const acceptRequest = async (id) => {
        let result = await FetchPostApi(API_Path.userAcceptInvitation, { Req_id: id });
        let accept = await result.json();
        if (result.status === 200) {
            getJoinRequest()
        } else {
            toast.error(accept.message);
        }
    };
    const declineRequest = async (id) => {
        let result = await FetchPostApi(API_Path.userDeclineInvitation, { Req_id: id });
        let cancle = await result.json();
        if (result.status === 200) {
            getJoinRequest()
        } else {
            toast.error(cancle.message);
        }
    };
    return (
        <>
            <div className="row">
                <div className="col-12 mt-3 mt-md-0 d-sm-flex align-items-center">
                    <div>
                        <div className="market-head-txt">
                            <span className='d-flex'>
                                <div className='team-cur-set'>Team</div> &gt;
                                <bdi> Invitation</bdi>
                            </span>
                        </div>
                    </div>
                    {/* <div className="position-relative ms-auto mt-3 mt-sm-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6C6A81" className="bi bi-search fix-in-icon" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                        <input type="input" className="form-control login-comn-input searchbar ps-5" placeholder="Search" />
                    </div> */}
                </div>
            </div>
            <div className="row me-0">
                {teamRequest && teamRequest.length > 0 ? teamRequest?.map((item, i) => {
                    return (
                        <div className="col-xl-4 col-sm-6 mt-3 pe-0" key={i}>
                            <div className="team-req-box-accept text-center p-3">
                                <div>
                                    <img src={item?.Team_send_req?.team_id[0]?.team_img} alt="Team logo" />
                                    <span>{item?.Team_send_req?.coach_id[0]?.name}</span>
                                    <bdi>Team {item?.Team_send_req?.team_id[0]?.team_name}</bdi>
                                </div>
                                <div className="d-flex align-items-center">
                                    <button type="button" className="comn-btn-decline  mt-3" onClick={() => declineRequest(item?.Team_send_req?._id)}>
                                        Decline
                                    </button>
                                    <button className="comn-white-btn mt-3 ms-3" data="accept" onClick={() => acceptRequest(item?.Team_send_req?._id)} ></button>
                                </div>
                            </div>
                        </div>
                    )
                }) : <div className="postNotFound">No Invitation</div>
                }
                {/* <div className="col-xl-4 col-sm-6 mt-3 pe-0">
                    <div className="team-req-box-accept text-center p-3">
                        <div>
                            <img src="./assets/images/deal-personal-profile.png" alt="" />
                            <span>John Doe</span>
                            <bdi>Team</bdi>
                        </div>
                        <div className="d-flex align-items-center">
                            <button type="button" className="comn-btn-decline  mt-3 ">
                                Decline
                            </button>
                            <button className="comn-white-btn mt-3 ms-3" data="accept"></button>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-sm-6 mt-3 pe-0">
                    <div className="team-req-box-accept text-center p-3">
                        <div>
                            <img src="./assets/images/deal-personal-profile.png" alt="" />
                            <span>John Doe</span>
                            <bdi>Team</bdi>
                        </div>
                        <div className="d-flex align-items-center">
                            <button type="button" className="comn-btn-decline  mt-3 ">
                                Decline
                            </button>
                            <button className="comn-white-btn mt-3 ms-3" data="accept"></button>
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    )
}
