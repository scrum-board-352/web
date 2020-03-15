import Avatar from "components/Avatar";
import ProjectModel from "models/Project";
import React from "react";
import { Table } from "react-bootstrap";

type Props = {
  data: ProjectModel.Info[];
};

export default function Projects(props: Props) {
  const projects = props.data;

  return (
    <Table hover borderless={true}>
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Create Time</th>
          <th>Creator</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project.id}>
            <td>
              <a href="/">{project.name}</a>
            </td>
            <td>{project.createTime}</td>
            <td>
              <Avatar user={project.creator} size="15px" gap="0.5rem" />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
