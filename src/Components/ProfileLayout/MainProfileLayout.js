import React from "react";
import Sidebar from "./Sidebar";

export default function MainProfileLayout(props) {
    return (
        <>
            <Sidebar />
            {props.children}
        </>
    );
}
