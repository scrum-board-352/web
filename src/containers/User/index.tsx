import auth from "api/base/auth";
import { selectTeamByUsername, sendEmailToInviteReceiverJoinTeam } from "api/Team";
import { selectUserBySubstring } from "api/User";
import Loading from "components/Loading";
import { message } from "components/MessageBox";
import ModalForm, { Template } from "components/ModalForm";
import useLoading from "hooks/useLoading";
import ProjectModel from "models/Project";
import TeamModel from "models/Team";
import UserModel from "models/User";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { useStore } from "rlax";
import avatar from "utils/avatar";
import Placeholder from "./Placeholder";
import Projects from "./Projects";
import projectSvg from "./projects.svg";
import style from "./style.module.css";
import Teams from "./Teams";
import teamSvg from "./teams.svg";

type FormValues = {
  teamId: string;
};

export default function User() {
  const { username } = useParams();
  const history = useHistory();
  const [userInfo, setUserInfo] = useState<UserModel.PrivateInfo>({
    id: "",
    name: "",
    avatar: "",
    email: "",
  });
  const [projects, setProjects] = useState<ProjectModel.Info[]>([]);
  const [teams, setTeams] = useState<TeamModel.Info[]>([]);
  const [loading, loadingOps] = useLoading();
  const currentUser: UserModel.PrivateInfo = useStore("user");

  useEffect(() => {
    loadingOps(async () => {
      // TODO: fetch projects, teams info.
      const users = await auth(null, selectUserBySubstring, {
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

  const [showSelectTeamForm, setShowSelectTeamForm] = useState(false);
  const [inviteLoading, inviteLoadingOps] = useLoading();

  async function handleInviteSubmit(values: FormValues) {
    if (!values.teamId) {
      message({
        title: "Invalid Input!",
        type: "error",
        content: "You should select a team for user to join in!",
      });
      setShowSelectTeamForm(false);
      return;
    }
    const res = await inviteLoadingOps(
      auth,
      { teamId: values.teamId },
      sendEmailToInviteReceiverJoinTeam,
      {
        receiver: userInfo.name,
        receiverMail: userInfo.email,
        teamId: values.teamId,
      }
    );
    if (res.success) {
      message({
        title: "Email Sent Succeed!",
        type: "success",
        content: res.message,
      });
    } else {
      message({
        title: "Email Sent Failed!",
        type: "error",
        content: res.message,
      });
    }
    setShowSelectTeamForm(false);
  }

  const [myTeams, setMyTeams] = useState<Array<TeamModel.Info>>([]);

  useEffect(() => {
    (async () => {
      const myTeams = await auth(null, selectTeamByUsername, { username: currentUser.name });
      setMyTeams(myTeams);
    })();
  }, []);

  const formTemplates: Array<Template<FormValues>> = [
    {
      label: "Which team?",
      name: "teamId",
      type: "select",
      options: myTeams.map((team) => ({
        label: team.name,
        value: team.id,
      })),
    },
  ];

  return (
    <div className="vh-100 vw-100">
      {loading ? (
        <Loading />
      ) : (
        <>
          <ModalForm<FormValues>
            title="Invite User"
            templates={formTemplates}
            loading={inviteLoading}
            show={showSelectTeamForm}
            onClose={() => setShowSelectTeamForm(false)}
            onSubmit={handleInviteSubmit}
          />
          <div className={style.top_banner}></div>
          <Container>
            <Row>
              <Col md={3} className={style.user_info_side}>
                <img src={avatar(userInfo.avatar)} alt="" className={style.avatar} />
                <span className={style.username}>{userInfo.name}</span>
                {userInfo.id !== currentUser.id && (
                  <Button
                    variant="link"
                    size="sm"
                    className="mt-3"
                    onClick={() => setShowSelectTeamForm(true)}>
                    邀请用户加入团队
                  </Button>
                )}
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
