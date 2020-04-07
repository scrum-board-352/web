import auth from "api/base/auth";
import { createComment, selectCommentsByCardId } from "api/Message";
import Comment from "components/Comment";
import Empty from "components/Empty";
import Loading from "components/Loading";
import useLoading from "hooks/useLoading";
import CardModel from "models/Card";
import MessageModel from "models/Message";
import UserModel from "models/User";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Badge, Modal, Spinner } from "react-bootstrap";
import { FiMessageSquare } from "react-icons/fi";
import ScrollBox from "react-responsive-scrollbox";
import { useStore } from "rlax";
import avatar from "utils/avatar";
import className from "utils/class-name";
import { dateDistance } from "utils/date";
import style from "./card-detail.module.css";
import Priority from "./Priority";

type Props = {
  show: boolean;
  onHide?: () => void;
  projectId: string;
  card: CardModel.Info;
};

export default function CardDetail(props: Props) {
  const [comments, setComments] = useState<Array<MessageModel.Info>>([]);
  const [loading, loadingOps] = useLoading();
  const currentUser: UserModel.PrivateInfo = useStore("user");

  useEffect(() => {
    const cardId = props.card.id;
    if (!cardId) {
      return;
    }
    loadingOps(async () => {
      // fetch card comments.
      const comments = await auth({ projectId: props.projectId }, selectCommentsByCardId, {
        cardId,
      });
      setComments(comments);
    });
  }, [props.card.id, props.projectId]);

  const commentInputRef = useRef<HTMLInputElement>(null);
  const [commentLoading, commentLoadingOps] = useLoading();

  async function handleCreateCommentClick() {
    const commentInput = commentInputRef.current;
    if (!commentInput) {
      return;
    }
    const content = commentInput.value;
    if (!content) {
      return;
    }
    const newComment = await commentLoadingOps(
      auth,
      { projectId: props.projectId },
      createComment,
      {
        announcer: currentUser.name,
        description: content,
        cardId: props.card.id,
      }
    );
    commentInput.value = "";
    setComments([...comments, newComment]);
  }

  return (
    <Modal show={props.show} onHide={props.onHide} dialogClassName={style.dialog} centered>
      <Modal.Header closeButton>
        <Modal.Title>Card Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={style.body}>
          <div className={style.comment_area}>
            {loading ? (
              <Loading />
            ) : (
              <Fragment>
                <p className={style.title}>Comments</p>
                {comments.length ? (
                  <ScrollBox className={className(style.scroll_area, "scrollbar_thumb_green")}>
                    {comments.map((comment) => (
                      <Comment
                        key={comment.id}
                        avatar={comment.announcer.avatar}
                        name={comment.announcer.name}
                        commentTime={dateDistance(comment.updateTime)}
                        content={comment.description}
                      />
                    ))}
                  </ScrollBox>
                ) : (
                  <Empty message="No Comment" size="10rem" />
                )}
                <div className={style.comment_input}>
                  <img src={avatar(currentUser.avatar)} alt="" />
                  <input
                    ref={commentInputRef}
                    type="text"
                    placeholder="Comment here..."
                    disabled={commentLoading}
                  />
                  <button onClick={handleCreateCommentClick} disabled={commentLoading}>
                    {commentLoading ? (
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      <FiMessageSquare />
                    )}
                  </button>
                </div>
              </Fragment>
            )}
          </div>
          <div className={style.card_info}>
            <p className={style.title}>Detail</p>
            <ScrollBox className={className("scrollbar_thumb_green", style.scroll_area)}>
              <div className={style.info_field}>
                <p>Title</p>
                <p>{props.card.title}</p>
              </div>
              <div className={style.info_field}>
                <p>Description</p>
                <p>{props.card.description}</p>
              </div>
              <div className={style.info_field}>
                <p>Status</p>
                <p>{props.card.status}</p>
              </div>
              <div className={style.info_field}>
                <p>Processor</p>
                <p>{props.card.processor ?? "None"}</p>
              </div>
              <div className={style.info_field}>
                <p>Founder</p>
                <p>{props.card.founder}</p>
              </div>
              <div className={style.info_field}>
                <p>Story Points</p>
                <Badge pill variant="primary">
                  {props.card.storyPoints}
                </Badge>
              </div>
              <div className={style.info_field}>
                <p>Priority</p>
                <Priority priority={props.card.priority} />
              </div>
            </ScrollBox>
            <p className={style.card_create_time}>
              Created at <time>{dateDistance(props.card.createTime)}</time>
            </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
