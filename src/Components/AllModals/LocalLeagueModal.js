import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';

export default function LocalLeagueModal(props) {

    const { createTeam, handleAgeGroup, setLocate, setLeague } = props;
    const [makeTeam, setMakeTeam] = useState({});

    useEffect(() => {
        setMakeTeam(createTeam)
    }, [props]);

    return (
        <>
            <div className="">
                <ul className="row me-0">
                    <li className="col-sm-6 pe-0">
                        <div className="cust-radio-box d-flex align-items-center mt-3">
                            <input name="age" type="radio" id="under13" value="Under 13" onClick={(e) => handleAgeGroup(e)} />
                            <label className="cust-radio-main w-100 team-1 p-3" htmlFor="under13">
                                <div className=" league-modal-box d-flex align-items-center position-relative">
                                    <img src="./assets/images/older-icon.png" alt="" className="me-3" />
                                    <span>Under 13</span>
                                    <span className="team-right-arrow">
                                        <svg width="10" height="10" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.71289 7.00172L1.70289 0.991718L0.288891 2.40572L4.88889 7.00572L0.288891 11.6057L1.70289 13.0117L7.71289 7.00172Z" fill="#323232" />
                                        </svg>
                                    </span>
                                </div>
                            </label>
                        </div>
                    </li>
                    <li className="col-sm-6 pe-0">
                        <div className="cust-radio-box d-flex align-items-center mt-3">
                            <input name="age" type="radio" id="Between13-18" value="Between 13-18" onClick={(e) => handleAgeGroup(e)} />
                            <label className="cust-radio-main w-100 team-1 p-3" htmlFor="Between13-18">
                                <div className="league-modal-box d-flex align-items-center position-relative">
                                    <img src="./assets/images/older-icon.png" alt="" className="me-3" />
                                    <span>Between 13-18</span>
                                    <span className="team-right-arrow">
                                        <svg width="10" height="10" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.71289 7.00172L1.70289 0.991718L0.288891 2.40572L4.88889 7.00572L0.288891 11.6057L1.70289 13.0117L7.71289 7.00172Z" fill="#323232" />
                                        </svg>
                                    </span>
                                </div>
                            </label>
                        </div>
                    </li>
                    <li className="col-sm-6 pe-0">
                        <div className="cust-radio-box d-flex align-items-center mt-3">
                            <input name="age" type="radio" id="Over-18" value="Over 18" onClick={(e) => handleAgeGroup(e)} />
                            <label className="cust-radio-main w-100 team-1 p-3" htmlFor="Over-18">
                                <div className="league-modal-box d-flex align-items-center position-relative">
                                    <img src="./assets/images/older-icon.png" alt="" className="me-3" />
                                    <span>Over 18</span>
                                    <span className="team-right-arrow">
                                        <svg width="10" height="10" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.71289 7.00172L1.70289 0.991718L0.288891 2.40572L4.88889 7.00572L0.288891 11.6057L1.70289 13.0117L7.71289 7.00172Z" fill="#323232" />
                                        </svg>
                                    </span>
                                </div>
                            </label>
                        </div>
                    </li>
                    <li className="col-sm-6 pe-0">
                        <div className="cust-radio-box d-flex align-items-center mt-3">
                            <input name="age" type="radio" id="Pro" value="Pro" onClick={(e) => handleAgeGroup(e)} />
                            <label className="cust-radio-main w-100 team-1 p-3" htmlFor="Pro">
                                <div className="league-modal-box d-flex align-items-center position-relative">
                                    <img src="./assets/images/older-icon.png" alt="" className="me-3" />
                                    <span>Pro</span>
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
            <div className="row">
                <div className="col-sm-6 mx-auto">
                    <button className="comn-btn-class mt-3" onClick={!makeTeam.age_group ? () => toast.warning("Please select age category in which players belong") : () => setLocate(true) || setLeague(false)}>
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}
