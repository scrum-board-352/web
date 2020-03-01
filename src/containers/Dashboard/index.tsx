import React from "react";
import { IconContext } from "react-icons";
import {
  AiOutlineProject,
  AiOutlineUsergroupAdd,
  AiOutlineMessage,
} from "react-icons/ai";
import Sidebar from "components/Sidebar";
import "./style.css";
import Avatar from "components/Avatar";

export default function Dashboard() {
  return (
    <div className="d-flex">
      <Sidebar>
        <Sidebar.Title>
          <Avatar
            src="holder.js/50x50"
            name="Mokuo"
            size="50px"
            className="dashboard_sidebar_avatar"
          />
        </Sidebar.Title>
        <IconContext.Provider value={{ size: "20px" }}>
          <Sidebar.Items color="var(--dark)" activeColor="yellowgreen">
            <Sidebar.Item>
              <AiOutlineProject />
              <span className="ml-3">Projects</span>
            </Sidebar.Item>

            <Sidebar.Item>
              <AiOutlineUsergroupAdd />
              <span className="ml-3">Team</span>
            </Sidebar.Item>

            <Sidebar.Item>
              <AiOutlineMessage />
              <span className="ml-3">Messages</span>
            </Sidebar.Item>
          </Sidebar.Items>
        </IconContext.Provider>
      </Sidebar>
      <main className="dashboard_content_container">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla odio
        blanditiis corporis quisquam molestiae, voluptas placeat. Enim
        reiciendis ratione, culpa consectetur tenetur, sunt totam deserunt
        illum, obcaecati nobis exercitationem quod.
      </main>
    </div>
  );
}
