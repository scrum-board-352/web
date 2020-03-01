import React from "react";

export type TitleProps = {
  children: React.ReactNode;
};

export type TitleComp = React.FunctionComponent<TitleProps>;

function Title(props: TitleProps) {
  return <div className="sidebar_title_container">{props.children}</div>;
}

export default Title as TitleComp;
