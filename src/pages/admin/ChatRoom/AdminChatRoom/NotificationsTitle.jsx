/* eslint-disable react/prop-types */
import { useState } from "react";
import { api } from "../../../../services/api";
import { useEffect } from "react";

const newNotificationStyle = {
  fontSize: "20px",
  fontWeight: "bold",
  padding: 0,
  margin: 0,
  color: "black",
};
const notificationStyle = {
  fontSize: "20px",
  fontWeight: "normal",
  margin: 0,
  color: "black",
};

const NotificationsTitle = ({
  chatRooms,
  filterMessages,
  setFilterMessages,
  messages,
}) => {
  const [lastMessageDb, setLastMessageDb] = useState(
    chatRooms.Chats[chatRooms.Chats.length - 1]?.message
  );

  const [lastDbnotification, setLastDbNotification] = useState(
    chatRooms.Chats[chatRooms.Chats.length - 1]
  );

  const lastMessage = messages
    ?.filter((message) => message.roomChatId === chatRooms.id)
    .pop();

  const lastMessageDbNotification =
    !lastDbnotification?.isRead && lastDbnotification?.role !== "ADMIN";

  const lastMeessageNotification =
    lastMessage?.role !== "ADMIN" && !lastMessage?.isRead;

  const handleSelectedChatRooms = async () => {
    if (lastMessage) {
      const index = filterMessages.findIndex(
        (message) => message.id === lastMessage.id
      );
      // here update Db
      try {
        const response = await api.patch(
          `chat/chat-message/${lastMessage.id}`,
          { isRead: true }
        );
        //here updates state
        const updatedFilterMessages = [...filterMessages];
        updatedFilterMessages[index].isRead = true;
        setFilterMessages(updatedFilterMessages);
      } catch (err) {
        console.log(err);
      }
    } else {
      const lastMessageDbId = chatRooms.Chats[chatRooms.Chats.length - 1].id;
      console.log("aca", chatRooms.Chats[chatRooms.Chats.length - 1]);
      // here update Db
      try {
        const response = await api.patch(
          `chat/chat-message/${lastMessageDbId}`,
          { isRead: true }
        );

        setLastDbNotification(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {}, [lastMessageDb, messages]);

  return (
    <div onClick={handleSelectedChatRooms}>
      {lastMessage ? (
        <p
          style={
            lastMeessageNotification ? newNotificationStyle : notificationStyle
          }
        >
          {lastMessage?.message}
        </p>
      ) : (
        <p
          style={
            lastMessageDbNotification ? newNotificationStyle : notificationStyle
          }
        >
          {lastMessageDb}
        </p>
      )}
    </div>
  );
};

export default NotificationsTitle;
