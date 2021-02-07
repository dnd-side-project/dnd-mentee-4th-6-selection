import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { Emoji } from "../components/emoji";
import basket from "../styles/img/icon_guma_box.svg";
import good from "../styles/img/icon_emotion_good.svg";
import angry from "../styles/img/icon_emotion_angry.svg";
import sad from "../styles/img/icon_emotion_sad.svg";
import goguma from "../styles/img/icon_emotion_goguma.svg";
import surprised from "../styles/img/icon_emotion_surprised.svg";
import relax from "../styles/img/icon_emotion_relax.svg";
import veryhappy from "../styles/img/icon_emotion_veryhappy.svg";

const FAKE_GOGUMA_DATA = [
  {
    id: 1,
    title: "여러분들,, 이게 진짜 맞나요..?",
    content: `저는 27살 여자구 소개로 1년가까이 만난 동갑남자친구가 있어요. 저는 직장인이구 남친은 아직 한학기 남은 휴학 취준생입니다. 원래 성격이 좀 예민하고 까탈스럽고 공감능력이 많이 떨어진다고 듣는 남자친구인데 그래도 저에겐 한없이 멋있고 좋은점도 많이 보이고 술담배도 안하고 항상 바르게 살려고 하는거같아서 계속 만나고 있는 중에 . . . . . (생략). . . . . .어떻게 해야할까요? .`,
    tags: [
      "댓글",
      "태그1",
      "태그2",
      "작성된",
      "태그는",
      "태그갯수제한",
      "여기에 계속 쌓이게",
      "10개",
    ],
    choices: ["확 갈라선다!", "20자인 경우 이정도 길이가 됩니다."],
    goguma_response: [
      {
        responseId: 12,
        username: "ktx 123",
        goguma: "고구마반개",
        content: `
                    힘을 내용 슈퍼 고구마~
                    원래 해뜨기 직전이 제일 어둡다잖아요.
                    지금 님 연애전선도 그런거라고 생각 ㄱㄱ
                `,
      },
      {
        responseId: 13,
        username: "유저 123",
        goguma: "고구마반의반개",
        content: `
                    내용 내용 내용 내용 내용
                    내용 내용 내용
                    내용 내용 내용 내용
                `,
      },
    ],
  },
];

interface IStyleProps {
  basketActive: boolean;
}

interface IParams {
  id: string;
}

export const Goguma: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<IParams>();
  const [basketActive, setBasketActive] = useState(false);
  const [showheader, setShowheader] = useState(true);
  const [pageY, setPageY] = useState(0);
  const documentRef = useRef(document);
  if (!id) {
    history.push(`/`);
  }
  const onBasketActive = () => {
    setBasketActive(true);
    setTimeout(() => {
      setBasketActive(false);
    }, 430);
  };
  const handleScroll = () => {
    const { scrollY } = window;
    const show = scrollY < 80;
    setShowheader(show);
    setPageY(pageYOffset);
  };

  useEffect(() => {
    documentRef.current.addEventListener("scroll", handleScroll);
    return () => documentRef.current.removeEventListener("scroll", handleScroll);
  }, [pageY]);

  const data = FAKE_GOGUMA_DATA.find(goguma => goguma.id === +id);

  return (
    <>
      <Helmet>
        <title>{`${data?.title.slice(0, 5)}...` || "not found"} - GO!GUMA</title>
      </Helmet>
      {data && (
        <>
          <ScrollTitle className={`${showheader ? "" : "show"}`}>{data.title}</ScrollTitle>
          <GogumaContainer>
            <ContentContainer>
              <TitleBox>{data.title}</TitleBox>
              <ContentBox>{data.content}</ContentBox>
              <ChoiceBoxes>
                {data.choices.map(choice => (
                  <ChoiceBox key={choice}>{choice}</ChoiceBox>
                ))}
              </ChoiceBoxes>
            </ContentContainer>
          </GogumaContainer>
          <BasketContainer>
            <TagBoxes>
              {data?.tags.map(tag => (
                <TagBox key={tag}>#{tag}</TagBox>
              ))}
            </TagBoxes>
            <Link to={`/goguma/basket/${data.id}`}>
              <GogumaBasket basketActive={basketActive}>
                <img src={basket} />
              </GogumaBasket>
            </Link>
            <GogumaSubtext>글이 공감되시나요? 고구마로 소통할 수 있어요.</GogumaSubtext>
          </BasketContainer>
          <GogumaEmojies>
            <GogumaEmogi>
              <Emoji title={"훈-훈 하구마~"} onBasketActive={onBasketActive}>
                <img src={good} />
              </Emoji>
              <EmogiTitle>훈-훈 하구마~</EmogiTitle>
            </GogumaEmogi>
            <GogumaEmogi>
              <Emoji title={"뭐구마!!!!"} onBasketActive={onBasketActive}>
                <img src={angry} />
              </Emoji>
              <EmogiTitle>뭐구마!!!!</EmogiTitle>
            </GogumaEmogi>
            <GogumaEmogi>
              <Emoji title={"슬프구마.."} onBasketActive={onBasketActive}>
                <img src={sad} />
              </Emoji>
              <EmogiTitle>슬프구마..</EmogiTitle>
            </GogumaEmogi>
            <GogumaEmogi>
              <Emoji title={"고..고구마"} onBasketActive={onBasketActive}>
                <img src={goguma} />
              </Emoji>
              <EmogiTitle>고..고구마</EmogiTitle>
            </GogumaEmogi>
            <GogumaEmogi>
              <Emoji title={"??뭐구마..?!"} onBasketActive={onBasketActive}>
                <img src={surprised} />
              </Emoji>
              <EmogiTitle>??뭐구마..?!</EmogiTitle>
            </GogumaEmogi>
            <GogumaEmogi>
              <Emoji title={"relax"} onBasketActive={onBasketActive}>
                <img src={relax} />
              </Emoji>
              <EmogiTitle>relax</EmogiTitle>
            </GogumaEmogi>
            <GogumaEmogi>
              <Emoji title={"veryhappy"} onBasketActive={onBasketActive}>
                <img src={veryhappy} />
              </Emoji>
              <EmogiTitle>veryhappy</EmogiTitle>
            </GogumaEmogi>
          </GogumaEmojies>
        </>
      )}
      {!data && (
        <NotFoundContainer>
          <NotFoundTitle>찾을수 없는 게시글 입니다.</NotFoundTitle>
          <NotFoundContent>삭제되거나 없는 게시글 입니다. 다시 한번 확인해주세요</NotFoundContent>
          <NotFoundLink>
            <Link to={`/`} style={{ textDecoration: "none", color: "#505050" }}>
              홈으로 돌아가기
            </Link>
          </NotFoundLink>
        </NotFoundContainer>
      )}
    </>
  );
};

const ScrollTitle = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  max-width: 600px;
  top: -50px;
  left: 0;
  right: 0;
  margin: 0 auto;
  height: 50px;
  background-color: white;
  border-bottom: 1px solid #d5d5d5;
  padding: 0 27px;
  font-family: MaruBuri-Regular;
  font-size: 20px;
  color: #8c5cdd;
  align-items: center;
  transition: 0.3s ease-in-out;
  &.show {
    transform: translateY(50px);
  }
`;

const GogumaContainer = styled.div`
  box-sizing: border-box;
  padding: 0px 18px;
`;

const TagBoxes = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const TagBox = styled.span`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 10px;
  color: #989898;
  border: 1px solid #e8e8e8;
  height: 19px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 7px;
  margin-right: 5px;
  margin-bottom: 4px;
`;

const ContentContainer = styled.div`
  min-height: 440px;
  margin-bottom: 45px;
`;

const TitleBox = styled.div`
  font-family: MaruBuri-Regular;
  font-size: 24px;
  color: #8c5cdd;
  padding-bottom: 11px;
  border-bottom: 2px solid #8c5cdd;
  margin-bottom: 42px;
  word-break: keep-all;
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

  overflow: hidden;
  div:not(:last-child) {
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
  flex-direction: column;
  align-items: flex-start;
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

const GogumaSubtext = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 12px;
  color: #989898;
  margin-bottom: 15px;
`;

const GogumaEmojies = styled.div`
  display: flex;
  justify-content: flex-start;
  left: 0;
  right: 0;
  margin: 0 auto;
  font-size: 60px;
  width: 100%;
  padding: 10px 0;
  overflow: auto;
  margin-bottom: 60px;
`;

const GogumaEmogi = styled.div`
  margin-right: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
