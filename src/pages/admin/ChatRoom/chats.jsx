import { useEffect, useRef, useState } from "react";
import AdminChatRoom from "./AdminChatRoom/AdminChatRoom";
import Nav from "../../../components/nav";
import AdminChatRoomMessages from "./AdminChatRoomMessages";
import ChatSendMessage from "./ChatSendMessage";
import { socket } from "../../../components/socketManajer/socket";
import { api } from "../../../services/api";
import TicketsInfomartion from "./TicketsInformation/TicketsInfomartion";
import AdminChatRoomNavBar from "./AdminChatRoomNavBar";
import TicketsNavBar from "./TicketsNavBar";

const chatRoomStyle = {
  width: "100%",
  maxWidth: "550px",
  overflowY: "auto",
  maxHeight: "100vh",
};
const chatContaienrStyle = {
  borderLeft: "1px solid #00000026",
  borderRight: "1px solid #00000026",
  width: "100%",
  height: "100%",
  maxWidth: "550px",
  overflowY: "auto",
  maxHeight: "700px",
};

const AdminChatRoomMessagesStyle = {
  width: "100%",
  height: "75%",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  padding: "10px 20px",
};

const TicketsInfomartionStyle = {
  maxHeight: "100vh",
};

const Chats = () => {
  const chatContainerRef = useRef(null);
  const [messages, setMessages] = useState([]); ///this state recieve all message from server
  const [filterMessages, setFilterMessages] = useState([]); // this state filter message by chat room id
  const [targetChatRoomId, setTargetChatRoomId] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const [ticketActiveRooms, setTicketActiveRooms] = useState(chatRooms);
  console.log(ticketActiveRooms);

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
        setTicketActiveRooms(data);
        setMessages(chatRoomsMessage.flat());
      } catch (err) {
        console.log(err);
      }
    };
    getChatRooms();
  }, [targetChatRoomId]);

  return (
    <div className="vh-100 d-flex flex-column ">
      <Nav />
      <div className=" flex-grow-1 d-flex p-2 ">
        <div style={chatRoomStyle}>
          <div>
            <AdminChatRoomNavBar
              chatRooms={chatRooms}
              setTicketActiveRooms={setTicketActiveRooms}
            />
          </div>
          {ticketActiveRooms.map((chatRoom) => {
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
          <div style={{ height: "100%" }}>
            {targetChatRoomId && (
              <TicketsNavBar
                targetChatRoomId={targetChatRoomId}
                chatRooms={chatRooms}
              />
            )}
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
            <div>
              {targetChatRoomId && (
                <ChatSendMessage
                  socket={socket}
                  chatRoomId={targetChatRoomId}
                />
              )}
            </div>
          </div>
        </div>
        <div style={TicketsInfomartionStyle}>
          {targetChatRoomId && (
            <TicketsInfomartion
              chatRoomId={targetChatRoomId}
              chatRooms={chatRooms}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chats;
