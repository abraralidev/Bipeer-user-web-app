import React, { useEffect, useState } from "react";
import { useAppContext } from "../../hooks/context/tokenStore";
import { db } from "../../config/Firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AllChats = ({
  currrentChat,
  setCurrentChat,
  userData,
  allChats,
  setAllChats,
}) => {
  const Navigate = useNavigate();

  const [chatStyleToggleId, setChatStyleToggleId] = useState(null);

  useEffect(() => {
    // latest messages chats first
    let targetedChats =
      localStorage.getItem("role") === "vendor" ? "chats" : "serviceChats";

    const q = query(
      collection(db, targetedChats, userData.id, "users"),
      orderBy("updatedAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const chats = [];
      querySnapshot.forEach((doc) => {
        chats.push(doc.data());
      });
      console.log({ chats });
      setAllChats(chats);
    });
  }, [userData.id]);

  return (
    <div className="w-[250px] border-2 p-3 h-full overflow-y-scroll  border-blue-200 border-r-0">
      <div className="flex flex-col">
        {/* 5 times print hassan */}
        {allChats.length === 0 && (
          <div className="sub-heading-text app-text-color">No chats yet</div>
        )}
        {allChats.map((item, index) => {
          return (
            <div
              key={index}
              className={`cursor-pointer capitalize border-2 flex justify-between px-3 py-3 ${
                item.userId === chatStyleToggleId
                  ? "heading-bg-color bg-text-color"
                  : "app-text-color app-bg-color"
              }`}
              onClick={() => {
                setCurrentChat(item.userId);
                setChatStyleToggleId(item.userId);
              }}
            >
              <div className="flex flex-col">
                <div
                  className={`sub-heading-text ${
                    item.userId === chatStyleToggleId ? "" : "text-black"
                  }`}
                >
                  {item.userName}
                </div>
                <div className="text-[10px]">
                  {/* show 15 character only */}
                  {item.lastMessage.slice(0, 30)}
                  {item.lastMessage.length > 30 && "..."}
                </div>
              </div>

              {item.vendorUnreadCount > 0 && (
                <span className="text-[10px]">{item.vendorUnreadCount}</span>
              )}
              {item.professionalUnreadCount > 0 && (
                <span className="text-[10px]">
                  {item.professionalUnreadCount}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllChats;