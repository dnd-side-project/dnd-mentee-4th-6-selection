import React, { useEffect, useState } from "react";
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
import icon_delete from "../styles/img/icon_delete.svg";
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

interface IStyleProps {
  popupAni?: boolean;
}

export const GogumaBasket = () => {
  const history = useHistory();
  const { id } = useParams<IParams>();
  const [popupId, setPopupId] = useState(0);
  const [isPopup, setIsPopup] = useState(false);
  const [popupAni, setPopupAni] = useState(false);
  if (!id) {
    history.push(`/`);
  }
  const data = FAKE_GOGUMA_DATA.find(goguma => goguma.id === +id);
  let commentdata = data?.goguma_basket.find(comment => comment.responseId === popupId);
  const emptyList = ((5 - (data?.goguma_basket.length || 0)) % 5) + 5;

  const onPopupHandle = (commentId: number) => {
    setPopupId(commentId);
    setIsPopup(true);
  };

  const onPopupExit = () => {
    setPopupAni(true);
    setTimeout(() => {
      setIsPopup(false);
      setPopupAni(false);
    }, 300);
  };

  useEffect(() => {
    commentdata = data?.goguma_basket.find(comment => comment.responseId === popupId);
  }, [popupId]);

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
          <GogumaEmoji key={comment.responseId} onClick={() => onPopupHandle(comment.responseId)}>
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
      {isPopup && (
        <PopupContainer popupAni={popupAni}>
          <PopupWindow popupAni={popupAni}>
            <ExitBox>
              <img onClick={onPopupExit} src={icon_delete} />
            </ExitBox>
            <PopupTitleBox>
              {commentdata?.gogumaId === 1 && <img src={good} width={72} height={72} />}
              {commentdata?.gogumaId === 2 && <img src={angry} width={72} height={72} />}
              {commentdata?.gogumaId === 3 && <img src={sad} width={72} height={72} />}
              {commentdata?.gogumaId === 4 && <img src={goguma} width={72} height={72} />}
              {commentdata?.gogumaId === 5 && <img src={surprised} width={72} height={72} />}
              {commentdata?.gogumaId === 6 && <img src={relax} width={72} height={72} />}
              {commentdata?.gogumaId === 7 && <img src={veryhappy} width={72} height={72} />}
              <PopupTitle>
                <div>
                  <strong style={{ fontSize: 20 }}>{commentdata?.username}</strong> 님의 고구마
                  쪽지에요
                </div>
                <PopupSubtext>{commentdata?.gogumaId}를 주셨어요.</PopupSubtext>
                <PopupSubtext>{data?.username}의 사연에 함께 슬퍼하고 있네요.</PopupSubtext>
              </PopupTitle>
            </PopupTitleBox>
            {commentdata?.content && <CommentBox>{commentdata?.content}</CommentBox>}
          </PopupWindow>
        </PopupContainer>
      )}
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

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  max-width: 600px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${(props: IStyleProps) => (props.popupAni ? "boxFadeIn" : "boxFadeOut")} 0.3s
    ease-in-out forwards;

  @keyframes boxFadeOut {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes boxFadeIn {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

const PopupWindow = styled.div`
  width: 356px;
  background-color: white;
  opacity: 1;
  border-radius: 28px;
  padding: 20px 10px;
  box-sizing: border-box;
  animation: ${(props: IStyleProps) => (props.popupAni ? "popupMoveIn" : "popupMoveOut")} 0.3s
    ease-in-out forwards;

  @keyframes popupMoveOut {
    from {
      transform: scale(1.2);
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes popupMoveIn {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

const ExitBox = styled.div`
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const PopupTitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

const PopupTitle = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 14px;
  display: flex;
  flex-direction: column;
  height: 53px;
  justify-content: space-between;
  margin-left: 20px;
  margin-right: 20px;
`;

const PopupSubtext = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 10px;
  color: #595959;
`;

const CommentBox = styled.div`
  width: 93%;
  height: 150px;
  background-attachment: local;
  background-image: linear-gradient(to right, white 10px, transparent 10px),
    linear-gradient(to left, white 10px, transparent 10px),
    repeating-linear-gradient(white, white 45px, #ccc 45px, #ccc 46px, white 31px);
  line-height: 46px;
  padding: 8px 10px;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 14px;
`;
