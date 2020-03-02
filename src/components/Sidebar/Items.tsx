import React, { ReactNode } from "react";

export type Props = {
  children: ReactNode;
  color: string;
  activeColor: string;
};

export type TItems = React.FunctionComponent<Props>;

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

  return props.children;
}

export default Items as TItems;
