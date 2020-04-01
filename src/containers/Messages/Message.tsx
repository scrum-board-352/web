import Avatar from "components/Avatar";
import Checkbox from "components/Checkbox";
import MessageModel from "models/Message";
import React from "react";
import { Badge } from "react-bootstrap";
import { dateDistance } from "utils/date";

export type Props = {
  message: MessageModel.Info;
  checked: boolean;
  onCheckStateChange?: (checked: boolean, id: string) => void;
  onClick?: () => void;
};

export type TMessage = React.FunctionComponent<Props>;

export default function Message(props: Props) {
  return (
    <div className="messages_message" onClick={props.onClick}>
      <Checkbox
        size="1rem"
        onChange={(checked) => {
          props.onCheckStateChange?.(checked, props.message.id);
        }}
        checked={props.checked}
      />

      <Avatar
        className="messages_message_avatar"
        name={props.message.announcer.name}
        avatar={props.message.announcer.avatar}
        size="2rem"
        namePosition="right"
        gap="0.8rem"
      />

      {props.message.isRead ? (
        <Badge pill variant="info">
          已读
        </Badge>
      ) : (
        <Badge pill variant="danger">
          未读
        </Badge>
      )}

      <div className="messages_message_description_wrapper">
        <p className="messages_message_description">{props.message.description}</p>
        <div className="messages_message_description_mask"></div>
      </div>

      <time>{dateDistance(props.message.updateTime)}</time>
    </div>
  );
}
