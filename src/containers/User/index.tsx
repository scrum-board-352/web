import auth from "api/base/auth";
import { selectTeamByUsername, sendEmailToInviteReceiverJoinTeam } from "api/Team";
import { selectUserBySubstring } from "api/User";
import Img from "components/Img";
import Loading from "components/Loading";
import { message } from "components/MessageBox";
import ModalForm, { Template } from "components/ModalForm";
import useLoading from "hooks/useLoading";
import ProjectModel from "models/Project";
import TeamModel from "models/Team";
import UserModel from "models/User";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FiEdit2 } from "react-icons/fi";
import { useHistory, useParams } from "react-router-dom";
import { setStore, useStore } from "rlax";
import avatar from "utils/avatar";
import className from "utils/class-name";
import AvatarEditor from "./AvatarEditor";
import Placeholder from "./Placeholder";
import Projects from "./Projects";
import projectSvg from "./projects.svg";
import style from "./style.module.css";
import Teams from "./Teams";
import teamSvg from "./teams.svg";

type InviteUserFormValues = {
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
  const [loading, loadingOps] = useLoading(true);
  const currentUser: UserModel.PrivateInfo = useStore("user");

  function isSelf() {
    return userInfo.id === currentUser.id;
  }

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

  async function handleInviteSubmit(values: InviteUserFormValues) {
    if (!values.teamId) {
      message.error("Invalid Input!", "You should select a team for user to join in!");
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
      message.success("Email Sent Succeed!", res.message);
    } else {
      message.error("Email Sent Failed!", res.message);
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

  const formTemplates: Array<Template<InviteUserFormValues>> = [
    {
      label: "Which team?",
      name: "teamId",
      type: "select",
      options: myTeams.map((team) => ({
        label: team.name,
        value: team.id,
      })),
      required: true,
    },
  ];

  const [showEditAvatarModal, setShowEditAvatarModal] = useState(false);

  function handleAvatarUpdated(updatedUser: UserModel.PrivateInfo) {
    setUserInfo(updatedUser);
    setStore("user", updatedUser);
  }

  return (
    <div className="vh-100 vw-100">
      {loading ? (
        <Loading />
      ) : (
        <>
          <ModalForm<InviteUserFormValues>
            title="Invite User"
            templates={formTemplates}
            loading={inviteLoading}
            show={showSelectTeamForm}
            onClose={() => setShowSelectTeamForm(false)}
            onSubmit={handleInviteSubmit}
          />
          <AvatarEditor
            show={showEditAvatarModal}
            onHide={() => setShowEditAvatarModal(false)}
            onAvatarUpdate={handleAvatarUpdated}
          />
          <div className={style.top_banner}></div>
          <Container>
            <Row>
              <Col md={3} className={style.user_info_side}>
                <Img src={avatar(userInfo.avatar)} className={style.avatar} />
                {isSelf() ? (
                  <button
                    className={className(style.avatar_edit_btn, "iconshadow")}
                    onClick={() => setShowEditAvatarModal(true)}>
                    <FiEdit2 size="45%" />
                  </button>
                ) : null}
                <span className={style.username}>{userInfo.name}</span>
                <span className={style.email}>{userInfo.email}</span>
                {isSelf() ? (
                  <Button variant="link" size="sm" className="mt-3">
                    Edit
                  </Button>
                ) : (
                  <Button
                    variant="link"
                    size="sm"
                    className="mt-3"
                    onClick={() => setShowSelectTeamForm(true)}>
                    Invite
                  </Button>
                )}
              </Col>
              <Col md={8}>
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
