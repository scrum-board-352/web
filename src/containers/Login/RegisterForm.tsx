import { register } from "api/User";
import { message } from "components/MessageBox";
import useFormData from "hooks/useFormData";
import useLoading from "hooks/useLoading";
import UserModel from "models/User";
import React, { Fragment, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";

export type Props = {
  className?: string;
};

export default function RegisterForm(props?: Props) {
  const [loading, loadingOps] = useLoading();
  const [usernameInputOk, setUsernameInputOk] = useState(true);
  const [emailInputOk, setEmailInputOk] = useState(true);
  const [passwordInputOk, setPasswordInputOk] = useState(true);
  const { rawData: registerForm, setRef: setFormElementRef, handleInputChange } = useFormData<
    UserModel.RegisterInfo
  >();

  function checkRegisterFormData({ username, email, password }: UserModel.RegisterInfo): boolean {
    if (username && email && password) {
      return true;
    }
    if (!username) {
      setUsernameInputOk(false);
    }
    if (!email) {
      setEmailInputOk(false);
    }
    if (!password) {
      setPasswordInputOk(false);
    }
    return false;
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!checkRegisterFormData(registerForm as UserModel.RegisterInfo)) {
      return;
    }

    const res = await loadingOps(register, registerForm);
    if (res.success) {
      message({
        type: "success",
        title: "Register Succed!",
      });
    } else {
      message({
        type: "error",
        title: "Register Failed!",
        content: res.message,
      });
    }
  }

  return (
    <div className={props?.className}>
      <h1 className="login_h1">Sign Up</h1>
      <Form onSubmit={handleRegister}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            disabled={loading}
            ref={(elem: any) => setFormElementRef(elem)}
            className={usernameInputOk ? "" : "is-invalid"}
            placeholder="Username"
            name="username"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (!usernameInputOk) {
                setUsernameInputOk(true);
              }
              handleInputChange(e);
            }}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            disabled={loading}
            ref={(elem: any) => setFormElementRef(elem)}
            className={emailInputOk ? "" : "is-invalid"}
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (!emailInputOk) {
                setEmailInputOk(true);
              }
              handleInputChange(e);
            }}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            disabled={loading}
            className={passwordInputOk ? "" : "is-invalid"}
            type="password"
            placeholder="Password"
            name="password"
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
              Registering...
            </Fragment>
          ) : (
            "Sign up"
          )}
        </Button>
      </Form>
    </div>
  );
}
