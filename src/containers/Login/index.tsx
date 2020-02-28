import React from "react";
import { Container, Row, Form, Button, Col, Navbar } from "react-bootstrap";
import "./style.css";
import welcomeSvg from "./welcome.svg";
import logoSvg from "./logo.svg";
import { LoginInfo } from "../../models/User";

const loginForm: LoginInfo = {
  username: "",
  password: "",
};

function onSubmit(e: any) {
  e.preventDefault?.();
  let username: string = e.target?.[0]?.value ?? "";
  let password: string = e.target?.[1]?.value ?? "";
  username = username.trim();
  password = password.trim();
  if (username && password) {
    loginForm.username = username;
    loginForm.password = password;
    console.log(loginForm);
    return;
  }
  // error input
  console.log("error input!");
}

export default function Login() {
  return (
    <Container>
      <Navbar className="position-absolute">
        <Navbar.Brand>
          <img src={logoSvg} className="login_logo_img" alt="" />
        </Navbar.Brand>
      </Navbar>
      <Row className="min-vh-100">
        <Col className="align-self-center d-flex justify-content-center" md={7}>
          <img src={welcomeSvg} className="login_welcome_img" alt="" />
        </Col>
        <Col className="align-self-center d-flex justify-content-center" md={5}>
          <div className="login_form_box w-75">
            <h1 className="login_h1">Sign in</h1>
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="username">
                <Form.Label>User Name</Form.Label>
                <Form.Control placeholder="User Name" />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="primary" type="submit" block>
                Sign in
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
