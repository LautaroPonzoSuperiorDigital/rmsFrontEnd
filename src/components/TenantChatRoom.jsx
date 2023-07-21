import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import sendMessage from "../assets/img/send-email.svg";
import io from "socket.io-client";

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

const TenantChatRoom = () => {
  const socket = useMemo(() => io.connect("http://localhost:81"), []);
  const ulRef = useRef(null);
  const fakeCrentials = {
    listingId: 2,
  };
  const [messages, setMessages] = useState([]);
  const [incoming, setIncoming] = useState([]);
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
      rooomId: fakeCrentials.listingId,
      author: "John Doe",
      message: messages,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    console.log("Sending message");
    let response = await socket.emit("event_message", {
      room: `${fakeCrentials.listingId}`,
      message,
    });
    await socket.emit("notification", {
      room: `${fakeCrentials.listingId}`,
      message,
    });
  };

  const scrollToBottom = () => {
    ulRef.current.scrollTop = ulRef.current.scrollHeight;
  };
  useEffect(() => {
    // Scroll to the bottom on initial render and whenever incoming messages change
    scrollToBottom();
  }, [incoming]);

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
  }, [socket]);

  return (
    <div className="w-100 vh-100 d-flex flex-column p-2  ">
      <div className="flex-grow-1" style={{ overflowY: "auto" }} ref={ulRef}>
        <ul className="p-0">
          {incoming?.map((message, index) => (
            <>
              <p className="m-0" style={messageInfo}>
                {message.author}
                <span style={messageTime}>{message.time}</span>
              </p>
              <li key={index + 1} style={messageList}>
                {message.message}
              </li>
            </>
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
    </div>
  );
};

export default TenantChatRoom;
