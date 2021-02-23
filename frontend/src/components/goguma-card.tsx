import React from "react";
import styled from "styled-components";
import { DisplayTime } from "./display-time";

interface IProps {
  user: string;
  title: string;
  content: string;
  createdAt: string;
  children: React.ReactChild;
  responseLength?: number;
}

export const GogumaCard = ({
  title,
  content,
  user,
  createdAt,
  children,
  responseLength,
}: IProps) => {
  return (
    <GogumaCardBox>
      <GogumaEmoji>
        {children}
        <ResponseCount>{responseLength && responseLength}</ResponseCount>
      </GogumaEmoji>
      <GogumaContentBox>
        <GogumaTitle>{title.length >= 25 ? `${title.slice(0, 25)}...` : title}</GogumaTitle>
        <GogumaContent>
          {content.length >= 55 ? `${content.slice(0, 55)}...` : content}
        </GogumaContent>
        <div>
          <GogumaUser>{user}</GogumaUser>
          <GogumaDate>
            <DisplayTime createdAt={new Date(createdAt)} />
          </GogumaDate>
        </div>
      </GogumaContentBox>
    </GogumaCardBox>
  );
};

const GogumaCardBox = styled.div`
  width: 100%;
  display: flex;
  padding: 15px 0;
  border-bottom: 2px solid #f2f2f2;
`;

const GogumaEmoji = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
`;

const ResponseCount = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 10px;
  color: #595959;
`;

const GogumaContentBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const GogumaTitle = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 14px;
  margin-bottom: 3px;
`;

const GogumaContent = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  height: 23px;
  font-weight: 300;
  font-size: 12px;
  color: #595959;
  margin-bottom: 2px;
  padding-right: 5px;
`;

const GogumaUser = styled.span`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-weight: 300;
  font-size: 12px;
  color: #989898;
  margin-right: 10px;
`;

const GogumaDate = styled.span`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-weight: 300;
  font-size: 12px;
  color: #989898;
`;
