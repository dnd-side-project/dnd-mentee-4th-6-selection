import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Emoji from "../components/emoji";
import { ContentHeader } from "../components/content-header";
import basket from "../styles/img/icon_guma_box.svg";
import good from "../styles/img/icon_emotion_good.svg";
import angry from "../styles/img/icon_emotion_angry.svg";
import sad from "../styles/img/icon_emotion_sad.svg";
import goguma from "../styles/img/icon_emotion_goguma.svg";
import surprised from "../styles/img/icon_emotion_surprised.svg";
import relax from "../styles/img/icon_emotion_relax.svg";
import veryhappy from "../styles/img/icon_emotion_veryhappy.svg";
import icon_fireguma from "../styles/img/icon_fireguma_max.svg";
import icons_linkcopy from "../styles/img/icons_linkcopy.svg";
import basket_comment from "../styles/img/basket_comment.svg";
import background_img from "../styles/img/watercolor-paper-texture.png";
import axios from "axios";
import { Dispatch } from "redux";
import { addToken } from "../stores/userStore";
import { connect } from "react-redux";
import { BACKEND_URL } from "../constants";
import { useForm } from "react-hook-form";

interface IStyleProps {
  basketActive: boolean;
}

interface IParams {
  id: string;
}

interface IPropParams {
  token: string;
}

interface IProps {
  userToken: IPropParams;
  addTokenLocal: (token: IPropParams) => void;
}

interface IChoices {
  id: number;
  content: string;
}

interface IData {
  id: number;
  title: string;
  content: string;
  nickname: string;
  numOfShared: number;
  choices: IChoices[];
  votedChoiceId: number;
  createdAt: string;
  owner: boolean;
}

const Goguma = ({ userToken, addTokenLocal }: IProps) => {
  const history = useHistory();
  const { id } = useParams<IParams>();
  const url = window.location.href;
  const { register, getValues } = useForm();
  const [basketActive, setBasketActive] = useState(false);
  const [showheader, setShowheader] = useState(true);
  const [showClip, setShowClip] = useState(false);
  const [gogumaData, setGogumaData] = useState<IData>();
  const [isModify, setIsModify] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [choiceOValue, setChoiceOValue] = useState("");
  const [choiceTValue, setChoiceTValue] = useState("");
  const [loading, setLoading] = useState(true);
  const localToken = localStorage.getItem("token");

  const onBasketActive = () => {
    setBasketActive(true);
    setTimeout(() => {
      setBasketActive(false);
    }, 430);
  };

  const onCopy = () => {
    setShowClip(true);
    setTimeout(() => {
      setShowClip(false);
    }, 2000);
  };

  const scroll = (event: React.UIEvent<HTMLElement>) => {
    event.stopPropagation();
    const scrollTop = event.currentTarget.scrollTop;
    const show = scrollTop < 80;
    setShowheader(show);
  };

  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${BACKEND_URL}/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken.token}`,
        },
      });
      if (data) {
        await setGogumaData(data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const setData = () => {
    if (gogumaData) {
      setTitleValue(gogumaData.title);
      setContentValue(gogumaData.content);
      if (gogumaData.choices.length > 0) {
        setChoiceOValue(gogumaData.choices[0].content);
        setChoiceTValue(gogumaData.choices[1].content);
      }
    }
  };

  const onChange = () => {
    const { title, content } = getValues();
    setTitleValue(title);
    setContentValue(content);
    if (gogumaData && gogumaData.choices.length > 0) {
      const { choice1, choice2 } = getValues();
      setChoiceOValue(choice1);
      setChoiceTValue(choice2);
    }
  };

  const onSubmit = async () => {
    const gogumaConfirm = confirm("정말 게시글을 수정 하시겠어요?");
    if (gogumaConfirm) {
      let data;
      if (gogumaData && gogumaData?.choices.length > 0) {
        data = {
          content: contentValue,
          title: titleValue,
          choices: [{ content: choiceOValue }, { content: choiceTValue }],
        };
      } else {
        data = {
          content: contentValue,
          title: titleValue,
          choices: [],
        };
      }
      await axios.put(`${BACKEND_URL}/articles/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken.token}`,
        },
      });
      setIsModify(false);
    }
  };

  const onDelete = async () => {
    const gogumaConfirm = confirm("정말 게시글을 삭제 하시겠어요?");
    if (gogumaConfirm) {
      await axios.delete(`${BACKEND_URL}/articles/${id}`);
      history.push(`/`);
    }
  };

  useEffect(() => {
    setData();
  }, [gogumaData]);

  useEffect(() => {
    if (!userToken.token) {
      if (localToken) {
        addTokenLocal({ token: `${localToken}` });
      }
    }
  }, [localToken, userToken]);

  useEffect(() => {
    getData();
  }, [id, isModify]);

  return (
    <GogumaOutContainer onScroll={scroll}>
      <Helmet>
        <title>{`${gogumaData?.title.slice(0, 5)}...` || "not found"} - 고구마</title>
      </Helmet>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <ContentHeader isPrev={true} isNext={false} title={""}>
            {gogumaData?.owner ? (
              <>
                {isModify ? (
                  <>
                    <div style={{ marginRight: 30, cursor: "pointer" }} onClick={onSubmit}>
                      등록
                    </div>
                    <div
                      style={{ marginRight: 20, cursor: "pointer" }}
                      onClick={() => setIsModify(false)}
                    >
                      취소
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      style={{ marginRight: 30, cursor: "pointer" }}
                      onClick={() => setIsModify(true)}
                    >
                      편집
                    </div>
                    <div style={{ marginRight: 20, cursor: "pointer" }} onClick={onDelete}>
                      삭제
                    </div>
                  </>
                )}
              </>
            ) : (
              <CopyToClipboard text={url} onCopy={onCopy}>
                <LinkImg src={icons_linkcopy} />
              </CopyToClipboard>
            )}
          </ContentHeader>
          {showClip && <ClipBox>링크가 복사되었습니다!</ClipBox>}
          {gogumaData && (
            <>
              {!showheader && (
                <ScrollTitle className={`${showheader ? "" : "show"}`}>
                  {gogumaData.title}
                </ScrollTitle>
              )}
              {isModify ? (
                <GogumaContainer>
                  <ContentContainer>
                    <TitleInput
                      ref={register({ maxLength: 30 })}
                      value={titleValue}
                      name={"title"}
                      onChange={onChange}
                      maxLength={30}
                    />
                    <ContentInput
                      ref={register({ maxLength: 200 })}
                      value={contentValue}
                      name={"content"}
                      onChange={onChange}
                      maxLength={200}
                      spellCheck={false}
                    />
                    {gogumaData.choices.length > 0 && (
                      <ChoiceBoxes>
                        <ChoiceInput
                          ref={register({ maxLength: 30 })}
                          value={choiceOValue}
                          name={"choice1"}
                          onChange={onChange}
                          maxLength={30}
                        />
                        <ChoiceInput
                          ref={register({ maxLength: 30 })}
                          value={choiceTValue}
                          name={"choice2"}
                          onChange={onChange}
                          maxLength={30}
                        />
                      </ChoiceBoxes>
                    )}
                  </ContentContainer>
                </GogumaContainer>
              ) : (
                <GogumaContainer>
                  <ContentContainer>
                    <TitleBox>
                      {gogumaData.numOfShared > 0 && <img src={icon_fireguma} />}
                      {gogumaData.title}
                    </TitleBox>
                    <ContentBox>{gogumaData.content}</ContentBox>
                    {gogumaData.choices.length > 0 && (
                      <ChoiceBoxes>
                        {gogumaData.choices.map(choice => (
                          <ChoiceBox key={choice.id}>{choice.content}</ChoiceBox>
                        ))}
                      </ChoiceBoxes>
                    )}
                  </ContentContainer>
                </GogumaContainer>
              )}
              <BasketContainer>
                <Link to={`/goguma/basket/${gogumaData.id}`}>
                  <GogumaBasket basketActive={basketActive}>
                    <img src={basket} />
                  </GogumaBasket>
                </Link>
                {gogumaData.numOfShared > 10 && (
                  <BasketComment>고구마바구니가 가득 찼어요!</BasketComment>
                )}
              </BasketContainer>
              <GogumaSubtext>글이 공감되시나요? 고구마로 소통할 수 있어요.</GogumaSubtext>
              <EmojiContainer>
                <GogumaEmojies>
                  <GogumaEmogi>
                    <Emoji onBasketActive={onBasketActive} type="GOOD">
                      <img src={good} />
                    </Emoji>
                    <EmogiTitle>훈-훈 하구마~</EmogiTitle>
                  </GogumaEmogi>
                  <GogumaEmogi>
                    <Emoji onBasketActive={onBasketActive} type="ANGRY">
                      <img src={angry} />
                    </Emoji>
                    <EmogiTitle>뭐구마!!!!</EmogiTitle>
                  </GogumaEmogi>
                  <GogumaEmogi>
                    <Emoji onBasketActive={onBasketActive} type="SAD">
                      <img src={sad} />
                    </Emoji>
                    <EmogiTitle>슬프구마..</EmogiTitle>
                  </GogumaEmogi>
                  <GogumaEmogi>
                    <Emoji onBasketActive={onBasketActive} type="GOGUMA">
                      <img src={goguma} />
                    </Emoji>
                    <EmogiTitle>고..고구마</EmogiTitle>
                  </GogumaEmogi>
                  <GogumaEmogi>
                    <Emoji onBasketActive={onBasketActive} type="SUPRISED">
                      <img src={surprised} />
                    </Emoji>
                    <EmogiTitle>??뭐구마..?!</EmogiTitle>
                  </GogumaEmogi>
                  <GogumaEmogi>
                    <Emoji onBasketActive={onBasketActive} type="RELAX">
                      <img src={relax} />
                    </Emoji>
                    <EmogiTitle>좋구마~</EmogiTitle>
                  </GogumaEmogi>
                  <GogumaEmogi>
                    <Emoji onBasketActive={onBasketActive} type="VERYHAPPY">
                      <img src={veryhappy} />
                    </Emoji>
                    <EmogiTitle>베리굿구마~</EmogiTitle>
                  </GogumaEmogi>
                </GogumaEmojies>
              </EmojiContainer>
            </>
          )}
          {!gogumaData && (
            <NotFoundContainer>
              <NotFoundTitle>찾을수 없는 게시글 입니다.</NotFoundTitle>
              <NotFoundContent>
                삭제되거나 없는 게시글 입니다. 다시 한번 확인해주세요
              </NotFoundContent>
              <NotFoundLink>
                <Link to={`/`} style={{ textDecoration: "none", color: "#505050" }}>
                  홈으로 돌아가기
                </Link>
              </NotFoundLink>
            </NotFoundContainer>
          )}
        </>
      )}
    </GogumaOutContainer>
  );
};

const mapStateToProps = (state: IPropParams) => {
  return { userToken: state };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { addTokenLocal: (token: IPropParams) => dispatch(addToken(token)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Goguma);

const GogumaOutContainer = styled.div`
  width: 354px;
  height: 732px;
  margin: 0 -13px;
  position: relative;
  @media (max-width: 1025px) {
    width: 100vw;
    height: 100vh;
    margin: 0;
  }
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url(${background_img});
`;

const ScrollTitle = styled.div`
  position: fixed;
  width: 354px;
  top: ${(window.innerHeight - 732) / 2 + 1}px;
  @media (max-width: 1025px) {
    top: 0;
    width: 100%;
  }
  display: flex;
  left: 0;
  right: 0;
  margin: 0 auto;
  height: 50px;
  background-color: white;
  padding: 0 27px;
  font-family: "Gaegu", cursive;
  font-size: 18px;
  color: #8c5cdd;
  align-items: center;
  box-sizing: border-box;
`;

const LinkImg = styled.img`
  cursor: pointer;
`;

const ClipBox = styled.div`
  position: fixed;
  width: 330px;
  bottom: ${(window.innerHeight - 732) / 2 + 50}px;
  @media (max-width: 1025px) {
    width: 90%;
    bottom: 50px;
  }
  height: 45px;
  border-radius: 10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 0 19px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.8);
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 16px;
  font-weight: 300;
  color: white;
  display: flex;
  align-items: center;
  animation: clip 2s ease-in-out forwards;
  @keyframes clip {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const GogumaContainer = styled.div`
  box-sizing: border-box;
  padding: 0px 18px;
  margin-top: 20px;
`;

const ContentContainer = styled.div`
  min-height: 440px;
  margin-bottom: 45px;
`;

const TitleBox = styled.div`
  font-family: "Gaegu", cursive;
  font-size: 25px;
  color: #8c5cdd;
  padding-bottom: 11px;
  border-bottom: 2px solid #8c5cdd;
  margin-bottom: 20px;
  word-break: keep-all;
  display: flex;
  align-items: flex-start;
`;

const ContentBox = styled.pre`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-weight: 300;
  font-size: 14px;
  line-height: 25px;
  margin-bottom: 45px;
  white-space: pre-wrap;
  word-break: keep-all;
`;

const ChoiceBoxes = styled.div`
  height: 67px;
  display: flex;
  place-items: center;
  border-radius: 12px;
  border: 1px solid #8c5cdd;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  background-color: white;
  overflow: hidden;
  div:not(:last-child) {
    border-right: 1px solid #8c5cdd;
  }
  input:not(:last-child) {
    border-right: 1px solid #8c5cdd;
  }
`;

const ChoiceBox = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #8c5cdd;
  width: 100%;
  height: 100%;
  padding: 0 15px;
  word-break: keep-all;
  text-align: center;
`;

const BasketContainer = styled.div`
  display: flex;

  align-items: center;
  padding: 0 18px;
`;

const GogumaBasket = styled.div`
  width: 118px;
  height: 118px;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  font-size: 70px;
  animation: ${(props: IStyleProps) => (props.basketActive ? "basketRotate" : "")} 420ms linear;

  @keyframes basketRotate {
    18% {
      transform: rotate(7deg);
    }
    50% {
      transform: rotate(-7deg);
    }
    83% {
      transform: rotate(7deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
`;

const BasketComment = styled.div`
  width: 120px;
  height: 60px;
  background-image: url(${basket_comment});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 12px;
  color: #8c5cdd;
  word-break: keep-all;
  padding-left: 20px;
  padding-right: 10px;
  box-sizing: border-box;
  margin-left: 10px;
`;

const GogumaSubtext = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 12px;
  color: #989898;
  padding-left: 30px;
  margin-bottom: 15px;
`;

const EmojiContainer = styled.div`
  padding-bottom: 40px;
`;

const GogumaEmojies = styled.div`
  display: flex;
  justify-content: flex-start;
  left: 0;
  right: 0;
  margin: 0 auto;
  font-size: 60px;
  width: 100%;
  padding: 10px 17px;
  box-sizing: border-box;
  overflow: auto;
`;

const GogumaEmogi = styled.div`
  padding-right: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:last-child {
    padding-right: 17px;
  }
`;

const EmogiTitle = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 10px;
  margin-top: 3px;
  color: #595959;
`;

const NotFoundContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NotFoundTitle = styled.span`
  font-size: 20px;
  margin-bottom: 20px;
`;
const NotFoundContent = styled.span`
  color: #505050;
  margin-bottom: 30px;
`;

const NotFoundLink = styled.div`
  width: 140px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #404040;
  transition: background-color 0.1s ease-in-out;
  &:hover {
    background-color: #cccccc;
  }
  &:active {
    background-color: #a0a0a0;
  }
`;

const TitleInput = styled.input`
  width: 100%;
  font-family: "Gaegu", cursive;
  font-size: 25px;
  color: #8c5cdd;
  padding-bottom: 11px;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  border-bottom: 2px solid #8c5cdd;
  margin-bottom: 20px;
  word-break: keep-all;
  display: flex;
  align-items: flex-start;
  &:focus {
    outline: none;
  }
`;

const ContentInput = styled.textarea`
  width: 100%;
  height: 175px;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-weight: 300;
  font-size: 14px;
  line-height: 25px;
  margin-bottom: 45px;
  word-break: keep-all;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const ChoiceInput = styled.input`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #8c5cdd;
  width: 100%;
  height: 100%;
  padding: 0 15px;
  border: none;
  word-break: keep-all;
  text-align: center;
  &:focus {
    outline: none;
  }
`;
