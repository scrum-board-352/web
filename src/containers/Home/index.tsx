import { message, Message } from "components/MessageBox";
import ModalForm, { Template } from "components/ModalForm";
import SettingButton, { MenuItem } from "components/SettingButton";
import React, { Fragment, useState } from "react";
import { Button } from "react-bootstrap";

function Home() {
  function showMsg(t: Message["type"]) {
    console.log("click");
    message({
      timeout: 400000,
      type: t,
      title: `${t.slice(0, 1).toUpperCase() + t.slice(1)}!`,
      // content: "message",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    });
  }

  type FormDataType = {
    teamName: string;
    value: number;
    description: string;
    iteration: string;
  };

  const templates: Template<FormDataType>[] = [
    {
      name: "teamName",
      label: "Team name",
      type: "text",
      filter(name: string) {
        return "[" + name + "]";
      },
    },
    {
      name: "value",
      label: "value",
      type: "number",
      required: true,
      min: 1,
      max: 4,
      validator(value: number) {
        if (!value) {
          return false;
        }
        return Number(value) > 5 ? false : true;
      },
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
    },
    {
      name: "iteration",
      label: "Iteration",
      type: "select",
      required: true,
      defaultValue: "1",
      options: [
        {
          label: "1",
          value: "1",
        },
      ],
      validator(value: string) {
        return value !== undefined;
      },
    },
  ];

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(values: FormDataType) {
    setLoading(true);
    console.log(values);
    setTimeout(setLoading, 5000, false);
  }

  const menuItems: Array<MenuItem> = [
    {
      label: "Item 1",
      onClick: () => alert(1),
    },
    {
      label: "Item 2",
      onClick: () => alert(2),
    },
    {
      label: "Item 3",
      onClick: () => alert(3),
    },
    {
      label: "Item 4",
      onClick: () => alert(4),
    },
  ];

  return (
    <Fragment>
      <h1>This is Home</h1>
      <Button onClick={() => showMsg("success")}>Show success</Button>
      <Button onClick={() => showMsg("error")}>Show error</Button>
      <Button onClick={() => showMsg("info")}>Show info</Button>
      <Button onClick={() => setShow(true)}>show modal</Button>
      <ModalForm<FormDataType>
        title="Test"
        loading={loading}
        templates={templates}
        show={show}
        onClose={() => setShow(false)}
        onSubmit={handleSubmit}
      />
      <SettingButton type="gear" menuItems={menuItems} size="1rem" />
    </Fragment>
  );
}

export default Home;
