import React from "react";
import "./style.css";

export type AvatarProps = {
  src: string;
  name: string;
  size: string;
  className?: string;
};

export default function Avatar(props: AvatarProps) {
  return (
    <div className={`avatar_container ${props.className ?? ""}`}>
      <img className="avatar_img" src={props.src} width={props.size} alt="" />
      <span className="avatar_name">{props.name}</span>
    </div>
  );
}
