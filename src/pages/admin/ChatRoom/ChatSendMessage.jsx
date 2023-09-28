import { useRef, useState } from "react";
import sendMessage from "../../../assets/img/send-email.svg";
import { useAuth } from "../../../hooks/useAuth";

const inputStyle = {
  width: "100%",
  border: "2px solid #00000026",
  height: "35px",
};

const ChatSendMessage = ({ socket, chatRoomId }) => {
  const { user } = useAuth();
  const [text, setText] = useState(null);
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      roomChatId: chatRoomId,
      sender: user.name,
      message: text,
      role: "ADMIN",
      createdAt: new Date().toISOString(),
      id: new Date().toISOString(), // temporary id for the message
    };

    let response = await socket.emit("event_message", {
      room: chatRoomId,
      message,
    });
    inputRef.current.value = "";
  };

  return (
    <form
      className="d-flex"
      style={{ padding: "20px" }}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Type a message"
        style={inputStyle}
        onChange={(e) => setText(e.target.value)}
        ref={inputRef}
      />
      <button
        style={{
          width: "35px",
          height: "35px",
          backgroundColor: "#31af9a",
          borderRadius: "10px",
        }}
      >
        <div style={{ width: "25px", height: "25px", marginLeft: "4px" }}>
          <img src={sendMessage} style={{ width: "100%", height: "100%" }} />
        </div>
      </button>
    </form>
  );
};

export default ChatSendMessage;
