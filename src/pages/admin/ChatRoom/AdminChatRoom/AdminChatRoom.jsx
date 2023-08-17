/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import NotificationsTitle from "./NotificationsTitle";
import TimeAndDate from "./TimeAndDate";
import Tickets from "./Tickets";

const chatRoomsStyle = {
  borderBottom: "1px solid #00000026",
  width: "100%",
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
  messages,
}) => {
  const [notification, setNotification] = useState(true);
  const encodedKey = chatRooms.Listing.key.replace(/\\/g, "%5C");
  const imageUrl = `https://rms-staging.s3.us-west-1.amazonaws.com/${encodedKey}`;

  useEffect(() => {
    socket.emit("event_join", `${chatRooms.listingId}`);

    socket.on("notification", (data) => {
      setNotification(data);
    });
  }, [socket, chatRooms.listingId]);

  return (
    <div
      className="d-flex p-2  "
      style={chatRoomsStyle}
      onClick={() => setTargetChatRoomId(chatRooms.listingId)}
    >
      <div className="d-flex h-100 align-items-center w-100">
        <div style={{ width: "150px" }}>
          <div
            style={{
              height: "80px",
              width: "80px",
              border: "1px solid #197572",
              borderRadius: "50%",
            }}
          >
            <img
              src={imageUrl}
              alt="listing"
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          </div>
        </div>
        <div>
          <div className="d-flex gap-3 " style={{ width: "250px" }}>
            <p className="m-0" style={{ fontSize: "18px" }}>
              Listing:{chatRooms.listingId} • {chatRooms.Tenant.User.name}
            </p>
          </div>
          <NotificationsTitle
            chatRooms={chatRooms}
            setFilterMessages={setFilterMessages}
            filterMessages={filterMessages}
            messages={messages}
          />

          <TimeAndDate chatRooms={chatRooms} filterMessages={filterMessages} />
        </div>
        <div style={{ width: "200px", height: "100%" }}>
          <Tickets chatRooms={chatRooms} />
        </div>
      </div>
    </div>
  );
};

export default AdminChatRoom;
