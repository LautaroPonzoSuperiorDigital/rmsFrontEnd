/* eslint-disable react/prop-types */
import { DateTime } from "luxon";
const TimeAndDate = ({ filterMessages, chatRooms }) => {
  const chatRoomIdDb = chatRooms.id;
  const timeStamp = chatRooms.Chats[chatRooms.Chats.length - 1]?.createdAt;

  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  const formattedTimeStamp =
    chatRoomIdDb === chatRooms.id
      ? new Date(timeStamp).toLocaleDateString("en-US", options)
      : null;

  const foramttedFilterTimeStamp =
    filterMessages &&
    filterMessages.length > 0 &&
    filterMessages[0].roomChatId === chatRooms.id
      ? new Date(
          filterMessages[filterMessages.length - 1]?.createdAt
        ).toLocaleString("en-US", options)
      : null;

  return (
    <div style={{ width: "100%" }}>
      <p style={{ fontSize: "18px", color: "#848484" }}>
        {filterMessages &&
        filterMessages.length > 0 &&
        filterMessages[0].roomChatId === chatRooms.id
          ? foramttedFilterTimeStamp
          : formattedTimeStamp}
      </p>
    </div>
  );
};

export default TimeAndDate;
