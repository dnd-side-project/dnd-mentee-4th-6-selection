import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import empty_basket from "../styles/img/icon_guma_box_empty.svg";
import middle_basket from "../styles/img/icon_guma_box_middle.svg";
import full_basket from "../styles/img/icon_guma_box.svg";
import good from "../styles/img/icon_emotion_good.svg";
import angry from "../styles/img/icon_emotion_angry.svg";
import sad from "../styles/img/icon_emotion_sad.svg";
import goguma from "../styles/img/icon_emotion_goguma.svg";
import surprised from "../styles/img/icon_emotion_surprised.svg";
import relax from "../styles/img/icon_emotion_relax.svg";
import veryhappy from "../styles/img/icon_emotion_veryhappy.svg";
import dot from "../styles/img/icon_emotion_empty_dot.svg";
import { ContentHeader } from "../components/content-header";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addToken } from "../stores/userStore";
import axios from "axios";
import { BACKEND_URL } from "../constants";

const GOGUMA_TYPE = [
  {
    type: "GOOD",
    img: good,
  },
  {
    type: "ANGRY",
    img: angry,
  },
  {
    type: "SAD",
    img: sad,
  },
  {
    type: "GOGUMA",
    img: goguma,
  },
  {
    type: "SURPRISED",
    img: surprised,
  },
  {
    type: "RELAX",
    img: relax,
  },
  {
    type: "VERYHAPPY",
    img: veryhappy,
  },
];

interface ILocationParams {
  id: string;
}

interface IParams {
  token: string;
}

interface IProps {
  userToken: IParams;
  addTokenLocal: (token: IParams) => void;
}

interface IData {
  id: number;
  gogumaType: string;
  isRead: boolean;
  isExistMessage: boolean;
  isOwner: boolean;
}

const GogumaBasket = ({ userToken, addTokenLocal }: IProps) => {
  const [gogumasData, setGogumasData] = useState<IData[]>();
  const history = useHistory();
  const { id } = useParams<ILocationParams>();
  const localToken = localStorage.getItem("token");

  if (!id) {
    history.push(`/`);
  }

  const getData = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/articles/${id}/gogumas?size=9999`, {
        headers: {
          Authorization: `Bearer ${userToken.token}`,
        },
      });
      setGogumasData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!userToken.token) {
      if (localToken) {
        addTokenLocal({ token: `${localToken}` });
      }
    }
  }, [userToken, localToken]);

  useEffect(() => {
    getData();
  }, [id, userToken]);

  const emptyList = ((5 - (gogumasData?.length || 0)) % 5) + 5;

  return (
    <>
      <Helmet>
        <title>고구마 바구니 - GO!GUMA</title>
      </Helmet>
      <ContentHeader isPrev={false} isNext={false} title={"고구마 바구니"} />
      <ImageContainer>
        {gogumasData && gogumasData.length === 0 ? (
          <img src={empty_basket} width={61} height={61} />
        ) : gogumasData && gogumasData.length <= 10 ? (
          <img src={middle_basket} width={61} height={61} />
        ) : (
          <img src={full_basket} width={61} height={61} />
        )}
      </ImageContainer>
      <BasketInfo>
        {gogumasData && gogumasData.length > 10 ? (
          <span>
            긴 말보다, 함께라서 든든한 고구마!
            <br />
            여러 고구마들이 함께하고 있어요 :)
          </span>
        ) : (
          <span>
            사람들이 주고간 고구마를 확인할 수 있어요!
            <br />
            쪽지가 숨겨진 고구마를 찾아보세요
          </span>
        )}
      </BasketInfo>
      <GogumaEmojies>
        {gogumasData?.map(comment => (
          <GogumaEmoji key={comment.id}>
            <GogumasLink
              href={comment.isExistMessage ? `/goguma/${id}/gogumas/${comment.id}` : "#"}
            >
              <GogumasBox>
                <img
                  src={GOGUMA_TYPE.find(gogumas => gogumas.type === comment.gogumaType)?.img}
                  width={55}
                  height={55}
                />
                {comment.isOwner ? <OwnerText>Me</OwnerText> : <OwnerText />}
                {comment.isExistMessage && comment.isRead && <ReadDot />}
                {comment.isExistMessage && !comment.isRead && <NotReadDot />}
              </GogumasBox>
            </GogumasLink>
          </GogumaEmoji>
        ))}
        {emptyList > 0 &&
          [...Array(emptyList)].map((_, index) => {
            return (
              <GogumaEmoji key={index + 9999}>
                <img src={dot} />
              </GogumaEmoji>
            );
          })}
      </GogumaEmojies>
    </>
  );
};

const mapStateToProps = (state: IParams) => {
  return { userToken: state };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { addTokenLocal: (token: IParams) => dispatch(addToken(token)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(GogumaBasket);

const ImageContainer = styled.div`
  width: 100%;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const BasketInfo = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 12px;
  width: 220px;
  line-height: 19px;
  word-break: keep-all;
  text-align: center;
  left: 0;
  right: 0;
  margin: 0 auto;
  margin-bottom: 55px;
`;

const GogumaEmojies = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  place-items: center;
`;

const GogumaEmoji = styled.div`
  width: 55px;
  height: 55px;
  position: relative;
  margin-bottom: 30px;
  transition: transform 220ms ease-in-out;
  &:active {
    transform: scale(0.9);
  }
`;

const NotReadDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #26ffd5;
  position: absolute;
  top: 0;
  left: 0;
`;

const ReadDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #e4e4e4;
  position: absolute;
  top: 0;
  left: 0;
`;

const GogumasBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OwnerText = styled.div`
  margin-top: -7px;
  width: 100%;
  height: 5px;
  font-family: "Gaegu", cursive;
  font-size: 15px;
  text-align: center;
`;

const GogumasLink = styled.a`
  text-decoration: none;
  color: black;
`;
