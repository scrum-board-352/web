import React, { useState, useEffect, Fragment } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

export type SidebarProps = {
  children?: React.ReactNode;
  backgroundColor?: string;
};

export type SidebarComp = React.FunctionComponent<SidebarProps>;

function Sidebar(props: SidebarProps) {
  const [show, setShow] = useState(true);
  let sidebarContainer: HTMLElement;
  let sidebarHolder: HTMLElement;

  function toggleShow() {
    setShow(!show);
    const width = sidebarContainer.offsetWidth;
    sidebarContainer.style.marginLeft = sidebarHolder.style.marginLeft = show
      ? `-${width}px`
      : "0px";
  }

  useEffect(() => {
    const width = sidebarContainer.offsetWidth;
    sidebarHolder.style.minWidth = `${width}px`;
  });

  return (
    <Fragment>
      <div
        ref={(e) => (sidebarContainer = e as HTMLElement)}
        className={`sidebar_container shadow ${
          show ? "sidebar_show" : "sidebar_hide"
        }`}
      >
        <div
          className="sidebar"
          style={{ backgroundColor: props.backgroundColor }}
        >
          <button
            className="sidebar_toggle_btn trans hover_shadow"
            onClick={toggleShow}
          >
            {show ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
          </button>
          <div className="sidebar_content_container">{props?.children}</div>
        </div>
      </div>
      <div
        ref={(e) => (sidebarHolder = e as HTMLElement)}
        className={`sidebar_holder ${show ? "sidebar_show" : "sidebar_hide"}`}
      ></div>
    </Fragment>
  );
}

export default Sidebar as SidebarComp;
