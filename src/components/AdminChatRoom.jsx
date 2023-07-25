import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const chatRoomsStyle = {
  borderBottom: "1px solid #00000026",
};
const notificationMessageStyle = {
  color: "#31af9a",
};

const AdminChatRoom = ({ chatRooms, setTargetChatRoomId, socket }) => {
  const [notification, setNotification] = useState(true);
  const timeStamp = chatRooms.Chats[0].createdAt;
  const formattedTimeStamp = new Date(timeStamp).toLocaleString();

  useEffect(() => {
    socket.emit("event_join", `${chatRooms.listingId}`);
    socket.on("notification", (data) => {
      setNotification(data);
      console.log("notification", data);
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
            height: "55px",
            width: "57px",
            border: "1px solid #197572",
            borderRadius: "50%",
          }}
        />
        <div>
          <div className="d-flex gap-3 ">
            <p className="m-0" style={{ fontSize: "18px" }}>
              Listing:{chatRooms.listingId} • name
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

          <p className="m-0" style={{ fontSize: "20px" }}>
            {chatRooms && chatRooms.Chats.length > 0
              ? chatRooms.Chats[chatRooms.Chats.length - 1].message
              : "No messages"}
          </p>
          <p className="m-0" style={{ fontSize: "18px", color: "#848484" }}>
            {chatRooms && formattedTimeStamp}
          </p>
        </div>
        <div>
          <p>tickets</p>
        </div>
      </div>
    </div>
  );
};

AdminChatRoom.propTypes = {
  chatRooms: PropTypes.shape({
    listingId: PropTypes.number.isRequired,
  }).isRequired,
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
    on: PropTypes.func.isRequired,
  }).isRequired,
};

export default AdminChatRoom;
