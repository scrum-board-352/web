import React, { ReactNode, useRef } from "react";
import { SetActiveItem } from "./Items";

export type Props = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export type TItem = React.FunctionComponent<Props>;

type _Props = Props & {
  setActiveItem: SetActiveItem;
};

function Item(props: _Props) {
  const itemRef = useRef<HTMLButtonElement>(null);
  const setActiveItem = props.setActiveItem;

  return (
    <button
      ref={itemRef}
      onClick={() => {
        setActiveItem(itemRef.current as HTMLButtonElement);
        props.onClick?.();
      }}
      className={`sidebar_item ${props.className ?? ""}`}
    >
      <div className="sidebar_item_content">{props.children}</div>
    </button>
  );
}

export default Item as TItem;
