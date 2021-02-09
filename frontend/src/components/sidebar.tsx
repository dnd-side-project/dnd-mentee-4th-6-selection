import React, { useState } from "react";
import { faBell, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

interface IProps {
  onClick: () => void;
}

interface IStyleProps {
  isActive: boolean;
}

const SideContainer = styled.div`
  position: fixed;
  margin: 0 auto;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  max-width: 600px;
  height: 100vh;
  overflow: hidden;
  display: flex;
  background-color: rgba(50, 50, 50, 0.5);
  z-index: 99;
  animation: ${(props: IStyleProps) => (props.isActive ? "boxFadeOut" : "boxFadeIn")} 0.3s
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

const SidebarMenu = styled.div`
  background-color: white;
  width: 200px;
  min-width: 200px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 70px 0;
  box-sizing: border-box;
  animation: ${(props: IStyleProps) => (props.isActive ? "boxMoveOut" : "boxMoveIn")} 0.3s
    ease-in-out forwards;

  @keyframes boxMoveOut {
    from {
      opacity: 0;
      transform: translateX(-100%);
    }
    to {
      opacity: 1;
    }
  }

  @keyframes boxMoveIn {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      transform: translateX(-100%);
    }
  }
`;

const UserBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 140px;
  border-bottom: 1px solid #d5d5d5;
`;

const MenuBox = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 200px;
  padding: 50px 0;
  box-sizing: border-box;
  span:first-child {
    color: #8c5cdd;
  }
`;

const ImgBox = styled.div`
  width: 80px;
  height: 80px;
  color: grey;
  display: flex;
  font-size: 21px;
  justify-content: center;
  align-items: center;
`;

const UserName = styled.span`
  font-family: MaruBuri-Regular;
  font-size: 14px;
  margin-bottom: 30px;
`;

const BellIcon = styled.div`
  margin-bottom: 50px;
`;

const NotUserTitle = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 12px;
  text-align: center;
  width: 106px;
  margin-bottom: 27px;
`;

const NotUserColor = styled.div`
  color: #989898;
`;

const LoginBtn = styled.div`
  width: 92px;
  height: 35px;
  border-radius: 24px;
  border: 1px solid #8c5cdd;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 14px;
  color: #8c5cdd;
  margin-bottom: 17px;
  text-decoration: none;
`;

const OutBackground = styled.div`
  width: 410px;
  height: 100%;
`;

const OutBtn = styled.div`
  font-size: 20px;
  margin: 65px 20px;
`;

export const Sidebar: React.FC<IProps> = ({ onClick }: IProps) => {
  const [isUser, setIsUser] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const onClickOut = () => {
    setIsActive(false);
    setTimeout(onClick, 300);
  };
  const onClickLogin = () => {
    setIsUser(true);
  };
  return (
    <>
      <SideContainer isActive={isActive}>
        <SidebarMenu isActive={isActive}>
          <div>
            <UserBox>
              {isUser ? (
                <>
                  <ImgBox>
                    <FontAwesomeIcon icon={faUser} />
                  </ImgBox>
                  <UserName>김구마님</UserName>
                  <BellIcon>
                    <FontAwesomeIcon icon={faBell} />
                  </BellIcon>
                </>
              ) : (
                <>
                  <NotUserTitle>
                    <NotUserColor>
                      로그인하여
                      <br /> 고구마를 즐겨보세요!
                    </NotUserColor>
                  </NotUserTitle>
                  <a href={"/login"}>
                    <LoginBtn>로그인</LoginBtn>
                  </a>
                  <LoginBtn onClick={onClickLogin}>임시 로그인</LoginBtn>
                  <BellIcon>
                    <NotUserColor>
                      <FontAwesomeIcon icon={faBell} />
                    </NotUserColor>
                  </BellIcon>
                </>
              )}
            </UserBox>
            <MenuBox>
              <span>메인페이지</span>
              <span>인기글</span>
              <span>최신글</span>
            </MenuBox>
            {isUser && (
              <MenuBox>
                <span>마이페이지</span>
                <span>내가 쓴 글</span>
                <span>댓글 단글</span>
              </MenuBox>
            )}
          </div>
        </SidebarMenu>
        <OutBackground>
          <OutBtn onClick={onClickOut}>
            <FontAwesomeIcon icon={faTimes} style={{ color: "white", fontWeight: 300 }} />
          </OutBtn>
        </OutBackground>
      </SideContainer>
    </>
  );
};
