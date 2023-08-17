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

const fakeCrentials = {
  listingId: 2,
};

const TenantChatRoomContainer = styled.div`
  height: 100%;

  padding: 1rem;

  display: flex;
  flex-direction: column;
`;

const TenantChatRoom = () => {
  const { user } = useAuth();

  const ulRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [incoming, setIncoming] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [notification, setNotification] = useState(true);

  const handleMessageChange = useCallback(
    (e) => {
      setMessages(e.target.value);
      console.log(messages);
    },
    [messages]
  );
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const message = {
      roomChatId: fakeCrentials.listingId,
      sender: user.name,
      message: messages,
      role: user.role,
      createdAt: new Date().toISOString(),
      id: new Date().toISOString(), // temporary id for the message
    };

    console.log("Sending message");

    await Promise.all([
      socket.emit("event_message", {
        room: `${fakeCrentials.listingId}`,
        message,
      }),
      socket.emit("notification", {
        room: `${fakeCrentials.listingId}`,
        message,
      }),
    ]);
  };

  const scrollToBottom = () => {
    ulRef.current.scrollTop = ulRef.current.scrollHeight;
  };
  useEffect(() => {
    // Scroll to the bottom on initial render and whenever incoming messages change
    scrollToBottom();
  }, [incoming]);

  useEffect(() => {
    const getChatMessages = async () => {
      try {
        const { data } = await api.get("chat/chat-room-by-id", {
          params: { id: fakeCrentials.listingId },
        });
        console.log(data);
        setIncoming(data.Chats);
      } catch (err) {
        console.log(err);
      }
    };
    getChatMessages();
  }, []);

  useEffect(() => {
    // Join the room when the component mounts
    socket.emit("event_join", `${fakeCrentials.listingId}`);

    // Listen for incoming messages from the room
    socket.on("event_message", (data) => {
      console.log("Received message:", data);

      setIncoming((prevMessages) => [...prevMessages, data]);
    });
    // recieve notification notification of new messages
    socket.on("notification", (data) => {
      console.log("notification", data);
      setNotification(data);
    });

    // Leave the room when the component unmounts
    return () => {
      socket.emit("event_leave", `${fakeCrentials.listingId}`);
    };
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
