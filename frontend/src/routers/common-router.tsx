import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header } from "../components/header";
import { NotFound } from "../pages/404";
import { Goguma } from "../pages/goguma";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { Ask } from "../pages/ask";
import { OAuth2Redirect } from "../pages/oauth2-redirect";
import { GogumaBasket } from "../pages/goguma-basket";

export const CommonRouter: React.FC = () => {
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
        <Route exact path="/goguma/:id">
          <Goguma />
        </Route>
        <Route exact path="/ask">
          <Ask />
        </Route>
        <Route exact path="/goguma/basket/:id">
          <GogumaBasket />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
