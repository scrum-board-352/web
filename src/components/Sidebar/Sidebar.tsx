import React, { Fragment, useEffect, useRef, useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

export type Props = {
  children?: React.ReactNode;
  backgroundColor?: string;
};

export type TSidebar = React.FunctionComponent<Props>;

function Sidebar(props: Props) {
  const [show, setShow] = useState(true);
  const sidebarContainerRef = useRef<HTMLDivElement>(null);
  const sidebarHolderRef = useRef<HTMLDivElement>(null);

  function toggleShow() {
    setShow(!show);
    const sidebarContainer = sidebarContainerRef.current as HTMLDivElement;
    const sidebarHolder = sidebarHolderRef.current as HTMLDivElement;
    const width = sidebarContainer.offsetWidth;
    sidebarContainer.style.marginLeft = sidebarHolder.style.marginLeft = show ? `-${width}px` : "0px";
  }

  useEffect(() => {
    const sidebarContainer = sidebarContainerRef.current as HTMLDivElement;
    const sidebarHolder = sidebarHolderRef.current as HTMLDivElement;
    const width = sidebarContainer.offsetWidth;
    sidebarHolder.style.minWidth = `${width}px`;
  });

  return (
    <Fragment>
      <div ref={sidebarContainerRef} className={`sidebar_container shadow ${show ? "sidebar_show" : "sidebar_hide"}`}>
        <div className="sidebar" style={{ backgroundColor: props.backgroundColor }}>
          <button className="sidebar_toggle_btn iconshadow" onClick={toggleShow}>
            {show ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
          </button>
          <div className="sidebar_content_container">{props?.children}</div>
        </div>
      </div>
      <div ref={sidebarHolderRef} className={`sidebar_holder ${show ? "sidebar_show" : "sidebar_hide"}`}></div>
    </Fragment>
  );
}

export default Sidebar as TSidebar;
