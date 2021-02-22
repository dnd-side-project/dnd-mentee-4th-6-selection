import React, { useState } from "react";
import styled from "styled-components";
import icon_delete from "../styles/img/icon_delete.svg";

interface IStyleProps {
  isActive?: boolean;
  popupAni?: boolean;
  mouseX: number;
  mouseY: number;
}

interface IProps {
  children: React.ReactChild;
  title: string;
  onBasketActive: () => void;
}

export const Emoji = ({ children, title, onBasketActive }: IProps) => {
  const [isActive, setIsActive] = useState(false);
  const [popup, setPopup] = useState(false);
  const [popupAni, setPopupAni] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const onPopopHandle = (event: React.MouseEvent) => {
    setMouseX(window.innerWidth / 2 - event.clientX);
    setMouseY(event.clientY);
    setPopup(true);
  };
  const onSendHandle = () => {
    setPopupAni(true);
    setTimeout(() => {
      setPopup(false);
      setPopupAni(false);
      setIsActive(true);
    }, 300);
    setTimeout(() => {
      onBasketActive();
    }, 1150);
    setTimeout(() => {
      setIsActive(false);
      setMouseX(0);
      setMouseY(0);
    }, 1300);
  };
  const onExitPopup = () => {
    setPopupAni(true);
    setTimeout(() => {
      setPopup(false);
      setPopupAni(false);
    }, 300);
  };
  return (
    <>
      <EmogiBox onClick={onPopopHandle}>{children}</EmogiBox>
      {isActive && (
        <EmojiAni mouseX={mouseX} mouseY={mouseY}>
          <div>{children}</div>
        </EmojiAni>
      )}
      {popup && (
        <OuterBackground>
          <PopupContainer popupAni={popupAni} mouseX={mouseX} mouseY={mouseY}>
            <PopupWindow popupAni={popupAni} mouseX={mouseX} mouseY={mouseY}>
              <ExitBox>
                <img onClick={onExitPopup} src={icon_delete} />
              </ExitBox>
              <PopupTitleBox>
                {children}
                <PopupTitle>
                  <div>
                    <strong style={{ fontSize: 20 }}>{title}</strong> 를 선택하셨어요.
                  </div>
                  <PopupSubtext>화가 잔뜩 난 고구마 내용.</PopupSubtext>
                  <PopupSubtext>같이 화를 내줄수 있는 용기있는 내용내용내용</PopupSubtext>
                </PopupTitle>
              </PopupTitleBox>
              <InputContainer>
                <CommentInput
                  placeholder={"쪽지에 하고 싶은 말을 적어보세요.(선택)"}
                  maxLength={360}
                  spellCheck="false"
                />
              </InputContainer>
              <ButtonBox>
                <FormButton onClick={onSendHandle}>보내기</FormButton>
              </ButtonBox>
            </PopupWindow>
          </PopupContainer>
        </OuterBackground>
      )}
    </>
  );
};

const EmogiBox = styled.div`
  width: 72px;
  height: 72px;
  transition: transform 220ms ease-in-out;
  &:active {
    transform: scale(0.9);
  }
`;

const EmojiAni = styled.div`
  position: fixed;
  left: ${(props: IStyleProps) => window.innerWidth / 2 - 30 - props.mouseX}px;
  top: ${(props: IStyleProps) => props.mouseY - 30}px;
  padding: 0;
  margin: 0;
  animation: emojiMove 1s ease-in-out forwards;

  @keyframes emojiMove {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateX(
          ${(props: IStyleProps) =>
            props.mouseX - (window.innerWidth > 1025 ? 110 : window.innerWidth / 2 - 80)}px
        )
        translateY(-160px);
    }
  }
`;

const OuterBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  z-index: 99;
`;

const PopupContainer = styled.div`
  width: 100%;
  height: 100%;
  @media (min-width: 1025px) {
    width: 356px;
    height: 732px;
    border: 1px solid #545454;
  }
  margin: 0 auto;
  left: 0;
  right: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(50, 50, 50, 0.5);
  z-index: 99;
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
  width: 90%;
  height: 350px;
  max-width: 500px;
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

const InputContainer = styled.div`
  width: 100%;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  margin-bottom: 0;
`;

const CommentInput = styled.textarea`
  width: 85%;
  height: 150px;
  border: none;
  background-attachment: local;
  background-image: linear-gradient(to right, white 10px, transparent 10px),
    linear-gradient(to left, white 10px, transparent 10px),
    repeating-linear-gradient(white, white 45px, #ccc 45px, #ccc 46px, white 31px);
  line-height: 46px;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  padding: 8px 10px;
  font-size: 14px;
  resize: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FormButton = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-weight: 500;
  font-size: 17px;
  color: #8c5cdd;
  display: flex;
  width: 90px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
