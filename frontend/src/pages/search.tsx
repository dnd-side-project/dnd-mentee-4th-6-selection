import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import mini_del from "../styles/img/icon_mini_del.svg";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { DisplayTime } from "../components/display-time";

interface ISearchForm {
  query: string;
}

interface IData {
  content: string;
  createdAt: string;
  id: number;
  nickname: string;
  title: string;
}

export const Search = () => {
  const [queryValue, setQueryValue] = useState("");
  const [data, setData] = useState<IData[]>([]);
  const [page, setPage] = useState(1);
  const [notValue, setNotValue] = useState(false);
  const { register, getValues } = useForm<ISearchForm>({
    mode: "onChange",
  });

  const scroll = (event: React.UIEvent<HTMLElement>) => {
    event.stopPropagation();
    const scrollTop = event.currentTarget.scrollTop;
    const clientHeight = event.currentTarget.clientHeight;
    const scrollHeight = event.currentTarget.scrollHeight;
    if (scrollTop + clientHeight >= scrollHeight && data.length >= page * 15) {
      setPage(page => page + 1);
    }
  };

  const handleChange = () => {
    const { query } = getValues();
    setQueryValue(query);
  };

  const onExit = () => {
    setQueryValue("");
  };

  const getNewData = async () => {
    try {
      if (queryValue.length > 0) {
        const { data: newData } = await axios.get<IData[]>(
          `${BACKEND_URL}/articles/search?page=${page}&size=${15}&query=${queryValue}`,
        );
        if (page === 1) {
          if (newData.length > 0) {
            setData([...newData]);
            setNotValue(false);
          } else {
            setData([]);
            setNotValue(true);
          }
        } else {
          if (newData) {
            setData([...data, ...newData]);
          }
        }
      } else {
        setData([]);
        setNotValue(false);
      }
    } catch {
      setData([]);
      setNotValue(true);
    }
  };

  useEffect(() => {
    getNewData();
  }, [page]);

  useEffect(() => {
    if (page === 1) {
      getNewData();
    } else {
      setPage(1);
    }
  }, [queryValue]);

  return (
    <ListContainer onScroll={scroll}>
      <OuterContainer>
        <Helmet>
          <title>검색 - 고구마</title>
        </Helmet>
        <MainContainer>
          <InputContainer>
            <SearchInput
              ref={register}
              name="query"
              onChange={handleChange}
              value={queryValue}
              placeholder="고구마 검색"
            />
            <Delbtn onClick={onExit}>
              <img src={mini_del} />
            </Delbtn>
          </InputContainer>
          <CancleBtn href={`/`}>취소</CancleBtn>
        </MainContainer>
        {data.length > 0 && (
          <ResultContainer>
            {data.map(goguma => (
              <ResultLink href={`/goguma/${goguma.id}`} key={goguma.id}>
                <ResultCard>
                  <ResultTitle>
                    {goguma.title.length >= 21 ? `${goguma.title.slice(0, 21)}...` : goguma.title}
                  </ResultTitle>
                  <ResultContent>
                    {goguma.content.length >= 65
                      ? `${goguma.content.slice(0, 65)}...`
                      : goguma.content}
                  </ResultContent>
                  <ResultContent>
                    <span style={{ marginRight: 15 }}>{goguma.nickname}</span>
                    <DisplayTime createdAt={new Date(goguma.createdAt)} />
                  </ResultContent>
                </ResultCard>
              </ResultLink>
            ))}
          </ResultContainer>
        )}
        {notValue && <NotResult>검색 결과가 없습니다!</NotResult>}
      </OuterContainer>
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

const OuterContainer = styled.div`
  width: 100%;
  min-height: 100%;
`;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  padding-top: 50px;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

const InputContainer = styled.div`
  width: 100%;
  max-width: 480px;
  position: relative;
  margin-right: 15px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 35px;
  border: none;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 16px;
  transition: border 0.3s ease-in-out;
  border-bottom: 2px solid #989898;
  padding: 0 5px;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-bottom: 2px solid #8c5cdd;
  }
  &::placeholder {
    font-family: "Spoqa Han Sans Neo", "sans-serif";
    font-size: 16px;
    color: #989898;
  }
`;

const Delbtn = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  top: 0;
  right: 0;
`;

const CancleBtn = styled.a`
  width: 30px;
  text-decoration: none;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 14px;
  color: black;
`;

const ResultContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  box-sizing: border-box;
`;

const ResultCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 15px;
`;

const ResultTitle = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 14px;
  margin-bottom: 3px;
`;

const ResultContent = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 12px;
  color: #989898;
  font-weight: 300;
  margin-bottom: 5px;
`;

const NotResult = styled.div`
  padding-top: 45px;
  width: 100%;
  display: flex;
  justify-content: center;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 14px;
  color: #595959;
`;

const ResultLink = styled.a`
  text-decoration: none;
  color: black;
`;
