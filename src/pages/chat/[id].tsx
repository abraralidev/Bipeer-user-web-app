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

  const [CustomerChatWithVendor, setCustomerChatWithVendor] = useState([]);
  const { data } = useAxios("CURRENT_PROFILE", true);
  const [loading, setLoading] = useState(true);
  const { setUser } = useUser();
  setUser(data.customer);

  const customerID = data?.customer?.id;
  const vendorIDinParams = params?.id;
  setVendorId(vendorIDinParams as string);

  const fetchMessages = (vendorId, userId) => {
    try {
      const messagesCollectionRef = collection(
        fireBaseDB,
        "chats",
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

      setCustomerChatWithVendor(chatList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching chats with subcollections:", error);
      setLoading(false);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    // Perform logging or display messages related to the selected user
    // You can add logic here to display messages associated with the selected user
  };

  useEffect(() => {
    fetchVendorChats(customerID);
    fetchMessages(vendorIDinParams, customerID);
    // console.log("🚀 ~ ChatByVendor ~ params:", vendorId);
  }, [customerID, vendorIDinParams]);

  //   useEffect(() => {
  //     console.log(
  //       "🚀 ~ ChatByVendor ~ params: in the use effect 888888888888888",
  //       vendorId
  //     );

  //     fetchMessages(vendorIDinParams, customerID);
  //   }, [vendorIDinParams, vendorId]);

  return (
    <div className="grid grid-cols-3 md:mb-16 my-3 md:pl-12 pl-2 gap-4 md:pr-4 pr-2">
      <div className="shadow-sm md:col-span-1 col-span-3 px-2 py-4">
        <UserMessageHeader />
        <List className="mt-2 mb-1">
          <UserMessage
            chats={CustomerChatWithVendor}
            onUserSelect={handleUserSelect}
            customerID={customerID}
            isChatLoading={loading}
          />
        </List>
      </div>
      <div className="md:block col-span-3 md:col-span-2 shadow-sm rounded-md">
        <UserChat />
      </div>
    </div>
  );
};

ChatByVendor.getLayout = (page: React.ReactElement) => (
  <RootLayout>{page}</RootLayout>
);

export default ChatByVendor;
