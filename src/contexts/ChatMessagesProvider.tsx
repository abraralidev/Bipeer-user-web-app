// MessagesContext.ts
import React, { createContext, ReactNode, useContext, useState } from "react";

interface Message {
  // id: string;
  senderId: string;
  message: string;
  senderName: string;
  imageUrl: string;
  isRead: boolean;
  timestamp: any;
}

interface MessagesContextType {
  messages: Message[];
  updateMessages: (newMessages: Message[]) => void;
  addMessage: (newMessage: Message) => void;
  vendorId?: string;
  vendorName?: string;
  setVendorId: (id: string) => void;
  setVendorName: (name: string) => void;
  customerId?: string;
  setCustomerId: (name: string) => void;
}

const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined
);

export const useMessagesContext = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error(
      "useMessagesContext must be used within a MessagesProvider"
    );
  }
  return context;
};

export const MessagesProvider: React.FC = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [vendorId, setVendorId] = useState<string | undefined>(undefined);
  const [customerId, setCustomerId] = useState<string | undefined>(undefined);
  const [vendorName, setVendorName] = useState<string | undefined>(undefined);

  const updateMessages = (newMessages: Message[]) => {
    setMessages(newMessages);
  };

  const addMessage = (newMessage: Message) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <MessagesContext.Provider
      value={{
        messages,
        updateMessages,
        addMessage,
        vendorId,
        vendorName,
        setVendorId,
        setVendorName,
        customerId,
        setCustomerId,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};
