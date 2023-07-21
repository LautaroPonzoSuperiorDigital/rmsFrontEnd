import { useCallback, useEffect, useMemo, useState } from "react";
import io from "socket.io-client";

// const socket = io.connect("http://localhost:81");

const TenantChatRoom = () => {
  const socket = useMemo(() => io.connect("http://localhost:81"), []);
  const fakeCrentials = {
    listingId: 2,
  };
  const [messages, setMessages] = useState([]);
  const [author, setAuthor] = useState("");
  const [incoming, setIncoming] = useState([]);
  const [notification, setNotification] = useState(true);

  const handleAuthor = (e) => {
    setAuthor(e.target.value);
  };

  const handleMessageChange = useCallback(
    (e) => {
      setMessages(e.target.value);
      console.log(messages);
    },
    [messages]
  );
  const handleSendMessage = async () => {
    const message = {
      rooomId: fakeCrentials.listingId,
      author: author,
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
    <div className="w-100 vh-100 d-flex flex-column ">
      <div>
        notification:{notification ? "no hay mensajes" : "hay mensajes nuevos"}
      </div>
      <ul>
        {incoming?.map((message, index) => (
          <>
            <li key={index + 1}>{message.message}</li>
            <p>
              {message.author}-{message.time}
            </p>
          </>
        ))}
      </ul>
      <input placeholder="Type your name here..." onChange={handleAuthor} />
      <input
        placeholder="Type your message here..."
        onChange={handleMessageChange}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default TenantChatRoom;
