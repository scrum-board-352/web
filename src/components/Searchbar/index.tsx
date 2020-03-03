import React, { useRef, useState } from "react";
import { GoSearch } from "react-icons/go";
import "./style.css";

export type Props = {
  size: string;
  color: string;
  activeColor: string;
  placeholder?: string;
  onChange?: (newVal: string) => void;
  onSearch: (val: string) => void;
};

export default function Searchbar(props: Props) {
  const searchTextRef = useRef<string>("");
  const [focus, setFocus] = useState(false);

  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode !== 13) {
      return;
    }
    props.onSearch(searchTextRef.current);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    searchTextRef.current = e.target.value;
    props.onChange?.(e.target.value);
  }

  function handleClick() {
    props.onSearch(searchTextRef.current);
  }

  const color = focus ? props.activeColor : props.color;

  return (
    <div
      className="searchbar"
      style={{
        height: props.size,
        fontSize: props.size,
        color: color,
      }}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      <input
        placeholder={props.placeholder}
        type="text"
        onKeyUp={handleEnter}
        onChange={handleChange}
        style={{
          color: props.color,
          borderBottomColor: color,
          caretColor: color,
        }}
      />
      <button onClick={handleClick}>
        <GoSearch size="80%" />
      </button>
    </div>
  );
}
