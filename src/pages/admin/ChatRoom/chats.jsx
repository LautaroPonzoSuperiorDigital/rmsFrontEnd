import { useEffect, useRef, useState } from "react";
import AdminChatRoom from "./AdminChatRoom/AdminChatRoom";
import Nav from "../../../components/nav";
import AdminChatRoomMessages from "./AdminChatRoomMessages";
import ChatSendMessage from "./ChatSendMessage";
import { socket } from "../../../components/socketManajer/socket";
import { api } from "../../../services/api";

const chatRoomStyle = {
  width: "100%",
  maxWidth: "500px",
  overflowY: "auto",
};
const chatContaienrStyle = {
  borderLeft: "1px solid #00000026",
  borderRight: "1px solid #00000026",
  width: "100%",
  height: "100%",
  maxWidth: "500px",
  overflowY: "auto",
};

const AdminChatRoomMessagesStyle = {
  width: "100%",
  height: "100%",
  maxHeight: "500px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  padding: "10px 20px",
};

const Chats = () => {
  const chatContainerRef = useRef(null);
  const [messages, setMessages] = useState([]); ///this state recieve all message from server
  const [filterMessages, setFilterMessages] = useState([]); // this state filter message by chat room id
  const [targetChatRoomId, setTargetChatRoomId] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);

  const scrollToLastMessage = () => {
    if (chatContainerRef.current) {
      const lastMessageElement = chatContainerRef.current.lastElementChild;
      if (lastMessageElement) {
        lastMessageElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  // Scroll to the last message when messages update
  useEffect(() => {
    scrollToLastMessage();
  }, [filterMessages]);
  // recieve all incoming messages from server
  useEffect(() => {
    socket.on("event_message", (data) => {
      console.log("Received message:", data);
      // Update the state of the incoming messages variable
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, [socket]);
  //filter by chat room id
  useEffect(() => {
    const filterMessage = messages.filter(
      (message) => message.roomChatId === targetChatRoomId
    );
    setFilterMessages(filterMessage);
  }, [targetChatRoomId, messages]);
  //  get all chat rooms
  useEffect(() => {
    const getChatRooms = async () => {
      try {
        const { data } = await api.get("/chat/chat-rooms");

        const chatRoomsMessage = data.map((chatRoom) => chatRoom.Chats);
        setChatRooms(data);
        setMessages(chatRoomsMessage.flat());
      } catch (err) {
        console.log(err);
      }
    };
    getChatRooms();
  }, [targetChatRoomId]);

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
                filterMessages={filterMessages}
                setTargetChatRoomId={setTargetChatRoomId}
                socket={socket}
                setFilterMessages={setFilterMessages}
                messages={messages}
              />
            );
          })}
        </div>
        <div style={chatContaienrStyle}>
          <div style={{ height: "500px" }}>
            <ul style={AdminChatRoomMessagesStyle} ref={chatContainerRef}>
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
            {targetChatRoomId && (
              <ChatSendMessage socket={socket} chatRoomId={targetChatRoomId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
