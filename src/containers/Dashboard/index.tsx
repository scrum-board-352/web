import React from "react";
import { IconContext } from "react-icons";
import {
  AiOutlineProject,
  AiOutlineUsergroupAdd,
  AiOutlineMessage,
} from "react-icons/ai";
import Sidebar from "components/Sidebar";
import "./style.css";
import Avatar from "components/Avatar";
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  Redirect,
} from "react-router-dom";
import Team from "containers/Team";

enum Path {
  Projects = "projects",
  Team = "team",
  Messages = "messages",
}

export default function Dashboard() {
  const { path } = useRouteMatch();
  const history = useHistory();

  return (
    <div className="d-flex">
      <Sidebar>
        <Sidebar.Title>
          <Avatar
            src="holder.js/50x50?bg=20c997&fg=ffffff"
            name="Mokuo"
            size="50px"
            className="dashboard_sidebar_avatar"
          />
        </Sidebar.Title>
        <IconContext.Provider value={{ size: "20px" }}>
          <Sidebar.Items color="var(--dark)" activeColor="yellowgreen">
            <Sidebar.Item onClick={() => history.push(Path.Projects)}>
              <AiOutlineProject />
              <span className="ml-3 dashboard_sidebar_item">Projects</span>
            </Sidebar.Item>

            <Sidebar.Item onClick={() => history.push(Path.Team)}>
              <AiOutlineUsergroupAdd />
              <span className="ml-3 dashboard_sidebar_item">Team</span>
            </Sidebar.Item>

            <Sidebar.Item onClick={() => history.push(Path.Messages)}>
              <AiOutlineMessage />
              <span className="ml-3 dashboard_sidebar_item">Messages</span>
            </Sidebar.Item>
          </Sidebar.Items>
        </IconContext.Provider>
      </Sidebar>
      <main className="dashboard_content_container">
        <Switch>
          <Route exact path={path}>
            <h1>Welcome!</h1>
          </Route>
          <Route exact path={`${path}/${Path.Projects}`} />
          <Route exact path={`${path}/${Path.Team}`}>
            <Team />
          </Route>
          <Route exact path={`${path}/${Path.Messages}`} />
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      </main>
    </div>
  );
}
