import React, { useEffect, useState } from "react";
import UserChat from "@/components/chat/chat/Chat";
import RootLayout from "../layout";
import UserMessage from "@/components/chat/UserMessage";
import { List } from "@mui/material";
import UserMessageHeader from "@/components/chat/UserMessageHeader";
import { useUser } from "@/contexts/UserProvider";
import { useAxios } from "@/hooks/useAxios";
import {
  getDocs,
  collection,
  doc,
  setDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { fireBaseDB } from "../../firebase";
import { useParams } from "next/navigation";
import { useMessagesContext } from "@/contexts/ChatMessagesProvider";
import fetchMessages from "../../components/chat/UserMessage";

const ChatByVendor = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const params = useParams();
  const { setVendorId, vendorId, updateMessages, setVendorName } =
    useMessagesContext();

  const [CustomerChatWithService, setCustomerChatWithService] = useState([]);
  const { data } = useAxios("CURRENT_PROFILE", true);
  const { setUser } = useUser();
  setUser(data.customer);

  const customerID = data?.customer?.id;
  const vendorIDinParams = params?.id;
  setVendorId(vendorIDinParams as string);

  const fetchMessages = (vendorId, userId) => {
    try {
      const messagesCollectionRef = collection(
        fireBaseDB,
        "serviceChats",
        vendorId,
        "users",
        userId,
        "messages"
      );
      const q = query(messagesCollectionRef, orderBy("timestamp"));

      return onSnapshot(q, (querySnapshot) => {
        const messages: any = [];
        querySnapshot.forEach((doc) => {
          messages.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        console.log("🚀 ~ fetchMessages ~ messages:", messages);
        // setVendorName(item.vendorName);
        updateMessages(messages);
      });
    } catch (err) {
      console.log("🚀 ~ fetchMessages ~ err:", err);
    }
  };

  const fetchVendorChats = async (customerID) => {
    try {
      const chatCollectionRef = collection(fireBaseDB, "serviceChats");
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

      setCustomerChatWithService(chatList);
    } catch (error) {
      console.error("Error fetching chats with subcollections:", error);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    fetchVendorChats(customerID);
    fetchMessages(vendorIDinParams, customerID);
  }, [customerID, vendorIDinParams]);

  return (
    <div className="grid grid-cols-3 md:mb-16 my-3 md:pl-12 pl-2 gap-4 md:pr-4 pr-2">
      <div className="shadow-sm md:col-span-1 col-span-3 px-2 py-4">
        <h1>This is service chat</h1>
        <UserMessageHeader />
        <List className="mt-2 mb-1">
          <UserMessage
            chats={CustomerChatWithService}
            onUserSelect={handleUserSelect}
            customerID={customerID}
            vendorOrServiceConst={"service"}
          />
        </List>
      </div>
      <div className="hidden md:block col-span-2 shadow-sm rounded-md">
        <UserChat />
      </div>
    </div>
  );
};

ChatByVendor.getLayout = (page: React.ReactElement) => (
  <RootLayout>{page}</RootLayout>
);

export default ChatByVendor;
