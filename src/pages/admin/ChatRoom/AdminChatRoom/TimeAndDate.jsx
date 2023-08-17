/* eslint-disable react/prop-types */

const TimeAndDate = ({ filterMessages, chatRooms }) => {
  const chatRoomIdDb = chatRooms.id;
  const timeStamp = chatRooms.Chats[chatRooms.Chats.length - 1]?.createdAt;
  const formattedTimeStamp =
    chatRoomIdDb === chatRooms.id ? new Date(timeStamp).toLocaleString() : null;
  const foramttedFilterTimeStamp =
    filterMessages &&
    filterMessages.length > 0 &&
    filterMessages[0].roomChatId === chatRooms.id
      ? new Date(
          filterMessages[filterMessages.length - 1]?.createdAt
        ).toLocaleString()
      : null;

  return (
    <div>
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
