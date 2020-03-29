import PeopleCard from "components/PeopleCard";
import Searchbar from "components/Searchbar";
import TeamModel from "models/Team";
import UserModel from "models/User";
import React, { useEffect, useState } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import testTeamData from "utils/testTeamData";
import testUserData from "utils/testUserData";
import "./style.css";

export default function Team() {
  const [people, setPeople] = useState<UserModel.PublicInfo[]>([]);
  const [teams, setTeams] = useState<TeamModel.Info[]>([]);
  const [filterdPeople, setFilterdPeople] = useState<UserModel.PublicInfo[]>(people);
  const [filterdTeams, setFilterdTeams] = useState<TeamModel.Info[]>(teams);

  useEffect(() => {
    // TODO: fetch people.
    const people = [testUserData.publicInfo.mokuo, testUserData.publicInfo.emmm];
    setPeople(people);
  }, []);

  useEffect(() => {
    // TODO: fetch teams.
    const teams = [testTeamData.info.lgtm, testTeamData.info.shit];
    setTeams(teams);
  }, []);

  function searchTeamOrPeople(name: string) {
    console.log("search", name);
    setFilterdPeople([]);
  }

  return (
    <Container fluid className="dashboard_page_container">
      <Row className="align-item-center justify-content-between">
        <h1>Team</h1>
        <Button variant="primary" size="sm" className="align-self-center">
          Create Team
        </Button>
      </Row>
      <Row>
        <Searchbar
          placeholder="Search People or Team"
          color="var(--gray)"
          activeColor="var(--blue)"
          size="2rem"
          onSearch={searchTeamOrPeople}
          // onChange={(s) => console.log(s)}
        />
      </Row>
      <Row>
        <Container fluid>
          <Row>
            <h2>People</h2>
          </Row>
          <Row>
            {people.map((p) => (
              <PeopleCard key={p.id} className="mb-3 mr-3" size="60px" user={p} />
            ))}
          </Row>
        </Container>
      </Row>
      <Row>
        <Container fluid>
          <Row>
            <h2>Your Teams</h2>
          </Row>
          <Row>
            <Table hover borderless={true}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team Name</th>
                  <th>Creator</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, i) => (
                  <tr key={team.id}>
                    <td>{i + 1}</td>
                    <td>
                      <a href="/">{team.name}</a>
                    </td>
                    <td>{team.creator}</td>
                    <td>{team.description}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </Container>
      </Row>
    </Container>
  );
}
