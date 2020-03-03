import React, { ReactNode, useRef, useContext } from "react";
import { ItemContext } from "./Items";

export type Props = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export type TItem = React.FunctionComponent<Props>;

function Item(props: Props) {
  const itemRef = useRef<HTMLButtonElement>(null);
  const { setActiveItem } = useContext(ItemContext);

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
