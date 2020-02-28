import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import "./style.css";

export interface ErrorMessage {
  title: string;
  content: string;
  timerId?: number;
}

export interface ErrorFunc {
  (): JSX.Element;
  show(msg: ErrorMessage): void;
}

const AUTO_CLOSE_TIMEOUT = 4000;

let errorList: ErrorMessage[];
let setErrorList: React.Dispatch<React.SetStateAction<ErrorMessage[]>>;

function closeError(err: ErrorMessage) {
  const i = errorList.findIndex((elem) => elem === err);
  if (i < 0) {
    return;
  }
  clearTimeout(err.timerId);
  setErrorList([...errorList.slice(0, i), ...errorList.slice(i + 1)]);
}

// export show method.
(Error as ErrorFunc).show = (msg: ErrorMessage) => {
  setErrorList([...errorList, msg]);
  // auto-close after delay.
  msg.timerId = setTimeout(closeError, AUTO_CLOSE_TIMEOUT, msg);
};

function Error() {
  [errorList, setErrorList] = useState<ErrorMessage[]>([]);

  return (
    <div className="error_box">
      {errorList.map((err) => (
        <Alert
          key={Math.random()}
          variant="danger"
          show={true}
          dismissible
          onClose={() => closeError(err)}
        >
          <Alert.Heading>{err.title}</Alert.Heading>
          <p className="mb-0">{err.content}</p>
        </Alert>
      ))}
    </div>
  );
}

export default Error as ErrorFunc;
