import useFormData from "hooks/useFromData";
import UserModel from "models/User";
import React from "react";
import { Button, Form } from "react-bootstrap";

export type Props = {
  className?: string;
};

export default function RegisterForm(props?: Props) {
  const [registerForm, handleInputChange] = useFormData<UserModel.RegisterInfo>(
    {
      username: "",
      email: "",
      password: "",
    }
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(registerForm);
  }

  return (
    <div className={props?.className}>
      <h1 className="login_h1">Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            placeholder="Username"
            name="username"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" block>
          Sign up
        </Button>
      </Form>
    </div>
  );
}
