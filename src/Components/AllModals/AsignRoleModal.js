import React, { useState, useEffect } from 'react'

export default function AsignRoleModal(props) {

    const { assign, setAssign, inviteAndAssign } = props;
    const [assignRole, setAssignRole] = useState({});

    useEffect(() => {
        setAssignRole(assign);
    }, [props]);

    return (
        <div className="row">
            <div className="col-12">
                <div className="add-bank-detail">
                    <div className="">
                        <label className="comn-label-class">Member Role</label>
                        <input type="text" placeholder="Leader" className="form-control comn-input-style ps-3 pe-5" value={assignRole.member_role} onChange={(e) => setAssign({ ...assignRole, member_role: e.target.value })} />
                    </div>
                    <div className="mt-3">
                        <label className="comn-label-class">Member Number</label>
                        <input type="number" placeholder="#01" className="form-control comn-input-style ps-3 pe-5" value={assignRole.member_number} onChange={(e) => setAssign({ ...assignRole, member_number: e.target.value })} />
                    </div>
                    <div className="mt-3">
                        <button className="comn-btn-class" onClick={() => inviteAndAssign()}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>)
}
