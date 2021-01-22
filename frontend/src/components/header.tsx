import React from "react";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <>
      <Link to="/">
        <div>Selection</div>
      </Link>
      <div>menubar</div>
      <Link to="/sign-up">
        <div>회원가입</div>
      </Link>
      <Link to="/login">
        <div>로그인</div>
      </Link>
    </>
  );
};
