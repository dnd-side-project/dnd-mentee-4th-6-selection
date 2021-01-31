import React from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";

const LoginContainer = styled.div`
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SocialLink = styled.a`
  text-decoration: none;
  color: black;
  width: 380px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  font-weight: 600;
  background-color: #dddddd;
  margin-bottom: 13px;
  transition: background-color 0.1s ease-in-out;
  &:visited {
    color: black;
  }
  &:hover {
    background-color: #bbbbbb;
  }
  &:active {
    background-color: #909090;
  }
`;

interface IProps {
  authenticated: boolean;
}

export const Login: React.FC<IProps> = ({ authenticated }) => {
  return (
    <>
      {authenticated && <Redirect to={`/`} />}
      {!authenticated && (
        <div>
          <Helmet>
            <title>로그인 - GO!GUMA</title>
          </Helmet>
          <div>
            <LoginContainer>
              <SocialLink
                href={`http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth2/redirect`}
              >
                <span>구글 계정으로 로그인</span>
              </SocialLink>
              <SocialLink
                href={`http://localhost:8080/oauth2/authorize/naver?redirect_uri=http://localhost:3000/oauth2/redirect`}
              >
                <span>네이버 계정으로 로그인</span>
              </SocialLink>
              <SocialLink
                href={`http://localhost:8080/oauth2/authorize/kakaotalk?redirect_uri=http://localhost:3000/oauth2/redirect`}
              >
                <span>카카오 계정으로 로그인</span>
              </SocialLink>
            </LoginContainer>
          </div>
        </div>
      )}
    </>
  );
};
