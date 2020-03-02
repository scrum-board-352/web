import React from "react";

export type Props = {
  children: React.ReactNode;
};

export type TTitle = React.FunctionComponent<Props>;

function Title(props: Props) {
  return <div className="sidebar_title_container">{props.children}</div>;
}

export default Title as TTitle;
