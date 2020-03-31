import Loading from "components/Loading";
import { getCommentByReceiver } from "graphql/Message";
import useLoading from "hooks/useLoading";
import MessageModel from "models/Message";
import UserModel from "models/User";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useStore } from "rlax";
import { dateDistance } from "utils/date";
import Message from "./Message";
import MessageContainer from "./MessageContainer";
import "./style.css";

export default function Messages() {
  const [comments, setComments] = useState<Array<MessageModel.InfoOutput>>([]);
  const [loading, loadingOps] = useLoading();
  const currentUser: UserModel.PrivateInfo = useStore("user");

  useEffect(() => {
    // fetch messages.
    loadingOps(async () => {
      const comments = await loadingOps(getCommentByReceiver, { receiver: currentUser.name });
      setComments(comments);
    });
  }, []);

  const history = useHistory();

  function gotoKanban(posInfo: MessageModel.PosInfo) {
    const { projectId, boardId, cardId } = posInfo;
    history.push(`projects/${projectId}/${boardId}?cardId=${cardId}`);
  }

  return loading ? (
    <Loading />
  ) : (
    <Container fluid className="dashboard_page_container">
      <Row className="align-item-center">
        <h1>Messages</h1>
      </Row>
      <Row>
        <MessageContainer>
          {comments.map((msg) => (
            <Message
              key={msg.info.id}
              announcer={msg.info.announcer}
              description={msg.info.description}
              updateTime={dateDistance(msg.info.updateTime)}
              isRead={msg.info.isRead}
              onClick={() => gotoKanban(msg.posInfo)}
            />
          ))}
        </MessageContainer>
      </Row>
    </Container>
  );
}
