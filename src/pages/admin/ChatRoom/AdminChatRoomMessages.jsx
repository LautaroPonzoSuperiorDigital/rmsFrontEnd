/* eslint-disable react/prop-types */
import { useAuth } from "../../../hooks/useAuth";

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
  const { user } = useAuth();
  const ownerMessage = user.name === message.sender;

  return (
    <div className="d-flex flex-column justify-content-between h-100">
      <div
        className="d-flex flex-column "
        style={{ overflowY: "auto", maxHeight: "300px" }}
      >
        <div
          className="d-flex gap-2 align-items-center"
          style={
            ownerMessage
              ? { justifyContent: "flex-end" }
              : { justifyContent: "flex-start" }
          }
        >
          <p className="m-0" style={messageAuthor}>
            {message.sender}
          </p>
          <p className="m-0 d-flex align-items-center" style={messageTime}>
            {new Date(message.createdAt).toLocaleString()}
          </p>
        </div>
        <p
          className="m-0"
          style={
            ownerMessage
              ? { textAlign: "end", fontSize: 18 }
              : { textAlign: "start", fontSize: 18 }
          }
        >
          {message.message}
        </p>
      </div>
    </div>
  );
};

export default AdminChatRoomMessages;
