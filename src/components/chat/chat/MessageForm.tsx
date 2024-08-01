import { IconButton, TextField } from "@mui/material";
import React from "react";
import { IoCameraOutline, IoSendOutline } from "react-icons/io5";
import { useForm, Controller } from "react-hook-form";
import { useUser } from "@/contexts/UserProvider";
import { fireBaseDB } from "@/firebase";
import {
  collection,
  serverTimestamp,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useMessagesContext } from "@/contexts/ChatMessagesProvider";

const MessageForm = () => {
  const { handleSubmit, control, reset } = useForm();
  const { user } = useUser();
  const { vendorId, addMessage } = useMessagesContext();

  const createMessage = async (vendorId, userId, messageData) => {
    try {
      const usersCollectionRef = collection(
        fireBaseDB,
        "chats",
        vendorId,
        "users",
        userId,
        "messages"
      );

      const usersCollectionRef2 = doc(
        fireBaseDB,
        "chats",
        vendorId,
        "users",
        userId
      );

      const newMessage = {
        imageUrl: messageData.imageUrl || "",
        isRead: messageData.isRead || false,
        message: messageData.message,
        senderId: messageData.senderId,
        senderName: messageData.senderName,
        timestamp: serverTimestamp(),
      };

      const chatDocument = {
        lastMessage: messageData.message,
        lastMessageTimestamp: serverTimestamp(),
        timestamp: serverTimestamp(),
        updatedAt: serverTimestamp(),
        userId: messageData.senderId,
        userName: messageData.senderName,
        // userUnreadCount: 0,
        // vendorUnreadCount: 2
      };

      const docRef = await addDoc(usersCollectionRef, newMessage);
      const docRef2 = await updateDoc(usersCollectionRef2, chatDocument);
      console.log("Message written with ID: ", docRef.id);
      // addMessage(newMessage);
    } catch (error) {
      console.error("Error adding message: ", error);
      throw new Error("Failed to create message");
    }
  };

  const onSubmit = (data: any) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    console.log("🚀 ~ MessageForm ~ user:", user);
    const payload = {
      imageUrl: data.imageUrl || "",
      isRead: data.isRead || false,
      message: data.message,
      senderId: user.id,
      senderName: user.name,
      timestamp: serverTimestamp(),
    };

    createMessage(vendorId, user.id, payload);

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ background: "#00000008", borderTop: "1px solid #0000001c" }}
      className="bg-white absolute bottom-0 left-0 right-0 py-3 px-4 flex items-center justify-between w-full border-t-gray-700"
    >
      <Controller
        name="message"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            size="small"
            required
            placeholder="Type your message here"
          />
        )}
      />
      <div className="flex items-center space-x-2">
        <IconButton type="button">
          <IoCameraOutline />
        </IconButton>
        <IconButton type="submit">
          <IoSendOutline />
        </IconButton>
      </div>
    </form>
  );
};

export default MessageForm;
