import useFormData from "hooks/useFromData";
import React, { Fragment } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";

export interface Template {
  name: string;
  type: string;
}

export interface Values {
  [name: string]: string;
}

type Props = {
  title: string;
  templates: Template[];
  show: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (values: Values) => void;
};

export default function ModalForm(props: Props) {
  const [values, handleInputChange] = useFormData<Values>({});

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.onSubmit(values);
  }

  return (
    <Fragment>
      <Modal show={props.show} onHide={props.onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submit}>
            {props.templates.map((t) => (
              <Form.Group key={t.name}>
                <Form.Label>{t.name}</Form.Label>
                <Form.Control
                  disabled={props.loading}
                  type={t.type}
                  name={t.name}
                  onChange={handleInputChange}
                  as={t.type === "textarea" ? "textarea" : "input"}
                />
              </Form.Group>
            ))}

            <Button
              className="float-right"
              variant="primary"
              type="submit"
              disabled={props.loading}
            >
              {props.loading ? (
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : null}
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}
