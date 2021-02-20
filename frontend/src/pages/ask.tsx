import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ContentHeader } from "../components/content-header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import icon_delete from "../styles/img/icon_delete.svg";

export const Ask: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const onCurrentPageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };
  const [showComeBackDescription, setShowComeBackDescription] = useState(true);
  const onClickRemove = () => setShowComeBackDescription(false);
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
          <Step className={currentPage >= 1 ? "active" : ""} onClick={() => onCurrentPageChange(1)}>
            <StepNumber>1</StepNumber>
            <StepTitle>제목</StepTitle>
          </Step>
          <Step className={currentPage >= 2 ? "active" : ""} onClick={() => onCurrentPageChange(2)}>
            <StepNumber>2</StepNumber>
            <StepTitle>내용</StepTitle>
          </Step>
          <Step className={currentPage >= 3 ? "active" : ""} onClick={() => onCurrentPageChange(3)}>
            <StepNumber>3</StepNumber>
            <StepTitle>선택지</StepTitle>
          </Step>
          <Step className={currentPage >= 4 ? "active" : ""} onClick={() => onCurrentPageChange(4)}>
            <StepNumber>4</StepNumber>
            <StepTitle>태그</StepTitle>
          </Step>
        </StepContainer>
        <PageContainer className={currentPage == 1 ? "current" : ""}>
          <Question>고민의 제목은 어떻게 할까요?</Question>
          <ShortInput
            onChange={onTitleInputChange}
            placeholder="제목을 입력해주세요"
            className={"title"}
          />
          <TextCounter>({titleText.length}/30자)</TextCounter>
        </PageContainer>
        <PageContainer className={currentPage == 2 ? "current" : ""}>
          <Question>고구마에 당신의 고민을 들려주세요.</Question>
          <ContentTextArea />
        </PageContainer>
        <PageContainer className={currentPage == 3 ? "current" : ""}>
          <Question>선택지의 질문을 입력해주세요.</Question>
          <ShortInput onChange={onTitleInputChange} placeholder="선택지 질문 입력" />
          <TextCounter>({titleText.length}/30자)</TextCounter>
          <ChoiceBoxes>
            {["선택지1", "선택지2"].map(choice => (
              <ChoiceBox key={choice}>{choice}</ChoiceBox>
            ))}
          </ChoiceBoxes>
          <AddChoiceBoxContainer>
            <FontAwesomeIcon
              icon={faPlus}
              style={{ color: "#989898", verticalAlign: "middle", width: "9px", padding: "11px" }}
            />
            <AddChoiceBoxText>선택지 추가하기</AddChoiceBoxText>
          </AddChoiceBoxContainer>
        </PageContainer>
        <PageContainer className={currentPage == 4 ? "current" : ""}>
          <Question>작성한 글에 어울리는 태그를 붙혀주세요.</Question>
          <ShortInput onChange={onTitleInputChange} className={"tag"} />
        </PageContainer>
      </AskContainer>
      {showComeBackDescription ? (
        <ComebackDescription>
          <span>바로 작성하지 않아도 좋아요. 언제든지 돌아올 수 있어요 :)</span>
          <img
            onClick={onClickRemove}
            src={icon_delete}
            style={{ width: "15px", verticalAlign: "middle", justifyContent: "flex-end" }}
          />
        </ComebackDescription>
      ) : null}
    </>
  );
};

const ComebackDescription = styled.div`
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

const Step = styled.div.attrs(props => ({ className: props.className }))`
  &.active {
    border-bottom: 2px solid #8c5cdd;
    color: #8c5cdd;
  }

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

const PageContainer = styled.div`
  &.current {
    display: block;
  }

  display: none;
`;

const Question = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  padding: 52px 0 27px 0;
  font-size: 18px;
`;

const ShortInput = styled.input`
  &.title {
    font-family: MaruBuri-Regular;
  }
  &:placeholder {
    color: "#989898";
  }
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 16px;
  border-bottom: 2px solid #e4e4e4;
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  outline: none;
  width: 100%;
`;

const ContentTextArea = styled.textarea`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 16px;
  width: 100%;
  border: none;
  outline: none;
  line-height: 40px;
  resize: none;
  background-attachment: local;
  background-image: linear-gradient(to right, #ffffff, #ffffff 0px, transparent 0px),
    linear-gradient(to left, #ffffff, #ffffff 0px, transparent 0px),
    repeating-linear-gradient(#ffffff, #ffffff 38px, #e4e4e4 38px, #e4e4e4 40px);
  min-height: 50vh;
  margin-top: -15px;
`;

const TextCounter = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 10px;
  color: #989898;
  float: right;
`;

const ChoiceBoxes = styled.div`
  &.active {
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    border: 1px solid #8c5cdd;
  }

  height: 67px;
  display: flex;
  place-items: center;
  border-radius: 12px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  border: 1px solid #989898;
  overflow: hidden;
  margin-top: 55px;
  div:not(:last-child) {
    border-right: 1px solid #989898;
  }
`;

const ChoiceBox = styled.div`
  &.active {
    color: #8c5cdd;
  }

  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #989898;
  width: 100%;
  height: 100%;
  padding: 0 15px;
  word-break: keep-all;
  text-align: center;
`;

const AddChoiceBoxContainer = styled.div`
  color: #989898;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 27px;
`;

const AddChoiceBoxText = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 14px;
  vertical-align: middle;
`;
