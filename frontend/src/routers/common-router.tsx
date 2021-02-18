import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addToken } from "../stores/userStore";
import { NotFound } from "../pages/404";
import { Goguma } from "../pages/goguma";
import { Home } from "../pages/home";
import { GogumaBasket } from "../pages/goguma-basket";
import { Search } from "../pages/search";
import { GogumaListResent } from "../pages/goguma-list-resent";
import { Ask } from "../pages/ask";
import { Notification } from "../pages/notifications";
import { Login } from "../pages/login";
import OAuth2Redirect from "../pages/oauth2-redirect";

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
    path: "/search",
    component: <Search />,
  },
];

const loggedInRoutes = [
  {
    path: "/ask",
    component: <Ask />,
  },
  {
    path: "/notification",
    component: <Notification />,
  },
];

const loggedOutRoutes = [
  {
    path: "/login",
    component: <Login authenticated={false} />,
  },
  {
    path: "/oauth2/redirect",
    component: <OAuth2Redirect />,
  },
];

interface IParams {
  token: string;
}

interface IProps {
  userToken: IParams;
  addTokenLocal: (token: IParams) => void;
}

const CommonRouter = ({ userToken, addTokenLocal }: IProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUser, setIsUser] = useState(false);
  const process = async () => {
    if (userToken.token) {
      setIsUser(true);
    }
    if (!userToken.token) {
      const localToken = localStorage.getItem("token");
      await setIsUser(false);
      if (localToken) {
        addTokenLocal({ token: `${localToken}` });
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    process();
  }, [isUser, userToken]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : isUser ? (
        <BrowserRouter>
          <Switch>
            {loggedInRoutes.map(route => (
              <Route exact key={route.path} path={route.path}>
                {route.component}
              </Route>
            ))}
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
      ) : (
        <BrowserRouter>
          <Switch>
            {loggedOutRoutes.map(route => (
              <Route exact key={route.path} path={route.path}>
                {route.component}
              </Route>
            ))}
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
      )}
    </>
  );
};

const mapStateToProps = (state: IParams) => {
  return { userToken: state };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { addTokenLocal: (token: IParams) => dispatch(addToken(token)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommonRouter);
