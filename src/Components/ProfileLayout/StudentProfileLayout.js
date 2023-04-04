import React from "react";
import StudentSidebar from "./StudentSidebar";

export default function StudentProfileLayout(props) {
    return (
        <>
            <StudentSidebar />
            {props.children}
        </>
    );
}
