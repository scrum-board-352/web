import React, { ReactNode } from "react";

enum ItemClass {
  Item = ".sidebar_item",
  Active = ".sidebar_item_active",
}

export type Props = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export type TItem = React.FunctionComponent<Props>;

function setActive(e: React.MouseEvent<HTMLButtonElement>) {
  const elem = e.target;
  document.querySelectorAll(ItemClass.Item).forEach((item) => {
    if (item.classList.contains(ItemClass.Active)) {
      if (item !== elem) {
        item.classList.remove(ItemClass.Active);
      }
      return;
    }
    if (item === elem) {
      item.classList.add(ItemClass.Active);
    }
  });
}

function Item(props: Props) {
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

export default Item as TItem;
