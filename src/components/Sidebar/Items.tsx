import React, { ReactNode, Fragment } from "react";

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

  let activeItem: HTMLElement;
  const setActiveItem: SetActiveItem = (item: HTMLElement) => {
    if (activeItem === item) {
      return;
    }
    item.classList.add(ItemClass.Active);
    if (!activeItem) {
      activeItem = item;
      return;
    }
    activeItem.classList.remove(ItemClass.Active);
    activeItem = item;
  };

  const children = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { setActiveItem });
    }
  });

  return <Fragment>{children}</Fragment>;
}

export default Items as TItems;
