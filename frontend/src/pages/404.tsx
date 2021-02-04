import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const NotFound: React.FC = () => (
  <div>
    <Helmet>
      <title>Not Found | Selection</title>
    </Helmet>
    <h2>Page Not Found.</h2>
    <h4>There is no page you are currently looking for 😭</h4>
    <Link to="/">Go to Home &rarr;</Link>
  </div>
);
