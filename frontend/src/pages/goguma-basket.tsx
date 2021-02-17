import React from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import basket from "../styles/img/icon_guma_box_sm.svg";
import good from "../styles/img/icon_emotion_good.svg";
import angry from "../styles/img/icon_emotion_angry.svg";
import sad from "../styles/img/icon_emotion_sad.svg";
import goguma from "../styles/img/icon_emotion_goguma.svg";
import surprised from "../styles/img/icon_emotion_surprised.svg";
import relax from "../styles/img/icon_emotion_relax.svg";
import veryhappy from "../styles/img/icon_emotion_veryhappy.svg";
import dot from "../styles/img/icon_emotion_empty_dot.svg";
import messageIcon from "../styles/img/message_icon.png";
import { ContentHeader } from "../components/content-header";

const FAKE_GOGUMA_DATA = [
  {
    id: 1,
    username: "구마",
    goguma_basket: [
      {
        responseId: 12,
        gogumaId: 3,
        username: "ktx 123",
        content: `나는야 슬픈고구마 엉엉`,
      },
      {
        responseId: 13,
        gogumaId: 4,
        username: "asdf",
      },
      {
        responseId: 14,
        gogumaId: 2,
        username: "asdf",
      },
      {
        responseId: 15,
        gogumaId: 3,
        username: "asdf",
        content: `저는 27살 여자구 소개로 1년가까이 만난 동갑남자 친구가 있어요. 저는 직장인이구 남친은 아직 한학기 남은 휴학 취준생입니다. 원래 성격이 좀 예민하고 . .`,
      },
      {
        responseId: 16,
        gogumaId: 1,
        username: "asdf",
      },
      {
        responseId: 17,
        gogumaId: 1,
        username: "asdf",
      },
      {
        responseId: 18,
        gogumaId: 5,
        username: "asdf",
        content: `저는 27살 여자구 소개로 1년가까이 만난 동갑남자 친구가 있어요. 저는 직장인이구 남친은 아직 한학기 남은 휴학 취준생입니다. 원래 성격이 좀 예민하고 . .`,
      },
      {
        responseId: 19,
        gogumaId: 2,
        username: "asdf",
      },
      {
        responseId: 20,
        gogumaId: 3,
        username: "asdf",
      },
      {
        responseId: 21,
        gogumaId: 6,
        username: "asdf",
      },
    ],
  },
];

interface IParams {
  id: string;
}

export const GogumaBasket = () => {
  const history = useHistory();
  const { id } = useParams<IParams>();
  if (!id) {
    history.push(`/`);
  }
  const data = FAKE_GOGUMA_DATA.find(goguma => goguma.id === +id);
  const emptyList = ((5 - (data?.goguma_basket.length || 0)) % 5) + 5;

  return (
    <>
      <Helmet>
        <title>고구마 바구니 - GO!GUMA</title>
      </Helmet>
      <ContentHeader isPrev={false} isNext={false} title={"고구마 바구니"} />
      <ImageContainer>
        <img src={basket} />
      </ImageContainer>
      <BasketInfo>
        사람들이 주고간 고구마를 확인할 수 있어요! 쪽지가 숨겨진 고구마를 찾아보세요
      </BasketInfo>
      <GogumaEmojies>
        {data?.goguma_basket.map(comment => (
          <GogumaEmoji key={comment.responseId}>
            {comment.gogumaId === 1 && <img src={good} width={55} height={55} />}
            {comment.gogumaId === 2 && <img src={angry} width={55} height={55} />}
            {comment.gogumaId === 3 && <img src={sad} width={55} height={55} />}
            {comment.gogumaId === 4 && <img src={goguma} width={55} height={55} />}
            {comment.gogumaId === 5 && <img src={surprised} width={55} height={55} />}
            {comment.gogumaId === 6 && <img src={relax} width={55} height={55} />}
            {comment.gogumaId === 7 && <img src={veryhappy} width={55} height={55} />}
            {comment.content && (
              <MessageIcon>
                <img src={messageIcon} />
              </MessageIcon>
            )}
          </GogumaEmoji>
        ))}
        {[...Array(emptyList)].map(index => {
          return (
            <GogumaEmoji key={index}>
              <img src={dot} />
            </GogumaEmoji>
          );
        })}
      </GogumaEmojies>
    </>
  );
};

const ImageContainer = styled.div`
  width: 100%;
  margin-top: 15px;
  display: flex;
  justify-content: center;
`;

const BasketInfo = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 12px;
  width: 220px;
  word-break: keep-all;
  text-align: center;
  left: 0;
  right: 0;
  margin: 0 auto;
  margin-bottom: 55px;
`;

const GogumaEmojies = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  place-items: center;
`;

const GogumaEmoji = styled.div`
  width: 55px;
  height: 55px;
  position: relative;
  margin-bottom: 20px;
  transition: transform 220ms ease-in-out;
  &:active {
    transform: scale(0.9);
  }
`;

const MessageIcon = styled.div`
  position: absolute;
  width: 10px;
  height: 5.53px;
  top: 0;
  img {
    position: absolute;
    top: 0;
  }
`;
