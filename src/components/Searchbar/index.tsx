import React, { useRef, useState } from "react";
import { GoSearch } from "react-icons/go";
import "./style.css";

export type Props = {
  className?: string;
  type?: "line" | "round";
  size?: string;
  color?: string;
  activeColor?: string;
  placeholder?: string;
  onChange?: (newVal: string) => void;
  onSearch?: (val: string) => void;
};

function typeClass(type: Props["type"]) {
  switch (type) {
    case "line":
      return "searchbar_input_line";

    case "round":
      return "rounded-pill searchbar_input_round";

    default:
      return "";
  }
}

export default function Searchbar(props: Props) {
  const type = props.type ?? "line";
  const size = props.size ?? "1.2rem";
  const color = props.color ?? "var(--gray)";
  const activeColor = props.activeColor ?? "var(--blue)";

  const searchTextRef = useRef<string>("");
  const [focus, setFocus] = useState(false);

  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode !== 13) {
      return;
    }
    props.onSearch?.(searchTextRef.current);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    searchTextRef.current = e.target.value;
    props.onChange?.(e.target.value);
  }

  function handleClick() {
    props.onSearch?.(searchTextRef.current);
  }

  const currentColor = focus ? activeColor : color;

  return (
    <div
      className={`${props.className ?? ""} searchbar`}
      style={{
        height: size,
        fontSize: size,
      }}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}>
      <input
        placeholder={props.placeholder}
        type="text"
        onKeyUp={handleEnter}
        onChange={handleChange}
        className={typeClass(type)}
        style={{
          borderColor: currentColor,
          caretColor: currentColor,
        }}
      />
      <button onClick={handleClick} style={{ color: currentColor }}>
        <GoSearch style={{ height: "70%" }} />
      </button>
    </div>
  );
}
