import _Sidebar, { SidebarComp as _SidebarComp } from "./Sidebar";
import Title, { TitleComp } from "./Title";
import Item, { ItemComp } from "./Item";
import Items, { ItemsComp } from "./Items";
import "./style.css";

export type SidebarComp = _SidebarComp & {
  Title: TitleComp;
  Items: ItemsComp;
  Item: ItemComp;
};

const Sidebar: SidebarComp = _Sidebar as SidebarComp;
Sidebar.Title = Title;
Sidebar.Items = Items;
Sidebar.Item = Item;

export default Sidebar;
