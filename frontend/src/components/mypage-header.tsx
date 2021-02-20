import React, { useState } from "react";
import Sidebar from "./sidebar";
import styled from "styled-components";
import menu from "../styles/img/icon_menu.svg";

export const MyPageHeader: React.FC = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const sidebarOnClick = () => {
    setToggleSidebar(!toggleSidebar);
  };

  return (
    <Container>
      <SidebarButtonContainer onClick={sidebarOnClick}>
        <img src={menu} />
      </SidebarButtonContainer>
      <TitleContainer>마이 페이지</TitleContainer>
      <RightContainer></RightContainer>
      {toggleSidebar && (
        <>
          <Sidebar onClick={sidebarOnClick} isMain={false} />
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem 0;
  display: flex;
  align-items: center;
`;

const SidebarButtonContainer = styled.div`
  width: 33%;
  text-align: left;
`;

const TitleContainer = styled.div`
  width: 34%;
  text-align: center;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 16px;
`;

const RightContainer = styled.div`
  width: 33%;
  text-align: right;
`;
