import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./style.css";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Error from "components/Error";

function App() {
  return (
    <>
      <Error />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
