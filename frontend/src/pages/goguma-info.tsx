import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import good from "../styles/img/icon_emotion_good.svg";
import angry from "../styles/img/icon_emotion_angry.svg";
import goguma from "../styles/img/icon_emotion_goguma.svg";
import surprised from "../styles/img/icon_emotion_surprised.svg";
import relax from "../styles/img/icon_emotion_relax.svg";
import veryhappy from "../styles/img/icon_emotion_veryhappy.svg";
import { ContentHeader } from "../components/content-header";

export const GogumaInfo = () => {
  return (
    <>
      <Helmet>
        <title>고구마는.. - 고구마</title>
      </Helmet>
      <ContentHeader isPrev={true} isNext={false} title={"고구마는.."} />
      <InfoMainContainer>
        <InfoTitle>
          고민 그만,
          <br />
          고구마 하세요!
        </InfoTitle>
        <InfoSubTitle>
          우리의 답답한 연애는 꼭 고구마를 닮았습니다.
          <br />
          속으로 끙끙 앓고있는 당신의 연애고민을 ‘고구마’에
          <br /> 들려주세요. 마음이 한결 나아질거에요.
        </InfoSubTitle>
        <div>
          <BorderLine />
          <BorderText>고구마를 만든 사람들</BorderText>
        </div>
        <InfoPeople>
          <InfoPerson>
            <InfoPersonImg src={good} />
            <InfoPersonPosition>Designer</InfoPersonPosition>
            <div>김지원</div>
          </InfoPerson>
          <InfoPerson>
            <InfoPersonImg src={angry} />
            <InfoPersonPosition>Front - end</InfoPersonPosition>
            <div>임지영</div>
          </InfoPerson>
          <InfoPerson>
            <InfoPersonImg src={goguma} />
            <InfoPersonPosition>Back - end</InfoPersonPosition>
            <div>원종운</div>
          </InfoPerson>
          <InfoPerson>
            <InfoPersonImg src={surprised} />
            <InfoPersonPosition>Designer</InfoPersonPosition>
            <div>조진영</div>
          </InfoPerson>
          <InfoPerson>
            <InfoPersonImg src={relax} />
            <InfoPersonPosition>Front - end</InfoPersonPosition>
            <div>류정상</div>
          </InfoPerson>
          <InfoPerson>
            <InfoPersonImg src={veryhappy} />
            <InfoPersonPosition>Back - end</InfoPersonPosition>
            <div>김예림</div>
          </InfoPerson>
        </InfoPeople>
      </InfoMainContainer>
    </>
  );
};

const InfoMainContainer = styled.div`
  margin: 0 17px;
`;

const InfoTitle = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 25px;
  color: #8c5cdd;
  line-height: 40px;
  margin-top: 35px;
  margin-bottom: 20px;
`;

const InfoSubTitle = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 14px;
  font-weight: 300;
  line-height: 25px;
  margin-bottom: 80px;
`;

const BorderLine = styled.div`
  width: 100%;
  border-bottom: 0.75px solid #cecece;
`;

const BorderText = styled.div`
  width: 160px;
  text-align: center;
  background-color: white;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 14px;
  font-weight: 300;
  margin: 0 auto;
  margin-top: -7px;
  margin-bottom: 27px;
`;

const InfoPeople = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  border-bottom: 0.75px solid #cecece;
  padding-bottom: 5px;
`;

const InfoPerson = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
`;

const InfoPersonImg = styled.img`
  margin-bottom: 9px;
`;

const InfoPersonPosition = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 12px;
  color: #989898;
  margin-bottom: 3px;
`;
