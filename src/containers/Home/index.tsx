import { message, Type } from "components/MessageBox";
import ModalForm, { Template, Values } from "components/ModalForm";
import React, { Fragment, useState } from "react";
import { Button } from "react-bootstrap";

function Home() {
  function showMsg(t: Type) {
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
      <Button onClick={() => showMsg(Type.Success)}>Show success</Button>
      <Button onClick={() => showMsg(Type.Error)}>Show error</Button>
      <Button onClick={() => showMsg(Type.Info)}>Show info</Button>
      <Button onClick={() => setShow(true)}>show modal</Button>
      <ModalForm
        title="Test"
        loading={loading}
        templates={templates}
        show={show}
        onClose={() => setShow(false)}
        onSubmit={handleSubmit}
      />
    </Fragment>
  );
}

export default Home;
