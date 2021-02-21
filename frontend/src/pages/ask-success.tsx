import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import GumaIcon from "../styles/img/icon_draft_guma.svg";

const FAKE_RECENT_GOGUMA_DATA = [
  { id: 1, title: "제 얘기좀 듣고 가세요;;" },
  { id: 2, title: "니 알바 아니라는 남자친구, 헤어질까요?" },
  { id: 3, title: "인생 역대급 인연을 만나고 있습니다..." },
  { id: 4, title: "최준ㅋㅋㅋ 영상아세요?" },
  { id: 5, title: "눈치 없는 남자친구 ㅠ……어쩌죠" },
];

const SuccessTitle = styled.div`
  margin-top: 12vh;
  margin-bottom: 11vh;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 16px;
  text-align: center;
`;

const SuccessDescription = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 14px;
  margin-bottom: 43px;
  text-align: center;
`;

const GogumaImg = styled.img`
  width: 122px;
  margin: auto;
`;

const ViewOthersContainer = styled.div`
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
  return (
    <>
      <Helmet>
        <title>고구마 등록완료 - 고구마</title>
      </Helmet>
      <SuccessTitle>등록완료!</SuccessTitle>
      <GogumaImg src={GumaIcon} />
      <SuccessDescription>
        <p>따끈따끈한 고구마 게시글이 등록됐어요.</p>
        <p>다른사람들의 반응을 고구마 바구니에서 확인해주세요:)</p>
      </SuccessDescription>
      <ViewOthersContainer>
        <ViewOthers>
          <Link to="/">내가 쓴 글 보기</Link>
        </ViewOthers>
        <ViewOthers>
          <Link to="/">메인으로</Link>
        </ViewOthers>
      </ViewOthersContainer>
      <RecentGogumaContainer>
        <SectionTitle>갓 구운 고구마</SectionTitle>
        <SectionDescription>지금 막 등록된 글들을 확인해보세요!</SectionDescription>
        <GogumaSlide>
          {FAKE_RECENT_GOGUMA_DATA.map(item => (
            <GogumaSlideItem key={item.id}>
              <GogumaSlideItemText>{item.title}</GogumaSlideItemText>
            </GogumaSlideItem>
          ))}
        </GogumaSlide>
      </RecentGogumaContainer>
    </>
  );
};
