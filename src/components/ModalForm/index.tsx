import useFormData from "hooks/useFormData";
import React, { Fragment, useEffect } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";

type Option = {
  label: string;
  value: string;
};

export interface Template<T extends object> {
  name: keyof T;
  label: string;
  type: "text" | "number" | "textarea" | "select";
  options?: Array<Option>;
  defaultValue?: string;
}

export type Props<T extends object> = {
  title: string;
  templates: Template<T>[];
  show: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (values: T) => void;
};

function asType(type: Template<object>["type"]) {
  switch (type) {
    case "text":
    case "number":
      return "input";

    case "textarea":
      return "textarea";

    case "select":
      return "select";

    default:
      throw new TypeError(`can not use type '${type}' as form element type!`);
  }
}

function generateOptions(options?: Array<Option>) {
  if (!options) {
    return null;
  }
  return (
    <Fragment>
      <option key="nonenone" value="">
        None
      </option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </Fragment>
  );
}

export default function ModalForm<T extends object>(props: Props<T>) {
  const [values, handleInputChange, clear] = useFormData<T>();

  useEffect(() => {
    if (!props.show) {
      clear();
    }
  }, [props.show]);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.onSubmit(values);
  }

  return (
    <Fragment>
      <Modal
        show={props.show}
        onHide={() => {
          props.onClose();
          clear();
        }}
        centered>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submit}>
            {props.templates.map((t) => (
              <Form.Group key={String(t.name)}>
                <Form.Label>{t.label}</Form.Label>
                <Form.Control
                  disabled={props.loading}
                  type={t.type}
                  name={t.name}
                  value={String(values[t.name] ?? t.defaultValue ?? "")}
                  onChange={handleInputChange}
                  as={asType(t.type)}>
                  {t.type === "select" ? generateOptions(t.options) : null}
                </Form.Control>
              </Form.Group>
            ))}

            <Button
              className="float-right"
              variant="primary"
              type="submit"
              disabled={props.loading}>
              {props.loading ? (
                <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
              ) : null}
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}
