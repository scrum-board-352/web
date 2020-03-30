import React from "react";
import style from "./style.module.css";

type Props = {
  message?: string;
  size?: string;
  children?: React.ReactNode;
};

const noDataPlaceholderSvg = process.env.PUBLIC_URL + "/img/no_data.svg";

export default function Empty(props: Props) {
  const size = props.size ?? "10rem";
  const fontSize = parseFloat(size) * 0.15 + "rem";

  return (
    <div className={style.empty}>
      <img src={noDataPlaceholderSvg} alt="" style={{ height: size }} />
      <p style={{ fontSize }}>{props.message ?? "There is nothing here..."}</p>
      {props.children}
    </div>
  );
}
