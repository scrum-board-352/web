import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./style.css";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import MessageBox from "components/MessageBox";
import Dashboard from "containers/Dashboard";

function App() {
  return (
    <Fragment>
      <MessageBox />
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/" component={NotFound} />
        </Switch>
      </Router>
    </Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
