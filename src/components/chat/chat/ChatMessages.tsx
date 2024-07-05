import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { useMessagesContext } from "@/contexts/ChatMessagesProvider";

const ChatMessages = () => {
  const { messages, vendorId } = useMessagesContext();
  const messagesContainerRef = useRef(null);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  console.log("🚀 ~ ChatMessages ~ messages from 123:", messages);
  return (
    <div
      ref={messagesContainerRef}
      style={{ background: "#00000008", scrollBehavior: "smooth" }}
      className="overflow-y-scroll h-[50vh] space-y-3 px-4 py-3"
    >
      {messages.length > 0 &&
        messages.map((item) => (
          <ChatMessage
            key={item.id}
            message={item.message}
            isSendByMe={item.senderId === vendorId ? true : false}
          />
        ))}
    </div>
  );
};

export default ChatMessages;
