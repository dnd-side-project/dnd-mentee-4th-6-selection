import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { ContentHeader } from "../components/content-header";
import { GogumaCard } from "../components/goguma-card";
import { BACKEND_URL } from "../constants";
import icon_fireguma from "../styles/img/icon_fireguma_max.svg";

interface IData {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  numOfGogumas: number;
  title: string;
  hotGogumaType: string;
}

export const GogumaListPopular = () => {
  const [page, setPage] = useState(1);
  const [dataSlice, setDataSlice] = useState<IData[]>([]);

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
    const { data } = await axios.get<IData[]>(`${BACKEND_URL}/hot/fires?page=${page}&size=15`);

    if (data) {
      setDataSlice([...dataSlice, ...data]);
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  return (
    <ListContainer onScroll={scroll}>
      <Helmet>
        <title>불타는 고구마 - 고구마</title>
      </Helmet>
      <ContentHeader isPrev={true} isNext={false} title={"불타는 고구마"} />
      <MainSubTitle>&quot;실시간으로 불타오르는 인기 게시글&quot;</MainSubTitle>
      <ListBox>
        {dataSlice.map(goguma => (
          <div key={goguma.id}>
            <GogumaCard
              title={goguma.title}
              content={goguma.content}
              user={goguma.author}
              createdAt={goguma.createdAt}
              responseLength={goguma.numOfGogumas}
            >
              <img src={icon_fireguma} width={50} height={50} />
            </GogumaCard>
          </div>
        ))}
      </ListBox>
    </ListContainer>
  );
};

const ListContainer = styled.div`
  width: 354px;
  height: 732px;
  margin: 0 -13px;
  @media (max-width: 1024px) {
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
  @media (max-width: 1024px) {
    width: 100vw;
    margin: 0;
  }
  background-color: #f7f7f7;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 12px;
  color: #5f5f5f;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListBox = styled.div`
  margin: 0 13px;
  box-sizing: border-box;
`;
