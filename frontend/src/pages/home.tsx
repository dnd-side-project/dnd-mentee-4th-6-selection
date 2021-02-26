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
import Slider from "react-slick";
import { ISimplifiedGoguamListData } from "../interface/IData";
import { Dispatch } from "redux";
import { addToken } from "../stores/userStore";
import { connect } from "react-redux";

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

const CardBackground = styled.div`
  background-color: rgba(214, 214, 214, 0.5);
  position: absolute;
  right: 0;
  width: 20vw;
  height: 100%;
  @media (min-width: 1025px) {
    width: 3vw;
  }
`;

const Card = styled.div`
  width: 80vw;
  position: relative;
  height: 80vh;
  padding-top: 52.5px;
  padding-left: 30px;
  @media (min-width: 1025px) {
    height: 50vh;
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
  font-weight: 400;
  color: #727272;
  padding: 0;
  margin: 0;
  margin-bottom: 23px;
`;

const CardEmoji = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 4.5px;
`;

const CardTitle = styled.div`
  font-family: "Gaegu", cursive;
  font-weight: 400;
  font-size: 30px;
  line-height: 36px;
  color: #2f2f2f;
  word-break: keep-all;
  width: 68%;
`;

const CardContents = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 14px;
  line-height: 24px;
  font-weight: 300;
  color: #000000;
  word-break: keep-all;
  padding-top: 49px;
  width: 72%;
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
  font-weight: 500;
  font-size: 12px;
  color: #8c5cdd;
  margin: 0;
`;

const AskContainer = styled.div`
  display: block;
  position: absolute;
  right: 15px;
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
  font-weight: 400;
  font-size: 12px;
  color: #595959;
  padding-bottom: 10px;
`;

const SectionSeeMore = styled.span`
  font-weight: 500;
  color: #8c5cdd;
  float: right;
`;

const ListLink = styled.a`
  outline: none;
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
  font-weight: 400;
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
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  & > .slidera {
    overflow-x: hidden;
    & div {
      outline: none;
    }
    & > div {
      box-sizing: border-box;
    }
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
  vertical-align: middle;
  overflow: auto;
  text-align: center;
`;

const GogumaSlideItemText = styled.a`
  font-weight: 400;
  margin: auto 21px;
  text-decoration: none;
  color: black;
`;

interface IParams {
  token: string;
}

interface IProps {
  userToken: IParams;
  addTokenLocal: (token: IParams) => void;
}

const Home = ({ userToken, addTokenLocal }: IProps) => {
  const [userName, setUserName] = useState("");
  const localToken = localStorage.getItem("token");

  const getUser = async () => {
    if (userToken.token) {
      try {
        const {
          data: { nickname },
        } = await axios.get(`${BACKEND_URL}/users/me/`, {
          headers: {
            Authorization: `Bearer ${userToken.token}`,
          },
        });
        setUserName(nickname);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getRecentGogumas = async () => {
    const { data } = await axios.get<ISimplifiedGoguamListData[]>(`${BACKEND_URL}/hot/drafts`);
    if (data) {
      setRecentGogumas([...data]);
    }
  };
  const getHonorGogumas = async () => {
    const gogumaDate = new Date(Date.now());
    const { data } = await axios.get<ISimplifiedGoguamListData[]>(
      `${BACKEND_URL}/hot/honors?when=${gogumaDate.getFullYear()}-${
        gogumaDate.getMonth() + 1 < 10 ? `0${gogumaDate.getMonth() + 1}` : gogumaDate.getMonth() + 1
      }-${gogumaDate.getDate() < 10 ? `0${gogumaDate.getDate()}` : gogumaDate.getDate()}`,
    );
    if (data) {
      setHonoredGogumas([...data]);
    }
  };
  const getPopularGogumas = async () => {
    const { data } = await axios.get<ISimplifiedGoguamListData[]>(`${BACKEND_URL}/hot/fires`);
    if (data) {
      setPopularGogumas([...data]);
    }
  };

  useEffect(() => {
    if (!userToken.token) {
      if (localToken) {
        addTokenLocal({ token: `${localToken}` });
      }
    }
  }, [userToken]);

  useEffect(() => {
    getUser();
  }, [userToken.token]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1.2,
    slidesToScroll: 1,
    className: "slidera",
  };

  useEffect(() => {
    getRecentGogumas();
    getPopularGogumas();
    getHonorGogumas();
  }, []);

  const [recentGogumas, setRecentGogumas] = useState<ISimplifiedGoguamListData[]>([]);
  const [popularGogumas, setPopularGogumas] = useState<ISimplifiedGoguamListData[]>([]);
  const [honoredGogumas, setHonoredGogumas] = useState<ISimplifiedGoguamListData[]>([]);

  return (
    <>
      <Helmet>
        <title>고구마</title>
      </Helmet>
      <Header />
      <CardContainer>
        <CardBackground />
        <SliderBox>
          <Slider {...settings}>
            {popularGogumas.map(item => (
              <Card key={item.id}>
                <CardEmoji src={fireguma} />
                <CardType>불타는 고구마!</CardType>
                <ListLink href={`/goguma/${item.id}`} key={item.id}>
                  <CardTitle>{item.title}</CardTitle>
                  <CardContents>{item.content}</CardContents>
                </ListLink>
              </Card>
            ))}
          </Slider>
        </SliderBox>
        <ScrollContainer>
          <ScrollText>아래로 스크롤!</ScrollText>
          <img src={openIcon} />
        </ScrollContainer>
        {userName && (
          <AskContainer>
            <Link to="/ask">
              <img src={newIcon} style={{ width: "60px", height: "60px" }} />
            </Link>
          </AskContainer>
        )}
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
                  <GogumaListItemText>
                    {item.title.length >= 22 ? `${item.title.slice(0, 22)}...` : item.title}
                  </GogumaListItemText>
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
                  <GogumaListItemText>
                    {item.title.length >= 22 ? `${item.title.slice(0, 22)}...` : item.title}
                  </GogumaListItemText>
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
              <GogumaSlideItem key={item.id}>
                <GogumaSlideItemText href={`/goguma/${item.id}`}>{item.title}</GogumaSlideItemText>
              </GogumaSlideItem>
            ))}
          </GogumaSlide>
        </Section>
      </SectionContainer>
    </>
  );
};

const mapStateToProps = (state: IParams) => {
  return { userToken: state };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { addTokenLocal: (token: IParams) => dispatch(addToken(token)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const SliderBox = styled.div`
  & > .slidera {
    overflow-x: hidden;
    & div {
      outline: none;
    }
    & > div {
      padding-left: 55px;
      box-sizing: border-box;
    }
  }
`;
