import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { ContentHeader } from "../components/content-header";
import { GogumaCard } from "../components/goguma-card";
import { FAKE_GOGUMA_DATA } from "../constants";
import icon_fireguma from "../styles/img/icon_fireguma_max.svg";

interface IData {
  id: number;
  user: string;
  title: string;
  content: string;
  createdAt: string;
  responseLength: number;
}

export const GogumaListMe = () => {
  const [page, setPage] = useState(1);
  const [dataSlice, setDateSlice] = useState<IData[]>(
    FAKE_GOGUMA_DATA.goguma
      .sort((gogumaA, gogumaB) => {
        return gogumaA.createdAt < gogumaB.createdAt ? -1 : gogumaA > gogumaB ? 1 : 0;
      })
      .slice(0, 15),
  );

  const scroll = (event: React.UIEvent<HTMLElement>) => {
    event.stopPropagation();
    const scrollTop = event.currentTarget.scrollTop;
    const clientHeight = event.currentTarget.clientHeight;
    const scrollHeight = event.currentTarget.scrollHeight;
    if (scrollTop + clientHeight >= scrollHeight && FAKE_GOGUMA_DATA.goguma.length > page * 15) {
      setPage(page => page + 1);
    }
  };

  useEffect(() => {
    const data = FAKE_GOGUMA_DATA.goguma
      .sort((gogumaA, gogumaB) => {
        return gogumaA.createdAt > gogumaB.createdAt ? -1 : gogumaA < gogumaB ? 1 : 0;
      })
      .slice(0, page * 15);
    setDateSlice(data);
  }, [page]);

  return (
    <ListContainer onScroll={scroll}>
      <Helmet>
        <title>내가 쓴 글 - 고구마</title>
      </Helmet>
      <ContentHeader isPrev={true} isNext={false} title={"내가 쓴 글"} />
      <ListBox>
        {dataSlice.map(goguma => (
          <GogumaCard
            key={goguma.id}
            title={goguma.title}
            content={goguma.content}
            user={goguma.user}
            createdAt={goguma.createdAt}
            responseLength={goguma.responseLength}
          >
            <img src={icon_fireguma} width={50} height={50} />
          </GogumaCard>
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

const ListBox = styled.div`
  margin: 0 13px;
  box-sizing: border-box;
`;
