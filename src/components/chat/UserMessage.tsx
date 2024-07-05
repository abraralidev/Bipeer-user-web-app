import React from "react";
import {
  ListItem,
  ListItemButton,
  Avatar,
  Typography,
  Grid,
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
}

const UserMessage: React.FC<UserMessageProps> = ({
  chats,
  onUserSelect,
  customerID,
}) => {
  const { updateMessages, setVendorId, setVendorName } = useMessagesContext();

  const fetchMessages = (vendorId, userId) => {
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
  };

  const handleClick = (item: Vendor) => {
    const user = item.users.find((user) => user.userId === customerID);

    console.log("🚀 ~ handleClick ~ customerID:", customerID);
    console.log("🚀 ~ handleClick ~ item:", item);
    console.log("🚀 ~ handleClick ~ user:", user);

    if (user) {
      fetchMessages(item.vendorId, customerID);
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
      {chats.length > 0 ? (
        chats.map((item) => {
          const user = item.users.find((user) => user.userId === customerID);
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
        <div>No chats available</div>
      )}
    </>
  );
};

export default UserMessage;
