import React from "react";

interface IProps {
  createdAt: Date;
}

export const DisplayTime = ({ createdAt }: IProps) => {
  const dateNow = new Date(Date.now());
  const secondDiff = Math.ceil((dateNow.getTime() - createdAt.getTime()) / 1000);
  const minuteDiff = Math.ceil((dateNow.getTime() - createdAt.getTime()) / (1000 * 60));
  const hourDiff = Math.ceil((dateNow.getTime() - createdAt.getTime()) / (1000 * 60 * 60));
  const dayDiff = Math.ceil((dateNow.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
  return (
    <>
      {secondDiff < 60
        ? `방금전`
        : minuteDiff < 60
        ? `${minuteDiff}분전`
        : hourDiff < 24
        ? `${hourDiff}시간전`
        : dayDiff < 30
        ? `${dayDiff}일전`
        : `${createdAt.getFullYear().toString().slice(2, 4)}. ${
            createdAt.getMonth() + 1 < 10
              ? `0${createdAt.getMonth() + 1}`
              : createdAt.getMonth() + 1
          }. ${createdAt.getDate() + 1 < 10 ? `0${createdAt.getDate()}` : createdAt.getDate()}`}
    </>
  );
};
