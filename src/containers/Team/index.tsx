import auth from "api/base/auth";
import { createTeam, selectTeamByUsername } from "api/Team";
import { selectPeopleByTeamId, selectUserBySubstring } from "api/User";
import Empty from "components/Empty";
import Loading from "components/Loading";
import LoadingButton from "components/LoadingButton";
import ModalForm, { Template } from "components/ModalForm";
import PeopleCard from "components/PeopleCard";
import Searchbar from "components/Searchbar";
import useLoading from "hooks/useLoading";
import TeamModel from "models/Team";
import UserModel from "models/User";
import React, { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, Container, Row, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useStore } from "rlax";
import { deduplication } from "utils/array";

type TeamFormValues = Pick<TeamModel.CreateInfo, "name" | "description">;

const createTeamFormTemplate: Array<Template<TeamFormValues>> = [
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
  const [noPeopleMatched, setNoPeopleMatched] = useState(false);
  const [noPeople, setNoPeople] = useState(false);
  const [noTeam, setNoTeam] = useState(false);
  const currentUser: UserModel.PrivateInfo = useStore("user");

  const [teamsLoading, teamsLoadingOps] = useLoading();

  useEffect(() => {
    // fetch teams.
    teamsLoadingOps(async () => {
      const teams = await auth(null, selectTeamByUsername, { username: currentUser.name });
      setTeams(teams);
    });
  }, []);

  useEffect(() => {
    setNoTeam(teams.length === 0);
  }, [teams]);

  const [peopleLoading, peopleLoadingOps] = useLoading();
  const peopleFetchedRef = useRef(false);

  useEffect(() => {
    // fetch people.
    if (peopleFetchedRef.current) {
      return;
    }
    if (teams.length === 0) {
      setNoPeople(true);
      return;
    }
    peopleLoadingOps(async () => {
      const recentTeams = teams.length < 5 ? teams : teams.slice(0, 5);
      const recentTeamsId = recentTeams.map((team) => team.id);
      const recentPeople = await Promise.all(
        recentTeamsId.map((teamId) => auth({ teamId }, selectPeopleByTeamId, { teamId }))
      );
      const people = deduplication(recentPeople.flat(), (user) => user.id);
      setPeople(people);
      setNoPeople(people.length === 0);
      peopleFetchedRef.current = true;
    });
  }, [teams]);

  useEffect(() => {
    setFilteredPeople(people);
  }, [people]);

  const [searchPeople, setSearchPeople] = useState(false);

  async function handleSearchPeople(name: string) {
    if (!name) {
      setFilteredPeople(people);
      setSearchPeople(false);
      return;
    }
    setSearchPeople(true);
    const filteredPeople = await peopleLoadingOps(auth, null, selectUserBySubstring, {
      usernameSubstring: name,
    });
    if (filteredPeople.length) {
      setNoPeopleMatched(false);
      setFilteredPeople(filteredPeople);
    } else {
      setNoPeopleMatched(true);
    }
  }

  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [createTeamLoading, createTeamLoadingOps] = useLoading();
  const user: UserModel.PrivateInfo = useStore("user");

  async function handleCreateTeamSubmit(values: TeamFormValues) {
    const team: TeamModel.CreateInfo = { ...values, creator: user.name };
    const newTeam = await createTeamLoadingOps(auth, null, createTeam, team);
    setShowCreateTeam(false);
    setTeams([...teams, newTeam]);
  }

  const history = useHistory();

  function gotoUserPage(username: string) {
    history.push(`/user/${username}`);
  }

  function handleUpdateTeam(team: TeamModel.Info) {}

  function buildPeopleCards() {
    if (peopleLoading || teamsLoading) {
      return <Loading />;
    }

    if (searchPeople) {
      if (noPeopleMatched) {
        return <Empty size="8rem" message="No People Matched" />;
      }
    } else {
      if (noPeople) {
        return <Empty size="8rem" message="No People" />;
      }
    }

    return filteredPeople.map((p) => (
      <PeopleCard
        key={p.id}
        className="mb-3 mr-3"
        size="60px"
        user={p}
        onClick={() => gotoUserPage(p.name)}
      />
    ));
  }

  return (
    <>
      <ModalForm<TeamFormValues>
        title="Create Team"
        templates={createTeamFormTemplate}
        show={showCreateTeam}
        loading={createTeamLoading}
        onClose={() => setShowCreateTeam(false)}
        onSubmit={handleCreateTeamSubmit}
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
            placeholder="Search People..."
            color="var(--gray)"
            activeColor="var(--blue)"
            size="2rem"
            onSearch={handleSearchPeople}
          />
        </Row>
        <Row>
          <Container fluid>
            <Row>
              <h2>People</h2>
            </Row>
            <Row className="mt-3">{buildPeopleCards()}</Row>
          </Container>
        </Row>
        <Row>
          <Container fluid>
            <Row>
              <h2>Your Teams</h2>
            </Row>
            <Row>
              {teamsLoading ? (
                <Loading />
              ) : noTeam ? (
                <Empty size="8rem" message="No Team" />
              ) : (
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
                        <td className="table_setting">
                          <ButtonGroup size="sm">
                            <Button variant="outline-info" onClick={() => handleUpdateTeam(team)}>
                              update
                            </Button>
                            <LoadingButton
                              loading={false}
                              loadingText="deleting"
                              variant="outline-danger"
                              text="delete"
                            />
                          </ButtonGroup>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Row>
          </Container>
        </Row>
      </Container>
    </>
  );
}
