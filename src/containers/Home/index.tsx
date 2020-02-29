import React from "react";
import { Type, message } from "components/MessageBox";
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

  return (
    <>
      <h1>This is Home</h1>
      <Button onClick={() => showMsg(Type.Success)}>Show success</Button>
      <Button onClick={() => showMsg(Type.Error)}>Show error</Button>
      <Button onClick={() => showMsg(Type.Info)}>Show info</Button>
    </>
  );
}

export default Home;
