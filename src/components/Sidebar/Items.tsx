import React, { ReactNode, Fragment, useRef } from "react";

export type Props = {
  children: ReactNode;
  color: string;
  activeColor: string;
};

export type TItems = React.FunctionComponent<Props>;

export type SetActiveItem = (item: HTMLElement) => void;

enum ItemClass {
  Active = "sidebar_item_active",
}

const styleElem = document.head.appendChild(document.createElement("style"));

function Items(props: Props) {
  styleElem.innerHTML = `
    .sidebar_item {
      color: ${props.color};
    }

    .sidebar_item_active,
    .sidebar_item:hover {
      color: ${props.activeColor};
    }

    .sidebar_item::before {
      opacity: 0.1;
      background-color: ${props.activeColor};
    }

    .sidebar_item::after {
      background-color: ${props.activeColor};
    }
    `;

  const activeItemRef = useRef<HTMLElement>();
  const setActiveItem: SetActiveItem = (item: HTMLElement) => {
    if (activeItemRef.current === item) {
      return;
    }
    item.classList.add(ItemClass.Active);
    if (!activeItemRef.current) {
      activeItemRef.current = item;
      return;
    }
    activeItemRef.current.classList.remove(ItemClass.Active);
    activeItemRef.current = item;
  };

  const children = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { setActiveItem });
    }
  });

  return <Fragment>{children}</Fragment>;
}

export default Items as TItems;
