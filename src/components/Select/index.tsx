import React from "react";
import style from "./style.module.css";

export interface Option {
  name: string;
  value: string;
}

type Props = {
  options: Option[];
  defaultValue: string;
  onChange: (value: string) => void;
};

export default function Select(props: Props) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    props.onChange(e.target.value);
  }

  return (
    <select onChange={handleChange} value={props.defaultValue} className={style.select}>
      {props.options.map((o) => (
        <option key={o.name} value={o.value}>
          {o.name}
        </option>
      ))}
    </select>
  );
}
