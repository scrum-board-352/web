import Comment from "components/Comment";
import Empty from "components/Empty";
import Loading from "components/Loading";
import useLoading from "hooks/useLoading";
import CardModel from "models/Card";
import MessageModel from "models/Message";
import React, { Fragment, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ScrollBox from "react-responsive-scrollbox";
import sleep from "utils/sleep";
import testMessageData from "utils/testMessageData";
import style from "./card-detail.module.css";
import Priority from "./Priority";

type Props = {
  show: boolean;
  onHide?: () => void;
  card: CardModel.Info;
};

export default function CardDetail(props: Props) {
  const [comments, setComments] = useState<MessageModel.Info[]>([]);
  const [loading, loadingOps] = useLoading();

  useEffect(() => {
    (async () => {
      await loadingOps(sleep, 2000);
      setComments(testMessageData.info.comments);
    })();
  }, [loadingOps]);

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      dialogClassName={style.dialog}
      centered
    >
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
                <p className={style.comment_area_title}>Comments</p>
                {comments.length ? (
                  <ScrollBox>
                    {comments.map((comment) => (
                      <Comment
                        key={comment.id}
                        avatar={comment.announcer.avatar}
                        name={comment.announcer.name}
                        commentTime={comment.updateTime}
                        content={comment.description}
                      />
                    ))}
                  </ScrollBox>
                ) : (
                  <Empty message="No Comment" />
                )}
              </Fragment>
            )}
          </div>
          <div className={style.card_info}>
            <div className={style.info_field}>
              <p>Title</p>
              <p>{props.card.title}</p>
            </div>
            <div className={style.info_field}>
              <p>Description</p>
              <p>{props.card.description}</p>
            </div>
            <div className={style.info_field}>
              <p>Processor</p>
              <p>{props.card.processor ?? "None"}</p>
            </div>
            <div className={style.info_field}>
              <p>Priority</p>
              <Priority priority={props.card.priority} />
            </div>
            <p className={style.card_create_time}>
              Created at <time>{props.card.createTime}</time>
            </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
