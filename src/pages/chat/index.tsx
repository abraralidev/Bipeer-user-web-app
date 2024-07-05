import React, { useEffect, useState } from "react";
import UserChat from "@/components/chat/chat/Chat";
import RootLayout from "../layout";
import UserMessage from "@/components/chat/UserMessage";
import { List } from "@mui/material";
import UserMessageHeader from "@/components/chat/UserMessageHeader";
import { useUser } from "@/contexts/UserProvider";
import { useAxios } from "@/hooks/useAxios";
import { getDocs, collection } from "firebase/firestore";
import { fireBaseDB } from "../../firebase";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  console.log("🚀 ~ Chat ~ selectedUser:", selectedUser);
  const [CustomerChatWithVendor, setCustomerChatWithVendor] = useState([]);
  console.log("🚀 ~ Chat ~ CustomerChatWithVendor:", CustomerChatWithVendor);
  const { data } = useAxios("CURRENT_PROFILE", true);
  const { user, setUser } = useUser();
  setUser(data.customer);

  console.log("user is data", data);

  const customerID = data?.customer?.id;
  console.log("🚀 ~ Chat ~ customerID:", customerID);

  const fetchVendorChats = async (customerID) => {
    try {
      const chatCollectionRef = collection(fireBaseDB, "chats");
      const chatSnapshot = await getDocs(chatCollectionRef);
      const chatList = [];

      for (const chatDoc of chatSnapshot.docs) {
        const chatData = chatDoc.data();
        const usersList = [];

        // Access the subcollection 'users'
        const usersCollectionRef = collection(chatDoc.ref, "users");
        const usersCollectionSnapshot = await getDocs(usersCollectionRef);

        let hasCustomerID = false;

        for (const userDoc of usersCollectionSnapshot.docs) {
          const userData = userDoc.data();
          if (userData.userId === customerID) {
            hasCustomerID = true;
          }
          usersList.push(userData);
        }

        // Only include this chat if it contains the logged-in user's customerID
        if (hasCustomerID) {
          chatList.push({
            ...chatData,
            users: usersList,
          });
        }
      }

      console.log("🚀 ~ fetchVendorChats ~ chatList:", chatList);
      setCustomerChatWithVendor(chatList);
    } catch (error) {
      console.error("Error fetching chats with subcollections:", error);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    // Perform logging or display messages related to the selected user
    console.log("Selected user:", user);
    // You can add logic here to display messages associated with the selected user
  };

  useEffect(() => {
    fetchVendorChats(customerID);
  }, [customerID]);

  return (
    <div className="grid grid-cols-3 md:mb-16 my-3 md:pl-12 pl-2 gap-4 md:pr-4 pr-2">
      <div className="shadow-sm md:col-span-1 col-span-3 px-2 py-4">
        <UserMessageHeader />
        <List className="mt-2 mb-1">
          <UserMessage
            chats={CustomerChatWithVendor}
            onUserSelect={handleUserSelect}
            customerID={customerID}
          />
        </List>
      </div>
      <div className="hidden md:block col-span-2 shadow-sm rounded-md">
        <UserChat />
      </div>
    </div>
  );
};

Chat.getLayout = (page: React.ReactElement) => <RootLayout>{page}</RootLayout>;

export default Chat;
