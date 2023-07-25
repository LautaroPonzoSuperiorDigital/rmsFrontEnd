import { useEffect, useState } from "react";

const messageAuthor = {
  fontSize: "21px",
  fontWeight: "bold",
};
const messageTime = {
  fontSize: "16px",
  color: "#848484",
  fontWeight: "normal",
};
const messageText = {
  fontSize: "18px",
};

const AdminChatRoomMessages = ({ message }) => {
  return (
    <div className="d-flex flex-column justify-content-between h-100">
      <div className="d-flex flex-column">
        <div className="d-flex gap-2 align-items-center">
          <p className="m-0" style={messageAuthor}>
            {message.sender}
          </p>
          <p className="m-0 d-flex align-items-center" style={messageTime}>
            {new Date(message.createdAt).toLocaleString()}
          </p>
        </div>
        <p className="m-0" style={messageText}>
          {message.message}
        </p>
      </div>
    </div>
  );
};

export default AdminChatRoomMessages;
