import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Dispatch } from "redux";
import { BACKEND_URL } from "../constants";
import { addToken } from "../stores/userStore";
import good from "../styles/img/icon_emotion_good.svg";
import angry from "../styles/img/icon_emotion_angry.svg";
import sad from "../styles/img/icon_emotion_sad.svg";
import goguma from "../styles/img/icon_emotion_goguma.svg";
import surprised from "../styles/img/icon_emotion_surprised.svg";
import relax from "../styles/img/icon_emotion_relax.svg";
import veryhappy from "../styles/img/icon_emotion_veryhappy.svg";
import backImg from "../styles/img/yellow_backImg.svg";

const GOGUMA_TYPE = [
  {
    type: "GOOD",
    name: "훈-훈 하구마~",
    content: "훈훈한 일에는 언제나 훈-훈 하구마~가 함께해요.",
    img: good,
  },
  {
    type: "ANGRY",
    name: "뭐구마!!!",
    content: "님의 사연에 함께 분노하고 있어요 !",
    img: angry,
  },
  {
    type: "SAD",
    name: "슬프구마..",
    content: "님의 사연에 함께 슬퍼하고 있어요 !",
    img: sad,
  },
  {
    type: "GOGUMA",
    name: "고..고구마",
    content: "님의 사연에 어찌할지 몰라하고 있어요.",
    img: goguma,
  },
  {
    type: "SURPRISED",
    name: "??뭐구마..?!",
    content: "사연에 너무놀라 충격을 받았어요.",
    img: surprised,
  },
  {
    type: "RELAX",
    name: "좋구마~",
    content: "사연을 듣고 행복한 아빠미소를 짓고있어요 !",
    img: relax,
  },
  {
    type: "VERYHAPPY",
    name: "베리굿구마~",
    content: "행복한 소식을 고구마에 자주 전해주세요 !",
    img: veryhappy,
  },
];

interface IParams {
  token: string;
}

interface IUseParams {
  gogumaId: string;
  gogumasId: string;
}

interface IProps {
  userToken: IParams;
  addTokenLocal: (token: IParams) => void;
}

interface IData {
  id: number;
  message: string;
  nickname: string;
  isOwner: boolean;
  gogumaType: string;
}

interface IEmojiData {
  type: string;
  name: string;
  content: string;
  img: string;
}

const Gogumas = ({ userToken, addTokenLocal }: IProps) => {
  const { gogumaId, gogumasId } = useParams<IUseParams>();
  const [isUser, setIsUser] = useState(false);
  const [userName, setUserName] = useState("");
  const [gogumaData, setGogumaData] = useState("");
  const [gogumasData, setGogumasData] = useState<IData>();
  const [gogumasEmojiData, setGogumasEmojiData] = useState<IEmojiData>();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const localToken = localStorage.getItem("token");

  if (!gogumaId || !gogumasId) {
    history.push(`/`);
  }

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
      } catch {
        localStorage.removeItem("token");
        addTokenLocal({ token: "" });
      }
    }
  };

  const getData = async () => {
    setLoading(true);
    const { data } = await axios.get(`${BACKEND_URL}/articles/${gogumaId}/gogumas/${gogumasId}`, {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    });
    const {
      data: { nickname },
    } = await axios.get(`${BACKEND_URL}/articles/${gogumaId}`);
    if (data) {
      setGogumasData(data);
    }
    if (nickname) {
      setGogumaData(nickname);
    }
    setLoading(false);
  };

  const getEmojiData = async () => {
    if (gogumasData) {
      const gogumaType = GOGUMA_TYPE.find(gogumas => gogumas.type === gogumasData.gogumaType);
      if (gogumaType) {
        setGogumasEmojiData(gogumaType);
      }
    }
  };

  const DeleteEmojiData = async () => {
    const deleteCheck = confirm("정말로 삭제하시겠습니까?");
    if (deleteCheck) {
      try {
        await axios.delete(`${BACKEND_URL}/articles/${gogumaId}/gogumas/${gogumasId}`, {
          headers: {
            Authorization: `Bearer ${userToken.token}`,
          },
        });
        history.push(`/goguma/basket/${gogumaId}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (userToken.token) {
      setIsUser(true);
    }
    if (!userToken.token) {
      setIsUser(false);
      if (localToken) {
        addTokenLocal({ token: `${localToken}` });
      }
    }
  }, [isUser, userToken]);

  useEffect(() => {
    getUser();
  }, [userToken.token]);

  useEffect(() => {
    setIsUser(Boolean(userName));
  }, [userName]);

  useEffect(() => {
    getData();
  }, [gogumaId, gogumasId]);

  useEffect(() => {
    getEmojiData();
  }, [gogumasData]);

  return (
    <>
      <Helmet>
        <title>고구마 쪽지 - 고구마</title>
      </Helmet>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <GogumasContainer>
            {gogumasData?.isOwner ? (
              <DeleteButton>
                <div onClick={DeleteEmojiData}>삭제</div>
              </DeleteButton>
            ) : (
              <DeleteButton />
            )}
            <GogumaBackImg />
            <GogumasBox>
              <GogumasContent>
                <>
                  <GogumasMainBox>
                    <GogumasImg src={gogumasEmojiData?.img} />
                    <div>
                      <GogumasTitle>
                        <GogumasName>{gogumasData?.nickname}</GogumasName> 님의 고구마 쪽지에요
                      </GogumasTitle>
                      <GogumasSubtitle>{gogumasEmojiData?.name}를 주셨어요.</GogumasSubtitle>
                      <GogumasSubtitle>
                        {(gogumasEmojiData?.type === "ANGRY" ||
                          gogumasEmojiData?.type === "SAD" ||
                          gogumasEmojiData?.type === "GOGUMA") &&
                          gogumaData}
                        {gogumasEmojiData?.content}
                      </GogumasSubtitle>
                    </div>
                  </GogumasMainBox>
                  {gogumasData?.message && <GogumasNote>{gogumasData.message}</GogumasNote>}
                </>
              </GogumasContent>
            </GogumasBox>
          </GogumasContainer>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: IParams) => {
  return { userToken: state };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { addTokenLocal: (token: IParams) => dispatch(addToken(token)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Gogumas);

const GogumasContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 36px;
`;

const GogumaBackImg = styled.div`
  width: 100%;
  height: 250px;
  background-image: url(${backImg});
  background-size: 100% 360px;
`;

const GogumasBox = styled.div`
  margin-top: -145px;
  width: 313px;
  min-height: 200px;
  background-color: #ffe082;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  box-shadow: 0px 4px 5px #00000029;
`;

const GogumasContent = styled.div`
  width: 94%;
  min-height: 200px;
  background-color: white;
  border-radius: 20px;
  margin: -10px auto 10px auto;
  display: flex;
  flex-direction: column;
  padding: 40px 20px 30px 20px;
  box-sizing: border-box;
`;

const GogumasMainBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const GogumasImg = styled.img`
  margin-right: 10px;
`;

const GogumasName = styled.span`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 18px;
`;

const GogumasTitle = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 12px;
  margin-bottom: 6px;
`;

const GogumasSubtitle = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 10px;
  color: #595959;
`;

const GogumasNote = styled.div`
  min-height: 128px;
  background-image: linear-gradient(to right, white 0px, transparent 0px),
    linear-gradient(to left, white 0px, transparent 0px),
    repeating-linear-gradient(white, white 38px, #eee 38px, #eee 39px, white 24px);
  line-height: 39px;
  word-break: break-all;
  white-space: normal;
`;

const DeleteButton = styled.div`
  width: 100%;
  height: 30px;
  padding: 0 7px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 14px;
  font-weight: 300;
  margin-top: 100px;
`;
