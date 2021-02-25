import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import fireguma from "../styles/img/icon_fireguma_max.svg";
import { Header } from "../components/main-header";
import newIcon from "../styles/img/icon_new.svg";
import openIcon from "../styles/img/icon_small_open.svg";
import background_img from "../styles/img/watercolor-paper-texture.png";
import { BACKEND_URL } from "../constants";
import axios from "axios";
import { ISimplifiedGoguamList } from "../interface/IData";

const FAKE_MAIN_GOGUMA_DATA = [
  {
    id: 1,
    title: "여러분들,, 이게 진짜 맞나요..?",
    content:
      "제 친한친구와 남자친구가 바람을 피는 것 같아요.. 내일 또 학교에서 마주쳐야하는데 도대체어떻게 해야 좋을까요.. ㅠㅠ",
  },
  {
    id: 2,
    title: "여러분들,, 이게 진짜 맞나요..?",
    content:
      "제 친한친구와 남자친구가 바람을 피는 것 같아요.. 내일 또 학교에서 마주쳐야하는데 도대체어떻게 해야 좋을까요.. ㅠㅠ",
  },
  {
    id: 3,
    title: "여러분들,, 이게 진짜 맞나요..?",
    content:
      "제 친한친구와 남자친구가 바람을 피는 것 같아요.. 내일 또 학교에서 마주쳐야하는데 도대체어떻게 해야 좋을까요.. ㅠㅠ",
  },
  {
    id: 4,
    title: "여러분들,, 이게 진짜 맞나요..?",
    content:
      "제 친한친구와 남자친구가 바람을 피는 것 같아요.. 내일 또 학교에서 마주쳐야하는데 도대체어떻게 해야 좋을까요.. ㅠㅠ",
  },
  {
    id: 5,
    title: "여러분들,, 이게 진짜 맞나요..?",
    content:
      "제 친한친구와 남자친구가 바람을 피는 것 같아요.. 내일 또 학교에서 마주쳐야하는데 도대체어떻게 해야 좋을까요.. ㅠㅠ",
  },
];

const CardContainer = styled.div`
  height: 90%;
  background-image: url(${background_img});
  background-repeat: repeat;
  position: relative;
  margin: auto -13px;
  @media (max-width: 1025px) {
    height: 90vh;
    margin: auto;
  }
`;

const CardSlider = styled.div`
  vertical-align: middle;
  padding: 52px 0;
  overflow-x: scroll;
  grid-template-columns: repeat(5, auto);
  display: grid;
  cursor: grab;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Card = styled.div`
  height: 70%;
  width: 80vw;
  padding-left: 17px;
  @media (min-width: 1025px) {
    width: 15vw;
  }
  &.next {
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const CardType = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 10px;
  color: #727272;
  padding: 0;
  margin: 0;
`;

const CardEmoji = styled.img`
  width: 50px;
  height: 50px;
`;

const CardTitle = styled.div`
  font-family: "Gaegu", cursive;
  font-weight: 500;
  font-size: 30px;
  line-height: 36px;
  color: #2f2f2f;
  word-break: keep-all;
  padding-top: 3%;
  width: 64%;
`;

const CardContents = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 14px;
  line-height: 24px;
  color: #000000;
  word-break: keep-all;
  padding-top: 12%;
  width: 68%;
`;

const ScrollContainer = styled.div`
  margin: auto;
  display: block;
  text-align: center;
  position: absolute;
  bottom: 15px;
  width: 100%;
`;

const ScrollText = styled.p`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 12px;
  color: #8c5cdd;
  margin: 0;
`;

const AskContainer = styled.div`
  display: block;
  position: absolute;
  right: 25px;
  bottom: 15px;
`;

const SectionContainer = styled.div`
  padding: 0 17px;
`;

const Section = styled.div`
  margin: 15% auto;
`;

const SectionTitleContainer = styled.div`
  border-bottom: 1.5px solid #8c5cdd;
`;

const SectionTitle = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 18px;
  font-weight: 500;
  color: #000000;
  line-height: 28px;
`;

const SectionDescription = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 12px;
  color: #595959;
  padding-bottom: 10px;
`;

const SectionSeeMore = styled.span`
  color: #8c5cdd;
  float: right;
`;

const ListLink = styled.a`
  color: black;
  text-decoration: none;
`;

const GogumaList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0 0 0;
`;

const GogumaListItem = styled.li`
  line-height: 42px;
  &:not(:last-child) {
    border-bottom: 1.5px solid #f2f2f2;
  }
`;

const GogumaListItemText = styled.p`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 15px;
  padding-left: 5px;
  width: 100%;
  margin: 0;
`;

const GogumaSlide = styled.ul`
  list-style: none;
  margin: 17px 0 0 0;
  padding: 0;
  vertical-align: middle;
  overflow-x: scroll;
  grid-template-columns: repeat(5, auto);
  grid-gap: 0 9px;
  display: grid;
  cursor: grab;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const GogumaSlideItem = styled.li`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 16px;
  border: 1.5px solid #e8e8e8;
  border-radius: 20px;
  width: 164px;
  height: 120px;
  display: inline-grid;
  text-align: center;
  word-break: keep-all;
  vertical-align: middle;
  cursor: grab;
  overflow: auto;
  text-align: center;
`;

const GogumaSlideItemText = styled.p`
  margin: auto 21px;
`;

export const Home: React.FC = () => {
  const getRecentGogumas = async () => {
    const { data } = await axios.get<ISimplifiedGoguamList[]>(`${BACKEND_URL}/hot/drafts`);
    if (data) {
      setRecentGogumas([...data]);
    }
  };
  const getHonorGogumas = async () => {
    const gogumaDate = new Date(Date.now());
    const { data } = await axios.get<ISimplifiedGoguamList[]>(
      `${BACKEND_URL}/hot/honors?when=${gogumaDate.getFullYear()}-${
        gogumaDate.getMonth() + 1 < 10 ? `0${gogumaDate.getMonth() + 1}` : gogumaDate.getMonth() + 1
      }-${gogumaDate.getDate() < 10 ? `0${gogumaDate.getDate()}` : gogumaDate.getDate()}`,
    );
    if (data) {
      setHonoredGogumas([...data]);
    }
  };
  const getPopularGogumas = async () => {
    const { data } = await axios.get<ISimplifiedGoguamList[]>(`${BACKEND_URL}/hot/fires`);
    if (data) {
      setPopularGogumas([...data]);
    }
  };

  useEffect(() => {
    getRecentGogumas();
    getPopularGogumas();
    getHonorGogumas();
  }, []);

  const [recentGogumas, setRecentGogumas] = useState<ISimplifiedGoguamList[]>([]);
  const [popularGogumas, setPopularGogumas] = useState<ISimplifiedGoguamList[]>([]);
  const [honoredGogumas, setHonoredGogumas] = useState<ISimplifiedGoguamList[]>([]);

  return (
    <>
      <Helmet>
        <title>고구마</title>
      </Helmet>
      <Header />
      <CardContainer>
        <CardSlider>
          {FAKE_MAIN_GOGUMA_DATA.map((item, index) => (
            <Card key={index}>
              <CardEmoji src={fireguma} />
              <CardType>불타는 고구마!</CardType>
              <CardTitle>{item.title}</CardTitle>
              <CardContents>{item.content}</CardContents>
            </Card>
          ))}
        </CardSlider>
        <ScrollContainer>
          <ScrollText>아래로 스크롤!</ScrollText>
          <img src={openIcon} />
        </ScrollContainer>
        <AskContainer>
          <Link to="/ask">
            <img src={newIcon} style={{ width: "60px", height: "60px" }} />
          </Link>
        </AskContainer>
      </CardContainer>
      <SectionContainer id="section">
        <Section>
          <SectionTitleContainer>
            <SectionTitle>🔥 불타는 고구마</SectionTitle>
            <SectionDescription>
              실시간으로 불타오르는 인기 글이에요.
              <Link to="/goguma-list/popular">
                <SectionSeeMore>더보기</SectionSeeMore>
              </Link>
            </SectionDescription>
          </SectionTitleContainer>
          <GogumaList>
            {popularGogumas.map(item => (
              <GogumaListItem key={item.id}>
                <ListLink href={`/goguma/${item.id}`} key={item.id}>
                  <GogumaListItemText>{item.title}</GogumaListItemText>
                </ListLink>
              </GogumaListItem>
            ))}
          </GogumaList>
        </Section>
        <Section>
          <SectionTitleContainer>
            <SectionTitle>🍠 갓 구운 고구마</SectionTitle>
            <SectionDescription>
              가장 최근에 등록된 답답한 고구마 글들이에요.
              <Link to="/goguma-list/resent">
                <SectionSeeMore>더보기</SectionSeeMore>
              </Link>
            </SectionDescription>
          </SectionTitleContainer>
          <GogumaList>
            {recentGogumas.map(item => (
              <GogumaListItem key={item.id}>
                <ListLink href={`/goguma/${item.id}`} key={item.id}>
                  <GogumaListItemText>{item.title}</GogumaListItemText>
                </ListLink>
              </GogumaListItem>
            ))}
          </GogumaList>
        </Section>
        <Section>
          <SectionTitleContainer>
            <SectionTitle>🏆 명예 고구마</SectionTitle>
            <SectionDescription>
              전설급의 고구마사연들이 모여있어요!
              <Link to="/goguma-list/honor">
                <SectionSeeMore>더보기</SectionSeeMore>
              </Link>
            </SectionDescription>
          </SectionTitleContainer>
          <GogumaSlide>
            {honoredGogumas.map(item => (
              <ListLink href={`/goguma/${item.id}`} key={item.id}>
                <GogumaSlideItem key={item.id}>
                  <GogumaSlideItemText>{item.title}</GogumaSlideItemText>
                </GogumaSlideItem>
              </ListLink>
            ))}
          </GogumaSlide>
        </Section>
      </SectionContainer>
    </>
  );
};
