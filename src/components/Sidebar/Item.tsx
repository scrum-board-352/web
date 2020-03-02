import React, { ReactNode } from "react";

export type ItemProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export type ItemComp = React.FunctionComponent<ItemProps>;

function setActive(e: React.MouseEvent<HTMLButtonElement>) {
  const elem = e.target;
  document.querySelectorAll(".sidebar_item").forEach((item) => {
    if (item.classList.contains("sidebar_item_active")) {
      if (item !== elem) {
        item.classList.remove("sidebar_item_active");
      }
      return;
    }
    if (item === elem) {
      item.classList.add("sidebar_item_active");
    }
  });
}

function Item(props: ItemProps) {
  return (
    <button
      onClick={(e) => {
        setActive(e);
        props.onClick?.();
      }}
      className={`sidebar_item ${props.className ?? ""}`}
    >
      <div className="sidebar_item_content">{props.children}</div>
    </button>
  );
}

export default Item as ItemComp;
