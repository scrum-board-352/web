import Loading from "components/Loading";
import { selectUserBySubstring } from "graphql/User";
import useLoading from "hooks/useLoading";
import ProjectModel from "models/Project";
import TeamModel from "models/Team";
import UserModel from "models/User";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import Placeholder from "./Placeholder";
import Projects from "./Projects";
import projectSvg from "./projects.svg";
import style from "./style.module.css";
import Teams from "./Teams";
import teamSvg from "./teams.svg";

const avatarPlaceholder = process.env.PUBLIC_URL + "/img/user.svg";

function avatarUrl(url?: string) {
  return url ? url : avatarPlaceholder;
}

export default function User() {
  const { username } = useParams();
  const history = useHistory();
  const [userInfo, setUserInfo] = useState<UserModel.PublicInfo>({
    id: "",
    name: "",
    avatar: "",
  });
  const [projects, setProjects] = useState<ProjectModel.Info[]>([]);
  const [teams, setTeams] = useState<TeamModel.Info[]>([]);
  const [loading, loadingOps] = useLoading();

  useEffect(() => {
    loadingOps(async () => {
      // TODO: fetch projects, teams info.
      const users = await selectUserBySubstring({
        usernameSubstring: username as string,
      });
      const user = users.find((u) => u.name === username);
      if (!user) {
        history.replace("/404");
        return;
      }
      // const projects = Object.values(testProjectData.info);
      // const teams = Object.values(testTeamData.info);
      setUserInfo(user);
      // setProjects(projects);
      // setTeams(teams);
    });
  }, []);

  return (
    <div className="vh-100 vw-100">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={style.top_banner}></div>
          <Container>
            <Row>
              <Col md={3} className={style.user_info_side}>
                <img src={avatarUrl(userInfo.avatar)} alt="" className={style.avatar} />
                <span className={style.username}>{userInfo.name}</span>
              </Col>
              <Col md={9}>
                <div className={style.content_container}>
                  <h2>Recent 5 new projects</h2>
                  <div className={style.content}>
                    {projects.length ? (
                      <Projects data={projects} />
                    ) : (
                      <Placeholder picture={projectSvg} content="最近没有任何新项目" />
                    )}
                  </div>
                </div>
                <div className={style.content_container}>
                  <h2>Recent 5 new teams</h2>
                  <div className={style.content}>
                    {teams.length ? (
                      <Teams data={teams} />
                    ) : (
                      <Placeholder picture={teamSvg} content="最近没有任何新团队" />
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </div>
  );
}
