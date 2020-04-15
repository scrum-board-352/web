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
let lastClickedBtn: HTMLButtonElement | null = null;
const menuItemElemPool: Array<HTMLButtonElement> = [];

function putMenuItemElemToPool(btn: HTMLButtonElement) {
  menuItemElemPool.push(btn);
}

function getMenuItemElem(item: MenuItem) {
  let btn = menuItemElemPool.shift();
  if (!btn) {
    btn = document.createElement("button");
    btn.classList.add(style.item);
  }
  btn.textContent = item.label;
  btn.onclick = item.onClick ?? null;
  return btn;
}

function isMenuShowing() {
  return menu.classList.contains(style.show);
}

function clearMenu() {
  const buttons = menu.children;
  const len = buttons.length;
  for (let i = 0; i < len; i++) {
    putMenuItemElemToPool(buttons[i] as HTMLButtonElement);
  }

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
    const itemElem = getMenuItemElem(item);
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
  removeHideMenuEventHandler();
}

const hideMenuEvents = ["click", "wheel"];

function removeHideMenuEventHandler() {
  hideMenuEvents.forEach((eventName) => {
    document.removeEventListener(eventName, hideMenu);
  });
}

function setHideMenuEventHandler() {
  hideMenuEvents.forEach((eventName) => {
    document.addEventListener(eventName, hideMenu, { once: true });
  });
}

export function showMenuClickHandler(
  e: React.MouseEvent<HTMLButtonElement>,
  menuItems?: Array<MenuItem>
) {
  e.stopPropagation();

  const isShowing = isMenuShowing();
  if (isShowing && e.target === lastClickedBtn) {
    return;
  }
  lastClickedBtn = e.target as HTMLButtonElement;

  const { pageX, pageY } = e;

  if (isShowing) {
    hideMenu(() => updateMenuAndShow(pageX, pageY, menuItems));
  } else {
    updateMenuAndShow(pageX, pageY, menuItems);
  }

  setHideMenuEventHandler();
}
