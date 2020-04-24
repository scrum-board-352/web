import auth from "api/base/auth";
import { createComment, removeComment, selectCommentsByCardId, updateComment } from "api/Message";
import Comment from "components/Comment";
import Empty from "components/Empty";
import Img from "components/Img";
import Loading from "components/Loading";
import { message } from "components/MessageBox";
import { MenuItem } from "components/SettingButton";
import useLoading from "hooks/useLoading";
import CardModel from "models/Card";
import MessageModel from "models/Message";
import UserModel from "models/User";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Badge, Modal, Spinner } from "react-bootstrap";
import { FiMessageSquare } from "react-icons/fi";
import ScrollBox from "react-responsive-scrollbox";
import { useStore } from "rlax";
import { addItem, replaceItem } from "utils/array";
import avatar from "utils/avatar";
import className from "utils/class-name";
import { dateDistance } from "utils/date";
import style from "./card-detail.module.css";
import KanbanFormContext from "./KanbanFormContext";
import Priority from "./Priority";

type Props = {
  show: boolean;
  onHide?: () => void;
  projectId: string;
  card: CardModel.Info;
};

type UpdateCommentFormValues = Pick<MessageModel.UpdateInfo, "description">;

export default function CardDetail(props: Props) {
  const [comments, setComments] = useState<Array<MessageModel.Info>>([]);
  const [commentsLoading, commentsLoadingOps] = useLoading(true);
  const currentUser: UserModel.PrivateInfo = useStore("user");

  useEffect(() => {
    const cardId = props.card.id;
    if (!cardId) {
      return;
    }
    commentsLoadingOps(async () => {
      // fetch card comments.
      const comments = await auth({ projectId: props.projectId }, selectCommentsByCardId, {
        cardId,
      });
      setComments(comments);
    });
  }, [props.card.id, props.projectId]);

  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const [createCommentLoading, createCommentLoadingOps] = useLoading();

  async function handleCreateCommentClick() {
    const commentInput = commentInputRef.current;
    if (!commentInput) {
      return;
    }
    const content = commentInput.value;
    if (!content) {
      return;
    }
    const newComment = await createCommentLoadingOps(
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
    setComments((comments) => addItem(comments, newComment));
  }

  const getOpenModalForm = useContext(KanbanFormContext);
  const openModalForm = getOpenModalForm<UpdateCommentFormValues>();

  function menuItems(comment: MessageModel.Info): Array<MenuItem> | undefined {
    if (comment.announcer.id !== currentUser.id) {
      return;
    }

    function showUpdateCommentForm() {
      openModalForm({
        title: "Update Comment",
        templates: [
          {
            name: "description",
            label: "Description",
            type: "textarea",
            defaultValue: comment.description,
          },
        ],
        async onSubmit(values) {
          const updatedComment = await auth(
            {
              username: comment.announcer.name,
              projectId: props.projectId,
            },
            updateComment,
            {
              id: comment.id,
              ...values,
            }
          );
          if (updatedComment && updatedComment.id) {
            message.success("Update Succeed!");
            setComments((comments) => replaceItem(comments, (c) => c.id, updatedComment));
          } else {
            message.error("Update Failed!");
          }
        },
      });
    }

    async function deleteThisComment() {
      message.info("Deleting...");
      const res = await auth(
        {
          username: comment.announcer.name,
          projectId: props.projectId,
        },
        removeComment,
        {
          commentId: comment.id,
        }
      );
      if (res.success) {
        message.success("Delete Succeed!");
        setComments((comments) => comments.filter((c) => c.id !== comment.id));
      } else {
        message.error("Delete Failed!");
      }
    }

    return [
      {
        label: "Edit",
        onClick: showUpdateCommentForm,
      },
      {
        label: "Delete",
        onClick: deleteThisComment,
      },
    ];
  }

  return (
    <Modal show={props.show} onHide={props.onHide} dialogClassName={style.dialog} centered>
      <Modal.Header closeButton>
        <Modal.Title>Card Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={style.body}>
          <div className={style.comment_area}>
            <p className={style.title}>Comments</p>
            {commentsLoading ? (
              <Loading />
            ) : comments.length ? (
              <ScrollBox className={className(style.scroll_area, "scrollbar_thumb_green")}>
                {comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    avatar={comment.announcer.avatar}
                    name={comment.announcer.name}
                    commentTime={dateDistance(comment.updateTime)}
                    content={comment.description}
                    menuItems={menuItems(comment)}
                  />
                ))}
              </ScrollBox>
            ) : (
              <Empty message="No Comment" size="10rem" />
            )}
            <div className={style.comment_input}>
              <Img className={style.comment_input_avatar} src={avatar(currentUser.avatar)} />
              <textarea
                className="noscrollbar"
                ref={commentInputRef}
                placeholder="Comment here..."
                disabled={createCommentLoading}
              />
              <button onClick={handleCreateCommentClick} disabled={createCommentLoading}>
                {createCommentLoading ? (
                  <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                ) : (
                  <FiMessageSquare />
                )}
              </button>
            </div>
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
                <p className={style.description}>{props.card.description}</p>
              </div>
              <div className={style.info_field}>
                <p>Status</p>
                <p>{props.card.status}</p>
              </div>
              <div className={style.info_field}>
                <p>Processor</p>
                <p>{props.card.processor || "None"}</p>
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
