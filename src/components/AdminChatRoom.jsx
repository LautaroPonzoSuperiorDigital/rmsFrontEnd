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
      className="d-flex "
      style={chatRoomsStyle}
      onClick={() => setTargetChatRoomId(chatRooms.listingId)}
    >
      <div>
        <div>
          <div className="d-flex gap-3 ">
            <p className="m-0" style={{ fontSize: "18px" }}>
              Listing:{chatRooms.listingId} • {chatRooms.tenantName}
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
            {chatRooms.lastMessage}
          </p>
          <p className="m-0" style={{ fontSize: "18px", color: "#848484" }}>
            {chatRooms.dateAndTime}
          </p>
        </div>
        {/* <div>Location:{chatRooms.location}</div> */}
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
