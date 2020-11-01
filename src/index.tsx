import ErrorPage from "components/ErrorPage";
import MessageBox from "components/MessageBox";
import Dashboard from "containers/Dashboard";
import User from "containers/User";
import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import * as rlax from "rlax";
import store from "store";
import history from "utils/history";
import Home from "./containers/Home";
import Login from "./containers/Login";
import "./style.css";

rlax.initStore({
  data: store,
  persist: "local",
});

function App() {
  return (
    <Fragment>
      <MessageBox />
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/401" exact>
            <ErrorPage type="401" />
          </Route>
          <Route path="/403" exact>
            <ErrorPage type="403" />
          </Route>
          <Route path="/404" exact>
            <ErrorPage type="404" />
          </Route>
          <Route path="/login" exact component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/user/:username" exact component={User} />
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      </Router>
    </Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
