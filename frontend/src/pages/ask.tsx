import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ContentHeader } from "../components/content-header";
import styled from "styled-components";
import icon_delete from "../styles/img/icon_delete.svg";

interface IStyleProps {
  showDescription?: boolean;
}

export const Ask: React.FC = () => {
  const [showDescription, onShowDescription] = useState(true);
  const onClickRemove = () => {
    onShowDescription(false);
  };

  return (
    <>
      <div>
        <Helmet>
          <title>고구마 등록하기 - go!guma</title>
        </Helmet>
        <ContentHeader isPrev={false} isNext={true} title={"등록하기"} />
        {showDescription ? (
          <StickyDescription>
            <span>바로 작성하지 않아도 좋아요. 언제든지 돌아올 수 있어요 :)</span>
            <img
              onClick={onClickRemove}
              src={icon_delete}
              style={{ width: "15px", verticalAlign: "middle", float: "right" }}
            />
          </StickyDescription>
        ) : null}
      </div>
    </>
  );
};

const StickyDescription = styled.div`
  position: fixed;
  left: 15px;
  right: 15px;
  bottom: 10px;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 12px;
  color: #989898;
`;
