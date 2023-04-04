import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export default function SeasonModal(props) {

    const { createTeam, handleSession, handleCreateTeam } = props;
    const [makeTeam, setMakeTeam] = useState({});

    useEffect(() => {
        setMakeTeam(createTeam)
    }, [props]);

    return (
        <>
            <div className="row me-0">
                <div className="col-sm-6 mb-3 pe-0">
                    <label className="form-check-label w-100" htmlFor="spring">
                        <div className="cust-radio-div season-modal-box">
                            <div className="form-check">
                                <bdi>Spring {new Date().getFullYear()}</bdi>
                                <input className="form-check-input" type="radio" name="msg" id="spring" value="Spring 2022" onClick={(e) => handleSession(e)} />
                            </div>
                        </div>
                    </label>
                </div>
                <div className="col-sm-6 mb-3 pe-0">
                    <label className="form-check-label w-100" htmlFor="summer">
                        <div className="cust-radio-div season-modal-box">
                            <div className="form-check">
                                <bdi>Summer {new Date().getFullYear()}</bdi>
                                <input className="form-check-input" type="radio" name="msg" id="summer" value="Summer 2022" onClick={(e) => handleSession(e)} />
                            </div>
                        </div>
                    </label>
                </div>
                <div className="col-sm-6 mb-3 pe-0">
                    <label className="form-check-label w-100" htmlFor="fall">
                        <div className="cust-radio-div season-modal-box">
                            <div className="form-check">
                                <bdi>Fall {new Date().getFullYear()}</bdi>
                                <input className="form-check-input" type="radio" name="msg" id="fall" value="Fall 2022" onClick={(e) => handleSession(e)} />
                            </div>
                        </div>
                    </label>
                </div>
                <div className="col-sm-6 mb-3 pe-0">
                    <label className="form-check-label w-100" htmlFor="winter">
                        <div className="cust-radio-div season-modal-box">
                            <div className="form-check">
                                <bdi>
                                    Winter {new Date().getFullYear()} - {new Date().getFullYear() + 1}
                                </bdi>
                                <input className="form-check-input" type="radio" name="msg" id="winter" value="Winter 2022 - 2023" onClick={(e) => handleSession(e)} />
                            </div>
                        </div>
                    </label>
                </div>
                <div className="col-sm-6 mb-3 pe-0">
                    <label className="form-check-label w-100" htmlFor="spring23">
                        <div className="cust-radio-div season-modal-box">
                            <div className="form-check">
                                <bdi>Spring {new Date().getFullYear() + 1}</bdi>
                                <input className="form-check-input" type="radio" name="msg" id="spring23" value="Spring 2023" onClick={(e) => handleSession(e)} />
                            </div>
                        </div>
                    </label>
                </div>
                <div className="col-sm-6 mb-3 pe-0">
                    <label className="form-check-label w-100" htmlFor="sum23">
                        <div className="cust-radio-div season-modal-box">
                            <div className="form-check">
                                <bdi>Summer {new Date().getFullYear() + 1}</bdi>
                                <input className="form-check-input" type="radio" name="msg" id="sum23" value="Summer 2023" onClick={(e) => handleSession(e)} />
                            </div>
                        </div>
                    </label>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6 mx-auto">
                    <button className="comn-btn-class mt-4" onClick={!makeTeam.team_session ? () => toast.warning("Please select your team season") : () => handleCreateTeam()}>
                        FINISH
                    </button>
                </div>
            </div>
        </>
    )
}
