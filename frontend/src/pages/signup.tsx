import React from "react";
import { Helmet } from "react-helmet-async";

export const SignUp = () => {
  return (
    <div>
      <Helmet>
        <title>회원가입 - Selection</title>
      </Helmet>
      <div>
        <h2>회원가입</h2>
        <form>
          <input type="text" name="nickname" placeholder="닉네임" required />
          <input type="email" name="email" placeholder="이메일" required />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            required
          />
          <input
            type="password"
            name="password-check"
            placeholder="비밀번호 확인"
            required
          />
          <button>회원가입</button>
        </form>
      </div>
    </div>
  );
};
