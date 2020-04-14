import SettingButton, { MenuItem } from "components/SettingButton";
import React from "react";
import avatar from "utils/avatar";
import style from "./style.module.css";

type Props = {
  avatar?: string;
  name: string;
  commentTime: string;
  content: string;
  menuItems?: Array<MenuItem>;
};

export default function Comment(props: Props) {
  return (
    <div className={style.comment}>
      <div className="avatar_container">
        <img src={avatar(props.avatar)} alt="" className={style.avatar} />
      </div>
      <div className={style.content_container}>
        <div className={style.info}>
          <span className={style.username}>{props.name}</span>
          <span className={style.dot}>·</span>
          <span className={style.time}>{props.commentTime}</span>
          <SettingButton type="dot-v" size="1.2rem" menuItems={props.menuItems} />
        </div>
        <p className={style.content}>{props.content}</p>
      </div>
    </div>
  );
}
