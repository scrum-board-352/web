import Avatar from "components/Avatar";
import Sidebar from "components/Sidebar";
import Messages from "containers/Messages";
import ProjectBrowser from "containers/ProjectBrowser";
import Team from "containers/Team";
import React from "react";
import { IconContext } from "react-icons";
import {
  AiOutlineMessage,
  AiOutlineProject,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import testUserData from "utils/testUserData";
import "./style.css";

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
            user={testUserData.publicInfo.mokuo}
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

          <Route exact path={`${path}/${Path.Projects}`}>
            <ProjectBrowser />
          </Route>

          <Route exact path={`${path}/${Path.Team}`}>
            <Team />
          </Route>

          <Route exact path={`${path}/${Path.Messages}`}>
            <Messages />
          </Route>

          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      </main>
    </div>
  );
}
