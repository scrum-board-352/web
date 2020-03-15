import React from "react";
import style from "./style.module.css";

type Props = {
  picture: string;
  content: string;
};

export default function Placeholder(props: Props) {
  return (
    <div className={style.placeholder}>
      <img src={props.picture} alt="" width="100px" />
      <p>{props.content}</p>
    </div>
  );
}
