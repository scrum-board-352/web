import React from "react";
import Error from "components/Error";
import { Button } from "react-bootstrap";

function Home() {
  function showError() {
    console.log("click");
    Error.show({
      title: "QwQ",
      content: Math.random().toString(),
    });
  }

  return (
    <>
      <h1>This is Home</h1>
      <Button onClick={showError}>Show Error</Button>
    </>
  );
}

export default Home;
