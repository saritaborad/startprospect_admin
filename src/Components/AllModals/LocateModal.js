import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export default function LocateModal(props) {

    const { createTeam, handleAddress, handleName, setSeason, setLocate } = props;
    const [makeTeam, setMakeTeam] = useState({});

    useEffect(() => {
        setMakeTeam(createTeam);
    }, [props]);

    return (
        <div className="row">
            <div className="col-sm-10 mx-auto">
                <div>
                    <label className="comn-label-class">City or Town</label>
                    <input type="text" className="form-control comn-input-style ps-3" placeholder="Ex. Easton, Pa" value={createTeam.team_address} onChange={(e) => handleAddress(e)} />
                </div>
                <div className="modal-team-name mt-3">
                    <p>What is your team’s name?</p>
                    <span>Make sure team members will recognize your team’s name.</span>
                </div>
                <div className="mt-3">
                    <label className="comn-label-class">Team Name</label>
                    <input type="text" className="form-control comn-input-style ps-3" placeholder="Ex. Silent Zibras" value={createTeam.team_name} onChange={(e) => handleName(e)} />
                </div>
                <div>
                    <button className="comn-btn-class mt-4" onClick={!makeTeam.team_address || !makeTeam.team_name ? () => toast.warning("All fields are mandatory") : () => setSeason(true) || setLocate(false)}>
                        NEXT
                    </button>
                </div>
            </div>
        </div>
    )
}
