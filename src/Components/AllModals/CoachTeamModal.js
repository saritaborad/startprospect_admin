import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { FetchPostApi } from '../../Api/apiServices';
import { API_Path } from '../../Api/Const';

export default function CoachTeamModal(props) {
    const {seteventType , setSelectTeam, handleEventClick} = props ;
    const [listCoachTeam, setListCoachTeam] = useState([]);
	const [getCoachTeamOption, setgetCoachTeamOption] = useState({ sizePerPage: 10, search: {}, page: 0, sort: "", order: "ASC" });

    useEffect(() => {
        handleCoachTeam()
    }, [getCoachTeamOption])

    const handleCoachTeam = async () => {
        let data = { options: getCoachTeamOption};
        let result = await FetchPostApi(API_Path.getTeamOfCoach, data);
        let team = await result.json();
        if (result.status === 200) {
            setListCoachTeam(team?.data);
        } else {
            toast.error(team.message);
        }
    };
    return (
        <div className="row">
            <div className="col-sm-10 mx-auto">
                <div className="row">
                    <div className="col-12 mb-3">
                        <label className="form-check-label w-100" htmlFor="t-1">
                            <div className="cust-radio-div coach-team-select ">
                                {listCoachTeam?.data?.length > 0
                                    ? listCoachTeam?.data?.map((item, i) => {
                                        return (
                                            <div className="season-modal-box mb-3">
                                                <div className="form-check d-flex align-items-center" key={i} onClick={() => handleEventClick("eventCreate") || setSelectTeam(false) || seteventType({ team: item?._id })}>
                                                    <div className="sel-team-logo me-2">
                                                        <img src={item?.team_img} alt="Team logo" />
                                                    </div>
                                                    <bdi>{item?.team_name}</bdi>
                                                </div>
                                            </div>
                                        );
                                    })
                                    : "Please Create Team"}
                                <div className="col-md-12 text-center my-3">
                                    {listCoachTeam?.totalRecord > getCoachTeamOption?.sizePerPage &&
                                        <button className="pagination-button" type='button' onClick={() => setgetCoachTeamOption({...getCoachTeamOption , sizePerPage: getCoachTeamOption.sizePerPage + 10})}>Load More</button>}
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}
