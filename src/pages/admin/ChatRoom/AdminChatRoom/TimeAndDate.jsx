/* eslint-disable react/prop-types */
import { DateTime } from "luxon";
const TimeAndDate = ({ filterMessages, chatRooms }) => {
  const chatRoomIdDb = chatRooms.id;
  const timeStamp = chatRooms.Chats[chatRooms.Chats.length - 1]?.createdAt;

  const formattedTimeStamp =
    chatRoomIdDb === chatRooms.id
      ? DateTime.fromISO(timeStamp).toLocaleString(DateTime.DATETIME_SHORT)
      : null;

  const foramttedFilterTimeStamp =
    filterMessages &&
    filterMessages.length > 0 &&
    filterMessages[0].roomChatId === chatRooms.id
      ? DateTime.fromISO(
          filterMessages[filterMessages.length - 1]?.createdAt
        ).toLocaleString(DateTime.DATETIME_SHORT)
      : null;
  console.log(formattedTimeStamp);

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
