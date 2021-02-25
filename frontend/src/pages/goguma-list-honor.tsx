import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { ContentHeader } from "../components/content-header";
import { BACKEND_URL, FRONTEND_URL } from "../constants";
import icon_purpleguma from "../styles/img/icon_purpleguma_sm.svg";
import icon_back from "../styles/img/icon_back.svg";
import axios from "axios";

interface IData {
  id: number;
  nickname: string;
  content: string;
  createdAt: string;
  numOfGogumas: number;
  title: string;
  hotGogumaType: string;
}

export const GogumaListHonor: React.FC = () => {
  const [page, setPage] = useState(1);
  const [gogumaDate, setGogumaDate] = useState(new Date(Date.now()));

  const [dataSlice, setDataSlice] = useState<IData[]>([]);

  const onClickDatePrev = () => {
    setGogumaDate(new Date(gogumaDate.getTime() - 1 * 24 * 60 * 60 * 1000));
  };

  const onClickDateNext = () => {
    if (gogumaDate.getTime() + 1 * 24 * 60 * 60 * 1000 < Date.now()) {
      setGogumaDate(new Date(gogumaDate.getTime() + 1 * 24 * 60 * 60 * 1000));
    }
  };

  const scroll = (event: React.UIEvent<HTMLElement>) => {
    event.stopPropagation();
    const scrollTop = event.currentTarget.scrollTop;
    const clientHeight = event.currentTarget.clientHeight;
    const scrollHeight = event.currentTarget.scrollHeight;
    if (scrollTop + clientHeight >= scrollHeight && dataSlice.length >= page * 15) {
      setPage(page => page + 1);
    }
  };

  const getData = async () => {
    const { data } = await axios.get<IData[]>(
      `${BACKEND_URL}/hot/honors?page=${page}&size=15&when=${gogumaDate.getFullYear()}-${
        gogumaDate.getMonth() + 1 < 10 ? `0${gogumaDate.getMonth() + 1}` : gogumaDate.getMonth() + 1
      }-${gogumaDate.getDate() < 10 ? `0${gogumaDate.getDate()}` : gogumaDate.getDate()}`,
    );
    if (page === 1) {
      if (data) {
        setDataSlice([...data]);
      } else {
        setDataSlice([]);
      }
    } else {
      if (data) {
        setDataSlice([...dataSlice, ...data]);
      }
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    if (page === 1) {
      getData();
    } else {
      setPage(1);
    }
  }, [gogumaDate]);

  return (
    <ListContainer onScroll={scroll}>
      <Helmet>
        <title>명예 고구마 - 고구마</title>
      </Helmet>
      <ContentHeader isPrev={true} isNext={false} title={"명예 고구마"} />
      <MainSubTitle>
        <img src={icon_purpleguma} />
        &quot;레전드 고구마 사연들만 모아둔 명예 게시글&quot;
      </MainSubTitle>
      <DateBox>
        <DatePrev src={icon_back} onClick={onClickDatePrev} />
        <DateText>
          {gogumaDate.getFullYear().toString().slice(2, 4)}.{" "}
          {gogumaDate.getMonth() + 1 < 10
            ? `0${gogumaDate.getMonth() + 1}`
            : gogumaDate.getMonth() + 1}
          . {gogumaDate.getDate() + 1 < 10 ? `0${gogumaDate.getDate()}` : gogumaDate.getDate()}
        </DateText>
        <DateNext src={icon_back} onClick={onClickDateNext} />
      </DateBox>
      <ListBox>
        {dataSlice.map((goguma, index) => (
          <GogumaListLink href={`${FRONTEND_URL}/goguma/${goguma.id}`} key={goguma.id}>
            <GogumaCard>
              {index < 3 ? (
                <GogumaHighRank>{index + 1}</GogumaHighRank>
              ) : (
                <GogumaRank>{index + 1}</GogumaRank>
              )}
              <GogumaTitle>
                {goguma.title.length > 30 ? `${goguma.title.slice(0, 30)}...` : goguma.title}
              </GogumaTitle>
            </GogumaCard>
          </GogumaListLink>
        ))}
      </ListBox>
    </ListContainer>
  );
};

const ListContainer = styled.div`
  width: 354px;
  height: 732px;
  margin: 0 -13px;
  @media (max-width: 1025px) {
    width: 100vw;
    height: 100vh;
    margin: 0;
  }
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const MainSubTitle = styled.div`
  width: 354px;
  @media (max-width: 1025px) {
    width: 100vw;
    margin: 0;
  }
  background-color: #f3eefc;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 12px;
  color: #8c5cdd;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DateBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-bottom: 2px solid #f2f2f2;
`;

const DatePrev = styled.img`
  width: 20px;
  height: 20px;
  opacity: 0.38;
`;

const DateNext = styled.img`
  width: 20px;
  height: 20px;
  opacity: 0.38;
  transform: scaleX(-1);
`;

const DateText = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 12px;
  padding: 0 15px;
`;

const GogumaCard = styled.div`
  height: 75px;
  display: flex;
  align-items: center;
  padding: 0 17px;
  border-bottom: 2px solid #f2f2f2;
`;

const GogumaHighRank = styled.span`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 16px;
  color: #8c8cdd;
  margin-right: 30px;
`;

const GogumaRank = styled.span`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 16px;
  color: #595959;
  margin-right: 30px;
`;

const ListBox = styled.div`
  margin: 0 13px;
  box-sizing: border-box;
`;

const GogumaTitle = styled.div`
  word-break: keep-all;
`;

const GogumaListLink = styled.a`
  text-decoration: none;
  color: black;
`;
