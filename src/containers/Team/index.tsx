import Empty from "components/Empty";
import ModalForm, { Template } from "components/ModalForm";
import PeopleCard from "components/PeopleCard";
import Searchbar from "components/Searchbar";
import TeamModel from "models/Team";
import UserModel from "models/User";
import React, { useEffect, useState } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import { useStore } from "rlax";
import testTeamData from "utils/testTeamData";
import testUserData from "utils/testUserData";
import "./style.css";

type FormValues = Pick<TeamModel.CreateInfo, "name" | "description">;

const createTeamFormTemplate: Array<Template<FormValues>> = [
  {
    label: "Team Name",
    name: "name",
    type: "text",
  },
  {
    label: "Description",
    name: "description",
    type: "textarea",
  },
];

export default function Team() {
  const [people, setPeople] = useState<UserModel.PublicInfo[]>([]);
  const [teams, setTeams] = useState<TeamModel.Info[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<UserModel.PublicInfo[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<TeamModel.Info[]>([]);

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

  useEffect(() => {
    setFilteredPeople(people);
    setFilteredTeams(teams);
  }, [teams, people]);

  function searchTeamOrPeople(name: string) {
    if (!name) {
      setFilteredPeople(people);
      setFilteredTeams(teams);
      return;
    }
    setFilteredPeople([]);
    setFilteredTeams([]);
  }

  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [createTeamLoading, setCreateTeamLoading] = useState(false);
  const user: UserModel.PrivateInfo = useStore("user");

  function createTeam(values: FormValues) {
    const team: TeamModel.CreateInfo = { ...values, creator: user.name };
    console.log(team);
  }

  return (
    <>
      <ModalForm<FormValues>
        title="Create Team"
        templates={createTeamFormTemplate}
        show={showCreateTeam}
        loading={createTeamLoading}
        onClose={() => setShowCreateTeam(false)}
        onSubmit={createTeam}
      />
      <Container fluid className="dashboard_page_container">
        <Row className="align-item-center justify-content-between">
          <h1>Team</h1>
          <Button
            variant="primary"
            size="sm"
            className="align-self-center"
            onClick={() => setShowCreateTeam(true)}>
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
              {filteredPeople.length ? (
                filteredPeople.map((p) => (
                  <PeopleCard key={p.id} className="mb-3 mr-3" size="60px" user={p} />
                ))
              ) : (
                <Empty size="8rem" message="No people matched" />
              )}
            </Row>
          </Container>
        </Row>
        <Row>
          <Container fluid>
            <Row>
              <h2>Your Teams</h2>
            </Row>
            <Row>
              {filteredTeams.length ? (
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
                    {filteredTeams.map((team, i) => (
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
              ) : (
                <Empty size="8rem" message="No team matched" />
              )}
            </Row>
          </Container>
        </Row>
      </Container>
    </>
  );
}
