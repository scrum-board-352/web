import UserModel from "models/User";
import React from "react";

export type Props = {
  announcer: UserModel.PublicInfo;
  description: string;
  updateTime: string;
  isRead: boolean;
};

export default function Message(props: Props) {
  return <div></div>;
}
