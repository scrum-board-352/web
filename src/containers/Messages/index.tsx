import { getCommentByReceiver, updateComment } from "api/Message";
import Checkbox from "components/Checkbox";
import Loading from "components/Loading";
import LoadingButton from "components/LoadingButton";
import useLoading from "hooks/useLoading";
import MessageModel from "models/Message";
import UserModel from "models/User";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useStore } from "rlax";
import { addItem, removeItem } from "utils/array";
import Message from "./Message";
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

  function gotoKanban(msg: MessageModel.InfoOutput) {
    const { projectId, boardId, cardId } = msg.posInfo;
    readMessage(msg.info.id);
    history.push(`projects/${projectId}/${boardId}?cardId=${cardId}`);
  }

  const [selectedMessageIds, setSelectedMessageIds] = useState<Array<string>>([]);
  const [selectAll, setSelectAll] = useState(false);

  function handleSelectAllClick(selectAll: boolean) {
    if (selectAll) {
      setSelectedMessageIds(comments.map((c) => c.info.id));
    } else {
      setSelectedMessageIds([]);
    }
    setSelectAll(selectAll);
  }

  function handleCheckStateChange(checked: boolean, id: string) {
    const nextSelectedMessageIds = checked
      ? addItem(selectedMessageIds, id)
      : removeItem(selectedMessageIds, id);
    setSelectedMessageIds(nextSelectedMessageIds);
  }

  async function readMessage(id: string) {
    const msg = comments.map((c) => c.info).find((msg) => msg.id === id);
    if (!msg || msg.isRead) {
      return;
    }
    return await updateComment({
      id,
      read: true,
    });
  }

  const [markAsReadLoading, setMarkAsReadLoading] = useState(false);

  async function handleMarkAsReadClick() {
    setMarkAsReadLoading(true);
    const readMessageIds = (await Promise.all(selectedMessageIds.map(readMessage))).map(
      (msg) => msg?.id
    );
    setMarkAsReadLoading(false);
    setComments((comments) =>
      comments.map((c) => {
        if (readMessageIds.includes(c.info.id)) {
          c.info.isRead = true;
        }
        return c;
      })
    );
  }

  return loading ? (
    <Loading />
  ) : (
    <Container fluid className="dashboard_page_container">
      <Row className="align-item-center">
        <h1>Messages</h1>
      </Row>
      <Row>
        <div className="messages_message_container">
          <div className="messages_message_control">
            <Checkbox size="1rem" onChange={handleSelectAllClick} />
            <span>Select All</span>
            <LoadingButton
              text="Mark As Read"
              loadingText="Marking..."
              loading={markAsReadLoading}
              size="sm"
              onClick={handleMarkAsReadClick}
            />
          </div>
          {comments.map((msg) => (
            <Message
              key={msg.info.id}
              message={msg.info}
              onClick={() => gotoKanban(msg)}
              checked={selectAll}
              onCheckStateChange={handleCheckStateChange}
            />
          ))}
        </div>
      </Row>
    </Container>
  );
}
