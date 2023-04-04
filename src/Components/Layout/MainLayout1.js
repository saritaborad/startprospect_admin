import React from "react";
import Header from "./Header";
import Footer1 from "./Footer1";

export default function MainLayout(props) {
  return (
    <>
      <Header />
      {props.children}
      <Footer1 />
    </>
  );
}
