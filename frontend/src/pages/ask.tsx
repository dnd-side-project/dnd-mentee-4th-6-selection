import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ContentHeader } from "../components/content-header";
import styled from "styled-components";
import icon_delete from "../styles/img/icon_delete.svg";

interface IStyleProps {
  showDescription?: boolean;
}

export const Ask: React.FC = () => {
  const [showDescription, onShowDescription] = useState(true);
  const onClickRemove = () => onShowDescription(false);
  const [titleText, setTitleText] = useState("");
  const onTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 30) {
      e.target.value = e.target.value.substring(0, 30);
    }
    setTitleText(e.target.value);
  };

  return (
    <>
      <Helmet>
        <title>고구마 등록하기 - go!guma</title>
      </Helmet>
      <ContentHeader isPrev={false} isNext={true} title={"등록하기"} />
      <AskContainer>
        <StepContainer>
          <Step>
            <StepNumber>1</StepNumber>
            <StepTitle>제목</StepTitle>
          </Step>
          <Step>
            <StepNumber>2</StepNumber>
            <StepTitle>내용</StepTitle>
          </Step>
          <Step>
            <StepNumber>3</StepNumber>
            <StepTitle>선택지</StepTitle>
          </Step>
          <Step>
            <StepNumber>4</StepNumber>
            <StepTitle>태그</StepTitle>
          </Step>
        </StepContainer>
        <TitleContainer>
          <Question>고민의 제목은 어떻게 할까요?</Question>
          <ShortInput onChange={onTitleInputChange} placeholder="제목을 입력해주세요" />
          <TextCounter>({titleText.length}/30자)</TextCounter>
        </TitleContainer>
      </AskContainer>
      {showDescription ? (
        <StickyDescription>
          <span>바로 작성하지 않아도 좋아요. 언제든지 돌아올 수 있어요 :)</span>
          <img
            onClick={onClickRemove}
            src={icon_delete}
            style={{ width: "15px", verticalAlign: "middle", justifyContent: "flex-end" }}
          />
        </StickyDescription>
      ) : null}
    </>
  );
};

const StickyDescription = styled.div`
  position: fixed;
  bottom: 10px;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 12px;
  color: #989898;
`;

const AskContainer = styled.div`
  padding: 0 27px;
`;

const StepContainer = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  color: #989898;
  text-align: center;
`;

const Step = styled.div`
  padding: 10px 0;
  border-bottom: 2px solid #d5d5d5;
  display: inline-block;
  width: 25%;
`;

const StepNumber = styled.div`
  font-size: 10px;
`;

const StepTitle = styled.div`
  font-size: 12px;
`;

const TitleContainer = styled.div``;

const Question = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  padding: 52px 0 27px 0;
  font-size: 18px;
`;

const ShortInput = styled.input`
  font-family: MaruBuri-Regular;
  font-size: 16px;
  border-bottom: 2px solid #e4e4e4;
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  outline: none;
  width: 100%;
`;

const TextCounter = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 10px;
  color: #989898;
  float: right;
`;
