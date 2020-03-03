import Avatar from "components/Avatar";
import Searchbar from "components/Searchbar";
import React, { useEffect, useState } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import testUserData from "utils/testUserData";
import "./style.css";

export default function ProjectBrowser() {
  const [projectData, setProjectData] = useState<any[]>([]);

  useEffect(() => {
    // TODO: fetch project data.
    const projectData = [
      {
        id: 1,
        url: "/",
        name: "Shit Mountain",
        createTime: "2020-03-01",
        iteration: 14,
        creator: testUserData.mokuo,
      },
      {
        id: 2,
        url: "/",
        name: "Shit Mountain v2",
        createTime: "2020-03-01",
        iteration: 7,
        creator: testUserData.emmm,
      },
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
        <Table hover>
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
                  <a href={project.url}>{project.name}</a>
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
