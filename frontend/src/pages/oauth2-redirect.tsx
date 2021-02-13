import React from "react";
import { Redirect, useParams } from "react-router-dom";

interface IParams {
  token: string;
  error: string;
}

export const OAuth2Redirect: React.FC = () => {
  const { token, error } = useParams<IParams>();
  if (token) {
    localStorage.setItem("accessToken", token);
  } else {
    console.log(error);
  }
  return (
    <>
      {token && <Redirect to={`/`} />}
      {!token && <Redirect to={`/login`} />}
    </>
  );
};
