import { Avatar } from "@mui/material";
import React from "react";

type ChatMessageProps = {
  isSendByMe: boolean;
  message: string;
};

const ChatMessage = ({ isSendByMe, message }: ChatMessageProps) => {
  return (
    <div
      className={`${
        isSendByMe ? "flex-row" : "flex-row-reverse"
      } flex  items-center `}
    >
      <Avatar />
      <div
        className={`mx-2 bg-[#199de0] text-white ${
          isSendByMe ? "rounded-tr-2xl" : "rounded-tl-2xl"
        }  rounded-bl-2xl px-4 py-2 rounded-br-2xl `}
      >
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
