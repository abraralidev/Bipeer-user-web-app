import React from "react";
import UserDetails from "./UserDetails";
import ChatMessages from "./ChatMessages";
import MessageForm from "./MessageForm";

const Chat = () => {
  return (
    <div className="w-full h-full relative">
      <UserDetails />
      <ChatMessages />
      <MessageForm />
    </div>
  );
};

export default Chat;
