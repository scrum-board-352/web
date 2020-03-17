import ProjectModel from "models/Project";
import TeamModel from "models/Team";
import UserModel from "models/User";
import React, { Fragment, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import testProjectData from "utils/testProjectData";
import testTeamData from "utils/testTeamData";
import testUserData from "utils/testUserData";
import Placeholder from "./Placeholder";
import Projects from "./Projects";
import projectSvg from "./projects.svg";
import style from "./style.module.css";
import Teams from "./Teams";
import teamSvg from "./teams.svg";

export default function User() {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState<UserModel.PublicInfo>({
    id: "",
    name: "",
    avatar: "",
  });
  const [projects, setProjects] = useState<ProjectModel.Info[]>([]);
  const [teams, setTeams] = useState<TeamModel.Info[]>([]);

  useEffect(() => {
    // TODO: fetch user, projects, teams info.
    const userInfo = testUserData.publicInfo.mokuo;
    const projects = Object.values(testProjectData.info);
    const teams = Object.values(testTeamData.info);
    setUserInfo(userInfo);
    setProjects(projects);
    setTeams(teams);
  }, []);

  return (
    <Fragment>
      <div className={style.top_banner}></div>
      <Container>
        <Row>
          <Col md={3} className={style.user_info_side}>
            <img src={userInfo.avatar} alt="" className={style.avatar} />
            <span className={style.username}>{userInfo.name}</span>
          </Col>
          <Col md={9}>
            <div className={style.content_container}>
              <h2>Recent 5 new projects</h2>
              <div className={style.content}>
                {projects.length ? (
                  <Projects data={projects} />
                ) : (
                  <Placeholder
                    picture={projectSvg}
                    content="最近没有任何新项目"
                  />
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
    </Fragment>
  );
}
