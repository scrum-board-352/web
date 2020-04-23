import useFormData, { Filters, Validators } from "hooks/useFormData";
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
  min?: number;
  max?: number;
  step?: number;
  options?: Array<Option>;
  required?: boolean;
  defaultValue?: string | number;
  validator?: (value: string | number | undefined) => boolean;
  filter?: ((value: string) => string) | ((value: number) => number);
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

function generateOptions(required?: boolean, options?: Array<Option>) {
  if (!options) {
    return null;
  }
  return (
    <Fragment>
      {required ? null : (
        <option key="nonenone" value="">
          None
        </option>
      )}
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </Fragment>
  );
}

function getDefaultValues<T extends object>(templates: Array<Template<T>>) {
  const values: Partial<T> = {};
  for (const t of templates) {
    if (Object.prototype.hasOwnProperty.call(t, "defaultValue")) {
      Reflect.set(values, t.name, t.defaultValue);
    }
  }
  return values;
}

function getValidators<T extends object>(templates: Array<Template<T>>) {
  const validators = {} as Validators<T>;
  for (const t of templates) {
    if (typeof t.validator === "function") {
      Reflect.set(validators, t.name, t.validator);
    }
  }
  return validators;
}

function getFilters<T extends object>(templates: Array<Template<T>>) {
  const filters = {} as Filters<T>;
  for (const t of templates) {
    if (typeof t.filter === "function") {
      Reflect.set(filters, t.name, t.filter);
    }
  }
  return filters;
}

export default function ModalForm<T extends object>(props: Props<T>) {
  const {
    rawData: rawValues,
    setRef: setFormElementRef,
    handleInputChange,
    clear,
    isFieldValid,
    getData,
  } = useFormData<T>(
    getDefaultValues(props.templates),
    getValidators(props.templates),
    getFilters(props.templates)
  );

  useEffect(() => {
    if (!props.show) {
      clear();
    }
  }, [props.show]);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const values = getData();
    if (values) {
      props.onSubmit(values as T);
    }
  }

  return (
    <Fragment>
      <Modal show={props.show} onHide={props.onClose} onExited={clear} centered>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submit}>
            {props.templates.map((t) => (
              <Form.Group key={String(t.name)}>
                <Form.Label>{t.label}</Form.Label>
                <Form.Control
                  ref={(elem) => setFormElementRef(elem as any)}
                  disabled={
                    props.loading || (t.type === "select" && Number(t.options?.length) === 0)
                  }
                  required={t.required}
                  isInvalid={!isFieldValid(t.name)}
                  type={t.type}
                  name={t.name}
                  value={String(rawValues[t.name] ?? t.defaultValue ?? "")}
                  min={t.min ?? ""}
                  max={t.max ?? ""}
                  step={t.step ?? ""}
                  onChange={handleInputChange}
                  as={asType(t.type)}>
                  {t.type === "select" ? generateOptions(t.required, t.options) : null}
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
