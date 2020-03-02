import React from "react";
import { Row, Container, Button, Table } from "react-bootstrap";
import Searchbar from "components/Searchbar";
import PeopleCard from "components/PeopleCard";
import "./style.css";
import Avatar from "components/Avatar";

export default function Team() {
  function searchTeam(name: string) {
    console.log("search", name);
  }

  return (
    <Container fluid className="team_container">
      <Row className="flex-row-reverse">
        <Button variant="outline-primary" size="sm">
          Create Team
        </Button>
      </Row>
      <Row>
        <Searchbar
          placeholder="Search People or Team"
          color="var(--gray)"
          hoverColor="var(--blue)"
          size="2rem"
          onSearch={searchTeam}
          onChange={(s) => console.log(s)}
        />
      </Row>
      <Row>
        <Container fluid>
          <Row>
            <h2>People</h2>
          </Row>
          <Row>
            <PeopleCard
              size="60px"
              avatarSrc="holder.js/60x60?bg=20c997&fg=ffffff"
              name="Mokuo"
              onClick={() => console.log("click!")}
            />
          </Row>
        </Container>
      </Row>
      <Row>
        <Container fluid>
          <Row>
            <h2>Your Teams</h2>
          </Row>
          <Row>
            <Table hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team Name</th>
                  <th>Creator</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <a href="/">LGTM</a>
                  </td>
                  <td>
                    <Avatar
                      name="Mokuo"
                      src="holder.js/15x15?bg=20c997"
                      size="15px"
                      gap="0.5rem"
                    />
                  </td>
                  <td>
                    This is what LGTM! Lorem ipsum dolor sit, amet consectetur
                    adipisicing elit. Ad, voluptatem officiis. Recusandae
                    repudiandae illo fugiat voluptatibus quis ab consequuntur
                    aliquid iste placeat quae sapiente dolorum, dolor atque nemo
                    numquam optio?
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    <a href="/">Shit</a>
                  </td>
                  <td>
                    <Avatar
                      name="Emmm"
                      src="holder.js/15x15?bg=6610f2"
                      size="15px"
                      gap="0.5rem"
                    />
                  </td>
                  <td>
                    Shit is always shit. Lorem ipsum, dolor sit amet consectetur
                    adipisicing elit. Aspernatur corporis necessitatibus dolorum
                    esse suscipit exercitationem eaque beatae aperiam non harum
                    quod explicabo, assumenda, hic dolores a quidem aliquid
                    expedita doloremque?
                  </td>
                </tr>
              </tbody>
            </Table>
          </Row>
        </Container>
      </Row>
    </Container>
  );
}
