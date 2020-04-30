import Sidebar from "components/Sidebar";
import Kanban from "containers/Kanban";
import Messages from "containers/Messages";
import ProjectBrowser from "containers/ProjectBrowser";
import Team from "containers/Team";
import UserModel from "models/User";
import React from "react";
import { IconContext } from "react-icons";
import { AiOutlineMessage, AiOutlineProject, AiOutlineUsergroupAdd } from "react-icons/ai";
import { Redirect, Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { useStore } from "rlax";
import joinUrl from "utils/join-url";
import "./style.css";
import UserInfo from "./UserInfo";
import Welcome from "./Welcome";

enum Path {
  Projects = "projects",
  Team = "team",
  Messages = "messages",
}

export default function Dashboard() {
  const { path, url } = useRouteMatch();
  const history = useHistory();
  const user: UserModel.PrivateInfo = useStore("user");

  return (
    <div className="d-flex">
      <Sidebar>
        <Sidebar.Title>
          <UserInfo user={user} />
        </Sidebar.Title>
        <IconContext.Provider value={{ size: "20px" }}>
          <Sidebar.Items color="var(--dark)" activeColor="yellowgreen">
            <Sidebar.Item onClick={() => history.push(joinUrl(url, Path.Projects))}>
              <AiOutlineProject />
              <span className="ml-3 dashboard_sidebar_item">Projects</span>
            </Sidebar.Item>

            <Sidebar.Item onClick={() => history.push(joinUrl(url, Path.Team))}>
              <AiOutlineUsergroupAdd />
              <span className="ml-3 dashboard_sidebar_item">Teams</span>
            </Sidebar.Item>

            <Sidebar.Item onClick={() => history.push(joinUrl(url, Path.Messages))}>
              <AiOutlineMessage />
              <span className="ml-3 dashboard_sidebar_item">Messages</span>
            </Sidebar.Item>
          </Sidebar.Items>
        </IconContext.Provider>
      </Sidebar>
      <main className="dashboard_content_container">
        <Switch>
          <Route exact path={path}>
            <Welcome />
          </Route>

          <Route exact path={`${path}/${Path.Projects}`}>
            <ProjectBrowser />
          </Route>

          <Route exact path={`${path}/${Path.Projects}/:projectId/:boardId?`}>
            <Kanban />
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
