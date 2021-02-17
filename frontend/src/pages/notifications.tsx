import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { ContentHeader } from "../components/content-header";
import { DisplayTime } from "../components/display-time";
import good from "../styles/img/icon_emotion_good.svg";

const FAKE_NOTICE_DATA = {
  id: 1,
  notice: [
    {
      id: 1,
      username: "김승호",
      gogumaname: "여러분들 이게 진짜 맞나요..?",
      createdAt: "2021-02-15 18:33:00",
      isChecked: false,
    },
    {
      id: 2,
      username: "이민지",
      gogumaname: "여러분들 이게 진짜 맞나요..?",
      createdAt: "2021-02-15 17:12:00",
      isChecked: false,
    },
    {
      id: 3,
      username: "김승호",
      gogumaname: "여러분들 이게 진짜 맞나요..?",
      createdAt: "2021-02-13 11:33:00",
      isChecked: false,
    },
    {
      id: 4,
      username: "김승호",
      gogumaname: "여러분들 이게 진짜 맞나요..?",
      createdAt: "2020-03-11 14:12:00",
      isChecked: true,
    },
    {
      id: 5,
      username: "김승호",
      gogumaname: "여러분들 이게 진짜 맞나요..?",
      createdAt: "2020-02-19 12:33:00",
      isChecked: true,
    },
    {
      id: 6,
      username: "김승호",
      gogumaname: "여러분들 이게 진짜 맞나요..?",
      createdAt: "2020-02-19 12:33:00",
      isChecked: true,
    },
    {
      id: 6,
      username: "김승호",
      gogumaname: "여러분들 이게 진짜 맞나요..?",
      createdAt: "2020-02-19 12:33:00",
      isChecked: true,
    },
    {
      id: 7,
      username: "김승호",
      gogumaname: "여러분들 이게 진짜 맞나요..?",
      createdAt: "2020-02-19 12:33:00",
      isChecked: true,
    },
    {
      id: 8,
      username: "김승호",
      gogumaname: "여러분들 이게 진짜 맞나요..?",
      createdAt: "2020-02-19 12:33:00",
      isChecked: true,
    },
  ],
};

interface IStyleProps {
  isChecked: boolean;
}

export const Notification = () => {
  return (
    <>
      <Helmet>
        <title>알림 - GO!GUMA</title>
      </Helmet>
      <ContentHeader isPrev={true} isNext={false} title={"알림"} />
      <NoticeContainer>
        {FAKE_NOTICE_DATA.notice.map(notice => (
          <NoticeLink href={`/goguma/1`} key={notice.id}>
            <NoticeCard isChecked={notice.isChecked}>
              <ImgEmoji isChecked={notice.isChecked} src={good} />
              <NoticeContent>
                <NoticeTitle isChecked={notice.isChecked}>{`<${notice.gogumaname}>`}</NoticeTitle>
                <NoticeSubtitle isChecked={notice.isChecked}>
                  <NoticeUser>{notice.username}</NoticeUser>님이 보낸 고구마가 도착했어요 !
                </NoticeSubtitle>
                <NoticeDate isChecked={notice.isChecked}>
                  <DisplayTime createdAt={new Date(notice.createdAt)} />
                </NoticeDate>
              </NoticeContent>
            </NoticeCard>
          </NoticeLink>
        ))}
      </NoticeContainer>
    </>
  );
};

const NoticeLink = styled.a`
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

const NoticeContainer = styled.div`
  width: 100%;
  min-height: 100%;
  padding: 0 12px;
  margin: 0 -16px;
  @media (min-width: 600px) {
  }
`;

const NoticeCard = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 16px;
  background-color: ${(props: IStyleProps) => props.isChecked && "#fafafa"};
`;

const ImgEmoji = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
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
