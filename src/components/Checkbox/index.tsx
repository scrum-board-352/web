import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import style from "./style.module.css";

export type Props = {
  size: string;
  onChange?: (checked: boolean) => void;
};

export default function Checkbox(props: Props) {
  const [checked, setChecked] = useState(false);

  function handleClick() {
    const nextChecked = !checked;
    props.onChange?.(nextChecked);
    setChecked(nextChecked);
  }

  return (
    <span
      className={style.checkbox}
      style={{ width: props.size, height: props.size }}
      onClick={handleClick}
    >
      {checked ? <FaCheck size="95%" /> : null}
    </span>
  );
}
