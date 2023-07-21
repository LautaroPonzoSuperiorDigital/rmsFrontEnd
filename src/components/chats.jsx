import { useEffect, useState } from "react";
import AdminChatRoom from "./AdminChatRoom";
import Nav from "./nav";
import AdminChatRoomMessages from "./AdminChatRoomMessages";
import ChatSendMessage from "./ChatSendMessage";
import { socket } from "./socketManajer/socket";

const chatRoomStyle = {
  width: "100%",
  maxWidth: "500px",
};
const chatContaienrStyle = {
  borderLeft: "1px solid #00000026",
  width: "100%",
  maxWidth: "500px",
};

const Chats = () => {
  // const [chatRooms, setChatRooms] = useState([]);
  const [messages, setMessages] = useState([]); ///this state recieve all message from server
  const [newMessage, setNewMessages] = useState("");
  const [filterMessages, setFilterMessages] = useState([]); // this state filter message by chat room id
  const [targetChatRoomId, setTargetChatRoomId] = useState(null);

  useEffect(() => {
    // recieve all incoming messages from server
    socket.on("event_message", (data) => {
      console.log("Received message:", data);
      // Update the state of the incoming messages variable
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, [socket]);

  useEffect(() => {
    //filter by chat room id
    console.log("targetChatRoomId", targetChatRoomId);
    const filterMessage = messages.filter(
      (message) => message.rooomId === targetChatRoomId
    );
    setFilterMessages(filterMessage);
  }, [targetChatRoomId, messages]);

  const chatRooms = [
    {
      id: 1,
      listingId: 1,
      tenantName: "john doe",
      lastMessage: "john doe last meessage",
      dateAndTime: "2021-09-01T10:00:00.000Z",
    },
    {
      id: 2,
      listingId: 2,
      tenantName: "John White",
      lastMessage: "John WHIte last meessage",
      dateAndTime: "2021-09-01T10:00:00.000Z",
    },
    {
      id: 3,
      listingId: 3,
      tenantName: "JIm doe",
      lastMessage: "Jim doe last meessage",
      dateAndTime: "2021-09-01T10:00:00.000Z",
    },
  ];

  // useEffect(() => {
  //   const getChatRooms = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${import.meta.env.VITE_API_URL}/chat/chat-rooms`
  //       );
  //       console.log(response);
  //       setChatRooms(response.data);
  //       setLoading(false);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getChatRooms();
  // }, []);
  return (
    <div className="vh-100 d-flex flex-column">
      <Nav />
      <div className="flex-grow-1 d-flex">
        <div style={chatRoomStyle}>
          {chatRooms.map((chatRoom) => {
            return (
              <AdminChatRoom
                key={chatRoom.listingId}
                chatRooms={chatRoom}
                setTargetChatRoomId={setTargetChatRoomId}
                socket={socket}
              />
            );
          })}
        </div>
        <div style={chatContaienrStyle}>
          <div>
            <ul>
              {filterMessages.map((message) => (
                <li key={message.id} className="d-flex flex-column">
                  <AdminChatRoomMessages
                    message={message}
                    targetChatRoomId={targetChatRoomId}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ChatSendMessage socket={socket} chatRoomId={targetChatRoomId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
