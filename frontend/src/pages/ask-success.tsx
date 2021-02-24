import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { BACKEND_URL } from "../constants";
import axios from "axios";
import styled from "styled-components";
import GumaIcon from "../styles/img/icon_draft_guma.svg";
import { ISimplifiedGoguamListData } from "../interface/IData";

const SuccessTitle = styled.div`
  margin-top: 12vh;
  margin-bottom: 11vh;
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
  margin: auto;
  display: block;
`;

const ViewOthersContainer = styled.div`
  margin-top: 43px;
  text-align: center;
`;

const ViewOthers = styled.div`
  font-size: 14px;
  line-height: 24px;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  color: #8c5cdd;
  text-decoration: none;
  border-bottom: 1px solid #8c5cdd;
  display: inline-block;
  margin: 0 25px;
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
  margin: 21vh 17px 10vh 17px;
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
      const { data } = await axios.get<ISimplifiedGoguamListData[]>(`${BACKEND_URL}/hot/drafts`);
      if (data) {
        setRecentGogumas([...data]);
      }
    })();
  }, []);

  const [recentGogumas, setRecentGogumas] = useState<ISimplifiedGoguamListData[]>([]);
  return (
    <>
      <Helmet>
        <title>고구마 등록완료 - 고구마</title>
      </Helmet>
      <SuccessTitle>등록완료!</SuccessTitle>
      <GogumaImg src={GumaIcon} />
      <SuccessDescription>따끈따끈한 고구마 게시글이 등록됐어요.</SuccessDescription>
      <SuccessDescription>다른사람들의 반응을 고구마 바구니에서 확인해주세요:)</SuccessDescription>
      <ViewOthersContainer>
        <Link to="/goguma-list/me">
          <ViewOthers>내가 쓴 글 보기</ViewOthers>
        </Link>
        <Link to="/">
          <ViewOthers>메인으로</ViewOthers>
        </Link>
      </ViewOthersContainer>
      <RecentGogumaContainer>
        <SectionTitle>갓 구운 고구마</SectionTitle>
        <SectionDescription>지금 막 등록된 글들을 확인해보세요!</SectionDescription>
        <GogumaSlide>
          {recentGogumas.map(item => (
            <GogumaSlideItem key={item.id}>
              <GogumaSlideItemText>{item.title}</GogumaSlideItemText>
            </GogumaSlideItem>
          ))}
        </GogumaSlide>
      </RecentGogumaContainer>
    </>
  );
};
