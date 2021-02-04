import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBroom, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

const FAKE_GOGUMA_DATA = [
  {
    id: 1,
    title: "전남친이랑 친하게 지내는 친구ㅜ.ㅜ",
    content: `친구사이에서 연인으로 발전하여
오랫동안 만나게 된 케이스,
그러다가 최근에 이별을 겪게 됐다.
근데 나랑 동성인 친구가 내 전 남(여)친 이랑도 친군데,
헤어진거 알면서도 계속 친하게 지낸다.
심지어 티도 내면서! 이런 상황일때,
친구를 어떻게 해야할지 모르겠다.`,
    tags: ["댓글", "태그1", "태그2"],
    choices: ["친구랑 손절한다.", "모른척 하면서 지낸다."],
    goguma_response: [
      {
        responseId: 12,
        username: "ktx 123",
        goguma: "고구마반개",
        content: `
                    힘을 내용 슈퍼 고구마~
                    원래 해뜨기 직전이 제일 어둡다잖아요.
                    지금 님 연애전선도 그런거라고 생각 ㄱㄱ
                `,
      },
      {
        responseId: 13,
        username: "유저 123",
        goguma: "고구마반의반개",
        content: `
                    내용 내용 내용 내용 내용
                    내용 내용 내용
                    내용 내용 내용 내용
                `,
      },
    ],
  },
];

const GogumaContainer = styled.div`
  height: 86vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  max-height: 100%;
`;

const TagBoxes = styled.div`
  display: flex;
  margin-top: 15px;
  margin-bottom: 35px;
`;

const TagBox = styled.div`
  padding: 2px 3px;
  margin-right: 3px;
  border: 1px solid #aaaaaa;
  background-color: #dadada;
  border-radius: 3px;
  font-size: 3px;
`;

const TitleBox = styled.div`
  font-size: 20px;
  font-weight: 900;
`;

const ContentBox = styled.pre`
  font-size: 15px;
  line-height: 28px;
  margin-bottom: 30px;
`;

const ChoiceBoxes = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: center;
  margin-bottom: 40px;
`;

const ChoiceBox = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  height: 90px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  padding-top: 30px;
  font-size: 23px;
  color: #606060;
`;

const GogumaBasket = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  font-size: 80px;
`;

const GogumaEmojies = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  place-items: center;
  font-size: 30px;
`;

const NotFoundContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NotFoundTitle = styled.span`
  font-size: 20px;
  margin-bottom: 20px;
`;
const NotFoundContent = styled.span`
  color: #505050;
  margin-bottom: 30px;
`;

const NotFoundLink = styled.div`
  width: 140px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #404040;
  transition: background-color 0.1s ease-in-out;
  &:hover {
    background-color: #cccccc;
  }
  &:active {
    background-color: #a0a0a0;
  }
`;

interface IParams {
  id: string;
}

export const Goguma: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<IParams>();
  if (!id) {
    history.push(`/`);
  }
  const data = FAKE_GOGUMA_DATA.find(goguma => goguma.id === +id);
  return (
    <>
      <Helmet>
        <title>{`${data?.title.slice(0, 5)}...` || "not found"} - GO!GUMA</title>
      </Helmet>
      {data && (
        <GogumaContainer>
          <div>
            <TagBoxes>
              {data?.tags.map(tag => (
                <TagBox key={tag}>#{tag}</TagBox>
              ))}
            </TagBoxes>
            <TitleBox>{data.title}</TitleBox>
            <ContentBox>{data.content}</ContentBox>
            <ChoiceBoxes>
              {data.choices.map(choice => (
                <ChoiceBox key={choice}>{choice}</ChoiceBox>
              ))}
            </ChoiceBoxes>
          </div>
          <div>
            <GogumaBasket>
              <Link to={`/goguma-basket/${data.id}`}>
                <FontAwesomeIcon icon={faShoppingBasket} style={{ color: "#909090" }} />
              </Link>
            </GogumaBasket>
            <GogumaEmojies>
              <FontAwesomeIcon icon={faBroom} style={{ color: "#909090" }} />
              <FontAwesomeIcon icon={faBroom} style={{ color: "#909090" }} />
              <FontAwesomeIcon icon={faBroom} style={{ color: "#909090" }} />
              <FontAwesomeIcon icon={faBroom} style={{ color: "#909090" }} />
              <FontAwesomeIcon icon={faBroom} style={{ color: "#909090" }} />
            </GogumaEmojies>
          </div>
        </GogumaContainer>
      )}
      {!data && (
        <NotFoundContainer>
          <NotFoundTitle>찾을수 없는 게시글 입니다.</NotFoundTitle>
          <NotFoundContent>삭제되거나 없는 게시글 입니다. 다시 한번 확인해주세요</NotFoundContent>
          <NotFoundLink>
            <Link to={`/`} style={{ textDecoration: "none", color: "#505050" }}>
              홈으로 돌아가기
            </Link>
          </NotFoundLink>
        </NotFoundContainer>
      )}
    </>
  );
};
