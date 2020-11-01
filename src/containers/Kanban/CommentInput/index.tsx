import Img from "components/Img";
import UserModel from "models/User";
import React, { useRef } from "react";
import { Spinner } from "react-bootstrap";
import { FiMessageSquare } from "react-icons/fi";
import { useStore } from "rlax";
import avatar from "utils/avatar";
import style from "./style.module.css";

export type Output = {
  content: string;
  receivers: Array<string>;
};

type Props = {
  loading: boolean;
  onSubmit: (comment: Output) => void;
};

function startWithAt(s: string) {
  return s.length > 0 && s[0] === "@";
}

function getAllReceivers(content: string): Array<string> {
  return content
    .split(" ")
    .filter(startWithAt)
    .map((s) => s.substring(1))
    .filter(Boolean);
}

export default function CommentInput(props: Props) {
  const { userOutput: currentUser }: UserModel.LoginOutput = useStore("user");
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit() {
    const commentInput = commentInputRef.current;
    if (!commentInput) {
      return;
    }
    const content = commentInput.value;
    if (!content) {
      return;
    }
    const receivers = getAllReceivers(content);
    props.onSubmit({ content, receivers });
    commentInput.value = "";
  }

  return (
    <div className={style.comment_input}>
      <Img className={style.comment_input_avatar} src={avatar(currentUser.avatar)} />
      <textarea
        className="noscrollbar"
        ref={commentInputRef}
        placeholder="Comment here..."
        disabled={props.loading}
      />
      <button onClick={handleSubmit} disabled={props.loading}>
        {props.loading ? (
          <Spinner animation="grow" variant="light" size="sm" />
        ) : (
          <FiMessageSquare />
        )}
      </button>
    </div>
  );
}
