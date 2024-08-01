import React from "react";
import UserDetails from "./UserDetails";
import ChatMessages from "./ChatMessages";
import MessageForm from "./MessageForm";
import { Box } from "@mui/material";

const Chat = () => {
  return (
    <Box className="w-full h-full relative">
      <Box sx={{ minHeight: "73.5vh" }}>
        <UserDetails />
        <ChatMessages />
      </Box>

      <Box>
        <MessageForm />
      </Box>
    </Box>
  );
};

export default Chat;
