import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NotFound } from "../pages/404";
import Goguma from "../pages/goguma";
import { Home } from "../pages/home";
import GogumaBasket from "../pages/goguma-basket";
import { Search } from "../pages/search";
import { GogumaListResent } from "../pages/goguma-list-resent";
import Ask from "../pages/ask";
import { AskSuccess } from "../pages/ask-success";
import { Login } from "../pages/login";
import MyPage from "../pages/my-page";
import OAuth2Redirect from "../pages/oauth2-redirect";
import { GogumaInfo } from "../pages/goguma-info";
import { GogumaListPopular } from "../pages/goguma-list-popular";
import { GogumaListHonor } from "../pages/goguma-list-honor";
import GogumaListMe from "../pages/goguma-list-me";
import Notifications from "../pages/notifications";
import Gogumas from "../pages/goguma-gogumas";

const commenRoutes = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/goguma/:id",
    component: <Goguma />,
  },
  {
    path: "/goguma/basket/:id",
    component: <GogumaBasket />,
  },
  {
    path: "/goguma-list/resent",
    component: <GogumaListResent />,
  },
  {
    path: "/goguma-list/popular",
    component: <GogumaListPopular />,
  },
  {
    path: "/goguma-list/honor",
    component: <GogumaListHonor />,
  },
  {
    path: "/search",
    component: <Search />,
  },
  {
    path: "/goguma-info",
    component: <GogumaInfo />,
  },
  {
    path: "/goguma/:gogumaId/gogumas/:gogumasId",
    component: <Gogumas />,
  },
  {
    path: "/ask",
    component: <Ask />,
  },
  {
    path: "/ask/success",
    component: <AskSuccess />,
  },
  {
    path: "/my-page",
    component: <MyPage />,
  },
  {
    path: "/goguma-list/me",
    component: <GogumaListMe />,
  },
  {
    path: "/notifications",
    component: <Notifications />,
  },
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/oauth2/redirect",
    component: <OAuth2Redirect />,
  },
];

export const CommonRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          {commenRoutes.map(route => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};
