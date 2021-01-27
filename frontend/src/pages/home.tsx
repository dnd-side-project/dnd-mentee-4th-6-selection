import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "../components/sidebar";

export const Home = () => {
  const [toggleSidebar, setToggleSigebar] = useState(false);
  const sidebarOnClick = () => {
    setToggleSigebar(!toggleSidebar);
  };

  return (
    <>
      <div>
        <Helmet>
          <title>Selection</title>
        </Helmet>
        <button onClick={sidebarOnClick}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <h2>Home</h2>
      </div>
      {toggleSidebar && (
        <>
          <Sidebar onClick={sidebarOnClick} />
        </>
      )}
    </>
  );
};
