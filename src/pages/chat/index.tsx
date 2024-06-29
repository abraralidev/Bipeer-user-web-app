import { useEffect, useState } from "react";
import UserMessagesSection from "@/components/chat/UserMessagesSection";
import UserChat from "@/components/chat/chat/Chat";
import RootLayout from "../layout";
import UserMessage from "@/components/chat/UserMessage";
import { List } from "@mui/material";
import UserMessageHeader from "@/components/chat/UserMessageHeader";
import { useUser } from "@/contexts/UserProvider";
import { useAxios } from "@/hooks/useAxios";
import {
  getFirestore,
  collectionGroup,
  query,
  where,
  getDocs,
  collection,
  doc,
} from "firebase/firestore";
import { fireBaseDB } from "../../firebase";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [chats, setChats] = useState([]);
  const { data } = useAxios("CURRENT_PROFILE", true);
  const { user, setUser } = useUser();
  setUser(data.customer);

  console.log("user is data", data);

  const customerID = data.id;

  const fetchVendorChats = async () => {
    try {
      const chatCollectionRef = collection(fireBaseDB, "chats");
      const chatSnapshot = await getDocs(chatCollectionRef);
            const chatList = chatSnapshot.docs.map(doc =>(doc.data()));
            console.log(chatList)
      // for (let i=0; i<chatSnapshot.docs.length;i++){
      // const usersCollectionRef = collection(fireBaseDB, 'users');
      // const userSnapchat = await getDocs(chatCollectionRef);

      // }
      // const chatList = chatSnapshot.docs.map(doc =>{

      // });
      // setChats(chatList);
      // console.log('chats are 123' , chatList);

      // chatList.forEach(chat => {
      //   console.log('chats are 123 132',chat.id, ' => ', chat);
      // });
    } catch (error) {
      console.error("Error fetching chats: ", error);
    }
  };

  // async function getChatsForUser(userId) {
  //   const chatsRef = collection(fireBaseDB, "chats");
  //   const vendorsSnapshot = await getDocs(chatsRef);

  //   const userChats = [];

  //   for (const vendorDoc of vendorsSnapshot.docs) {
  //     const vendorId = vendorDoc.id;
  //     const usersRef = collection(fireBaseDB, `chats/${vendorId}/users`);
  //     const userDoc = doc(usersRef, userId);
  //     const userDocSnapshot = await getDocs(userDoc);

  //     if (userDocSnapshot.exists()) {
  //       userChats.push({
  //         vendorId: vendorId,
  //         vendorName: vendorDoc.data().vendorName,
  //       });
  //     }
  //   }

  //   return userChats;
  // }

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    // getChatsForUser(customerID).then(chats => {
    //   console.log("Chats for user_456:", chats);
    // });
    fetchVendorChats();
  }, []);

  return (
    <div className="grid grid-cols-3 md:my-16 my-3 md:pl-12 pl-2 gap-4 md:pr-4 pr-2">
      <div className="shadow-sm md:col-span-1 col-span-3 px-2 py-4">
        <UserMessageHeader />
        <List className="mt-2 mb-1 ">
          <UserMessage />
          <UserMessage />
          <UserMessage />
          <UserMessage />
          <UserMessage />
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
