/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Chats from "./chats";
import { api } from "../../../services/api";
import NotificationsTitle from "./NotificationsTitle";

const chatRoomsStyle = {
  borderBottom: "1px solid #00000026",
};
const notificationMessageStyle = {
  color: "#31af9a",
};

const AdminChatRoom = ({
  chatRooms,
  filterMessages,
  setTargetChatRoomId,
  socket,
  setFilterMessages,
}) => {
  const [notification, setNotification] = useState(true);

  const timeStamp = chatRooms.Chats[chatRooms.Chats.length - 1]?.createdAt;
  const formattedTimeStamp = new Date(timeStamp).toLocaleString();
  const foramttedFilterTimeStamp = new Date(
    filterMessages[filterMessages.length - 1]?.createdAt
  ).toLocaleString();

  // const encodedKey = chatRooms.Listing.key.replace(/\\/g, "%5C");
  // const imageUrl = `https://rms-staging.s3.us-west-1.amazonaws.com/${encodedKey}`;

  useEffect(() => {
    socket.emit("event_join", `${chatRooms.listingId}`);

    socket.on("notification", (data) => {
      setNotification(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, chatRooms.listingId]);

  return (
    <div
      className="d-flex  gap-3 p-2  "
      style={chatRoomsStyle}
      onClick={() => setTargetChatRoomId(chatRooms.listingId)}
    >
      <div className="d-flex h-100 align-items-center justify-content-around w-100">
        <div
          style={{
            height: "80px",
            width: "80px",
            border: "1px solid #197572",
            borderRadius: "50%",
          }}
        >
          <img
            // src={imageUrl}
            alt="listing"
            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
          />
        </div>
        <div>
          <div className="d-flex gap-3 ">
            <p className="m-0" style={{ fontSize: "18px" }}>
              Listing:{chatRooms.listingId} • {chatRooms.Tenant.User.name}
            </p>
            {!notification.state &&
              parseInt(notification.room) === chatRooms.listingId && (
                <div
                  onClick={() => setNotification(true)}
                  style={notificationMessageStyle}
                >
                  new message
                </div>
              )}
          </div>
          <NotificationsTitle
            chatRooms={chatRooms}
            setFilterMessages={setFilterMessages}
          />

          <p style={{ fontSize: "18px", color: "#848484" }}>
            {filterMessages && filterMessages.length > 0
              ? foramttedFilterTimeStamp
              : formattedTimeStamp}
          </p>
        </div>
        <div>
          <p>tickets</p>
        </div>
      </div>
    </div>
  );
};

export default AdminChatRoom;
