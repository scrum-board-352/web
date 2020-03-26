import Comment from "components/Comment";
import { message, Message } from "components/MessageBox";
import ModalForm, { Template, Values } from "components/ModalForm";
import React, { Fragment, useState } from "react";
import { Button } from "react-bootstrap";
import testTextPlaceholder from "utils/testTextPlaceholder";

function Home() {
  function showMsg(t: Message["type"]) {
    console.log("click");
    message({
      type: t,
      title: "Success!",
      content:
        "lorem ahsduhs iohioashdh a ioshdio hains hna okjnhjio sa n ijaoisn doihioah oihn o",
    });
  }

  const templates: Template[] = [
    {
      name: "Team name",
      type: "text",
    },
    {
      name: "value",
      type: "number",
    },
    {
      name: "Description",
      type: "textarea",
    },
  ];

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(values: Values) {
    setLoading(true);
    console.log(values);
    setTimeout(setLoading, 5000, false);
  }

  return (
    <Fragment>
      <h1>This is Home</h1>
      <Button onClick={() => showMsg("success")}>Show success</Button>
      <Button onClick={() => showMsg("error")}>Show error</Button>
      <Button onClick={() => showMsg("info")}>Show info</Button>
      <Button onClick={() => setShow(true)}>show modal</Button>
      <ModalForm
        title="Test"
        loading={loading}
        templates={templates}
        show={show}
        onClose={() => setShow(false)}
        onSubmit={handleSubmit}
      />
      <Comment
        name="Mokuo"
        commentTime="2020-03-25 13:00"
        content={testTextPlaceholder}
      />
    </Fragment>
  );
}

export default Home;
