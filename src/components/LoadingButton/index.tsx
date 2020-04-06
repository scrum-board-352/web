import React from "react";
import { Button, ButtonProps, Spinner } from "react-bootstrap";

type Props = {
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  text: string;
  loadingText?: string;
  loading: boolean;
  onClick?: () => void;
};

export default function LoadingButton(props: Props) {
  return (
    <Button
      variant={props.variant}
      disabled={props.loading}
      size={props.size}
      onClick={props.onClick}>
      {props.loading ? (
        <>
          <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
          {props.loadingText ?? "Loading..."}
        </>
      ) : (
        props.text
      )}
    </Button>
  );
}
