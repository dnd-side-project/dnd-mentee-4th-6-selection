import React from "react";
import queryString from "query-string";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { addToken } from "../stores/userStore";
import { Dispatch } from "redux";

interface IParams {
  token: string;
}

interface IProps {
  userToken: IParams;
  addTokenLocal: (token: IParams) => void;
}

const OAuth2Redirect = ({ addTokenLocal }: IProps) => {
  const { token } = queryString.parse(location.search);
  const history = useHistory();

  if (token) {
    const tokenObj = {
      token: `${token}`,
    };
    localStorage.setItem("token", `${token}`);
    addTokenLocal(tokenObj);
  } else {
    //console.log(error);
    localStorage.removeItem("token");
    alert("로그인 실패!");
    history.push(`/`);
  }
  return (
    <>
      {token && <Redirect to={`/`} />}
      {!token && <Redirect to={`/login`} />}
    </>
  );
};

const mapStateToProps = (state: IParams) => {
  return { userToken: state };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { addTokenLocal: (token: IParams) => dispatch(addToken(token)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(OAuth2Redirect);
