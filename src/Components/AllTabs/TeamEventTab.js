import React, { useState, useEffect } from 'react'

export default function TeamEventTab(props) {

    const { scheduleEvent, handleEventClick } = props;
    const [event, setEvent] = useState([]);

    useEffect(() => {
        setEvent(scheduleEvent);
    }, [props])

    return (
        <div className="row me-0 mt-3">
            {event?.length > 10 ? (
                event?.map((item, i) => {
                    return (
                        <div className="col-xl-3 col-lg-4 col-sm-6 mb-3 text-center pe-0 pointer" key={i} onClick={() => handleEventClick(item?.eventlist?._id)}>
                            <div className="schedule-box-main p-3">
                                <div className="schedule-date-box mx-auto p-2">
                                    <span>{new Date(item.eventlist.start_date).toString().split(" ")[0]}</span>
                                    <bdi>{item.eventlist.start_date.slice(8, 10)}</bdi>
                                </div>
                                <div className="schedule-box-body mt-3">
                                    <span>{item?.team_name}</span>
                                    <bdi>{item?.eventlist.event_type}</bdi>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="div-content-center h-230">
                    <h5>No Scheduled Events Found</h5>
                </div>
            )}
        </div>
    )
}
