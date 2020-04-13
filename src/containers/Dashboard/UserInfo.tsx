import auth from "api/base/auth";
import { logout } from "api/User";
import { message } from "components/MessageBox";
import SettingButton from "components/SettingButton";
import { MenuItem } from "components/SettingButton/Menu";
import UserModel from "models/User";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import avatar from "utils/avatar";
import { clearUserState } from "utils/clear";
import style from "./user-info.module.css";

type Props = {
  user: UserModel.PrivateInfo;
};

export default function UserInfo(props: Props) {
  const history = useHistory();
  const userPageUrl = `/user/${props.user.name}`;

  function gotoProfilePage() {
    history.push(userPageUrl);
  }

  async function logoutCurrentUser() {
    message({
      title: "Logging out...",
      type: "info",
    });
    const res = await auth(null, logout, { username: props.user.name });
    if (res.success) {
      message({
        title: "Logout Succeed!",
        type: "success",
        content: res.message,
      });
      clearUserState();
      history.push("/login");
    } else {
      message({
        title: "Logout Failed!",
        type: "error",
        content: res.message,
      });
    }
  }

  const menu: Array<MenuItem> = [
    {
      label: "Your profile",
      onClick: gotoProfilePage,
    },
    {
      label: "Log out",
      onClick: logoutCurrentUser,
    },
  ];

  return (
    <div className={style.user_info}>
      <Link to={userPageUrl}>
        <img className={style.avatar} src={avatar(props.user.avatar)} alt="" />
      </Link>
      <div className={style.name}>
        <span>{props.user.name}</span>
        <SettingButton type="down-arrow" size="1rem" menuItems={menu} />
      </div>
      <p className={style.email}>{props.user.email}</p>
    </div>
  );
}
