import React from "react";
import { Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
      <Spinner animation="grow" variant="primary" />
      <p className="mt-3 font-weight-bold" style={{ fontSize: "1.5rem" }}>
        Loading...
      </p>
    </div>
  );
}
