import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import testUserData from "utils/testUserData";
import Message from "./Message";
import "./style.css";

export default function Messages() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    // TODO: fetch messages.
    const messages = [
      {
        id: 1,
        announcer: testUserData.publicInfo.mokuo,
        description: "还在睡！起来修Bug！Pipeline都红成猴屁股了！",
        updateTime: "2020-03-01",
        isRead: false,
      },
    ];
    setMessages(messages);
  }, []);

  return (
    <Container fluid className="dashboard_page_container">
      <Row className="align-item-center">
        <h1>Messages</h1>
      </Row>
      <Row className="flex-column">
        {messages.map((msg) => (
          <Message
            announcer={msg.announcer}
            description={msg.description}
            updateTime={msg.updateTime}
            isRead={msg.isRead}
          />
        ))}
      </Row>
    </Container>
  );
}
