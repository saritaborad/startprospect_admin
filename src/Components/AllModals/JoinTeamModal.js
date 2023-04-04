import React, { useState, useEffect } from 'react'

export default function JoinTeamModal(props) {

    const { setJoinTeam, handleJoinTeam, JoinTeam } = props;
    const [join, setJoin] = useState(JoinTeam);

    useEffect(() => {
        setJoin(JoinTeam);
    }, [props]);

    return (
        <div className="row">
            <div className="col-12 mx-auto">
                <div className="remove-modal-main text-center">
                    <span>A request will be sent to team staff or family members to confirm this relationship.</span>
                    <span className="mt-3">Verify the profile and send the request</span>
                </div>
            </div>
            <div className="col-12 mt-3">
                <div className="d-sm-flex">
                    <button type="btn" className="comn-btn-class-lightgray w-100" onClick={() => setJoinTeam(!join)}>
                        Cancel
                    </button>
                    <button type="btn" className="comn-btn-class ms-sm-3 w-100 mt-3 mt-sm-0" onClick={() => handleJoinTeam()}>
                        Continue
                    </button>
                </div>
            </div>
        </div>
    )
}
