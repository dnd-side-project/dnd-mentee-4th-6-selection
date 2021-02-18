import React from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { BACKEND_URL, FRONTEND_URL } from "../constants";
import icon_purpleguma from "../styles/img/icon_purpleguma_max.svg";
import icon_google from "../styles/img/icon_google_logo.jpeg";
import icon_naver from "../styles/img/icon_naver_logo.png";

interface IProps {
  authenticated: boolean;
}

export const Login: React.FC<IProps> = ({ authenticated }: IProps) => {
  return (
    <>
      {authenticated && <Redirect to={`/`} />}
      {!authenticated && (
        <div>
          <Helmet>
            <title>로그인 - GO!GUMA</title>
          </Helmet>
          <div>
            <LoginTitleContainer>
              <LoginImg src={icon_purpleguma} />
              <LoginTitle>고구마</LoginTitle>
              <LoginSubtitle>
                고민, 그만!
                <br />
                고구마에서 다~ 털어놓고가세요
              </LoginSubtitle>
            </LoginTitleContainer>
            <LoginContainer>
              <SocialLink
                className={"google"}
                href={`${BACKEND_URL}/oauth2/authorize/google?redirect_uri=${FRONTEND_URL}/oauth2/redirect`}
              >
                <img src={icon_google} width={34} height={34} />
                <div>구글 계정으로 로그인</div>
              </SocialLink>
              <SocialLink
                href={`${BACKEND_URL}/oauth2/authorize/naver?redirect_uri=${FRONTEND_URL}/oauth2/redirect`}
              >
                <img src={icon_naver} width={34} height={34} />
                <div>네이버 계정으로 로그인</div>
              </SocialLink>
            </LoginContainer>
          </div>
        </div>
      )}
    </>
  );
};

const LoginTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 111px;
  margin-bottom: 249px;
`;

const LoginImg = styled.img`
  width: 78px;
  height: 78px;
`;

const LoginTitle = styled.div`
  font-family: "Gaegu", cursive;
  font-size: 53px;
  color: #8c5cdd;
  margin-bottom: 23px;
`;

const LoginSubtitle = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 14px;
  color: #989898;
  text-align: center;
  line-height: 21px;
`;

const LoginContainer = styled.div`
  width: 100%;
  padding: 0 17px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SocialLink = styled.a`
  text-decoration: none;
  width: 100%;
  height: 45px;
  border-radius: 7px;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 14px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  &:first-child {
    color: black;
    border: 1px solid #e8e8e8;
    & > div {
      padding-left: 33px;
      padding-right: 67px;
    }
  }
  &:nth-child(2) {
    color: white;
    background-color: #1ec800;
    & > div {
      padding-left: 25px;
      padding-right: 59px;
    }
  }
`;
