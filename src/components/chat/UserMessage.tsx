import React, { useEffect, useState } from "react";
import {
  ListItem,
  ListItemButton,
  Avatar,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import { fireBaseDB } from "@/firebase";
import {
  collection,
  query,
  getDocs,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useMessagesContext } from "@/contexts/ChatMessagesProvider";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

interface Vendor {
  vendorId: string;
  vendorName: string;
  users: Array<{
    userId: string;
    lastMessage: string;
    lastMessageTimestamp: {
      seconds: number;
      nanoseconds: number;
    };
  }>;
}

interface UserMessageProps {
  chats: Vendor[];
  onUserSelect: (user: Vendor) => void;
  customerID: string;
  vendorOrServiceConst: string;
  isChatLoading: boolean;
}

const UserMessage: React.FC<UserMessageProps> = ({
  chats,
  onUserSelect,
  customerID,
  vendorOrServiceConst,
  isChatLoading,
}) => {
  const pathname = usePathname();
  console.log("🚀 ~ pathname:", pathname);
  const { updateMessages, setVendorId, setVendorName, vendorId } =
    useMessagesContext();
  const [userLastMessages, setUserLastMessages] = useState({});

  const router = useRouter();

  let collectionName = "chats";

  if (vendorOrServiceConst === "service") {
    collectionName = "serviceChats";
  }

  const fetchMessages = (vendorId, userId) => {
    try {
      const messagesCollectionRef = collection(
        fireBaseDB,
        collectionName,
        vendorId,
        "users",
        userId,
        "messages"
      );
      const q = query(messagesCollectionRef, orderBy("timestamp"));

      return onSnapshot(q, (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
          messages.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        console.log("🚀 ~ fetchMessages ~ messages:", messages);
        updateMessages(messages);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchLastMessages = (vendorId) => {
    try {
      const usersCollectionRef = collection(
        fireBaseDB,
        collectionName,
        vendorId,
        "users"
      );

      return onSnapshot(usersCollectionRef, (querySnapshot) => {
        const lastMessages = {};
        querySnapshot.forEach((doc) => {
          lastMessages[doc.id] = doc.data();
        });

        console.log("🚀 ~ fetchLastMessages ~ lastMessages:", lastMessages);
        setUserLastMessages((prev) => ({ ...prev, [vendorId]: lastMessages }));
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (item: Vendor) => {
    const user = item.users.find((user) => user.userId === customerID);

    console.log("🚀 ~ handleClick ~ vendorID:", item.vendorId);

    if (vendorOrServiceConst === "service") {
      router.push(`/chat-service/${item.vendorId}`);
    } else {
      router.push(`/chat/${item.vendorId}`);
    }

    if (user) {
      fetchMessages(item.vendorId, customerID);
      fetchLastMessages(item.vendorId);
      setVendorId(item.vendorId);
      setVendorName(item.vendorName);
    }
  };

  const convertFirestoreTimestampToTime = (timestamp) => {
    if (!timestamp) return "No time";
    const milliseconds =
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
    const dateObject = new Date(milliseconds);
    return dateObject.toLocaleTimeString();
  };

  return (
    <>
      {isChatLoading ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <CircularProgress />
        </Grid>
      ) : (
        <>
          {chats.length > 0 ? (
            chats.map((item) => {
              const user = userLastMessages[item.vendorId]?.[customerID];
              return (
                <ListItem
                  key={item.vendorId}
                  className="px-2 py-3"
                  onClick={() => handleClick(item)}
                >
                  <ListItemButton>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item>
                        <Avatar
                          src="https://www.adobe.com/content/dam/cc/us/en/creativecloud/design/discover/mascot-logo-design/mascot-logo-design_fb-img_1200x800.jpg"
                          alt="vendor logo go here"
                          sx={{
                            height: 58,
                            width: 58,
                            borderRadius: "22%",
                          }}
                        />
                      </Grid>
                      <Grid item xs>
                        <Typography>{item.vendorName}</Typography>
                        <Grid container justifyContent="space-between">
                          <Grid item>
                            <Typography variant="caption">
                              {user?.lastMessage || "No messages"}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="caption">
                              {convertFirestoreTimestampToTime(
                                user?.lastMessageTimestamp
                              )}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </ListItemButton>
                </ListItem>
              );
            })
          ) : (
            <div>
              <h1>No chats found</h1>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default UserMessage;
