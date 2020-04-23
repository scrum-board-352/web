import auth from "api/base/auth";
import { createProject, removeProject, selectProjectByCreator } from "api/Project";
import { selectTeamByUsername } from "api/Team";
import Empty from "components/Empty";
import Loading from "components/Loading";
import LoadingButton from "components/LoadingButton";
import { message } from "components/MessageBox";
import ModalForm, { Template } from "components/ModalForm";
import Searchbar from "components/Searchbar";
import useFilter from "hooks/useFilter";
import useLoading, { useLoadingGroup } from "hooks/useLoading";
import ProjectModel from "models/Project";
import ResultOutput from "models/ResultOutput";
import TeamModel from "models/Team";
import UserModel from "models/User";
import React, { useEffect, useState } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import { useStore } from "rlax";
import { removeItem } from "utils/array";
import { day } from "utils/date";
import joinUrl from "utils/join-url";
import "./style.css";

type FormValues = Pick<ProjectModel.CreateInfo, "name" | "iteration" | "teamId"> & {
  col?: string;
};

function formatCol(col?: string) {
  if (col) {
    return col
      .split(",")
      .map((c) => c.trim())
      .join(",");
  }
  return "";
}

export default function ProjectBrowser() {
  const { url } = useRouteMatch();
  const [projectData, setProjectData] = useState<ProjectModel.Info[]>([]);
  const [loading, loadingOps] = useLoading(true);
  const [noProject, setNoProject] = useState(false);
  const currentUser: UserModel.PrivateInfo = useStore("user");

  useEffect(() => {
    // fetch project data.
    loadingOps(async () => {
      const projectData = await auth(null, selectProjectByCreator, { creator: currentUser.name });
      if (projectData.length === 0) {
        setNoProject(true);
      } else if (projectData.length > 0) {
        setNoProject(false);
      }
      setProjectData(projectData);
    });
  }, []);

  const [filteredProjectData, setFilteredProjectData] = useState<ProjectModel.Info[]>([]);
  const [noProjectMatched, filterProject] = useFilter();

  useEffect(() => {
    setFilteredProjectData(projectData);
  }, [projectData]);

  function searchProject(name: string) {
    setFilteredProjectData(filterProject(projectData, (p) => p.name.includes(name)));
  }

  const [showCreateProject, setShowCreateProject] = useState(false);
  const [teams, setTeams] = useState<Array<TeamModel.Info>>([]);

  useEffect(() => {
    // teams by user.
    (async () => {
      const teams = await auth(null, selectTeamByUsername, { username: currentUser.name });
      setTeams(teams);
    })();
  }, []);

  const [createProjectLoading, createProjectLoadingOps] = useLoading();

  async function handleCreateProject(values: FormValues) {
    const project: ProjectModel.CreateInfo = {
      ...values,
      creator: currentUser.name,
    };
    const newProject = await createProjectLoadingOps(auth, null, createProject, project);
    if (newProject.id) {
      message.success("Create Project Succeed!");
      setProjectData([...projectData, newProject]);
      setNoProject(false);
    } else {
      message.error("Create Project Failed!");
    }
  }

  const createProjectFormTemplate: Array<Template<FormValues>> = [
    {
      label: "Project Name",
      name: "name",
      type: "text",
      required: true,
    },
    {
      label: "Iteration",
      name: "iteration",
      type: "number",
      min: 1,
      filter: Number,
    },
    {
      label: "Team",
      name: "teamId",
      type: "select",
      options: teams.map((team) => ({
        label: team.name,
        value: team.id,
      })),
    },
    {
      label: "Columns",
      name: "col",
      type: "text",
      filter: formatCol,
    },
  ];

  const [deleteProjectLoading, deleteProjectLoadingOps] = useLoadingGroup();

  async function handleDeleteProject(project: ProjectModel.Info) {
    const projectId = project.id;
    const res: ResultOutput = await deleteProjectLoadingOps(
      project.id,
      auth,
      { projectId },
      removeProject,
      { projectId }
    );
    if (res.success) {
      message.success("Delete Succeed!", res.message);
      setProjectData((projectData) => removeItem(projectData, project));
    } else {
      message.error("Delete Failed!", res.message);
    }
  }

  return loading ? (
    <Loading />
  ) : (
    <>
      <ModalForm<FormValues>
        title="Create Project"
        show={showCreateProject}
        loading={createProjectLoading}
        templates={createProjectFormTemplate}
        onClose={() => setShowCreateProject(false)}
        onSubmit={async (values) => {
          await handleCreateProject(values);
          setShowCreateProject(false);
        }}
      />
      <Container fluid className="dashboard_page_container">
        <Row className="align-item-center justify-content-between">
          <h1>Projects</h1>
          <Button
            variant="primary"
            size="sm"
            className="align-self-center"
            onClick={() => setShowCreateProject(true)}>
            Create Project
          </Button>
        </Row>
        {noProject ? (
          <Empty message="No project. Create one?" style={{ marginTop: "10rem" }} />
        ) : (
          <>
            <Row>
              <div className="projectbrowser_searchbar_container">
                <Searchbar
                  size="1.5rem"
                  placeholder="Search Project..."
                  color="var(--gray)"
                  activeColor="var(--blue)"
                  onSearch={searchProject}
                />
              </div>
            </Row>
            <Row>
              {noProjectMatched ? (
                <Empty size="8rem" message="No project matched" />
              ) : (
                <Table hover borderless={true}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Project Name</th>
                      <th>Create Time</th>
                      <th>Iteration</th>
                      <th>Creator</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjectData.map((project, i) => (
                      <tr key={project.id}>
                        <td>{i + 1}</td>
                        <td>
                          <Link to={joinUrl(url, project.id)}>{project.name}</Link>
                        </td>
                        <td>{day(project.createTime)}</td>
                        <td>{project.iteration}</td>
                        <td>{project.creator}</td>
                        <td className="table_setting">
                          <LoadingButton
                            variant="outline-danger"
                            size="sm"
                            text="delete"
                            loadingText="deleting..."
                            loading={deleteProjectLoading(project.id)}
                            onClick={() => handleDeleteProject(project)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Row>
          </>
        )}
      </Container>
    </>
  );
}
