import Checkbox from "components/Checkbox";
import React, { Fragment } from "react";
import { Button } from "react-bootstrap";
import { TMessage } from "./Message";

export type Props = {
  children: React.ReactElement<TMessage>[];
};

export default function MessageContainer(props: Props) {
  return (
    <Fragment>
      <div className="messages_message_container">
        <div className="messages_message_control">
          <Checkbox size="1rem" />
          <span>Select All</span>
          <Button size="sm" variant="outline-primary">
            Mark as read
          </Button>
        </div>
        {props.children}
      </div>
    </Fragment>
  );
}
