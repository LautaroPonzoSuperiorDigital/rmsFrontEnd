/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { api } from "../../../services/api";

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

const NotificationsTitle = ({
  chatRooms,
  filterMessages,
  setFilterMessages,
}) => {
  const [lastMessageDb, setLastMessageDb] = useState(
    chatRooms.Chats[chatRooms.Chats.length - 1]?.message
  );

  const [lastDbnotification, setLastDbNotification] = useState(
    chatRooms.Chats[chatRooms.Chats.length - 1]
  );

  const lastMessage = filterMessages
    ?.filter((message) => message.roomChatId === chatRooms.id)
    .pop();

  const lastMessageDbNotification =
    !lastDbnotification?.isRead && lastDbnotification?.role !== "ADMIN";

  const lastMeessageNotification =
    lastMessage?.role !== "ADMIN" && !lastMessage?.isRead;

  const handleSelectedChatRooms = async () => {
    if (lastMessage) {
      console.log("hello");
      const index = filterMessages.findIndex(
        (message) => message.id === lastMessage.id
      );
      // here update Db
      try {
        const response = await api.patch(
          `chat/chat-message/${lastMessage.id}`,
          { isRead: true }
        );
      } catch (err) {
        console.log(err);
      }

      //here updates state
      const updatedFilterMessages = [...filterMessages];
      updatedFilterMessages[index].isRead = true;
      setFilterMessages(updatedFilterMessages);
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

      console.log("adios");
    }
  };

  return (
    <div>
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
