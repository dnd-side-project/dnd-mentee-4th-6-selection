import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "./sidebar";
import styled from "styled-components";
import menu from "../styles/img/icon_menu.svg";
import search from "../styles/img/icon_search.svg";

const Container = styled.div`
  padding: 1rem 0;
  display: flex;
`;

const SidebarButtonContainer = styled.div`
  width: 33%;
  text-align: left;
`;

const TitleContainer = styled.div`
  width: 34%;
  color: "#8C5CDD";
  text-align: center;
  font-weight: bold;
  font-family: Poppins;
`;

const SearchContainer = styled.div`
  width: 33%;
  text-align: right;
`;

export const Header: React.FC = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const sidebarOnClick = () => {
    setToggleSidebar(!toggleSidebar);
  };

  return (
    <Container>
      <SidebarButtonContainer onClick={sidebarOnClick}>
        <img src={menu} />
      </SidebarButtonContainer>
      <TitleContainer>
        <Link to="/" style={{ textDecoration: "none", color: "#8C5CDD" }}>
          <div>
            go<span style={{ color: "#FFD600" }}>!</span>guma
          </div>
        </Link>
      </TitleContainer>
      <SearchContainer>
        <a href={`/search`}>
          <img src={search} />
        </a>
      </SearchContainer>
      {toggleSidebar && (
        <>
          <Sidebar onClick={sidebarOnClick} />
        </>
      )}
    </Container>
  );
};
