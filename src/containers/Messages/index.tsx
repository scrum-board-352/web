import MessageModel from "models/Message";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import testMessageData from "utils/testMessageData";
import Message from "./Message";
import MessageContainer from "./MessageContainer";
import "./style.css";

export default function Messages() {
  const [messages, setMessages] = useState<MessageModel.Info[]>([]);

  useEffect(() => {
    // TODO: fetch messages.
    const messages = [testMessageData.info.msg1, testMessageData.info.msg2];
    setMessages(messages);
  }, []);

  return (
    <Container fluid className="dashboard_page_container">
      <Row className="align-item-center">
        <h1>Messages</h1>
      </Row>
      <Row>
        <MessageContainer>
          {messages.map((msg) => (
            <Message
              key={msg.id}
              announcer={msg.announcer}
              description={msg.description}
              updateTime={msg.updateTime}
              isRead={msg.isRead}
            />
          ))}
        </MessageContainer>
      </Row>
    </Container>
  );
}
