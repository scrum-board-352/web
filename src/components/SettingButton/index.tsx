import React, { useRef } from "react";
import { IoMdMore, IoMdSettings } from "react-icons/io";
import { MdKeyboardArrowDown, MdMoreHoriz } from "react-icons/md";
import style from "./style.module.css";

export interface MenuItem {
  label: string;
  onClick?: () => void;
}

function initMenu() {
  const menu = document.createElement("div");
  menu.classList.add(style.menu);
  document.body.appendChild(menu);
  return menu;
}

const menu = initMenu();

let curBtn: HTMLButtonElement | null = null;

function isMenuShowing() {
  return menu.classList.contains(style.show);
}

function clearMenu() {
  while (menu.firstChild) {
    menu.removeChild(menu.lastChild as Node);
  }
}

function setMenuItems(items?: Array<MenuItem>) {
  clearMenu();
  if (!items) {
    return;
  }
  const f = document.createDocumentFragment();
  for (const item of items) {
    const itemElem = document.createElement("button");
    itemElem.appendChild(document.createTextNode(item.label));
    itemElem.classList.add(style.item);
    if (item.onClick) {
      itemElem.addEventListener("click", item.onClick);
    }
    f.appendChild(itemElem);
  }
  menu.appendChild(f);
}

function updateMenuAndShow(pageX: number, pageY: number, menuItems?: Array<MenuItem>) {
  setMenuItems(menuItems);
  const rect = menu.getBoundingClientRect();
  const menuWidth = rect.width;
  const menuHeight = rect.height;
  const availableRight = window.innerWidth - pageX;
  const availableBottom = window.innerHeight - pageY;
  menu.style.left = `${availableRight < menuWidth ? pageX - menuWidth : pageX}px`;
  menu.style.top = `${availableBottom < menuHeight ? pageY - menuHeight : pageY}px`;
  menu.classList.add(style.show);
}

function hideMenu(cb: any) {
  menu.classList.remove(style.show);
  if (typeof cb === "function") {
    menu.addEventListener("transitionend", cb, { once: true });
  }
  removeHideMenuHandler();
}

const hideMenuEvents = ["click", "wheel"];

function removeHideMenuHandler() {
  hideMenuEvents.forEach((eventName) => {
    document.removeEventListener(eventName, hideMenu);
  });
}

function setHideMenuEventHandler() {
  hideMenuEvents.forEach((eventName) => {
    document.addEventListener(eventName, hideMenu, { once: true });
  });
}

type Props = {
  size?: string;
  color?: string;
  hoverColor?: string;
  type?: "dot-v" | "dot-h" | "gear" | "down-arrow";
  menuItems?: Array<MenuItem>;
};

function icon(type: Props["type"]) {
  switch (type) {
    case "dot-v":
      return <IoMdMore size="100%" />;
    case "dot-h":
      return <MdMoreHoriz size="100%" />;
    case "gear":
      return <IoMdSettings size="100%" />;
    case "down-arrow":
      return <MdKeyboardArrowDown size="100%" />;
    default:
      return <></>;
  }
}

export default function SettingButton(props: Props) {
  const type = props.type ?? "gear";
  const btnRef = useRef<HTMLButtonElement>(null);

  function showMenu(e: React.MouseEvent) {
    e.stopPropagation();

    const isShowing = isMenuShowing();
    if (isShowing && btnRef.current === curBtn) {
      return;
    }
    curBtn = btnRef.current;

    const { pageX, pageY } = e;

    if (isShowing) {
      hideMenu(() => updateMenuAndShow(pageX, pageY, props.menuItems));
    } else {
      updateMenuAndShow(pageX, pageY, props.menuItems);
    }

    setHideMenuEventHandler();
  }

  return (
    <button
      ref={btnRef}
      onMouseEnter={() => {
        const btn = btnRef.current;
        if (btn !== null) {
          btn.style.color = props.hoverColor ?? "";
        }
      }}
      onMouseLeave={() => {
        const btn = btnRef.current;
        if (btn !== null) {
          btn.style.color = props.color ?? "";
        }
      }}
      className={style.setting_btn}
      style={{
        color: props.color ?? "",
        width: props.size ?? "",
        height: props.size ?? "",
      }}
      onClick={showMenu}>
      {icon(type)}
    </button>
  );
}
