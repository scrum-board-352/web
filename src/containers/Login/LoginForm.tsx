import auth from "api/base/auth";
import { login } from "api/User";
import { message } from "components/MessageBox";
import useFormData from "hooks/useFormData";
import useLoading from "hooks/useLoading";
import UserModel from "models/User";
import React, { Fragment, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { setStore } from "rlax";

export type Props = {
  className?: string;
};

export default function LoginForm(props?: Props) {
  const [loading, loadingOps] = useLoading();
  const [usernameInputOk, setUsernameInputOk] = useState(true);
  const [passwordInputOk, setPasswordInputOk] = useState(true);
  const { data: loginForm, setRef: setFormElementRef, handleInputChange } = useFormData<
    UserModel.LoginInfo
  >();
  const history = useHistory();

  function checkLoginFormData({ username, password }: UserModel.LoginInfo): boolean {
    if (username && password) {
      return true;
    }
    if (!username) {
      setUsernameInputOk(false);
    }
    if (!password) {
      setPasswordInputOk(false);
    }
    return false;
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!checkLoginFormData(loginForm as UserModel.LoginInfo)) {
      return;
    }

    const userInfo = await loadingOps(auth, null, login, loginForm);
    if (null === userInfo.id) {
      message({
        type: "error",
        title: "Login Failed!",
        content: "No such user or password not match.",
      });
      setUsernameInputOk(false);
      setPasswordInputOk(false);
    } else {
      message({
        type: "success",
        title: "Login Succed!",
      });
      setStore("user", userInfo);
      history.push("/dashboard");
    }
  }

  return (
    <div className={props?.className}>
      <h1 className="login_h1">Sign In</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            disabled={loading}
            ref={(elem: any) => setFormElementRef(elem)}
            placeholder="Username"
            name="username"
            className={usernameInputOk ? "" : "is-invalid"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (!usernameInputOk) {
                setUsernameInputOk(true);
              }
              handleInputChange(e);
            }}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            disabled={loading}
            ref={(elem: any) => setFormElementRef(elem)}
            type="password"
            placeholder="Password"
            name="password"
            className={passwordInputOk ? "" : "is-invalid"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (!passwordInputOk) {
                setPasswordInputOk(true);
              }
              handleInputChange(e);
            }}
          />
        </Form.Group>

        <Button variant="primary" type="submit" block disabled={loading}>
          {loading ? (
            <Fragment>
              <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
              Logging in...
            </Fragment>
          ) : (
            "LOGIN"
          )}
        </Button>
      </Form>
    </div>
  );
}
