import Empty from "components/Empty";
import Loading from "components/Loading";
import { message } from "components/MessageBox";
import ModalForm, { Template } from "components/ModalForm";
import Searchbar from "components/Searchbar";
import { createProject, selectProjectByCreator } from "graphql/Project";
import { selectTeamByUser } from "graphql/Team";
import useFilter from "hooks/useFilter";
import useLoading from "hooks/useLoading";
import ProjectModel from "models/Project";
import TeamModel from "models/Team";
import UserModel from "models/User";
import React, { useEffect, useState } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import { useStore } from "rlax";
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
  const [loading, loadingOps] = useLoading();
  const [noProject, setNoProject] = useState(false);
  const currentUser: UserModel.PrivateInfo = useStore("user");

  useEffect(() => {
    // fetch project data.
    loadingOps(async () => {
      const projectData = await selectProjectByCreator({ creator: currentUser.name });
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
      const teams = await selectTeamByUser({ username: currentUser.name });
      setTeams(teams);
    })();
  }, []);

  const [createProjectLoading, createProjectLoadingOps] = useLoading();

  async function handleCreateProject(values: FormValues) {
    const project: ProjectModel.CreateInfo = {
      ...values,
      creator: currentUser.name,
      col: formatCol(values.col),
    };
    const newProject = await createProjectLoadingOps(createProject, project);
    if (newProject.id) {
      message({
        title: "Create Project Succeed!",
        type: "success",
      });
      setProjectData([...projectData, newProject]);
      setNoProject(false);
    } else {
      message({
        title: "Create Project Failed!",
        type: "success",
      });
    }
  }

  const createProjectFormTemplate: Array<Template<FormValues>> = [
    {
      label: "Project Name",
      name: "name",
      type: "text",
    },
    {
      label: "Iteration",
      name: "iteration",
      type: "number",
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
    },
  ];

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
                  placeholder="Search Project"
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
                        <td>{project.createTime}</td>
                        <td>{project.iteration}</td>
                        <td>{project.creator}</td>
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
