import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import axios from "axios";
import { MyPageHeader } from "../components/mypage-header";
import veryhappy from "../styles/img/icon_emotion_veryhappy.svg";
import icon_pencil_sm from "../styles/img/icon_pencil_sm.png";
import { addToken } from "../stores/userStore";
import { BACKEND_URL } from "../constants";
import { useForm } from "react-hook-form";

interface IParams {
  token: string;
}

interface IProps {
  userToken: IParams;
  addTokenLocal: (token: IParams) => void;
}

interface INameForm {
  nickname: string;
}

const MyPage = ({ userToken, addTokenLocal }: IProps) => {
  const [userName, setUserName] = useState("");
  const history = useHistory();
  const localToken = localStorage.getItem("token");
  const { register, getValues } = useForm<INameForm>({
    mode: "onChange",
  });

  const onClick = async () => {
    const data = {
      nickname: userName,
    };
    await axios.post(`${BACKEND_URL}/users/me/`, data, {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    });
  };

  const onChange = () => {
    const { nickname } = getValues();
    setUserName(nickname);
  };

  const getUser = async () => {
    if (userToken.token) {
      try {
        const {
          data: { nickname },
        } = await axios.get(`${BACKEND_URL}/users/me/`, {
          headers: {
            Authorization: `Bearer ${userToken.token}`,
          },
        });
        setUserName(nickname);
      } catch {
        localStorage.removeItem("token");
        addTokenLocal({ token: "" });
        history.push(`/`);
      }
    }
  };

  const onClickLogout = () => {
    const logoutConfirm = confirm("정말 로그아웃 하시겠어요?");
    if (logoutConfirm) {
      localStorage.removeItem("token");
      addTokenLocal({ token: "" });
      history.push(`/`);
    }
  };

  useEffect(() => {
    if (!userToken.token) {
      if (localToken) {
        addTokenLocal({ token: `${localToken}` });
      }
      if (!localToken) {
        history.push("/");
      }
    }
  }, [userToken]);

  useEffect(() => {
    getUser();
  }, [userToken.token]);

  return (
    <>
      <Helmet>
        <title>마이페이지 - 고구마</title>
      </Helmet>
      <MyPageHeader />
      <MyPageMain>
        <MyPageImg src={veryhappy} width={72} height={72} />
        <div>
          <MyPageInput
            type="text"
            value={userName}
            ref={register({ required: true, maxLength: 8 })}
            maxLength={8}
            required
            name="nickname"
            onChange={onChange}
          />
          <MyPageInputImg src={icon_pencil_sm} onClick={onClick} />
        </div>
      </MyPageMain>
      <div>
        <MyPageLink href={`/goguma-list/me`}>
          <MyPageContent>내가 쓴 글</MyPageContent>
        </MyPageLink>
        <MyPageLink href={`/goguma-info`}>
          <MyPageContent>고구마는..</MyPageContent>
        </MyPageLink>
        <MyPageContent>
          버전정보<MyPageVersion>0.9 v</MyPageVersion>
        </MyPageContent>
        <MyPageContent onClick={onClickLogout} style={{ cursor: "pointer" }}>
          로그아웃
        </MyPageContent>
      </div>
    </>
  );
};

const mapStateToProps = (state: IParams) => {
  return { userToken: state };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { addTokenLocal: (token: IParams) => dispatch(addToken(token)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);

const MyPageMain = styled.div`
  margin: 0 17px;
  padding: 35px 0;
  border-bottom: 0.75px solid #cecece;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyPageImg = styled.img`
  padding: 16px;
`;

const MyPageInput = styled.input`
  height: 35px;
  width: 180px;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 19px;
  border: none;
  padding: 0 12px;
  box-sizing: border-box;
  border-bottom: 2px solid rgba(0, 0, 0, 0);
  transition: all 0.2s ease-in-out;
  &:focus {
    outline: none;
    border-bottom: 2px solid #8c5cdd;
    & ~ img {
      filter: none;
    }
  }
  & ~ img {
    filter: grayscale(100%);
  }
`;

const MyPageInputImg = styled.img`
  margin-left: -23px;
  margin-bottom: -5px;
`;

const MyPageContent = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 16px;
  padding: 29px 5px;
  margin: 0 17px;
  border-bottom: 0.75px solid #cecece;
  display: flex;
  justify-content: space-between;
`;

const MyPageVersion = styled.span`
  display: flex;
  justify-content: flex-end;
  color: #989898;
`;

const MyPageLink = styled.a`
  text-decoration: none;
  color: black;
`;
