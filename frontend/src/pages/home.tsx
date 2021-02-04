import React from "react";
import { Helmet } from "react-helmet-async";

export const Home: React.FC = () => {
  return (
    <>
      <div>
        <Helmet>
          <title>GO!GUMA</title>
        </Helmet>
        <h2>Home</h2>
      </div>
    </>
  );
};
