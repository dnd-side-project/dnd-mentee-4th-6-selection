import React from "react";
import { Helmet } from "react-helmet-async";

export const Login = () => {
  return (
    <div>
      <Helmet>
        <title>로그인 - Selection</title>
      </Helmet>
      <div>
        <h2>로그인</h2>
        <form>
          <input type="email" name="email" placeholder="이메일" required />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            required
          />
          <button>로그인</button>
        </form>
      </div>
    </div>
  );
};
