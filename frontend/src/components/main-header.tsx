import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./sidebar";
import styled from "styled-components";
import menu from "../styles/img/icon_menu.svg";
import search from "../styles/img/icon_search.svg";

const Container = styled.div`
  padding: 1rem 0;
  display: flex;
`;

const SidebarButtonContainer = styled.div`
  vertical-align: middle;
  display: flex;
  align-items: center;
`;

const TitleContainer = styled.div`
  float: left;
  font-size: 28px;
  margin-left: 13px;
  color: "#8C5CDD";
  font-weight: bold;
  font-family: "Gaegu", cursive;
  vertical-align: middle;
  width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SearchContainer = styled.div`
  vertical-align: middle;
  width: 50%;
  justify-content: flex-end;
  display: flex;
  align-items: center;
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
          고구마
        </Link>
      </TitleContainer>
      <SearchContainer>
        <Link to="/search">
          <img src={search} />
        </Link>
      </SearchContainer>
      {toggleSidebar && (
        <>
          <Sidebar onClick={sidebarOnClick} isMain={true} />
        </>
      )}
    </Container>
  );
};
