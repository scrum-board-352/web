import React, { Fragment, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Message from "./Message";
import "./style.css";

export interface Message {
  type: "success" | "error" | "info";
  title: string;
  timeout?: number;
  content?: string;
  timerId?: number;
  id?: number;
}

const AUTO_CLOSE_TIMEOUT = 4000;

let msgList: Message[];
let setMsgList: React.Dispatch<React.SetStateAction<Message[]>>;

function close(msg: Message) {
  clearTimeout(msg.timerId);
  setMsgList(msgList.filter((elem) => elem !== msg));
}

export function message(msg: Message) {
  msg.id = Math.random();
  setMsgList([...msgList, msg]);
  // auto-close after delay.
  msg.timerId = setTimeout(close, msg.timeout ?? AUTO_CLOSE_TIMEOUT, msg);
}

message.success = (title: string, content?: string) => {
  message({
    type: "success",
    title,
    content,
  });
};

message.info = (title: string, content?: string) => {
  message({
    type: "info",
    title,
    content,
  });
};

message.error = (title: string, content?: string) => {
  message({
    type: "error",
    title,
    content,
  });
};

export default function MessageBox() {
  [msgList, setMsgList] = useState<Message[]>([]);

  return (
    <div className="messagebox">
      <TransitionGroup component={Fragment}>
        {msgList.map((msg) => (
          <CSSTransition key={msg.id} in={true} timeout={300} classNames="messagebox">
            <Message
              type={msg.type}
              title={msg.title}
              content={msg.content}
              onClose={() => close(msg)}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}
