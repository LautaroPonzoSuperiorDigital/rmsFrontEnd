import { useCallback, useEffect, useRef, useState } from "react";
import sendMessage from "../assets/img/send-email.svg";
import { socket } from "./socketManajer/socket";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import { styled } from "styled-components";

const messageInfo = {
  fontSize: "18px",
  fontWeight: "bold",
  height: "21px",
};
const messageTime = {
  fontSize: "15px",
  color: "#848484",
  marginLeft: "8px",
  fontWeight: "normal",
};

const messageList = {
  listStyle: "none",
  fontSize: "16px",
};

const TenantChatRoomContainer = styled.div`
  height: 100%;

  padding: 1rem;

  display: flex;
  flex-direction: column;
`;

const TenantChatRoom = () => {
  const [chatRoomId, setChatRoomId] = useState(null);
  const { user } = useAuth();

  const inputRef = useRef(null);
  const ulRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [incoming, setIncoming] = useState([]);

  const handleMessageChange = useCallback(
    (e) => {
      setMessages(e.target.value);
    },
    [messages]
  );
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const message = {
      roomChatId: chatRoomId,
      sender: user.name,
      message: messages,
      role: user.role,
    };

    console.log("Sending message");

    await Promise.all([
      socket.emit("event_message", {
        room: `${chatRoomId}`,
        message,
      }),
    ]);
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  const scrollToBottom = () => {
    ulRef.current.scrollTop = ulRef.current.scrollHeight;
  };
  useEffect(() => {
    // Scroll to the bottom on initial render and whenever incoming messages change
    scrollToBottom();
  }, [incoming]);

  useEffect(() => {
    // Define an async function to fetch the chat room ID
    const getchatRoomId = async () => {
      try {
        const response = await api.get(
          `chat/chat-room-by-tenant-id/${user.tenantId}`
        );
        setChatRoomId(response.data.id);
        const messages = await api.get("chat/chat-room-by-id", {
          params: { id: response.data.id },
        });
        setIncoming(messages.data.Chats);

        // Now that chatRoomId is set, we can establish the WebSocket connection
        console.log("Joining room", response.data.id);
        socket.emit("event_join", `${response.data.id}`);
      } catch (err) {
        console.log(err);
      }
    };

    getchatRoomId();
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {
    socket.on("event_message", (data) => {
      // Check if the message already exists in incoming messages
      if (!incoming.some((message) => message.id === data.id)) {
        setIncoming((prevMessages) => [...prevMessages, data]);
      }
    });
  }, []);
  return (
    <TenantChatRoomContainer>
      <div className="flex-grow-1" style={{ overflowY: "auto" }} ref={ulRef}>
        <ul className="p-0">
          {incoming?.map((message) => (
            <div key={message.id}>
              <p className="m-0" style={messageInfo}>
                {message.sender}
                <span style={messageTime}>
                  {new Date(message.createdAt).toLocaleString()}
                </span>
              </p>
              <li style={messageList}>{message.message}</li>
            </div>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSendMessage} className="d-flex">
        <input
          placeholder="Type your message here..."
          onChange={handleMessageChange}
          style={{ width: "100%" }}
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
            <img
              src={sendMessage}
              alt="send icon"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </button>
      </form>
    </TenantChatRoomContainer>
  );
};

export default TenantChatRoom;
