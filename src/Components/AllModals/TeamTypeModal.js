import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export default function TeamTypeModal(props) {

    const { createTeam, handleTeamType, toggle, setTeamType } = props;
    const [makeTeam, setMakeTeam] = useState({});

    useEffect(() => {
        setMakeTeam(createTeam)
    }, [props]);

    return (
        <>
            <div className="team-type-modal">
                <ul>
                    <li>
                        <div className="cust-radio-box d-flex align-items-center mt-3">
                            <input name="team" type="radio" id="selectTeam-1" value="Local League / Rec / Other" onClick={(e) => handleTeamType(e)} />
                            <label className="cust-radio-main w-100 team-1 p-3" htmlFor="selectTeam-1">
                                <div className="d-flex align-items-center position-relative">
                                    <img src="./assets/images/Home-icon.png" alt="" className="me-3" />
                                    <span>Local League / Rec / Other</span>
                                    <span className="team-right-arrow">
                                        <svg width="10" height="10" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.71289 7.00172L1.70289 0.991718L0.288891 2.40572L4.88889 7.00572L0.288891 11.6057L1.70289 13.0117L7.71289 7.00172Z" fill="#323232" />
                                        </svg>
                                    </span>
                                </div>
                            </label>
                        </div>
                    </li>
                    <li>
                        <div className="cust-radio-box d-flex align-items-center mt-3">
                            <input name="team" type="radio" id="selectTeam-2" value="School" onClick={(e) => handleTeamType(e)} />
                            <label className="cust-radio-main w-100 team-1 p-3" htmlFor="selectTeam-2">
                                <div className="d-flex align-items-center position-relative">
                                    <img src="./assets/images/School-icon.png" alt="" className="me-3" />
                                    <span>School</span>
                                    <span className="team-right-arrow">
                                        <svg width="10" height="10" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.71289 7.00172L1.70289 0.991718L0.288891 2.40572L4.88889 7.00572L0.288891 11.6057L1.70289 13.0117L7.71289 7.00172Z" fill="#323232" />
                                        </svg>
                                    </span>
                                </div>
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
            <div>
                <button className="comn-btn-class mt-3" onClick={!makeTeam.team_type ? () => toast.warning("Please select your team type") : () => toggle() || setTeamType(false)}>
                    NEXT
                </button>
            </div>
        </>
    )
}
