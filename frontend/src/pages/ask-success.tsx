import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { BACKEND_URL } from "../constants";
import axios from "axios";
import styled from "styled-components";
import GumaIcon from "../styles/img/icon_draft_guma.svg";
import { ISimplifiedGoguamList } from "../interface/IData";

const SuccessTitle = styled.div`
  margin-top: 15vh;
  margin-bottom: 20px;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 16px;
  text-align: center;
`;

const SuccessDescription = styled.p`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 14px;
  text-align: center;
  line-height: 24px;
  margin: 0;
`;

const GogumaImg = styled.img`
  width: 122px;
  margin: auto auto 10px auto;
  display: block;
`;

const ViewOthersContainer = styled.div`
  margin-top: 8px;
  text-align: center;
`;

const ViewOthers = styled.p`
  margin: 37px auto auto auto;
  font-size: 14px;
  line-height: 24px;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  color: #8c5cdd;
  text-decoration: none;
  border-bottom: 1px solid #8c5cdd;
  display: table;
`;

const SectionTitle = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 18px;
  display: inline-block;
  margin-right: 9px;
`;

const SectionDescription = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 12px;
  display: inline-block;
  color: #c1c1c1;
`;

const RecentGogumaContainer = styled.div`
  margin: 20vh 17px 7vh 17px;
`;

const StyledLink = styled.a`
  color: black;
  text-decoration: none;
`;

const GogumaSlide = styled.div`
  margin-top: 17px;
  vertical-align: middle;
  overflow-x: scroll;
  grid-template-columns: repeat(6, auto);
  grid-gap: 0 9px;
  display: grid;
  cursor: grab;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const GogumaSlideItem = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 16px;
  border: 1px solid #e8e8e8;
  border-radius: 20px;
  width: 164px;
  height: 92px;
  display: inline-grid;
  text-align: center;
  word-break: keep-all;
  vertical-align: middle;
  cursor: grab;
  overflow: auto;
`;

const GogumaSlideItemText = styled.p`
  margin: auto 21px;
`;

export const AskSuccess: React.FC = () => {
  useEffect(() => {
    (async () => {
      const { data } = await axios.get<ISimplifiedGoguamList[]>(`${BACKEND_URL}/hot/drafts`);
      if (data) {
        setRecentGogumas([...data]);
      }
    })();
  }, []);

  const [recentGogumas, setRecentGogumas] = useState<ISimplifiedGoguamList[]>([]);
  return (
    <>
      <Helmet>
        <title>고구마 등록완료 - 고구마</title>
      </Helmet>
      <SuccessTitle>등록완료!</SuccessTitle>
      <GogumaImg src={GumaIcon} />
      <SuccessDescription>따끈따끈한 고구마글이 구워졌어요.</SuccessDescription>
      <SuccessDescription>고구마 바구니에서 고구마 반응을 살펴보세요:)</SuccessDescription>
      <ViewOthersContainer>
        <StyledLink href="/goguma-list/me">
          <ViewOthers>내가 쓴 글 보기</ViewOthers>
        </StyledLink>
        <StyledLink href="/">
          <ViewOthers>메인으로</ViewOthers>
        </StyledLink>
      </ViewOthersContainer>
      <RecentGogumaContainer>
        <SectionTitle>갓 구운 고구마</SectionTitle>
        <SectionDescription>지금 막 등록된 글들을 확인해보세요!</SectionDescription>
        <GogumaSlide>
          {recentGogumas.map(item => (
            <StyledLink href={`/goguma/${item.id}`} key={item.id}>
              <GogumaSlideItem key={item.id}>
                <GogumaSlideItemText>{item.title}</GogumaSlideItemText>
              </GogumaSlideItem>
            </StyledLink>
          ))}
        </GogumaSlide>
      </RecentGogumaContainer>
    </>
  );
};
