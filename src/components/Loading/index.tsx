import React from "react";
import { Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
      <Spinner animation="grow" variant="primary" />
    </div>
  );
}
