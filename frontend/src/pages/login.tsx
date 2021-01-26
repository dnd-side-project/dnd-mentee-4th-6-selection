import React from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const TitleText = styled.span`
  margin-top: 30px;
  margin-bottom: 15px;
  font-size: 32px;
  font-weight: 900;
`;

const LoginBtn = styled.button`
  border: none;
  padding: 20px;
  width: 300px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 15px;
  background-color: ${props => props.color || "white"};
  border: 1px solid #303030;
`;

const kakaoLoginOnClick = () => {
  console.log("kakao login");
};

const googleLoginOnClick = () => {
  console.log("google login");
};

const naverLoginOnClick = () => {
  console.log("naver login");
};

export const Login = () => {
  return (
    <>
      <Helmet>
        <title>로그인 - Selection</title>
      </Helmet>
      <Container>
        <TitleText>로그인</TitleText>
        <LoginBtn onClick={kakaoLoginOnClick} color="#e7e600">
          카카오톡으로 로그인
        </LoginBtn>
        <LoginBtn onClick={googleLoginOnClick}>구글으로 로그인</LoginBtn>
        <LoginBtn onClick={naverLoginOnClick} color="#2DB400">
          네이버로 로그인
        </LoginBtn>
      </Container>
    </>
  );
};
