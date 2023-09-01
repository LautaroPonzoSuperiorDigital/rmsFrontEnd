/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import NotificationsTitle from "./NotificationsTitle";
import TimeAndDate from "./TimeAndDate";
import Tickets from "./Tickets";
import styled from "styled-components";

// const chatRoomsStyle = styled.div``;

const ChatRoomsStyle = styled.div`
  border-bottom: 1px solid #00000026;
  width: 100%;
  height: 120px;
  display: flex;
  padding-left: 40px;

  @media (max-width: 1274px) {
    padding-left: 20px;
  }
`;

const ChayLayout = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding-right: 57px;
`;

const AdminChatRoom = ({
  chatRooms,
  filterMessages,
  setTargetChatRoomId,
  socket,
  setFilterMessages,
  messages,
  setTickets,
}) => {
  const [notification, setNotification] = useState(true);
  const encodedKey = chatRooms.Listing.key.replace(/\\/g, "%5C");
  const imageUrl = `https://rms-staging.s3.us-west-1.amazonaws.com/${encodedKey}`;

  useEffect(() => {
    socket.emit("event_join", `${chatRooms.listingId}`);

    socket.on("notification", (data) => {
      setNotification(data);
    });
  }, [socket, chatRooms.listingId]);

  return (
    <ChatRoomsStyle onClick={() => setTargetChatRoomId(chatRooms.listingId)}>
      <ChayLayout>
        <div className="d-flex align-items-center gap-3  ">
          <div>
            <div
              style={{
                height: "80px",
                width: "80px",
                border: "1px solid #197572",
                borderRadius: "50%",
              }}
            >
              <img
                src={imageUrl}
                alt="listing"
                style={{ width: "100%", height: "100%", borderRadius: "50%" }}
              />
            </div>
          </div>
          <div
            style={{ height: "88px", display: "flex", flexDirection: "column" }}
          >
            <div className="d-flex gap-3 ">
              <p
                className="m-0"
                style={{ fontSize: "18px", width: "100%", minWidth: "202px" }}
              >
                Listing:{chatRooms.listingId} • {chatRooms.Tenant.User.name}
              </p>
            </div>

            <NotificationsTitle
              chatRooms={chatRooms}
              setFilterMessages={setFilterMessages}
              filterMessages={filterMessages}
              messages={messages}
            />
            <TimeAndDate
              chatRooms={chatRooms}
              filterMessages={filterMessages}
            />
          </div>
        </div>
        <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
          <Tickets chatRooms={chatRooms} setTickets={setTickets} />
        </div>
      </ChayLayout>
    </ChatRoomsStyle>
  );
};

export default AdminChatRoom;
