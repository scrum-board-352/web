import MessageBox from "components/MessageBox";
import Dashboard from "containers/Dashboard";
import User from "containers/User";
import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import rlax from "rlax";
import store from "store";
import Home from "./containers/Home";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import "./style.css";

rlax.initStore({
  data: store,
  persist: "local",
});

function App() {
  return (
    <Fragment>
      <MessageBox />
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/404" exact component={NotFound} />
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
