import React from "react";
import style from "./style.module.css";

type Props = {
  message?: string;
  size?: string;
};

const noDataPlaceholderSvg = process.env.PUBLIC_URL + "/img/no_data.svg";

export default function Empty(props: Props) {
  return (
    <div className={style.empty} style={{ fontSize: props.size }}>
      <img src={noDataPlaceholderSvg} alt="" style={{ height: props.size ?? "10rem" }} />
      <p>{props.message ?? "There is nothing here..."}</p>
    </div>
  );
}
