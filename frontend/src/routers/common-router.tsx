import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addToken } from "../stores/userStore";
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
import axios from "axios";
import { BACKEND_URL } from "../constants";

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
];

const loggedInRoutes = [
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
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const localToken = localStorage.getItem("token");

  const getUser = async () => {
    setLoading(true);
    setUserName("");
    if (userToken.token) {
      try {
        const { data: nickname } = await axios.get(`${BACKEND_URL}/users/me/`, {
          headers: {
            Authorization: `Bearer ${userToken.token}`,
          },
        });
        setUserName(nickname);
      } catch {
        localStorage.removeItem("token");
        addTokenLocal({ token: "" });
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!userToken.token) {
      if (localToken) {
        addTokenLocal({ token: `${localToken}` });
      }
    }
  }, [userToken]);

  useEffect(() => {
    getUser();
    setLoading(false);
  }, [userToken.token]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : userName ? (
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
