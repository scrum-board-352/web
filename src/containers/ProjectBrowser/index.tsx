import Empty from "components/Empty";
import ModalForm, { Template } from "components/ModalForm";
import Searchbar from "components/Searchbar";
import useFilter from "hooks/useFilter";
import ProjectModel from "models/Project";
import TeamModel from "models/Team";
import UserModel from "models/User";
import React, { useEffect, useState } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import { useStore } from "rlax";
import joinUrl from "utils/join-url";
import testProjectData from "utils/testProjectData";
import testTeamData from "utils/testTeamData";
import "./style.css";

type FormValues = Pick<ProjectModel.CreateInfo, "name" | "iteration" | "teamId"> & {
  col?: string;
};

function splitCol(col?: string) {
  if (col) {
    return col.split(",").map((c) => c.trim());
  }
  return [];
}

export default function ProjectBrowser() {
  const [projectData, setProjectData] = useState<ProjectModel.Info[]>([]);
  const { url } = useRouteMatch();

  useEffect(() => {
    // TODO: fetch project data.
    const projectData = [testProjectData.info.shitMountain, testProjectData.info.shitMountainv2];
    setProjectData(projectData);
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
  const [createProjectLoading, setCreateProjectLoading] = useState(false);
  const user: UserModel.PrivateInfo = useStore("user");
  const [teams, setTeams] = useState<Array<TeamModel.Info>>([]);

  useEffect(() => {
    // TODO: fetch teams by user.
    setTeams(Object.values(testTeamData.info));
  }, []);

  function createProject(values: FormValues) {
    const project: ProjectModel.CreateInfo = {
      ...values,
      creator: user.name,
      col: splitCol(values.col),
    };
    console.log(project);
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

  return (
    <>
      <ModalForm<FormValues>
        title="Create Project"
        show={showCreateProject}
        loading={createProjectLoading}
        templates={createProjectFormTemplate}
        onClose={() => setShowCreateProject(false)}
        onSubmit={createProject}
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
      </Container>
    </>
  );
}
