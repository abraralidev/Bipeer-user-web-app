import { useMessagesContext } from "@/contexts/ChatMessagesProvider";
import { Avatar, IconButton, Typography } from "@mui/material";
import React from "react";
import { IoCallOutline, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineVideoCall } from "react-icons/md";

const UserDetails = () => {
  const { vendorId, vendorName } = useMessagesContext();
  return (
    <div
      style={{ background: "#00000008", borderBottom: "1px solid #0000001c" }}
      className="flex cursor-pointer  items-center justify-between px-6  border-b-gray-700 py-4"
    >
      <div className="flex items-center space-x-3">
        <Avatar
          src="https://www.adobe.com/content/dam/cc/us/en/creativecloud/design/discover/mascot-logo-design/mascot-logo-design_fb-img_1200x800.jpg"
          sx={{
            borderRadius: "23%",
            height: 48,
            width: 48,
          }}
        />
        <div>
          <Typography variant="subtitle1">{vendorName}</Typography>
          {/* <Typography variant='caption'>Active 5 mins ago</Typography> */}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {/* <IconButton>
          <IoCallOutline />
        </IconButton>
        <IconButton>
          <MdOutlineVideoCall />
        </IconButton>
        <IconButton>
          <IoSettingsOutline />
        </IconButton> */}
      </div>
    </div>
  );
};

export default UserDetails;
