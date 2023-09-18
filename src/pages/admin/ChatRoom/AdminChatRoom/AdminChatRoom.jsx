/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import NotificationsTitle from "./NotificationsTitle";
import TimeAndDate from "./TimeAndDate";
import Tickets from "./Tickets";
import styled from "styled-components";
import { createListingImage } from "../../../../services/listing";

const ChatRoomsStyle = styled.div`
  border-bottom: 1px solid #00000026;
  width: 100%;
  height: 100px;
  display: flex;
  padding: 30px 30px;

  @media (max-width: 1474px) {
    padding: 0px 0px;
  }
`;

const ChayLayout = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding-right: 10px;

  @media (max-width: 1374px) {
    padding-right: 20px;
  }
`;

const AdminChatRoom = ({
  chatRoom,
  filterMessages,
  setTargetChatRoomId,
  socket,
  setFilterMessages,
  messages,
  setTickets,
}) => {
  const [notification, setNotification] = useState(true);
  useEffect(() => {
    socket.emit("event_join", `${chatRoom.id}`);

    socket.on("notification", (data) => {
      setNotification(data);
    });
  }, [socket, chatRoom.id]);

  return (
    <ChatRoomsStyle onClick={() => setTargetChatRoomId(chatRoom.id)}>
      <ChayLayout>
        <div className="d-flex align-items-center gap-3  ">
          <div>
            <div
              style={{
                height: "55px",
                width: "55px",
                border: "1px solid #197572",
                borderRadius: "50%",
              }}
            >
              <img
                src={createListingImage(chatRoom.Listing)}
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
                Listing:{chatRoom.listingId} • {chatRoom.Tenant.User.name}
              </p>
            </div>

            <NotificationsTitle
              chatRooms={chatRoom}
              setFilterMessages={setFilterMessages}
              filterMessages={filterMessages}
              messages={messages}
            />
            <TimeAndDate chatRooms={chatRoom} filterMessages={filterMessages} />
          </div>
        </div>
        <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
          <Tickets chatRooms={chatRoom} setTickets={setTickets} />
        </div>
      </ChayLayout>
    </ChatRoomsStyle>
  );
};

export default AdminChatRoom;
