import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ContentHeader } from "../components/content-header";
import styled from "styled-components";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addToken } from "../stores/userStore";

interface IParams {
  token: string;
}

interface IProps {
  userToken: IParams;
  addTokenLocal: (token: IParams) => void;
}

const Ask = ({ userToken, addTokenLocal }: IProps) => {
  const initialGogumaData = {
    title: "",
    content: "",
    choices: [
      { id: 0, content: "" },
      { id: 1, content: "" },
    ],
  };

  const ChoiceBoxInputRef = React.createRef<HTMLInputElement>();
  const ChoiceBoxesRef = React.createRef<HTMLDivElement>();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentChoiceInputText, setCurrentChoiceInputText] = useState("");
  const [currentChoiceIndex, setCurrentChoiceIndex] = useState(-1);
  const [gogumaData, setGogumaData] = useState(initialGogumaData);
  const localToken = localStorage.getItem("token");

  const onCurrentPageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };
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
    const gogumaChoiceCopy = [...gogumaData.choices];
    //TODO: 다른방법?
    gogumaChoiceCopy[currentChoiceIndex] = {
      id: currentChoiceIndex,
      content: e.target.value === "" ? `선택지${currentChoiceIndex === 0 ? 1 : 2}` : e.target.value,
    };
    gogumaChoiceCopy[1 - currentChoiceIndex] = {
      id: 1 - currentChoiceIndex,
      content:
        gogumaData.choices[1 - currentChoiceIndex].content ??
        `선택지${currentChoiceIndex === 0 ? 1 : 2}`,
    };

    setGogumaData({
      ...gogumaData,
      choices: [...gogumaChoiceCopy],
    });
  };

  const onChoiceBoxFocused = () => {
    if (currentChoiceIndex < 0) {
      setCurrentChoiceIndex(0);
      ChoiceBoxesRef.current?.children[0].classList.add("active");
    }
  };

  const onChoiceBoxClicked = (id: number) => {
    ChoiceBoxInputRef.current?.focus();
    gogumaData.choices[id].content.includes("선택지") || gogumaData.choices[id].content === "" //TODO: 생각이 안남
      ? setCurrentChoiceInputText("")
      : setCurrentChoiceInputText(ChoiceBoxesRef.current?.children[id].innerHTML ?? "");
    setCurrentChoiceIndex(id);

    ChoiceBoxesRef.current?.children[id].classList.add("active");
    ChoiceBoxesRef.current?.children[1 - id].classList.remove("active"); //TODO: array map 어떻게?
  };

  const onRegisterClicked = () => {
    //TODO: 비워지면 빨간색으로
    if (!userToken.token) {
      if (localToken) {
        addTokenLocal({ token: `${localToken}` });
      }
    }
    onSubmit();
  };

  const onSubmit = async () => {
    try {
      await axios.post(`${BACKEND_URL}/articles`, gogumaData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken.token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
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
            className={`${
              gogumaData.choices.filter(({ content }) => content.length > 0).length > 0
                ? "active"
                : ""
            } ${currentPage == 3 ? "current" : ""}`}
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
            ref={ChoiceBoxInputRef}
            onChange={onChoiceBoxInputChange}
            onFocus={onChoiceBoxFocused}
            placeholder="여러분들 저,, 어떻게 하는게 맞을까요?"
            className="choice"
            value={currentChoiceInputText}
          />
          <TextCounter>({currentChoiceInputText.length}/30자)</TextCounter>
          <div style={{ marginTop: "97px" }}></div>
          <Question>각 선택지의 내용을 입력해주세요.</Question>
          <ChoiceBoxes ref={ChoiceBoxesRef}>
            {gogumaData.choices.map(({ id, content }) => (
              <ChoiceBox key={id} onClick={() => onChoiceBoxClicked(id)}>
                {content === "" ? `선택지${id + 1}` : content}
              </ChoiceBox>
            ))}
          </ChoiceBoxes>
          <button onClick={onRegisterClicked}>등록</button>
        </PageContainer>
      </AskContainer>
    </>
  );
};

const mapStateToProps = (state: IParams) => {
  return { userToken: state };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { addTokenLocal: (token: IParams) => dispatch(addToken(token)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ask);

const QuestionDescription = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 12px;
  font-weight: 400;
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
  font-weight: 500;
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
  font-weight: 400;
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
  font-weight: 400;
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
  font-weight: 400;
  margin-top: 3px;
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
