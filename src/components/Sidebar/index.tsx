import Item, { TItem } from "./Item";
import Items, { TItems } from "./Items";
import _Sidebar, { TSidebar as _TSidebar } from "./Sidebar";
import "./style.css";
import Title, { TTitle } from "./Title";

export type TSidebar = _TSidebar & {
  Title: TTitle;
  Items: TItems;
  Item: TItem;
};

const Sidebar = _Sidebar as TSidebar;
Sidebar.Title = Title;
Sidebar.Items = Items;
Sidebar.Item = Item;

export default Sidebar;
