import React, { useState, MouseEvent } from "react";
import { Helmet } from "react-helmet-async";
import { ContentHeader } from "../components/content-header";
import styled from "styled-components";

export const Ask: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const onCurrentPageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };
  const [currentChoiceInputText, setCurrentChoiceInputText] = useState("");
  const initialGogumaData = {
    title: "",
    content: "",
    choices: [] as string[],
  };
  const [gogumaData, setGogumaData] = useState(initialGogumaData);
  const onTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 30) {
      e.target.value = e.target.value.substring(0, 30);
    }
    setGogumaData({
      ...gogumaData,
      title: e.target.value,
    });
  };
  const onContentInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 1000) {
      e.target.value = e.target.value.substring(0, 1000);
    }
    setGogumaData({
      ...gogumaData,
      content: e.target.value,
    });
  };
  const onChoiceBoxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value.length > 0
      ? e.target.classList.add("active")
      : e.target.classList.remove("active");

    if (e.target.value.length > 30) {
      e.target.value = e.target.value.substring(0, 30);
    }

    setCurrentChoiceInputText(e.target.value);

    setGogumaData({
      ...gogumaData,
      choices: [e.target.value, e.target.value],
    });
  };

  const onChoiceBoxClicked = (e: MouseEvent) => {
    console.log(e);
    // e.target.parentElement
    //   .querySelectorAll(".active")
    //   .forEach((child: { classList: { remove: (arg0: string) => any } }) =>
    //     child.classList.remove("active"),
    //   );
    // e.target.classList.add("active");
  };

  return (
    <>
      <Helmet>
        <title>고구마 등록하기 - 고구마</title>
      </Helmet>
      <ContentHeader isPrev={false} isNext={true} title={"등록하기"} />
      <AskContainer>
        <StepContainer>
          <Step
            className={`${gogumaData.title.length > 0 ? "active" : ""} ${
              currentPage == 1 ? "current" : ""
            }`}
            onClick={() => onCurrentPageChange(1)}
          >
            <StepNumber>1</StepNumber>
            <StepTitle>제목</StepTitle>
          </Step>
          <Step
            className={`${gogumaData.content.length > 0 ? "active" : ""} ${
              currentPage == 2 ? "current" : ""
            }`}
            onClick={() => onCurrentPageChange(2)}
          >
            <StepNumber>2</StepNumber>
            <StepTitle>내용</StepTitle>
          </Step>
          <Step
            className={`${gogumaData.choices.length > 0 ? "active" : ""} ${
              currentPage == 3 ? "current" : ""
            }`}
            onClick={() => onCurrentPageChange(3)}
          >
            <StepNumber>3</StepNumber>
            <StepTitle>선택지</StepTitle>
          </Step>
        </StepContainer>
        <PageContainer className={currentPage == 1 ? "current" : ""}>
          <Question>고민의 제목은 어떻게 할까요?</Question>
          <QuestionDescription>
            바로 작성하지 않아도 좋아요. 언제든지 돌아올 수 있어요 :)
          </QuestionDescription>
          <ShortInput
            onChange={onTitleInputChange}
            placeholder="제목을 입력해주세요"
            className={`title ${gogumaData.title.length > 0 ? "active" : ""}`}
          />
          <TextCounter>({gogumaData.title.length}/30자)</TextCounter>
        </PageContainer>
        <PageContainer className={currentPage == 2 ? "current" : ""}>
          <Question>고구마에 당신의 고민을 들려주세요.</Question>
          <ContentTextArea
            onChange={onContentInputChange}
            className={`${gogumaData.content.length > 0 ? "active" : ""}`}
          />
        </PageContainer>
        <PageContainer className={currentPage == 3 ? "current" : ""}>
          <Question>선택지의 질문을 입력해주세요.</Question>
          <QuestionDescription>
            글 내용에 관한 질문을 다른사람에게 물어보세요 :)
          </QuestionDescription>
          <ShortInput
            onChange={onChoiceBoxInputChange}
            placeholder="여러분들 저,, 어떻게 하는게 맞을까요?"
            className="choice"
          />
          <TextCounter>({currentChoiceInputText.length}/30자)</TextCounter>
          <div style={{ marginTop: "97px" }}></div>
          <Question>각 선택지의 내용을 입력해주세요.</Question>
          <ChoiceBoxes>
            {gogumaData.choices.length === 0
              ? ["선택지1", "선택지2"].map((choice, index) => (
                  <ChoiceBox key={index} onClick={onChoiceBoxClicked}>
                    {choice}
                  </ChoiceBox>
                ))
              : gogumaData.choices.map((choice, index) => (
                  <ChoiceBox key={index} onClick={onChoiceBoxClicked}>
                    {choice}
                  </ChoiceBox>
                ))}
          </ChoiceBoxes>
        </PageContainer>
      </AskContainer>
    </>
  );
};

const QuestionDescription = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 12px;
  line-height: 15px;
  margin-top: 5px;
  color: #c1c1c1;
  font-weight: 400; //Regular
`;

const AskContainer = styled.div`
  padding: 0 17px;
`;

const StepContainer = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  color: #989898;
  text-align: center;
`;

const Step = styled.div`
  &.current {
    border-bottom: 2px solid #8c5cdd;
  }
  &.active {
    color: #8c5cdd;
  }
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  padding: 10px 0;
  color: #989898;
  border-bottom: 2px solid #d5d5d5;
  display: inline-block;
  width: 33.3%;
  margin-bottom: 38px;
`;

const StepNumber = styled.div`
  font-size: 12px;
`;

const StepTitle = styled.div`
  font-size: 12px;
`;

const PageContainer = styled.div`
  &.current {
    display: block;
  }
  padding: 0 3px;
  display: none;
`;

const Question = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 18px;
`;

const ShortInput = styled.input`
  &.title {
    font-family: "Gaegu", cursive;
  }
  &.active {
    border-bottom: 2px solid #8c5cdd;
  }
  &:placeholder {
    color: "#989898";
  }
  &.choice {
    font-size: 14px;
  }
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 16px;
  border-bottom: 2px solid #e4e4e4;
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  margin-top: 35px;
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
  min-height: 45vh;
  margin-top: 20px;
`;

const TextCounter = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 10px;
  color: #989898;
  float: right;
  display: block;
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
  margin-top: 28px;
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
  text-align: center;
`;
