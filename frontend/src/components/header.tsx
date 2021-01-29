import React, {useState} from "react";
import { Link } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { Sidebar } from "./sidebar";

const Container = styled.div`
  padding: 1rem 0;
  display: flex;
  `

const SidebarButtonContainer = styled.div`
  width:33%;
  text-align: left;
  ` 

const TitleContainer = styled.div`
  width:34%;
  text-align: center;
  font-weight: bold;
  `

const SigninContainer = styled.div`
  width:33%;
  text-align: right;
  `

export const Header: React.FC = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const sidebarOnClick = () => {
    setToggleSidebar(!toggleSidebar);
  };

  return (
    <Container>
      <SidebarButtonContainer onClick={sidebarOnClick}>
        <FontAwesomeIcon icon={faBars} size="1x"/>
        {toggleSidebar && (
          <>
            <Sidebar onClick={sidebarOnClick} />
          </>
        )}
      </SidebarButtonContainer>
      <TitleContainer>
      <Link to="/" style={{textDecoration: 'none', color: 'black'}}>
        <div>GO!GUMA</div>
      </Link></TitleContainer>
      <SigninContainer>
      <Link to="/login" style={{textDecoration: 'none', color: 'black'}}>
        <div>로그인</div>
      </Link></SigninContainer>
    </Container>
  );
};
