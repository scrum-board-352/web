import React, { useState } from "react";
import { Container, Row, Col, Navbar, Button } from "react-bootstrap";
import "./style.css";
import welcomeSvg from "./welcome.svg";
import logoSvg from "./logo.svg";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

enum FormType {
  Login = "login",
  Register = "register",
}

export default function Login() {
  const [formType, setFormType] = useState<FormType>(FormType.Login);

  function toggleForm() {
    if (formType === FormType.Login) {
      setFormType(FormType.Register);
    } else {
      setFormType(FormType.Login);
    }
  }

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
        <Col
          className="align-self-center d-flex flex-column align-items-center"
          md={5}
        >
          <div className="login_form_box d-flex flex-column align-items-center w-100">
            {formType === FormType.Login ? (
              <LoginForm className="w-75 animated fadeIn" />
            ) : (
              <RegisterForm className="w-75 animated fadeIn" />
            )}
          </div>

          {formType === FormType.Login ? (
            <p className="d-flex align-items-center">
              Don't have an account?
              <Button
                variant="link"
                size="sm"
                className="m-0 p-0 ml-1"
                onClick={toggleForm}
              >
                Create
              </Button>
            </p>
          ) : (
            <p className="d-flex align-items-center">
              Already have an account?
              <Button
                variant="link"
                size="sm"
                className="m-0 p-0 ml-1"
                onClick={toggleForm}
              >
                Login
              </Button>
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
}
