import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { BACKEND_URL } from "../constants";
import axios from "axios";
import { ContentHeader } from "../components/content-header";
import { GogumaCard } from "../components/goguma-card";
import icon_fireguma from "../styles/img/icon_fireguma_max.svg";
import { Dispatch } from "redux";
import { addToken } from "../stores/userStore";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

interface IParams {
  token: string;
}

interface IProps {
  userToken: IParams;
  addTokenLocal: (token: IParams) => void;
}

interface IData {
  id: number;
  nickname: string;
  content: string;
  createdAt: string;
  numOfGogumas: number;
  title: string;
  hotGogumaType: string;
}

const GogumaListMe = ({ userToken, addTokenLocal }: IProps) => {
  const [page, setPage] = useState(1);
  const [dataSlice, setDataSlice] = useState<IData[]>([]);
  const history = useHistory();
  const localToken = localStorage.getItem("token");

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
    if (userToken.token) {
      try {
        const { data } = await axios.get<IData[]>(
          `${BACKEND_URL}/users/me/article?page=${page}&size=15`,
          {
            headers: {
              Authorization: `Bearer ${userToken.token}`,
            },
          },
        );
        if (data) {
          setDataSlice([...dataSlice, ...data]);
        }
      } catch {
        localStorage.removeItem("token");
        addTokenLocal({ token: "" });
        history.push(`/`);
      }
    }
  };

  useEffect(() => {
    if (!userToken.token) {
      if (localToken) {
        addTokenLocal({ token: `${localToken}` });
      }
      if (!localToken) {
        history.push("/");
      }
    }
  }, [userToken]);

  useEffect(() => {
    getData();
  }, [page, userToken]);

  return (
    <ListContainer onScroll={scroll}>
      <Helmet>
        <title>내가 쓴 글 - 고구마</title>
      </Helmet>
      <ContentHeader isPrev={true} isNext={false} title={"내가 쓴 글"} />
      {dataSlice.length > 0 ? (
        <ListBox>
          {dataSlice.map(goguma => (
            <GogumaListLink href={`/goguma/${goguma.id}`} key={goguma.id}>
              <GogumaCard
                title={goguma.title}
                content={goguma.content}
                user={goguma.nickname}
                createdAt={goguma.createdAt}
                responseLength={goguma.numOfGogumas}
              >
                <img src={icon_fireguma} width={50} height={50} />
              </GogumaCard>
            </GogumaListLink>
          ))}
        </ListBox>
      ) : (
        <NotList>아직 작성한 글이 없습니다!</NotList>
      )}
    </ListContainer>
  );
};

const mapStateToProps = (state: IParams) => {
  return { userToken: state };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { addTokenLocal: (token: IParams) => dispatch(addToken(token)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(GogumaListMe);

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
  margin: 0 15px;
  box-sizing: border-box;
`;

const NotList = styled.div`
  margin-top: 50px;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 14px;
  color: #989898;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const GogumaListLink = styled.a`
  text-decoration: none;
  color: black;
`;
