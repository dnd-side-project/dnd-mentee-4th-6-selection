import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import axios from "axios";
import { addToken } from "../stores/userStore";
import { BACKEND_URL } from "../constants";
import veryhappy from "../styles/img/icon_emotion_veryhappy.svg";
import icon_alarm from "../styles/img/icon_alarm_0.svg";
import icon_alarm_new from "../styles/img/icon_alarm.svg";

interface IParams {
  token: string;
}

interface IProps {
  userToken: IParams;
  addTokenLocal: (token: IParams) => void;
  onClick: () => void;
  isMain: boolean;
}

interface IStyleProps {
  isActive: boolean;
}

interface IData {
  id: number;
  nickname: string;
  sendedTime: Date;
  title: string;
}

const Sidebar: React.FC<IProps> = ({ userToken, addTokenLocal, onClick, isMain }: IProps) => {
  const [userName, setUserName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isNotification, setIsNotification] = useState(false);
  const localToken = localStorage.getItem("token");

  const onClickOut = () => {
    setIsActive(false);
    setTimeout(onClick, 300);
  };

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

  const getNotice = async () => {
    if (userName) {
      const { data } = await axios.get<IData[]>(`${BACKEND_URL}/users/me/notifications`, {
        headers: {
          Authorization: `Bearer ${userToken.token}`,
        },
      });
      if (data.length > 0) {
        setIsNotification(true);
      }
    }
  };

  useEffect(() => {
    if (!userToken.token) {
      if (localToken) {
        addTokenLocal({ token: `${localToken}` });
      }
    }
  }, [userName, userToken]);

  useEffect(() => {
    getUser();
  }, [userToken.token]);

  useEffect(() => {
    getNotice();
  }, [userName]);

  return (
    <OuterBackground>
      <SideContainer isActive={isActive}>
        <SidebarMenu isActive={isActive}>
          <div>
            <UserBox>
              {userName && (
                <>
                  <ImgBox>
                    <img src={veryhappy} width={53} height={53} />
                  </ImgBox>
                  <UserName>{userName} 님</UserName>
                </>
              )}
              {!userName && (
                <>
                  <NotUserTitle>
                    <NotUserColor>
                      로그인하여
                      <br /> 고구마를 즐겨보세요!
                    </NotUserColor>
                  </NotUserTitle>
                  <UserLoginBtn href={"/login"}>로그인</UserLoginBtn>
                </>
              )}
            </UserBox>
            <MenuBox>
              {isMain ? (
                <span style={{ color: "#8c5cdd" }}>메인페이지</span>
              ) : (
                <span>
                  <MenuLink href={`/`}>메인페이지</MenuLink>
                </span>
              )}
              <span>
                <MenuLink href={`/goguma-list/popular`}>인기글</MenuLink>
              </span>
              <span>
                <MenuLink href={`/goguma-list/resent`}>최신글</MenuLink>
              </span>
            </MenuBox>
            {userName && (
              <>
                <MenuBorder />
                <MenuBox>
                  {isMain ? (
                    <span>
                      <MenuLink href={`/my-page`}>마이페이지</MenuLink>
                    </span>
                  ) : (
                    <span style={{ color: "#8c5cdd" }}>마이페이지</span>
                  )}
                  <span>
                    <MenuLink href={`/goguma-list/me`}>내가 쓴 글</MenuLink>
                  </span>
                </MenuBox>
              </>
            )}
          </div>
        </SidebarMenu>
        <OutBackground onClick={onClickOut}>
          <NotificationLink href={`/notifications`}>
            {userName && (
              <NotificationBox>
                {isNotification ? (
                  <img src={icon_alarm_new} width={30} height={30} />
                ) : (
                  <img src={icon_alarm} width={30} height={30} />
                )}
              </NotificationBox>
            )}
          </NotificationLink>
        </OutBackground>
      </SideContainer>
    </OuterBackground>
  );
};

const mapStateToProps = (state: IParams) => {
  return { userToken: state };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { addTokenLocal: (token: IParams) => dispatch(addToken(token)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

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

const SideContainer = styled.div`
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
  width: 180px;
  min-width: 180px;

  display: flex;
  flex-direction: column;
  align-items: center;

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
`;

const MenuBox = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    margin-bottom: 22px;
  }
`;

const MenuBorder = styled.div`
  width: 74px;
  height: 9px;
  border-bottom: 0.75px solid #cecece;
  margin: 0 auto;
  margin-bottom: 33px;
`;

const ImgBox = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 143px;
`;

const UserName = styled.span`
  font-family: "Gaegu", cursive;
  font-size: 18px;
  margin-bottom: 79px;
`;

const NotUserTitle = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 12px;
  text-align: center;
  width: 106px;
  margin-top: 154px;
  margin-bottom: 25px;
`;

const NotUserColor = styled.div`
  color: #8c5cdd;
  line-height: 21px;
`;

const UserLoginBtn = styled.a`
  text-decoration: none;
  margin-bottom: 66px;
  width: 92px;
  height: 35px;
  border-radius: 24px;
  background-color: #8c5cdd;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 14px;
  font-weight: 300;
  color: white;
`;

const OutBackground = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const MenuLink = styled.a`
  text-decoration: none;
  color: black;
`;

const NotificationLink = styled.a`
  text-decoration: none;
  color: black;
  position: absolute;
  top: 160px;
  left: 15px;
`;

const NotificationBox = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
