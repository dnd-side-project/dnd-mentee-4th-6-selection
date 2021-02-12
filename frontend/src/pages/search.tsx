import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import mini_del from "../styles/img/icon_mini_del.svg";

const FAKE_GOGUMA_DATA = {
  goguma: [
    {
      id: 1,
      user: "김모모",
      title: "제 얘기좀 듣고 가세요",
      content: `바로 어제 있었던 일입니다. 방학이 방학인 만큼 도서관에 갔어요. 그런데 세상에나;;; 바로 옆자리에 전여자친구 가방이 있는거에요. 지정좌석제내용내용내용내용내용내용내용내용내용`,
    },
    {
      id: 2,
      user: "김칠득",
      title: "제 얘기좀 듣고 가세요;;",
      content: `아니 글쎄 말이죠 내용내용내용내용내용내용내용내용내용내용`,
    },
    {
      id: 3,
      user: "박영감",
      title: "인생 역대급 인연을 만나고 있습니다...",
      content: `아야어여오요우유으이의위왜웨워와내용내용내용내용내용`,
    },
    {
      id: 4,
      user: "방금보",
      title: "최준ㅋㅋㅋ영상아세요?",
      content: `바로 어제 있었던 일입니다. 방학이 방학인 만큼 도서관에 갔어요. 그런데 세상에나;;; 바로 옆자리에 전여자친구 가방이 있는거에요. 지정좌석제내용내용내용내용내용내용내용내용내용`,
    },
    {
      id: 5,
      user: "최고모",
      title: "눈치 없는 남자친구 ㅠ……어쩌죠",
      content: `바로 어제 있었던 일입니다. 방학이 방학인 만큼 도서관에 갔어요. 그런데 세상에나;;; 바로 옆자리에 전여자친구 가방이 있는거에요.바로 옆자리에 전여자친구 가방이 있는거에요.바로 옆자리에 전여자친구 가방이 있는거에요.바로 옆자리에 전여자친구 가방이 있는거에요.바로 옆자리에 전여자친구 가방이 있는거에요.`,
    },
  ],
};

interface IData {
  id: number;
  user: string;
  title: string;
  content: string;
}

interface ISearchForm {
  query: string;
}

export const Search = () => {
  const [data, setData] = useState<IData[]>([]);
  const { register, getValues, setValue } = useForm<ISearchForm>({
    mode: "onChange",
  });

  const handleChange = () => {
    const { query } = getValues();
    if (query.length < 2) {
      setData([]);
      return;
    }
    const data = FAKE_GOGUMA_DATA.goguma.filter(goguma => goguma.title.includes(query));

    setData(data);
  };

  const onExit = () => {
    setValue("query", "");
    setData([]);
  };

  return (
    <>
      <Helmet>
        <title>검색 - GO!GUMA</title>
      </Helmet>
      <MainContainer>
        <InputContainer>
          <SearchInput
            ref={register({ minLength: 2 })}
            name="query"
            onChange={handleChange}
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
            <ResultCard key={goguma.id}>
              <ResultTitle>{goguma.title}</ResultTitle>
              <ResultContent>
                {goguma.content.length >= 70 ? `${goguma.content}...` : goguma.content}
              </ResultContent>
              <ResultContent>by {goguma.user}</ResultContent>
            </ResultCard>
          ))}
        </ResultContainer>
      )}
    </>
  );
};

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 30px;
`;

const InputContainer = styled.div`
  width: 80%;
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
  text-decoration: none;
  color: black;
`;

const ResultContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
`;

const ResultCard = styled.div`
  width: 90%;
  max-width: 540px;
  display: flex;
  flex-direction: column;
  margin-bottom: 35px;
`;

const ResultTitle = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 14px;
  margin-bottom: 3px;
`;

const ResultContent = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 12px;
  color: #595959;
  margin-bottom: 5px;
`;
