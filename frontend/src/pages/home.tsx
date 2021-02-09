import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Fab } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import EditIcon from "@material-ui/icons/Edit";
import fireguma from "../styles/img/icon_fireguma_purple.svg";

const FAKE_RECENT_GOGUMA_DATA = [
  { id: 1, title: "제 얘기좀 듣고 가세요;;" },
  { id: 2, title: "니 알바 아니라는 남자친구, 헤어질까요?" },
  { id: 3, title: "인생 역대급 인연을 만나고 있습니다..." },
  { id: 4, title: "최준ㅋㅋㅋ영상아세요?" },
  { id: 5, title: "눈치 없는 남자친구 ㅠ……어쩌죠" },
];

const FAKE_BURNING_GOGUMA_DATA = [
  { id: 1, title: "저 앞으로 연애 안합니다. 진 지 해 요." },
  { id: 2, title: "공백 포함 30자만 입력 가능해서 이거 이상은 안보임." },
  { id: 3, title: "인생 역대급 인연을 만나고 있습니다..." },
];

const HomeContainer = styled.div`
  padding: 0 7% 7% 7%;
`;

const AskButtonContainer = styled.div`
  position: relative;
  float: right;
  right: -7%;
`;

const CardContainer = styled.div`
  height: 100%;
  min-height: 75vh;
  padding-top: 13%;
`;

const Card = styled.div`
  height: 100%;
`;

const CardType = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 10px;
  color: #8c5cdd;
  padding: 0;
  margin: 0;
`;

const CardEmoji = styled.img`
  width: 50px;
  height: 50px;
  padding: 0;
  margin: 0;
`;

const CardTitle = styled.div`
  font-family: MaruBuri-Regular;
  font-size: 28px;
  line-height: 36px;
  color: #2f2f2f;
  word-break: keep-all;
  padding-top: 3%;
  width: 66%;
`;

const CardContents = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 14px;
  line-height: 24px;
  color: #000000;
  word-break: keep-all;
  padding-top: 12%;
  width: 66%;
`;

const SectionContainer = styled.div`
  height: 100%;
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
  color: #000000;
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

const BurningGogumaList = styled.div``;

const RecentGogumaList = styled.div``;

export const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>go!guma</title>
      </Helmet>
      <HomeContainer>
        <CardContainer>
          <AskButtonContainer>
            <Link to="/ask">
              <Fab
                style={{
                  backgroundColor: "#8C5CDD",
                  boxShadow: "0 3px 6px #00000029",
                  width: "60px",
                  height: "60px",
                  position: "absolute",
                  top: "60vh",
                  right: "25px",
                  bottom: "41px",
                }}
              >
                <EditIcon fontSize="large" style={{ color: "white" }} />
              </Fab>
            </Link>
          </AskButtonContainer>
          <Card>
            <CardEmoji src={fireguma} />
            <CardType>불타는 고구마!</CardType>
            <CardTitle>여러분들,, 이게 진짜 맞나요..?</CardTitle>
            <CardContents>
              제 친한친구와 남자친구가 바람을 피는 것 같아요.. 내일 또 학교에서 마주쳐야하는데
              도대체 어떻게 해야 좋을까요.. ㅠㅠ
            </CardContents>
          </Card>
        </CardContainer>
        <div style={{ textAlign: "center" }}>
          <FontAwesomeIcon icon={faAngleDown} style={{ color: "#D6D6D6" }} />
        </div>
        <SectionContainer>
          <Section>
            <SectionTitleContainer>
              <SectionTitle>불타는 고구마</SectionTitle>
              <SectionDescription>
                실시간으로 불타오르는 인기 글이에요.
                <SectionSeeMore>더보기</SectionSeeMore>
              </SectionDescription>
            </SectionTitleContainer>
          </Section>
          <Section>
            <SectionTitleContainer>
              <SectionTitle>갓 구운 고구마</SectionTitle>
              <SectionDescription>
                가장 최근에 등록된 답답한 고구마 글들이에요.
                <SectionSeeMore>더보기</SectionSeeMore>
              </SectionDescription>
            </SectionTitleContainer>
          </Section>
        </SectionContainer>
        <SectionContainer></SectionContainer>
      </HomeContainer>
    </>
  );
};
