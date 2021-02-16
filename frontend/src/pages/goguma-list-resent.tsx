import React, { useCallback, useEffect, useState } from "react";
import { ContentHeader } from "../components/content-header";
import { GogumaCard } from "../components/goguma-card";
import { FAKE_GOGUMA_DATA } from "../constants";
import draft_guma from "../styles/img/icon_draft_guma.svg";
import fireguma from "../styles/img/icon_fireguma_max.svg";
import fireguma_purple from "../styles/img/icon_fireguma_purple.svg";

interface IData {
  id: number;
  user: string;
  title: string;
  content: string;
  createdAt: string;
  responseLength: number;
}

export const GogumaListResent = () => {
  const [page, setPage] = useState(1);
  const [dataSlice, setDateSlice] = useState<IData[]>(
    FAKE_GOGUMA_DATA.goguma
      .sort((gogumaA, gogumaB) => {
        return gogumaA.createdAt < gogumaB.createdAt ? -1 : gogumaA > gogumaB ? 1 : 0;
      })
      .slice(0, 15),
  );

  const handleScroll = useCallback(() => {
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
    );
    const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight && FAKE_GOGUMA_DATA.goguma.length > page * 15) {
      setPage(page => page + 1);
    }
  }, [page, dataSlice]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [handleScroll]);

  useEffect(() => {
    const data = FAKE_GOGUMA_DATA.goguma
      .sort((gogumaA, gogumaB) => {
        return gogumaA.createdAt > gogumaB.createdAt ? -1 : gogumaA < gogumaB ? 1 : 0;
      })
      .slice(0, page * 15);
    setDateSlice(data);
  }, [page]);

  return (
    <>
      <ContentHeader isPrev={true} isNext={false} title={"갓 구운 고구마"} />
      {dataSlice.map(goguma => (
        <div key={goguma.id}>
          <GogumaCard
            title={goguma.title}
            content={goguma.content}
            user={goguma.user}
            createdAt={goguma.createdAt}
            responseLength={goguma.responseLength}
          >
            {goguma.responseLength > 500 ? (
              <img src={fireguma_purple} width={50} height={50} />
            ) : goguma.responseLength > 100 ? (
              <img src={fireguma} width={50} height={50} />
            ) : (
              <img src={draft_guma} width={50} height={50} />
            )}
          </GogumaCard>
        </div>
      ))}
    </>
  );
};
