import Avatar from "components/Avatar";
import Checkbox from "components/Checkbox";
import UserModel from "models/User";
import React from "react";
import { Badge } from "react-bootstrap";

export type Props = {
  announcer: UserModel.PublicInfo;
  description: string;
  updateTime: string;
  isRead: boolean;
  onClick?: () => void;
};

export type TMessage = React.FunctionComponent<Props>;

export default function Message(props: Props) {
  return (
    <div className="messages_message" onClick={props.onClick}>
      <Checkbox size="1rem" />

      <Avatar
        className="messages_message_avatar"
        name={props.announcer.name}
        avatar={props.announcer.avatar}
        size="2rem"
        namePosition="right"
        gap="0.8rem"
      />

      {props.isRead ? (
        <Badge pill variant="info">
          已读
        </Badge>
      ) : (
        <Badge pill variant="danger">
          未读
        </Badge>
      )}

      <div className="messages_message_description_wrapper">
        <p className="messages_message_description">{props.description}</p>
        <div className="messages_message_description_mask"></div>
      </div>

      <time>{props.updateTime}</time>
    </div>
  );
}
