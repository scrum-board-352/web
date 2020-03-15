import Avatar from "components/Avatar";
import Searchbar from "components/Searchbar";
import ProjectModel from "models/Project";
import React, { useEffect, useState } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import testProjectData from "utils/testProjectData";
import "./style.css";

export default function ProjectBrowser() {
  const [projectData, setProjectData] = useState<ProjectModel.Info[]>([]);

  useEffect(() => {
    // TODO: fetch project data.
    const projectData = [
      testProjectData.info.shitMountain,
      testProjectData.info.shitMountainv2,
    ];
    console.log("fetch data:", projectData);
    setProjectData(projectData);
  }, []);

  function searchProject(name: string) {
    console.log("search project:", name);
  }

  return (
    <Container fluid className="dashboard_page_container">
      <Row className="align-item-center justify-content-between">
        <h1>Projects</h1>
        <Button variant="primary" size="sm" className="align-self-center">
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
            {projectData.map((project, i) => (
              <tr key={project.id}>
                <td>{i + 1}</td>
                <td>
                  <a href="/">{project.name}</a>
                </td>
                <td>{project.createTime}</td>
                <td>{project.iteration}</td>
                <td>
                  <Avatar user={project.creator} size="15px" gap="0.5rem" />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}
