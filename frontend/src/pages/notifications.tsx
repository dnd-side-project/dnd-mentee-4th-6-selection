import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { ContentHeader } from "../components/content-header";
import { DisplayTime } from "../components/display-time";
import good from "../styles/img/icon_emotion_good.svg";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addToken } from "../stores/userStore";
import { useHistory } from "react-router-dom";

interface IParams {
  token: string;
}

interface IProps {
  userToken: IParams;
  addTokenLocal: (token: IParams) => void;
}

interface IStyleProps {
  isChecked: boolean;
}

interface IData {
  id: number;
  nickname: string;
  sendedTime: Date;
  title: string;
}

const Notification = ({ userToken, addTokenLocal }: IProps) => {
  const [dataSlice, setDataSlice] = useState<IData[]>([]);
  const [page, setPage] = useState(1);
  const history = useHistory();
  const localToken = localStorage.getItem("token");

  const getUser = async () => {
    if (userToken.token) {
      try {
        await axios.get(`${BACKEND_URL}/users/me/`, {
          headers: {
            Authorization: `Bearer ${userToken.token}`,
          },
        });
      } catch {
        localStorage.removeItem("token");
        addTokenLocal({ token: "" });
      }
    }
  };

  const getData = async () => {
    const { data } = await axios.get(`${BACKEND_URL}/users/me/notifications?page=${page}`, {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    });
    if (data) {
      setDataSlice([...dataSlice, ...data]);
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

  useEffect(() => {
    if (!userToken.token) {
      if (localToken) {
        addTokenLocal({ token: `${localToken}` });
      } else {
        history.push(`/`);
      }
    }
  }, [userToken, localToken]);

  useEffect(() => {
    getUser();
  }, [userToken.token]);

  useEffect(() => {
    getData();
  }, [page]);

  return (
    <ListContainer onScroll={scroll}>
      <Helmet>
        <title>알림 - GO!GUMA</title>
      </Helmet>
      <ContentHeader isPrev={true} isNext={false} title={"알림"} />
      <NoticeContainer>
        {dataSlice.map(notice => (
          <NoticeLink href={`/goguma/1`} key={notice.id}>
            <NoticeCard isChecked={false}>
              <ImgEmoji isChecked={false} src={good} />
              <NoticeContent>
                <NoticeTitle isChecked={false}>{`<${notice.title}>`}</NoticeTitle>
                <NoticeSubtitle isChecked={false}>
                  <NoticeUser>{notice.nickname}</NoticeUser>님이 보낸 고구마가 도착했어요 !
                </NoticeSubtitle>
                <NoticeDate isChecked={false}>
                  <DisplayTime createdAt={new Date(notice.sendedTime)} />
                </NoticeDate>
              </NoticeContent>
            </NoticeCard>
          </NoticeLink>
        ))}
      </NoticeContainer>
    </ListContainer>
  );
};

const mapStateToProps = (state: IParams) => {
  return { userToken: state };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { addTokenLocal: (token: IParams) => dispatch(addToken(token)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);

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

const NoticeLink = styled.a`
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

const NoticeContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0;
  @media (min-width: 600px) {
    margin: 0;
  }
`;

const NoticeCard = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 20px 15px 20px;
  background-color: ${(props: IStyleProps) => props.isChecked && "#fafafa"};
`;

const ImgEmoji = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 15px;
  filter: ${(props: IStyleProps) => props.isChecked && "grayscale(100%)"};
`;

const NoticeContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const NoticeTitle = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-weight: 400;
  font-size: 14px;
  color: ${(props: IStyleProps) => (props.isChecked ? "#989898" : "#8c5cdd")};
  margin-bottom: 4px;
`;

const NoticeSubtitle = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 16px;
  color: ${(props: IStyleProps) => (props.isChecked ? "#989898" : "black")};
  margin-bottom: 4px;
`;

const NoticeUser = styled.span`
  font-weight: 500;
`;

const NoticeDate = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 10px;
  color: ${(props: IStyleProps) => (props.isChecked ? "#989898" : "#898989")};
`;
