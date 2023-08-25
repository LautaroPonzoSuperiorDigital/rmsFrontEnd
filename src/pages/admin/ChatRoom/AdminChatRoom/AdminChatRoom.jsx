/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import NotificationsTitle from "./NotificationsTitle";
import TimeAndDate from "./TimeAndDate";
import Tickets from "./Tickets";

const chatRoomsStyle = {
  borderBottom: "1px solid #00000026",
  width: "100%",
  height: "88px",
  display: "flex",
};

const AdminChatRoom = ({
  chatRooms,
  filterMessages,
  setTargetChatRoomId,
  socket,
  setFilterMessages,
  messages,
  setTickets,
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
      className="d-flex  "
      style={chatRoomsStyle}
      onClick={() => setTargetChatRoomId(chatRooms.listingId)}
    >
      <div className="d-flex align-items-center  w-100 justify-content-around  ">
        <div className="d-flex align-items-center gap-1 ">
          <div>
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
          <div style={{ height: "88px" }}>
            <div className="d-flex gap-3 ">
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
            <TimeAndDate
              chatRooms={chatRooms}
              filterMessages={filterMessages}
            />
          </div>
        </div>
        <div style={{ height: "100%" }}>
          <Tickets chatRooms={chatRooms} setTickets={setTickets} />
        </div>
      </div>
    </div>
  );
};

export default AdminChatRoom;
