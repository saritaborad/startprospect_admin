import React, { useState, useEffect } from 'react'

export default function LeaveTeamModal(props) {

    const { subCoach, mainCoachReplace, setSelectCoach } = props;
    const [subCoachTeam, setSubCoachTeam] = useState([]);

    useEffect(() => {
        setSubCoachTeam(subCoach);
    }, [props]);

    return (
        <>
            <div className="team-type-modal">
                <ul>
                    {subCoachTeam.length > 0 &&
                        subCoachTeam.map((item, i) => {
                            return (
                                <li key={i}>
                                    <div className="cust-radio-box d-flex align-items-center mt-3">
                                        <input name="team" type="radio" id={i} value={item?.user_id?._id} />
                                        <label className="cust-radio-main w-100 team-1 p-3" htmlFor={i} onClick={() => setSelectCoach(item?.user_id?._id)}>
                                            <div className="d-flex align-items-center position-relative">
                                                <img src={item?.user_id?.profile_img ? item?.user_id?.profile_img : "./assets/images/defaultProPic.png"} alt="" className="review_profile_img me-3" height={40} />
                                                <span>{item?.user_id?.name}</span>
                                                <span className="team-right-arrow">
                                                    <svg width="10" height="10" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.71289 7.00172L1.70289 0.991718L0.288891 2.40572L4.88889 7.00572L0.288891 11.6057L1.70289 13.0117L7.71289 7.00172Z" fill="#323232" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </label>
                                    </div>
                                </li>
                            );
                        })}
                </ul>
            </div>
            <div>
                <button className="comn-btn-class mt-3" onClick={() => mainCoachReplace()}>
                    Assign & leave
                </button>
            </div>
        </>
    )
}
