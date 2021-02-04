import React, { useState } from "react";
import { faChevronRight, faUser } from "@fortawesome/free-solid-svg-icons";
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
  width: 190px;
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

const MenuBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 70px;
  margin-bottom: 30px;
`;

const ImgBox = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: gray;
  color: white;
  display: flex;
  font-size: 21px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const RankedTitle = styled.span`
  font-size: 12px;
`;

const LogoutBtn = styled.button`
  border: 1px solid black;
  background-color: white;
  width: 100px;
  height: 36px;
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:focus {
    outline: none;
  }
`;

const UserName = styled.span`
  font-weight: 600;
  margin-bottom: 10px;
`;

const VersionTitle = styled.span`
  display: flex;
  justify-content: center;
`;

const CursorPointer = styled.span`
  cursor: pointer;
`;

const OutBackground = styled.div`
  width: 410px;
  height: 100%;
`;

export const Sidebar: React.FC<IProps> = ({ onClick }: IProps) => {
  const [isActive, setIsActive] = useState(true);
  const onClickOut = () => {
    setIsActive(false);
    setTimeout(onClick, 300);
  };
  return (
    <>
      <SideContainer isActive={isActive}>
        <SidebarMenu isActive={isActive}>
          <div>
            <MenuBox>
              <ImgBox>
                <FontAwesomeIcon icon={faUser} />
              </ImgBox>
              <RankedTitle>생 고구마</RankedTitle>
              <UserName>
                김구마 <FontAwesomeIcon icon={faChevronRight} />
              </UserName>
              <LogoutBtn>로그아웃</LogoutBtn>
            </MenuBox>
            <MenuBox>
              <span>마이페이지</span>
              <span>내가 쓴 글</span>
              <span>댓글 단글</span>
            </MenuBox>
            <MenuBox>
              <CursorPointer onClick={onClickOut}>메인페이지</CursorPointer>
              <span>인기글</span>
              <span>최신글</span>
            </MenuBox>
          </div>
          <div>
            <MenuBox>
              <span>공지사항</span>
              <span>환경설정</span>
              <span>의견 보내기</span>
            </MenuBox>
            <VersionTitle>V.01.1</VersionTitle>
          </div>
        </SidebarMenu>
        <OutBackground onClick={onClickOut}></OutBackground>
      </SideContainer>
    </>
  );
};
