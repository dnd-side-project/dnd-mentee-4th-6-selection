import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import icon_back from "../styles/img/icon_back.svg";
import icon_delete from "../styles/img/icon_delete.svg";

interface IProps {
  isPrev: boolean;
  isNext: boolean;
  title: string;
  children?: React.ReactChild;
  link?: string;
}

export const ContentHeader = ({ isPrev, isNext, title, children, link }: IProps) => {
  const history = useHistory();
  return (
    <>
      <Container>
        {isPrev ? (
          link ? (
            <LeftContainer>
              <Link to={link}>
                <LeftImg src={icon_back} />
              </Link>
            </LeftContainer>
          ) : (
            <LeftContainer>
              <LeftImg src={icon_back} onClick={() => history.goBack()} />
            </LeftContainer>
          )
        ) : link === "back" ? (
          <LeftContainer>
            <LeftImg src={icon_delete} onClick={() => history.goBack()} />
          </LeftContainer>
        ) : (
          <LeftContainer>
            <Link to={link ? link : `/`}>
              <LeftImg src={icon_delete} />
            </Link>
          </LeftContainer>
        )}
        <CenterContainer>{title}</CenterContainer>
        <RightContainer>{children ? children : isNext && <div>다음</div>}</RightContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 10px 15px;
  display: flex;
`;

const LeftContainer = styled.div`
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
`;

const LeftImg = styled.img`
  cursor: pointer;
`;

const CenterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 16px;
`;

const RightContainer = styled.div`
  width: 100%;
  justify-content: flex-end;
  display: flex;
  align-items: center;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 14px;
`;
