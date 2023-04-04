import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export default function SportsTeamModal(props) {

    const { createTeam, handleSportss, setTeamType, setSelectSportTeam } = props;
    const [makeTeam, setMakeTeam] = useState({});

    useEffect(() => {
        setMakeTeam(createTeam)
    }, [props]);

    return (
        <>
            <div className="row">
                <div className="col-12 pe-0">
                    <div className="select-sport-team ">
                        <ul className="d-flex align-items justify-content-center text-center flex-wrap">
                            <li>
                                <label className="cust-chk-bx-soc p-0">
                                    <input type="radio" name="sport" value="Baseball" onClick={(e) => handleSportss(e)} />
                                    <span className="cust-chkbox-soc">
                                        <img alt="" src="../assets/images/Baseball.png" className="img-fluid" />
                                        <p>Baseball</p>
                                    </span>
                                </label>
                            </li>
                            <li>
                                <label className="cust-chk-bx-soc p-0">
                                    <input type="radio" name="sport" value="Basketball" onClick={(e) => handleSportss(e)} />
                                    <span className="cust-chkbox-soc">
                                        <img alt="" src="../assets/images/Basketball.png" className="img-fluid" />
                                        <p>Basketball</p>
                                    </span>
                                </label>
                            </li>
                            <li>
                                <label className="cust-chk-bx-soc p-0">
                                    <input type="radio" name="sport" value="Bowling" onClick={(e) => handleSportss(e)} />
                                    <span className="cust-chkbox-soc">
                                        <img alt="" src="../assets/images/Bowling.png" className="img-fluid" />
                                        <p>Bowling</p>
                                    </span>
                                </label>
                            </li>
                            <li>
                                <label className="cust-chk-bx-soc p-0">
                                    <input type="radio" name="sport" value="Cross Country" onClick={(e) => handleSportss(e)} />
                                    <span className="cust-chkbox-soc">
                                        <img alt="" src="../assets/images/Cross-Country.png" className="img-fluid" />
                                        <p>Cross Country</p>
                                    </span>
                                </label>
                            </li>
                            <li>
                                <label className="cust-chk-bx-soc p-0">
                                    <input type="radio" name="sport" value="Field Hockey" onClick={(e) => handleSportss(e)} />
                                    <span className="cust-chkbox-soc">
                                        <img alt="" src="../assets/images/Field-Hockey.png" className="img-fluid" />
                                        <p>Field Hockey</p>
                                    </span>
                                </label>
                            </li>
                            <li>
                                <label className="cust-chk-bx-soc p-0">
                                    <input type="radio" name="sport" value="Football" onClick={(e) => handleSportss(e)} />
                                    <span className="cust-chkbox-soc">
                                        <img alt="" src="../assets/images/Football.png" className="img-fluid" />
                                        <p>Football</p>
                                    </span>
                                </label>
                            </li>
                            <li>
                                <label className="cust-chk-bx-soc p-0">
                                    <input type="radio" name="sport" value="Wrestling" onClick={(e) => handleSportss(e)} />
                                    <span className="cust-chkbox-soc">
                                        <img alt="" src="../assets/images/Wrestling.png" className="img-fluid" />
                                        <p>Wrestling</p>
                                    </span>
                                </label>
                            </li>
                            <li>
                                <label className="cust-chk-bx-soc p-0">
                                    <input type="radio" name="sport" value="Golf" onClick={(e) => handleSportss(e)} />
                                    <span className="cust-chkbox-soc">
                                        <img alt="" src="../assets/images/Golf.png" className="img-fluid" />
                                        <p>Golf</p>
                                    </span>
                                </label>
                            </li>
                            <li>
                                <label className="cust-chk-bx-soc p-0">
                                    <input type="radio" name="sport" value="Hockey" onClick={(e) => handleSportss(e)} />
                                    <span className="cust-chkbox-soc">
                                        <img alt="" src="../assets/images/Hockey.png" className="img-fluid" />
                                        <p>Hockey</p>
                                    </span>
                                </label>
                            </li>
                            <li>
                                <label className="cust-chk-bx-soc p-0">
                                    <input type="radio" name="sport" value="Lacrosse" onClick={(e) => handleSportss(e)} />
                                    <span className="cust-chkbox-soc">
                                        <img alt="" src="../assets/images/Lacrosse.png" className="img-fluid" />
                                        <p>Lacrosse</p>
                                    </span>
                                </label>
                            </li>
                            <li>
                                <label className="cust-chk-bx-soc p-0">
                                    <input type="radio" name="sport" value="Soccer" onClick={(e) => handleSportss(e)} />
                                    <span className="cust-chkbox-soc">
                                        <img alt="" src="../assets/images/Soccer.png" className="img-fluid" />
                                        <p>Soccer</p>
                                    </span>
                                </label>
                            </li>
                            <li>
                                <label className="cust-chk-bx-soc p-0">
                                    <input type="radio" name="sport" value="Softball" onClick={(e) => handleSportss(e)} />
                                    <span className="cust-chkbox-soc">
                                        <img alt="" src="../assets/images/Softball.png" className="img-fluid" />
                                        <p>Softball</p>
                                    </span>
                                </label>
                            </li>
                            <li>
                                <label className="cust-chk-bx-soc p-0">
                                    <input type="radio" name="sport" value="Swimming & Diving" onClick={(e) => handleSportss(e)} />
                                    <span className="cust-chkbox-soc">
                                        <img alt="" src="../assets/images/Swimming-Diving.png" className="img-fluid" />
                                        <p>Swimming & Diving</p>
                                    </span>
                                </label>
                            </li>
                            <li>
                                <label className="cust-chk-bx-soc p-0">
                                    <input type="radio" name="sport" value="Water Polo" onClick={(e) => handleSportss(e)} />
                                    <span className="cust-chkbox-soc">
                                        <img src="../assets/images/Water-Polo.png" alt="" className="img-fluid" />
                                        <p>Water Polo</p>
                                    </span>
                                </label>
                            </li>
                            <li>
                                <label className="cust-chk-bx-soc p-0">
                                    <input type="radio" name="sport" value="Tennis" onClick={(e) => handleSportss(e)} />
                                    <span className="cust-chkbox-soc">
                                        <img alt="" src="../assets/images/Tennis.png" className="img-fluid" />
                                        <p>Tennis</p>
                                    </span>
                                </label>
                            </li>
                            <li>
                                <label className="cust-chk-bx-soc p-0">
                                    <input type="radio" name="sport" value="Track & Field" onClick={(e) => handleSportss(e)} />
                                    <span className="cust-chkbox-soc">
                                        <img alt="" src="../assets/images/Track-Field.png" className="img-fluid" />
                                        <p>Track & Field</p>
                                    </span>
                                </label>
                            </li>
                            <li>
                                <label className="cust-chk-bx-soc p-0">
                                    <input type="radio" name="sport" value="Volleyball" onClick={(e) => handleSportss(e)} />
                                    <span className="cust-chkbox-soc">
                                        <img alt="" src="../assets/images/Volleyball.png" className="img-fluid" />
                                        <p>Volleyball</p>
                                    </span>
                                </label>
                            </li>
                            <li>
                                <label className="cust-chk-bx-soc p-0">
                                    <input type="radio" name="sport" value="Cheerleading" onClick={(e) => handleSportss(e)} />
                                    <span className="cust-chkbox-soc">
                                        <img alt="" src="../assets/images/Cheerleading.png" className="img-fluid" />
                                        <p>Cheerleading</p>
                                    </span>
                                </label>
                            </li>
                            <li>
                                <label className="cust-chk-bx-soc p-0">
                                    <input type="radio" name="sport" value="Crew & Rowing" onClick={(e) => handleSportss(e)} />
                                    <span className="cust-chkbox-soc">
                                        <img alt="" src="../assets/images/Crew-Rowing.png" className="img-fluid" />
                                        <p>Crew & Rowing</p>
                                    </span>
                                </label>
                            </li>
                            <li>
                                <label className="cust-chk-bx-soc p-0">
                                    <input type="radio" name="sport" value="Rugby" onClick={(e) => handleSportss(e)} />
                                    <span className="cust-chkbox-soc">
                                        <img alt="" src="../assets/images/Rugby.png" className="img-fluid" />
                                        <p>Rugby</p>
                                    </span>
                                </label>
                            </li>
                            <li>
                                <label className="cust-chk-bx-soc p-0">
                                    <input type="radio" name="sport" value="Other" onClick={(e) => handleSportss(e)} />
                                    <span className="cust-chkbox-soc">
                                        <img alt="" src="../assets/images/Other.png" className="img-fluid" />
                                        <p>Other</p>
                                    </span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 col-sm-6 mx-auto mt-3">
                    <button className="comn-btn-class" onClick={!makeTeam.sport_name ? () => toast.warning("Please select your team sport") : () => setTeamType(true) || setSelectSportTeam(false)}>
                        NEXT
                    </button>
                </div>
            </div>
        </>
    )
}
