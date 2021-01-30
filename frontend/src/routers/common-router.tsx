import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header } from "../components/header";
import { NotFound } from "../pages/404";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { OAuth2Redirect } from "../pages/oauth2-redirect";

export const CommonRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login authenticated={false} />
        </Route>
        <Route exact path="/oauth2/redirect">
          <OAuth2Redirect />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
