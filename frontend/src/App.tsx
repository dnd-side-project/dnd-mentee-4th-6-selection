import React from "react";
import styled from "styled-components";
import CommonRouter from "./routers/common-router";
import "./styles/FontStyles.css";

const App: React.FC = () => {
  return (
    <OuterContainer>
      <Container>
        <CommonRouter />
      </Container>
    </OuterContainer>
  );
};

const OuterContainer = styled.div`
  @media (min-width: 1025px) {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Container = styled.div`
  background-color: white;
  box-sizing: border-box;
  display: block;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 1025px) {
    width: 100%;
  }
  @media (min-width: 1025px) {
    border: 1px solid #545454;
    width: 356px;
    height: 732px;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 0 13px;
  }
`;

export default App;
