import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const chatRoomsStyle = {
  borderBottom: "1px solid #00000026",
};
const notificationMessageStyle = {
  color: "#31af9a",
};
const newNotificationStyle = {
  fontSize: "20px",
  fontWeight: "bold",
  padding: 0,
  margin: 0,
};
const notificationStyle = {
  fontSize: "20px",
  fontWeight: "normal",
  margin: 0,
};

const AdminChatRoom = ({
  chatRooms,
  filterMessages,
  setTargetChatRoomId,
  socket,
}) => {
  const [notification, setNotification] = useState(true);
  const timeStamp = chatRooms.Chats[chatRooms.Chats.length - 1].createdAt;
  const formattedTimeStamp = new Date(timeStamp).toLocaleString();
  const foramttedFilterTimeStamp = new Date(
    filterMessages[filterMessages.length - 1]?.createdAt
  ).toLocaleString();
  const newNotification =
    chatRooms.Chats[chatRooms.Chats.length - 1]?.role !== "ADMIN" &&
    !chatRooms.Chats[chatRooms.Chats.length - 1]?.isRead;

  const filterNewnotification =
    filterMessages[filterMessages.length - 1]?.role !== "ADMIN" &&
    !filterMessages[filterMessages.length - 1]?.isRead;

  console.log("here", chatRooms.Chats[chatRooms.Chats.length - 1].createdAt);

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    socket.emit("event_join", `${chatRooms.listingId}`);
    // eslint-disable-next-line react/prop-types
    socket.on("notification", (data) => {
      setNotification(data);
      console.log("notification", data);
    });

    return () => {
      // eslint-disable-next-line react/prop-types
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

          {filterMessages && filterMessages.length > 0 ? (
            <p
              style={
                filterNewnotification ? newNotificationStyle : notificationStyle
              }
            >
              {filterMessages[filterMessages.length - 1].message.slice(0, 10)}
            </p>
          ) : (
            <p
              style={newNotification ? newNotificationStyle : notificationStyle}
            >
              {chatRooms.Chats[chatRooms.Chats.length - 1]?.message.slice(
                0,
                10
              )}
            </p>
          )}

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

AdminChatRoom.propTypes = {
  chatRooms: PropTypes.shape({
    listingId: PropTypes.number.isRequired,
    Chats: PropTypes.arrayOf(
      PropTypes.shape({
        createdAt: PropTypes.string.isRequired,
        deletedAt: PropTypes.string,
        id: PropTypes.number.isRequired,
        message: PropTypes.string.isRequired,
        roomChatId: PropTypes.number.isRequired,
        sender: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        isRead: PropTypes.bool.isRequired,
      })
    ).isRequired,
  }).isRequired,
  filterMessages: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      deletedAt: PropTypes.string,
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      roomChatId: PropTypes.number.isRequired,
      sender: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      isRead: PropTypes.bool.isRequired,
    })
  ),
  setTargetChatRoomId: PropTypes.func.isRequired, // add setTargetChatRoomId
  socket: PropTypes.object.isRequired,
};
export default AdminChatRoom;
